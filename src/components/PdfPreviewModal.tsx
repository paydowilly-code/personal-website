import { useEffect, useRef, useState } from "react";
import type { PointerEvent, TouchEvent, WheelEvent } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../data/projects";

type PdfPreviewModalProps = {
  project: Project;
  onClose: () => void;
};

const minZoom = 1;
const maxZoom = 4;
const zoomStep = 0.25;

function clampZoom(value: number) {
  return Math.min(maxZoom, Math.max(minZoom, value));
}

export default function PdfPreviewModal({ project, onClose }: PdfPreviewModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(minZoom);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const wheelLocked = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const dragStart = useRef({ pointerId: -1, x: 0, y: 0, originX: 0, originY: 0 });
  const images = project.previewImages ?? [];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => Math.max(0, index - 1));
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => Math.min(images.length - 1, index + 1));
      }
      if (event.key === "+" || event.key === "=") {
        setZoom((value) => clampZoom(value + zoomStep));
      }
      if (event.key === "-") {
        setZoom((value) => {
          const nextZoom = clampZoom(value - zoomStep);
          if (nextZoom === minZoom) setPosition({ x: 0, y: 0 });
          return nextZoom;
        });
      }
      if (event.key === "0") {
        setZoom(minZoom);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  useEffect(() => {
    if (images.length === 0) return;

    setZoom(minZoom);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);

    [activeIndex - 1, activeIndex, activeIndex + 1].forEach((index) => {
      if (index < 0 || index >= images.length) return;
      const image = new Image();
      image.src = images[index];
    });

    document
      .querySelector<HTMLButtonElement>(`[data-preview-index="${activeIndex}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex, images]);

  if (!project.pdfUrl || images.length === 0) return null;

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (zoom > minZoom || event.ctrlKey) {
      event.preventDefault();
      setZoom((value) => {
        const nextZoom = clampZoom(value + (event.deltaY > 0 ? -zoomStep : zoomStep));
        if (nextZoom === minZoom) setPosition({ x: 0, y: 0 });
        return nextZoom;
      });
      return;
    }

    if (window.innerWidth < 768 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
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

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (zoom > minZoom) return;
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (zoom > minZoom) return;
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 48) return;

    setActiveIndex((index) =>
      distance < 0 ? Math.min(images.length - 1, index + 1) : Math.max(0, index - 1),
    );
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (zoom <= minZoom) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      originX: position.x,
      originY: position.y,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStart.current.pointerId !== event.pointerId) return;
    setPosition({
      x: dragStart.current.originX + event.clientX - dragStart.current.x,
      y: dragStart.current.originY + event.clientY - dragStart.current.y,
    });
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragStart.current.pointerId = -1;
    setIsDragging(false);
  };

  const adjustZoom = (amount: number) => {
    setZoom((value) => {
      const nextZoom = clampZoom(value + amount);
      if (nextZoom === minZoom) setPosition({ x: 0, y: 0 });
      return nextZoom;
    });
  };

  const resetZoom = () => {
    setZoom(minZoom);
    setPosition({ x: 0, y: 0 });
  };

  return createPortal(
    <div
      className="project-modal-overlay fixed inset-0 z-[90] grid place-items-center bg-[rgba(0,0,0,0.9)] p-0 backdrop-blur-[12px] md:p-5"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title}项目预览`}
      onMouseDown={onClose}
    >
      <div
        className="project-modal-panel relative flex h-[86vh] w-[94vw] flex-col overflow-hidden rounded-2xl border border-white/[0.14] bg-[#030405] shadow-[0_32px_140px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,154,45,0.1)] md:h-[88vh] md:w-[86vw]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 bg-gradient-to-b from-black/90 via-black/45 to-transparent px-3 pb-9 pt-3 sm:px-4 sm:pt-4 md:gap-4 md:px-6 md:pb-10 md:pt-5">
          <div className="min-w-0">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#ff9a2d]">
              精选作品
            </p>
            <h3 className="mt-1 max-w-[58vw] truncate text-sm font-semibold text-white sm:max-w-[62vw] md:text-lg">
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
              打开 PDF
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="关闭项目预览"
              className="grid size-11 place-items-center rounded-full border border-white/[0.16] bg-[#ff9a2d] text-xl leading-none text-black shadow-[0_0_28px_rgba(255,154,45,0.25)] transition hover:scale-105 hover:bg-white"
            >
              &times;
            </button>
          </div>
        </header>

        <div
          className={`relative min-h-0 flex-1 overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(255,154,45,0.08),transparent_34rem),#030405] px-2 pb-2 pt-16 sm:px-3 sm:pb-3 md:px-8 md:pb-5 md:pt-20 ${
            zoom > minZoom ? (isDragging ? "cursor-grabbing touch-none" : "cursor-grab touch-none") : "touch-pan-y"
          }`}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDoubleClick={() => (zoom > minZoom ? resetZoom() : adjustZoom(1))}
        >
          <img
            key={images[activeIndex]}
            src={images[activeIndex]}
            alt={`${project.title} page ${activeIndex + 1}`}
            className="project-gallery-image h-full w-full select-none object-contain"
            decoding="async"
            draggable={false}
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${zoom})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: zoom > minZoom ? "transform" : "auto",
            }}
          />

          <div
            className="absolute bottom-3 right-3 z-20 flex items-center gap-1 rounded-full border border-white/15 bg-black/65 p-1 text-white shadow-lg backdrop-blur-md md:bottom-5 md:right-5"
            onPointerDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="缩小"
              onClick={() => adjustZoom(-zoomStep)}
              disabled={zoom <= minZoom}
              className="grid size-9 place-items-center rounded-full text-lg transition hover:bg-white/10 disabled:opacity-25"
            >
              &minus;
            </button>
            <button
              type="button"
              onClick={resetZoom}
              aria-label="复位缩放"
              className="min-w-14 rounded-full px-2 text-[0.65rem] font-semibold text-white/72 transition hover:bg-white/10 hover:text-white"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              aria-label="放大"
              onClick={() => adjustZoom(zoomStep)}
              disabled={zoom >= maxZoom}
              className="grid size-9 place-items-center rounded-full text-lg transition hover:bg-white/10 disabled:opacity-25"
            >
              +
            </button>
          </div>

          <button
            type="button"
            aria-label="上一页"
            onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
            onPointerDown={(event) => event.stopPropagation()}
            disabled={activeIndex === 0}
            className="absolute left-3 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/45 text-xl text-white backdrop-blur-md transition hover:border-[#ff9a2d]/70 hover:text-[#ff9a2d] disabled:opacity-20 md:grid"
          >
            &#8592;
          </button>
          <button
            type="button"
            aria-label="下一页"
            onClick={() => setActiveIndex((index) => Math.min(images.length - 1, index + 1))}
            onPointerDown={(event) => event.stopPropagation()}
            disabled={activeIndex === images.length - 1}
            className="absolute right-3 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/45 text-xl text-white backdrop-blur-md transition hover:border-[#ff9a2d]/70 hover:text-[#ff9a2d] disabled:opacity-20 md:grid"
          >
            &#8594;
          </button>
        </div>

        <div className="flex h-[78px] shrink-0 items-center gap-2 border-t border-white/[0.1] bg-[#08090c] px-2 py-2 sm:h-[82px] sm:px-3 md:h-[104px] md:gap-3 md:px-5 md:py-3">
          <p className="w-12 shrink-0 text-center text-[0.65rem] font-semibold text-white/65 md:hidden">
            {activeIndex + 1}/{images.length}
          </p>
          <div className="hidden w-28 shrink-0 md:block">
            <p className="truncate text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#ff9a2d]">
              {project.id === "lumi" ? "LUMI 项目" : "项目案例"}
            </p>
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
                aria-label={`打开第 ${index + 1} 页`}
                aria-current={activeIndex === index ? "page" : undefined}
                data-preview-index={index}
                className={`relative aspect-video h-14 shrink-0 overflow-hidden rounded-md border transition md:h-[72px] ${
                  activeIndex === index
                    ? "border-[#ff9a2d] opacity-100 shadow-[0_0_18px_rgba(255,154,45,0.25)]"
                    : "border-white/10 opacity-45 hover:border-white/35 hover:opacity-85"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className="h-full w-full bg-black object-contain"
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
