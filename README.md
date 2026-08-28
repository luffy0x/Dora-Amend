# Dora Amend

Dora Amend 是面向业务用户的 Data Agent 可信回答体验原型，参赛方向为 2026 帆软 AI 产品体验设计挑战赛 Dora 命题 3。

项目目标不是展示更多执行日志，而是让用户快速理解结论依据、按需追溯、低成本纠正，并比较修正前后的影响。

## 本地开发

环境要求：Node.js 20.19+，pnpm 10+。

```bash
pnpm install
pnpm dev
```

正式可用性测试使用 `http://localhost:5173/?study=1`，该模式会隐藏演示路线，避免教学提示影响测试结果。

构建与类型检查：

```bash
pnpm typecheck
pnpm build
```

## 部署与分享

仓库已配置 GitHub Pages 自动部署。首次在仓库设置中选择 `Pages → GitHub Actions` 并推送 `main` 后，可通过 <https://luffy0x.github.io/Dora-Amend/> 访问。

详细步骤与发布检查见 [`docs/deployment.md`](docs/deployment.md)。

## 原型演示路径

页面顶部的“演示路线”会根据当前状态自动推进，首次体验可以按以下顺序操作：

1. 在回答中查看数据来源、更新时间、分析范围与口径提醒。
2. 点击任意结论，在证据面板查看与该结论直接相关的事实、计算和推断。
3. 点击“核验并纠正”，确认“排除开业不足 90 天门店”的结构化修改。
4. 查看影响预览并执行局部重跑。
5. 对比 v1 与 v2 的利润降幅、原因排序和行动建议，并切换查看两版结论及证据。
6. 通过页头“演示场景”切换数据过期、来源不可用、权限不足和修正歧义状态。

当前交互使用固定 Mock 数据，不连接真实数据库或模型服务。

## 文档

- [`docs/product-brief.md`](docs/product-brief.md)：产品立项简报
- [`docs/project-plan.md`](docs/project-plan.md)：快节奏参赛规划
- [`docs/submission-draft.md`](docs/submission-draft.md)：800 字以内参赛设计说明草稿
- [`docs/demo-script.md`](docs/demo-script.md)：2 至 3 分钟演示视频脚本
- [`docs/pitch-script.md`](docs/pitch-script.md)：5 分钟现场路演稿与答辩问题
- [`docs/submission-checklist.md`](docs/submission-checklist.md)：最终提交检查单
- [`docs/deployment.md`](docs/deployment.md)：GitHub Pages 部署与发布检查
- [`research/dora-current-state.md`](research/dora-current-state.md)：Dora 现状研究
- [`research/dora-answer-audit.md`](research/dora-answer-audit.md)：真实样例回答审计
- [`research/benchmark-patterns.md`](research/benchmark-patterns.md)：竞品模式初稿
- [`research/interview-guide.md`](research/interview-guide.md)：探索访谈提纲
- [`research/usability-test-kit.md`](research/usability-test-kit.md)：可直接执行的可用性测试脚本
- [`research/usability-session-template.md`](research/usability-session-template.md)：单场观察记录模板

## 当前范围

- 一个经营分析黄金路径
- 可信摘要与数据就绪状态
- 结论级证据追溯
- 按需展开的查询编号、字段、执行结果与 Mock SQL
- 就地纠错与影响预览
- 局部重跑和版本对比
- 数据过期、来源不可用、权限不足与修正歧义状态

真实数据库、Text-to-SQL、RAG 和生产级 Agent 编排不在参赛原型范围内。
