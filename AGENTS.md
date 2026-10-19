# Quodlibet Repository

- Canonical public repository: `karadzhyan/quodlibet`.
- `public/` contains the exact files of the complete, buildless website. Preserve the original prose, design, fonts, historical versions and interactive behavior. Make only the changes authorized by the current task.
- Any ChatGPT account or cloud development environment can clone or read the public source and prepare changes. Pushing commits requires authenticated GitHub access with write permission to this repository. A ChatGPT account alone does not grant that access; the AK Sites connector is not required.
- Preview with `python3 -m http.server 8000 --bind 127.0.0.1 --directory public`.
- Run `python3 scripts/check_site.py` before handing off a change. After an intentional public-file change has been reviewed, use `--write-manifest` and rerun the check. Check affected interactions and desktop/phone layout in a browser when relevant.
- This repository is connected to the `quodlibet` Vercel project in `karadzhyans-projects`. An authorized push to `main` automatically triggers production deployment; other branches provide previews. Keep `outputDirectory` set to `public`, retain working `.html` and extensionless routes, and do not add a catch-all SPA rewrite. Verify the resulting deployment before reporting publication. DNS configuration and domain verification are separate operations; a successful push does not establish their status.
- Keep private research, source exports, audit records, tokens, `.env`, `.openai` and `.vercel` identity files out of commits and out of `public/`. Public source packages already included with the essays remain part of the website.
- Do not replace this static edition with a framework, theme or redesign as part of routine maintenance. Coordinate ownership when other workers are editing the repository.
