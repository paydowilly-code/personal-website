import { useEffect, useState } from "react";
import { projects } from "../data/projects";

const tags = ["Industrial Design", "Product Design", "AI Design", "3D Visualization"];

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const previewProjects = projects.slice(0, 3);

  useEffect(() => {
    const loadVideo = () => setVideoReady(true);
    let timeoutId = 0;
    let idleId = 0;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(loadVideo, { timeout: 2200 });
    } else {
      timeoutId = globalThis.setTimeout(loadVideo, 1400);
    }

    return () => {
      if (idleId && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timeoutId) globalThis.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-hero-fallback">
      <video
        className="absolute inset-0 hidden h-full w-full object-cover opacity-35 md:block"
        src={videoReady ? "/videos/hero-bg.mp4" : undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,7,0.98)_0%,rgba(3,4,7,0.82)_46%,rgba(3,4,7,0.62)_100%)]" />
      <div className="absolute bottom-[-18%] right-[-6%] h-[52rem] w-[52rem] rounded-full bg-ember-500/[0.18] blur-[150px]" />
      <div className="absolute left-[-14%] top-[28%] h-96 w-96 rounded-full bg-ember-red/[0.08] blur-[120px]" />
      <div className="noise-layer" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-portfolio flex-col justify-between px-5 pb-8 pt-28 sm:px-8 md:pt-32 lg:px-12">
        <div className="w-full">
          <div className="flex w-full items-start justify-between gap-8">
            <p data-hero-kicker className="text-xs font-medium uppercase tracking-[0.35em] text-white/62">
              [Portfolio]
            </p>
            <p data-hero-kicker className="hidden text-right text-xs font-medium uppercase tracking-[0.32em] text-white/62 md:block">
              [Industrial Designer]
            </p>
          </div>
          <h1 data-hero-title className="mt-5 font-display text-[clamp(2.4rem,6.6vw,7.4rem)] font-black uppercase leading-[0.78] text-ember-500">
            XUMENGLE
          </h1>
          <p data-hero-copy className="mt-7 max-w-2xl text-base leading-8 text-white/[0.72] md:text-xl">
            {"\u4ee5\u4ea7\u54c1\u8bbe\u8ba1\u3001AI \u4ea4\u4e92\u4e0e\u89c6\u89c9\u8868\u8fbe\uff0c\u63a2\u7d22\u66f4\u6709\u8fa8\u8bc6\u5ea6\u7684\u4ea7\u54c1\u4f53\u9a8c\u3002"}
          </p>
          <div data-hero-tags className="mt-8 flex flex-wrap gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/70 backdrop-blur-xl transition duration-300 hover:border-ember-400/80 hover:text-white hover:shadow-ember"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
          {previewProjects.map((project, index) => (
            <a
              key={project.id}
              href={`#work-${project.id}`}
              data-hero-project
              className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-3 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-ember-500/60 hover:shadow-ember"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl bg-project-placeholder">
                  <img
                    src={project.thumbnail ?? project.image}
                    alt={project.title}
                    decoding="async"
                    className="h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-105"
                    onLoad={(event) => event.currentTarget.classList.remove("opacity-0")}
                  />
                  <span className="absolute left-3 top-3 text-xs font-semibold text-white/[0.45]">
                    0{index + 1}
                  </span>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">{project.title}</h2>
                  <p className="mt-1 text-xs text-white/[0.42]">{project.type}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
