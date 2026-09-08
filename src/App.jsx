import { lazy, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { GlowThreads } from './components/ui/GlowThreads';
import { LanguageProvider } from './context/LanguageProvider';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

const About = lazy(() => import('./components/sections/About').then(m => ({ default: m.About })));
const Projects = lazy(() => import('./components/sections/Projects').then(m => ({ default: m.Projects })));
const Services = lazy(() => import('./components/sections/Services').then(m => ({ default: m.Services })));
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })));

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <div className="text-white font-sans min-h-screen relative overflow-x-hidden selection:bg-[#e86bd8] selection:text-white">
          {/* WebGL Glow Threads Background */}
          <GlowThreads />

          <Navbar />
          <main className="relative z-10 pt-12">
            <Hero />
            <Suspense fallback={null}>
              <About />
              <Projects />
              <Services />
              <Contact />
            </Suspense>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
