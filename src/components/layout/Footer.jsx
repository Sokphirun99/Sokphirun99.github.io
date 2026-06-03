export function Footer() {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="relative z-10 py-12 bg-white/5 backdrop-blur-md border-t border-white/10 shadow-2xl">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <img src="/app_icon/developer icon.png" alt="KR Studio" className="w-6 h-6 rounded-md object-cover" />
            <span className="font-black text-black tracking-tight">KR Studio</span>
          </div>
          <p className="text-[13px] text-slate-800 font-bold">Crafting premium mobile experiences.</p>
        </div>

        <div className="flex gap-8 text-[13px] font-black text-black">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="hover:opacity-60 transition-opacity">
              {item.label}
            </a>
          ))}
        </div>

        <div className="text-[12px] text-slate-700 font-bold text-center md:text-right">
          <p>© 2026 KR Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}