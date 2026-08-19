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
      "Delivered an interactive activity calendar with month/week/day/year views, drag-and-drop rescheduling, OPD-categorized color-coded events — containerized the full stack using Docker Compose with multi-stage production builds.",
    ],
    bgImage: "/images/experiences/experience_madiun.png",
    thumbnail: "/images/experiences/experience_madiun.png",
  },
  {
    id: "laras",
    role: "FRONTEND ENGINEER",
    company: "AGILETEKNIK - LARAS",
    period: "March 2024 - Dec 2024",
    type: "Product-Based Learning Program",
    bullets: [
      "Created high-fidelity landing pages and portfolios featuring custom GSAP animations and Tailwind styling.",
      "Implemented responsive web designs that work seamlessly across desktop, tablet, and mobile layouts.",
      "Optimized web performance, achieving near-perfect 95+ scores on Google Lighthouse Core Web Vitals.",
      "Collaborated directly with clients to translate business goals into clean, interactive user interfaces.",
      "Integrated payment gateways and modern headless CMS platforms (Strapi, Sanity.io).",
    ],
    bgImage: "/images/experiences/experience_sate_itik.png",
    thumbnail: "/images/experiences/experience_sate_itik.png",
  },
  {
    id: "train-simulation-optimization",
    role: "LEAD RESEARCHER & SOFTWARE ENGINEER",
    company: "PENS",
    period: "Aug 2024 - Jul 2025",
    type: "Applied Bachelor Thesis",
    bullets: [
      "Built a hybrid desktop simulation platform combining a C++17 (Qt 6) backend with a Next.js 14 (TypeScript, Tailwind CSS) UI rendered via Chromium Qt WebEngine, resolving desktop packaging virtualization crashes through programmatic sandbox bypasses (QTWEBENGINE_DISABLE_SANDBOX=1).",
      "Implemented a Data-Oriented Programming (DOP) architecture, isolating Plain Old Data (POD) structs from stateless computational controllers and organizing time-series outputs into Structure of Arrays (SoA) for zero-allocation memory sweeps.",
      "Engineered a longitudinal train dynamics simulation in C++, modeling piecewise 3-region tractive effort curves, Davis running resistance, track elevation/curvature profiles, and multi-stage power flow (wheel mechanical output to catenary line).",
      "Formulated analytical 3-zone braking distance calculus across motor field-weakening regimes, driving a discrete forward Euler simulation loop (1.0-second time steps) with a 4-state notch machine (AtStation, Accelerating, Coasting, Braking).",
      "Developed a Two-Pass Dynamic Range Mamdani Fuzzy Inference System (FIS) that dynamically self-calibrates membership boundaries across 3 decoupled sub-engines (TimeEngine, PowerEngine, EnergyEngine) using 100-step discrete Centroid defuzzification.",
      "Accelerated multi-objective parameter sweeps across 104 candidate configurations to under 2.0 seconds using C++ QtConcurrent multi-threading with signal-blocking, outperforming traditional metaheuristic algorithms (40–80 minutes).",
      "Delivered a comprehensive operator analytics suite featuring an 8-tab time-series dashboard (Recharts), native CSV/Excel export dialogs via QWebChannel, guided onboarding tours (Driver.js), and bilingual (EN/ID) localization.",
    ],
    bgImage: "/images/experiences/experience_relaksasi.png",
    thumbnail: "/images/experiences/experience_relaksasi.png",
  },
];
