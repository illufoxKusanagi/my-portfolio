export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string; // e.g. "Internship", "Freelance", "Academic"
  bullets: string[];
  bgImage: string;
  thumbnail: string;
}

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "inka",
    role: "DESKTOP APP DEVELOPER",
    company: "PT INKA",
    period: "Jan 2025 - Jun 2025",
    type: "Internship",
    bullets: [
      "Architected a high-performance desktop train simulation application using C++17 and the Qt 6 Framework (QWidgets, QChart, QFile), packaged as a portable Windows-only executable via windeployqt.",
      "Enforced strict memory safety using a centralized AppContext singleton as the single source of truth for all shared state, eliminating cross-module data races between simulation controllers.",
      "Structured the codebase into layered handler modules — ElectricalDataHandler, TrainDataHandler, TrackDataHandler, MovingHandler, EnergyHandler, ResistanceHandler, TractiveEffortHandler — each with isolated responsibilities aligned to the physics domain.",
      "Implemented simulation logic covering tractive effort curves, Davis running resistance, track gradient/curvature, real-time braking calculus, and multi-car mass inertia using custom prefix-notation variable conventions (f_, v_, p_, e_, mass_).",
      "Delivered real-time charting with QChart, CSV export via QFile, and a login-protected parameter entry UI, packaged as a zero-install portable executable for operator deployment.",
      "Configured automated GitHub Actions CI/CD pipelines for continuous build validation across MinGW-64 toolchain.",
    ],
    bgImage: "/images/experiences/experience_madiun.png",
    thumbnail: "/images/experiences/experience_madiun.png",
  },
  {
    id: "diskominfo",
    role: "FULL-STACK DEVELOPER",
    company: "KOMINFO KABUPATEN MADIUN",
    period: "Aug 2025 - Dec 2025",
    type: "Internship",
    bullets: [
      "Built SATE-ITIK (Sistem Akses Terpadu Infrastruktur Jaringan TIK) — a government-grade web platform for Dinas Kominfo Kabupaten Madiun, centralizing internet infrastructure monitoring, personnel management, server asset tracking, and helpdesk ticketing across all district OPD offices.",
      "Developed an interactive Mapbox GL JS map dashboard displaying real-time geolocation, ISP provider, connection type, and status (active/inactive/maintenance) for every government network installation point across sub-districts and public facilities.",
      "Engineered a visual server rack management module with dual-view (rack visualization + data table) supporting per-unit status tracking (online, offline, maintenance, standby), asset numbers, serial numbers, IP addresses, and installed application inventories across racks A–D.",
      "Implemented a full-cycle helpdesk and e-ticketing system with priority tiers (low/medium/high/urgent), status tracking (open/in-progress/awaiting/resolved/closed), TipTap rich-text threaded replies, file attachments, staff assignment, and first-response/resolution time metrics — integrated with Resend and Nodemailer for email notifications.",
      "Designed and optimized relational database schemas in MySQL using Drizzle ORM with Drizzle Kit migrations; implemented efficient indexing and structured queries for high-volume government event and infrastructure records.",
      "Built secure RESTful API endpoints under Next.js App Router, enforcing Zod schema validation and role-based access control (RBAC) with JWT authentication and bcrypt password encryption.",
    ],
    bgImage: "/images/experiences/experience_sate_itik.png",
    thumbnail: "/images/experiences/experience_sate_itik.png",
  },
];
