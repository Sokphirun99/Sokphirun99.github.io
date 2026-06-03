import { Reveal } from '../ui/Reveal';

export function About() {
  return (
    <section id="about" className="py-32 bg-transparent">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Profile Visual */}
          <Reveal className="flex justify-center">
            <div className="relative group">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] border border-white/20 bg-white/10 backdrop-blur-sm">
                <img 
                  src="/app_icon/developer icon.png" 
                  alt="Phirun Khiev - Founder of KR Studio" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
            </div>
          </Reveal>

          {/* Story Content */}
          <Reveal delay={200} className="relative">
            {/* Subtle highlight to improve text contrast on busy images */}
            <div className="absolute -inset-8 bg-white/10 backdrop-blur-xl rounded-[3rem] -z-10 border border-white/20 shadow-2xl" />
            
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-8 leading-tight">
              Engineer by trade. <br />
              Maker by heart.
            </h3>
            
            <div className="space-y-6 text-[18px] md:text-[20px] text-black leading-relaxed font-bold opacity-90">
              <p>
                I’m Phirun, a solo founder and software engineer based in Phnom Penh. I founded 
                <span className="text-black font-black italic"> KR Studio</span> with a simple mission: to strip away 
                complexity and build mobile products that feel as good as they look.
              </p>
              
              <p>
                Whether it's crafting engaging mobile games like <span className="text-black font-black italic">Blockerino</span> or engineering privacy-first tools like <span className="text-black font-black italic">KhmerLens</span>, 
                my focus is always on the intersection of performance and human-centric design.
              </p>

              <p>
                I believe the best products aren't built by huge committees—they’re built by 
                focused individuals who obsess over every pixel and every line of code.
              </p>
            </div>

            {/* Mini Stats */}
            <div className="mt-12 pt-12 border-t border-black/[0.15]">
              <div>
                <div className="text-4xl font-black text-black">2022</div>
                <div className="text-[13px] text-black uppercase tracking-wider font-black mt-1">Founded</div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}