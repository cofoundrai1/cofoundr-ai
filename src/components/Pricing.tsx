import React, { useState } from 'react';
import { CFMonogram } from './CFMonogram';
import { Check, Sparkles, Shield, ArrowRight, X, CheckCircle2 } from 'lucide-react';

interface PricingProps {
  onPlanSelected: (planName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onPlanSelected }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlanModal, setSelectedPlanModal] = useState<string | null>(null);
  const [activated, setActivated] = useState(false);

  const plans = [
    {
      name: 'Bootstrap',
      audience: 'For early-stage founders & ideation teams',
      monthlyPrice: 0,
      annualPrice: 0,
      description: 'Essential autonomous co-founder intelligence to validate concepts and audit your initial pitch deck.',
      features: [
        '100 Co-Founder queries / month',
        'Standard Technical & GTM agent access',
        '1 Complete Pitch Deck Diagnostic / month',
        'Standard investor questions generator',
        'Community governance knowledgebase',
      ],
      ctaText: 'Start Free Forever',
      popular: false,
    },
    {
      name: 'Venture',
      audience: 'For active pre-seed & seed fundraising teams',
      monthlyPrice: 49,
      annualPrice: 39,
      description: 'Full autonomous boardroom ensemble with continuous pitch deck optimization and advisory access.',
      features: [
        'Unlimited Tri-Agent Boardroom debates',
        'Elena Rostova (Institutional IR Co-Founder)',
        'Unlimited Slide-by-Slide Pitch Diagnostics',
        'Interactive cap table & dilution modeling',
        'Direct Advisory Board Marketplace booking',
        'Exportable executive memos (Markdown / PDF)',
        'Priority <380ms model inference pipeline',
      ],
      ctaText: 'Launch Venture Tier',
      popular: true,
    },
    {
      name: 'Enterprise Studio',
      audience: 'For venture studios, accelerators & Series A cohorts',
      monthlyPrice: 199,
      annualPrice: 159,
      description: 'Dedicated multi-agent infrastructure with custom model fine-tuning, SOC-2 reports, and human advisory credits.',
      features: [
        'Everything in Venture Tier',
        'Private fine-tuned LLMs on internal proprietary data',
        'Dedicated Human Advisory Director credits ($500/mo included)',
        'SOC-2 Type II audit logs & data isolation',
        'Multi-seat workspace & founder permissions',
        'Custom Slack & Notion workspace integrations',
        'Dedicated venture partner success manager',
      ],
      ctaText: 'Deploy Enterprise Suite',
      popular: false,
    },
  ];

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setActivated(true);
    setTimeout(() => {
      setActivated(false);
      setSelectedPlanModal(null);
      if (selectedPlanModal) {
        onPlanSelected(selectedPlanModal);
      }
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transparent Governance Investment</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Invest in Boardroom Certainty
        </h2>
        <p className="text-base text-slate-300 mt-4 leading-relaxed font-normal">
          No opaque retainers. Get round-the-clock technical, go-to-market, and venture intelligence calibrated for high-trajectory startups.
        </p>

        {/* Billing Switch (Segmented Control - Interactive) */}
        <div className="mt-8 inline-flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Annual (Save 20%)</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
        {plans.map((plan) => {
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          return (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-200 relative ${
                plan.popular
                  ? 'bg-slate-900/95 border-2 border-cyan-400/80 shadow-[0_0_36px_rgba(6,182,212,0.22)]'
                  : 'bg-slate-900/70 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 font-bold text-[11px] uppercase tracking-wider rounded-full shadow-md">
                  Most Popular for Founders
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-cyan-400 font-medium mb-4">{plan.audience}</p>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">{plan.description}</p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-800">
                  <span className="font-mono-nums text-4xl font-extrabold text-white">
                    ${price}
                  </span>
                  <span className="text-xs text-slate-400">
                    {price === 0 ? '/ month' : billingCycle === 'annual' ? '/ mo (billed annually)' : '/ month'}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8 text-xs">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-200">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedPlanModal(plan.name)}
                className={`w-full py-3 px-4 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                <span>{plan.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Trust & SOC-2 Reassurance Strip */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3.5">
          <Shield className="w-8 h-8 text-cyan-400 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-white">Institutional Venture Governance &amp; Security</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Zero training on proprietary founder pitch decks. SOC-2 Type II compliant encryption in transit and at rest.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
          <span>Cancel anytime</span>
          <span>·</span>
          <span>14-day money-back guarantee</span>
          <span>·</span>
          <span>Instant board activation</span>
        </div>
      </div>

      {/* Checkout / Activation Modal */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0A192F] border border-slate-700 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedPlanModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {activated ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">Boardroom Activated!</h3>
                <p className="text-xs text-slate-300">
                  Your executive co-founder ensemble is now active on the {selectedPlanModal} plan.
                </p>
              </div>
            ) : (
              <form onSubmit={handleActivate}>
                <div className="flex items-center gap-3 mb-5">
                  <CFMonogram size="sm" />
                  <div>
                    <h3 className="text-base font-bold text-white">Activate {selectedPlanModal} Tier</h3>
                    <p className="text-xs text-cyan-400">Instant Access to Autonomous Co-Founders</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Startup or Project Name</label>
                    <input
                      type="text"
                      defaultValue="Synthex AI"
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Founder Email</label>
                    <input
                      type="email"
                      defaultValue="founder@synthex.ai"
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedPlanModal(null)}
                    className="flex-1 py-2.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
                  >
                    Confirm &amp; Launch
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
