import { Clock3, RotateCcw, Sparkles } from 'lucide-react';

import { answerData, question, type AnswerVersion, type ConclusionId } from '../data/scenario';
import { type DemoScenario, type FlowStage } from '../hooks/useAnalysisFlow';
import { ConclusionList } from './ConclusionList';
import { DemoGuide } from './DemoGuide';
import { DemoScenarioSelector } from './DemoScenarioSelector';
import { DriverBreakdown } from './DriverBreakdown';
import { ExceptionStatePanel } from './ExceptionStatePanel';
import { TrustSummary } from './TrustSummary';
import { VersionComparison } from './VersionComparison';
import { VersionSwitcher } from './VersionSwitcher';

interface AnalysisAnswerProps {
  hasRevision: boolean;
  onGuideAction: () => void;
  onReset: () => void;
  onInspectException: () => void;
  onReturnNormal: () => void;
  onScenarioChange: (scenario: DemoScenario) => void;
  onVersionChange: (version: AnswerVersion) => void;
  onSelectConclusion: (id: ConclusionId) => void;
  onViewEvidence: () => void;
  selectedConclusionId: ConclusionId;
  scenario: DemoScenario;
  showDemoGuide: boolean;
  stage: FlowStage;
  version: AnswerVersion;
}

export function AnalysisAnswer({
  hasRevision,
  onGuideAction,
  onInspectException,
  onReset,
  onReturnNormal,
  onScenarioChange,
  onVersionChange,
  onSelectConclusion,
  onViewEvidence,
  selectedConclusionId,
  scenario,
  showDemoGuide,
  stage,
  version,
}: AnalysisAnswerProps) {
  const answer = answerData[version];
  const isRevised = version === 'revised';

  return (
    <div className="mx-auto w-full max-w-[860px] px-4 pb-16 pt-5 sm:px-6 lg:px-8 lg:pb-20 lg:pt-7">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span>财务分析专家</span>
            <span aria-hidden="true">/</span>
            <span className="truncate">华东区 7 月利润归因</span>
          </div>
          <h1 className="mt-1 text-lg font-semibold tracking-[-0.012em] sm:text-xl">经营分析会话</h1>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <DemoScenarioSelector value={scenario} onChange={onScenarioChange} />
          <button className="secondary-button shrink-0" type="button" onClick={onReset} aria-label="重置演示">
            <RotateCcw className="size-4" aria-hidden="true" />
            <span className="hidden lg:inline">重置演示</span>
          </button>
        </div>
      </header>

      {scenario === 'normal' && showDemoGuide && (
        <DemoGuide hasRevision={hasRevision} onAction={onGuideAction} stage={stage} />
      )}

      <section className={`${showDemoGuide ? 'mt-6' : 'mt-8'} flex justify-end`} aria-label="用户问题">
        <div className="max-w-[640px] rounded-[1.25rem] rounded-tr-md bg-user-bubble px-4 py-3 text-sm leading-6 text-user-bubble-ink shadow-user-bubble sm:px-5">
          {scenario === 'ambiguous-correction' ? '排除新店，再算一次。' : question}
        </div>
      </section>

      {scenario !== 'normal' && (
        <ExceptionStatePanel
          scenario={scenario}
          onInspect={onInspectException}
          onReturnNormal={onReturnNormal}
        />
      )}

      {scenario === 'normal' && <article className="mt-7" aria-labelledby="answer-heading">
        <div className="flex items-start gap-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary-600 text-white shadow-brand">
            <Sparkles className="size-4.5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold">Dora</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted">
                  <Clock3 className="size-3.5" aria-hidden="true" />
                  基于 3 个数据源完成分析
                </p>
              </div>
              {hasRevision ? (
                <VersionSwitcher value={version} onChange={onVersionChange} />
              ) : (
                <span className={`w-fit rounded-full px-3 py-1.5 text-[11px] font-semibold ${isRevised ? 'bg-success-soft text-success' : 'bg-soft text-muted'}`}>
                  {isRevised ? '修订版 v2' : '原始回答 v1'}
                </span>
              )}
            </div>

            <div className="mt-5">
              <h2 id="answer-heading" className="text-balance text-2xl font-semibold leading-[1.24] tracking-[-0.022em] text-ink sm:text-[30px]">
                {answer.title}
              </h2>
              <p className="mt-4 max-w-[68ch] text-pretty text-sm leading-7 text-muted sm:text-[15px]">{answer.summary}</p>
            </div>
          </div>
        </div>

        <div className="mt-7 space-y-6 sm:ml-12">
          {stage === 'comparison' && <VersionComparison onViewEvidence={onViewEvidence} />}

          <TrustSummary version={version} />

          <section className="grid overflow-hidden rounded-2xl bg-panel shadow-card sm:grid-cols-3" aria-label="关键指标">
            {answer.metrics.map((metric) => (
              <div key={metric.label} className="metric-cell">
                <p className="text-xs font-medium text-muted">{metric.label}</p>
                <p className="mt-2 text-xl font-semibold tracking-[-0.022em] tabular-nums text-ink">{metric.value}</p>
                <p className={`mt-1 text-xs font-semibold metric-tone-${metric.tone}`}>{metric.change}</p>
                <p className="mt-2 text-[11px] leading-5 text-muted">{metric.note}</p>
              </div>
            ))}
          </section>

          <DriverBreakdown version={version} />

          <ConclusionList
            conclusions={answer.conclusions}
            selectedId={selectedConclusionId}
            onSelect={onSelectConclusion}
            version={version}
          />

          <p className="border-t border-line pt-5 text-xs leading-5 text-muted">
            本页面使用固定 Mock 数据演示交互，不代表真实企业经营结论。技术执行明细默认收起，仅在证据面板按需查看。
          </p>
        </div>
      </article>}
    </div>
  );
}
