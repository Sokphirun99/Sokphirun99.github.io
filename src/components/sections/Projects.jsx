import { ChevronRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { getAnalyticsInstance } from "../../firebase";
import { useLanguage } from '../../context/useLanguage';

export function Projects() {
  const { t } = useLanguage();

  const trackProjectClick = async (projectName) => {
    try {
      const analytics = await getAnalyticsInstance();
      if (analytics) {
        const { logEvent } = await import('firebase/analytics');
        logEvent(analytics, 'select_content', {
          content_type: 'project',
          content_id: projectName
        });
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error.message);
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
    <section id="projects" className="py-20 md:py-24 lg:py-32 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-16 sm:mb-20 lg:mb-24">
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-4 sm:mb-6">
            {t.projects.heading}
          </h3>
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-white/70 tracking-tight">
            {t.projects.subheading}
          </p>
        </Reveal>

        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
          {projects.map((project, index) => (
            <Reveal key={project.id} className="relative group">
              <div className="absolute -inset-3 sm:-inset-6 lg:-inset-10 bg-white/[0.04] backdrop-blur-md md:backdrop-blur-[19px] rounded-[24px] md:rounded-[28px] -z-10 border border-white/10 shadow-2xl transition-all duration-500 group-hover:bg-white/[0.07]" />
              
              <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-12`}>
                <div className="lg:w-2/5 flex justify-center">
                  <div className="relative">
                    <img
                      src={project.icon}
                      srcSet={project.iconSrcSet}
                      sizes="(min-width: 1024px) 224px, (min-width: 640px) 192px, 160px"
                      width="512"
                      height="512"
                      alt={project.iconAlt}
                      className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-[22.5%] shadow-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-[22.5%] shadow-inner pointer-events-none border border-white/10" />
                  </div>
                </div>
                
                <div className="lg:w-3/5 text-center lg:text-left">
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-1 text-white">
                    {project.name}
                  </h4>
                  
                  {project.metadata && (
                    <div className="text-[13px] md:text-sm font-bold text-white/50 mb-4 uppercase tracking-wider flex items-center justify-center lg:justify-start">
                      {project.metadata}
                    </div>
                  )}

                  <p className="text-base sm:text-[18px] text-white/80 mb-6 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                    {project.description}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-3.5 py-1 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-white/80 tracking-wide uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8 sm:mb-10 text-[14px] sm:text-[15px] text-white/90 font-medium text-left">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#e86bd8] shrink-0" /> {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => trackProjectClick(project.name)}
                      className="text-[#3898ff] hover:text-[#5fb0ff] hover:underline inline-flex items-center gap-1 text-[16px] sm:text-[18px] font-bold group/link"
                    >
                      {project.linkLabel} <ChevronRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>

                    {project.iosComingSoon && (
                      <span className="text-white/40 text-[12px] sm:text-[13px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-3 py-1 rounded-full">
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
