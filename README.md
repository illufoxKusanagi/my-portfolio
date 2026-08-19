# Illufox Kusanagi — Interactive 3D WebGL Portfolio & Engineering Dossier

[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.4.8-00DC82?logo=nuxt&labelColor=020420)](https://nuxt.com/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5.35-4FC08D?logo=vuedotjs&labelColor=020420)](https://vuejs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185.1-black?logo=threedotjs&labelColor=020420)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178C6?logo=typescript&labelColor=020420)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.3.3-06B6D4?logo=tailwindcss&labelColor=020420)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Personal developer portfolio and engineering showcase for **Muhammad Arief Satria Wibawa (`Illufox Kusanagi`)** — specializing in real-time 3D WebGL graphics, C++ numerical desktop simulation architectures, and modern full-stack TypeScript systems.

---

## ⚡ Key Architectural Features

### 1. Interactive 3D WebGL Showroom & 2D Fallback
* **Three.js Engine**: Custom WebGL rendering pipeline featuring ACESFilmic tone mapping, HDR lighting, OrbitControls, and custom PBR clearcoat materials (Midnight Purple III).
* **Draco Mesh Compression**: 3D Nissan Skyline GT-R R33 mesh compressed with Draco via WebAssembly decoders (**42MB → 3.8MB** with zero vertex normal degradation).
* **Aerodynamic Particle Simulation**: 1,200+ particle stream wind tunnel synchronized with scroll momentum.
* **2D / 3D Mode Toggle**: Navbar switcher toggles between full WebGL 3D execution and lightweight 2D loop rendering (0% GPU draw calls when 2D is active).

### 2. End-to-End Bilingual Localization (i18n)
* Powered by `@nuxtjs/i18n` with support for **English (`en`)** and **Bahasa Indonesia (`id`)**.
* Complete reactive translation coverage across:
  * Navigation menus and system quick-jump directory
  * All 20 Tech-Stack frameworks, tools, and languages (`techStack.items.*`)
  * All 10 project catalog cards, subtitles, and demo/repo action labels (`projects.items.*`)
  * Experience timeline achievements and technical bullets (`experience.items.*`)
  * Interactive certification flipbook and about dossier telemetry metrics

### 3. Dual-Language Technical Blog (`@nuxt/content` v3)
* Dual collection configuration (`blogEn` and `blogId`) querying markdown files with Shiki syntax highlighting.
* Custom MDC components (e.g. `<CalloutAlert>`), reading progress bar, localized category filtering, and slug fallback routing.

### 4. Production-Grade Contact API & Cyber Toasts
* Server route `/api/contact` powered by **Resend API** with RFC 5322 email validation, HTML sanitization, invisible honeypot anti-spam, and sliding-window IP rate limiting (5 requests / 2 min).
* Shared state cyber toast notifications (`useCyberToast`) with countdown timers and status alerts.

### 5. Interactive Certification Flipbook & Physics
* Realistic 3D page turn simulation via `page-flip` library with full-screen lightbox verification modal.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Nuxt 4](https://nuxt.com/) (Vue 3 Composition API, Nitro Server Engine) |
| **3D Graphics** | [Three.js](https://threejs.org/), Draco 3D Loader, WebGL, GLSL Shaders |
| **Animation & Scroll** | [GSAP](https://greensock.com/gsap/) + ScrollTrigger, [Lenis](https://lenis.darkroom.engineering/) Smooth Scroll |
| **Content & Markdown** | [@nuxt/content v3](https://content.nuxt.com/), Shiki Code Highlighter |
| **Internationalization**| [@nuxtjs/i18n](https://i18n.nuxtjs.org/) (`en` / `id`) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), Lucide Icons, Simple Icons, Custom CSS Design Tokens |
| **Email Delivery** | [Resend](https://resend.com/) API |
| **Package Manager** | [pnpm](https://pnpm.io/) |

---

## 🚀 Getting Started

### Prerequisites
* Node.js `>= 20.0.0`
* pnpm `>= 9.0.0`

### Installation

1. Clone the private repository:
   ```bash
   git clone git@github.com:illufoxKusanagi/my-portfolio.git
   cd my-portfolio
   ```

2. Install project dependencies:
   ```bash
   pnpm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Fill in your configuration:
   ```env
   # Resend API Key for contact form delivery (https://resend.com)
   RESEND_API_KEY=re_your_api_key_here

   # Email address to receive inquiries from the contact form
   CONTACT_RECIPIENT_EMAIL=ariefsatria2409@gmail.com
   ```

4. Start Development Server:
   ```bash
   pnpm dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 📦 Build & Deployment

```bash
# Typecheck TypeScript across the codebase
pnpm typecheck

# Lint with ESLint
pnpm lint

# Build production bundle
pnpm build

# Preview production build locally
pnpm preview
```

---

## 📂 Project Structure

```
my-portfolio/
├── .agents/                   # Agent memory, context, and workflow rules
│   ├── .context/              # Persistent architecture notes (CONTEXT.md, FUTURE_FEATURES.md)
│   └── AGENTS.md              # Engineering workflow rules and constraints
├── app/
│   ├── assets/                # CSS design system (main.css) and SVG vectors
│   ├── components/            # Vue components partitioned by domain
│   │   ├── certificates/      # Interactive 3D flipbook & lightbox
│   │   ├── contact/           # Contact form, social links, and validation logic
│   │   ├── content/           # Custom MDC markdown components (CalloutAlert.vue)
│   │   ├── experience/        # Timeline, technical bullet points, and data model
│   │   ├── hero/              # Hero layout, 2D canvas, and video background fallback
│   │   ├── navbar/            # Navbar, language switcher, 2D/3D mode, and drawer
│   │   ├── projects/          # Featured project cards and archive catalog
│   │   ├── tech-stack/        # 3-tier tech stack cards (Frameworks/Tools/Languages)
│   │   ├── three/             # Three.js canvas, GT-R R33 loader, shaders, particles
│   │   └── toast/             # Cyber toast alert system
│   ├── composables/           # Shared composables (useCyberToast, useRenderMode, etc.)
│   ├── pages/                 # File-based routing (index.vue, about.vue, blog/, projects/)
│   └── plugins/               # Client plugins (Lenis smooth scroll)
├── content/                   # Nuxt Content v3 markdown articles
│   └── blog/
│       ├── en/                # English technical blog posts
│       └── id/                # Indonesian technical blog posts
├── i18n/
│   └── locales/               # Primary i18n dictionaries (en.json, id.json)
├── locales/                   # Root localized dictionaries
├── public/                    # Static assets (3D GLTF models, textures, images, icons)
├── server/
│   └── api/                   # Nitro backend routes (contact.post.ts)
├── content.config.ts          # Content v3 collections schema (blogEn, blogId)
├── nuxt.config.ts             # Nuxt configuration and module orchestration
└── package.json
```

---

## 🔍 Code Smells, Known Gotchas & Audit Findings

During recent architectural reviews and refactoring passes, the following code patterns and findings were identified:

1. **Locale Directory Duplication**:
   * *Finding*: Localization files existed across both `i18n/locales/` and root `locales/`. `@nuxtjs/i18n` resolves `i18n/locales/` by default.
   * *Mitigation*: Both locations have been synced. For future additions, always update `i18n/locales/en.json` and `i18n/locales/id.json`.
2. **Imperative WebGL Lifecycle vs Component Unmounting**:
   * *Finding*: `useThreeEngine.ts` uses raw Three.js imperative rendering. Switching pages or toggling modes requires explicit memory cleanup (`renderer.dispose()`, `geometry.dispose()`) to prevent WebGL context leaks.
   * *Mitigation*: When 2D mode is active, the render loop is paused and canvas is hidden rather than completely unmounting/reinstantiating WebGL contexts repeatedly.
3. **AST Array Tokenization in `@nuxtjs/i18n`**:
   * *Finding*: Using `$tm()` on array keys returns compiled AST objects in modern Nuxt i18n rather than string arrays.
   * *Mitigation*: Array elements (such as experience bullet points) are indexed directly via `t('experience.items.inka.bullets.0')` for reliable string rendering.
4. **Heavy Initial Asset Payloads on Mobile**:
   * *Finding*: The 3.8MB Draco GLTF model and high-res textures may impact low-power mobile devices.
   * *Mitigation*: The 2D mode toggle and video fallback layer allow running the portfolio without WebGL overhead when desired.

---

## 🗺️ Future Roadmap & Planned Improvements

- [ ] **TresJS Migration Evaluation**: Investigate migrating the Three.js imperative scene to `@tresjs/core` and `@tresjs/cientos` for fully declarative Vue 3 WebGL components.
- [ ] **Interactive 3D Car Customizer**: Add real-time paint shader selection (Midnight Purple, Bayside Blue, Millennium Jade), rim finishes, and brake caliper customization.
- [ ] **Web Audio UI Sound Effects**: Implement subtle cybernetic audio feedback (button clicks, mode switches, toast alerts) using Howler.js or the Web Audio API with an optional mute toggle.
- [ ] **Automated RSS & Sitemap Generation**: Generate automated bilingual RSS feeds (`/feed.xml`, `/id/feed.xml`) and dynamic `sitemap.xml` for all blog articles.
- [ ] **Dynamic OpenGraph Previews**: Auto-generate social share cards for blog articles using `@nuxtjs/og-image` with active language meta tags.
- [ ] **Interactive 3D Simulation WebGL Widgets**: Embed interactive OpenCL / Qt WebGL simulation demos directly inside MDC blog posts.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — Feel free to use the architecture and code structure as inspiration for your own projects.
