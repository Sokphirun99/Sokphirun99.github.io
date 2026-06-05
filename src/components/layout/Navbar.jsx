import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { lang, setLang, t, languages } = useLanguage();

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

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.contact, href: '#contact' }
  ];

  const currentLang = languages.find(l => l.code === lang);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/5 backdrop-blur-md border-b border-white/10 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex justify-between items-center text-[13px] font-bold tracking-tight">
        
        <a href="#" className="flex items-center gap-2 text-black transition-colors">
          <img src="/app_icon/developer icon.webp" alt="KR Studio" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
          <span className="font-black text-base tracking-tight">KR Studio</span>
        </a>
        
        <ul className="hidden md:flex items-center justify-center space-x-10 text-black">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="hover:opacity-60 transition-opacity">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-black/10 hover:bg-white/30 transition-all text-black font-bold"
            >
              <Globe size={14} />
              <span>{currentLang.label}</span>
              <ChevronDown size={12} className={`transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isLangDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/10 overflow-hidden min-w-[120px]">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-[13px] font-bold hover:bg-[#0071e3]/10 transition-colors ${
                      lang === l.code ? 'bg-[#0071e3]/10 text-[#0071e3]' : 'text-black'
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="#contact" className="bg-[#0071e3] text-white px-5 py-1.5 rounded-full hover:bg-[#0077ed] transition-colors text-xs font-black shadow-lg">
            {t.nav.contact}
          </a>
        </div>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-black focus:outline-none">
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl flex flex-col justify-center">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-5 right-5 text-black p-2">
            <X size={28} />
          </button>
          <ul className="flex flex-col gap-8 text-3xl font-black text-black text-center px-8">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#0071e3] transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Mobile Language Selector */}
          <div className="mt-12 flex justify-center gap-4 px-8">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-6 py-3 rounded-2xl text-lg font-black transition-all ${
                  lang === l.code 
                    ? 'bg-[#0071e3] text-white shadow-lg' 
                    : 'bg-white/40 text-black border border-black/10'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
