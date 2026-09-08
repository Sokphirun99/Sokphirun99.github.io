import { useLanguage } from '../../context/useLanguage';

export function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.contact, href: '#contact' }
  ];

  return (
    <footer className="relative z-10 py-12 bg-[#0f1013]/80 backdrop-blur-md border-t border-white/10 shadow-2xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <img src="/app_icon/developer-icon.webp" srcSet="/app_icon/responsive/developer-icon-128.webp 128w, /app_icon/developer-icon.webp 512w" sizes="24px" width="512" height="512" alt="KR Studio" className="w-6 h-6 rounded-md object-cover" loading="lazy" />
            <span className="font-bold text-white tracking-tight">KR Studio</span>
          </div>
          <p className="text-[13px] text-white/60 font-medium">{t.footer.tagline}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-[13px] font-bold text-white/80">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </a>
          ))}
        </div>

        <div className="text-[12px] text-white/50 font-medium text-center md:text-right">
          <p>{t.footer.copyright.replace(/\b20\d{2}\b/, new Date().getFullYear())}</p>
        </div>
      </div>
    </footer>
  );
}
