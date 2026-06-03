import { ChevronRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export function Contact() {
  return (
    <section id="contact" className="py-32 bg-transparent">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <h3 className="text-6xl md:text-7xl font-bold tracking-tighter text-[#1d1d1f] mb-8">
            Let's talk.
          </h3>
          <p className="text-2xl font-medium text-slate-700 mb-12 max-w-2xl mx-auto tracking-tight">
            Got an idea for a game or an app? I'm always open to discussing new projects.
          </p>
          
          <a href="mailto:khiev.sokpirun999@gmail.com" className="inline-flex items-center justify-center bg-[#1d1d1f] text-white px-10 py-4 rounded-full font-bold text-[17px] hover:bg-black transition-colors shadow-lg">
            Email Me
          </a>

          <div className="mt-16 text-[#0071e3] hover:underline font-bold text-[17px]">
            <a href="https://github.com/Sokphirun99" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 group">
              View GitHub Profile <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}