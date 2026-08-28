import { ShieldCheck } from 'lucide-react';

import { AnalysisAnswer } from './components/AnalysisAnswer';
import { AppSidebar } from './components/AppSidebar';
import { EvidencePanel } from './components/EvidencePanel';
import type { ConclusionId } from './data/scenario';
import { useAnalysisFlow } from './hooks/useAnalysisFlow';

function App() {
  const flow = useAnalysisFlow();
  const showDemoGuide = new URLSearchParams(window.location.search).get('study') !== '1';

  const focusEvidencePanel = () => {
    if (window.matchMedia('(max-width: 1279px)').matches) {
      window.requestAnimationFrame(() => {
        document.getElementById('evidence-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  const handleSelectConclusion = (id: ConclusionId) => {
    flow.openConclusion(id);
    focusEvidencePanel();
  };

  const handleViewEvidence = () => {
    flow.showEvidence();
    focusEvidencePanel();
  };

  const handleResolveAmbiguity = () => {
    flow.resolveAmbiguousCorrection();
    focusEvidencePanel();
  };

  const handleGuideAction = () => {
    if (flow.hasRevision) {
      document.getElementById('answer-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (flow.stage === 'evidence') {
      if (window.matchMedia('(min-width: 1280px)').matches) {
        flow.startCorrection();
      }
    }

    focusEvidencePanel();
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <div className="grid min-h-screen xl:grid-cols-[232px_minmax(0,1fr)_380px]">
        <AppSidebar />

        <main id="main-content" className="min-w-0 bg-canvas">
          <div className="flex min-h-14 items-center justify-between border-b border-line bg-panel px-4 xl:hidden">
            <div className="flex items-center gap-2.5">
              <div className="grid size-8 place-items-center rounded-lg bg-primary-600 text-[11px] font-bold text-white">D</div>
              <div>
                <p className="text-xs font-semibold">Dora Amend</p>
                <p className="text-[10px] text-muted">可信回答原型</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-[10px] font-semibold text-success">
              <ShieldCheck className="size-3" aria-hidden="true" />
              可核验回答
            </span>
          </div>

          <AnalysisAnswer
            hasRevision={flow.hasRevision}
            onGuideAction={handleGuideAction}
            onInspectException={focusEvidencePanel}
            onReset={flow.resetDemo}
            onReturnNormal={() => flow.changeDemoScenario('normal')}
            onScenarioChange={flow.changeDemoScenario}
            onVersionChange={flow.viewVersion}
            onSelectConclusion={handleSelectConclusion}
            onViewEvidence={handleViewEvidence}
            selectedConclusionId={flow.selectedConclusionId}
            scenario={flow.demoScenario}
            showDemoGuide={showDemoGuide}
            stage={flow.stage}
            version={flow.version}
          />
        </main>

        <EvidencePanel
          correctionError={flow.correctionError}
          correctionText={flow.correctionText}
          demoScenario={flow.demoScenario}
          newStoreDays={flow.newStoreDays}
          onConfirmRerun={flow.confirmRerun}
          onCorrectionTextChange={flow.updateCorrectionText}
          onEditCorrection={flow.startCorrection}
          onPreviewCorrection={flow.previewCorrection}
          onReset={flow.resetDemo}
          onResolveAmbiguity={handleResolveAmbiguity}
          onReturnNormal={() => flow.changeDemoScenario('normal')}
          onShowEvidence={flow.showEvidence}
          onStartCorrection={flow.startCorrection}
          onViewVersion={flow.viewVersion}
          rerunStep={flow.rerunStep}
          selectedConclusionId={flow.selectedConclusionId}
          stage={flow.stage}
          version={flow.version}
        />
      </div>
    </div>
  );
}

export default App;
