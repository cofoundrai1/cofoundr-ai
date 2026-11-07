# CoFoundr AI - Implementation Plan

CoFoundr AI connects early-stage and venture-backed startup founders with multi-agent AI co-founders and specialized advisory board directors, offering board-level strategic debates, pitch deck diagnostics, and governance tools.

## User Review & Critical Decisions

> [!IMPORTANT]
> The setup questions were dismissed without selection, so we are proceeding with recommended defaults aligned with the Master PRD:
> - **Build Sequence Default**: Deliver the complete integrated system incrementally, starting with foundational brand styling, the Top Bar navigation with the universal **CF Monogram**, and the high-impact **Hero Section** with the animated 3D aerodynamic airplane and glowing neural brain light trail, immediately followed by the **AI Co-Founder Hub**, **Advisory Board Marketplace**, and **Pricing & Tiers**.
> - **Multi-Agent Hub Default**: Implement a unified boardroom workspace featuring dynamic agent switching (Product & Tech, Growth & GTM, Fundraising & IR) alongside interactive pitch deck diagnostics, instant prompt playbooks, and simulated streaming analysis.
> - **Brand Asset Execution**: Implement a high-performance, interactive 3D/Canvas aerodynamic metallic aircraft with glowing cyan wingtip trails orbiting into a neon synaptic brain outline, accompanied by a vector-rendered **CF Monogram** brand mark.

---

## 1. Overview & Core Concept

- **What It Does**: CoFoundr AI acts as an always-on executive team and board for solo founders and early teams. Founders can pressure-test go-to-market assumptions, audit codebases or technical architectures, run slide-by-slide pitch deck teardowns, and consult hybrid human-and-AI advisory board specialists.
- **Target Audience**: Solo technical and non-technical founders, pre-seed to Series A startups, venture studio teams, and accelerator cohorts.
- **Key Value**: Replaces scattered brainstorming with structured, role-specialized multi-agent boardroom intelligence and institutional-grade startup diagnostics.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Discovery & Conversion (`/`)**:
   - Clean 3-zone navigation bar featuring the **CF Monogram** logo, single-line links (`Capabilities`, `Multi-Agent Hub`, `Advisory Board`, `Pricing`), and a primary `"Launch Co-Founder Hub"` CTA.
   - Cinematic Hero featuring the custom 3D aerodynamic airplane with cyan glowing edges and neural light trail morphing into a brain motif, supported by headline *"Your Intelligent Co-Founder & Advisory Board"* and trust indicators (SOC-2, Multi-Agent Ensemble, Real-Time Diagnostics).
   - Interactive live preview of pitch deck scoring and strategic debate snippets.
2. **AI Co-Founder Hub (`/hub` or tab view)**:
   - Tri-agent boardroom selector:
     - **Product & Tech Co-Founder** (Architecture, Stack Scalability, Security, Roadmaps)
     - **Growth & GTM Co-Founder** (CAC/LTV Optimization, ICP Positioning, Sales Funnels)
     - **Fundraising & IR Co-Founder** (Deck Critique, Cap Table Modeling, Investor FAQ)
   - Prompt bar with pre-built founder prompts (`"Audit my Seed pitch deck"`, `"Review tech stack for 100k MAU"`, `"Stress-test unit economics"`).
   - Document & deck upload dropzone with real-time diagnostic breakdown (Traction, TAM, Defensibility, Moat).
3. **Advisory Board Marketplace (`/advisory-board`)**:
   - Filterable catalog of specialized advisors across Fintech, B2B SaaS, Healthtech, and Consumer AI.
   - Advisor dossier cards with credentials, specialty areas, and booking/assignment actions.
4. **Pricing & Governance Tiers (`/pricing`)**:
   - Bootstrap ($0/starter diagnostics), Venture ($49/mo full multi-agent board), and Enterprise/Studio ($199/mo custom LLMs, SOC-2 compliance, human advisor credits).

