import { ArrowRight, CheckCircle2, GitCompareArrows } from 'lucide-react';

import { comparisonRows } from '../data/scenario';

interface VersionComparisonProps {
  onViewEvidence: () => void;
}

export function VersionComparison({ onViewEvidence }: VersionComparisonProps) {
  return (
    <section className="overflow-hidden rounded-2xl bg-comparison-surface shadow-comparison" aria-labelledby="comparison-heading" aria-live="polite">
      <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-success text-white shadow-success">
            <CheckCircle2 className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-success">局部重跑完成</p>
            <h2 id="comparison-heading" className="mt-1 text-lg font-semibold tracking-[-0.012em]">修订版已生成，原回答仍可追溯</h2>
          </div>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-chip">
          <GitCompareArrows className="size-3.5 text-success" aria-hidden="true" />
          v1 → v2
        </span>
      </div>

      <div className="border-t border-success-line bg-panel px-4 py-2 sm:px-5">
        {comparisonRows.map((row) => (
          <div key={row.label} className="grid gap-2 border-b border-line/70 py-3.5 last:border-b-0 sm:grid-cols-[5.5rem_1fr_1.5rem_1fr_7rem] sm:items-center sm:gap-3">
            <span className="text-xs font-medium text-muted">{row.label}</span>
            <span className="text-sm font-medium text-ink-soft line-through decoration-line-strong">{row.before}</span>
            <ArrowRight className="hidden size-3.5 text-muted sm:block" aria-hidden="true" />
            <span className="text-sm font-semibold text-ink">{row.after}</span>
            <span className="w-fit rounded-md bg-success-soft px-2 py-1 text-[10px] font-semibold text-success">{row.change}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-end border-t border-success-line px-5 py-4">
        <button className="secondary-button" type="button" onClick={onViewEvidence}>
          查看修订后证据
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
