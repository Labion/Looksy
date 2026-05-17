import { analysisModeLabel, buildAnalyzeExhibitPrompt } from "@/lib/ai/prompt";
import type { AiProvider } from "@/lib/ai/provider";
import type { AnalyzeExhibitInput, AnalyzeExhibitResult } from "@/types";

function display(value: string | undefined, fallback = "未提供") {
  return value?.trim() || fallback;
}

function makeFollowUpQuestions(input: AnalyzeExhibitInput) {
  const noteTitle = display(input.exhibitNote.title, "这件展品");

  return [
    `${noteTitle} 的展签是否提供了更明确的作者、年代或材料信息？`,
    `它和展览「${input.exhibitionSession.title}」的空间动线或策展主题有什么关系？`,
    "如果从建筑、城市或展陈设计角度复盘，哪个细节最值得带走？"
  ];
}

export const mockAiProvider: AiProvider = {
  async analyzeExhibit(
    input: AnalyzeExhibitInput
  ): Promise<AnalyzeExhibitResult> {
    const note = input.exhibitNote;
    const session = input.exhibitionSession;
    const modeLabel = analysisModeLabel(input.analysisMode);
    const prompt = buildAnalyzeExhibitPrompt(input);
    const noteTitle = display(note.title, "未命名展品笔记");
    const material = display(note.mediumOrMaterial, "材料未确认");

    return {
      confirmedFacts: [
        `展览记录：${session.title}`,
        `展品 / 笔记标题：${noteTitle}`,
        `作者 / 创作者：${display(note.artist, "不确定")}`,
        `年代 / 时期：${display(note.yearOrPeriod, "不确定")}`,
        `材料 / 媒介：${material}`,
        note.wallLabelText
          ? "已有手动输入的展签文字，可作为当前最可靠的信息来源。"
          : "目前没有展签文字，作品身份信息需要继续核实。"
      ].join("\n"),
      visualObservations: [
        note.manualContext
          ? `基于你的现场观察：${note.manualContext}`
          : "目前没有图片或现场观察文本，因此不对具体视觉细节下确定判断。",
        `本次 mock 分析采用「${modeLabel}」模式，会优先整理现场可观察线索。`
      ].join("\n"),
      reasonableSpeculation: [
        "以下为低确定性推测：如果这条笔记对应的是展品或空间节点，它可能承担连接展览主题、材料表达或观看动线的作用。",
        "在没有图片、完整展签或策展前言前，不应把作者意图、历史背景或作品身份当作事实。"
      ].join("\n"),
      viewingFocus: [
        "现场优先补看三个方向：作品全景与尺度、材料和表面细节、它与相邻作品及展厅动线的关系。",
        note.wallLabelText
          ? "再对照展签确认作品名、作者、年代和材料，避免只凭视觉印象判断。"
          : "建议补拍展签或记录墙面文字，作为后续分析的确定信息来源。"
      ].join("\n"),
      aiAnalysis: [
        "【识别结果】",
        `- 当前只能确认你已记录的文本信息：${noteTitle}。`,
        "- 未提供图片或完整展签时，具体作品身份保持不确定。",
        "",
        "【现场观看重点】",
        "- 看它在展厅中的位置、观看距离、光线和周围作品关系。",
        "",
        "【视觉与形式分析】",
        `- 可先围绕材料 / 媒介线索展开：${material}。`,
        "",
        "【艺术 / 展览语境】",
        "- 需要结合展览前言、相邻作品和展签进一步核实。",
        "",
        "【建筑 / 城市 / 展陈 / 设计启发】",
        "- 可关注它是否通过材料、尺度或路径安排影响观众移动和停留。",
        "",
        "【一句话总结】",
        "- 这条笔记目前最适合作为现场观察入口，而不是最终事实结论。",
        "",
        "【可以继续追问】",
        makeFollowUpQuestions(input)
          .map((question, index) => `${index + 1}. ${question}`)
          .join("\n"),
        "",
        "Prompt 摘要：",
        prompt.slice(0, 420)
      ].join("\n"),
      designInspiration: [
        "从设计复盘角度，可以把这条笔记拆成：材料表达、观看距离、展厅节点、叙事动线四个线索。",
        "后续如果加入图片，可进一步判断光线、尺度、肌理和空间关系。"
      ].join("\n"),
      oneSentenceSummary:
        "先把确定信息和现场观察分开记录，再把推测留给后续展签、图片和策展文本交叉核实。",
      followUpQuestions: makeFollowUpQuestions(input),
      informationConfidence: note.wallLabelText ? "partial" : "uncertain"
    };
  }
};
