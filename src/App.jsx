import { lazy, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { LanguageProvider } from './context/LanguageProvider';

const About = lazy(() => import('./components/sections/About').then(m => ({ default: m.About })));
const Projects = lazy(() => import('./components/sections/Projects').then(m => ({ default: m.Projects })));
const Services = lazy(() => import('./components/sections/Services').then(m => ({ default: m.Services })));
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })));

export default function App() {
  return (
    <LanguageProvider>
      <div className="text-[#1d1d1f] font-sans min-h-screen relative overflow-x-hidden selection:bg-[#0071e3] selection:text-white">
        {/* Background Layer with subtle glassmorphism */}
        <div className="fixed inset-0 -z-20">
          <img
            src="/background_image/Feature_graphic.webp"
            srcSet="/background_image/Feature_graphic-640.webp 640w, /background_image/Feature_graphic-960.webp 960w, /background_image/Feature_graphic-1280.webp 1280w, /background_image/Feature_graphic.webp 1920w"
            sizes="100vw"
            width="1920"
            height="1071"
            alt=""
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="fixed inset-0 -z-10 bg-white/15 backdrop-blur-[2px]" />

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
  );
}
