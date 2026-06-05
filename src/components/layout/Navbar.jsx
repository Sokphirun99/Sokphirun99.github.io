import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' }
  ];

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

        <div className="hidden md:block">
          <a href="#contact" className="bg-[#0071e3] text-white px-5 py-1.5 rounded-full hover:bg-[#0077ed] transition-colors text-xs font-black shadow-lg">
            Contact
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
        </div>
      )}
    </nav>
  );
}