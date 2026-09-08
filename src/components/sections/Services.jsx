import { Smartphone, Server, Sparkles, Gamepad2 } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { useLanguage } from '../../context/useLanguage';

const icons = [Smartphone, Server, Sparkles, Gamepad2];

export function Services() {
  const { t } = useLanguage();

  const services = (t.services.items || []).map((item, index) => ({
    id: `service-${index}`,
    title: item.title,
    description: item.description,
    Icon: icons[index] || Smartphone,
  }));

  return (
    <section id="services" className="py-32 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-24">
          <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-6">
            {t.services.heading}
          </h3>
          <p className="text-2xl font-medium text-white/70 tracking-tight">
            {t.services.subheading}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.Icon;
            return (
              <Reveal key={srv.id} delay={idx * 100} className="relative group flex">
                <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-md md:backdrop-blur-[19px] rounded-[24px] -z-10 border border-white/10 shadow-2xl transition-all duration-500 group-hover:bg-white/[0.07]" />
                
                <div className="p-8 md:p-10 flex flex-col items-center text-center w-full hover:scale-[1.02] transition-transform duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-6 text-white shadow-sm group-hover:text-[#e86bd8] transition-colors">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <h4 className="text-[20px] font-bold tracking-tight mb-3 text-white">
                    {srv.title}
                  </h4>
                  <p className="text-[15px] text-white/70 leading-relaxed font-normal">
                    {srv.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
