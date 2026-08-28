# Dora Amend

Dora Amend 是面向业务用户的 Data Agent 可信回答体验原型，参赛方向为 2026 帆软 AI 产品体验设计挑战赛 Dora 命题 3。

项目目标不是展示更多执行日志，而是让用户快速理解结论依据、按需追溯、低成本纠正，并比较修正前后的影响。

## 本地开发

环境要求：Node.js 20.19+，pnpm 10+。

```bash
pnpm install
pnpm dev
```

构建与类型检查：

```bash
pnpm typecheck
pnpm build
```

## 文档

- [`docs/product-brief.md`](docs/product-brief.md)：产品立项简报
- [`docs/project-plan.md`](docs/project-plan.md)：快节奏参赛规划
- [`research/dora-current-state.md`](research/dora-current-state.md)：Dora 现状研究
- [`research/dora-answer-audit.md`](research/dora-answer-audit.md)：真实样例回答审计
- [`research/benchmark-patterns.md`](research/benchmark-patterns.md)：竞品模式初稿
- [`research/interview-guide.md`](research/interview-guide.md)：探索访谈提纲

## 当前范围

- 一个经营分析黄金路径
- 可信摘要与数据就绪状态
- 结论级证据追溯
- 就地纠错与影响预览
- 局部重跑和版本对比

真实数据库、Text-to-SQL、RAG 和生产级 Agent 编排不在参赛原型范围内。
