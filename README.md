<div align="center">

<img src="public/favicon.svg" height="90px" width="auto" />

![Astro Badge](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white&style=flat)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white&style=flat)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white&style=flat)
![React Badge](https://img.shields.io/badge/React-19_(3D_island_only)-61DAFB?logo=react&logoColor=white&style=flat)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/alvaldes)

<h2>My Personal Portfolio</h2>

<img src="docs/screenshot.png" height="400px" width="auto" />

</div>

A static, bilingual (Spanish/English) portfolio built with Astro. It is a port of the previous Next.js version that ships HTML first: only the 3D planet on the home page runs JavaScript, so the projects pages load with almost none.

## 🚀 Quick start

Requires **Node.js 22.23.4+** (Astro 7) and **[Bun](https://bun.sh/)**.

```bash
git clone https://github.com/alvaldes/portfolio.git
cd portfolio
bun install
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) (Spanish) or [http://localhost:4321/en/](http://localhost:4321/en/) (English).

## 🧞 Commands

| Command           | Action                                                        |
| :---------------- | :------------------------------------------------------------ |
| `bun install`     | Install dependencies                                          |
| `bun run dev`     | Start the dev server at `localhost:4321`                      |
| `bun run build`   | Type-check with `astro check`, then build the site to `dist/` |
| `bun run preview` | Serve the production build locally                            |

## 🛠️ Stack

| Tool | Role |
| :--- | :--- |
| [Astro 7](https://astro.build/) | Static site generation, native i18n routing, image optimization (`astro:assets`) |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling through the Vite plugin; theme tokens live in `src/styles/global.css` |
| [React 19](https://react.dev/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | Only for the 3D planet and stars island, loaded with `client:visible` |
| [marked](https://marked.js.org/) | Renders project descriptions (Markdown) at build time |
| [lite-youtube](https://github.com/justinribeiro/lite-youtube) | Click-to-load YouTube player on project pages |

## ✨ Features

- 🌍 **i18n:** Spanish at `/`, English under `/en/`, with `hreflang` alternates and a language switcher. On Vercel, `/` sends visitors whose browser does not prefer Spanish to `/en/`, unless they picked a language with the switcher (remembered in a `lang` cookie). Requests without `Accept-Language`, such as crawlers, stay on `/`. Legacy `/es/...` URLs redirect permanently to the unprefixed routes. All rules live in `vercel.json`.
- 🎨 **Themes:** Dark and light mode, saved per visitor, applied before the first paint (no flash).
- 🎭 **3D banner:** Interactive Earth and stars, loaded only when the banner is visible.
- 🖼️ **Optimized images:** Responsive `srcset` generated at build time.
- 🔤 **Self-hosted fonts:** M PLUS Rounded 1c and Comfortaa, no requests to Google Fonts.
- 📬 **Contact form:** Opens the visitor's mail client, with a plain `mailto:` form as the no-JavaScript fallback.

## ⚡ Compared with the Next.js version

Measured on production builds in Chromium, cache disabled, CPU throttled 4x, median of 3 runs on localhost (no network latency).

| Page | JS (gzip) Next → Astro | LCP Next → Astro | Page weight Next → Astro |
| :--- | :--- | :--- | :--- |
| Home | 720 KB → 332 KB | 1504 ms → 392 ms | 6.0 MB → 4.2 MB |
| Projects | 723 KB → **0 KB** | 1400 ms → 136 ms | 3.2 MB → 290 KB |
| Project detail | 725 KB → **3 KB** | 1324 ms → 136 ms | 3.2 MB → 262 KB |

The home page stays the heaviest because of the 3D model (~1.6 MB) and three.js.

## 🌐 Routes

| Route             | Description                |
| :---------------- | :------------------------- |
| `/`               | Home (Spanish)             |
| `/en/`            | Home (English)             |
| `/works/`         | Projects listing (Spanish) |
| `/en/works/`      | Projects listing (English) |
| `/works/[id]/`    | Project detail (Spanish)   |
| `/en/works/[id]/` | Project detail (English)   |

## 📁 Project structure

```text
/
├── docs/                    # Images used by this README (not deployed)
├── public/                  # Served as-is: favicon, fonts, 3D model, flags, video posters
├── src/
│   ├── assets/              # Images optimized at build time by <Image>
│   │   └── projects/<id>/   # thumbCard, thumbFirst, thumbMockup per project
│   ├── components/          # Astro components (Navbar, Footer, Home, Work*, ...)
│   │   ├── icons/           # SVG icon paths and icon components
│   │   └── islands/         # React components that run in the browser (3D canvas)
│   ├── i18n/
│   │   ├── locales/         # es.json, en.json: all copy and the projects list
│   │   └── utils.ts         # t(), getDictionary(), localized paths
│   ├── layouts/Layout.astro # Page shell: head, backdrop, navbar, footer
│   ├── lib/projects.ts      # Project type, image lookup, YouTube id parsing
│   ├── pages/               # Routes: Spanish at the root, English under en/
│   └── styles/global.css    # Tailwind entry, theme palette, fonts, animations
└── astro.config.mjs         # Site URL, i18n locales, React and Tailwind setup
```

## ➕ Adding a project

1. Add an entry to `works.projects` in **both** `src/i18n/locales/es.json` and `src/i18n/locales/en.json`, with the same `id`.
2. Put `thumbCard.webp`, `thumbFirst.webp` and `thumbMockup.webp` in `src/assets/projects/<id>/`.
3. Reference them in the dictionary as `/images/<id>/thumbCard.webp` (and so on). The build fails if a referenced image is missing.
4. Optional: `video` (YouTube URL or a file in `public/videos/`) and `videoPoster` (a 16:9 image in `public/images/<id>/`).
5. Run `bun run build`: a page is generated at `/works/<id>/` and `/en/works/<id>/`.

> The type of translation keys is derived from `es.json` only, so `astro check` does not catch a key missing from `en.json`. Keep both files in sync.

## 🔑 License

MIT

## Show your support

Give a ⭐ if you like this website!

<a href="https://buymeacoffee.com/alvaldes"><img src="docs/buymeacoffee.png" height="60px" width="auto"/></a>
