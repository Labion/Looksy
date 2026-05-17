# Codex Prompt 02: Data Model

请继续阅读 `AGENTS.md` 和 `docs/DATA_MODEL.md`。

目标：为「看展搭子」添加本地数据模型和基础 CRUD。

请完成以下任务：

1. 选择 SQLite + Prisma 或 SQLite + Drizzle。
2. 建立以下模型：
   - ExhibitionSession
   - ExhibitNote
   - ExhibitImage
3. 添加类型定义，与 `docs/DATA_MODEL.md` 保持一致。
4. 添加基础数据访问函数：
   - createExhibitionSession
   - listExhibitionSessions
   - getExhibitionSession
   - updateExhibitionSession
   - createExhibitNote
   - listExhibitNotesBySession
   - getExhibitNote
   - updateExhibitNote
5. 添加少量 seed/sample data。
6. 创建页面或临时 UI，让用户可以：
   - 新建看展记录
   - 查看看展记录详情
   - 添加一条展品笔记，不需要图片上传

暂时不要实现 AI 调用。

验收标准：

- 本地数据库可以初始化。
- 用户可以创建一个 exhibition session。
- 用户可以在 session 下创建 exhibit note。
- README 说明数据库初始化方式。
