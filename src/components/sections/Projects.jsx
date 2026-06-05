import { ChevronRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase";
import { useLanguage } from '../../context/useLanguage';

export function Projects() {
  const { t } = useLanguage();

  const trackProjectClick = (projectName) => {
    if (analytics) {
      logEvent(analytics, 'select_content', {
        content_type: 'project',
        content_id: projectName
      });
    }
  };

  const projects = [
    {
      id: 'blockerino',
      name: t.projects.blockerino.name,
      description: t.projects.blockerino.description,
      icon: '/app_icon/app_icon_blockerino.webp',
      iconAlt: 'Blockerino Game Icon',
      link: 'https://play.google.com/store/apps/details?id=com.KRSTUDIO.blockerino',
      linkLabel: t.projects.blockerino.link,
      features: t.projects.blockerino.features,
    },
    {
      id: 'khmerlens',
      name: t.projects.khmerlens.name,
      description: t.projects.khmerlens.description,
      icon: '/app_icon/app_icon_khmerlens.webp',
      iconAlt: 'KhmerLens App Icon',
      link: 'https://play.google.com/store/apps/details?id=com.KRSTUDIO.khmerscan',
      linkLabel: t.projects.khmerlens.link,
      features: t.projects.khmerlens.features,
    },
  ];

  return (
    <section id="projects" className="py-32 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-24">
          <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-black mb-6">{t.projects.heading}</h3>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">{t.projects.subheading}</p>
        </Reveal>

        <div className="flex flex-col gap-24">
          {projects.map((project, index) => (
            <Reveal key={project.id} className="relative group">
              <div className="absolute -inset-6 md:-inset-10 bg-white/10 backdrop-blur-xl rounded-[3rem] md:rounded-[4rem] -z-10 border border-white/20 shadow-2xl transition-all duration-500 group-hover:bg-white/15" />
              
              <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
                <div className="md:w-2/5 flex justify-center">
                  <div className="relative">
                    <img src={project.icon} alt={project.iconAlt} className="w-56 h-56 rounded-[22.5%] shadow-2xl object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 rounded-[22.5%] shadow-inner pointer-events-none border border-black/5" />
                  </div>
                </div>
                <div className="md:w-3/5 text-center md:text-left">
                  <h4 className="text-4xl font-black tracking-tight mb-4 text-black">{project.name}</h4>
                  <p className="text-[19px] text-black mb-8 leading-relaxed max-w-xl mx-auto md:mx-0 font-bold opacity-90">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-10 text-[15px] text-black font-black">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#0071e3] shrink-0" /> {feature}
                      </div>
                    ))}
                  </div>

                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    onClick={() => trackProjectClick(project.name)}
                    className="text-[#0071e3] hover:underline inline-flex items-center gap-1 text-[18px] font-black group/link"
                  >
                    {project.linkLabel} <ChevronRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
