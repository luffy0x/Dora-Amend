import type { LucideIcon } from 'lucide-react';
import {
  BadgeDollarSign,
  Lightbulb,
  ReceiptText,
  Store,
  TrendingDown,
} from 'lucide-react';

export type ConclusionId = 'profit' | 'primary-driver' | 'new-stores' | 'action';
export type ConclusionKind = '数据事实' | 'Agent 推断' | '行动建议';
export type AnswerVersion = 'original' | 'revised';

export interface Metric {
  label: string;
  value: string;
  change: string;
  note: string;
  tone: 'negative' | 'warning' | 'neutral' | 'positive';
}

export interface Conclusion {
  id: ConclusionId;
  kind: ConclusionKind;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface EvidenceStep {
  eyebrow: string;
  title: string;
  detail: string;
  tone: 'source' | 'calculation' | 'inference' | 'warning';
}

export interface EvidenceBundle {
  description: string;
  steps: EvidenceStep[];
  sources: string[];
}

export interface TechnicalEvidence {
  executionId: string;
  executor: string;
  elapsed: string;
  result: string;
  fields: string[];
  statementLabel: string;
  statement: string;
  trace: string;
}

export const question = '为什么华东区 7 月利润下降？请给出主要原因和经营建议。';

export const trustSummary = {
  original: {
    status: '存在 1 项口径提醒',
    source: '经营订单、门店主数据、利润表',
    updatedAt: '2026-08-01 08:12',
    range: '华东区 · 7 月对比 6 月',
    filter: '已完成订单 · 含税利润',
    warning: '包含 7 家开业不足 90 天的门店',
  },
  revised: {
    status: '分析口径已确认',
    source: '经营订单、门店主数据、利润表',
    updatedAt: '2026-08-01 08:12',
    range: '华东区 · 7 月对比 6 月',
    filter: '已完成订单 · 含税利润 · 可比门店',
    warning: '已排除 7 家开业不足 90 天的门店',
  },
} as const;

export const answerData: Record<
  AnswerVersion,
  {
    title: string;
    summary: string;
    metrics: Metric[];
    conclusions: Conclusion[];
  }
> = {
  original: {
    title: '华东区 7 月利润下降 18.7%，上海区域贡献了主要降幅',
    summary:
      '初步分析显示，上海门店的客单价下降与新店爬坡期亏损共同拉低利润。其中客单价变化被识别为首要原因，但当前分析包含 7 家新开门店，结论仍需核验。',
    metrics: [
      {
        label: '华东区利润',
        value: '395.8 万',
        change: '环比 -18.7%',
        note: '减少 91.1 万',
        tone: 'negative',
      },
      {
        label: '上海客单价',
        value: '129.8 元',
        change: '环比 -12.4%',
        note: '降幅高于区域均值',
        tone: 'warning',
      },
      {
        label: '新开门店',
        value: '7 家',
        change: '亏损 63.4 万',
        note: '尚未排除爬坡期影响',
        tone: 'neutral',
      },
    ],
    conclusions: [
      {
        id: 'profit',
        kind: '数据事实',
        title: '华东区 7 月利润为 395.8 万，环比下降 18.7%',
        description: '上海区域贡献了 44.6% 的利润降幅，杭州与苏州整体稳定。',
        icon: TrendingDown,
      },
      {
        id: 'primary-driver',
        kind: 'Agent 推断',
        title: '上海门店客单价下降是当前识别的首要原因',
        description: '客单价从 148.2 元降至 129.8 元，模型估算其解释了约 41% 的利润变化。',
        icon: ReceiptText,
      },
      {
        id: 'new-stores',
        kind: '数据事实',
        title: '7 家新开门店产生 63.4 万爬坡期亏损',
        description: '当前口径将新店与成熟门店直接比较，可能放大区域经营降幅。',
        icon: Store,
      },
      {
        id: 'action',
        kind: '行动建议',
        title: '优先检查上海门店促销结构与高客单商品供给',
        description: '建议同时复核新店口径，再决定是否调整区域促销策略。',
        icon: Lightbulb,
      },
    ],
  },
  revised: {
    title: '按可比门店口径，华东区 7 月利润下降 8.4%',
    summary:
      '排除 7 家开业不足 90 天的门店后，利润降幅由 18.7% 收窄至 8.4%。首要原因变为履约成本上升，上海客单价下降不再是主要驱动。',
    metrics: [
      {
        label: '可比门店利润',
        value: '431.7 万',
        change: '环比 -8.4%',
        note: '较原结论收窄 10.3pp',
        tone: 'positive',
      },
      {
        label: '上海客单价',
        value: '143.6 元',
        change: '环比 -3.1%',
        note: '不再是主要驱动',
        tone: 'neutral',
      },
      {
        label: '履约成本率',
        value: '14.9%',
        change: '环比 +4.7pp',
        note: '成为首要影响因素',
        tone: 'warning',
      },
    ],
    conclusions: [
      {
        id: 'profit',
        kind: '数据事实',
        title: '可比门店利润为 431.7 万，环比下降 8.4%',
        description: '剔除新店爬坡期影响后，区域利润降幅收窄 10.3 个百分点。',
        icon: TrendingDown,
      },
      {
        id: 'primary-driver',
        kind: 'Agent 推断',
        title: '履约成本率上升是可比门店利润下降的首要原因',
        description: '成本率上升 4.7 个百分点，主要集中在上海与宁波的即时配送订单。',
        icon: BadgeDollarSign,
      },
      {
        id: 'new-stores',
        kind: '数据事实',
        title: '7 家新店已从本次可比分析中排除',
        description: '新店数据仍保留在原始数据集，仅不参与本次结论计算。',
        icon: Store,
      },
      {
        id: 'action',
        kind: '行动建议',
        title: '优先核查上海与宁波的即时配送定价和补贴',
        description: '客单价促销不再作为第一优先级，建议单独管理新店爬坡目标。',
        icon: Lightbulb,
      },
    ],
  },
};

export const driverBars = {
  original: [
    { label: '上海客单价', value: '41%', className: 'driver-bar-41' },
    { label: '新店爬坡亏损', value: '34%', className: 'driver-bar-34' },
    { label: '履约成本', value: '17%', className: 'driver-bar-17' },
  ],
  revised: [
    { label: '履约成本', value: '52%', className: 'driver-bar-52' },
    { label: '上海客单价', value: '18%', className: 'driver-bar-18' },
    { label: '商品毛利率', value: '14%', className: 'driver-bar-14' },
  ],
} as const;

const sources = {
  orders: '经营订单明细 · 2026-08-01 08:12',
  stores: '门店主数据 · 2026-07-31 23:40',
  profit: '区域利润表 · 2026-08-01 07:55',
  promotionPractice: '《区域门店促销诊断 v3.2》· 第 4.1 节',
  deliveryPractice: '《即时配送成本治理手册 v2.4》· 第 3.2 节',
} as const;

export const evidenceByConclusion: Record<AnswerVersion, Record<ConclusionId, EvidenceBundle>> = {
  original: {
    profit: {
      description: '数值计算完整，但当前门店范围包含新开门店。',
      sources: [sources.orders, sources.stores, sources.profit],
      steps: [
        { eyebrow: '数据事实', title: '7 月利润 395.8 万', detail: '6 月为 486.9 万，差额为 -91.1 万。', tone: 'source' },
        { eyebrow: '计算口径', title: '含税利润 · 已完成订单', detail: '利润 = 实收金额 - 商品成本 - 履约成本 - 营销费用。', tone: 'calculation' },
        { eyebrow: '范围提醒', title: '包含 7 家新开门店', detail: '门店范围未设置开业时长筛选条件。', tone: 'warning' },
      ],
    },
    'primary-driver': {
      description: '该推断来自指标相关性和贡献度拆解，不代表已经证明因果。',
      sources: [sources.orders, sources.profit, sources.stores],
      steps: [
        { eyebrow: '数据事实', title: '上海客单价下降 12.4%', detail: '从 148.2 元降至 129.8 元，订单量同时上升 5.6%。', tone: 'source' },
        { eyebrow: '计算过程', title: '贡献度估算为 41%', detail: '按门店利润变化拆解客单价、订单量和成本率贡献。', tone: 'calculation' },
        { eyebrow: '范围提醒', title: '新店与成熟门店被直接比较', detail: '7 家新店的低客单价和爬坡成本可能放大相关性。', tone: 'warning' },
        { eyebrow: 'Agent 推断', title: '客单价被判断为首要原因', detail: '这是基于当前口径的推断，建议先修正门店范围再决策。', tone: 'inference' },
      ],
    },
    'new-stores': {
      description: '7 家门店均在 5 月之后开业，尚处于经营爬坡期。',
      sources: [sources.stores, sources.profit],
      steps: [
        { eyebrow: '数据事实', title: '7 家新店亏损 63.4 万', detail: '这 7 家门店与成熟门店采用了相同的环比基线。', tone: 'source' },
        { eyebrow: '筛选条件', title: '未限制门店开业时长', detail: '当前仅筛选华东区和已完成订单。', tone: 'warning' },
        { eyebrow: '可修正项', title: '改用可比门店口径', detail: '可排除开业不足 90 天门店并局部重算。', tone: 'calculation' },
      ],
    },
    action: {
      description: '一旦修正门店范围，建议内容也需要同步重算。',
      sources: [sources.promotionPractice, sources.orders, sources.profit],
      steps: [
        { eyebrow: '依赖结论', title: '客单价是首要原因', detail: '当前建议由该推断直接生成。', tone: 'inference' },
        { eyebrow: '影响提醒', title: '修正后建议可能变化', detail: '数据来源和时间范围不变，仅重算原因与建议。', tone: 'warning' },
      ],
    },
  },
  revised: {
    profit: {
      description: '数据来源与时间范围不变，仅修正门店范围。',
      sources: [sources.profit, sources.stores],
      steps: [
        { eyebrow: '数据事实', title: '可比门店利润 431.7 万', detail: '环比下降 8.4%，较原结论收窄 10.3 个百分点。', tone: 'source' },
        { eyebrow: '修正口径', title: '排除开业不足 90 天门店', detail: '共排除 7 家门店，原始数据未删除。', tone: 'calculation' },
        { eyebrow: '核验结果', title: '范围与口径一致', detail: '修订版本未发现数据缺失或口径冲突。', tone: 'source' },
      ],
    },
    'primary-driver': {
      description: '可比门店口径降低了新店对客单价和利润的共同干扰。',
      sources: [sources.orders, sources.profit, sources.stores],
      steps: [
        { eyebrow: '数据事实', title: '履约成本率上升 4.7pp', detail: '上海和宁波的即时配送订单贡献了主要增量。', tone: 'source' },
        { eyebrow: '计算过程', title: '利润变化贡献度为 52%', detail: '高于客单价的 18% 和商品毛利率的 14%。', tone: 'calculation' },
        { eyebrow: 'Agent 推断', title: '履约成本成为首要原因', detail: '该结论适用于可比门店范围，不包含新店爬坡分析。', tone: 'inference' },
      ],
    },
    'new-stores': {
      description: '新店数据仍可单独查看，不影响成熟门店经营判断。',
      sources: [sources.stores],
      steps: [
        { eyebrow: '修正记录', title: '排除 7 家新店', detail: '规则为分析日开业时长不足 90 天。', tone: 'calculation' },
        { eyebrow: '数据处理', title: '原始记录保持不变', detail: '仅在本次回答的分析范围中应用筛选。', tone: 'source' },
      ],
    },
    action: {
      description: '新建议优先处理即时配送成本，而不是扩大促销。',
      sources: [sources.deliveryPractice, sources.orders],
      steps: [
        { eyebrow: '依赖结论', title: '履约成本贡献度 52%', detail: '建议聚焦上海和宁波的配送定价与补贴。', tone: 'inference' },
        { eyebrow: '保留建议', title: '新店采用独立爬坡目标', detail: '避免与成熟门店使用同一经营基线。', tone: 'source' },
      ],
    },
  },
};

export const technicalEvidenceByConclusion: Record<AnswerVersion, Record<ConclusionId, TechnicalEvidence>> = {
  original: {
    profit: {
      executionId: 'qry_profit_7f2a',
      executor: 'governed_sql.query',
      elapsed: '486 ms',
      result: '2 行',
      fields: ['month', 'net_profit'],
      statementLabel: 'Mock SQL',
      statement: `SELECT month, SUM(net_profit) AS net_profit
FROM governed_profit_fact
WHERE region = '华东区'
  AND month IN ('2026-06', '2026-07')
GROUP BY month;`,
      trace: '结论引用查询结果第 1 至 2 行，利润口径来自“区域利润表 v4.6”。',
    },
    'primary-driver': {
      executionId: 'qry_ticket_c814',
      executor: 'governed_sql.query',
      elapsed: '738 ms',
      result: '12 行',
      fields: ['city', 'month', 'order_count', 'avg_ticket'],
      statementLabel: 'Mock SQL',
      statement: `SELECT city, month,
  COUNT(DISTINCT order_id) AS order_count,
  SUM(paid_amount) / COUNT(DISTINCT order_id) AS avg_ticket
FROM governed_order_fact
WHERE region = '华东区' AND order_status = '已完成'
  AND month IN ('2026-06', '2026-07')
GROUP BY city, month;`,
      trace: '贡献度计算读取上海 6 月与 7 月结果，当前未限制门店开业时长。',
    },
    'new-stores': {
      executionId: 'qry_new_store_91bd',
      executor: 'governed_sql.query',
      elapsed: '352 ms',
      result: '7 行',
      fields: ['store_id', 'opened_at', 'net_profit'],
      statementLabel: 'Mock SQL',
      statement: `SELECT store_id, opened_at, SUM(net_profit) AS net_profit
FROM governed_store_profit
WHERE region = '华东区'
  AND opened_at >= DATE '2026-05-03'
  AND month = '2026-07'
GROUP BY store_id, opened_at;`,
      trace: '7 家门店均可回溯至门店主数据，亏损合计 63.4 万。',
    },
    action: {
      executionId: 'rule_action_42ac',
      executor: 'best_practice.retrieve',
      elapsed: '214 ms',
      result: '2 条引用',
      fields: ['primary_driver', 'practice_id', 'scope'],
      statementLabel: '生成规则',
      statement: `MATCH primary_driver = '上海客单价'
WITH practice_library('区域促销诊断')
RETURN top_recommendations LIMIT 2;`,
      trace: '引用《区域门店促销诊断 v3.2》第 4.1 节，建议依赖当前原因排序。',
    },
  },
  revised: {
    profit: {
      executionId: 'qry_profit_b593',
      executor: 'governed_sql.query',
      elapsed: '624 ms',
      result: '2 行',
      fields: ['month', 'comparable_profit'],
      statementLabel: 'Mock SQL',
      statement: `WITH comparable_stores AS (
  SELECT store_id FROM governed_store_dim
  WHERE DATEDIFF(DATE '2026-07-31', opened_at) >= 90
)
SELECT month, SUM(net_profit) AS comparable_profit
FROM governed_profit_fact JOIN comparable_stores USING (store_id)
WHERE month IN ('2026-06', '2026-07')
GROUP BY month;`,
      trace: '本次只增加可比门店筛选，数据来源、月份和利润公式保持不变。',
    },
    'primary-driver': {
      executionId: 'qry_cost_2de8',
      executor: 'governed_sql.query',
      elapsed: '816 ms',
      result: '12 行',
      fields: ['city', 'month', 'fulfillment_rate', 'profit_delta'],
      statementLabel: 'Mock SQL',
      statement: `SELECT city, month,
  SUM(fulfillment_cost) / SUM(paid_amount) AS fulfillment_rate,
  SUM(net_profit) AS profit_delta
FROM comparable_store_orders
WHERE region = '华东区' AND order_status = '已完成'
  AND month IN ('2026-06', '2026-07')
GROUP BY city, month;`,
      trace: '贡献度计算读取上海与宁波结果，履约成本率贡献度为 52%。',
    },
    'new-stores': {
      executionId: 'qry_scope_5ca1',
      executor: 'governed_sql.query',
      elapsed: '298 ms',
      result: '7 行',
      fields: ['store_id', 'opened_at', 'active_days'],
      statementLabel: 'Mock SQL',
      statement: `SELECT store_id, opened_at,
  DATEDIFF(DATE '2026-07-31', opened_at) AS active_days
FROM governed_store_dim
WHERE region = '华东区'
  AND DATEDIFF(DATE '2026-07-31', opened_at) < 90;`,
      trace: '返回的 7 家门店仅从本次可比分析中排除，原始记录未删除。',
    },
    action: {
      executionId: 'rule_action_a728',
      executor: 'best_practice.retrieve',
      elapsed: '196 ms',
      result: '3 条引用',
      fields: ['primary_driver', 'city', 'practice_id'],
      statementLabel: '生成规则',
      statement: `MATCH primary_driver = '履约成本率'
  AND city IN ('上海', '宁波')
WITH practice_library('即时配送成本治理')
RETURN top_recommendations LIMIT 3;`,
      trace: '引用《即时配送成本治理手册 v2.4》第 3.2 节，建议范围与修订结论一致。',
    },
  },
};

export const comparisonRows = [
  { label: '利润降幅', before: '-18.7%', after: '-8.4%', change: '收窄 10.3pp' },
  { label: '首要原因', before: '上海客单价', after: '履约成本率', change: '原因排序变化' },
  { label: '建议重点', before: '调整促销结构', after: '核查配送成本', change: '行动方向变化' },
] as const;

export const correctionSuggestion = '分析时排除开业不足 90 天的新店，只比较可比门店。';
