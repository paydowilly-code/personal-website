export default function ContactSection() {
  return (
    <section id="contact" data-section className="relative flex min-h-screen overflow-hidden bg-transparent py-28">
      <div className="absolute bottom-[-18%] right-[-8%] h-[46rem] w-[46rem] rounded-full bg-ember-500/[0.18] blur-[150px]" />
      <div className="absolute left-[18%] top-[12%] h-80 w-80 rounded-full bg-ember-gold/[0.08] blur-[120px]" />
      <div className="noise-layer" />

      <div className="relative z-10 mx-auto flex w-full max-w-portfolio flex-col justify-center px-5 sm:px-8 lg:px-12">
        <p data-section-eyebrow className="mb-6 text-xs font-semibold uppercase tracking-[0.55em] text-ember-400">Contact</p>
        <h2 data-section-title className="max-w-6xl text-[clamp(3.8rem,8.5vw,10rem)] font-black uppercase leading-[0.86] text-white">
          LET&apos;S CREATE
          <span className="block">SOMETHING MEANINGFUL.</span>
        </h2>
        <p data-stagger-card className="mt-8 max-w-2xl text-lg leading-9 text-white/[0.62]">
          如果你对工业设计、AI 产品、品牌视觉或作品集合作感兴趣，可以通过以下方式联系我。
        </p>

        <div className="mt-12 grid max-w-4xl gap-3 md:grid-cols-3">
          <a data-stagger-card href="mailto:XML_Design@163.com" className="glass-card rounded-[28px] p-5 hover:text-ember-400">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.36]">Email</p>
            <p className="mt-3 text-sm text-white/[0.76]">XML_Design@163.com</p>
          </a>
          <div data-stagger-card className="glass-card rounded-[28px] p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.36]">WeChat</p>
            <p className="mt-3 text-sm text-white/[0.76]">Coming soon</p>
          </div>
          <div data-stagger-card className="glass-card rounded-[28px] p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.36]">Portfolio</p>
            <p className="mt-3 text-sm text-white/[0.76]">Coming soon</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="mailto:XML_Design@163.com"
            data-stagger-card
            className="rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition duration-300 hover:-translate-y-1 hover:bg-ember-500 hover:text-white hover:shadow-ember"
          >
            Send Email
          </a>
          <a
            href="#work"
            data-stagger-card
            className="rounded-full border border-white/[0.12] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:border-ember-500 hover:text-ember-400 hover:shadow-ember"
          >
            View Works
          </a>
        </div>
      </div>
    </section>
  );
}
