# AGENTS.md

This document provides an overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

FORTIS — a single-page marketing landing page for a security systems integrator. The site presents four service lines: CCTV, intelligent video surveillance, biometric access control, and network infrastructure. Built with TanStack Start and deployed on Netlify. Content is in Spanish (Colombian market).

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Language | TypeScript 5 |
| Deployment | Netlify |

## Directory Structure

```
├── public/
│   └── favicon.ico
├── src/
│   ├── routes/
│   │   ├── __root.tsx   # Shell: Google Fonts links, meta tags, HTML wrapper
│   │   └── index.tsx    # Full landing page — all sections, data, icons in one file
│   └── styles.css       # Global CSS: custom properties, utility classes, keyframe animations
├── AGENTS.md
├── README.md
├── netlify.toml
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Key Concepts

### Architecture decisions

- **Single route, no components split**: The page is a self-contained marketing scroll. All section data (`services`, `stats`, `whyItems`), SVG icons, and the `HomePage` component live in `src/routes/index.tsx`. This avoids over-engineering a static page.
- **CSS custom properties over Tailwind classes for theming**: Brand palette is defined in `:root` (`--accent: #d4930a`, `--bg-base`, etc.) and applied via inline `style` props. Tailwind handles layout utilities only.
- **Inline SVG icons**: No icon library dependency. Each icon is a minimal hand-authored SVG component at the top of `index.tsx`.
- **`clip-path` for angular UI elements**: Buttons (`.btn-primary`) and icon boxes (`.icon-hex`) use `clip-path: polygon(...)` for the industrial diagonal-cut aesthetic.
- **CSS-only animations**: Entrance animations use `@keyframes fadeInUp` with `.anim` + `.d1`–`.d8` delay classes. No animation library needed.

### Styling conventions

- Brand colors always via `var(--...)` CSS variables, never hardcoded hex in JSX
- Layout via CSS Grid (`display: grid`) — avoids brittle Tailwind percentage-flex math
- Animate `transform` and `opacity` only — never `top`/`left`/`width`/`height`
- Mobile responsiveness: `.hide-mobile` hides decorative elements on small screens; grid collapses via `gridTemplateColumns`

### Adding new sections

1. Add a `<section id="...">` block inside `HomePage()` in `src/routes/index.tsx`
2. Add a nav anchor in the nav links array inside the same file
3. Define any section data as a `const` array near the top of the file alongside existing data constants

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, Netlify adapter, Tailwind, tsconfig paths |
| `tsconfig.json` | TypeScript config with `@/*` path alias for `src/*` |
| `netlify.toml` | Build command, publish directory, dev server port |
| `styles.css` | Tailwind import + global design tokens + animation keyframes |

## Development Commands

```bash
npm run dev    # Start dev server on port 3000
npm run build  # Production build
```

## Directory Structure

```
├── public
│   ├── favicon.ico
│   ├── logo.png
│   ├── tanstack-circle-logo.png
│   └── tanstack-word-logo-white.svg  # TanStack wordmark logo (white) used in header/nav.
├── src
│   ├── components
│   │   ├── Header.tsx  # Header.
│   │   ├── HeaderNav.tsx  # Navigation sidebar template: mobile menu, Home link, add-on routes; EJS-driven for dynamic route generation.
│   │   ├── ProductAIAssistant.tsx  # AI marketing assistant.
│   │   └── ProductRecommendation.tsx  # Product recommendation card.
│   ├── data
│   │   └── products.ts  # Product catalog data template.
│   ├── lib
│   │   ├── product-ai-hook.ts  # useProductChat hook.
│   │   └── product-tools.ts  # AI tools: getProducts, recommendProduct.
│   ├── routes
│   │   ├── products
│   │   │   └── $productId.tsx  # Product detail page with recommendation.
│   │   ├── __root.tsx  # Root layout: Header, styles.
│   │   ├── api.product-chat.ts  # POST handler for product AI chat.
│   │   └── index.tsx  # Marketing home with ProductAIAssistant.
│   ├── store
│   │   └── product-assistant.ts  # Zustand store for assistant state.
│   ├── router.tsx  # TanStack Router setup: creates router from generated routeTree with scroll restoration.
│   └── styles.css  # Global styles.
├── .gitignore  # Template for .gitignore: node_modules, dist, .env, .netlify, .tanstack, etc.
├── AGENTS.md  # This document provides an overview of the project structure for developers and AI agents working on this codebase.
├── netlify.toml  # Netlify deployment config: build command (vite build), publish directory (dist/client), and dev server settings (port 8888, target 3000).
├── package.json  # Project manifest with TanStack Start, React 19, Vite 7, Tailwind CSS 4, and Netlify plugin dependencies; defines dev and build scripts.
├── pnpm-lock.yaml
├── tsconfig.json  # TypeScript config: ES2022 target, strict mode, @/* path alias for src/*, bundler module resolution.
└── vite.config.ts  # Vite config template: TanStack Start, React, Tailwind, Netlify plugin, and optional add-on integrations; processed by EJS.
```

## Key Concepts

### File-Based Routing (TanStack Router)

Routes are defined by files in `src/routes/`:

- `__root.tsx` - Root layout wrapping all pages
- `index.tsx` - Route for `/`
- `api.*.ts` - Server API endpoints (e.g., `api.resume-chat.ts` → `/api/resume-chat`)

### Component Architecture

**UI Primitives** (`src/components/ui/`):
- Radix UI-based, Tailwind-styled
- Card, Badge, Checkbox, Separator, HoverCard

**Feature Components** (`src/components/`):
- Header, HeaderNav, ResumeAssistant

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, Netlify, Tailwind, Content Collections |
| `tsconfig.json` | TypeScript config with `@/*` path alias for `src/*` |
| `netlify.toml` | Build command, output directory, dev server settings |
| `content-collections.ts` | Zod schemas for jobs and education frontmatter |
| `styles.css` | Tailwind imports + CSS custom properties (oklch colors) |

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Conventions

### Naming
- Components: PascalCase
- Utilities/hooks: camelCase
- Routes: kebab-case files

### Styling
- Tailwind CSS utility classes
- `cn()` helper for conditional class merging
- CSS variables for theme tokens in `styles.css`

### TypeScript
- Strict mode enabled
- Import paths use `@/` alias
- Zod for runtime validation
- Type-only imports with `type` keyword

### State Management
- React hooks for local state
- Zustand if you need it for global state
### Marketing Site with AI Assistant

Marketing site with TanStack AI chat assistant. No Stripe checkout.

**AI tools available:**
- `getProducts` - Get all products from catalog
- `recommendProduct` - Display product recommendation card (MUST use for recommendations)

**Components:** ProductAIAssistant, ProductRecommendation

**Dependencies:** @tanstack/ai, streamdown

## Environment Variables

For AI: ANTHROPIC_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY, or OLLAMA_BASE_URL (same as ai add-on).

## Application Name

This starter uses "Application Name" as a placeholder throughout the UI and metadata. Replace it with the user's desired application name in the following locations:

### UI Components
- `src/components/Header.tsx` — app name displayed in the header
- `src/components/HeaderNav.tsx` — app name in the mobile navigation header

### SEO Metadata
- `src/routes/__root.tsx` — the `title` field in the `head()` configuration

Search for all occurrences of "Application Name" in the `src/` directory and replace with the user's application name.
