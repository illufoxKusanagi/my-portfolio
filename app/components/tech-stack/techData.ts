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
        index: "01 / 08",
        title: "React.Js",
        description:
          "Building modern responsive web applications with state management and clean UI engineering.",
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
        index: "02 / 08",
        title: "Qt Framework",
        description:
          "Developing high-performance native desktop applications with memory-safe architectures and cross-platform widget toolkits.",
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
        index: "03 / 08",
        title: "Next.Js",
        description:
          "Building full-stack web applications with server-side rendering, file-based routing, API routes, and SEO-optimized static generation.",
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
        index: "04 / 08",
        title: "Vue.Js",
        description:
          "Building responsive web applications using Vue 3 Composition API, Pinia, Vue Router, and reactive component architectures.",
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
        index: "05 / 08",
        title: "Nuxt.Js",
        description:
          "Building SSR and SSG applications with file-based routing and auto-imported composables.",
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
        index: "06 / 08",
        title: "Laravel",
        description:
          "Building scalable server-side applications with Blade templating, Eloquent ORM, and well-structured MVC backend architectures.",
        experienceYears: "1 yr",
        proficiency: "Junior",
        badgeText: "Backend",
        sideTag: "Backend  |  Laravel",
        imageUrl: "/images/frameworks/laravel_framework.png",
      },
      {
        id: "elysia",
        category: "FRAMEWORKS",
        categoryDesc: "Frameworks ever used in projects",
        index: "07 / 08",
        title: "Elysia.Js",
        description:
          "Building lightweight, high-throughput REST APIs with end-to-end type safety and schema validation for rapid backend prototyping.",
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
        index: "08 / 08",
        title: "Tailwind CSS",
        description:
          "Designing scalable utility-first design systems and custom design tokens.",
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
        index: "01 / 11",
        title: "Git & GitHub",
        description:
          "Managing branches, PR workflows, CI/CD actions, and versioning.",
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
        index: "02 / 11",
        title: "Figma",
        description:
          "Crafting UI/UX mockups, interactive prototypes, and design system tokens.",
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
        index: "03 / 11",
        title: "Antigravity",
        description:
          "Leveraging agentic IDE workflows, custom skills, and autonomous pair-programming protocols to rapidly architect, build, and validate production-ready applications.",
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
        index: "04 / 11",
        title: "Docker",
        description:
          "Containerizing applications, creating environment-isolated microservices with Docker Compose, and streamlining multi-stage deployment builds.",
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
        index: "05 / 11",
        title: "PostgreSQL",
        description:
          "Designing normalized relational schemas, crafting optimized SQL queries, leveraging pgvector embeddings for RAG-powered AI search, and managing index strategies.",
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
        index: "06 / 11",
        title: "MySQL",
        description:
          "Architecting relational database schemas, tuning multi-table join performance, and optimizing query execution plans to reduce latency.",
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
        index: "07 / 11",
        title: "Drizzle",
        description:
          "Building type-safe database queries, managing declarative schema migrations, and handling relational models seamlessly.",
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
        index: "08 / 11",
        title: "Open Code",
        description:
          "Utilizing terminal-driven AI coding agents to automate repetitive engineering tasks, streamline multi-file refactoring, and accelerate feature delivery.",
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
        index: "09 / 11",
        title: "CodeRabbit",
        description:
          "Automating comprehensive pull request code reviews, identifying regression risks, and streamlining peer review feedback loops.",
        experienceYears: "> 1 yr",
        proficiency: "Beginner",
        badgeText: "AI Code Review",
        sideTag: "DevOps  |  CodeRabbit",
        imageUrl: "/images/tools/coderabbit_tools.png",
      },
      {
        id: "sentry",
        category: "TOOLS & WORKFLOW",
        categoryDesc: "Tools and software used daily",
        index: "10 / 11",
        title: "Sentry",
        description:
          "Monitoring real-time application errors, tracing performance bottlenecks, and configuring proactive crash reporting in production.",
        experienceYears: "< 1 yr",
        proficiency: "Beginner",
        badgeText: "Monitoring",
        sideTag: "DevOps  |  Sentry",
        imageUrl: "/images/tools/sentry_tools.webp",
      },
      {
        id: "github-actions",
        category: "TOOLS & WORKFLOW",
        categoryDesc: "Tools and software used daily",
        index: "11 / 11",
        title: "GitHub Actions",
        description:
          "Architecting automated CI/CD pipelines, multi-platform matrix builds, release packaging with windeployqt, and automated testing workflows.",
        experienceYears: "> 1 yr",
        proficiency: "Beginner",
        badgeText: "CI/CD & DevOps",
        sideTag: "DevOps  |  GitHub Actions",
        imageUrl: "/images/tools/github_actions_tools.png",
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
          "Writing type-safe, modular, and asynchronous client and server code.",
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
          "Crafting dynamic, responsive client-side logic, asynchronous event pipelines, and interactive web experiences.",
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
          "Developing native desktop applications using Qt Framework, managing low-level memory safety, pointers, and object-oriented architectures.",
        experienceYears: "2 yrs",
        proficiency: "Intermediate",
        badgeText: "Desktop Dev",
        sideTag: "Desktop Dev  |  C++",
        imageUrl: "/images/languages/cpp_language.png",
      },
      {
        id: "php",
        category: "LANGUAGES",
        categoryDesc: "Core programming languages",
        index: "04 / 04",
        title: "PHP",
        description:
          "Building robust web application backends and administrative systems leveraging Laravel's MVC ecosystem.",
        experienceYears: "2 yrs",
        proficiency: "Intermediate",
        badgeText: "Website",
        sideTag: "Website  |  PHP",
        imageUrl: "/images/languages/php_language.png",
      },
    ],
  },
];
