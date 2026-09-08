import { ChevronRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { useLanguage } from '../../context/useLanguage';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="min-h-[100svh] flex flex-col justify-center items-center text-center px-5 sm:px-6 pt-20 pb-16">
      <Reveal>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.05] mb-5 text-white drop-shadow-[0_2px_40px_rgba(15,16,19,0.8)]">
          {t.hero.title}
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10 font-medium text-white/75 tracking-tight">
          {t.hero.subtitle}
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center font-medium text-[16px] sm:text-[17px]">
          <a href="#projects" className="bg-[#0071e3] text-white px-8 py-3.5 rounded-full hover:bg-[#0077ed] transition-colors inline-flex items-center gap-2 shadow-lg shadow-[#0071e3]/20">
            {t.hero.viewProjects}
          </a>
          <a href="#about" className="text-white hover:text-[#e86bd8] transition-colors inline-flex items-center gap-1 group">
            {t.hero.aboutMe || t.hero.contactMe} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
