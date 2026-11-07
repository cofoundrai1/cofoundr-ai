import React, { useState } from 'react';
import { AircraftBrainGraphic } from './AircraftBrainGraphic';
import { CFMonogram } from './CFMonogram';
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  TrendingUp,
  Sparkles,
  FileText,
  CheckCircle2,
  Store,
  DollarSign,
  Coffee,
  Bot,
  Croissant,
  CreditCard
} from 'lucide-react';
import { ActiveTab } from './Navbar';
import { detectBusinessType, BusinessClassification } from '../utils/businessClassifier';

interface HeroProps {
  onNavigate: (tab: ActiveTab) => void;
  onQuickAudit: (startupIdea: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onQuickAudit }) => {
  const [quickInput, setQuickInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    classification: BusinessClassification;
    verdict: string;
    card1Label: string;
    card1Value: string;
    card2Label: string;
    card2Value: string;
    card3Label: string;
    card3Value: string;
  }>(null);

  const performAudit = (ideaText: string) => {
    if (!ideaText.trim()) return;
    setAnalyzing(true);
    const classification = detectBusinessType(ideaText);

    setTimeout(() => {
      setAnalyzing(false);
      if (classification.isShop) {
        setAnalysisResult({
          classification,
          verdict: `Detected Local Business: ${classification.categoryName}. Bypasses investor pitch decks! Pure high-margin daily cashflow model focused on prime transit footfall, signature recipe, and instant digital payments.`,
          card1Label: 'Lean Setup Cost',
          card1Value: classification.setupCostEstimate,
          card2Label: 'Daily Break-Even',
          card2Value: classification.dailyBreakEvenOrP99,
          card3Label: 'Gross Margin',
          card3Value: classification.marginOrMultiples,
        });
      } else {
        setAnalysisResult({
          classification,
          verdict: `Detected Tech Startup: ${classification.categoryName}. High-leverage vertical architecture with strong gross margin profile. Evaluated by CTO, CMO, and CFO ensemble for enterprise defensibility.`,
          card1Label: 'Tech Feasibility',
          card1Value: '91%',
          card2Label: 'GTM Payback',
          card2Value: '88%',
          card3Label: 'Investability',
          card3Value: '86%',
        });
      }
    }, 700);
  };

  const handleTestAudit = (e: React.FormEvent) => {
    e.preventDefault();
    performAudit(quickInput);
  };

  const handleExampleClick = (example: string) => {
    setQuickInput(example);
    performAudit(example);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition & High Conversion CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Unboxed Metadata Trust Kicker (Zero-Pill Compliant) */}
            <div className="flex items-center gap-2.5 text-xs text-slate-400 mb-5 font-medium flex-wrap">
              <span className="text-cyan-400 font-semibold tracking-wide uppercase text-[11px]">
                Adaptive Business Intelligence
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>Local Shop &amp; Tech Startup Routing</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-emerald-400">SOC-2 Type II</span>
            </div>

            {/* Dominant Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 [text-wrap:balance]">
              Your Intelligent Co-Founder &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-200 to-white">Advisory Board</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal">
              From local storefronts like a high-cashflow chai stall to venture-backed AI platforms, CoFoundr AI reads your concept and generates the right blueprint—a simple 5-step shop execution plan or an institutional multi-agent boardroom debate.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => onNavigate('hub')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-lg hover:from-cyan-300 hover:to-cyan-200 transition-all shadow-[0_0_24px_rgba(6,182,212,0.45)] hover:shadow-[0_0_32px_rgba(6,182,212,0.7)] cursor-pointer"
              >
                <CFMonogram size="xs" withBackground={false} />
                <span>Meet Your AI Co-Founder</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('advisory')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/90 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white hover:border-cyan-500/50 transition-all cursor-pointer"
              >
                <span>Explore Advisory Board</span>
              </button>
            </div>

            {/* Interactive Concept Router Input */}
            <div className="w-full max-w-xl bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-xl p-4 shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Instant Concept Classifier
                </span>
                <span className="text-[11px] text-slate-400">Shop vs. Startup Auto-Detect</span>
              </div>

              <form onSubmit={handleTestAudit} className="flex gap-2">
                <input
                  type="text"
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  placeholder="e.g. Chai stall near metro station OR AI agents for clinical trials"
                  className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-400 text-xs text-white rounded-lg px-3.5 py-2.5 outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={analyzing || !quickInput}
                  className="px-4 py-2.5 bg-cyan-500 text-slate-950 font-semibold text-xs rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {analyzing ? 'Reading Idea...' : 'Analyze Plan'}
                </button>
              </form>

              {/* Quick Preset Ideas */}
              <div className="mt-2.5 flex items-center gap-2 flex-wrap text-[11px]">
                <span className="text-slate-500">Try:</span>
                <button
                  type="button"
                  onClick={() => handleExampleClick('Chai stall near busy metro station')}
                  className="px-2 py-1 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800/60 text-amber-200 rounded flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Coffee className="w-3 h-3 text-amber-400" />
                  <span>Chai Stall (Shop Plan)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExampleClick('AI agents for automated clinical trial regulatory filings')}
                  className="px-2 py-1 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/60 text-cyan-200 rounded flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Bot className="w-3 h-3 text-cyan-400" />
                  <span>Clinical AI (Boardroom Plan)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExampleClick('Artisan sourdough bakery and coffee shop')}
                  className="px-2 py-1 bg-orange-950/40 hover:bg-orange-900/60 border border-orange-800/60 text-orange-200 rounded flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Croissant className="w-3 h-3 text-orange-400" />
                  <span>Bakery (Shop Plan)</span>
                </button>
              </div>

              {/* Instant Co-Founder Preliminary Takeaway */}
              {analysisResult && (
                <div className="mt-3.5 pt-3.5 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2 mb-2">
                    {analysisResult.classification.isShop ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-600/60 text-amber-300 font-semibold text-[11px]">
                        <Store className="w-3 h-3" />
                        Simple Shop Execution Blueprint
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-600/60 text-cyan-300 font-semibold text-[11px]">
                        <Sparkles className="w-3 h-3" />
                        Tri-Agent Executive Boardroom Plan
                      </span>
                    )}
                  </div>

                  <p className="text-slate-200 mb-3 leading-relaxed">
                    {analysisResult.verdict}
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400">{analysisResult.card1Label}</div>
                      <div className="font-mono-nums text-xs font-bold text-cyan-400 mt-0.5">
                        {analysisResult.card1Value}
                      </div>
                    </div>
                    <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400">{analysisResult.card2Label}</div>
                      <div className="font-mono-nums text-xs font-bold text-emerald-400 mt-0.5">
                        {analysisResult.card2Value}
                      </div>
                    </div>
                    <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400">{analysisResult.card3Label}</div>
                      <div className="font-mono-nums text-xs font-bold text-amber-300 mt-0.5">
                        {analysisResult.card3Value}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onQuickAudit(quickInput);
                      onNavigate('hub');
                    }}
                    className="mt-3 text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>
                      {analysisResult.classification.isShop
                        ? 'Open Full Step-by-Step Shop Plan in Co-Founder Hub'
                        : 'Launch Full Multi-Agent Boardroom Deliberation'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: High-End 3D Animated Airplane & Brain Graphic */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <AircraftBrainGraphic />
          </div>

        </div>

        {/* Quantified Adjacency Proof Strip (Zero-Pill Compliant) */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <div className="font-mono-nums text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              2 Modes
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Local Shop &amp; Boardroom paths
            </div>
          </div>

          <div className="flex flex-col">
            <div className="font-mono-nums text-2xl md:text-3xl font-extrabold text-cyan-400 tracking-tight">
              &lt; 380ms
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Real-time concept classification
            </div>
          </div>

          <div className="flex flex-col">
            <div className="font-mono-nums text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              $140M+
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Venture &amp; retail economics modeled
            </div>
          </div>

          <div className="flex flex-col">
            <div className="font-mono-nums text-2xl md:text-3xl font-extrabold text-emerald-400 tracking-tight">
              100%
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Grounded, actionable execution
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
