import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Handle ESC key to dismiss mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.contact, href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#0f1013]/80 backdrop-blur-md border-b border-white/10 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex justify-between items-center text-[13px] font-bold tracking-tight">
        
        <a href="#" className="flex items-center gap-2 text-white transition-colors">
          <img src="/app_icon/developer-icon.webp" srcSet="/app_icon/responsive/developer-icon-128.webp 128w, /app_icon/developer-icon.webp 512w" sizes="32px" width="512" height="512" alt="KR Studio" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
          <span className="font-black text-base tracking-tight text-white">KR Studio</span>
        </a>
        
        <ul className="hidden lg:flex items-center justify-center space-x-10 text-white/90">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <a href="#contact" className="bg-[#0071e3] text-white px-5 py-1.5 rounded-full hover:bg-[#0077ed] transition-colors text-xs font-black shadow-lg">
            {t.nav.contact}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          className="lg:hidden text-white focus:outline-none p-3 -mr-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden fixed inset-0 z-[60] bg-[#0f1013]/95 backdrop-blur-xl flex flex-col justify-center">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="absolute top-5 right-5 text-white p-3"
          >
            <X size={24} />
          </button>
          <ul className="flex flex-col gap-8 text-2xl sm:text-3xl font-black text-white text-center px-8">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#0071e3] transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
