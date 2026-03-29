# DevPharma Info - Development Preferences

This document outlines the standard coding styles, technologies, and UI/UX preferences to be followed when developing or modifying the DevPharma Info project.

## Core Technologies
- **Framework**: Next.js (App Router)
- **Package Manager**: Yarn
- **Component Library**: shadcn/ui
- **Icons**: lucide-react
- **Data Store Architecture**: Dual configurable support for MongoDB and Local JSON.

## Design & UI/UX Rules
- **Global Theme Colors**: 
  - Light mode prioritizing clean whites (`slate-50`, `white`) with energetic **Purple / Indigo** primary action accents.
  - Full support for deep midnight Dark Mode (`#030712`, `#060608`).
- **Responsive Layouts**: 
  - Must be explicitly "Device Friendly" and dynamically shape-shift across mobile, tablet, and ultra-wide screens.
  - Dynamically scale padding and margins (e.g., smaller constraints `py-4` on mobile branching up to `lg:px-24` on desktop).
- **Responsive Sizing Units**: 
  - **Do NOT use fixed `px` values** (e.g., `w-[500px]`, `blur-[80px]`). 
  - Always calculate layouts relative to the viewport using `rem`, `vh`, `vw`, or `%`.
- **Global Typography Manager**:
  - Do not sporadically hardcode heading and paragraph tailwind scales (ex: `text-5xl md:text-7xl`) directly in page components.
  - Import and map properties generated strictly from `src/config/typography.js` (e.g., `<h1 className={typography.h1}>`) so font sizing modifications apply instantly worldwide.

## Architecture & Code Guidelines
- **Component Extensibility**: 
  - Root page entry points (like `src/app/page.js`) must be kept extremely lightweight (10-20 lines maximum). 
  - Sub-sections of large pages should be abstracted into their respective directories (e.g., `src/components/home/`).
- **Public-Facing Scrubbing**: 
  - The public UI (Navigation, Footers, Hero sections) must **never** expose or link to the `/admin` portal. 
  - Do not expose backend constraints (like "MongoDB" phrases) on the public landing page. Present the platform simply as an open, evidence-based clinical directory.
- **Model Compatibility**: 
  - Data ingestion must be structured to accommodate both Mongoose `_id` configurations and local JSON `id` structures flawlessly.
