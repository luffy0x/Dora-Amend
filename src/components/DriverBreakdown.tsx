import { driverBars, type AnswerVersion } from '../data/scenario';

interface DriverBreakdownProps {
  version: AnswerVersion;
}

export function DriverBreakdown({ version }: DriverBreakdownProps) {
  return (
    <section className="rounded-2xl bg-soft p-4 sm:p-5" aria-labelledby="driver-heading">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">原因贡献拆解</p>
          <h2 id="driver-heading" className="mt-1 text-base font-semibold tracking-[-0.012em]">
            {version === 'original' ? '当前口径下的利润变化贡献' : '可比门店口径下的利润变化贡献'}
          </h2>
        </div>
        <span className="text-[11px] text-muted">仅展示前三项</span>
      </div>
      <div className="mt-5 space-y-3.5">
        {driverBars[version].map((item, index) => (
          <div key={item.label} className="grid grid-cols-[6.8rem_minmax(0,1fr)_2.5rem] items-center gap-3 text-xs sm:grid-cols-[8.5rem_minmax(0,1fr)_2.5rem]">
            <span className="truncate font-medium text-ink-soft">{item.label}</span>
            <div className="h-2 overflow-hidden rounded-full bg-line/70">
              <div className={`h-full rounded-full ${item.className} ${index === 0 ? 'bg-primary-600' : 'bg-primary-200'}`} />
            </div>
            <span className="text-right font-semibold tabular-nums text-ink">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
