# Contact API Architecture & Cyber Toast Deep-Dive

This document explains the full architecture of the contact form endpoint, client validation, honeypot anti-spam, and toast feedback mechanism implemented in this portfolio.

---

## 1. What Was Implemented

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                CLIENT (Browser)                                 │
│                                                                                 │
│  [ContactForm.vue]                                                              │
│     ├── Reactive Inputs (v-model: name, email, message)                         │
│     ├── Invisible Spam Honeypot (v-model: company_url)                          │
│     └── Client Guard (Length & RFC 5322 regex checks)                           │
│           │                                                                     │
│           ▼                                                                     │
│  [useContactForm.ts]                                                            │
│     ├── Dispatches POST /api/contact via $fetch                                 │
│     └── Catches status codes: 200 (OK), 422 (Validation), 429 (Rate Limit)       │
│           │                                                                     │
│           ▼                                                                     │
│  [useCyberToast.ts]  <─── (Global Nuxt `useState` Reactive Pipeline)           │
│           │                                                                     │
│           ▼                                                                     │
│  [CyberToastContainer.vue] (Root App Layer, z-[99999])                         │
│     ├── Multi-panel card with emerald/rose/amber accent strips                  │
│     ├── Oxanium monospace telemetry header (`// TRANSMISSION // 200 OK`)        │
│     └── Pure CSS animated countdown progress bar                                │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │  ▲
           HTTP POST /api/contact   │  │  JSON Response (200 / 422 / 429)
                                    ▼  │
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            SERVER (Nitro / Nuxt 4)                              │
│                                                                                 │
│  [server/api/contact.post.ts]                                                   │
│     ├── 1. IP Rate Limiter Guard (Sliding window: max 5 req / 2 min)             │
│     ├── 2. Spam Honeypot Check (Silently drop bots if company_url is set)       │
│     ├── 3. Strict RFC 5322 Email & String Length Validation                     │
│     ├── 4. HTML Entity Sanitization (XSS payload stripping)                     │
│     └── 5. Structured JSON Response Dispatch                                    │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Why It Works Properly & Reliably

### 1. Unified Server & Client Contract
- **No Mock Timing Hacks**: Replaced mock `setTimeout` dummy responses with a genuine Nitro event handler (`server/api/contact.post.ts`).
- **Standardized HTTP Status Codes**:
  - `200 OK`: Successful validation and transmission.
  - `422 Unprocessable Content`: Returned when fields violate length or email formatting constraints, along with granular `errors: { name: "...", email: "..." }`.
  - `429 Too Many Requests`: Returned when an IP exceeds the rate limit window, preventing spam flooding and server exhaustion.

### 2. Silent Bot Honeypot (`company_url`)
- Automated spam bots scan DOM inputs and greedily populate every `<input>`.
- The `company_url` input is styled with `class="hidden"` and `tabindex="-1"`, making it completely invisible and inaccessible to real human users.
- If `company_url` contains any text, the server immediately returns a silent `200 OK` without logging or forwarding, trapping bots with 0 friction to humans (no CAPTCHA puzzles).

### 3. Cross-Component Toast Reactivity via `useState`
- In Nuxt 4 SSR, standard standalone module variables (`const toasts = ref([])`) can experience isolation discrepancies between layout contexts.
- Using `useState('cyber_toasts', () => [])` creates a single SSR-safe, client-hydrated reactive store accessible simultaneously by `useContactForm` and `CyberToastContainer`.

### 4. Zero-Dependency High Performance (KISS & Ponytail)
- **Native Pure CSS Progress Bars**: Uses `@keyframes countdown` without heavy JS animation timer loops.
- **Zero Third-Party Bloat**: Built purely using native Nuxt 4 / Nitro utilities (`h3`, `useState`, `TransitionGroup`), saving ~40KB of bundle weight.

---

## 3. What If We Use Third-Party Libraries?

Here is an objective comparison if you wish to integrate specialized npm libraries:

### A. Real Email Transmission (Backend)
Currently, the endpoint validates, sanitizes, and logs incoming inquiries. To forward them to your personal email inbox, you can connect an SMTP/API provider:

| Option | Pros | Cons | Recommendation |
|---|---|---|---|
| **Resend (`resend`)** | Modern, clean TypeScript SDK, generous free tier (3,000 emails/month), 2 lines of code. | Requires free API key signup. | **Recommended** |
| **Nodemailer (`nodemailer`)** | Direct Gmail/SMTP support without vendor lock-in. | Requires managing raw SMTP credentials and app passwords. | Good for self-hosted SMTP. |
| **SendGrid (`@sendgrid/mail`)** | Enterprise-grade deliverability. | Complex setup, strict domain authentication required. | Overkill for personal portfolio. |

#### Example: Upgrading to Resend (When Ready)
```ts
// server/api/contact.post.ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'portfolio@illufox.dev',
  to: process.env.CONTACT_RECIPIENT_EMAIL || 'your_email@domain.com',
  subject: `New Inquiry from ${sanitizedName}`,
  text: `From: ${sanitizedName} <${sanitizedEmail}>\n\nMessage:\n${sanitizedMessage}`,
});
```

---

### B. Form Validation Libraries
| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Native Validation (Current)** | Zero dependencies, ~0KB bundle, zero breaking updates. | Manual regex & length checks. | **Best for 3-field contact forms.** |
| **VeeValidate + Zod** | Schema-driven, deep form state management. | +35KB bundle size, verbose boilerplate for simple forms. | Great for 10+ field dashboards. |

---

### C. Toast Notification Libraries
| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Custom Cyber Toast (Current)** | 100% matched to portfolio design DNA (Oxanium font, Figma accent strips, telemetry badges). | Custom-maintained component. | **Best visual fidelity & zero extra dependencies.** |
| **Vue Sonner (`vue-sonner`)** | Pre-built stack physics and swipe-to-dismiss. | Generic macOS toast aesthetic, requires CSS overrides to match Cyber theme. | Solid alternative if gesture swiping is needed. |

---

## 4. Verification Results

- **TypeScript Typecheck**: `npx nuxi typecheck` passed with **0 errors**.
- **Live Submission Test**: Verified via browser testing:
  - Input submission triggers API request.
  - Server accepts payload with `200 OK`.
  - Form fields reset smoothly.
  - Cyber toast slides into view with live countdown timer and telemetry header.
