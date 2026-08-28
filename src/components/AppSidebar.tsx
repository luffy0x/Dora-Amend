import {
  BookOpenText,
  Boxes,
  ChevronDown,
  CircleHelp,
  FileChartColumn,
  MessageSquareText,
  Plus,
  Search,
  Settings,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { label: '新建分析', icon: Plus },
  { label: '搜索会话', icon: Search },
  { label: '分析专家', icon: Sparkles },
  { label: '数据资源', icon: Boxes },
] as const;

export function AppSidebar() {
  return (
    <aside className="hidden min-h-screen flex-col bg-sidebar px-4 py-5 text-sidebar-ink xl:sticky xl:top-0 xl:flex xl:h-screen xl:self-start">
      <div className="flex items-center gap-3 px-2">
        <div className="grid size-9 place-items-center rounded-xl bg-primary-600 text-xs font-bold text-white shadow-brand">
          D
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-[-0.012em]">Dora Amend</p>
          <p className="truncate text-[11px] text-sidebar-muted">可信回答原型</p>
        </div>
      </div>

      <nav aria-label="主导航" className="mt-7 space-y-1">
        {navItems.map(({ label, icon: Icon }, index) => (
          <button
            key={label}
            className={`flex min-h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium transition-[background-color,color,transform] duration-150 active:scale-[0.98] ${
              index === 0
                ? 'bg-sidebar-active text-sidebar-ink shadow-sidebar-item'
                : 'text-sidebar-muted [@media(hover:hover)]:hover:bg-sidebar-hover [@media(hover:hover)]:hover:text-sidebar-ink'
            }`}
            type="button"
          >
            <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>

      <section className="mt-8" aria-labelledby="recent-heading">
        <div className="flex items-center justify-between px-3">
          <h2 id="recent-heading" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sidebar-faint">
            最近分析
          </h2>
          <button
            className="grid size-10 place-items-center rounded-xl text-sidebar-muted transition-[background-color,color,transform] duration-150 active:scale-95 [@media(hover:hover)]:hover:bg-sidebar-hover [@media(hover:hover)]:hover:text-sidebar-ink"
            type="button"
            aria-label="展开最近分析"
          >
            <ChevronDown className="size-4" aria-hidden="true" />
          </button>
        </div>
        <button
          className="mt-1 w-full rounded-xl bg-sidebar-active px-3 py-3 text-left shadow-sidebar-item transition-transform duration-150 active:scale-[0.98]"
          type="button"
          aria-current="page"
        >
          <span className="flex items-start gap-2.5">
            <MessageSquareText className="mt-0.5 size-4 shrink-0 text-primary-700" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block text-sm font-medium leading-5">华东区 7 月利润归因</span>
              <span className="mt-1 block text-[11px] text-sidebar-muted">刚刚 · 演示会话</span>
            </span>
          </span>
        </button>
      </section>

      <div className="mt-auto space-y-1 pt-8">
        <button className="sidebar-secondary-action" type="button">
          <BookOpenText className="size-4" aria-hidden="true" />
          使用说明
        </button>
        <button className="sidebar-secondary-action" type="button">
          <CircleHelp className="size-4" aria-hidden="true" />
          反馈问题
        </button>
        <button className="sidebar-secondary-action" type="button">
          <Settings className="size-4" aria-hidden="true" />
          设置
        </button>
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-sidebar-active px-3 py-3 shadow-sidebar-item">
          <div className="grid size-8 place-items-center rounded-full bg-ink text-xs font-semibold text-white">W</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold">王志豪</p>
            <p className="truncate text-[10px] text-sidebar-muted">原型演示账号</p>
          </div>
          <FileChartColumn className="size-4 text-sidebar-faint" aria-hidden="true" />
        </div>
      </div>
    </aside>
  );
}
