import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className={`glass-card group relative cursor-pointer overflow-hidden rounded-[32px] ${
        project.featured ? "min-h-[640px] lg:col-span-2" : "min-h-[520px]"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden bg-project-placeholder">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover opacity-0 transition duration-700 group-hover:scale-[1.04]"
          onLoad={(event) => event.currentTarget.classList.remove("opacity-0")}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/15 to-ink-950/92" />
      </div>

      <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
        <div className="mb-7 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-black/[0.24] px-3 py-1.5 text-xs text-white/60 backdrop-blur-xl"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm uppercase tracking-[0.26em] text-ember-400">{project.type}</p>
        <h3 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
          {project.title}
        </h3>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/[0.62]">{project.description}</p>
        <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-white/[0.82]">
          <span className="rounded-full border border-white/[0.12] px-5 py-3 transition duration-300 group-hover:border-ember-500/70 group-hover:text-ember-400">
            View Project
          </span>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.08] text-xl transition duration-300 group-hover:translate-x-1 group-hover:bg-ember-500 group-hover:text-white">
            →
          </span>
        </div>
      </div>
    </article>
  );
}
