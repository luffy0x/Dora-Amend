import { FlaskConical } from 'lucide-react';

import type { DemoScenario } from '../hooks/useAnalysisFlow';

interface DemoScenarioSelectorProps {
  onChange: (scenario: DemoScenario) => void;
  value: DemoScenario;
}

const scenarios: Array<{ label: string; value: DemoScenario }> = [
  { label: '正常分析', value: 'normal' },
  { label: '数据过期', value: 'stale' },
  { label: '来源不可用', value: 'source-unavailable' },
  { label: '权限不足', value: 'permission-denied' },
  { label: '修正有歧义', value: 'ambiguous-correction' },
];

export function DemoScenarioSelector({ onChange, value }: DemoScenarioSelectorProps) {
  return (
    <label className="relative flex min-h-10 min-w-0 flex-1 items-center gap-2 rounded-xl bg-panel px-3 text-xs font-semibold text-ink-soft shadow-chip sm:flex-none">
      <FlaskConical className="size-4 shrink-0 text-primary-700" aria-hidden="true" />
      <span className="sr-only">演示场景</span>
      <select
        className="min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-5 outline-none sm:w-28"
        value={value}
        onChange={(event) => onChange(event.target.value as DemoScenario)}
        aria-label="演示场景"
      >
        {scenarios.map((scenario) => (
          <option key={scenario.value} value={scenario.value}>{scenario.label}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 text-[10px] text-muted" aria-hidden="true">⌄</span>
    </label>
  );
}
