import { ChevronRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { getAnalyticsInstance } from "../../firebase";
import { useLanguage } from '../../context/useLanguage';

export function Projects() {
  const { t } = useLanguage();

  const trackProjectClick = async (projectName) => {
    const analytics = await getAnalyticsInstance();
    if (analytics) {
      const { logEvent } = await import('firebase/analytics');
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
      metadata: t.projects.blockerino.metadata,
      tags: t.projects.blockerino.tags || [],
      icon: '/app_icon/app_icon_blockerino.webp',
      iconSrcSet: '/app_icon/responsive/app_icon_blockerino-128.webp 128w, /app_icon/responsive/app_icon_blockerino-256.webp 256w, /app_icon/app_icon_blockerino.webp 512w',
      iconAlt: 'Blockerino Game Icon',
      link: 'https://play.google.com/store/apps/details?id=com.KRSTUDIO.blockerino',
      linkLabel: t.projects.blockerino.link,
      features: t.projects.blockerino.features,
      iosComingSoon: t.projects.blockerino.iosComingSoon,
    },
    {
      id: 'khmerlens',
      name: t.projects.khmerlens.name,
      description: t.projects.khmerlens.description,
      metadata: t.projects.khmerlens.metadata,
      tags: t.projects.khmerlens.tags || [],
      icon: '/app_icon/app_icon_khmerlens.webp',
      iconSrcSet: '/app_icon/responsive/app_icon_khmerlens-128.webp 128w, /app_icon/responsive/app_icon_khmerlens-256.webp 256w, /app_icon/app_icon_khmerlens.webp 512w',
      iconAlt: 'KhmerLens App Icon',
      link: 'https://play.google.com/store/apps/details?id=com.KRSTUDIO.khmerscan',
      linkLabel: t.projects.khmerlens.link,
      features: t.projects.khmerlens.features,
      iosComingSoon: t.projects.khmerlens.iosComingSoon,
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
              <div className="absolute -inset-6 md:-inset-10 bg-white/10 backdrop-blur-[19px] rounded-[24px] md:rounded-[28px] -z-10 border border-white/20 shadow-2xl transition-all duration-500 group-hover:bg-white/15" />
              
              <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
                <div className="md:w-2/5 flex justify-center">
                  <div className="relative">
                    <img
                      src={project.icon}
                      srcSet={project.iconSrcSet}
                      sizes="224px"
                      width="512"
                      height="512"
                      alt={project.iconAlt}
                      className="w-56 h-56 rounded-[22.5%] shadow-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-[22.5%] shadow-inner pointer-events-none border border-black/5" />
                  </div>
                </div>
                
                <div className="md:w-3/5 text-center md:text-left">
                  <h4 className="text-4xl font-black tracking-tight mb-1 text-black">{project.name}</h4>
                  
                  {project.metadata && (
                    <div className="text-[13px] md:text-sm font-black text-black/50 mb-4 uppercase tracking-wider flex items-center justify-center md:justify-start">
                      {project.metadata}
                    </div>
                  )}

                  <p className="text-[19px] text-black mb-6 leading-relaxed max-w-xl mx-auto md:mx-0 font-bold opacity-90">
                    {project.description}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-3.5 py-1 rounded-full text-xs font-black bg-black/5 border border-black/10 text-black/80 tracking-wide uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-10 text-[15px] text-black font-black">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#0071e3] shrink-0" /> {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={() => trackProjectClick(project.name)}
                      className="text-[#0071e3] hover:underline inline-flex items-center gap-1 text-[18px] font-black group/link"
                    >
                      {project.linkLabel} <ChevronRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>

                    {project.iosComingSoon && (
                      <span className="text-black/40 text-[13px] font-black uppercase tracking-wider bg-black/5 border border-black/5 px-3 py-1 rounded-full">
                        {project.iosComingSoon}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
