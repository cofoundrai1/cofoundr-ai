/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { AIChatHub } from './components/AIChatHub';
import { AdvisoryBoard } from './components/AdvisoryBoard';
import { PitchDiagnosticsView } from './components/PitchDiagnosticsView';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { CFMonogram } from './components/CFMonogram';
import {
  Cpu,
  TrendingUp,
  FileText,
  Shield,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Zap,
  BarChart2
} from 'lucide-react';

import { detectBusinessType } from './utils/businessClassifier';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [initialPromptForHub, setInitialPromptForHub] = useState('');
  const [activationNotice, setActivationNotice] = useState<string | null>(null);

  const handleQuickAudit = (idea: string) => {
    const classification = detectBusinessType(idea);
    if (classification.isShop) {
      setInitialPromptForHub(
        `I want to start a ${idea}. Please read my idea and give me a simple shop execution plan with location footfall, equipment costs, and daily profit breakdown.`
      );
    } else {
      setInitialPromptForHub(
        `We are building: "${idea}". Please conduct an executive boardroom triage: What are the biggest technical failure risks, the target ICP, and the investor narrative we must pitch?`
      );
    }
    setActiveTab('hub');
  };

  const handlePlanActivated = (planName: string) => {
    setActivationNotice(`Activated ${planName} Plan — Your Co-Founder boardroom is now initialized!`);
    setTimeout(() => setActivationNotice(null), 4000);
    setActiveTab('hub');
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Universal CF Monogram Ambient Watermark (as specified in Brand Consistency Rules) */}
      <div className="fixed bottom-6 right-6 opacity-[0.08] pointer-events-none z-0">
        <CFMonogram size="2xl" glow={false} withBackground={false} />
      </div>

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDeckUpload={() => setActiveTab('diagnostics')}
      />

      {/* Notification Toast */}
      {activationNotice && (
        <div className="fixed top-20 right-6 z-50 bg-cyan-950 border border-cyan-500/80 text-cyan-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{activationNotice}</span>
        </div>
      )}

      {/* Dynamic Main Viewport */}
      <main className="flex-1 z-10">
        {activeTab === 'overview' && (
          <div>
            {/* Hero Section with 3D Aircraft & Neural Brain Graphic */}
            <Hero
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onQuickAudit={handleQuickAudit}
            />

            {/* Asymmetric Core Capabilities Bento Grid (Landing Reference §2.C) */}
            <section className="py-20 border-t border-slate-800/80 bg-[#070E1A]">
              <div className="max-w-7xl mx-auto px-6">
                
                <div className="mb-14">
                  <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
                    Tri-Agent Architecture
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Engineered to Replace Unstructured Founder Brainstorming
                  </h2>
                  <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                    Solo founders and lean teams face blind spots across technology, pricing models, and investor expectations. CoFoundr AI unifies them into a single deterministic executive consensus.
                  </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Card 1: Product & Tech Agent (col-span-2) */}
                  <div className="md:col-span-2 p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                        <span className="text-cyan-400 font-semibold">01. Technical Co-Founder Engine</span>
                        <Cpu className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Real-Time Architectural Audits &amp; Infrastructure Sizing
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed max-w-xl mb-6">
                        Validate vector index scalability, GPU cold starts, multi-region database replication, and API cost economics before writing a single line of production code.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
                      <div>
                        <div className="text-[10px] text-slate-500">Latency Sizing</div>
                        <div className="font-mono-nums text-sm font-bold text-cyan-400">&lt; 45ms P99</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500">Model Cascade</div>
                        <div className="font-mono-nums text-sm font-bold text-white">Distilled + Frontier</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500">Security Gate</div>
                        <div className="font-mono-nums text-sm font-bold text-emerald-400">SOC-2 Audited</div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Growth & GTM Agent */}
                  <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                        <span className="text-emerald-400 font-semibold">02. Growth &amp; GTM Flywheel</span>
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        ICP Positioning &amp; Pricing Elasticity
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-6">
                        Simulate net revenue retention across seat-based, usage-based, and enterprise pilot tiers with automated CAC payback projections.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('hub')}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Simulate GTM Strategy</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card 3: Pitch Deck Diagnostics Studio */}
                  <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                        <span className="text-purple-400 font-semibold">03. Pitch Deck Teardowns</span>
                        <FileText className="w-5 h-5 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Slide-by-Slide Venture Critique
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-6">
                        Trained on 15,000+ venture presentations to pinpoint hand-wavy defensibility claims and prepare you for partner meeting cross-examination.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('diagnostics')}
                      className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Audit Your Deck</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card 4: Advisory Board Marketplace (col-span-2) */}
                  <div className="md:col-span-2 p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                        <span className="text-cyan-400 font-semibold">04. Hybrid Board Governance</span>
                        <Shield className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Elite Human Advisors + Specialized AI Persona Directors
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed max-w-xl mb-6">
                        Appoint ex-Sequoia partners, FDA clinical specialists, and FinTech risk counsels to your startup advisory board alongside 24/7 AI directors.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="text-white font-semibold">Vetted Roster:</span>
                        <span>FinTech</span>
                        <span>·</span>
                        <span>BioTech</span>
                        <span>·</span>
                        <span>AI Infra</span>
                        <span>·</span>
                        <span>Enterprise SaaS</span>
                      </div>
                      <button
                        onClick={() => setActiveTab('advisory')}
                        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        Explore Marketplace
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Proof of Impact / Founder Case Studies (Landing Reference §2.A) */}
            <section className="py-20 border-t border-slate-800/80">
              <div className="max-w-7xl mx-auto px-6">
                
                <div className="mb-12">
                  <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
                    Verified Outcomes
                  </div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    Venture Trajectory Acceleration
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      company: 'Synapse Data Systems',
                      sector: 'Enterprise AI Infrastructure',
                      metric: '$3.2M Seed Raised',
                      timeline: 'In 28 Days',
                      quote:
                        'The pitch deck diagnostics uncovered a fatal flaw in our unit economics slide that two angel investors had passed on. We fixed the narrative and closed our lead within 3 weeks.',
                      founder: 'David Thorne, CEO',
                    },
                    {
                      company: 'FinFlow Protocol',
                      sector: 'Cross-Border B2B Settlement',
                      metric: '+280% CAC Payback Efficiency',
                      timeline: 'Within 90 Days',
                      quote:
                        'Marcus Sterling, our AI GTM Co-Founder, forced us to abandon broad SMB ads and pivot into mid-market compliance officers. Payback dropped from 8 months to 2.2 months.',
                      founder: 'Mira Sorvino, Co-Founder',
                    },
                    {
                      company: 'BioRegen Health',
                      sector: 'Clinical Pathology AI',
                      metric: 'FDA 510(k) Pre-Submission Cleared',
                      timeline: 'Zero Re-filings',
                      quote:
                        'Our hybrid board advisor Dr. Maya Chen reviewed our clinical dataset architecture and helped us structure our trial endpoints cleanly before our FDA panel.',
                      founder: 'Arun Patel, CTO',
                    },
                  ].map((study, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                          <span className="font-semibold text-white">{study.company}</span>
                          <span>{study.sector}</span>
                        </div>

                        <div className="mb-4">
                          <div className="font-mono-nums text-2xl font-extrabold text-cyan-400">
                            {study.metric}
                          </div>
                          <div className="text-xs text-emerald-400 font-medium mt-0.5">
                            {study.timeline}
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed italic mb-6">
                          "{study.quote}"
                        </p>
                      </div>

                      <div className="text-xs text-slate-400 font-medium pt-3 border-t border-slate-800/60">
                        {study.founder}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* High-Impact Pre-Footer Conversion Callout */}
            <section className="py-16 border-t border-slate-800/80 bg-gradient-to-b from-[#0A192F] to-[#050B14]">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <CFMonogram size="md" className="mx-auto mb-4" />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Ready to Meet Your AI Executive Team?
                </h2>
                <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
                  Stop running your company in isolation. Launch the Co-Founder Hub to debate architectures, optimize GTM models, and audit your pitch deck right now.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setActiveTab('hub');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-lg hover:from-cyan-300 hover:to-cyan-200 transition-all shadow-[0_0_24px_rgba(6,182,212,0.4)] cursor-pointer"
                  >
                    Open AI Co-Founder Hub
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('pricing');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    View Governance Tiers
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Co-Founder Multi-Agent Hub View */}
        {activeTab === 'hub' && (
          <AIChatHub initialPrompt={initialPromptForHub} />
        )}

        {/* Advisory Board Marketplace View */}
        {activeTab === 'advisory' && (
          <AdvisoryBoard />
        )}

        {/* Pitch Diagnostics Standalone Studio View */}
        {activeTab === 'diagnostics' && (
          <PitchDiagnosticsView onNavigateToHub={() => setActiveTab('hub')} />
        )}

        {/* Pricing & Governance Tiers View */}
        {activeTab === 'pricing' && (
          <Pricing onPlanSelected={handlePlanActivated} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}
