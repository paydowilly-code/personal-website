type SectionTitleProps = {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
};

export default function SectionTitle({ eyebrow, title, align = "left" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-ember-400">
        {eyebrow}
      </p>
      <h2 className="text-[clamp(2.6rem,5vw,6.8rem)] font-black uppercase leading-[0.9] text-white">
        {title}
      </h2>
    </div>
  );
}
