const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Strengths", href: "#strengths" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-5 z-50 animate-nav-fade">
      <nav className="mx-auto flex w-[92%] max-w-[1450px] items-center justify-between rounded-full border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white/70 shadow-2xl backdrop-blur-2xl md:w-[82%] md:px-6">
        <a href="#hero" className="group flex items-center gap-3 font-semibold tracking-[0.18em] text-white">
          <span className="h-2.5 w-2.5 rounded-full bg-ember-500 shadow-ember" />
          XUMENGLE
        </a>
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/20 p-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="rounded-full px-4 py-2 text-white/[0.58] transition duration-300 hover:bg-white/[0.08] hover:text-ember-400"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="mailto:paydowilly@gmail.com"
          className="rounded-full border border-white/[0.12] px-4 py-2 text-white transition duration-300 hover:border-ember-500/70 hover:text-ember-400 hover:shadow-ember md:px-5"
        >
          Contact Me
        </a>
      </nav>
    </header>
  );
}
