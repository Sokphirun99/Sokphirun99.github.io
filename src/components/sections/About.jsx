import { Reveal } from '../ui/Reveal';
import { useLanguage } from '../../context/useLanguage';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32 bg-transparent">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Profile Visual */}
          <Reveal className="flex justify-center">
            <div className="relative group">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-[28px] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] border border-white/20 bg-white/10 backdrop-blur-sm">
                <img
                  src="/app_icon/developer-icon.webp"
                  srcSet="/app_icon/responsive/developer-icon-128.webp 128w, /app_icon/responsive/developer-icon-256.webp 256w, /app_icon/developer-icon.webp 512w"
                  sizes="(min-width: 768px) 320px, 256px"
                  width="512"
                  height="512"
                  alt="Phirun Khiev - Founder of KR Studio"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
            </div>
          </Reveal>

          {/* Story Content */}
          <Reveal delay={200} className="relative">
            <div className="absolute -inset-8 bg-white/10 backdrop-blur-[19px] rounded-[28px] -z-10 border border-white/20 shadow-2xl" />
            
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-8 leading-tight">
              {t.about.heading}
            </h3>
            
            <div className="space-y-6 text-[18px] md:text-[20px] text-black leading-relaxed font-bold opacity-90">
              <p>
                {t.about.paragraph1}{' '}
                <span className="text-black font-black italic">{t.about.studio}</span>
                {t.about.paragraph1End}
              </p>
              
              <p>
                {t.about.paragraph2}
              </p>

              <p>
                {t.about.paragraph3}
              </p>
            </div>

            {/* Mini Stats */}
            <div className="mt-12 pt-12 border-t border-black/[0.15]">
              <div>
                <div className="text-4xl font-black text-black">2025</div>
                <div className="text-[13px] text-black uppercase tracking-wider font-black mt-1">{t.about.founded}</div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
