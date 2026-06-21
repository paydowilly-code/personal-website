import { experience } from "../data/experience";
import BorderGlow from "./BorderGlow";
import SectionTitle from "./SectionTitle";

const stats = [
  { value: "8+", label: "设计项目" },
  { value: "30+", label: "产品渲染图" },
  { value: "499+", label: "素材与灵感积累" },
];

const info = [
  { label: "Identity", value: "工业设计师 / 产品设计师" },
  { label: "Focus", value: "AI 硬件 / 陪伴机器人 / CMF / 品牌视觉" },
  { label: "Email", value: "XML_Design@163.com", href: "mailto:XML_Design@163.com" },
  { label: "Location", value: "杭州 / 成都" },
];

const glowProps = {
  glowColor: "32 100 70",
  colors: ["#ff7a1a", "#ff9a2d", "#ffc857"],
};

export default function AboutSection() {
  return (
    <section
      id="about"
      data-section
      className="relative scroll-mt-32 overflow-hidden bg-transparent py-20 md:scroll-mt-28 md:py-32"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute left-[-10rem] top-24 h-96 w-96 rounded-full bg-ember-600/10 blur-[120px]" />
      <div className="absolute right-[-8rem] bottom-24 h-80 w-80 rounded-full bg-ember-500/6 blur-[130px]" />

      <div className="mx-auto flex max-w-portfolio flex-col gap-12 px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(360px,0.92fr)_minmax(0,1.08fr)] lg:items-stretch">
          <BorderGlow
            data-stagger-card
            className="group min-h-[520px] overflow-hidden lg:min-h-[760px]"
            backgroundColor="#06070a"
            borderRadius={34}
            glowRadius={30}
            fillOpacity={0.14}
            glowIntensity={0.68}
            {...glowProps}
          >
            <div className="relative h-full overflow-hidden rounded-[34px] p-4 sm:p-5">
              <div className="absolute inset-x-8 top-8 h-28 rounded-full bg-ember-500/[0.14] blur-3xl" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
              <div data-image-reveal className="relative h-full overflow-hidden rounded-[28px] bg-black">
                <img
                  src="/images/avatar.webp"
                  alt="XUMENGLE portrait"
                  data-parallax-image
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center opacity-0 transition duration-700"
                  onLoad={(event) => event.currentTarget.classList.remove("opacity-0")}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="rounded-[22px] border border-white/10 bg-black/55 px-5 py-4 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.36em] text-white/40">设计师档案</p>
                    <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">工业设计 / AI 产品</p>
                  </div>
                </div>
              </div>
            </div>
          </BorderGlow>

          <div className="flex flex-col gap-8 lg:min-h-[760px]">
            <div className="shrink-0 pt-1">
              <SectionTitle eyebrow="关于我 / About" title="Hi, I am XUMENGLE." />
            </div>

            <BorderGlow
              data-stagger-card
              className="min-h-[420px] flex-1"
              backgroundColor="#08090d"
              borderRadius={34}
              glowRadius={30}
              fillOpacity={0.16}
              glowIntensity={0.7}
              {...glowProps}
            >
              <div className="flex h-full min-h-[420px] flex-col justify-between p-6 sm:p-7 md:p-9">
                <div className="space-y-8">
                  <p className="max-w-4xl text-[1.08rem] leading-8 text-white/72 sm:text-[1.18rem] sm:leading-9 md:text-[1.35rem] md:leading-10">
                我是一名工业设计 / AI 产品方向的设计师，具备从用户调研、概念设定、造型推导、CMF、三维建模、产品渲染到原型制作的全流程推进能力，同时具备 AI Agent / Web UI 实践经验，能够将 AI 工具链融入设计分析、方案生成与体验验证过程。
                  </p>

                  <div className="grid gap-3 md:grid-cols-2">
                    {info.map((item) => (
                      <BorderGlow
                        data-stagger-card
                        key={item.label}
                        backgroundColor="#0a0b10"
                        borderRadius={24}
                        glowRadius={18}
                        fillOpacity={0.1}
                        glowIntensity={0.52}
                        edgeSensitivity={36}
                        {...glowProps}
                      >
                        <div className="p-4">
                          <p className="text-xs uppercase tracking-[0.28em] text-white/36">{item.label}</p>
                          {item.href ? (
                            <a className="mt-2 block text-sm text-white/78 transition hover:text-ember-400" href={item.href}>
                              {item.value}
                            </a>
                          ) : (
                            <p className="mt-2 text-sm text-white/78">{item.value}</p>
                          )}
                        </div>
                      </BorderGlow>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <BorderGlow
                      data-stagger-card
                      key={stat.label}
                      backgroundColor="#090a0f"
                      borderRadius={28}
                      glowRadius={24}
                      fillOpacity={0.12}
                      glowIntensity={0.62}
                      edgeSensitivity={34}
                      {...glowProps}
                    >
                      <div className="p-5 sm:p-6">
                        <p className="text-4xl font-black text-ember-400 sm:text-5xl">{stat.value}</p>
                        <p className="mt-3 text-sm text-white/48">{stat.label}</p>
                      </div>
                    </BorderGlow>
                  ))}
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>

        <BorderGlow
          data-stagger-card
          backgroundColor="#08090d"
          borderRadius={34}
          glowRadius={28}
          fillOpacity={0.14}
          glowIntensity={0.66}
          {...glowProps}
        >
          <div className="p-6 sm:p-7 lg:p-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/34">CAREER PATH</p>
                <p className="mt-3 text-2xl font-semibold text-white/80 sm:text-3xl">工作经历</p>
              </div>
              <p className="hidden text-sm text-white/36 md:block">横向时间轴</p>
            </div>

            <div className="relative">
              <div className="absolute left-0 right-0 top-4 hidden h-px bg-gradient-to-r from-ember-500 via-ember-400 to-transparent md:block" />
              <div className="grid gap-6 md:grid-cols-3 md:gap-8">
                {experience.map((item) => (
                  <div key={item.year} className="group relative pt-8 md:pt-0">
                    <span className="absolute left-0 top-0 h-3 w-3 rounded-full bg-ember-500 shadow-ember transition group-hover:shadow-ember-strong md:left-0 md:top-2" />
                    <p className="text-sm font-semibold text-ember-400">{item.year}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/45">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}
