# Codex Prompt 03: AI Analysis

请继续阅读 `AGENTS.md`、`docs/PROMPT_SYSTEM.md` 和 `docs/ARCHITECTURE.md`。

目标：添加第一版 AI 分析能力。

请完成以下任务：

1. 创建 AI provider interface。
2. 创建 mock provider，返回确定性的中文结构化分析。
3. 创建 prompt builder，基于：
   - 展览信息
   - 展品笔记信息
   - 展签文本
   - 手动补充上下文
   - analysis mode
4. 添加一个 API route 或 server action，用于生成分析。
5. 在展品笔记页面添加“生成分析”按钮。
6. 将 AI 分析结果保存到 note。
7. 支持先用 mock provider，不依赖真实 API key。

可选：
如果实现真实模型提供商，请仅添加一个 provider，且通过 `.env` 配置 API key。

验收标准：

- 没有 API key 时，mock provider 可用。
- 点击生成分析后，页面显示结构化结果。
- 结果可以保存到 note。
- Prompt 明确要求不确定时不能编造。
