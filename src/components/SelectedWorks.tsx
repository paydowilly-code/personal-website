import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import SectionTitle from "./SectionTitle";

export default function SelectedWorks() {
  return (
    <section id="work" className="relative overflow-hidden bg-ink-950 py-28 md:py-36">
      <div className="absolute right-[-18rem] top-48 h-[34rem] w-[34rem] rounded-full bg-ember-500/10 blur-[140px]" />
      <div className="mx-auto max-w-portfolio px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle eyebrow="Selected Works" title="Projects With Product Temperature." />
          <p className="max-w-xl text-base leading-8 text-white/[0.52]">
            从工业设计、AI 产品、智能硬件到品牌视觉，将概念、形态、交互与叙事放在同一条产品体验链路里。
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
