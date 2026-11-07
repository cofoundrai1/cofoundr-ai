import React from 'react';
import { CFMonogram } from './CFMonogram';
import { ShieldCheck } from 'lucide-react';
import { ActiveTab } from './Navbar';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#050B14] border-t border-slate-800/80 pt-12 pb-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8 pb-8 border-b border-slate-800/60">
          
          {/* Brand lockup */}
          <div className="flex items-center gap-3">
            <CFMonogram size="sm" />
            <div>
              <div className="text-base font-bold text-white tracking-tight">
                CoFoundr <span className="text-cyan-400">AI</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Autonomous Co-Founder &amp; Advisory Board Intelligence
              </div>
            </div>
          </div>

          {/* Clean nav mirror */}
          <div className="flex flex-wrap items-center gap-6 text-slate-300 font-medium">
            <button
              onClick={() => onNavigate('overview')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Overview
            </button>
            <button
              onClick={() => onNavigate('hub')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Co-Founder Hub
            </button>
            <button
              onClick={() => onNavigate('advisory')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Advisory Board
            </button>
            <button
              onClick={() => onNavigate('diagnostics')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Pitch Diagnostics
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Pricing
            </button>
          </div>

          {/* Security & Compliance Seal */}
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>SOC-2 Type II Certified</span>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} CoFoundr AI Systems, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Security Whitepaper</span>
            <span>·</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy &amp; Terms</span>
            <span>·</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Model Disclosure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
