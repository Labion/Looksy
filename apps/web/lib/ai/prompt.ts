import type { AnalysisMode, AnalyzeExhibitInput } from "@/types";

const modeLabels: Record<AnalysisMode, string> = {
  default: "默认看展分析",
  wall_label: "展签解读",
  exhibition_space: "展陈空间分析",
  architecture_design: "建筑 / 城市 / 材料启发",
  quick_note: "快速笔记",
  deep_review: "深度复盘"
};

function optionalLine(label: string, value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value.length > 0 ? `- ${label}: ${value.join(" / ")}` : null;
  }

  return value ? `- ${label}: ${value}` : null;
}

export function analysisModeLabel(mode: AnalysisMode) {
  return modeLabels[mode];
}

export function parseAnalysisMode(value: string | undefined): AnalysisMode {
  const modes = Object.keys(modeLabels) as AnalysisMode[];
  return modes.includes(value as AnalysisMode) ? (value as AnalysisMode) : "default";
}

export function buildAnalyzeExhibitPrompt(input: AnalyzeExhibitInput) {
  const { exhibitionSession, exhibitNote, analysisMode } = input;
  const lines = [
    "你是我的私人看展助手，名字叫「Looksy」，中文概念名是「看展搭子」。",
    "请基于我提供的展览信息和展品笔记生成结构化中文分析。",
    "",
    "关键原则：",
    "- 不能编造作品、作者、年代、材料、展览名称等事实。",
    "- 必须区分确定信息、基于文本/图像描述的观察、合理推测、需要核实的信息。",
    "- 如果信息不足，请明确写“不确定”，并说明需要补充什么。",
    "- 重点关注现场观看重点、形式与材料、空间关系、展陈方式，以及建筑 / 城市 / 展陈 / 设计启发。",
    "",
    "输出结构：",
    "【识别结果】",
    "【现场观看重点】",
    "【视觉与形式分析】",
    "【艺术 / 展览语境】",
    "【建筑 / 城市 / 展陈 / 设计启发】",
    "【一句话总结】",
    "【可以继续追问】",
    "",
    `分析模式：${modeLabels[analysisMode]}`,
    "",
    "展览信息：",
    optionalLine("标题", exhibitionSession.title),
    optionalLine("场馆", exhibitionSession.venue),
    optionalLine("城市", exhibitionSession.city),
    optionalLine("类型", exhibitionSession.exhibitionType),
    optionalLine("关键词", exhibitionSession.keywords),
    optionalLine("整体印象", exhibitionSession.overallImpression),
    optionalLine("策展备注", exhibitionSession.curatorialNotes),
    optionalLine("空间 / 展陈观察", exhibitionSession.spatialNotes),
    "",
    "展品笔记：",
    optionalLine("标题", exhibitNote.title),
    optionalLine("作者 / 创作者", exhibitNote.artist),
    optionalLine("年代 / 时期", exhibitNote.yearOrPeriod),
    optionalLine("材料 / 媒介", exhibitNote.mediumOrMaterial),
    optionalLine("展签文字", exhibitNote.wallLabelText),
    optionalLine("手动补充上下文", exhibitNote.manualContext),
    optionalLine("个人备注", exhibitNote.personalRemarks)
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}
