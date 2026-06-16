export type Strength = {
  title: string;
  description: string;
  accent?: boolean;
  wide?: boolean;
};

export const strengths: Strength[] = [
  {
    title: "产品系统设计能力",
    description: "能够从用户需求、场景定位、功能结构到产品形态进行整体推导。",
    wide: true,
  },
  {
    title: "AI 工作流与视觉提案能力",
    description: "能够结合 AI 工具完成概念发散、图像生成、方案表达与效率提升。",
    accent: true,
  },
  {
    title: "Blender / KeyShot 产品渲染能力",
    description: "能够完成产品建模、材质表现、灯光搭建和高质量视觉输出。",
  },
  {
    title: "品牌视觉与包装延展能力",
    description: "能够围绕品牌定位完成视觉识别、包装设计和周边延展。",
  },
  {
    title: "调研分析与设计叙事能力",
    description: "能够将用户研究、竞品分析、设计策略转化为清晰的作品集表达。",
  },
];
