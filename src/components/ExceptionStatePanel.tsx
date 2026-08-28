import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  KeyRound,
  ServerOff,
  Split,
} from 'lucide-react';

import type { DemoScenario } from '../hooks/useAnalysisFlow';

interface ExceptionStatePanelProps {
  onInspect: () => void;
  onReturnNormal: () => void;
  scenario: Exclude<DemoScenario, 'normal'>;
}

const exceptionConfig = {
  stale: {
    eyebrow: '数据就绪提醒',
    title: '数据还没覆盖完整 7 月，暂不生成完整月结论',
    description: '经营订单只更新到 7 月 29 日 22:10，缺少最后两天数据。直接与完整 6 月比较会产生不可控偏差。',
    status: '影响 3 条结论',
    detail: '利润降幅、原因排序与行动建议暂停生成',
    action: '查看受影响项',
    icon: CalendarClock,
    toneClass: 'bg-warning-soft text-warning-strong',
  },
  'source-unavailable': {
    eyebrow: '数据源异常',
    title: '门店主数据暂时不可用，无法核验新店口径',
    description: '订单与利润数据仍可读取，但系统无法判断门店开业时间，因此不会继续输出原因排名。',
    status: '1 个来源不可用',
    detail: '门店主数据连接超时，其他 2 个来源正常',
    action: '查看可用范围',
    icon: ServerOff,
    toneClass: 'bg-danger-soft text-danger',
  },
  'permission-denied': {
    eyebrow: '权限边界',
    title: '你可以查看区域汇总，但不能追溯门店利润明细',
    description: 'Dora 不会用无权限数据补全证据。当前仅展示你有权访问的汇总值，并隐藏受限字段。',
    status: '2 个字段受限',
    detail: '门店利润与营销费用明细需要额外权限',
    action: '查看权限影响',
    icon: KeyRound,
    toneClass: 'bg-primary-50 text-primary-800',
  },
  'ambiguous-correction': {
    eyebrow: '修正需要确认',
    title: '“排除新店”存在多种业务口径，需要先确认',
    description: '不同团队分别使用 30、60 或 90 天定义新店。Dora 不会自行猜测口径并覆盖原回答。',
    status: '发现 3 种可用口径',
    detail: '当前企业经营分析模板推荐使用 90 天',
    action: '确认新店口径',
    icon: Split,
    toneClass: 'bg-inference-soft text-inference',
  },
} as const;

export function ExceptionStatePanel({
  onInspect,
  onReturnNormal,
  scenario,
}: ExceptionStatePanelProps) {
  const config = exceptionConfig[scenario];
  const Icon = config.icon;
  return (
    <section className="mt-7 overflow-hidden rounded-2xl bg-panel shadow-card" aria-labelledby="exception-heading" aria-live="polite">
      <div className="grid gap-5 p-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:p-6">
        <div className={`grid size-11 place-items-center rounded-xl ${config.toneClass}`}>
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div>
          <p className="eyebrow">{config.eyebrow}</p>
          <h2 id="exception-heading" className="mt-2 max-w-[28ch] text-balance text-2xl font-semibold leading-[1.28] tracking-[-0.022em]">
            {config.title}
          </h2>
          <p className="mt-3 max-w-[66ch] text-pretty text-sm leading-7 text-muted">{config.description}</p>

          <div className="mt-5 flex items-start gap-3 rounded-xl bg-soft px-4 py-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-ink">{config.status}</p>
              <p className="mt-1 text-xs leading-5 text-muted">{config.detail}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              className="primary-button xl:hidden"
              type="button"
              onClick={onInspect}
            >
              <ArrowRight className="size-4" aria-hidden="true" />
              {config.action}
            </button>
            <button className="secondary-button justify-center" type="button" onClick={onReturnNormal}>
              返回正常场景
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
