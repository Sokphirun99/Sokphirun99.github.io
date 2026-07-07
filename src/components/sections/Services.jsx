import { Reveal } from '../ui/Reveal';
import { useLanguage } from '../../context/useLanguage';

const serviceIcons = {
  apple: '/icon/responsive/apple-96.webp',
  android: '/icon/responsive/android-96.webp',
  game: '/icon/responsive/game-96.webp',
  prototype: '/icon/responsive/prototype-96.webp',
};

export function Services() {
  const { t } = useLanguage();

  const services = [
    {
      id: 'ios-android',
      title: t.services.items[0].title,
      description: t.services.items[0].description,
      icons: [
        { src: serviceIcons.apple, alt: 'Apple iOS' },
        { src: serviceIcons.android, alt: 'Android OS' },
      ],
    },
    {
      id: 'game-dev',
      title: t.services.items[1].title,
      description: t.services.items[1].description,
      icons: [{ src: serviceIcons.game, alt: 'Game Development Icon' }],
    },
    {
      id: 'prototyping',
      title: t.services.items[2].title,
      description: t.services.items[2].description,
      icons: [{ src: serviceIcons.prototype, alt: 'Prototyping Icon' }],
    },
  ];

  return (
    <section id="services" className="py-32 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-24">
          <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-black mb-6">{t.services.heading}</h3>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">{t.services.subheading}</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <Reveal key={srv.id} delay={idx * 150} className="relative group">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[19px] rounded-[24px] -z-10 border border-white/20 shadow-2xl transition-all duration-500 group-hover:bg-white/15" />
              
              <div className="p-12 flex flex-col items-center text-center h-full hover:scale-[1.02] transition-transform duration-500">
                {srv.icons.length > 1 ? (
                  <div className="flex items-center gap-4 mb-6">
                    {srv.icons.map((icon, i) => (
                      <img key={i} src={icon.src} alt={icon.alt} width="36" height="36" loading="lazy" className="w-9 h-9 object-contain" />
                    ))}
                  </div>
                ) : (
                  <img src={srv.icons[0].src} alt={srv.icons[0].alt} width="40" height="40" loading="lazy" className="w-10 h-10 object-contain mb-6 opacity-90" />
                )}
                <h4 className="text-[22px] font-black tracking-tight mb-4 text-black">{srv.title}</h4>
                <p className="text-[17px] text-black leading-relaxed font-bold opacity-90">{srv.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
