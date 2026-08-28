import {
  CalendarRange,
  CheckCircle2,
  Database,
  Filter,
  ShieldAlert,
} from 'lucide-react';

import { trustSummary, type AnswerVersion } from '../data/scenario';

interface TrustSummaryProps {
  version: AnswerVersion;
}

export function TrustSummary({ version }: TrustSummaryProps) {
  const summary = trustSummary[version];
  const isRevised = version === 'revised';

  return (
    <section className="overflow-hidden rounded-2xl bg-trust-surface shadow-card" aria-labelledby="trust-summary-heading">
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center gap-3">
          <div className={`grid size-9 place-items-center rounded-xl ${isRevised ? 'bg-success-soft text-success' : 'bg-warning-soft text-warning'}`}>
            {isRevised ? <CheckCircle2 className="size-5" aria-hidden="true" /> : <ShieldAlert className="size-5" aria-hidden="true" />}
          </div>
          <div>
            <h2 id="trust-summary-heading" className="text-sm font-semibold tracking-[-0.012em]">本次回答可核验</h2>
            <p className={`mt-0.5 text-xs font-medium ${isRevised ? 'text-success' : 'text-warning-strong'}`}>{summary.status}</p>
          </div>
        </div>
        <span className="w-fit rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-muted shadow-chip">
          演示数据
        </span>
      </div>

      <dl className="grid border-t border-line/80 bg-panel sm:grid-cols-3">
        <div className="summary-cell">
          <Database className="size-4 text-primary-700" aria-hidden="true" />
          <div>
            <dt>数据来源</dt>
            <dd>{summary.source}</dd>
            <p>{summary.updatedAt} 更新</p>
          </div>
        </div>
        <div className="summary-cell">
          <CalendarRange className="size-4 text-primary-700" aria-hidden="true" />
          <div>
            <dt>分析范围</dt>
            <dd>{summary.range}</dd>
            <p>自然月环比</p>
          </div>
        </div>
        <div className="summary-cell">
          <Filter className="size-4 text-primary-700" aria-hidden="true" />
          <div>
            <dt>关键筛选</dt>
            <dd>{summary.filter}</dd>
            <p className={isRevised ? 'text-success!' : 'text-warning-strong!'}>{summary.warning}</p>
          </div>
        </div>
      </dl>
    </section>
  );
}
