# KR Studio — Portfolio

The official portfolio website for **KR Studio**, an independent mobile app and game development studio based in Phnom Penh, Cambodia.

![Deploy](https://github.com/Sokphirun99/Sokphirun99.github.io/actions/workflows/deploy.yml/badge.svg)

## Live Demo

**[https://sokphirun99.github.io](https://sokphirun99.github.io)**

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 8](https://vite.dev/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| Analytics | [Firebase 12](https://firebase.google.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Deployment | GitHub Pages (Actions) |

## Shipped Products

- **[Blockerino: Block Puzzle](https://play.google.com/store/apps/details?id=com.KRSTUDIO.blockerino)** — A block puzzle game with Classic, Adventure & Timed modes, combo system, and hundreds of levels.
- **[KhmerLens](https://play.google.com/store/apps/details?id=com.KRSTUDIO.khmerscan)** — A privacy-first document scanner with OCR, translation, barcode detection, and PDF conversion.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Sokphirun99/Sokphirun99.github.io.git
cd Sokphirun99.github.io
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your Firebase credentials:

```bash
cp .env.example .env
```

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Hero, About, Projects, Services, Contact
│   └── ui/           # Reusable UI components (Reveal animation)
├── App.jsx
├── firebase.js
└── main.jsx
public/
├── app_icon/         # App icons (WebP)
├── background_image/ # Background image (WebP)
└── icon/             # Service icons
```

## License

This project is private. All rights reserved.
