import React from 'react';
import { CFMonogram } from './CFMonogram';
import { ArrowRight, Sparkles } from 'lucide-react';

export type ActiveTab = 'overview' | 'hub' | 'advisory' | 'diagnostics' | 'pricing';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenDeckUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenDeckUpload,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#050B14]/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand Wordmark with Universal CF Monogram */}
        <button
          onClick={() => onTabChange('overview')}
          className="flex items-center gap-3 group text-left cursor-pointer shrink-0"
        >
          <CFMonogram size="sm" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5">
              CoFoundr <span className="text-cyan-400 font-extrabold">AI</span>
            </span>
          </div>
        </button>

        {/* Zone 2: 4–5 Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => onTabChange('overview')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'overview'
                ? 'text-cyan-400 border-cyan-400'
                : 'text-slate-300 border-transparent hover:text-white'
            }`}
          >
            Overview
          </button>
          
          <button
            onClick={() => onTabChange('hub')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 flex items-center gap-1.5 ${
              activeTab === 'hub'
                ? 'text-cyan-400 border-cyan-400'
                : 'text-slate-300 border-transparent hover:text-white'
            }`}
          >
            <span>Co-Founder Hub</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </button>

          <button
            onClick={() => onTabChange('advisory')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'advisory'
                ? 'text-cyan-400 border-cyan-400'
                : 'text-slate-300 border-transparent hover:text-white'
            }`}
          >
            Advisory Board
          </button>

          <button
            onClick={() => onTabChange('diagnostics')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'diagnostics'
                ? 'text-cyan-400 border-cyan-400'
                : 'text-slate-300 border-transparent hover:text-white'
            }`}
          >
            Pitch Diagnostics
          </button>

          <button
            onClick={() => onTabChange('pricing')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'pricing'
                ? 'text-cyan-400 border-cyan-400'
                : 'text-slate-300 border-transparent hover:text-white'
            }`}
          >
            Pricing
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Top Bar Contract Compliant) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onTabChange('hub')}
            className="group relative inline-flex items-center justify-center gap-2 px-4.5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-lg hover:from-cyan-300 hover:to-cyan-200 transition-all duration-200 shadow-[0_0_16px_rgba(6,182,212,0.4)] hover:shadow-[0_0_24px_rgba(6,182,212,0.7)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>Launch Co-Founder Hub</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </header>
  );
};
