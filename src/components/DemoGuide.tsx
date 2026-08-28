import { ArrowRight, Check, LoaderCircle, Route } from 'lucide-react';

import type { FlowStage } from '../hooks/useAnalysisFlow';

interface DemoGuideProps {
  hasRevision: boolean;
  onAction: () => void;
  stage: FlowStage;
}

const guideSteps = ['看证据', '改口径', '局部重跑', '比版本'] as const;

const guideCopy = [
  {
    title: '先核验一条可疑推断',
    description: '证据面板已聚合这条结论使用的事实、计算和口径提醒。',
    action: '核验证据并纠正',
  },
  {
    title: '把问题改成明确条件',
    description: '自然语言修正会先转换为结构化规则，确认前不会重跑。',
    action: '查看纠正面板',
  },
  {
    title: '只重算受影响的结论',
    description: '先确认变化范围，再保留原回答并生成新的修订版本。',
    action: '查看影响与进度',
  },
  {
    title: '解释新旧结论为什么不同',
    description: '切换 v1 与 v2，核对利润降幅、原因排序和行动建议。',
    action: '对比 v1 与 v2',
  },
] as const;

function getCurrentStep(stage: FlowStage, hasRevision: boolean) {
  if (hasRevision || stage === 'comparison') {
    return 4;
  }

  if (stage === 'correction') {
    return 2;
  }

  if (stage === 'impact' || stage === 'running') {
    return 3;
  }

  return 1;
}

export function DemoGuide({ hasRevision, onAction, stage }: DemoGuideProps) {
  const currentStep = getCurrentStep(stage, hasRevision);
  const copy = guideCopy[currentStep - 1];
  const isRunning = stage === 'running';

  return (
    <section className="mt-6 overflow-hidden rounded-2xl bg-panel shadow-card" aria-labelledby="demo-guide-heading">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary-700">
            <Route className="size-4" aria-hidden="true" />
            演示路线
          </div>
          <span className="text-[11px] font-semibold tabular-nums text-muted">{currentStep} / {guideSteps.length}</span>
        </div>

        <ol className="grid grid-cols-4" aria-label="演示进度">
          {guideSteps.map((label, index) => {
            const step = index + 1;
            const isComplete = step < currentStep;
            const isCurrent = step === currentStep;

            return (
              <li
                key={label}
                className="relative flex min-w-0 flex-col items-center gap-2 text-center before:absolute before:left-0 before:right-0 before:top-3 before:h-px before:bg-line first:before:left-1/2 last:before:right-1/2"
                aria-current={isCurrent ? 'step' : undefined}
              >
                <span className={`relative z-10 grid size-6 place-items-center rounded-full text-[10px] font-bold ${
                  isComplete
                    ? 'bg-success text-white'
                    : isCurrent
                      ? 'bg-primary-600 text-white shadow-brand'
                      : 'bg-soft text-muted'
                }`}>
                  {isComplete ? <Check className="size-3" aria-hidden="true" /> : step}
                </span>
                <span className={`truncate text-[10px] font-semibold sm:text-[11px] ${isCurrent ? 'text-ink' : 'text-muted'}`}>{label}</span>
              </li>
            );
          })}
        </ol>

        <div className="flex flex-col gap-3 rounded-xl bg-soft px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 id="demo-guide-heading" className="text-sm font-semibold tracking-[-0.006em] text-ink">{copy.title}</h2>
            <p className="mt-1 text-xs leading-5 text-muted">{copy.description}</p>
          </div>
          <button
            className="secondary-button shrink-0 justify-center disabled:cursor-wait disabled:text-muted disabled:shadow-none"
            type="button"
            onClick={onAction}
            disabled={isRunning}
          >
            {isRunning ? <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}
            {isRunning ? '正在局部重跑' : copy.action}
          </button>
        </div>
      </div>
    </section>
  );
}
