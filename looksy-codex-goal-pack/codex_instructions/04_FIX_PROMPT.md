# Codex Fix Prompt

Use this prompt if local testing fails.

```text
当前任务：修复 Looksy MVP 的本地运行或验收问题。

不要新增功能。
不要接真实 AI。
不要做登录、云同步、图片上传、硬件、AR、支付、商业后台。

请根据下面的错误信息修复问题，并保持 docs/GOAL_MVP.md 中的 MVP 范围不变。

请重点检查：
1. npm install 是否正常；
2. Prisma + SQLite 配置是否正确；
3. npx prisma migrate dev 是否成功；
4. npm run build 是否成功；
5. Next.js 路由是否正确；
6. /、/exhibitions、/exhibitions/new、/exhibitions/[id]、/items/new、/items/[id] 是否能访问；
7. 创建看展记录是否能保存；
8. 创建展品笔记是否能关联到看展记录；
9. mock AI 分析是否能生成并保存；
10. Markdown 导出是否能复制和下载。

下面是我的报错信息：

[在这里粘贴 PowerShell / Git Bash / 浏览器错误]

完成后请说明：
- 问题原因；
- 修改了哪些文件；
- 如何重新运行；
- 如何重新验证。
```
