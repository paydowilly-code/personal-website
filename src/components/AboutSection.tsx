import { experience } from "../data/experience";
import SectionTitle from "./SectionTitle";

const stats = [
  { value: "8+", label: "设计项目" },
  { value: "30+", label: "产品渲染图" },
  { value: "499+", label: "素材与灵感积累" },
];

const info = [
  { label: "Identity", value: "Industrial Designer / Product Designer" },
  { label: "Focus", value: "AI Hardware / Companion Robot / CMF / Brand Visual" },
  { label: "Email", value: "paydowilly@gmail.com", href: "mailto:paydowilly@gmail.com" },
  { label: "Location", value: "China / Japan" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink-900 py-28 md:py-36">
      <div className="absolute left-[-12rem] top-24 h-96 w-96 rounded-full bg-ember-600/10 blur-[120px]" />
      <div className="mx-auto max-w-portfolio px-5 sm:px-8 lg:px-12">
        <SectionTitle eyebrow="About / Experience" title="Hi, I am Willy." />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="glass-card group relative min-h-[520px] overflow-hidden rounded-[32px] p-4">
            <div className="absolute inset-x-10 bottom-8 h-40 rounded-full bg-ember-500/[0.18] blur-3xl" />
            <div className="relative h-full overflow-hidden rounded-[26px] bg-avatar-placeholder">
              <img
                src="/images/avatar.jpg"
                alt="Willy portrait"
                className="h-full w-full object-cover opacity-0 transition duration-700 group-hover:scale-[1.02]"
                onLoad={(event) => event.currentTarget.classList.remove("opacity-0")}
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-black/[0.35] p-5 backdrop-blur-2xl">
                <p className="text-sm uppercase tracking-[0.36em] text-white/[0.45]">Designer Profile</p>
                <p className="mt-2 text-2xl font-semibold text-white">Industrial Design / AI Product</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-[32px] p-7 md:p-9">
              <p className="max-w-4xl text-xl leading-10 text-white/[0.72] md:text-2xl">
                我是一名工业设计方向的设计师，关注 AI 产品、陪伴机器人、产品 CMF、品牌视觉与产品体验设计。能够从调研、概念设定、造型推导、三维建模、产品渲染到最终展示，完成较完整的项目推进。
              </p>

              <div className="mt-9 grid gap-3 md:grid-cols-2">
                {info.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/[0.08] bg-black/[0.18] p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/[0.36]">{item.label}</p>
                    {item.href ? (
                      <a className="mt-2 block text-sm text-white/[0.78] transition hover:text-ember-400" href={item.href}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-2 text-sm text-white/[0.78]">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card rounded-[28px] p-6">
                  <p className="text-5xl font-black text-ember-400">{stat.value}</p>
                  <p className="mt-3 text-sm text-white/[0.48]">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-[32px] p-7">
              <div className="relative grid gap-5 md:grid-cols-3">
                <div className="absolute left-4 right-4 top-5 hidden h-px bg-gradient-to-r from-ember-500 via-ember-400 to-transparent md:block" />
                {experience.map((item) => (
                  <div key={item.year} className="group relative">
                    <span className="mb-4 block h-3 w-3 rounded-full bg-ember-500 shadow-ember transition group-hover:shadow-ember-strong" />
                    <p className="text-sm font-semibold text-ember-400">{item.year}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/[0.45]">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
