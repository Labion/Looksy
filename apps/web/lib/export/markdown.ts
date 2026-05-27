import type { ExhibitImage, ExhibitNote, ExhibitionSession } from "@/types";

type ExportSessionToMarkdownInput = {
  session: ExhibitionSession;
  notes: ExhibitNote[];
  imagesByNoteId?: Record<string, ExhibitImage[]>;
};

type ExportNoteToMarkdownInput = {
  session: ExhibitionSession;
  note: ExhibitNote;
  images?: ExhibitImage[];
};

function text(value: string | undefined, fallback = "") {
  return value?.trim() || fallback;
}

function listValue(values: string[]) {
  return values.length > 0 ? values.join("、") : "";
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function section(title: string, content: string | undefined, level = 2) {
  const value = text(content);
  return value ? `${"#".repeat(level)} ${title}\n\n${value}\n` : "";
}

function imageSection(images: ExhibitImage[] | undefined) {
  if (!images || images.length === 0) {
    return "";
  }

  return [
    "#### 图片",
    "",
    images
      .map((image) => {
        const alt = text(image.originalFilename, image.imageRole);
        return `![${alt}](${image.filePath})`;
      })
      .join("\n")
  ].join("\n");
}

function noteSection(note: ExhibitNote, images: ExhibitImage[] | undefined) {
  const title = text(note.title, "未命名展品笔记");
  const lines = [
    `### ${note.sequenceNumber}. ${title}`,
    "",
    text(note.artist) ? `- 作者 / 创作者：${note.artist}` : "",
    text(note.yearOrPeriod) ? `- 年代 / 时期：${note.yearOrPeriod}` : "",
    text(note.mediumOrMaterial) ? `- 材料 / 媒介：${note.mediumOrMaterial}` : "",
    `- 信息确定程度：${note.informationConfidence}`,
    "",
    section("展签文字", note.wallLabelText, 4),
    imageSection(images),
    section("现场观察", note.manualContext, 4),
    section("确定信息", note.confirmedFacts, 4),
    section("基于记录的观察", note.visualObservations, 4),
    section("合理推测", note.reasonableSpeculation, 4),
    section("现场观看重点", note.viewingFocus, 4),
    section("AI 分析", note.aiAnalysis, 4),
    section("建筑 / 城市 / 展陈 / 设计启发", note.designInspiration, 4),
    section("一句话总结", note.oneSentenceSummary, 4),
    section("我的个人备注", note.personalRemarks, 4),
    note.followUpQuestions.length > 0
      ? `#### 可以继续追问\n\n${note.followUpQuestions
          .map((question) => `- ${question}`)
          .join("\n")}\n`
      : ""
  ];

  return lines.filter(Boolean).join("\n").trim();
}

export function exportNoteToMarkdown({
  session,
  note,
  images = []
}: ExportNoteToMarkdownInput) {
  const title = text(note.title, "未命名展品笔记");
  const content = [
    `# 展品笔记：${title}`,
    "",
    "## 基本信息",
    "",
    `- 所属展览：${session.title}`,
    `- 展馆：${text(session.venue, "未记录")}`,
    `- 城市：${text(session.city, "未记录")}`,
    `- 作者：${text(note.artist, "未记录")}`,
    `- 年代：${text(note.yearOrPeriod, "未记录")}`,
    `- 材料：${text(note.mediumOrMaterial, "未记录")}`,
    `- 信息确定程度：${note.informationConfidence}`,
    "",
    section("展签 / 现场信息", note.wallLabelText),
    imageSection(images).replace("#### 图片", "## 图片"),
    section("现场观看重点", note.viewingFocus),
    section("AI 赏析", note.aiAnalysis),
    section("建筑 / 城市 / 展陈 / 设计启发", note.designInspiration),
    section("我的个人备注", note.personalRemarks),
    note.followUpQuestions.length > 0
      ? `## 后续可追问问题\n\n${note.followUpQuestions
          .map((question) => `- ${question}`)
          .join("\n")}\n`
      : ""
  ]
    .filter(Boolean)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return `${content}\n`;
}

export function exportSessionToMarkdown({
  session,
  notes,
  imagesByNoteId = {}
}: ExportSessionToMarkdownInput) {
  const sortedNotes = [...notes].sort(
    (a, b) => a.sequenceNumber - b.sequenceNumber
  );
  const designInspirations = sortedNotes
    .map((note) => text(note.designInspiration))
    .filter(Boolean);
  const followUpQuestions = sortedNotes.flatMap((note) => note.followUpQuestions);
  const metadata = [
    `# ${session.title}`,
    "",
    `- 场馆：${text(session.venue, "未记录")}`,
    `- 城市：${text(session.city, "未记录")}`,
    `- 日期：${formatDate(session.visitDate) || "未记录"}`,
    `- 类型：${text(session.exhibitionType, "未记录")}`,
    `- 关键词：${listValue(session.keywords) || "未记录"}`,
    ""
  ].join("\n");

  const body = [
    metadata,
    section("展览整体印象", session.overallImpression),
    section("策展备注", session.curatorialNotes),
    section("空间 / 展陈观察", session.spatialNotes),
    "## 展品笔记",
    "",
    sortedNotes.length > 0
      ? sortedNotes
          .map((note) => noteSection(note, imagesByNoteId[note.id]))
          .join("\n\n---\n\n")
      : "暂无展品笔记。",
    "",
    designInspirations.length > 0
      ? `## 设计启发汇总\n\n${designInspirations
          .map((item) => `- ${item}`)
          .join("\n")}\n`
      : "",
    followUpQuestions.length > 0
      ? `## 后续研究问题\n\n${followUpQuestions
          .map((question) => `- ${question}`)
          .join("\n")}\n`
      : ""
  ]
    .filter(Boolean)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return `${body}\n`;
}

export function markdownFilename(title: string) {
  const safeTitle = title
    .trim()
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, "-")
    .slice(0, 80);

  return `${safeTitle || "looksy-session"}.md`;
}

export function noteMarkdownFilename(title: string | undefined) {
  const safeTitle = (title ?? "looksy-note")
    .trim()
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, "-")
    .slice(0, 80);

  return `${safeTitle || "looksy-note"}.md`;
}
