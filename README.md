# docs.ltdsave.app

Documentation site for [ltdsave.app](https://ltdsave.app), the browser-based save editor for _Tomodachi Life: Living the Dream_.

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build). Hosted on Cloudflare Pages.

## Development

```sh
npm install
npm run dev
```

Dev server runs at `http://localhost:4321`.

## Scripts

| Command             | Action                                             |
| :------------------ | :------------------------------------------------- |
| `npm run dev`       | Start the local dev server                         |
| `npm run build`     | Build the production site to `./dist/`             |
| `npm run preview`   | Preview the production build locally               |
| `npm run check`     | Astro + TypeScript type-check                      |
| `npm run lint`      | ESLint + Prettier check                            |
| `npm run format`    | Apply Prettier formatting                          |
| `npm run knip`      | Find unused files and dependencies                 |
| `npm run precommit` | Run the full pre-commit chain (format → … → build) |
| `npm run deploy`    | Build and deploy to Cloudflare Pages               |

## Structure

```
src/
├── assets/             # images embedded in content
├── content/
│   └── docs/           # .md / .mdx pages (one file = one route)
└── content.config.ts   # Starlight collection config
astro.config.mjs        # site + sidebar config
```

## License

[AGPL-3.0-or-later](./LICENSE)
