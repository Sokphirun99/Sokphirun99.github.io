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
              <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-[#e86bd8]/20 rounded-full blur-3xl" />
            </div>
          </Reveal>

          {/* Story Content */}
          <Reveal delay={200} className="relative">
            <div className="absolute -inset-8 bg-white/[0.04] backdrop-blur-md md:backdrop-blur-[19px] rounded-[28px] -z-10 border border-white/10 shadow-2xl" />
            
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-8 leading-tight">
              {t.about.heading}
            </h3>
            
            <div className="space-y-6 text-[18px] md:text-[20px] text-white/80 leading-relaxed font-normal">
              <p>
                {t.about.paragraph1}{' '}
                <span className="text-white font-bold italic">{t.about.studio}</span>
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
            <div className="mt-12 pt-12 border-t border-white/10">
              <div>
                <div className="text-4xl font-black text-white">2025</div>
                <div className="text-[13px] text-white/50 uppercase tracking-wider font-bold mt-1">{t.about.founded}</div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
