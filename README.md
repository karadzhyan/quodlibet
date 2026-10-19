# Quodlibet

Quodlibet is a collection of mathematical and philosophical essays, interactive studies, and print editions. Its canonical public source repository is [karadzhyan/quodlibet](https://github.com/karadzhyan/quodlibet).

The complete website lives in `public/`. The initial import preserves the published writing, original designs, scripts, fonts, PDFs, and historical editions byte for byte. It is a static website with no application build or account sign-in required to read it.

## Local Preview

From the repository root, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory public
```

Open [localhost:8000](http://localhost:8000/). This simple preview serves the existing `.html` links. Vercel’s extensionless redirects are a production routing feature.

## Checks

```sh
python3 scripts/check_site.py
```

The standard-library checker verifies the public file hashes, local HTML/CSS targets and HTML fragments. It also rejects symlinks and private configuration paths in the public tree. It does not fetch external links or test interactive behavior in a browser.

After reviewing an intentional website change, update the public manifest and run the check again:

```sh
python3 scripts/check_site.py --write-manifest
python3 scripts/check_site.py
```

To compare a migration with another website directory, use `--compare-to PATH`. This compares all relative paths and file bytes without copying or modifying that directory.

## Production

This repository is connected to the `quodlibet` Vercel project in `karadzhyans-projects`. Pushing to `main` triggers a production deployment; other branches provide previews. The repository root is the project root and `public` is the output directory. No build or install command is needed. The initial domain migration is being verified.

`vercel.json` enables `cleanUrls`: existing `.html` requests redirect to their extensionless equivalents, which serve the same documents. There is no single-page application fallback. The intended public domains are [quodlibet.press](https://quodlibet.press/) and [thequodlibet.com](https://thequodlibet.com/).

## Editing

Preserve the individual essays’ typography, writing and interactions. Historical versions and public source packages remain part of the site. Repository configuration belongs outside `public/`; private research, account exports, credentials and deployment identity files do not belong in this repository. Font license files are retained beside the fonts.
