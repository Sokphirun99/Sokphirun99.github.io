import { Reveal } from '../ui/Reveal';
import { services } from '../../data/services';

const serviceIcons = {
  platforms: (
    <div className="flex items-center gap-4 mb-6">
      <img src="/icon/apple.png" alt="Apple iOS" className="w-9 h-9 object-contain" />
      <img src="/icon/android.png" alt="Android OS" className="w-9 h-9 object-contain" />
    </div>
  ),
  game: <img src="/icon/game.png" alt="Game Development Icon" className="w-10 h-10 object-contain mb-6 opacity-90" />,
  prototype: <img src="/icon/prototype.png" alt="Prototyping Icon" className="w-10 h-10 object-contain mb-6 opacity-90" />,
};

export function Services() {
  return (
    <section id="services" className="py-32 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-24">
          <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-black mb-6">Expertise.</h3>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">Everything needed to ship.</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <Reveal key={srv.id} delay={idx * 150} className="relative group">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-[2.5rem] -z-10 border border-white/20 shadow-2xl transition-all duration-500 group-hover:bg-white/15" />
              
              <div className="p-12 flex flex-col items-center text-center h-full hover:scale-[1.02] transition-transform duration-500">
                {serviceIcons[srv.icon]}
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
