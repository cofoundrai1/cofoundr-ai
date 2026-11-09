import React, { useState, useRef, useEffect } from 'react';
import { CFMonogram } from './CFMonogram';
import {
  Send,
  Paperclip,
  Sparkles,
  Cpu,
  TrendingUp,
  Briefcase,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  Copy,
  Check,
  RefreshCw,
  Download,
  Store,
  Coffee,
  DollarSign,
  MapPin,
  Flame,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Bot
} from 'lucide-react';
import { detectBusinessType, BusinessClassification } from '../utils/businessClassifier';

export type AgentRole = 'all' | 'tech' | 'gtm' | 'fundraising' | 'shop_advisor';

export interface ShopPlanData {
  shopType: string;
  locationStrategy: {
    recommendedSpots: string[];
    peakHours: string;
    rentGuideline: string;
  };
  equipmentCosts: {
    item: string;
    cost: string;
  }[];
  totalInitialInvestment: string;
  unitEconomics: {
    sellingPricePerUnit: string;
    costPerUnit: string;
    grossMarginPercent: string;
    dailyVolumeTarget: string;
    estimatedDailyProfit: string;
    estimatedMonthlyTakeHome: string;
  };
  signatureItems: string[];
  launchChecklist: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  agentRole?: AgentRole;
  agentName?: string;
  agentTitle?: string;
  content: string;
  timestamp: string;
  planType?: 'shop_plan' | 'boardroom_plan';
  shopPlan?: ShopPlanData;
  metrics?: {
    feasibility?: number;
    tractionScore?: number;
    investorRisk?: 'Low' | 'Medium' | 'High';
    setupCost?: string;
    breakEven?: string;
  };
  reasoningSteps?: string[];
  deckAudit?: {
    fileName: string;
    overallScore: number;
    slides: {
      slideNumber: number;
      name: string;
      score: number;
      feedback: string;
      status: 'pass' | 'warning' | 'critical';
    }[];
  };
}

const AGENTS = [
  {
    id: 'all' as AgentRole,
    name: 'Smart Consensus',
    title: 'Adaptive Classifier',
    description: 'Auto-detects small shops vs tech startups.',
    icon: Users,
  },
  {
    id: 'shop_advisor' as AgentRole,
    name: 'Retail & Shop Lead',
    title: 'Micro-Retail Execution Specialist',
    description: 'Location footfall, daily cashflow, equipment sourcing, and lean launch.',
    icon: Store,
  },
  {
    id: 'tech' as AgentRole,
    name: 'Dr. Evelyn Vance',
    title: 'Technical Co-Founder & CTO',
    description: 'System architecture, AI latency, model orchestration, and security.',
    icon: Cpu,
  },
  {
    id: 'gtm' as AgentRole,
    name: 'Marcus Sterling',
    title: 'Growth & GTM Co-Founder',
    description: 'ICP positioning, viral distribution loops, pricing elasticity, and CAC/LTV.',
    icon: TrendingUp,
  },
  {
    id: 'fundraising' as AgentRole,
    name: 'Elena Rostova',
    title: 'Venture & IR Co-Founder',
    description: 'Deck teardowns, cap table dilution, valuation multiples, and partner Q&A.',
    icon: Briefcase,
  },
];

const PROMPT_PLAYBOOKS = [
  {
    type: 'shop',
    label: '☕ Chai Stall near Metro',
    prompt: 'I want to start a high-traffic Chai Stall near a busy metro station. Give me a simple, actionable shop plan with location, equipment costs, and daily profit breakdown.',
  },
  {
    type: 'shop',
    label: '🥐 Artisan Neighborhood Bakery',
    prompt: 'I want to open a small artisan bakery and takeaway espresso bar. Give me a simple shop execution plan with daily unit economics, equipment budget, and 7-day launch checklist.',
  },
  {
    type: 'startup',
    label: '🤖 AI Clinical Trial Platform',
    prompt: 'We are building an AI agent orchestration platform for pharmaceutical clinical trial filings. Give us a full Boardroom Plan with architecture scalability, GTM pricing, and Series Seed investor pitch strategy.',
  },
  {
    type: 'startup',
    label: '💳 B2B FinTech Settlement Engine',
    prompt: 'We are developing an instant cross-border settlement API for mid-market importers. Debate as an executive boardroom: tech infrastructure risks, CAC recovery, and investor term sheet defensibility.',
  },
];

interface AIChatHubProps {
  initialPrompt?: string;
}

