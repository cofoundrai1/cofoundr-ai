import React, { useState } from 'react';
import { CFMonogram } from './CFMonogram';
import {
  Users,
  Award,
  Calendar,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Shield,
  Star,
  Clock,
  X
} from 'lucide-react';

interface Advisor {
  id: string;
  name: string;
  role: string;
  category: 'ai-deeptech' | 'saas' | 'fintech' | 'healthtech';
  type: 'Hybrid Board Member' | 'AI Persona Director' | 'Venture Partner';
  credentials: string;
  exitsAndBacking: string;
  availability: string;
  domains: string[];
  hourlyRate: string;
  bio: string;
  rating: number;
  reviewsCount: number;
}

const ADVISORS_DATA: Advisor[] = [
  {
    id: 'sarah-lin',
    name: 'Sarah Lin',
    role: 'Managing Partner & Enterprise SaaS Director',
    category: 'saas',
    type: 'Hybrid Board Member',
    credentials: 'Ex-Sequoia Partner, Board Member at 3 Unicorns',
    exitsAndBacking: '$1.4B in cumulative exits (DataStream, CloudPulse)',
    availability: '2 slots open this quarter',
    domains: ['B2B SaaS', 'Enterprise Contracts', 'Board Governance'],
    hourlyRate: '$650 / hr (or 0.25% equity)',
    bio: 'Specializes in scaling revenue from $1M to $25M ARR, restructuring sales leadership, and orchestrating Tier-1 venture syndicate rounds.',
    rating: 4.98,
    reviewsCount: 42,
  },
  {
    id: 'dr-marcus-kane',
    name: 'Dr. Marcus Kane (AI Synthetic)',
    role: 'Principal AI Infrastructure & Architecture Fellow',
    category: 'ai-deeptech',
    type: 'AI Persona Director',
    credentials: 'Trained on 4,000+ Distributed System Outages & Scaled LLM Deployments',
    exitsAndBacking: 'Ex-DeepMind Research, Stanford AI Lab Fellow',
    availability: 'Always available (Instant sync)',
    domains: ['GPU Orchestration', 'Model Distillation', 'Sub-50ms P99'],
    hourlyRate: 'Included in Venture Tier',
    bio: 'Deterministic AI system architect capable of auditing multi-cloud GPU pipelines, vector database clustering, and fine-tuning workloads.',
    rating: 4.95,
    reviewsCount: 88,
  },
  {
    id: 'alex-vance',
    name: 'Alexandra Vance',
    role: 'FinTech Regulatory & Institutional Capital Lead',
    category: 'fintech',
    type: 'Hybrid Board Member',
    credentials: 'Former General Counsel & Chief Risk Officer at Stripe UK',
    exitsAndBacking: 'Advised on 14 cross-border FinTech licensing mandates',
    availability: '1 advisory seat open',
    domains: ['Banking-as-a-Service', 'SEC/FCA Compliance', 'Tokenomics'],
    hourlyRate: '$750 / hr',
    bio: 'Guides pre-seed to Series B FinTech founders through regulatory compliance, partner bank agreements, and institutional risk mitigation.',
    rating: 5.0,
    reviewsCount: 31,
  },
  {
    id: 'dr-maya-chen',
    name: 'Dr. Maya Chen',
    role: 'BioTech & Clinical AI Governance Partner',
    category: 'healthtech',
    type: 'Hybrid Board Member',
    credentials: 'FDA Regulatory Panelist, MIT Bioengineering Faculty',
    exitsAndBacking: 'Co-founded GenoSynthetics (Acquired for $380M)',
    availability: 'Limited to 2 venture cohorts',
    domains: ['FDA 510(k) Clearance', 'HIPAA Architecture', 'Clinical Trials'],
    hourlyRate: '$700 / hr',
    bio: 'Expert in navigating FDA clearance pathways for clinical AI tools, institutional IRB approvals, and healthcare hospital system procurement.',
    rating: 4.92,
    reviewsCount: 19,
  },
  {
    id: 'jordan-blake',
    name: 'Jordan Blake (AI Synthetic)',
    role: 'Viral Growth & Consumer Acquisition Strategist',
    category: 'saas',
    type: 'AI Persona Director',
    credentials: 'Trained on top 500 Y Combinator consumer & PLG growth playbooks',
    exitsAndBacking: 'Analyzed 12,000+ consumer onboarding funnels',
    availability: 'Always available (Instant sync)',
    domains: ['Product-Led Growth', 'Payback Period', 'Viral K-Factor'],
    hourlyRate: 'Included in Venture Tier',
    bio: 'Formulates algorithmic growth loops, viral referral mechanics, and high-converting paywall architecture for mobile and web products.',
    rating: 4.89,
    reviewsCount: 64,
  },
];

