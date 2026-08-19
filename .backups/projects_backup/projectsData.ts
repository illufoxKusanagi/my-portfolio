export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  previewImage: string;
  cutoutImage?: string;
  demoUrl?: string;
  repoUrl?: string;
  techIcons: {
    name: string;
    iconUrl: string;
  }[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "horizon-canvas",
    title: "HORIZON CANVAS",
    subtitle: "Generate your image to forza horizon 6 livery",
    description:
      "A fast, OpenCL-accelerated vector painting and memory injection utility built specifically for Forza Horizon 6. It translates digital images into overlapping geometric primitives and injects the shape coordinates directly into the livery layers using an optimized GPU-bound scoring loop. Built as a standalone C++ desktop application with the Qt Framework.",
    previewImage: "/images/horizon_canvas.png",
    cutoutImage: "/images/gtr_car_cutout.png",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/illufoxKusanagi/horizon-canvas",
    techIcons: [
      { name: "C++", iconUrl: "/images/cpp_language.png" },
      { name: "Qt", iconUrl: "/images/qt_framework.png" },
      { name: "Git", iconUrl: "/images/git_tool.png" },
    ],
  },
  {
    id: "gtr-showroom",
    title: "GT-R SHOWROOM",
    subtitle: "Interactive 3D Automotive Web Application",
    description:
      "A high-performance 3D automotive showroom built with Three.js, WebGL, and Vue 3. Features realistic physically-based rendering (PBR) materials, dynamic camera orbit controls, custom midnight purple paint shaders, and interactive particle wind tunnel aerodynamics.",
    previewImage: "/images/gtr_showroom_preview.png",
    cutoutImage: "/images/gtr_car_cutout.png",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    techIcons: [
      { name: "Vue", iconUrl: "/images/vue_framework.png" },
      { name: "Three.js", iconUrl: "" },
      { name: "TypeScript", iconUrl: "/images/ts_language.png" },
      { name: "Figma", iconUrl: "" },
      { name: "Git", iconUrl: "/images/git_tool.png" },
    ],
  },
  {
    id: "my-okane",
    title: "MY OKANE",
    subtitle: "Your personal budget management app",
    description:
      "A comprehensive budget management application designed for seamless financial tracking. Built with Nuxt for SSR performance, leveraging Drizzle ORM and SQLite for robust and type-safe data persistence.",
    previewImage: "/images/myokane_preview.png",
    cutoutImage: "/images/gtr_car_cutout.png",
    demoUrl: "https://my-okane-tau.vercel.app",
    repoUrl: "https://github.com/",
    techIcons: [
      { name: "Nuxt", iconUrl: "/images/nuxt_framework.png" },
      { name: "TypeScript", iconUrl: "/images/ts_language.png" },
      { name: "Drizzle ORM", iconUrl: "" },
      { name: "SQLite", iconUrl: "" },
      { name: "Figma", iconUrl: "" },
      { name: "Git", iconUrl: "/images/git_tool.png" },
    ],
  },
  {
    id: "sate-itik",
    title: "SATE ITIK",
    subtitle: "Sistem Akses Terpadu Infrastruktur Jaringan TIK",
    description:
      "An integrated government network infrastructure monitoring system built with Next.js and MySQL. Features include a real-time internet infrastructure monitoring dashboard using Mapbox GL, a comprehensive e-ticketing support system, an activity calendar, and server health tracking with secure Next Auth integration.",
    previewImage: "/images/sate_itik_preview.png",
    cutoutImage: "/images/gtr_car_cutout.png",
    demoUrl: "https://sate-itik.madiunkab.go.id",
    repoUrl: "-",
    techIcons: [
      { name: "Next.js", iconUrl: "/images/next_framework.png" },
      { name: "TypeScript", iconUrl: "/images/ts_language.png" },
      { name: "Drizzle ORM", iconUrl: "" },
      { name: "MySQL", iconUrl: "" },
      { name: "Mapbox GL", iconUrl: "" },
      { name: "Next Auth", iconUrl: "" },
      { name: "Git", iconUrl: "/images/git_tool.png" },
    ],
  },
  {
    id: "portfolio-3d",
    title: "MY PORTFOLIO 3D",
    subtitle: "Personal Portfolio & Interactive Experience",
    description:
      "Modern developer portfolio built with Nuxt 3, Tailwind CSS v4, GSAP ScrollTrigger, and Lenis smooth scrolling. Features 1:1 Figma token matching, custom clip-path polygon wipe transitions, interactive 3D elements powered by Three.js, and dark mode aesthetics.",
    previewImage: "/images/gtr_showroom_preview.png",
    cutoutImage: "/images/gtr_car_cutout.png",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    techIcons: [
      { name: "Nuxt", iconUrl: "/images/nuxt_framework.png" },
      { name: "Three.js", iconUrl: "" },
      { name: "TypeScript", iconUrl: "/images/ts_language.png" },
      { name: "Tailwind", iconUrl: "" },
      { name: "Git", iconUrl: "/images/git_tool.png" },
    ],
  },
];
