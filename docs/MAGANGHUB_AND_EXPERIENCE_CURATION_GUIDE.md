# MagangHub Apprenticeship & Engineering Portfolio Curation Guide

A comprehensive architectural and career strategy guide on how to position **MagangHub (Kemnaker)** apprenticeship experience and curate enterprise projects (e.g., at **PT INKA**) in this portfolio.

---

## 1. What MagangHub Actually Is

* **Platform, Not Employer**: MagangHub (`maganghub.kemnaker.go.id`) is the national matchmaking portal under Kemnaker RI's **SIAPkerja** ecosystem (alongside *Karirhub* and *Skillhub*).
* **Legal Framework**: It operates under the *Program Pemagangan Dalam Negeri* (*Permenaker No. 6/2020*). It is legally distinct from student internships (*PKL / Magang Kuliah*) and standard employment (*PKWT / PKWTT*).
* **Employer Attribution Rule**: You do **not** list MagangHub or Kemnaker as your company. Your employer and engineering environment is the **Host Company** (e.g., **PT INKA (Persero)**). Listing MagangHub as an employer is like listing LinkedIn or Jobstreet as your employer.

---

## 2. Industry Perception & Honest Framing

1. **Brand Prestige Reality**:
   * In private tech (startups, consultancies, product companies), the "MagangHub" label carries zero prestige. It is often perceived by tech recruiters as a government talent-absorption initiative rather than a selective tech fellowship.
   * **Solution**: Never lead with "MagangHub" in your headlines or titles. Lead with **your role and the host enterprise**: `Software Engineer at PT INKA (Persero)`.

2. **Employment Type Classification**:
   * Do **not** claim it is a standard full-time employee (*karyawan tetap / PKWT*) position, as background checks, payslips, or *paklaring* will reflect a *Sertifikat Pemagangan Kemnaker*.
   * **Recommended Badges**:
     * **`APPRENTICESHIP`**: The international standard term for government-backed, industry-placed talent acceleration.
     * **`CONTRACT`** / **`ASSOCIATE DEVELOPER`**: Accurate if your daily routine and deliverables mirror a junior software engineer on the team.

---

## 3. The Golden Rule: Curate in Projects, Aggregate in Experience

```
┌─────────────────────────────────────────────────────────────────┐
│                    EXPERIENCE SECTION                           │
│  - 1 Consolidated Card for PT INKA (Persero)                    │
│  - Role: SOFTWARE ENGINEER                                      │
│  - Type: APPRENTICESHIP (or CONTRACT)                           │
│  - Period: 2026 - Present                                       │
│  - Bullets: Aggregates ALL deliverables across all projects     │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PROJECTS SECTION                            │
│  - Highlight ONLY 1 to 2 Flagship Projects                      │
│  - Selected for high architectural complexity and visual polish │
└─────────────────────────────────────────────────────────────────┘
```

### A. Experience Section (`experienceData.ts`)
* Keep **one unified card** for your employment at PT INKA.
* Aggregate every project you worked on into distinct, high-impact bullet points.
* Focus each bullet point on architecture, metrics, and domain engineering:
  * *Bullet 1*: Real-time diagnostics / simulation systems.
  * *Bullet 2*: Full-stack internal dashboards or logistics tooling.
  * *Bullet 3*: CI/CD automation, testing, or multi-platform packaging.

### B. Projects Section (`projectsData.ts`)
* **Do NOT dump every task or internal tool into the projects catalog.**
* Adding 4–5 small internal CRUD tools from the same company clutters the UI and dilutes your top work.
* Only add a standalone project card if it satisfies **at least two** of these criteria:
  1. **High Complexity**: Non-trivial engineering (WebSockets, WebGL, mathematical solvers, dynamic charts, microservices).
  2. **Visual Appeal**: High-fidelity dashboard or interactive UI that looks great in screenshots.
  3. **Stack Diversity**: Demonstrates a different capability (e.g., modern Next.js/PostgreSQL full-stack web vs. C++/Qt desktop simulation).

---

## 4. Enterprise & BUMN Confidentiality (NDA Protocols)

Because PT INKA is a state-owned enterprise (BUMN) manufacturing heavy rail and transport infrastructure:

1. **Sanitize Screenshots**:
   * Blur internal IP addresses, server hostnames, internal database schemas, real employee names, and classified contract numbers.
2. **Abstract Internal Project Names**:
   * If a system has a classified internal codename, re-title it based on its architecture:
     * *Example*: *"Railway Fleet Telemetry Dashboard"* or *"Industrial Inventory Tracking System"*.
3. **Repository Privacy**:
   * Always set `isPrivateRepo: true` in `projectsData.ts`.
   * Keep `repoUrl: undefined`.
4. **Focus on Engineering Challenges**:
   * Describe *how* you solved concurrency, caching, data-table rendering, or state management rather than revealing proprietary trade secrets.

---

## 5. Ready-to-Use Code Templates

### A. Template for `experienceData.ts`

```typescript
{
  id: "inka-swe",
  role: "SOFTWARE ENGINEER",
  company: "PT INKA (PERSERO)",
  period: "Jan 2026 - Present",
  type: "Apprenticeship", // or "Contract"
  bullets: [
    "Engineered production software systems across railway engineering and operational workflows, adhering to strict enterprise architectural standards.",
    "Architected [System A] using [Tech Stack], improving operational throughput and data visibility for engineering operators.",
    "Built and optimized [System B] with [Tech Stack], implementing role-based access control and real-time telemetry streaming.",
    "Automated continuous integration and deployment pipelines, reducing release packaging and validation cycles."
  ],
  bgImage: "/images/experiences/experience_madiun.png",
  thumbnail: "/images/experiences/experience_madiun.png",
}
```

### B. Template for `projectsData.ts` (For Flagship Projects Only)

```typescript
{
  id: "inka-flagship-system",
  title: "RAILWAY FLEET TELEMETRY DASHBOARD",
  subtitle: "Industrial IoT Monitoring & Diagnostics Platform for Rail Subsystems",
  description:
    "An enterprise monitoring platform providing real-time telemetry tracking and fault diagnostics for railway subsystems. Features high-frequency time-series data visualization, interactive status mapping, and automated anomaly alert thresholds.",
  previewImage: "/images/projects/inka_flagship_preview.png",
  cutoutImage: "/images/gtr_car_cutout.png",
  demoUrl: undefined,
  repoUrl: undefined,
  isPrivateRepo: true,
  techIcons: [
    { name: "Next.js", iconUrl: "/images/frameworks/next_framework.png" },
    { name: "TypeScript", iconUrl: "/images/languages/ts_language.png" },
    { name: "PostgreSQL", iconUrl: "/images/tools/postgre_tools.png" },
    { name: "Docker", iconUrl: "/images/tools/docker_tools.png" },
    { name: "Shadcn UI", iconUrl: "/images/tools/shadcn_ui_tools.png" },
    { name: "Git", iconUrl: "/images/tools/git_tool.png" }
  ]
}
```

