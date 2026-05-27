# Looksy MVP Manual Test Checklist

After Codex finishes the Goal, test locally.

## 1. Install

```bash
npm install
```

Expected:

- dependencies install successfully
- no fatal dependency errors

## 2. Initialize database

```bash
npx prisma migrate dev
```

Expected:

- SQLite database is created
- Prisma migration succeeds

## 3. Build

```bash
npm run build
```

Expected:

- build succeeds
- no TypeScript blocking errors

## 4. Run dev server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 5. Route check

Visit:

- `/`
- `/exhibitions`
- `/exhibitions/new`
- `/exhibitions/[id]`
- `/items/new`
- `/items/[id]`

Expected:

- no 404
- no red screen
- mobile layout usable

## 6. Create exhibition session

Create a session with:

- title: 测试展览
- venue: 测试美术馆
- city: 东京
- date: today's date
- type: 艺术展
- keywords: 材料, 空间, 展陈

Expected:

- session appears in `/exhibitions`
- session detail page opens

## 7. Create exhibit item

Under the session, create one item:

- title: 测试作品
- artist: 测试作者
- year: 2026
- medium: mixed media
- labelText: 这是一段测试展签文字
- personalNote: 我觉得材料和空间关系有意思
- designInsight: 可以作为展陈材料参考
- certainty: 部分确定

Expected:

- item appears under the session
- item detail page opens

## 8. Data persistence

Refresh the browser.

Expected:

- session is still present
- item is still present
- item still belongs to the correct session

## 9. Mock AI analysis

On the item detail page, trigger mock AI analysis.

Expected:

- structured Chinese analysis is generated
- output includes:
  - 【识别结果】
  - 【现场观看重点】
  - 【视觉与形式分析】
  - 【艺术 / 展览语境】
  - 【建筑 / 城市 / 展陈 / 设计启发】
  - 【一句话总结】
  - 【可以继续追问】
- analysis is saved after refresh

## 10. Markdown export

Test single item export.

Expected:

- Markdown preview works
- copy to clipboard works
- `.md` download works

Test full session export.

Expected:

- full exhibition Markdown includes basic info and exhibit item notes
- copy to clipboard works
- `.md` download works
