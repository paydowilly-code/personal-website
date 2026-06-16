import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="fixed right-4 top-1/2 z-50 hidden h-48 w-px -translate-y-1/2 bg-white/10 md:block">
      <div
        className="w-full rounded-full bg-ember-500 shadow-ember transition-[height] duration-150"
        style={{ height: `${Math.max(progress * 100, 4)}%` }}
      />
    </div>
  );
}
