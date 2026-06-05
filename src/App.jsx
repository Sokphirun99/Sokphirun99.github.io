import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { Contact } from './components/sections/Contact';
import { LanguageProvider } from './context/LanguageProvider';

export default function App() {
  return (
    <LanguageProvider>
      <div className="text-[#1d1d1f] font-sans min-h-screen relative overflow-x-hidden selection:bg-[#0071e3] selection:text-white">
        {/* Background Layer with Apple-style Glassmorphism */}
        <div className="fixed inset-0 -z-20">
          <img 
            src="/background_image/Feature_graphic.webp" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="fixed inset-0 -z-10 bg-white/15 backdrop-blur-[4px]" />

        <Navbar />
        <main className="relative z-10 pt-12">
          <Hero />
          <About />
          <Projects />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
