import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const session = await prisma.exhibitionSession.upsert({
    where: { id: "sample-session-looksy-001" },
    update: {},
    create: {
      id: "sample-session-looksy-001",
      title: "样例展览记录",
      venue: "Looksy Sample Gallery",
      city: "Shanghai",
      visitDate: new Date("2026-05-14T00:00:00.000Z"),
      exhibitionType: "艺术 / 设计",
      keywords: JSON.stringify(["空间叙事", "材料表达", "展陈设计"]),
      overallImpression: "一个用于本地开发的样例看展记录。",
      curatorialNotes: "样例策展线索：从展品、展签和展厅关系中建立个人笔记。",
      spatialNotes: "样例空间观察：入口、动线和灯光共同影响观看节奏。"
    }
  });

  await prisma.exhibitNote.upsert({
    where: { id: "sample-note-looksy-001" },
    update: {},
    create: {
      id: "sample-note-looksy-001",
      exhibitionSessionId: session.id,
      sequenceNumber: 1,
      title: "入口处装置",
      artist: "未知",
      mediumOrMaterial: "混合材料",
      manualContext: "这是 seed 生成的样例笔记，不包含图片上传。",
      visualObservations: "装置位于入口附近，可能承担导入展览主题的作用。",
      personalRemarks: "适合后续测试 Markdown 导出和 AI 分析字段。",
      followUpQuestions: JSON.stringify(["入口装置和展览主线是什么关系？"]),
      informationConfidence: "partial"
    }
  });

  await prisma.exhibitNote.upsert({
    where: { id: "sample-note-looksy-002" },
    update: {},
    create: {
      id: "sample-note-looksy-002",
      exhibitionSessionId: session.id,
      sequenceNumber: 2,
      title: "展签信息片段",
      wallLabelText: "这里可以记录展签文字，后续再交给 AI 分析。",
      confirmedFacts: "样例笔记：展签文字来自手动输入。",
      informationConfidence: "confirmed"
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
