# TourGen Pro — 3D Virtual Real Estate Tour Generator

Create **immersive 3D virtual real estate tours** in minutes. Upload a floor plan image and explore an interactive 3D space with realistic lighting, furniture, and navigation.

## ✨ Features

- **📄 Upload Floor Plans** — Drag & drop JPG, PNG, or WebP images up to 10MB
- **🏗️ Real 3D Engine** — Built with Three.js + React Three Fiber for full WebGL rendering
- **🏠 3D Room Generation** — Analyzes floor plans and generates walls, floors, ceilings with realistic materials
- **🛋️ Furniture Placement** — Sofas, beds, tables, chairs, lamps, plants rendered as 3D objects
- **💡 Dynamic Lighting** — Switch between Day / Night / Sunset presets
- **🖱️ Interactive Controls** — Orbit, zoom, pan navigation with smooth damping
- **🌙 Environment Maps** — Realistic reflections and ambient occlusion
- **📱 Responsive Design** — Works on desktop and tablet
- **🎨 Clean Architecture** — Zustand-ready state, validated inputs, error boundaries

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## 🏗️ Architecture

```
src/
├── App.jsx                          # State machine (3 steps: Upload → Explore → Purchase)
├── main.jsx                         # React entry point
├── index.css                        # Tailwind + component classes
├── components/
│   ├── Layout.jsx                   # App shell: header, step progress, footer
│   ├── FileUpload.jsx               # Drag-drop file upload with validation
│   ├── TourPreview.jsx              # 3D scene container with controls overlay
│   ├── Purchase.jsx                 # Pricing plans with Stripe integration
│   └── Scene3D/
│       ├── TourCanvas.jsx           # R3F Canvas wrapper with error boundary
│       ├── TourScene.jsx            # Scene composition (room + furniture + lights)
│       ├── Room.jsx                 # Wall/floor/ceiling geometry builder
│       ├── Furniture.jsx            # 3D furniture models (sofa, bed, table, etc.)
│       ├── Lighting.jsx             # Day/Night/Sunset lighting presets
│       ├── SceneController.jsx      # Orbit controls with camera presets
│       ├── LoadingFallback.jsx      # WebGL loading spinner
│       └── ErrorFallback.jsx        # WebGL error recovery UI
├── utils/
│   ├── validation.js                # File validation, blob URL management
│   └── roomAnalyzer.js              # Floor plan → 3D layout analysis
└── constants/
    ├── pricing.js                   # Plan definitions, step config
    └── scene.js                     # 3D scene colors, furniture config, lighting presets
```

## 💰 Monetization

| Plan | Price | Features |
|------|-------|----------|
| Single Tour | $19/tour | HD tour, shareable link, 30-day support |
| Agent Pro | $99/month | Unlimited tours, priority processing, custom branding |
| Agency Elite | $299/month | Team collab, API access, dedicated support |

## 🛠️ Tech Stack

- **React 18** + **Vite 7** — Fast HMR and optimized builds
- **Three.js** + **@react-three/fiber** — Real WebGL 3D rendering
- **@react-three/drei** — OrbitControls, Environment, ContactShadows
- **Tailwind CSS 3** — Utility-first styling
- **Framer Motion** — Smooth page transitions
- **Lucide React** — Consistent icon set

## 📦 Build for Production

```bash
npm run build    # outputs to dist/
npm run preview  # preview production build
```

## ✅ Improvements from v0

- [x] Real 3D rendering (was CSS mockup divs)
- [x] Critical bug fix: `error` prop called as function → `onError` callback
- [x] Memory leak fix: `URL.createObjectURL` now properly revoked
- [x] Removed dead CSS (deleted `App.css`, 200+ lines)
- [x] Fixed duplicate font loading (was blocking render)
- [x] Enabled production minification (`minify: false` removed)
- [x] Removed `process.env` polyfill
- [x] Build tools moved to `devDependencies`
- [x] Added error boundaries for WebGL failures
- [x] Keyboard accessibility for file upload
- [x] `try/catch` around async tour generation
- [x] Config extracted to constants (pricing, scenes)
- [x] Extracted validation utilities
- [x] Added ESLint configuration
- [x] Responsive design improvements
