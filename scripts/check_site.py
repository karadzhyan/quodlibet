#!/usr/bin/env python3
"""Check public hashes and static local links using only Python's standard library."""

import argparse
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
MANIFEST = ROOT / 'scripts' / 'public-manifest.json'
OWN_HOSTS = {'quodlibet.press', 'www.quodlibet.press', 'thequodlibet.com', 'www.thequodlibet.com'}
PRIVATE_NAMES = {'.git', '.openai', '.vercel', '.env', '.DS_Store', 'node_modules', '__pycache__'}
CSS_URL = re.compile(r'url\(\s*(?:"([^"]*)"|\'([^\']*)\'|([^)]*))\s*\)', re.I)


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.links = []
        self.styles = []
        self.in_style = False
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'a' and attrs.get('name'):
            self.ids.add(attrs['name'])
        for key in ('href', 'src', 'poster'):
            if attrs.get(key):
                self.links.append(attrs[key])
        if tag == 'object' and attrs.get('data'):
            self.links.append(attrs['data'])
        if attrs.get('style'):
            self.styles.append(attrs['style'])
        self.in_style = tag == 'style' or self.in_style

    def handle_endtag(self, tag):
        if tag == 'style':
            self.in_style = False

    def handle_data(self, data):
        if self.in_style:
            self.styles.append(data)


def inventory(directory):
    return {p.relative_to(directory).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(directory.rglob('*')) if p.is_file() and not p.is_symlink()}


def resolve_url(source, value):
    value = value.strip()
    url = urlsplit(value)
    if url.scheme and url.scheme not in ('http', 'https'):
        return None
    if url.netloc and url.hostname not in OWN_HOSTS:
        return None
    path = unquote(url.path)
    if not path:
        target = source
    elif path.startswith('/') or url.netloc:
        target = PUBLIC / path.lstrip('/')
    else:
        target = source.parent / path
    target = target.resolve()
    if not target.is_relative_to(PUBLIC.resolve()):
        return target, unquote(url.fragment)
    if target.is_dir():
        target = target / 'index.html'
    elif not target.exists() and not target.suffix:
        target = target.with_suffix('.html')
    return target, unquote(url.fragment)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write-manifest', action='store_true', help='Record reviewed public files after successful link checks.')
    parser.add_argument('--compare-to', type=Path, help='Require exact file/path parity with another public website directory.')
    args = parser.parse_args()
    problems = []
    for p in PUBLIC.rglob('*'):
        relative = p.relative_to(PUBLIC)
        if p.is_symlink():
            problems.append(f'Symlink: {relative}')
        if any(x in PRIVATE_NAMES or x.startswith('.env.') for x in relative.parts):
            problems.append(f'Private/configuration path: {relative}')
    files = inventory(PUBLIC)
    pages = {PUBLIC / name: Page((PUBLIC / name).read_text(encoding='utf-8'))
             for name in files if name.endswith('.html')}
    checked = 0
    for name in files:
        source = PUBLIC / name
        references = []
        if source in pages:
            page = pages[source]
            references.extend(page.links)
            for css in page.styles:
                references.extend([next((x for x in match if x), '') for match in CSS_URL.findall(css)])
        elif source.suffix == '.css':
            references.extend([next((x for x in match if x), '') for match in CSS_URL.findall(source.read_text(encoding='utf-8'))])
        for reference in references:
            resolved = resolve_url(source, reference)
            if resolved is None:
                continue
            checked += 1
            target, fragment = resolved
            if not target.is_relative_to(PUBLIC.resolve()) or not target.is_file():
                problems.append(f'{name}: missing local target {reference}')
            elif fragment and target in pages and fragment not in pages[target].ids:
                problems.append(f'{name}: missing HTML fragment {reference}')
    if args.compare_to:
        other = args.compare_to.expanduser().resolve()
        if not other.is_dir():
            problems.append('Comparison directory is absent or is not a directory.')
        else:
            reference_files = inventory(other)
            for name in sorted(files.keys() | reference_files.keys()):
                if files.get(name) != reference_files.get(name):
                    problems.append(f'Comparison differs: {name}')
    if not args.write_manifest:
        if not MANIFEST.exists():
            problems.append('Public manifest absent; record the reviewed import with --write-manifest.')
        else:
            expected = json.loads(MANIFEST.read_text(encoding='utf-8'))['files']
            for name in sorted(files.keys() | expected.keys()):
                if files.get(name) != expected.get(name):
                    problems.append(f'Manifest differs: {name}')
    if problems:
        for problem in sorted(set(problems)):
            print(problem, file=sys.stderr)
        print(f'FAIL: {len(set(problems))} issue(s)', file=sys.stderr)
        return 1
    tree_hash = hashlib.sha256(json.dumps(files, sort_keys=True, separators=(',', ':')).encode()).hexdigest()
    if args.write_manifest:
        MANIFEST.write_text(json.dumps({'algorithm': 'sha256', 'files': files}, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'status': 'PASS', 'files': len(files), 'html': len(pages), 'local_references': checked,
                      'public_tree_sha256': tree_hash, 'comparison_equal': True if args.compare_to else None}, indent=2))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