export const AIChatHub: React.FC<AIChatHubProps> = ({ initialPrompt = '' }) => {
  const [activeAgent, setActiveAgent] = useState<AgentRole>('all');
  const [inputMessage, setInputMessage] = useState(initialPrompt);
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showDeckDrawer, setShowDeckDrawer] = useState(false);
  const [attachedDeck, setAttachedDeck] = useState<string | null>(null);
  const [dailyCupsSlider, setDailyCupsSlider] = useState<number>(300);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasTriggeredInitial = useRef(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      agentRole: 'all',
      agentName: 'CoFoundr AI Adaptive Advisor',
      agentTitle: 'Concept Reader & Router',
      content:
        'Welcome! CoFoundr AI dynamically reads your business idea:\n\n• **If it is a small shop (like a Chai Stall, Cafe, or Bakery):** We bypass complex VC pitch decks and give you a **Simple Shop Plan** focusing on prime footfall locations, lean equipment budgets ($400 - $1,200), daily profit economics, and rapid launch.\n\n• **If it is a tech startup (like an AI platform or SaaS):** We assemble your **Executive Boardroom** with our CTO, CMO, and CFO co-founders to stress-test your system architecture, GTM payback, and venture investability.\n\nEnter your idea below or click a playbook to start.',
      timestamp: 'Today at 09:00 AM',
      reasoningSteps: [
        'Adaptive concept classifier loaded',
        'Small shop & micro-retail cashflow models synchronized',
        'Boardroom multi-agent reasoning active',
      ],
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // If redirected with an initial prompt from the Hero, automatically execute it
  useEffect(() => {
    if (initialPrompt && !hasTriggeredInitial.current) {
      hasTriggeredInitial.current = true;
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isStreaming) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsStreaming(true);

    // Read the user's idea and classify
    const classification = detectBusinessType(text);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const prompt = `You are CoFoundr AI, an expert co-founder. User idea: "${text}". If it's a small shop, give Simple Shop Plan with location, equipment cost, daily profit. If it's a tech startup, give Boardroom Plan with CTO, CMO, CFO advice. Be specific, actionable, in simple English.`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      const data = await res.json();
      const aiContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, AI se jawab nahi mila. Dobara try karo.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        agentRole: activeAgent,
        agentName: 'CoFoundr AI - Real Gemini',
        agentTitle: 'Live AI Co-Founder',
        content: aiContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        planType: 'boardroom_plan',
        reasoningSteps: ['Real Gemini AI se live jawab liya gaya', 'Nakli template hata diya gaya'],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    }
    setIsStreaming(false);
  };
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportMemo = () => {
    const content = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.sender === 'user' ? 'Founder' : m.agentName || 'CoFoundr AI'}:\n${m.content}\n`
      )
      .join('\n---\n\n');
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CoFoundr_Execution_Plan_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Switch from Shop plan to Franchise/Boardroom plan
  const handleUpgradeToFranchise = (shopType: string) => {
    handleSendMessage(
      `We want to scale our ${shopType} from 1 single location into a 25-store regional franchise with centralized supply chain and tech-enabled kiosk ordering. Formulate the Boardroom Scaling Plan!`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-5rem)] flex flex-col">
      {/* Top Header Strip: Mode Indicator & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-4 shrink-0">
        
        {/* Agent Persona Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
          {AGENTS.map((agent) => {
            const Icon = agent.icon;
            const isActive = activeAgent === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => setActiveAgent(agent.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 shadow-sm border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{agent.name}</span>
              </button>
            );
          })}
        </div>

        {/* Boardroom Session Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowDeckDrawer(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Deck Diagnostics</span>
            {attachedDeck && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={handleExportMemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export Plan</span>
          </button>
        </div>
      </div>

      {/* Main Chat Stream Container */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-4">
        {messages.map((message) => {
          const isUser = message.sender === 'user';
          const isShopPlan = message.planType === 'shop_plan';
          const isBoardroomPlan = message.planType === 'boardroom_plan';

          return (
            <div
              key={message.id}
              className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {/* Universal CF Monogram Avatar for AI Responses */}
              {!isUser && (
                <div className="shrink-0 mt-1">
                  <CFMonogram size="sm" />
                </div>
              )}

              {/* Message Content Bubble */}
              <div
                className={`max-w-3xl rounded-2xl p-5 border ${
                  isUser
                    ? 'bg-cyan-950/40 border-cyan-700/40 text-slate-100'
                    : isShopPlan
                    ? 'bg-gradient-to-b from-[#131B2A] to-[#0A1220] border-amber-500/40 text-slate-200 shadow-xl'
                    : 'bg-slate-900/90 border-slate-800/90 text-slate-200'
                }`}
              >
                {/* AI Agent Header & Plan Type Tag */}
                {!isUser && (
                  <div className="flex items-center justify-between gap-4 mb-3 pb-2.5 border-b border-slate-800/60">
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <span className="font-semibold text-white">
                        {message.agentName || 'CoFoundr AI'}
                      </span>
                      <span className="text-slate-600" aria-hidden="true">·</span>
                      
                      {/* Plan Type Pill */}
                      {isShopPlan && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-600/70 text-amber-300 font-semibold text-[11px]">
                          <Store className="w-3 h-3 text-amber-400" />
                          Simple Shop Plan (Cashflow Blueprint)
                        </span>
                      )}

                      {isBoardroomPlan && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-600/70 text-cyan-300 font-semibold text-[11px]">
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          Boardroom Plan (Tri-Agent Consensus)
                        </span>
                      )}

                      {!isShopPlan && !isBoardroomPlan && (
                        <span className="text-cyan-400 text-[11px] font-medium">
                          {message.agentTitle || 'Autonomous Co-Founder'}
                        </span>
                      )}

                      <span className="text-slate-600" aria-hidden="true">·</span>
                      <span className="text-slate-500 font-mono-nums text-[11px]">
                        {message.timestamp}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(message.id, message.content)}
                      className="p-1 rounded text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Copy to clipboard"
                    >
                      {copiedId === message.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}

                {/* Reasoning Steps (if generated) */}
                {message.reasoningSteps && message.reasoningSteps.length > 0 && (
                  <div className="mb-3.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                    <div className="text-cyan-400 font-semibold flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>{isShopPlan ? 'Shop Footfall & Unit Economics Triage' : 'Co-Founder Boardroom Protocol'}</span>
                    </div>
                    {message.reasoningSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className={`w-1 h-1 rounded-full ${isShopPlan ? 'bg-amber-400' : 'bg-cyan-400'}`} />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Text Body */}
                <div className="text-sm leading-relaxed whitespace-pre-wrap font-normal text-slate-200">
                  {message.content}
                </div>

                {/* ===================================================================== */}
                {/* DEDICATED SIMPLE SHOP INTERACTIVE DASHBOARD CARD (If Shop Plan)      */}
                {/* ===================================================================== */}
                {message.shopPlan && (
                  <div className="mt-5 p-4 rounded-xl bg-slate-950/85 border border-amber-500/30 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Interactive Shop Calculator &amp; Economics
                        </span>
                      </div>
                      <span className="text-[11px] text-amber-300 font-medium">
                        Setup Budget: {message.shopPlan.totalInitialInvestment}
                      </span>
                    </div>

                    {/* Interactive Daily Sales & Profit Simulator */}
                    <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-slate-300 font-medium">
                          Simulate Daily Cup / Item Sales:
                        </span>
                        <span className="font-mono-nums font-bold text-amber-400 text-sm">
                          {dailyCupsSlider} sales/day
                        </span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="800"
                        step="25"
                        value={dailyCupsSlider}
                        onChange={(e) => setDailyCupsSlider(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer mb-3"
                      />
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 bg-slate-950 rounded border border-slate-800/80">
                          <div className="text-[10px] text-slate-400">Daily Revenue</div>
                          <div className="font-mono-nums font-bold text-white mt-0.5">
                            ${(dailyCupsSlider * 0.25).toFixed(0)} <span className="text-[10px] text-slate-400">(₹{(dailyCupsSlider * 20).toLocaleString()})</span>
                          </div>
                        </div>
                        <div className="p-2 bg-slate-950 rounded border border-slate-800/80">
                          <div className="text-[10px] text-slate-400">Daily Net Profit</div>
                          <div className="font-mono-nums font-bold text-emerald-400 mt-0.5">
                            ${(dailyCupsSlider * 0.18).toFixed(0)} <span className="text-[10px] text-slate-400">(₹{(dailyCupsSlider * 14).toLocaleString()})</span>
                          </div>
                        </div>
                        <div className="p-2 bg-slate-950 rounded border border-slate-800/80">
                          <div className="text-[10px] text-slate-400">Monthly Net Income</div>
                          <div className="font-mono-nums font-bold text-amber-300 mt-0.5">
                            ${(dailyCupsSlider * 0.18 * 30).toLocaleString()} <span className="text-[10px] text-slate-400">(₹{(dailyCupsSlider * 14 * 30).toLocaleString()})</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sourced Equipment List */}
                    <div>
                      <div className="text-xs font-semibold text-slate-300 mb-2">
                        Lean Equipment Sourcing Checklist:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {message.shopPlan.equipmentCosts.map((eq, i) => (
                          <div key={i} className="p-2 bg-slate-900 rounded border border-slate-800/80 flex items-center justify-between">
                            <span className="text-slate-300">{eq.item}</span>
                            <span className="font-mono-nums text-amber-400 font-semibold">{eq.cost}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Scale to Franchise Option */}
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
                      <span className="text-[11px] text-slate-400">
                        Want to turn this single stall into a 25-store chain?
                      </span>
                      <button
                        onClick={() => handleUpgradeToFranchise(message.shopPlan?.shopType || 'Chai Stall')}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Run Boardroom Franchise Expansion Plan</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Pitch Deck Diagnostic Result (if present) */}
                {message.deckAudit && (
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold text-white">
                          Deck Diagnostic: {message.deckAudit.fileName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-400">Readiness Score:</span>
                        <span className="font-mono-nums text-sm font-extrabold text-cyan-400">
                          {message.deckAudit.overallScore}/100
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {message.deckAudit.slides.map((s) => (
                        <div
                          key={s.slideNumber}
                          className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start justify-between gap-3 text-xs"
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="font-mono-nums text-slate-400 font-semibold">
                              #{s.slideNumber}
                            </span>
                            <div>
                              <div className="font-semibold text-slate-200">{s.name}</div>
                              <div className="text-slate-400 text-[11px] mt-0.5">
                                {s.feedback}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono-nums font-bold text-slate-300">
                              {s.score}%
                            </span>
                            {s.status === 'pass' && (
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            )}
                            {s.status === 'warning' && (
                              <AlertTriangle className="w-4 h-4 text-amber-400" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Streaming Thinking State */}
        {isStreaming && (
          <div className="flex gap-3.5 justify-start">
            <div className="shrink-0 mt-1">
              <CFMonogram size="sm" />
            </div>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 flex items-center gap-2.5">
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>Analyzing business model: Classifying between Simple Shop Plan &amp; Boardroom Consensus...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Idea Quick Playbooks Strip */}
      <div className="mb-3 shrink-0">
        <div className="text-[11px] text-slate-400 mb-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Test Ideas (Shop Plan vs. Boardroom Plan)</span>
          </div>
          <span className="text-[10px] text-slate-500">Auto-routes to the right execution model</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {PROMPT_PLAYBOOKS.map((pb, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveAgent(pb.type === 'shop' ? 'shop_advisor' : 'all');
                handleSendMessage(pb.prompt);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                pb.type === 'shop'
                  ? 'bg-amber-950/30 hover:bg-amber-900/50 border-amber-800/60 text-amber-200'
                  : 'bg-cyan-950/30 hover:bg-cyan-900/50 border-cyan-800/60 text-cyan-200'
              }`}
            >
              {pb.label}
            </button>
          ))}
        </div>
      </div>

      {/* Attached Deck Banner (if selected) */}
      {attachedDeck && (
        <div className="mb-2 p-2 rounded-lg bg-cyan-950/40 border border-cyan-800 flex items-center justify-between text-xs text-cyan-200">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Attached for Audit: <strong>{attachedDeck}</strong></span>
          </div>
          <button
            onClick={() => setAttachedDeck(null)}
            className="text-cyan-400 hover:text-white underline cursor-pointer"
          >
            Remove
          </button>
        </div>
      )}

      {/* Bottom Message Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/95 border border-slate-800 focus-within:border-cyan-500/80 transition-colors shadow-2xl shrink-0"
      >
        <button
          type="button"
          onClick={() => setShowDeckDrawer(true)}
          title="Attach Pitch Deck or Architecture Document"
          className="p-2.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Enter any idea (e.g. 'Chai stall at university' or 'AI SaaS for compliance')..."
          className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none px-2"
        />

        <button
          type="submit"
          disabled={!inputMessage.trim() || isStreaming}
          className="p-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Pitch Deck Attachment Modal */}
      {showDeckDrawer && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0A192F] border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Attach Pitch Deck or Spec</h3>
              </div>
              <button
                onClick={() => setShowDeckDrawer(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Select a pre-loaded sample pitch deck to simulate institutional venture diagnostics, or attach your own startup presentation:
            </p>

            <div className="space-y-2 mb-5">
              {[
                { name: 'Synthex_AI_Seed_Pitch_Deck.pdf', type: 'AI Infrastructure (Seed, $2.5M)' },
                { name: 'HealthPulse_Biotech_SeriesA.pdf', type: 'Clinical AI Platform (Series A, $8M)' },
                { name: 'FinFlow_Embedded_Ledger_PreSeed.pdf', type: 'FinTech API (Pre-Seed, $1M)' },
              ].map((deck) => (
                <button
                  key={deck.name}
                  type="button"
                  onClick={() => {
                    setAttachedDeck(deck.name);
                    setShowDeckDrawer(false);
                  }}
                  className="w-full p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all text-left flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">{deck.name}</div>
                      <div className="text-[11px] text-slate-400">{deck.type}</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-cyan-400 font-medium">Select</span>
                </button>
              ))}
            </div>

            <label className="block border-2 border-dashed border-slate-700 hover:border-cyan-400 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-950/40">
              <input
                type="file"
                accept=".pdf,.pptx,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setAttachedDeck(e.target.files[0].name);
                    setShowDeckDrawer(false);
                  }
                }}
              />
              <FileText className="w-6 h-6 text-cyan-400 mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-white">Upload from Computer</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Supports PDF, PPTX up to 50MB</div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
