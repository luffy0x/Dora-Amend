import { useEffect, useState } from 'react';

import { correctionSuggestion, type AnswerVersion, type ConclusionId } from '../data/scenario';

export type FlowStage = 'evidence' | 'correction' | 'impact' | 'running' | 'comparison';
export type DemoScenario = 'normal' | 'stale' | 'source-unavailable' | 'permission-denied' | 'ambiguous-correction';

export function useAnalysisFlow() {
  const [stage, setStage] = useState<FlowStage>('evidence');
  const [version, setVersion] = useState<AnswerVersion>('original');
  const [hasRevision, setHasRevision] = useState(false);
  const [demoScenario, setDemoScenario] = useState<DemoScenario>('normal');
  const [newStoreDays, setNewStoreDays] = useState(90);
  const [selectedConclusionId, setSelectedConclusionId] = useState<ConclusionId>('primary-driver');
  const [correctionText, setCorrectionText] = useState(correctionSuggestion);
  const [correctionError, setCorrectionError] = useState('');
  const [rerunStep, setRerunStep] = useState(0);

  useEffect(() => {
    if (stage !== 'running') {
      return undefined;
    }

    setRerunStep(0);
    const timers = [
      window.setTimeout(() => setRerunStep(1), 420),
      window.setTimeout(() => setRerunStep(2), 900),
      window.setTimeout(() => {
        setRerunStep(3);
        setHasRevision(true);
        setVersion('revised');
        setSelectedConclusionId('primary-driver');
        setStage('comparison');
      }, 1450),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [stage]);

  const openConclusion = (id: ConclusionId) => {
    setSelectedConclusionId(id);
    setStage('evidence');
  };

  const changeDemoScenario = (scenario: DemoScenario) => {
    setDemoScenario(scenario);
    setHasRevision(false);
    setVersion('original');
    setStage('evidence');
    setSelectedConclusionId('primary-driver');
    setNewStoreDays(90);
    setCorrectionText(correctionSuggestion);
    setCorrectionError('');
    setRerunStep(0);
  };

  const startCorrection = () => {
    setCorrectionError('');
    setStage('correction');
  };

  const showEvidence = () => {
    setStage('evidence');
  };

  const confirmRerun = () => {
    setStage('running');
  };

  const updateCorrectionText = (value: string) => {
    setCorrectionText(value);
    setCorrectionError('');
  };

  const previewCorrection = () => {
    if (!correctionText.trim()) {
      setCorrectionError('请先说明需要修正的分析条件。');
      return;
    }

    const dayValues = [...correctionText.matchAll(/(\d+)\s*天/g)].map((match) => Number(match[1]));
    const uniqueDayValues = [...new Set(dayValues)];
    const hasNegatedExclusion = /(不|不要|无需|取消)\s*(排除|剔除)/.test(correctionText);
    const isSupportedCorrection = uniqueDayValues.length === 1
      && uniqueDayValues[0] === 90
      && /(排除|剔除)/.test(correctionText)
      && /(新店|开业不足)/.test(correctionText)
      && !hasNegatedExclusion;

    if (!isSupportedCorrection) {
      setCorrectionError('当前 Mock 原型仅提供“排除开业不足 90 天新店”的修订结果，请按该口径继续。');
      return;
    }

    setNewStoreDays(90);
    setCorrectionError('');
    setStage('impact');
  };

  const resetDemo = () => {
    setDemoScenario('normal');
    setHasRevision(false);
    setVersion('original');
    setStage('evidence');
    setSelectedConclusionId('primary-driver');
    setNewStoreDays(90);
    setCorrectionText(correctionSuggestion);
    setCorrectionError('');
    setRerunStep(0);
  };

  const resolveAmbiguousCorrection = () => {
    setCorrectionText(`分析时排除开业不足 ${newStoreDays} 天的新店，只比较可比门店。`);
    setDemoScenario('normal');
    setCorrectionError('');
    setStage('impact');
  };

  const viewVersion = (nextVersion: AnswerVersion) => {
    if (nextVersion === 'revised' && !hasRevision) {
      return;
    }

    setVersion(nextVersion);
    setSelectedConclusionId('primary-driver');
    setStage('evidence');
  };

  return {
    changeDemoScenario,
    confirmRerun,
    correctionError,
    correctionText,
    demoScenario,
    hasRevision,
    newStoreDays,
    openConclusion,
    previewCorrection,
    resetDemo,
    rerunStep,
    resolveAmbiguousCorrection,
    selectedConclusionId,
    showEvidence,
    stage,
    startCorrection,
    updateCorrectionText,
    version,
    viewVersion,
  };
}