export const AdvisoryBoard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai-deeptech' | 'saas' | 'fintech' | 'healthtech'>('all');
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const [bookingDate, setBookingDate] = useState('2026-11-12');
  const [agenda, setAgenda] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [appointedBoard, setAppointedBoard] = useState<string[]>(['dr-marcus-kane']);

  const filteredAdvisors = ADVISORS_DATA.filter(
    (advisor) => activeFilter === 'all' || advisor.category === activeFilter
  );

  const handleToggleBoard = (id: string) => {
    if (appointedBoard.includes(id)) {
      setAppointedBoard((prev) => prev.filter((item) => item !== id));
    } else {
      setAppointedBoard((prev) => [...prev, id]);
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedAdvisor(null);
      setAgenda('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Institutional Governance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Advisory Board Marketplace
          </h2>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Assemble your dream startup board. Combine vetted human partners who have steered venture-backed IPOs with specialized 24/7 AI persona directors.
          </p>
        </div>

        {/* Current Board Composition Counter */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center gap-4 shrink-0">
          <div className="flex -space-x-2">
            <CFMonogram size="xs" />
            <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-900">
              SL
            </div>
            <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-900">
              MK
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Active Board Seats</div>
            <div className="text-sm font-bold text-white font-mono-nums">
              {appointedBoard.length} Directors Appointed
            </div>
          </div>
        </div>
      </div>

      {/* Domain Filters (Segmented Filter Controls - Interactive) */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All Disciplines' },
          { id: 'ai-deeptech', label: 'AI & DeepTech' },
          { id: 'saas', label: 'Enterprise SaaS' },
          { id: 'fintech', label: 'FinTech & Capital' },
          { id: 'healthtech', label: 'Bio & HealthTech' },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id as any)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeFilter === filter.id
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Advisors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAdvisors.map((advisor) => {
          const isAppointed = appointedBoard.includes(advisor.id);
          return (
            <div
              key={advisor.id}
              className={`bg-slate-900/85 border rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 ${
                isAppointed
                  ? 'border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Advisor Type & Rating */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-cyan-400 font-medium">
                    {advisor.type}
                  </span>
                  <div className="flex items-center gap-1 text-slate-300 font-mono-nums">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{advisor.rating}</span>
                    <span className="text-slate-500">({advisor.reviewsCount})</span>
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-bold text-white mb-1">{advisor.name}</h3>
                <p className="text-xs text-slate-400 font-medium mb-3">{advisor.role}</p>

                {/* Bio */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {advisor.bio}
                </p>

                {/* Track Record & Credentials */}
                <div className="space-y-2 mb-5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      Track Record
                    </div>
                    <div className="text-slate-200 font-medium mt-0.5">{advisor.credentials}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      Verified Exits &amp; Impact
                    </div>
                    <div className="text-emerald-400 font-mono-nums mt-0.5">
                      {advisor.exitsAndBacking}
                    </div>
                  </div>
                </div>

                {/* Domain Focus Tags (Zero-Pill Compliant text list) */}
                <div className="text-xs text-slate-400 mb-5">
                  <span className="text-slate-500">Focus: </span>
                  {advisor.domains.join(' · ')}
                </div>
              </div>

              {/* Bottom Actions: Appoint & Book */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <button
                  onClick={() => handleToggleBoard(advisor.id)}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
                    isAppointed
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {isAppointed ? 'Board Appointed ✓' : '+ Appoint Seat'}
                </button>

                <button
                  onClick={() => setSelectedAdvisor(advisor)}
                  className="py-2 px-3 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
                >
                  Book Session
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Consultation Modal */}
      {selectedAdvisor && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0A192F] border border-slate-700 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedAdvisor(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingConfirmed ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">Board Session Confirmed!</h3>
                <p className="text-xs text-slate-300">
                  Calendar invitation sent to your primary email with encrypted room link.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking}>
                <div className="flex items-center gap-3 mb-4">
                  <CFMonogram size="sm" />
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedAdvisor.name}</h3>
                    <p className="text-xs text-cyan-400">{selectedAdvisor.hourlyRate}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Session Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Board Agenda &amp; Focus Area</label>
                    <textarea
                      rows={3}
                      value={agenda}
                      onChange={(e) => setAgenda(e.target.value)}
                      placeholder="e.g., We need to evaluate whether to accept a $1.2M SAFE with an MFN clause, or hold out for a priced round."
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedAdvisor(null)}
                    className="flex-1 py-2.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
                  >
                    Confirm Booking
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
