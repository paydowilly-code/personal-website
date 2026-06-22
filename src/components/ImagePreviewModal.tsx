import { useEffect, useState } from "react";
import type { WheelEvent } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../data/projects";

type ImagePreviewModalProps = {
  project: Project;
  onClose: () => void;
};

const minZoom = 0.6;
const maxZoom = 2.2;
const zoomStep = 0.1;

export default function ImagePreviewModal({ project, onClose }: ImagePreviewModalProps) {
  const [zoom, setZoom] = useState(1);
  const [baseWidth, setBaseWidth] = useState(900);

  useEffect(() => {
    const updateBaseWidth = () => {
      const viewportWidth = window.innerWidth;
      setBaseWidth(viewportWidth < 768 ? viewportWidth * 0.92 : Math.min(viewportWidth * 0.62, 1200));
    };

    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    return () => window.removeEventListener("resize", updateBaseWidth);
  }, []);

  useEffect(() => {
    setZoom(1);
  }, [project.id]);

  if (!project.detailImage) return null;

  const zoomIn = () => setZoom((value) => Math.min(maxZoom, +(value + zoomStep).toFixed(2)));
  const zoomOut = () => setZoom((value) => Math.max(minZoom, +(value - zoomStep).toFixed(2)));
  const resetZoom = () => setZoom(1);

  const handleWheelZoom = (event: WheelEvent<HTMLDivElement>) => {
    if (!event.ctrlKey) return;
    event.preventDefault();
    if (event.deltaY < 0) zoomIn();
    else zoomOut();
  };

  return createPortal(
    <div
      className="project-modal-overlay fixed inset-0 z-[90] grid place-items-center bg-black/88 p-0 backdrop-blur-xl md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title}图片预览`}
      onMouseDown={onClose}
    >
      <div
        className="project-modal-panel mx-auto flex h-[86vh] w-[94vw] max-w-portfolio flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#050609] shadow-[0_32px_120px_rgba(0,0,0,0.72)] md:h-[88vh] md:w-[86vw] md:rounded-[28px]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-black/55 px-3 py-3 sm:gap-3 sm:px-4 md:px-6">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.34em] text-ember-400">项目预览</p>
            <h3 className="mt-1 max-w-[42vw] truncate text-sm font-semibold text-white sm:max-w-none sm:text-base md:text-lg">
              {project.title}
            </h3>
          </div>

          <div className="flex shrink-0 items-center gap-1 text-xs font-semibold text-white/78 sm:gap-2 sm:text-sm">
            <button
              type="button"
              onClick={zoomOut}
              disabled={zoom <= minZoom}
              aria-label="缩小"
              className="grid size-11 place-items-center rounded-full border border-white/12 transition hover:border-ember-400/70 hover:text-ember-400 disabled:opacity-30"
            >
              -
            </button>
            <button
              type="button"
              onClick={resetZoom}
              aria-label="复位缩放"
              className="min-h-11 min-w-14 rounded-full px-2 text-center text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={zoomIn}
              disabled={zoom >= maxZoom}
              aria-label="放大"
              className="grid size-11 place-items-center rounded-full border border-white/12 transition hover:border-ember-400/70 hover:text-ember-400 disabled:opacity-30"
            >
              +
            </button>
            <button
              type="button"
              onClick={onClose}
              className="grid size-11 place-items-center rounded-full border border-white/12 bg-ember-500 text-2xl leading-none text-black transition hover:bg-white"
              aria-label="关闭图片预览"
            >
              ×
            </button>
          </div>
        </div>

        <div
          className={`viewer-scroll-area bg-[#111216] ${zoom > 1 ? "zoomed" : ""}`}
          onWheel={handleWheelZoom}
        >
          <img
            src={project.detailImage}
            alt={project.title}
            decoding="async"
            draggable={false}
            className="viewer-main-image rounded-sm bg-black shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
            style={{
              width: `${baseWidth * zoom}px`,
              maxWidth: "none",
            }}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
