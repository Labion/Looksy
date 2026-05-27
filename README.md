# Looksy（看展搭子）

Looksy 是一个个人 AI 看展笔记 Web App，用来在美术馆、博物馆、建筑展、设计展、城市更新展和公共空间观察中记录展品、展签、现场观察、AI 分析和个人灵感。

它是个人本地优先工具，不是商业 SaaS、博物馆 CMS 或硬件项目。

## 开发路线 Roadmap

详细路线图见 [docs/ROADMAP.md](docs/ROADMAP.md)。

- 阶段 0：项目命名与文档框架 - 已完成
- 阶段 1：页面框架搭建 - 已完成
- 阶段 2：数据模型与本地存储 - 已完成基础版
- 阶段 3：笔记采集与图片上传 - 已完成基础版
- 阶段 4：AI 分析接口 - 已完成 mock，OpenAI 可选
- 阶段 5：Markdown / Obsidian 导出 - 已完成基础版
- 阶段 6：手机端现场体验优化 - 进行中 / 下一步重点
- 阶段 7：语音、同步、图片管理等增强功能 - 待办

## 部署与环境要求

当前项目已在 Windows 环境验证：

- Node.js：建议 `>= 24`，已验证 `v24.15.0`
- npm：建议 `>= 11`，已验证 `11.12.1`
- Shell：Windows PowerShell
- 数据库：SQLite，本地文件存储，无需云服务
- 浏览器：任意现代桌面或手机浏览器

Windows PowerShell 中建议使用 `npm.cmd`，避免执行策略拦截 `npm.ps1`。

## 本地部署与启动

从仓库根目录执行：

```powershell
cd apps/web
npm.cmd install --no-audit --no-fund
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm.cmd run db:generate
npm.cmd run db:migrate
npm.cmd run db:seed
npm.cmd run dev
```

启动后打开：

```text
http://localhost:3000
```

如果想在局域网手机上测试，需要让开发服务器监听局域网地址，并确认防火墙允许访问。

## 环境变量

Web App 的环境变量文件位于：

```text
apps/web/.env
```

基础配置：

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_NAME="Looksy"
AI_PROVIDER=mock
```

默认 `AI_PROVIDER=mock`，会使用本地 deterministic mock 分析，不会调用 OpenAI，也不会产生 API 成本。

如需使用 OpenAI：

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.5
```

图片和文本只会在你点击 `生成分析` 时发送给 OpenAI。缺少 API key 时，页面会显示错误，并且不会覆盖已有分析内容。

## 使用流程

1. 打开首页。
2. 点击或填写 `新建看展记录`。
3. 输入展览标题、场馆、城市、日期、类型和关键词。
4. 进入看展记录详情页。
5. 添加展品笔记：
   - 标题
   - 展签文字
   - 现场观察
   - 个人备注
6. 在笔记下上传展品照片、展签照片、展厅场景或细节图。
7. 选择分析模式并点击 `生成分析`。
8. 查看结构化中文分析。
9. 点击 `导出 Markdown`，预览、复制或下载整场看展记录。
10. 在单条展品笔记详情页点击 `导出单条 Markdown`，导出单条笔记。

## AI 分析模式

当前支持：

- 默认看展分析
- 展签解读
- 展陈空间分析
- 建筑 / 城市 / 材料启发
- 快速笔记
- 深度复盘

AI 输出会尽量区分：

- 确定信息
- 基于记录的观察
- 合理推测
- 需要继续核实的信息

## Markdown / Obsidian 导出

在任意看展记录详情页点击：

```text
导出 Markdown
```

导出页会显示 Markdown 预览，并提供：

- 复制到剪贴板
- 下载 `.md` 文件

整场导出内容包括：

- 展览基本信息
- 展览整体印象
- 策展备注
- 空间 / 展陈观察
- 展品笔记
- 图片链接
- AI 分析
- 个人备注
- 建筑 / 城市 / 展陈 / 设计启发
- 后续追问

单条展品笔记也可以通过 `/items/[id]/export` 单独导出，内容包括基本信息、展签 / 现场信息、图片链接、现场观看重点、AI 赏析、设计启发、个人备注和后续问题。

## 数据与文件位置

主要数据位置：

- SQLite 数据库：`apps/web/prisma/dev.db`
- Prisma schema：`apps/web/prisma/schema.prisma`
- Prisma migrations：`apps/web/prisma/migrations/`
- 上传图片：`apps/web/public/uploads/exhibit-images/`
- 看展记录主路由：`/sessions/[id]`
- 目标包兼容路由：`/exhibitions`、`/exhibitions/new`、`/exhibitions/[id]`
- 展品笔记路由：`/items/new`、`/items/[id]`
- Markdown 预览路由：`/sessions/[id]/export`、`/items/[id]/export`
- Markdown 下载路由：`/sessions/[id]/export/download`、`/items/[id]/export/download`

`dev.db` 和上传图片属于本地开发数据，不建议作为长期源码资产提交。

## 验证与 Smoke Test

稳定性检查：

```powershell
cd apps/web
npm.cmd run verify
```

`verify` 会按顺序执行：

```text
db:generate
db:migrate
db:seed
build
typecheck
```

手动 Smoke Test：

1. 打开 `http://localhost:3000`。
2. 创建一个看展记录。
3. 添加一条展品笔记。
4. 上传一张图片。
5. 点击 `生成分析`。
6. 打开单条展品笔记详情页。
7. 点击 `导出单条 Markdown`，确认可以预览、复制和下载。
8. 回到看展记录详情页，点击 `导出 Markdown`。
9. 确认导出的 Markdown 包含展览信息、笔记内容、图片链接、AI 分析、设计启发和后续追问。

## 常见问题

### npm 被 PowerShell 拦截

使用：

```powershell
npm.cmd run dev
```

而不是：

```powershell
npm run dev
```

### npm registry 或代理失败

如果使用本地代理，例如 `127.0.0.1:20080`：

```powershell
npm.cmd config set proxy http://127.0.0.1:20080
npm.cmd config set https-proxy http://127.0.0.1:20080
npm.cmd config set registry https://registry.npmjs.org/
```

如果 npmjs 访问不稳定，可以改用镜像：

```powershell
npm.cmd config set registry https://registry.npmmirror.com
```

### 数据库需要重建

本地开发环境可以删除 `apps/web/prisma/dev.db` 后重新执行：

```powershell
cd apps/web
npm.cmd run db:migrate
npm.cmd run db:seed
```

删除数据库会丢失本地测试数据。

### OpenAI 分析报错

确认 `.env` 中有：

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
```

如果只是本地测试，请改回：

```env
AI_PROVIDER=mock
```

## 项目结构

```text
.
├── README.md              用户部署与使用说明
├── CODEX_NOTES.md         Codex / 开发协作说明
├── HANDOFF.md             当前交接状态
├── AGENTS.md              Codex 工作规则
├── docs/                  产品、架构、数据模型和路线文档
├── codex_prompts/         分阶段 Codex 提示词
└── apps/
    └── web/               Next.js Web App
```

Web App 关键目录：

```text
apps/web/app/              页面和 server actions
apps/web/lib/db/           Prisma 数据访问
apps/web/lib/ai/           AI provider 与 prompt
apps/web/lib/export/       Markdown 导出
apps/web/lib/uploads/      本地图片上传
apps/web/prisma/           SQLite schema、migration、seed
apps/web/types/            TypeScript 类型
```
