# Wayan Galih Pratama - Professional Portfolio

Modern, high-performance developer portfolio built with **Astro v5**, **React 19**, and **Tailwind CSS v4**.

## 🚀 Key Features
- **AI-Driven Research**: Content derived from real-world GitHub history analysis.
- **Dynamic Content**: Project metadata externalized to `src/data/projects.json`.
- **Premium UI**: Category-aware color mapping, glassmorphism badges, and smooth animations.
- **Docker-First Workflow**: Consistent development environment via a specialized wrapper.

## 🧞 Project Structure
```text
/
├── .agent/              # AI Agent configuration
├── agent_docs/          # Internal sprint artifacts (git-ignored)
├── docs/                # Shared technical documentation (LLD, Feature Specs)
├── public/              # Static assets
├── src/
│   ├── components/      # UI components
│   ├── data/            # Project JSON data
│   ├── layouts/         # Page layouts
│   └── pages/           # Astro pages
├── dc.sh                # Docker Compose wrapper script
└── package.json         # Dependencies and scripts
```

## 🛠️ Commands

All commands should be run via the `./dc.sh` wrapper for environment consistency:

| Task | Command |
|------|---------|
| Start Development | `./dc.sh pnpm run dev` |
| Build Production | `./dc.sh pnpm run build` |
| Preview Build | `./dc.sh pnpm run preview` |
| Install Dependencies| `./dc.sh pnpm install` |

## 📐 Architecture
See the full [Low-Level Design (LLD)](docs/LLD.md) for detailed technical specifications.


| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
