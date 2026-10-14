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
      "Built a desktop longitudinal train simulation application in C++17 and Qt 6 (QWidgets, QChart, QFile), packaged as a standalone Windows executable via windeployqt.",
      "Centralized shared simulation state inside a single AppContext singleton to prevent cross-module pointer races across UI and solver threads.",
      "Split the physics engine into dedicated domain handlers—ElectricalDataHandler, TrainDataHandler, TrackDataHandler, MovingHandler, EnergyHandler, ResistanceHandler, and TractiveEffortHandler.",
      "Implemented tractive effort curves, Davis running resistance, track grade/curvature forces, braking distances, and multi-car mass inertia using explicit unit-prefixed variables (f_, v_, p_, e_, mass_).",
      "Added real-time QChart telemetry plotting, QFile CSV data export, and a password-protected parameter configuration screen for engineering operators.",
      "Set up GitHub Actions CI/CD workflows to compile and verify MinGW-64 release artifacts on every push.",
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
      "Built SATE-ITIK (Sistem Akses Terpadu Infrastruktur Jaringan TIK), a district-wide web platform for Dinas Kominfo Kabupaten Madiun uniting network node monitoring, staff records, server rack inventory, and helpdesk ticketing across local government agencies (OPD).",
      "Created an interactive Mapbox GL JS dashboard plotting live coordinates, ISP providers, link types, and operational status (active, inactive, maintenance) for government network installations across sub-districts.",
      "Developed a dual-view server rack module (visual rack elevation + tabular inventory) tracking unit status, asset tags, serial numbers, IP assignments, and hosted applications across Racks A–D.",
      "Built an end-to-end helpdesk ticketing workflow with priority levels, SLA response/resolution timers, TipTap rich-text replies, file attachments, and automated email alerts via Resend and Nodemailer.",
      "Modeled relational MySQL schemas using Drizzle ORM and Drizzle Kit migrations, indexing high-traffic ticket and network-node tables for fast filtering.",
      "Secured Next.js App Router API endpoints with Zod request validation, JWT session authentication, bcrypt password hashing, and role-based access control (RBAC).",
      "Added a multi-view OPD activity calendar (month/week/day/year) with drag-and-drop rescheduling, and containerized the application with multi-stage Docker Compose builds.",
    ],
    bgImage: "/images/experiences/experience_sate_itik.png",
    thumbnail: "/images/experiences/experience_sate_itik.png",
  },
];
