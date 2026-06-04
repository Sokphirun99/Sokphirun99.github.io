import { ChevronRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase";

export function Projects() {
  const trackProjectClick = (projectName) => {
    if (analytics) {
      logEvent(analytics, 'select_content', {
        content_type: 'project',
        content_id: projectName
      });
    }
  };
  const blockerinoFeatures = [
    "Classic, Adventure & Timed Modes",
    "Multiplier Combo System",
    "Hundreds of Unique Levels",
    "Daily Bonuses & Lucky Spin",
    "Smooth Animations & FX",
    "No Ads Option Available"
  ];

  const khmerlensFeatures = [
    "Smart Scanner & PDF Converter",
    "Advanced OCR (Text Recognition)",
    "Instant Language Translation",
    "Barcode & Object Detection",
    "Privacy-First (Offline Processing)",
    "Easy Sharing & Exporting"
  ];

  return (
    <section id="projects" className="py-32 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-24">
          <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-black mb-6">Shipped Products.</h3>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">Real apps. Real users. Real impact.</p>
        </Reveal>

        <div className="flex flex-col gap-24">
          {/* Project 1 - Blockerino */}
          <Reveal className="relative group">
            {/* Glass Backdrop - Robust contrast layer */}
            <div className="absolute -inset-6 md:-inset-10 bg-white/10 backdrop-blur-xl rounded-[3rem] md:rounded-[4rem] -z-10 border border-white/20 shadow-2xl transition-all duration-500 group-hover:bg-white/15" />
            
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-2/5 flex justify-center">
                <div className="relative">
                  <img src="/app_icon/app_icon_blockerino.png" alt="Blockerino Game Icon" className="w-56 h-56 rounded-[22.5%] shadow-2xl object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 rounded-[22.5%] shadow-inner pointer-events-none border border-black/5" />
                </div>
              </div>
              <div className="md:w-3/5 text-center md:text-left">
                <h4 className="text-4xl font-black tracking-tight mb-4 text-black">Blockerino: Block Puzzle</h4>
                <p className="text-[19px] text-black mb-8 leading-relaxed max-w-xl mx-auto md:mx-0 font-bold opacity-90">
                  The ultimate puzzle experience combining classic mechanics with exciting new modes. Challenge your strategic thinking with endless combos and hundreds of levels.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-10 text-[15px] text-black font-black">
                  {blockerinoFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#0071e3] shrink-0" /> {feature}
                    </div>
                  ))}
                </div>

                <a 
                  href="https://play.google.com/store/apps/details?id=com.KRSTUDIO.blockerino" 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={() => trackProjectClick('Blockerino')}
                  className="text-[#0071e3] hover:underline inline-flex items-center gap-1 text-[18px] font-black group/link"
                >
                  View on Play Store <ChevronRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Project 2 - KhmerLens */}
          <Reveal className="relative group">
            {/* Glass Backdrop - Robust contrast layer */}
            <div className="absolute -inset-6 md:-inset-10 bg-white/10 backdrop-blur-xl rounded-[3rem] md:rounded-[4rem] -z-10 border border-white/20 shadow-2xl transition-all duration-500 group-hover:bg-white/15" />

            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-2/5 flex justify-center">
                <div className="relative">
                  <img src="/app_icon/app_icon_khmerlens.png" alt="KhmerLens App Icon" className="w-56 h-56 rounded-[22.5%] shadow-2xl object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 rounded-[22.5%] shadow-inner pointer-events-none border border-black/5" />
                </div>
              </div>
              <div className="md:w-3/5 text-center md:text-left">
                <h4 className="text-4xl font-black tracking-tight mb-4 text-black">KhmerLens</h4>
                <p className="text-[19px] text-black mb-8 leading-relaxed max-w-xl mx-auto md:mx-0 font-bold opacity-90">
                  A powerful, privacy-first document scanner and intelligent assistant designed to simplify your digital workflow. Scan, extract text, translate, and convert to PDF instantly.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-10 text-[15px] text-black font-black">
                  {khmerlensFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#0071e3] shrink-0" /> {feature}
                    </div>
                  ))}
                </div>

                <a 
                  href="https://play.google.com/store/apps/details?id=com.KRSTUDIO.khmerscan" 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={() => trackProjectClick('KhmerLens')}
                  className="text-[#0071e3] hover:underline inline-flex items-center gap-1 text-[18px] font-black group/link"
                >
                  Join the Beta <ChevronRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}