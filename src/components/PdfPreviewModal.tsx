import { useEffect, useRef, useState } from "react";
import type { WheelEvent } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../data/projects";

type PdfPreviewModalProps = {
  project: Project;
  onClose: () => void;
};

export default function PdfPreviewModal({ project, onClose }: PdfPreviewModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const wheelLocked = useRef(false);
  const images = project.previewImages ?? [];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => Math.max(0, index - 1));
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => Math.min(images.length - 1, index + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  if (!project.pdfUrl || images.length === 0) return null;

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (wheelLocked.current || Math.abs(event.deltaY) < 18) return;

    wheelLocked.current = true;
    setActiveIndex((index) => {
      const direction = event.deltaY > 0 ? 1 : -1;
      return Math.min(images.length - 1, Math.max(0, index + direction));
    });
    window.setTimeout(() => {
      wheelLocked.current = false;
    }, 360);
  };

  return createPortal(
    <div
      className="project-modal-overlay fixed inset-0 z-[90] grid place-items-center bg-[rgba(0,0,0,0.9)] p-2 backdrop-blur-[12px] md:p-5"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project viewer`}
      onMouseDown={onClose}
    >
      <div
        className="project-modal-panel relative flex h-[90vh] w-[96vw] flex-col overflow-hidden rounded-2xl border border-white/[0.14] bg-[#030405] shadow-[0_32px_140px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,154,45,0.1)] md:h-[88vh] md:w-[86vw]"
        onMouseDown={(event) => event.stopPropagation()}
        onWheel={handleWheel}
      >
        <header className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 bg-gradient-to-b from-black/80 via-black/35 to-transparent px-4 pb-10 pt-4 md:px-6 md:pt-5">
          <div className="min-w-0">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#ff9a2d]">
              Selected Work
            </p>
            <h3 className="mt-1 max-w-[62vw] truncate text-sm font-semibold text-white md:text-lg">
              {project.title}
            </h3>
            <p className="mt-1 hidden truncate text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/46 sm:block">
              {project.type}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-xs font-semibold md:text-sm">
            <a
              href={project.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-white/[0.16] bg-black/30 px-4 py-2 text-white/72 backdrop-blur-md transition hover:border-[#ff9a2d]/70 hover:text-[#ff9a2d] sm:block"
              onMouseDown={(event) => event.stopPropagation()}
            >
              Open PDF
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project viewer"
              className="grid size-10 place-items-center rounded-full border border-white/[0.16] bg-[#ff9a2d] text-xl leading-none text-black shadow-[0_0_28px_rgba(255,154,45,0.25)] transition hover:scale-105 hover:bg-white"
            >
              &times;
            </button>
          </div>
        </header>

        <div className="relative min-h-0 flex-1 overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(255,154,45,0.08),transparent_34rem),#030405] px-3 pb-3 pt-16 md:px-8 md:pb-5 md:pt-20">
          <img
            key={images[activeIndex]}
            src={images[activeIndex]}
            alt={`${project.title} page ${activeIndex + 1}`}
            className="project-gallery-image h-full w-full object-contain"
            decoding="async"
          />

          <button
            type="button"
            aria-label="Previous page"
            onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
            disabled={activeIndex === 0}
            className="absolute left-3 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/45 text-xl text-white backdrop-blur-md transition hover:border-[#ff9a2d]/70 hover:text-[#ff9a2d] disabled:opacity-20 md:grid"
          >
            &#8592;
          </button>
          <button
            type="button"
            aria-label="Next page"
            onClick={() => setActiveIndex((index) => Math.min(images.length - 1, index + 1))}
            disabled={activeIndex === images.length - 1}
            className="absolute right-3 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/45 text-xl text-white backdrop-blur-md transition hover:border-[#ff9a2d]/70 hover:text-[#ff9a2d] disabled:opacity-20 md:grid"
          >
            &#8594;
          </button>
        </div>

        <div className="flex h-[82px] shrink-0 items-center gap-2 border-t border-white/[0.1] bg-[#08090c] px-3 py-2 md:h-[104px] md:gap-3 md:px-5 md:py-3">
          <div className="hidden w-28 shrink-0 md:block">
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#ff9a2d]">LUMI Case</p>
            <p className="mt-1 text-sm font-semibold text-white">
              {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
          </div>
          <div className="project-gallery-thumbnails flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open page ${index + 1}`}
                aria-current={activeIndex === index ? "page" : undefined}
                className={`relative aspect-video h-14 shrink-0 overflow-hidden rounded-md border transition md:h-[72px] ${
                  activeIndex === index
                    ? "border-[#ff9a2d] opacity-100 shadow-[0_0_18px_rgba(255,154,45,0.25)]"
                    : "border-white/10 opacity-45 hover:border-white/35 hover:opacity-85"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span className="absolute bottom-1 left-1.5 text-[0.56rem] font-semibold text-white drop-shadow">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
