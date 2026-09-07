# MMYLANA // 無限城 — Ambient Mugen Bento Stream

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-black?style=flat-square&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-black?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-EB7340.svg?style=flat-square)](LICENSE)

An ambient, inertia-driven continuous Bento catalog and 3D spatial traversal engine featuring **112+ crafted web applications, developer tooling, and fullstack platforms** layered over a reactive WebGL Mugen Castle scene with floating lanterns and upward swirling embers.

Deployed at [`portfolio.mmylana.my.id`](https://portfolio.mmylana.my.id) (Counterpart to [`mmylana.my.id`](https://mmylana.my.id)).

---

## Architectural Highlights

- **First-Person Spatial Traversal (`/explore`)**:
  - First-person walking traversal through 4 procedural chambers (Developer Tooling, Fullstack, Creative UI, Utilities).
  - Depth-occluded diegetic 3D HTML marker billboards, Torii gate chamber teleports, and virtual touch joystick controls.
  - Zero-allocation modular corridor recycling, instanced lantern batching, and local storage discovery progression.
- **Flagship Core Diagnostic Sanctuary**:
  - [`fetch-doctor`](https://github.com/mmy-lana/fetch-doctor): Zero-dependency, SOLID HTTP request profiler, zombie fetch detector, and CDP network audit suite.
  - [`leak-doctor`](https://github.com/mmy-lana/leak-doctor): Zero-dependency frontend memory leak diagnostic engine with `WeakRef` and `FinalizationRegistry` heap assertions.
- **112+ Project Catalog Engine**: Spanning Developer Tooling, Fullstack Applications (Node.js/Express, NestJS, FastAPI, Django, Go Gin, ASP.NET Core 9, Spring Boot 3, Rails, Rust Axum, Laravel 11), Creative UIs, and Utilities.
- **3D Mugen WebGL Atmosphere**: `@react-three/fiber` floating lanterns and scroll-velocity reactive embers with calibrated ambient falloff.
- **Micro-Interactions**: 3D gyro tilt cards, cursor-tracking amber border glows (`#EB7340`), command palette (`⌘K`), and drawer inspector with live clone snippets.
- **Smooth Inertia Scroll**: Native physics-driven scroll wrapper powered by `lenis`.

---

## 10-Color Mugen Castle Design System

| Token | Hex Code | Role |
| :--- | :--- | :--- |
| **Abyssal Void** | `#140805` | Background canvas surface |
| **Dark Mahogany** | `#2F1A17` | Bento card base surface |
| **Timber Frame** | `#5D3025` | Default architectural borders |
| **Warm Cedar** | `#914B35` | Hover borders & interactive edges |
| **Deep Crimson** | `#8C341C` | Window headers & inactive states |
| **Volumetric Shadow** | `#5F1906` | Depth vignette & ambient gradients |
| **Lantern Crimson** | `#C04D2D` | Active filters & flame auras |
| **Terracotta** | `#BD6547` | Descriptions & secondary typography |
| **Shoji Amber Fire** | `#EB7340` | Cursor border glow & primary CTA |
| **Golden Amber Glow**| `#DF865C` | Typography accents, icons & flame |

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+ or 10+

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/mmy-lana/infinity-vault.git

# Navigate into directory
cd infinity-vault

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
pnpm build
pnpm start
```

---

## License

This project is open source and available under the [MIT License](LICENSE).
