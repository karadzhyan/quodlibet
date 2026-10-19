# Quodlibet Repository

- Canonical public repository: `karadzhyan/quodlibet`.
- `public/` is the complete, buildless website. Preserve the original prose, design, fonts, historical versions and interactive behavior. Make only the changes authorized by the current task.
- Preview with `python3 -m http.server 8000 --bind 127.0.0.1 --directory public`.
- Run `python3 scripts/check_site.py` before handing off a change. After an intentional public-file change has been reviewed, use `--write-manifest` and rerun the check. Check affected interactions and desktop/phone layout in a browser when relevant.
- Vercel Git integration is the intended production route. Keep `outputDirectory` set to `public`, retain working `.html` and extensionless routes, and do not add a catch-all SPA rewrite. Account/project attachment and domain changes are separate deployment operations.
- Keep private research, source exports, audit records, tokens, `.env`, `.openai` and `.vercel` identity files out of commits and out of `public/`. Public source packages already included with the essays remain part of the website.
- Do not replace this static edition with a framework, theme or redesign as part of routine maintenance. Coordinate ownership when other workers are editing the repository.
