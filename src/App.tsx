import {
  ArrowRight,
  GitCompareArrows,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

const principles = [
  {
    title: '看得懂',
    description: '清楚区分数据事实、Agent 推断与行动建议。',
    icon: ShieldCheck,
  },
  {
    title: '能追溯',
    description: '从具体结论按需查看来源、时间、范围与口径。',
    icon: GitCompareArrows,
  },
  {
    title: '可纠正',
    description: '就地修正分析条件，并确认影响后局部重跑。',
    icon: RefreshCw,
  },
] as const;

function App() {
  return (
    <main className="min-h-screen bg-canvas px-6 py-8 text-ink md:px-10 md:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col rounded-[2rem] border border-line bg-panel p-7 shadow-panel md:p-12">
        <header className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-primary-600 text-sm font-semibold text-white">
              DA
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide">Dora Amend</p>
              <p className="text-xs text-muted">可信回答体验原型</p>
            </div>
          </div>
          <span className="rounded-full border border-line bg-soft px-3 py-1.5 text-xs font-medium text-muted">
            Foundation ready
          </span>
        </header>

        <section className="flex flex-1 flex-col justify-center py-16 md:py-24">
          <p className="mb-5 text-sm font-semibold text-primary-700">
            2026 帆软 AI 产品体验设计挑战赛 · Dora 命题 3
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.035em] md:text-6xl">
            让 Agent 的每条结论，
            <span className="text-primary-700">都能被核验、修订与对比。</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-muted md:text-lg">
            Dora Amend 将分散的来源、口径和执行信息重组为面向业务用户的可信回答层，帮助用户形成校准后的信任。
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {principles.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-3xl border border-line bg-soft p-5 transition-colors hover:border-primary-200 hover:bg-white"
              >
                <Icon className="size-5 text-primary-700" aria-hidden="true" />
                <h2 className="mt-8 text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>当前阶段：产品研究与原型范围确认</p>
          <a
            className="inline-flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-800"
            href="https://github.com/luffy0x/Dora-Amend"
          >
            查看项目仓库
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </footer>
      </div>
    </main>
  );
}

export default App;
