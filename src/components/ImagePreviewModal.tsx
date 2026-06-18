import { useState } from "react";
import type { Project } from "../data/projects";
import { createPortal } from "react-dom";

type ImagePreviewModalProps = {
  project: Project;
  onClose: () => void;
};

export default function ImagePreviewModal({ project, onClose }: ImagePreviewModalProps) {
  const [zoom, setZoom] = useState(1);

  if (!project.detailImage) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[90] bg-black/88 p-3 backdrop-blur-xl md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} image preview`}
    >
      <div className="mx-auto flex h-full max-w-portfolio flex-col overflow-hidden rounded-[28px] border border-white/15 bg-[#050609] shadow-[0_32px_120px_rgba(0,0,0,0.72)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/55 px-4 py-3 md:px-6">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.34em] text-ember-400">Project Preview</p>
            <h3 className="mt-1 truncate text-base font-semibold text-white md:text-lg">{project.title}</h3>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-white/78">
            <button
              type="button"
              onClick={() => setZoom((value) => Math.max(0.7, Number((value - 0.15).toFixed(2))))}
              className="rounded-full border border-white/12 px-4 py-2 transition hover:border-ember-400/70 hover:text-ember-400"
            >
              -
            </button>
            <span className="min-w-14 text-center text-white/60">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              onClick={() => setZoom((value) => Math.min(1.8, Number((value + 0.15).toFixed(2))))}
              className="rounded-full border border-white/12 px-4 py-2 transition hover:border-ember-400/70 hover:text-ember-400"
            >
              +
            </button>
            <button
              type="button"
              onClick={onClose}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-2xl leading-none text-white/80 transition hover:border-ember-400/70 hover:text-ember-400"
              aria-label="Close image preview"
            >
              ×
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-[#111216] p-4 md:p-6">
          <img
            src={project.detailImage}
            alt={project.title}
            decoding="async"
            className="mx-auto block h-auto rounded-sm bg-black shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
            style={{ width: `${Math.round(900 * zoom)}px`, maxWidth: "none" }}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
