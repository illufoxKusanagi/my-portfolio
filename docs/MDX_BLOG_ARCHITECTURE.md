# MDX & Nuxt Content Blog Architecture Guide

## 1. Overview
In the Nuxt ecosystem, the official equivalent to React's MDX is **`@nuxt/content` (MDC: MarkDown Component syntax)**. Instead of hardcoding post strings in `data/blogData.ts`, articles are stored as standard `.md` / `.mdx` documents inside a `content/blog/` directory.

---

## 2. Key Advantages Over Manual `blogData.ts`

| Feature | Current Manual (`blogData.ts`) | Nuxt Content (MDC / MDX) |
| :--- | :--- | :--- |
| **Authoring Experience** | Tedious TypeScript array with string splitting | Clean Markdown writing in standard `.md` files |
| **Code Highlighting** | None (plain text or manual styling) | Built-in Shiki syntax highlighting (GLSL, C++, TS, Rust) |
| **Interactive Components** | None | Full support: embed Vue components (`<InteractiveChart />`, `::callout`) inside Markdown |
| **Table of Contents** | None | Automatic AST-based TOC generation from headings |
| **SEO & OpenGraph** | Manual `useHead` mappings | Automatic frontmatter-to-meta tags pipeline |
| **Search & Filtering** | In-memory JS filter | Built-in SQL/Nitro content database indexing |

---

## 3. Directory Structure

```bash
content/
└── blog/
    ├── 01.data-oriented-programming.md
    ├── 02.webgl-threejs-shaders.md
    └── 03.cpp-reverse-engineering.md
app/
├── components/
│   └── content/                # Auto-registered MDC components usable in markdown
│       ├── CalloutAlert.vue
│       ├── CodeDemo.vue
│       └── TechBadge.vue
└── pages/
    └── blog/
        ├── index.vue           # Queries content collection for archive grid
        └── [slug].vue          # <ContentRenderer :value="data" /> with custom prose typography
```

---

## 4. Sample Post Format (`content/blog/webgl-threejs-shaders.md`)

```markdown
---
title: "Real-Time Wind Tunnel Simulation with Three.js & FXAA"
subtitle: "GPU Particle Physics & Custom Post-Processing"
category: "GRAPHICS & 3D"
publishedAt: "AUG 2026"
readTime: "6 MIN READ"
tags: ["ThreeJS", "GLSL", "WebGL", "FXAA"]
summary: "How to engineer deterministic 60 FPS particle systems and screen-space anti-aliasing on hybrid GPU architectures."
---

# Aerodynamic Particle Physics

Building custom wind tunnel stream lines requires passing time deltas directly to GPU instanced vertex attributes.

::callout-alert{type="tip"}
Always cap your pixel ratio to `1.5` on HiDPI displays to prevent fill-rate bottlenecks.
::

```typescript
const { composer } = usePostProcessing(renderer, scene, camera, width, height);
```

---

## 5. Migration Roadmap

1. **Install Module**: Add `@nuxt/content` to dependencies.
2. **Configure `nuxt.config.ts`**: Enable content module with Shiki themes (`github-dark`, `github-light`).
3. **Migrate Existing 3 Posts**: Move data from `blogData.ts` to `content/blog/*.md`.
4. **Update Pages**:
   - Refactor `app/pages/blog/index.vue` to use `queryContent('blog').find()`.
   - Refactor `app/pages/blog/[slug].vue` to use `<ContentDoc />` or `queryContent('blog', route.params.slug).findOne()`.
