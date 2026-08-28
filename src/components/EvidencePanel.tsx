import {
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  GitCompareArrows,
  LoaderCircle,
  PencilLine,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import {
  answerData,
  evidenceByConclusion,
  technicalEvidenceByConclusion,
  type AnswerVersion,
  type ConclusionId,
} from '../data/scenario';
import type { FlowStage } from '../hooks/useAnalysisFlow';
import type { DemoScenario } from '../hooks/useAnalysisFlow';

interface EvidencePanelProps {
  correctionError: string;
  correctionText: string;
  demoScenario: DemoScenario;
  newStoreDays: number;
  onCorrectionTextChange: (value: string) => void;
  onPreviewCorrection: () => void;
  onResolveAmbiguity: () => void;
  onReturnNormal: () => void;
  onReset: () => void;
  onConfirmRerun: () => void;
  onEditCorrection: () => void;
  onShowEvidence: () => void;
  onStartCorrection: () => void;
  onViewVersion: (version: AnswerVersion) => void;
  rerunStep: number;
  selectedConclusionId: ConclusionId;
  stage: FlowStage;
  version: AnswerVersion;
}

const evidenceToneClass = {
  source: 'bg-fact-soft text-fact',
  calculation: 'bg-primary-50 text-primary-700',
  inference: 'bg-inference-soft text-inference',
  warning: 'bg-warning-soft text-warning',
} as const;

function EvidenceDetail({ selectedConclusionId, version, onStartCorrection }: Pick<EvidencePanelProps, 'selectedConclusionId' | 'version' | 'onStartCorrection'>) {
  const evidence = evidenceByConclusion[version][selectedConclusionId];
  const technicalEvidence = technicalEvidenceByConclusion[version][selectedConclusionId];
  const conclusion = answerData[version].conclusions.find((item) => item.id === selectedConclusionId);

  return (
    <>
      <div className="px-5 pb-5 pt-4">
        <p className="eyebrow">当前核验结论</p>
        <h2 className="mt-2 text-balance text-lg font-semibold leading-7 tracking-[-0.012em]">{conclusion?.title}</h2>
        <p className="mt-2 text-pretty text-xs leading-5 text-muted">{evidence.description}</p>
      </div>

      <div className="border-y border-line bg-panel px-5 py-5">
        <div className="relative space-y-5 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-px before:bg-line">
          {evidence.steps.map((step) => (
            <div key={`${step.eyebrow}-${step.title}`} className="relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3">
              <span className={`relative z-10 mt-0.5 grid size-6 place-items-center rounded-full ring-4 ring-panel ${evidenceToneClass[step.tone]}`}>
                {step.tone === 'warning' ? <AlertTriangle className="size-3" aria-hidden="true" /> : <Check className="size-3" aria-hidden="true" />}
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{step.eyebrow}</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-ink">{step.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="px-5 py-5" aria-labelledby="evidence-sources-heading">
        <div className="flex items-center gap-2">
          <Database className="size-4 text-primary-700" aria-hidden="true" />
          <h3 id="evidence-sources-heading" className="text-sm font-semibold">直接依据</h3>
        </div>
        <ul className="mt-3 space-y-2">
          {evidence.sources.map((source) => (
            <li key={source} className="flex items-start gap-2 text-xs leading-5 text-muted">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden="true" />
              {source}
            </li>
          ))}
        </ul>

        <details className="mt-4 min-w-0 max-w-full overflow-hidden rounded-xl bg-soft text-xs text-muted">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-2 font-semibold text-ink">
            <span className="inline-flex items-center gap-2">
              <Code2 className="size-4 text-primary-700" aria-hidden="true" />
              技术明细
              <span className="rounded-md bg-panel px-1.5 py-0.5 text-[9px] font-semibold text-muted shadow-chip">Mock</span>
            </span>
            <ChevronRight className="size-4 shrink-0 details-chevron" aria-hidden="true" />
          </summary>
          <div className="min-w-0 border-t border-line bg-panel px-3.5 pb-4 pt-3">
            <dl className="grid grid-cols-3 gap-2">
              <div>
                <dt className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted">执行编号</dt>
                <dd className="mt-1 truncate font-mono text-[10px] font-semibold text-ink" title={technicalEvidence.executionId}>{technicalEvidence.executionId}</dd>
              </div>
              <div>
                <dt className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted">耗时</dt>
                <dd className="mt-1 font-semibold tabular-nums text-ink">{technicalEvidence.elapsed}</dd>
              </div>
              <div>
                <dt className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted">返回</dt>
                <dd className="mt-1 font-semibold tabular-nums text-ink">{technicalEvidence.result}</dd>
              </div>
            </dl>

            <div className="mt-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted">执行器</p>
              <p className="mt-1 font-mono text-[10px] text-ink-soft">{technicalEvidence.executor}</p>
            </div>

            <div className="mt-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted">关联字段</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {technicalEvidence.fields.map((field) => (
                  <code key={field} className="rounded-md bg-soft px-2 py-1 font-mono text-[9px] text-ink-soft">{field}</code>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted">{technicalEvidence.statementLabel}</p>
              <pre className="mt-2 w-full min-w-0 max-w-full overflow-auto rounded-lg bg-ink p-3 text-[10px] leading-5 text-white/80"><code>{technicalEvidence.statement}</code></pre>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-lg bg-success-soft px-3 py-2.5 text-[10px] leading-4 text-success">
              <ShieldCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              <p>{technicalEvidence.trace}</p>
            </div>

            <p className="mt-3 text-[9px] leading-4 text-muted">演示用脱敏明细，仅展示可审计结构，不连接真实数据库。</p>
          </div>
        </details>
      </section>

      <div className="sticky bottom-0 mt-auto border-t border-line bg-inspector px-5 py-4">
        <button className="primary-button w-full" type="button" onClick={onStartCorrection}>
          <PencilLine className="size-4" aria-hidden="true" />
          核验并纠正
        </button>
      </div>
    </>
  );
}

function CorrectionEditor({ correctionError, correctionText, onCorrectionTextChange, onPreviewCorrection, onShowEvidence }: Pick<EvidencePanelProps, 'correctionError' | 'correctionText' | 'onCorrectionTextChange' | 'onPreviewCorrection' | 'onShowEvidence'>) {
  const detectedDayValues = [...correctionText.matchAll(/(\d+)\s*天/g)].map((match) => match[1]);
  const uniqueDayValues = [...new Set(detectedDayValues)];
  const detectedCondition = uniqueDayValues.length > 1
    ? '检测到多个天数，需澄清'
    : uniqueDayValues.length === 1
      ? `排除开业不足 ${uniqueDayValues[0]} 天`
      : '等待识别明确天数';

  return (
    <div className="px-5 py-5">
      <button className="back-button" type="button" onClick={onShowEvidence}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        返回证据
      </button>
      <p className="mt-6 eyebrow">纠正分析条件</p>
      <h2 className="mt-2 text-xl font-semibold tracking-[-0.012em]">告诉 Dora 哪里需要改</h2>
      <p className="mt-2 text-xs leading-5 text-muted">自然语言会先转换成明确条件，未经确认不会重跑。</p>

      <label className="mt-6 block text-xs font-semibold text-ink" htmlFor="correction-input">修正说明</label>
      <textarea
        id="correction-input"
        className="mt-2 min-h-28 w-full resize-none rounded-xl bg-panel px-3.5 py-3 text-sm leading-6 text-ink shadow-input outline-none transition-[box-shadow,background-color] duration-150 placeholder:text-muted focus:bg-white focus:shadow-input-focus"
        value={correctionText}
        onChange={(event) => onCorrectionTextChange(event.target.value)}
        aria-describedby={correctionError ? 'correction-error' : undefined}
        aria-invalid={Boolean(correctionError)}
      />
      {correctionError && <p id="correction-error" className="mt-2 text-xs font-medium text-danger">{correctionError}</p>}

      <div className="mt-5 rounded-xl bg-primary-50 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary-800">
          <Sparkles className="size-4" aria-hidden="true" />
          识别到的结构化修改
        </div>
        <dl className="mt-3 space-y-2 text-xs">
          <div className="flex items-start justify-between gap-3">
            <dt className="text-muted">门店范围</dt>
            <dd className="text-right font-semibold text-ink">
              {detectedCondition}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-3">
            <dt className="text-muted">其他条件</dt>
            <dd className="text-right font-semibold text-ink">保持不变</dd>
          </div>
        </dl>
      </div>

      <button className="primary-button mt-6 w-full" type="button" onClick={onPreviewCorrection}>
        生成影响预览
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function ImpactPreview({ newStoreDays, onConfirmRerun, onEditCorrection }: Pick<EvidencePanelProps, 'newStoreDays' | 'onConfirmRerun' | 'onEditCorrection'>) {
  return (
    <div className="px-5 py-5">
      <button className="back-button" type="button" onClick={onEditCorrection}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        编辑修正
      </button>
      <p className="mt-6 eyebrow">影响预览</p>
      <h2 className="mt-2 text-xl font-semibold tracking-[-0.012em]">只重算受影响的部分</h2>
      <p className="mt-2 text-xs leading-5 text-muted">确认后保留 v1，并生成可对比的修订版本。</p>

      <div className="mt-6 rounded-xl bg-panel p-4 shadow-card">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">条件变化</p>
        <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs">
          <span className="rounded-lg bg-soft px-3 py-2 text-center text-muted">全部门店</span>
          <ChevronRight className="size-4 text-primary-700" aria-hidden="true" />
          <span className="rounded-lg bg-primary-50 px-3 py-2 text-center font-semibold text-primary-800">排除新店 · {newStoreDays} 天</span>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <p className="text-xs font-semibold text-ink">将重新计算</p>
          <ul className="mt-2 space-y-2 text-xs leading-5 text-muted">
            <li className="impact-item"><Check className="size-3.5 text-primary-700" aria-hidden="true" />利润降幅与原因贡献度</li>
            <li className="impact-item"><Check className="size-3.5 text-primary-700" aria-hidden="true" />1 条 Agent 推断</li>
            <li className="impact-item"><Check className="size-3.5 text-primary-700" aria-hidden="true" />1 条经营建议</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold text-ink">保持不变</p>
          <ul className="mt-2 space-y-2 text-xs leading-5 text-muted">
            <li className="impact-item"><ShieldCheck className="size-3.5 text-success" aria-hidden="true" />数据源与更新时间</li>
            <li className="impact-item"><ShieldCheck className="size-3.5 text-success" aria-hidden="true" />地区、月份与订单状态</li>
          </ul>
        </div>
      </div>

      <button className="primary-button mt-7 w-full" type="button" onClick={onConfirmRerun}>
        确认并局部重跑
        <GitCompareArrows className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function RerunProgress({ rerunStep }: Pick<EvidencePanelProps, 'rerunStep'>) {
  const steps = ['应用可比门店筛选', '重算受影响的事实与推断', '生成答案版本差异'];

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-5 py-12 text-center" aria-live="polite">
      <div className="grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary-700">
        <LoaderCircle className="size-6 animate-spin motion-reduce:animate-none" aria-hidden="true" />
      </div>
      <p className="mt-5 eyebrow">局部重跑中</p>
      <h2 className="mt-2 text-xl font-semibold tracking-[-0.012em]">只更新受影响的结论</h2>
      <p className="mt-2 max-w-64 text-xs leading-5 text-muted">原回答、数据源和修正记录都会保留。</p>
      <ol className="mt-7 w-full space-y-2 text-left">
        {steps.map((step, index) => {
          const isComplete = rerunStep > index;
          const isCurrent = rerunStep === index;
          return (
            <li key={step} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-xs font-medium ${isCurrent ? 'bg-primary-50 text-primary-800' : 'text-muted'}`}>
              <span className={`grid size-5 place-items-center rounded-full ${isComplete ? 'bg-success text-white' : isCurrent ? 'bg-primary-600 text-white' : 'bg-line text-muted'}`}>
                {isComplete ? <Check className="size-3" aria-hidden="true" /> : index + 1}
              </span>
              {step}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ComparisonSummary({ onReset, onViewVersion }: Pick<EvidencePanelProps, 'onReset' | 'onViewVersion'>) {
  return (
    <div className="flex flex-1 flex-col px-5 py-5">
      <p className="eyebrow">版本记录</p>
      <h2 className="mt-2 text-xl font-semibold tracking-[-0.012em]">本次修正改变了原因排序</h2>
      <p className="mt-2 text-xs leading-5 text-muted">v1 未被覆盖，你可以继续查看任一修订后结论的证据。</p>

      <div className="mt-6 space-y-3">
        <button className="w-full rounded-xl bg-success-soft p-4 text-left transition-transform duration-150 active:scale-[0.98]" type="button" onClick={() => onViewVersion('revised')}>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-success">v2 · 当前版本</span>
            <span className="text-[10px] text-success">刚刚生成</span>
          </div>
          <p className="mt-2 text-sm font-semibold leading-5 text-ink">可比门店口径</p>
          <p className="mt-1 text-xs leading-5 text-muted">利润降幅 -8.4%，首要原因为履约成本率。</p>
        </button>
        <button className="w-full rounded-xl bg-panel p-4 text-left shadow-card transition-transform duration-150 active:scale-[0.98]" type="button" onClick={() => onViewVersion('original')}>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-muted">v1 · 原回答</span>
            <span className="text-[10px] text-muted">已保留</span>
          </div>
          <p className="mt-2 text-sm font-semibold leading-5 text-ink">全部门店口径</p>
          <p className="mt-1 text-xs leading-5 text-muted">利润降幅 -18.7%，首要原因为上海客单价。</p>
        </button>
      </div>

      <button className="primary-button mt-6 w-full" type="button" onClick={() => onViewVersion('revised')}>
        查看修订后证据
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
      <button className="secondary-button mt-2 w-full justify-center" type="button" onClick={onReset}>
        重置演示
      </button>
    </div>
  );
}

const exceptionInspectorConfig = {
  stale: {
    label: '数据过期',
    title: '完整月结论被暂停',
    description: 'Dora 已在执行前发现时间覆盖不足，因此不会先生成结论、再把限制藏在答案末尾。',
    facts: ['最新订单时间：7 月 29 日 22:10', '缺少范围：7 月 30 日至 31 日', '受影响：利润、原因排序、行动建议'],
    next: '可改为分析截至 7 月 29 日，或等待数据补齐。',
  },
  'source-unavailable': {
    label: '来源不可用',
    title: '新店口径暂时无法验证',
    description: '门店主数据连接失败后，Dora 保留可用数据，但停止依赖开业时间的推断。',
    facts: ['经营订单：可用', '区域利润表：可用', '门店主数据：连接超时'],
    next: '恢复门店主数据后，只需重跑门店范围与原因排序。',
  },
  'permission-denied': {
    label: '权限不足',
    title: '受限明细不会进入回答',
    description: '当前账号只能查看区域级汇总，系统不会通过 Agent 绕过原有数据权限。',
    facts: ['区域利润汇总：可见', '门店利润明细：不可见', '营销费用字段：不可见'],
    next: '可以继续查看汇总结论，或由数据管理员授予门店明细权限。',
  },
  'ambiguous-correction': {
    label: '修正有歧义',
    title: '先把自然语言变成明确规则',
    description: '“新店”不是唯一口径。确认前，系统不会修改筛选条件，也不会覆盖原回答。',
    facts: ['30 天：运营周报口径', '60 天：区域复盘口径', '90 天：企业经营分析模板'],
    next: '确认企业经营分析模板推荐的 90 天口径后，再预览受影响的事实、推断和建议。',
  },
} as const;

function ExceptionInspector({ demoScenario, onResolveAmbiguity, onReturnNormal }: Pick<EvidencePanelProps, 'demoScenario' | 'onResolveAmbiguity' | 'onReturnNormal'>) {
  if (demoScenario === 'normal') {
    return null;
  }

  const config = exceptionInspectorConfig[demoScenario];
  const isAmbiguous = demoScenario === 'ambiguous-correction';

  return (
    <div className="flex flex-1 flex-col px-5 py-5">
      <div className="flex items-center gap-2 text-xs font-semibold text-warning-strong">
        <AlertTriangle className="size-4" aria-hidden="true" />
        {config.label}
      </div>
      <h2 className="mt-4 text-balance text-xl font-semibold leading-7 tracking-[-0.012em]">{config.title}</h2>
      <p className="mt-2 text-pretty text-xs leading-5 text-muted">{config.description}</p>

      <ul className="mt-6 overflow-hidden rounded-xl bg-panel shadow-card">
        {config.facts.map((fact) => (
          <li key={fact} className="flex min-h-12 items-center gap-2.5 border-b border-line px-3.5 py-2 text-xs leading-5 text-ink-soft last:border-b-0">
            <span className="size-1.5 shrink-0 rounded-full bg-primary-600" aria-hidden="true" />
            {fact}
          </li>
        ))}
      </ul>

      {isAmbiguous && (
        <div className="mt-5">
          <p className="text-xs font-semibold text-ink">推荐确认</p>
          <div className="mt-2 rounded-xl bg-primary-50 px-4 py-3 text-xs">
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-primary-800">90 天</span>
              <span className="text-primary-700">企业经营分析模板</span>
            </div>
            <p className="mt-2 leading-5 text-muted">当前 Mock 场景使用推荐口径生成修订结果。</p>
          </div>
        </div>
      )}

      <div className="mt-5 rounded-xl bg-soft p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">建议下一步</p>
        <p className="mt-2 text-xs leading-5 text-ink-soft">{config.next}</p>
      </div>

      <div className="mt-auto space-y-2 pt-6">
        {isAmbiguous && (
          <button className="primary-button w-full" type="button" onClick={onResolveAmbiguity}>
            采用 90 天规则并预览
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        )}
        <button className="secondary-button w-full justify-center" type="button" onClick={onReturnNormal}>
          返回正常场景
        </button>
      </div>
    </div>
  );
}

export function EvidencePanel(props: EvidencePanelProps) {
  const { stage } = props;

  return (
    <aside id="evidence-panel" className="flex min-h-screen min-w-0 flex-col bg-inspector shadow-inspector xl:sticky xl:top-0 xl:h-screen xl:min-h-0 xl:self-start xl:overflow-y-auto" aria-label="结论证据与纠正">
      <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between border-b border-line bg-inspector px-5">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="size-4.5 text-primary-700" aria-hidden="true" />
          <p className="text-sm font-semibold">可信回答</p>
        </div>
        <span className="rounded-full bg-panel px-2.5 py-1 text-[10px] font-semibold text-muted shadow-chip">
          {props.demoScenario === 'normal' ? (props.version === 'revised' ? 'v2' : 'v1') : '异常演练'}
        </span>
      </header>

      {props.demoScenario !== 'normal' && <ExceptionInspector {...props} />}
      {props.demoScenario === 'normal' && stage === 'evidence' && <EvidenceDetail {...props} />}
      {props.demoScenario === 'normal' && stage === 'correction' && <CorrectionEditor {...props} />}
      {props.demoScenario === 'normal' && stage === 'impact' && <ImpactPreview {...props} />}
      {props.demoScenario === 'normal' && stage === 'running' && <RerunProgress {...props} />}
      {props.demoScenario === 'normal' && stage === 'comparison' && <ComparisonSummary {...props} />}
    </aside>
  );
}
