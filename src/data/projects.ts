export type Project = {
  id: string;
  title: string;
  type: string;
  description: string;
  image: string;
  thumbnail?: string;
  pdfUrl?: string;
  previewImages?: string[];
  detailImage?: string;
  tags: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "lumi",
    title: "LUMI AI 陪伴机器人设计",
    type: "AI Hardware / Industrial Design",
    description:
      "面向独居青年的低压力社交 AI 陪伴机器人，通过桌面交互、异步留言与场景陪伴，缓解社交启动压力。",
    image: "/images/project-lumi.webp",
    thumbnail: "/images/project-lumi-thumb.webp",
    pdfUrl: "/pdf/lumi-presentation.pdf",
    previewImages: Array.from(
      { length: 14 },
      (_, index) => `/images/lumi-pages/page-${String(index + 1).padStart(2, "0")}.webp`,
    ),
    tags: ["AI Hardware", "Companion Robot", "CMF"],
    featured: true,
  },
  {
    id: "local-ai-workflow",
    title: "本地化 AI 工作流平台",
    type: "AI Agent / Local Workflow / Web UI",
    description:
      "自建 Agent + Web UI 工作流平台，支持多模型切换、长记忆协作与本地数据留存，构建更自由可控的个人 AI 系统。",
    image: "/images/project-ai-workflow.webp",
    thumbnail: "/images/project-ai-workflow-thumb.webp",
    tags: ["AI Agent", "Web UI", "Workflow"],
  },
  {
    id: "fitness-master",
    title: "Fitness Master 智能健身舱",
    type: "AI Fitness / Smart Home / Product Design",
    description:
      "集成深蹲架、龙门架、肋木架与 AI 健身镜，通过隐藏式结构与动作识别系统，让专业训练进入家庭空间。",
    image: "/images/project-fitness-master.webp",
    thumbnail: "/images/project-fitness-master-thumb.webp",
    detailImage: "/images/fitness-master-detail.webp",
    tags: ["Smart Home", "Fitness", "Product"],
  },
  {
    id: "inclusive-razor",
    title: "无障碍剃须刀设计",
    type: "Inclusive Design / Product Design",
    description:
      "面向手部障碍人群设计辅助握持剃须产品，提升日常清洁场景中的操作便利性与使用尊严。",
    image: "/images/project-razor.webp",
    tags: ["Inclusive", "Ergonomics", "Daily Care"],
  },
  {
    id: "teahood",
    title: "Teahood 醍醐品牌生态设计",
    type: "Brand System / Packaging",
    description:
      "围绕茶饮品牌构建包装、视觉与周边系统，形成从品牌识别到消费体验的完整生态表达。",
    image: "/images/project-teahood.webp",
    tags: ["Brand", "Packaging", "Visual"],
  },
  {
    id: "longquan",
    title: "龙泉青瓷展览视觉设计",
    type: "Exhibition Visual / Poster",
    description:
      "基于宋代美学与青瓷釉色构建展览主视觉，探索传统器物美学在当代视觉系统中的转译。",
    image: "/images/project-longquan.webp",
    tags: ["Exhibition", "Poster", "Culture"],
  },
];
