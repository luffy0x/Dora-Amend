import { History, Sparkles } from 'lucide-react';

import type { AnswerVersion } from '../data/scenario';

interface VersionSwitcherProps {
  onChange: (version: AnswerVersion) => void;
  value: AnswerVersion;
}

export function VersionSwitcher({ onChange, value }: VersionSwitcherProps) {
  return (
    <div className="inline-grid grid-cols-2 rounded-xl bg-soft p-1" role="group" aria-label="回答版本">
      <button
        className={`inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-[11px] font-semibold transition-[background-color,color,transform,box-shadow] duration-150 active:scale-95 ${
          value === 'original' ? 'bg-panel text-ink shadow-chip' : 'text-muted [@media(hover:hover)]:hover:text-ink'
        }`}
        type="button"
        onClick={() => onChange('original')}
        aria-pressed={value === 'original'}
      >
        <History className="size-3.5" aria-hidden="true" />
        v1 原回答
      </button>
      <button
        className={`inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-[11px] font-semibold transition-[background-color,color,transform,box-shadow] duration-150 active:scale-95 ${
          value === 'revised' ? 'bg-success-soft text-success shadow-chip' : 'text-muted [@media(hover:hover)]:hover:text-ink'
        }`}
        type="button"
        onClick={() => onChange('revised')}
        aria-pressed={value === 'revised'}
      >
        <Sparkles className="size-3.5" aria-hidden="true" />
        v2 修订版
      </button>
    </div>
  );
}
