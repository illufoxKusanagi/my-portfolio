export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  previewImage: string;
  cutoutImage?: string;
  demoUrl?: string;
  demoLabel?: string;
  repoUrl?: string;
  repoLabel?: string;
  isPrivateRepo?: boolean;
  techIcons: {
    name: string;
    iconUrl: string;
  }[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "train-simulation-app",
    title: "TRAIN SIMULATION APP",
    subtitle:
      "Simulate Train Details to Observe Various Variables and Optimize Using Fuzzy Logic",
    description:
      "A hybrid desktop simulation and multi-objective optimization platform that executes longitudinal train dynamics—integrating piecewise tractive effort curves, multi-component Davis and track resistances, and multi-stage electrical power flow integration—coupled with a self-calibrating dynamic Mamdani fuzzy inference engine to automatically resolve non-linear parameter trade-offs between operational travel time, peak electrical power demand, and cumulative energy consumption.",
    previewImage: "/images/projects/train_simul_preview.png",
    cutoutImage: "/images/gtr_car_cutout.png",
    demoUrl:
      "https://drive.google.com/file/d/1pEa2aua1s-0tCSR9nMjCJevRvZ18hrmQ/view?usp=sharing",
    demoLabel: "READ TECHNICAL BOOK",
    repoUrl: undefined,
    isPrivateRepo: true,
    techIcons: [
      { name: "C++", iconUrl: "/images/languages/cpp_language.png" },
      { name: "Qt", iconUrl: "/images/frameworks/qt_framework.png" },
      { name: "Next.js", iconUrl: "/images/frameworks/next_framework.png" },
      { name: "TypeScript", iconUrl: "/images/languages/ts_language.png" },
      { name: "Git", iconUrl: "/images/tools/git_tool.png" },
      { name: "GitHub Actions", iconUrl: "/images/tools/github_actions_tools.png" },
      { name: "CodeRabbit", iconUrl: "/images/tools/coderabbit_tools.png" },
    ],
  },
  {
    id: "horizon-canvas",
    title: "HORIZON CANVAS",
    subtitle: "Generate your image to forza horizon 6 livery",
    description:
      "A GPU-accelerated desktop utility that translates any raster image into a sequence of geometric primitives and injects the shape coordinates directly into Forza Horizon 6 livery layers. Built with C++ and the Qt Framework, the scoring loop runs on OpenCL compute kernels, evaluating millions of primitive candidates per second for optimal visual fidelity.",
    previewImage: "/images/projects/horizon_canvas_preview.png",
    cutoutImage: "/images/gtr_car_cutout.png",
    demoUrl:
      "https://github.com/illufoxKusanagi/horizon-canvas/releases/tag/v0.1.0",
    demoLabel: "DOWNLOAD APP",
    repoUrl: "https://github.com/illufoxKusanagi/horizon-canvas",
    isPrivateRepo: false,
    techIcons: [
      { name: "C++", iconUrl: "/images/languages/cpp_language.png" },
      { name: "Qt", iconUrl: "/images/frameworks/qt_framework.png" },
      { name: "Git", iconUrl: "/images/tools/git_tool.png" },
      { name: "GitHub Actions", iconUrl: "/images/tools/github_actions_tools.png" },
    ],
  },
  {
    id: "my-okane",
    title: "MY OKANE",
    subtitle: "Your personal budget management app",
    description:
      "A comprehensive budget management application for seamless personal finance tracking. Built with Nuxt for SSR performance, Drizzle ORM and SQLite for type-safe data persistence, and Sentry for error monitoring.",
    previewImage: "/images/projects/myokane_preview.png",
    cutoutImage: "/images/gtr_car_cutout.png",
    demoUrl: "https://my-okane-tau.vercel.app",
    repoUrl: undefined,
    isPrivateRepo: true,
    techIcons: [
      { name: "Nuxt", iconUrl: "/images/frameworks/nuxt_framework.png" },
      { name: "TypeScript", iconUrl: "/images/languages/ts_language.png" },
      { name: "Sentry", iconUrl: "/images/tools/sentry_tools.webp" },
      { name: "Drizzle ORM", iconUrl: "/images/tools/drizzle_tools.png" },
      { name: "SQLite", iconUrl: "/images/tools/sqlite_tools.png" },
      { name: "Figma", iconUrl: "/images/tools/figma_tools.png" },
      { name: "Git", iconUrl: "/images/tools/git_tool.png" },
    ],
  },
  {
    id: "my-cars",
    title: "MY CARS",
    subtitle: "Interactive 3D Web Application To Show GT-R Models",
    description:
      "A high-performance 3D automotive showroom specifically for the GT-R family built with Three.js, WebGL, and Vue 3. Features realistic physically-based rendering (PBR) materials, dynamic camera orbit controls, custom factory paint selector, model picker, and environment lighting selector.",
    previewImage: "/images/projects/my_cars_preview.png",
    cutoutImage: "/images/gtr_car_cutout.png",
    demoUrl: "https://my-cars-puce.vercel.app/",
    repoUrl: "https://github.com/illufoxKusanagi/my-cars",
    isPrivateRepo: false,
    techIcons: [
      { name: "React", iconUrl: "/images/frameworks/react_framework.png" },
      { name: "Three.js", iconUrl: "/images/frameworks/tech_icon_three.png" },
      { name: "TypeScript", iconUrl: "/images/languages/ts_language.png" },
      { name: "Figma", iconUrl: "/images/tools/figma_tools.png" },
      { name: "Git", iconUrl: "/images/tools/git_tool.png" },
      { name: "Vercel", iconUrl: "/images/tools/vercel_tools.svg" },
    ],
  },
  {
    id: "sate-itik",
    title: "SATE ITIK",
    subtitle: "Sistem Akses Terpadu Infrastruktur Jaringan TIK",
    description:
      "An integrated government network infrastructure monitoring system built with Next.js and MySQL. Includes a real-time internet infrastructure dashboard with Mapbox GL, a comprehensive e-ticketing support system, an activity calendar, server health tracking, and secure role-based access via Next Auth.",
    previewImage: "/images/projects/sate_itik_preview.png",
    cutoutImage: "/images/gtr_car_cutout.png",
    demoUrl: "https://sate-itik.madiunkab.go.id",
    repoUrl: undefined,
    isPrivateRepo: true,
    techIcons: [
      { name: "Next.js", iconUrl: "/images/frameworks/next_framework.png" },
      { name: "TypeScript", iconUrl: "/images/languages/ts_language.png" },
      { name: "Drizzle ORM", iconUrl: "/images/tools/drizzle_tools.png" },
      { name: "MySQL", iconUrl: "/images/tools/mysql_tools.png" },
      { name: "Mapbox GL", iconUrl: "/images/tools/mapbox_tools.png" },
      { name: "Next Auth", iconUrl: "/images/tools/next_auth_tools.png" },
      { name: "Git", iconUrl: "/images/tools/git_tool.png" },
    ],
  },
  {
    id: "my-quran",
    title: "MY QURAN",
    subtitle: "Your personal Al-Quran app with interactive book-like view",
    description:
      "A full-stack Quran reading application with an interactive page-flip book interface. Features surah navigation, ayah bookmarking, and audio recitation. Built with Vue on the frontend, backed by an Elysia.js API, PostgreSQL, and containerized with Docker for consistent deployments.",
    previewImage: "/images/projects/my_quran_preview.png",
    cutoutImage: "/images/gtr_car_cutout.png",
    demoUrl: "https://my-quran-fe.vercel.app",
    repoUrl: undefined,
    isPrivateRepo: true,
    techIcons: [
      { name: "Vue", iconUrl: "/images/frameworks/vue_framework.png" },
      { name: "TypeScript", iconUrl: "/images/languages/ts_language.png" },
      { name: "Drizzle ORM", iconUrl: "/images/tools/drizzle_tools.png" },
      { name: "Elysia.js", iconUrl: "/images/frameworks/elysia_framework.png" },
      { name: "PostgreSQL", iconUrl: "/images/tools/postgre_tools.png" },
      { name: "Docker", iconUrl: "/images/tools/docker_tools.png" },
      { name: "Git", iconUrl: "/images/tools/git_tool.png" },
    ],
  },
  {
    id: "my-library",
    title: "MY LIBRARY",
    subtitle: "Interactive book management app for librarian",
    description:
      "A web-based library management system that eliminates manual logging for librarians. Borrowers can browse available books and submit borrow requests; librarians can accept, reject, or block books through a role-based admin interface. Built with Laravel, MySQL, and containerized with Docker.",
    previewImage: "/images/projects/my_library_preview.png",
    cutoutImage: "/images/gtr_car_cutout.png",
    demoUrl: "https://illufox-kusanagi.freedev.app",
    repoUrl: "https://github.com/illufoxKusanagi/my-library",
    isPrivateRepo: false,
    techIcons: [
      { name: "Laravel", iconUrl: "/images/frameworks/laravel_framework.png" },
      { name: "MySQL", iconUrl: "/images/tools/mysql_tools.png" },
      { name: "PHP", iconUrl: "/images/languages/php_language.png" },
      { name: "Docker", iconUrl: "/images/tools/docker_tools.png" },
      { name: "Git", iconUrl: "/images/tools/git_tool.png" },
    ],
  },
  {
    id: "image-converter",
    title: "IMAGE CONVERTER",
    subtitle: "Convert any image format to any image format",
    description:
      "A portable offline desktop utility for batch image format conversion and quality reduction. Works like iLoveIMG but runs entirely locally — no uploads, no internet, no installation required. Supports percentage-based quality control and ships as a single portable executable.",
    previewImage: "/images/projects/image_converter_preview.png",
    cutoutImage: "/images/gtr_car_cutout.png",
    demoUrl:
      "https://github.com/illufoxKusanagi/image-converter/releases/tag/v1.0.0",
    demoLabel: "DOWNLOAD APP",
    repoUrl: "https://github.com/illufoxKusanagi/image-converter",
    isPrivateRepo: false,
    techIcons: [
      { name: "C++", iconUrl: "/images/languages/cpp_language.png" },
      { name: "Qt", iconUrl: "/images/frameworks/qt_framework.png" },
      { name: "Git", iconUrl: "/images/tools/git_tool.png" },
      { name: "GitHub Actions", iconUrl: "/images/tools/github_actions_tools.png" },
      { name: "CodeRabbit", iconUrl: "/images/tools/coderabbit_tools.png" },
    ],
  },
  {
    id: "laras",
    title: "LARAS",
    subtitle: "Your Self-Care App",
    description:
      "Frontend developer on a 8-person team shipping a new feature every month over an 8-month agile cycle, incorporating feedback from underclassmen, seniors, and the program's third-party stakeholder. Published on Google Play and web (laras.agileteknik.com).",
    previewImage: "/images/projects/laras_preview.png",
    cutoutImage: "/images/gtr_car_cutout.png",
    demoUrl: "https://laras.agileteknik.com/home",
    repoUrl: undefined,
    isPrivateRepo: true,
    techIcons: [
      { name: "React", iconUrl: "/images/frameworks/react_framework.png" },
      { name: "TypeScript", iconUrl: "/images/languages/ts_language.png" },
      { name: "Git", iconUrl: "/images/tools/git_tool.png" },
    ],
  },
  {
    id: "excel-formatter",
    title: "EXCEL FORMATTER",
    subtitle:
      "Your excel numbering format is messed up? Use this app to convert it!",
    description:
      "A portable desktop utility that corrects malformed number formatting in Excel spreadsheets — recognizing both dot and comma as decimal separators. Supports batch processing across multiple sheets in a single file via a simple drag-and-drop interface. No installation required; ships as a single executable.",
    previewImage: "/images/projects/excel_formater_preview.png",
    cutoutImage: "/images/gtr_car_cutout.png",
    demoUrl:
      "https://github.com/illufoxKusanagi/excel-formatter/releases/tag/v1.1.0",
    demoLabel: "DOWNLOAD APP",
    repoUrl: "https://github.com/illufoxKusanagi/excel-formatter",
    isPrivateRepo: false,
    techIcons: [
      { name: "C++", iconUrl: "/images/languages/cpp_language.png" },
      { name: "Qt", iconUrl: "/images/frameworks/qt_framework.png" },
      { name: "Git", iconUrl: "/images/tools/git_tool.png" },
      { name: "GitHub Actions", iconUrl: "/images/tools/github_actions_tools.png" },
      { name: "CodeRabbit", iconUrl: "/images/tools/coderabbit_tools.png" },
    ],
  },
];
