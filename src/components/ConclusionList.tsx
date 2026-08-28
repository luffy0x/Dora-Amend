import { ChevronRight, Link2 } from 'lucide-react';

import { evidenceByConclusion, type AnswerVersion, type Conclusion, type ConclusionId } from '../data/scenario';

const kindClassName: Record<Conclusion['kind'], string> = {
  数据事实: 'bg-fact-soft text-fact',
  'Agent 推断': 'bg-inference-soft text-inference',
  行动建议: 'bg-advice-soft text-advice',
};

interface ConclusionListProps {
  conclusions: Conclusion[];
  onSelect: (id: ConclusionId) => void;
  selectedId: ConclusionId;
  version: AnswerVersion;
}

export function ConclusionList({ conclusions, onSelect, selectedId, version }: ConclusionListProps) {
  return (
    <section aria-labelledby="conclusions-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">结论对象</p>
          <h2 id="conclusions-heading" className="mt-1 text-lg font-semibold tracking-[-0.012em]">逐条核验，而不是翻整段日志</h2>
        </div>
        <p className="hidden text-xs text-muted sm:block">选择任意结论查看专属证据</p>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl bg-panel shadow-card">
        {conclusions.map(({ id, kind, title, description, icon: Icon }) => {
          const isSelected = selectedId === id;
          const evidenceCount = evidenceByConclusion[version][id].steps.length;
          return (
            <button
              key={id}
              className={`group grid min-h-28 w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-start gap-3 border-b border-line/80 px-4 py-4 text-left transition-[background-color,transform] duration-150 last:border-b-0 active:scale-[0.995] sm:gap-4 sm:px-5 ${
                isSelected ? 'bg-selected' : 'bg-panel [@media(hover:hover)]:hover:bg-soft'
              }`}
              type="button"
              onClick={() => onSelect(id)}
              aria-pressed={isSelected}
            >
              <span className={`grid size-10 place-items-center rounded-xl ${isSelected ? 'bg-primary-600 text-white shadow-brand' : 'bg-soft text-muted'}`}>
                <Icon className="size-4.5" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className={`inline-flex rounded-md px-2 py-1 text-[10px] font-semibold ${kindClassName[kind]}`}>{kind}</span>
                <span className="mt-2 block text-sm font-semibold leading-6 tracking-[-0.006em] text-ink sm:text-[15px]">{title}</span>
                <span className="mt-1 block text-xs leading-5 text-muted sm:text-[13px]">{description}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-primary-700">
                  <Link2 className="size-3.5" aria-hidden="true" />
                  {evidenceCount} 条关联证据
                </span>
              </span>
              <ChevronRight className={`mt-2 size-4 transition-transform duration-150 group-active:translate-x-0.5 ${isSelected ? 'text-primary-700' : 'text-muted'}`} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
