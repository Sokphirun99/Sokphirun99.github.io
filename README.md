# Phirun — Software Engineer & Founder of KR Studio

The personal portfolio and product showcase of **Phirun**, software engineer and founder of **KR Studio**. KR Studio builds practical software products—from mobile applications and web platforms to AI-powered tools and interactive games—focusing on clean architecture, performance, security, and thoughtful UX.

![Deploy](https://github.com/Sokphirun99/Sokphirun99.github.io/actions/workflows/deploy.yml/badge.svg)

## Live Demo

**[https://sokphirun99.github.io](https://sokphirun99.github.io)**

## Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | [React 19](https://react.dev/) |
| Build Tool | [Vite 8](https://vite.dev/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| Visual Effects | WebGL Shaders (GlowThreads) |
| Backend & Database | [Firebase / Cloud Firestore](https://firebase.google.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| CI/CD | GitHub Actions & GitHub Pages |

## Shipped Products

- **[Blockerino: Block Puzzle](https://play.google.com/store/apps/details?id=com.KRSTUDIO.blockerino)** — A mobile block puzzle game built in Unity featuring Classic and Adventure modes, combo systems, offline gameplay, and 999 levels.
- **[KhmerLens](https://play.google.com/store/apps/details?id=com.KRSTUDIO.khmerscan)** — A privacy-focused document utility built with Flutter combining smart scanning, OCR text recognition, instant language translation, and PDF tools.

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

```env
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

### Build & Preview

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

### Deploying Firestore Security Rules

To deploy the security rules defined in `firestore.rules`:

```bash
npx firebase-tools deploy --only firestore:rules
```

## License

Source code and brand assets are © 2025–2026 KR Studio / Phirun Khiev. All rights reserved.
