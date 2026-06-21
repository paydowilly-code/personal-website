import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { projects } from "../data/projects";

const tags = ["工业设计", "产品设计", "AI 设计", "三维可视化"];

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const [showHeroVideo, setShowHeroVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const previewProjects = projects.slice(0, 3);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const slowConnection = connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g";

    if (!desktopQuery.matches || reducedMotionQuery.matches || connection?.saveData || slowConnection) {
      return undefined;
    }

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoReady) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoReady]);

  useEffect(() => {
    if (!showHeroVideo) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowHeroVideo(false);
    };
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const handleViewportChange = () => {
      if (desktopQuery.matches) setShowHeroVideo(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    desktopQuery.addEventListener("change", handleViewportChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleViewportChange);
      document.body.style.overflow = previousOverflow;
      const video = modalVideoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [showHeroVideo]);

  const closeHeroVideo = () => {
    const video = modalVideoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setShowHeroVideo(false);
  };

  return (
    <>
      <section id="hero" className="relative min-h-[680px] overflow-hidden bg-hero-fallback md:min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 md:hidden"
          style={{ backgroundImage: "url('/images/project-lumi.webp')" }}
          aria-hidden="true"
        />
        <video
          ref={videoRef}
          className="absolute inset-0 hidden h-full w-full object-cover opacity-35 md:block"
          src={videoReady ? "/videos/hero-bg.mp4" : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
        <div className="hero-media-scrim absolute inset-0" />
        <div className="absolute bottom-[-18%] right-[-6%] h-[52rem] w-[52rem] rounded-full bg-ember-500/[0.18] blur-[150px]" />
        <div className="absolute left-[-14%] top-[28%] h-96 w-96 rounded-full bg-ember-red/[0.08] blur-[120px]" />
        <div className="noise-layer" />

        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-portfolio flex-col justify-between px-5 pb-6 pt-40 sm:px-8 md:min-h-screen md:pb-8 md:pt-32 lg:px-12">
          <div className="w-full">
            <div className="flex w-full items-start justify-between gap-8">
              <p data-hero-kicker className="text-xs font-medium uppercase tracking-[0.35em] text-white/62">
                [Portfolio]
              </p>
              <p data-hero-kicker className="hidden text-right text-xs font-medium uppercase tracking-[0.32em] text-white/62 md:block">
                [工业设计师]
              </p>
            </div>
            <h1 data-hero-title className="mt-4 font-display text-[clamp(2.35rem,6.6vw,7.4rem)] font-black uppercase leading-[0.82] text-ember-500 md:mt-5 md:leading-[0.78]">
              XUMENGLE
            </h1>
            <p data-hero-copy className="mt-5 max-w-2xl text-sm leading-7 text-white/[0.72] sm:text-base md:mt-7 md:text-xl md:leading-8">
              {"\u4ee5\u4ea7\u54c1\u8bbe\u8ba1\u3001AI \u4ea4\u4e92\u4e0e\u89c6\u89c9\u8868\u8fbe\uff0c\u63a2\u7d22\u66f4\u6709\u8fa8\u8bc6\u5ea6\u7684\u4ea7\u54c1\u4f53\u9a8c\u3002"}
            </p>
            <div data-hero-tags className="mt-6 flex flex-wrap gap-2 md:mt-8 md:gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs text-white/70 backdrop-blur-xl transition duration-300 hover:border-ember-400/80 hover:text-white hover:shadow-ember md:px-4 md:py-2 md:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="-mx-5 flex snap-x gap-3 overflow-x-auto border-t border-white/10 px-5 pt-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {previewProjects.map((project, index) => (
              <a
                key={project.id}
                href={`#work-${project.id}`}
                data-hero-project
                className="group w-[82vw] shrink-0 snap-center overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.045] p-3 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-ember-500/60 hover:shadow-ember sm:w-auto sm:rounded-[28px]"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl bg-project-placeholder">
                    <img
                      src={project.thumbnail ?? project.image}
                      alt={project.title}
                      loading="eager"
                      fetchPriority={index === 0 ? "high" : "auto"}
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

        <button
          type="button"
          className="hero-video-play"
          onClick={() => setShowHeroVideo(true)}
          aria-label="播放首屏视频"
        >
          <span className="hero-video-play-icon" aria-hidden="true" />
        </button>
      </section>

      {showHeroVideo &&
        createPortal(
          <div
            className="hero-video-modal"
            role="dialog"
            aria-modal="true"
            aria-label="首屏视频"
            onClick={closeHeroVideo}
          >
            <div className="hero-video-panel" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                className="hero-video-close"
                onClick={closeHeroVideo}
                aria-label="关闭首屏视频"
              >
                &times;
              </button>
              <video
                ref={modalVideoRef}
                src="/videos/hero-bg.mp4"
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="hero-video-player"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
