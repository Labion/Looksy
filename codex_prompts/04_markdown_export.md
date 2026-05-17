# Codex Prompt 04: Markdown Export

请继续阅读 `docs/DATA_MODEL.md` 和 `docs/MVP_TASKS.md`。

目标：为一次看展记录添加 Markdown 导出。

请完成以下任务：

1. 创建 `exportSessionToMarkdown` helper。
2. Markdown 内容包括：
   - 展览基本信息
   - 展览整体印象
   - 策展与空间观察
   - 所有展品笔记，按 sequenceNumber 排序
   - 每条笔记的 AI 分析
   - 我的个人备注
   - 建筑 / 城市 / 展陈 / 设计启发
3. 在 session detail 页面添加“导出 Markdown”按钮。
4. 支持下载 `.md` 文件。
5. 添加测试或至少添加可验证的 sample output。

验收标准：

- 用户可以下载 Markdown。
- 文件结构适合 Obsidian。
- 中文标题清晰。
