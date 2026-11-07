import React, { useState } from 'react';
import { CFMonogram } from './CFMonogram';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Cpu,
  ShieldAlert,
  ArrowRight,
  Download,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { ActiveTab } from './Navbar';

interface PitchDiagnosticsViewProps {
  onNavigateToHub: () => void;
}

interface DeckSlideReview {
  id: number;
  title: string;
  category: string;
  score: number;
  verdict: string;
  strengths: string[];
  vulnerabilities: string[];
  investorQuestions: string[];
}

const SAMPLE_SLIDES: DeckSlideReview[] = [
  {
    id: 1,
    title: 'The Problem: Unsynchronized Founder Governance',
    category: 'Problem Definition',
    score: 94,
    verdict: 'Excellent real-world urgency. Demonstrates clear quantifiable founder burn rate.',
    strengths: [
      'Identifies $340B lost annually in premature startup scaling',
      'Quotes verified exit statistics from top-tier venture funds',
    ],
    vulnerabilities: [
      'Could cite specific enterprise founder case study',
    ],
    investorQuestions: [
      'Why hasn’t a legacy advisory firm or incubators solved this already?',
    ],
  },
  {
    id: 2,
    title: 'The Solution: Autonomous Tri-Agent Executive Suite',
    category: 'Product & IP Defensibility',
    score: 86,
    verdict: 'Strong product value proposition. Requires stronger technical moat articulation.',
    strengths: [
      'Clearly maps CTO, CMO, and CFO responsibilities to agents',
      'Highlights deterministic audit logs and SOC-2 Type II standards',
    ],
    vulnerabilities: [
      'Needs explicit distinction from generic LLM chat wrappers',
    ],
    investorQuestions: [
      'What proprietary fine-tuning or private data feeds train these agents?',
    ],
  },
  {
    id: 3,
    title: 'Market Opportunity: $48B Venture & Accelerator TAM',
    category: 'Market Sizing',
    score: 92,
    verdict: 'Credible bottom-up methodology rather than lazy top-down IDC quotes.',
    strengths: [
      'Segmented by pre-seed, seed, and venture studio cohorts',
      'Realistic penetration assumptions (1.2% by Year 3)',
    ],
    vulnerabilities: [
      'Should mention corporate venture capital (CVC) expansion pathway',
    ],
    investorQuestions: [
      'How does your international pricing adapt outside the US?',
    ],
  },
  {
    id: 4,
    title: 'Business Model: $49/mo to $199/mo + Advisory Marketplace',
    category: 'Unit Economics & Monetization',
    score: 79,
    verdict: 'High gross margins, but CAC recovery timeline needs empirical validation.',
    strengths: [
      '84% gross software margin model',
      'Dual monetization: SaaS subscriptions + marketplace rake',
    ],
    vulnerabilities: [
      'Underestimates enterprise sales cycle length (currently modeled at 14 days)',
    ],
    investorQuestions: [
      'What is your target blended CAC across developer communities vs accelerators?',
    ],
  },
  {
    id: 5,
    title: 'The Ask: $2.5M Seed to Scale Distributed Agent Infrastructure',
    category: 'Capital Allocation & Runway',
    score: 91,
    verdict: 'Prudent 18-month runway allocation with clear milestone gate at $2M ARR.',
    strengths: [
      'Detailed hiring schedule: 4 distributed engineers, 2 GTM specialists',
      'Explicit Series A milestone goals defined',
    ],
    vulnerabilities: [
      'Cloud GPU compute reserve could use a 15% buffer contingency',
    ],
    investorQuestions: [
      'What if Series A valuation multiples contract further over the next 12 months?',
    ],
  },
];

export const PitchDiagnosticsView: React.FC<PitchDiagnosticsViewProps> = ({ onNavigateToHub }) => {
  const [selectedSlide, setSelectedSlide] = useState<DeckSlideReview>(SAMPLE_SLIDES[0]);
  const [activeDeckName, setActiveDeckName] = useState('Synthex_AI_Seed_Pitch_Deck.pdf');

  const overallScore = Math.round(
    SAMPLE_SLIDES.reduce((acc, curr) => acc + curr.score, 0) / SAMPLE_SLIDES.length
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Slide-by-Slide Venture Audit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pitch Deck Diagnostics Studio
          </h2>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Every slide audited against 15,000+ institutional seed and Series A pitch decks. Identify blind spots, valuation discrepancies, and tough investor questions before entering partner meetings.
          </p>
        </div>

        {/* Global Deck Score Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-6 shrink-0 shadow-lg">
          <div>
            <div className="text-xs text-slate-400 font-medium">Readiness Index</div>
            <div className="font-mono-nums text-4xl font-extrabold text-cyan-400 mt-0.5">
              {overallScore} <span className="text-sm text-slate-500 font-normal">/ 100</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-medium mt-1">
              Top 8% of Venture Submissions
            </div>
          </div>
          <div className="h-12 w-px bg-slate-800" />
          <button
            onClick={onNavigateToHub}
            className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Ask Co-Founder to Fix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main 2-Column Split: Slide Selector on Left, Slide Deep-Dive on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Slides List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-slate-200">Deck Slide Index</span>
            <span className="font-mono-nums">{SAMPLE_SLIDES.length} Slides Audited</span>
          </div>

          {SAMPLE_SLIDES.map((slide) => {
            const isSelected = selectedSlide.id === slide.id;
            return (
              <button
                key={slide.id}
                onClick={() => setSelectedSlide(slide)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/70 shadow-[0_0_16px_rgba(6,182,212,0.15)]'
                    : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono-nums text-xs font-bold shrink-0 ${
                      isSelected
                        ? 'bg-cyan-400 text-slate-950'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {slide.id}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white line-clamp-1">
                      {slide.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {slide.category}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className={`font-mono-nums text-sm font-extrabold ${
                      slide.score >= 90
                        ? 'text-emerald-400'
                        : slide.score >= 80
                        ? 'text-cyan-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {slide.score}%
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Slide Comprehensive Analysis */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="font-mono-nums text-xs font-bold px-2.5 py-1 rounded bg-slate-800 text-cyan-400">
                  Slide {selectedSlide.id}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {selectedSlide.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Slide Grade:</span>
                <span className="font-mono-nums text-lg font-bold text-cyan-400">
                  {selectedSlide.score}%
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 leading-snug">
              {selectedSlide.title}
            </h3>

            {/* Verdict Box */}
            <div className="mb-6 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
              <strong className="text-cyan-400 font-semibold block mb-1">Co-Founder Diagnostic Verdict:</strong>
              {selectedSlide.verdict}
            </div>

            {/* Strengths & Vulnerabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-xs">
              {/* Strengths */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-emerald-400 font-semibold flex items-center gap-1.5 mb-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Key Investor Strengths</span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  {selectedSlide.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vulnerabilities */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-amber-400 font-semibold flex items-center gap-1.5 mb-2.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Venture Vulnerabilities</span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  {selectedSlide.vulnerabilities.map((vuln, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400">!</span>
                      <span>{vuln}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Likely Partner Meeting Questions */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
              <div className="text-cyan-400 font-semibold flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulated Partner Interview Questions</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                {selectedSlide.investorQuestions.map((q, i) => (
                  <li key={i} className="italic text-slate-200">
                    "{q}"
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Strip */}
          <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Deck Source: <strong className="text-white">{activeDeckName}</strong>
            </span>
            <button
              onClick={onNavigateToHub}
              className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Draft Revision with Elena (IR Co-Founder)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