### Visual Identity & Theme
- **Color Palette**:
  - Dominant Navy Canvas: Deep `#0A192F` and `#050B14` for dark luxury mode; crisp `#F8FAFC` and `#FFFFFF` for light surfaces.
  - Glowing Cyan Accent: `#06B6D4` with secondary electric cyan `#22D3EE` for glowing trails, active badges, and focus rings.
  - Structural Neutrals: Cool slate `#1E293B` borders, hairline dividers (`border-slate-800`), and muted typography `#94A3B8`.
- **CF Monogram & Brand Marks**:
  - A custom geometric SVG monogram intertwining 'C' and 'F' with a glowing cyan cybernetic slash, used in the top bar, favicon, AI response avatars, and watermark.
- **Typography**:
  - Display & Headings: `Plus Jakarta Sans` / `Outfit` with tight tracking and balanced headlines (`text-wrap: balance`).
  - Numbers & Metrics: `tabular-nums` for financials, runtimes, and deck scores.
- **Zero-Pill Discipline & Anti-Slop**:
  - Clean unboxed metadata separated by typographic dots (`·`).
  - No fake compiler comments (`// 01`) or arbitrary non-functional telemetry.
  - Functional single-line interactive buttons and segmented filter controls.

---

## 3. Key Product Decisions & Trade-Offs

- **Interactive 3D Aircraft & Brain Graphic**:
  - *Chosen Approach*: An interactive Canvas/SVG + CSS 3D rendering pipeline for the aerodynamic silver jet with glowing cyan edges and orbiting neural brain nodes, ensuring smooth 60fps performance and instant responsiveness without heavy 50MB GLTF model load times.
- **Multi-Agent Simulation & Live Intelligence**:
  - *Chosen Approach*: Rich multi-agent state manager simulating real-time streaming responses, role-specific reasoning steps, and instant pitch deck diagnostic metrics. Founders can immediately toggle between Tech, GTM, and Fundraising perspectives.
- **Navigation & Page Architecture**:
  - *Chosen Approach*: Seamless single-page view router with tabbed navigation (`Home / Pitch`, `Co-Founder Hub`, `Advisory Board`, `Pricing`), allowing instant transitions without full page reloads while maintaining deep-linkable view states.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          CoFoundr AI App View                          │
│                                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Top Bar: [CF Monogram] ── [Nav Links] ── [Launch Hub CTA]          │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│ ┌─────────────────────────────────┐  ┌───────────────────────────────┐ │
│ │ Active View:                    │  │ Global State & Context:       │ │
│ │  • Hero & Pitch Diagnostics     │  │  • Active Mode & Agent Roster │ │
│ │  • Co-Founder Boardroom (Chat)  │  │  • Chat History & Streams     │ │
│ │  • Advisory Board Marketplace   │  │  • Pitch Deck Diagnostics     │ │
│ │  • Pricing & Tier Comparison    │  │  • Monogram & Theme Context   │ │
│ └─────────────────────────────────┘  └───────────────────────────────┘ │
│                                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ 3D Aerodynamic Aircraft & Neural Brain Canvas / Particle Engine    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy
- `src/components/CFMonogram.tsx`: Universal vector brand mark (favicon, navbar, avatar, watermark).
- `src/components/Navbar.tsx`: 3-zone top bar with view switching and primary CTA.
- `src/components/Hero.tsx`: Aerodynamic 3D aircraft with neural trail and brain canvas, headline, CTAs, and proof stats.
- `src/components/AIChatHub.tsx`: Multi-agent boardroom (Tech, GTM, Fundraising), message stream, prompt presets, and pitch deck analyzer.
- `src/components/AdvisoryBoard.tsx`: Hybrid human and AI advisor marketplace with filterable domains and booking modal.
- `src/components/Pricing.tsx`: Transparent 3-tier card matrix with feature checklist.
- `src/components/Footer.tsx`: Quiet footer with wordmark, legal notices, and SOC-2 trust seal.
