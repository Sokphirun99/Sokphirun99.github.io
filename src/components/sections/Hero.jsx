import { ChevronRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6 pt-16 pb-20">
      <Reveal>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-6 text-[#1d1d1f]">
          Hi, I’m Phirun—founder of KR Studio.
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-slate-700 tracking-tight mb-12 max-w-3xl mx-auto">
          Building mobile experiences that people love.
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center font-medium text-[17px]">
          <a href="#projects" className="bg-[#0071e3] text-white px-8 py-3.5 rounded-full hover:bg-[#0077ed] transition-colors inline-flex items-center gap-2">
            View Projects
          </a>
          <a href="#contact" className="text-[#0071e3] hover:underline inline-flex items-center gap-1 group">
            Contact me <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}