export interface TechCardData {
  id: string;
  category: string;
  categoryDesc: string;
  index: string;
  title: string;
  description: string;
  experienceYears: string;
  proficiency: string;
  badgeText: string;
  sideTag: string;
  imageUrl: string;
}

export interface TechCategoryGroup {
  id: string;
  title: string;
  subtitle: string;
  items: TechCardData[];
}

export const TECH_CATEGORIES: TechCategoryGroup[] = [
  {
    id: "frameworks",
    title: "FRAMEWORKS",
    subtitle: "Frameworks ever used in projects",
    items: [
      {
        id: "react",
        category: "FRAMEWORKS",
        categoryDesc: "Frameworks ever used in projects",
        index: "01 / 09",
        title: "React.Js",
        description:
          "Developing component-driven web interfaces, custom hooks, and interactive client-side state flows.",
        experienceYears: "2 yrs",
        proficiency: "Intermediate",
        badgeText: "Frontend",
        sideTag: "Frontend  |  React.Js",
        imageUrl: "/images/frameworks/react_framework.png",
      },
      {
        id: "qt",
        category: "FRAMEWORKS",
        categoryDesc: "Frameworks ever used in projects",
        index: "02 / 09",
        title: "Qt Framework",
        description:
          "Building native C++ desktop applications with QWidgets, QChart telemetry plotting, and windeployqt packaging.",
        experienceYears: "1 yr",
        proficiency: "Beginner",
        badgeText: "Desktop",
        sideTag: "Desktop  |  Qt Framework",
        imageUrl: "/images/frameworks/qt_framework.png",
      },
      {
        id: "next",
        category: "FRAMEWORKS",
        categoryDesc: "Frameworks ever used in projects",
        index: "03 / 09",
        title: "Next.Js",
        description:
          "Building full-stack web platforms with App Router, server-side rendering, REST API route handlers, and RBAC middleware.",
        experienceYears: "2 yrs",
        proficiency: "Intermediate",
        badgeText: "Fullstack",
        sideTag: "Fullstack  |  Next.Js",
        imageUrl: "/images/frameworks/next_framework.png",
      },
      {
        id: "vue",
        category: "FRAMEWORKS",
        categoryDesc: "Frameworks ever used in projects",
        index: "04 / 09",
        title: "Vue.Js",
        description:
          "Building reactive single-page and hybrid web interfaces using the Vue 3 Composition API, TypeScript, and modular composables.",
        experienceYears: "1 yr",
        proficiency: "Junior",
        badgeText: "Frontend",
        sideTag: "Frontend  |  Vue.Js",
        imageUrl: "/images/frameworks/vue_framework.png",
      },
      {
        id: "nuxt",
        category: "FRAMEWORKS",
        categoryDesc: "Frameworks ever used in projects",
        index: "05 / 09",
        title: "Nuxt.Js",
        description:
          "Structuring SSR and static web applications with Nuxt 4, Nitro server routes, Nuxt Content collections, and auto-imported composables.",
        experienceYears: "1 yr",
        proficiency: "Junior",
        badgeText: "Fullstack",
        sideTag: "Fullstack  |  Nuxt.Js",
        imageUrl: "/images/frameworks/nuxt_framework.png",
      },
      {
        id: "laravel",
        category: "FRAMEWORKS",
        categoryDesc: "Frameworks ever used in projects",
        index: "06 / 09",
        title: "Laravel",
        description:
          "Developing server-side web applications with Eloquent ORM, role-based authentication, Blade templates, and MVC routing.",
        experienceYears: "1 yr",
        proficiency: "Junior",
        badgeText: "Backend",
        sideTag: "Backend  |  Laravel",
        imageUrl: "/images/frameworks/laravel_framework.png",
      },
      {
        id: "livewire",
        category: "FRAMEWORKS",
        categoryDesc: "Frameworks ever used in projects",
        index: "07 / 09",
        title: "Livewire",
        description:
          "Creating reactive, zero-reload Laravel interfaces and stateful server-rendered components in PHP.",
        experienceYears: "1 yr",
        proficiency: "Junior",
        badgeText: "Fullstack",
        sideTag: "Fullstack  |  Livewire",
        imageUrl: "/images/tools/livewire_tools.png",
      },
      {
        id: "elysia",
        category: "FRAMEWORKS",
        categoryDesc: "Frameworks ever used in projects",
        index: "08 / 09",
        title: "Elysia.Js",
        description:
          "Writing Bun-native REST APIs with end-to-end TypeScript inference and strict request/response schema validation.",
        experienceYears: "< 1 yr",
        proficiency: "Junior",
        badgeText: "Backend",
        sideTag: "Backend  |  Elysia.Js",
        imageUrl: "/images/frameworks/elysia_framework.png",
      },
      {
        id: "tailwind",
        category: "FRAMEWORKS",
        categoryDesc: "Frameworks ever used in projects",
        index: "09 / 09",
        title: "Tailwind CSS",
        description:
          "Translating Figma layouts into responsive utility-first CSS systems, custom color palettes, and dark/light theme tokens.",
        experienceYears: "2 yrs",
        proficiency: "Intermediate",
        badgeText: "Styling",
        sideTag: "Styling  |  Tailwind",
        imageUrl: "/images/frameworks/tailwind_framework.png",
      },
    ],
  },
  {
    id: "tools",
    title: "TOOLS & WORKFLOW",
    subtitle: "Tools and software used daily",
    items: [
      {
        id: "git",
        category: "TOOLS & WORKFLOW",
        categoryDesc: "Tools and software used daily",
        index: "01 / 13",
        title: "Git & GitHub",
        description:
          "Managing feature branches, pull request reviews, release tags, and collaborative version control.",
        experienceYears: "3 yrs",
        proficiency: "Intermediate",
        badgeText: "Version Control",
        sideTag: "DevOps  |  Git",
        imageUrl: "/images/tools/git_tool.png",
      },
      {
        id: "figma",
        category: "TOOLS & WORKFLOW",
        categoryDesc: "Tools and software used daily",
        index: "02 / 13",
        title: "Figma",
        description:
          "Designing component layouts, typography scales, color tokens, and interactive UI prototypes before implementation.",
        experienceYears: "2 yrs",
        proficiency: "Intermediate",
        badgeText: "Design",
        sideTag: "Design  |  Figma",
        imageUrl: "/images/tools/figma_tools.png",
      },
      {
        id: "antigravity",
        category: "TOOLS & WORKFLOW",
        categoryDesc: "Tools and software used daily",
        index: "03 / 13",
        title: "Antigravity",
        description:
          "Using AI-assisted IDE workflows and structured task specifications to speed up multi-file implementation and debugging.",
        experienceYears: "< 1 yr",
        proficiency: "Intermediate",
        badgeText: "IDE",
        sideTag: "IDE  |  Antigravity",
        imageUrl: "/images/tools/antigravity_tools.png",
      },
      {
        id: "docker",
        category: "TOOLS & WORKFLOW",
        categoryDesc: "Tools and software used daily",
        index: "04 / 13",
        title: "Docker",
        description:
          "Packaging web applications and database services into reproducible multi-stage Docker Compose containers.",
        experienceYears: "1 yr",
        proficiency: "Beginner",
        badgeText: "Containerization",
        sideTag: "DevOps  |  Docker",
        imageUrl: "/images/tools/docker_tools.png",
      },
      {
        id: "postgresql",
        category: "TOOLS & WORKFLOW",
        categoryDesc: "Tools and software used daily",
        index: "05 / 13",
        title: "PostgreSQL",
        description:
          "Designing normalized relational schemas, indexing foreign keys, and writing transactional SQL queries.",
        experienceYears: "2 yrs",
        proficiency: "Intermediate",
        badgeText: "Database",
        sideTag: "Database  |  PostgreSQL",
        imageUrl: "/images/tools/postgre_tools.png",
      },
      {
        id: "mysql",
        category: "TOOLS & WORKFLOW",
        categoryDesc: "Tools and software used daily",
        index: "06 / 13",
        title: "MySQL",
        description:
          "Structuring relational tables, optimizing multi-table joins, and managing schema migrations for web backends.",
        experienceYears: "3 yrs",
        proficiency: "Intermediate",
        badgeText: "Database",
        sideTag: "Database  |  MySQL",
        imageUrl: "/images/tools/mysql_tools.png",
      },
      {
        id: "drizzle",
        category: "TOOLS & WORKFLOW",
        categoryDesc: "Tools and software used daily",
        index: "07 / 13",
        title: "Drizzle",
        description:
          "Writing type-safe SQL queries in TypeScript and managing schema migrations with Drizzle Kit across PostgreSQL, MySQL, and SQLite.",
        experienceYears: "2 yrs",
        proficiency: "Intermediate",
        badgeText: "ORM",
        sideTag: "ORM  |  Drizzle",
        imageUrl: "/images/tools/drizzle_tools.png",
      },
      {
        id: "opencode",
        category: "TOOLS & WORKFLOW",
        categoryDesc: "Tools and software used daily",
        index: "08 / 13",
        title: "Open Code",
        description:
          "Running terminal-based AI coding assistants for codebase search, boilerplate generation, and refactoring.",
        experienceYears: "< 1 yr",
        proficiency: "Intermediate",
        badgeText: "AI Coding Agent",
        sideTag: "AI Coding Agent  |  Open Code",
        imageUrl: "/images/tools/opencode_tools.png",
      },
      {
        id: "coderabbit",
        category: "TOOLS & WORKFLOW",
        categoryDesc: "Tools and software used daily",
        index: "09 / 13",
        title: "CodeRabbit",
        description:
          "Running automated pull-request diffs and static analysis checks to catch edge cases before merging.",
        experienceYears: "< 1 yr",
        proficiency: "Intermediate",
        badgeText: "AI Code Review",
        sideTag: "DevOps  |  CodeRabbit",
        imageUrl: "/images/tools/coderabbit_tools.png",
      },
      {
        id: "sentry",
        category: "TOOLS & WORKFLOW",
        categoryDesc: "Tools and software used daily",
        index: "10 / 13",
        title: "Sentry",
        description:
          "Capturing unhandled runtime exceptions, stack traces, and performance regressions in production web apps.",
        experienceYears: "1 yr",
        proficiency: "Beginner",
        badgeText: "Monitoring",
        sideTag: "DevOps  |  Sentry",
        imageUrl: "/images/tools/sentry_tools.webp",
      },
      {
        id: "github-actions",
        category: "TOOLS & WORKFLOW",
        categoryDesc: "Tools and software used daily",
        index: "11 / 13",
        title: "GitHub Actions",
        description:
          "Automating CI/CD build pipelines, TypeScript type-checking, and Windows desktop release packaging with windeployqt.",
        experienceYears: "1 yr",
        proficiency: "Beginner",
        badgeText: "CI/CD & DevOps",
        sideTag: "DevOps  |  GitHub Actions",
        imageUrl: "/images/tools/github_actions_tools.png",
      },
      {
        id: "shadcn",
        category: "TOOLS & WORKFLOW",
        categoryDesc: "Tools and software used daily",
        index: "12 / 13",
        title: "Shadcn UI",
        description:
          "Building accessible dialogs, data tables, and form controls on top of Radix UI primitives and Tailwind CSS.",
        experienceYears: "1 yr",
        proficiency: "Intermediate",
        badgeText: "UI System",
        sideTag: "Design System  |  Shadcn UI",
        imageUrl: "/images/tools/shadcn_ui_tools.png",
      },
      {
        id: "flux",
        category: "TOOLS & WORKFLOW",
        categoryDesc: "Tools and software used daily",
        index: "13 / 13",
        title: "Flux UI",
        description:
          "Assembling clean, accessible UI components and form layouts tailored for Laravel Livewire applications.",
        experienceYears: "< 1 yr",
        proficiency: "Beginner",
        badgeText: "UI System",
        sideTag: "Design System  |  Flux UI",
        imageUrl: "/images/tools/flux_ui_tools.png",
      },
    ],
  },
  {
    id: "languages",
    title: "LANGUAGES",
    subtitle: "Core programming languages",
    items: [
      {
        id: "typescript",
        category: "LANGUAGES",
        categoryDesc: "Core programming languages",
        index: "01 / 04",
        title: "TypeScript",
        description:
          "Writing strictly typed client and server code with interfaces, generics, and Zod/Drizzle schema inference.",
        experienceYears: "2 yrs",
        proficiency: "Intermediate",
        badgeText: "Website Dev",
        sideTag: "Language  |  TypeScript",
        imageUrl: "/images/languages/ts_language.png",
      },
      {
        id: "javascript",
        category: "LANGUAGES",
        categoryDesc: "Core programming languages",
        index: "02 / 04",
        title: "JavaScript",
        description:
          "Implementing DOM event handling, asynchronous fetch pipelines, and 2D/3D canvas rendering loops.",
        experienceYears: "2 yrs",
        proficiency: "Intermediate",
        badgeText: "Website Dev",
        sideTag: "Language  |  JavaScript",
        imageUrl: "/images/languages/js_language.png",
      },
      {
        id: "cpp",
        category: "LANGUAGES",
        categoryDesc: "Core programming languages",
        index: "03 / 04",
        title: "C++",
        description:
          "Developing native desktop software with C++17, Qt 6, OpenCL GPU kernels, and deterministic memory management.",
        experienceYears: "1 yr",
        proficiency: "Beginner",
        badgeText: "Desktop Dev",
        sideTag: "Language  |  C++",
        imageUrl: "/images/languages/cpp_language.png",
      },
      {
        id: "php",
        category: "LANGUAGES",
        categoryDesc: "Core programming languages",
        index: "04 / 04",
        title: "PHP",
        description:
          "Building server-side web backends and role-based administrative portals within the Laravel and Livewire ecosystem.",
        experienceYears: "1 yr",
        proficiency: "Beginner",
        badgeText: "Website",
        sideTag: "Language  |  PHP",
        imageUrl: "/images/languages/php_language.png",
      },
    ],
  },
];
