<div align="center">
<img src="app/favicon.ico" height="90px" width="auto" />

<div align="center">

![Next.js Badge](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js&logoColor=white&style=flat)
![React Badge](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=flat)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind_CSS-3.4.0-06B6D4?logo=tailwindcss&logoColor=white&style=flat)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?&logo=buy-me-a-coffee&logoColor=black)](#)

</div>

<h2>
    My Personal Portfolio
</h2>

<img src="public/images/screenshots/portada.png" height="400px" width="auto" />

</div>

## 🛠️ Stack

- **[Next.js 16.1.6](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Library for user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript
- **[HeroUI](https://heroui.com/)** - UI component library (latest stable)
- **[Tailwind CSS v3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** - React renderer for Three.js
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management (dark/light)

## ✨ Features

- 🌍 **Internationalization (i18n):** Full support for English and Spanish
- 🎨 **Themes:** Dark and light mode with instant switching
- 🚀 **Modern Next.js:** Server Components, App Router, async params
- 🎭 **3D Elements:** Interactive canvas with Earth and stars
- 📱 **Responsive Design:** Mobile-first with HeroUI components
- ⚡ **Performance:** Optimized fonts, images and code splitting

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+** (LTS recommended)
- **pnpm** (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/alvaldes/portfolio.git

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) or [http://localhost:3000/es](http://localhost:3000/es) in your browser.

## 🧞 Commands

| Command        | Action                                      |
| :------------- | :------------------------------------------ |
| `pnpm install` | Install dependencies                        |
| `pnpm dev`     | Start development server at `localhost:3000` |
| `pnpm build`   | Build the site for production in `./next`  |
| `pnpm start`   | Start production server                     |
| `pnpm lint`    | Run ESLint to check code                    |

## 📁 Project Structure

```
portfolio/
├── app/
│   └── [lang]/              # i18n routes (en/es)
│       ├── layout.tsx       # Main layout with providers
│       ├── page.tsx         # Home page
│       ├── works/           # Projects listing & detail
│       └── globals.css      # Global styles and theme config
├── dictionaries/
│   ├── en.json             # English translations
│   └── es.json             # Spanish translations
├── lib/
│   └── dictionary.ts       # i18n utility functions
├── public/
│   └── images/             # Static assets
├── .eslintrc.json          # ESLint configuration
├── AGENTS.md               # AI agent instructions
├── CLAUDE.md               # AI development guidelines
├── i18n.config.ts          # i18n configuration
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── README.md               # This file
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🌐 Routes

| Route                 | Description                      |
| :-------------------- | :------------------------------- |
| `/en`                 | Home (English)                   |
| `/es`                 | Home (Spanish)                   |
| `/en/works`           | Projects listing (English)       |
| `/es/works`           | Projects listing (Spanish)       |
| `/en/works/[id]`      | Project detail (English)         |
| `/es/works/[id]`      | Project detail (Spanish)         |

## 🔑 License

MIT

## Show your support

Give a ⭐ if you like this website!

<a href="https://buymeacoffee.com/alvaldes"><img src="public/images/buymeacoffee-landscape.png" height="60px" width="auto"/></a>
