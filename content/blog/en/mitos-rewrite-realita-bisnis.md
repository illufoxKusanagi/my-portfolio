---
title: "The 'Rewrite' Myth and Business Realities: Why 'If It Works, Don't Touch It' Is Not Just a Joke"
subtitle: "Lessons from the programmer bell curve, Facebook's HHVM, and hybrid Next.js + C++ integration"
summary: "Deconstructing the total rewrite trap through the lens of engineering velocity, business viability, and real-world production software architecture case studies."
publishedAt: "2026-08-18"
readTime: "6 min read"
category: "Engineering Strategy"
tags: ["Software Engineering", "Technical Debt", "Architecture", "Business Velocity", "C++", "Next.js"]
coverImage: "/images/projects/train_simul_preview.png"
---

The classic bell curve meme about *"If it works, don't touch it"* divides software engineers into three distinct evolutionary phases:

1. **Left (Beginner)**: Afraid to touch or modify code out of fear of breaking working behavior without understanding the root cause.
2. **Middle (Mid-Level / Idealist)**: Demands a total rewrite from scratch because the codebase feels "messy", violates clean code dogmas, or lacks the newest design patterns.
3. **Right (Senior Engineer)**: Understands that rewriting stable code that is currently generating revenue without a compelling business justification is operational suicide.

---

## 1. Large-Scale Case Study: Facebook and HipHop Virtual Machine

During its explosive early growth, Facebook's entire monolithic codebase was written in PHP. As global user traffic skyrocketed, interpreted PHP execution became too slow and consumed enormous amounts of server hardware.

The instinctive reaction of engineers in the middle of the bell curve was:
> *"Rewrite the entire system from scratch in C++ or Java!"*

From a business standpoint, that decision would have been fatal. Undertaking a complete rewrite of a massive codebase serving hundreds of millions of daily active users means **Engineering Velocity** (the speed of shipping new features) grinds to a halt for months or years. The product stagnates, competitors overtake market share, and the business loses its competitive edge permanently.

::callout-alert{type="warning"}
The most architecturally perfect software in the world has zero value if the business fails because it was too slow to deliver to the market.
::

### Lower-Level Infrastructure Solutions
What did Facebook's engineering leadership actually do? They applied the *"If it works, don't touch it"* philosophy directly to their application codebase:

- Instead of rewriting millions of lines of stable, revenue-generating PHP code, they **shifted the execution workload down into compilation and low-level infrastructure**.
- They built the **HipHop Virtual Machine (HHVM)** and a Just-In-Time (JIT) compiler to execute legacy PHP code at near-native C++ speeds.

The outcome: **Existing code continued running, new features kept shipping daily, server performance multiplied, and business continuity was preserved.**

---

## 2. Realities of Hybrid System Integration: Next.js & C++ QtWebEngine

This lesson becomes acutely practical when architecting complex multi-technology systems. In one of my hybrid desktop projects—integrating a modern **Next.js (TypeScript, Tailwind CSS)** interface with a high-performance **C++17 (Qt 6)** numerical simulation backend via **Chromium QtWebEngine**:

```
+-------------------------------------------------------+
|  Next.js 14 Web UI (Chromium QtWebEngine Context)     |
|  - Operator Dashboard, Recharts Analytics, Driver.js  |
+---------------------------+---------------------------+
                            | QWebChannel IPC Bridge
+---------------------------v---------------------------+
|  C++17 Core Engine (Stateless Controllers & SoA POD)  |
|  - Longitudinal Physics, FIS Fuzzy Optimization       |
+-------------------------------------------------------+
```

When managing such distributed layers, the temptation to either rewrite the whole UI in native C++ widgets or force heavy numerical physics calculations into JavaScript frequently arises.

However, the superior engineering decision is **allowing each layer to do what it does best**:
- The web layer delivers agile, responsive rendering and modern UX telemetry.
- The C++ core executes physics integration and Mamdani Fuzzy sweeps with zero memory allocations.
- Maintaining a rock-solid *interop bridge* delivers far more value to end users than spending months rewriting functional UI components in native C++.

---

## 3. Balancing Clean Code Against Technical Debt

As software engineers, we must uphold high engineering standards: **Clean Code is essential** to prevent paralyzing technical debt. However, our ultimate responsibility is not merely writing aesthetically pleasing code, but **writing software that solves tangible business problems**.

::callout-alert{type="tip"}
The hallmark of technical maturity is knowing when to pay down technical debt incrementally using the strangler fig pattern, and when to reject the total rewrite temptation.
::

### Reflection Question
> **In your experience, when does technical debt truly justify paying the massive cost of a total rewrite from scratch?**
