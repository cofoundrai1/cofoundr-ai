import React, { useState, useRef } from 'react';
import { CFMonogram } from './CFMonogram';
import { Sparkles, Activity, Cpu, Compass } from 'lucide-react';

interface AircraftBrainGraphicProps {
  className?: string;
}

export const AircraftBrainGraphic: React.FC<AircraftBrainGraphicProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const tiltX = mousePos.y * -14;
  const tiltY = mousePos.x * 18;

  // Intelligence Nodes mapped around the neural brain outline
  const nodes = [
    { id: 'tech', label: 'Tech Architecture', cx: 370, cy: 110, icon: Cpu, agent: 'Product & Tech' },
    { id: 'gtm', label: 'GTM Flywheel', cx: 450, cy: 175, icon: Compass, agent: 'Growth & GTM' },
    { id: 'deck', label: 'Deck Valuation', cx: 430, cy: 260, icon: Activity, agent: 'Fundraising & IR' },
    { id: 'board', label: 'Governance AI', cx: 340, cy: 300, icon: Sparkles, agent: 'Advisory Board' },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[620px] aspect-[4/3] flex items-center justify-center select-none ${className}`}
      style={{ perspective: '1100px' }}
    >
      {/* Background Ambient Glow & Grid Matrix */}
      <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent blur-2xl pointer-events-none" />
      
      {/* Outer 3D Tilting Stage */}
      <div
        className="relative w-full h-full transition-transform duration-300 ease-out flex items-center justify-center"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <svg
          viewBox="0 0 600 450"
          className="w-full h-full overflow-visible drop-shadow-[0_12px_36px_rgba(6,182,212,0.18)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Metallic Silver gradients for aircraft fuselage */}
            <linearGradient id="fuselageSilver" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#E2E8F0" />
              <stop offset="55%" stopColor="#94A3B8" />
              <stop offset="85%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            <linearGradient id="fuselageHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#94A3B8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="wingChrome" x1="0%" y1="30%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="40%" stopColor="#CBD5E1" />
              <stop offset="80%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Glowing Cyan Thruster & Neural Stream */}
            <linearGradient id="cyanTrailGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#22D3EE" stopOpacity="0.85" />
              <stop offset="80%" stopColor="#38BDF8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="thrusterBurn" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#67E8F9" />
              <stop offset="70%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#0A192F" stopOpacity="0" />
            </linearGradient>

            <filter id="neonGlowWide" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blurWide" />
              <feGaussianBlur stdDeviation="2" result="blurSharp" />
              <feMerge>
                <feMergeNode in="blurWide" />
                <feMergeNode in="blurSharp" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="thrusterPlume" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ========================================================= */}
          {/* 1. NEURAL LIGHT TRAIL ORBITING INTO SYNAPTIC BRAIN MOTIF */}
          {/* ========================================================= */}
          
          {/* Ambient Neural Network Connection Mesh */}
          <g opacity="0.35" stroke="#06B6D4" strokeWidth="0.8" strokeDasharray="3 4">
            <line x1="370" y1="110" x2="450" y2="175" />
            <line x1="450" y1="175" x2="430" y2="260" />
            <line x1="430" y1="260" x2="340" y2="300" />
            <line x1="340" y1="300" x2="370" y2="110" />
            <line x1="370" y1="110" x2="430" y2="260" />
            <line x1="280" y1="190" x2="370" y2="110" />
            <line x1="280" y1="190" x2="340" y2="300" />
          </g>

          {/* Primary Flowing Neural Trail from Airplane Tail (155, 305) */}
          <path
            d="M 148 312 
               C 110 345, 90 390, 160 410 
               C 240 430, 270 360, 310 340 
               C 340 325, 335 375, 380 370 
               C 425 365, 455 330, 480 290 
               C 515 240, 500 170, 470 135 
               C 440 100, 395 70, 340 85 
               C 290 98, 260 145, 275 195 
               C 285 230, 320 250, 360 235 
               C 400 220, 415 170, 380 145 
               C 345 120, 300 135, 290 170"
            stroke="url(#cyanTrailGrad)"
            strokeWidth="3.2"
            fill="none"
            filter="url(#neonGlowWide)"
            strokeLinecap="round"
            className="transition-all duration-700"
          />

          {/* Secondary Delicate Synaptic Folds (Brain Sulci) */}
          <path
            d="M 330 95 
               C 360 105, 390 120, 420 105 
               C 450 95, 475 120, 485 150
               C 495 180, 470 200, 490 230
               C 505 255, 475 285, 450 310
               C 425 335, 380 340, 350 320"
            stroke="#22D3EE"
            strokeWidth="1.8"
            strokeDasharray="4 3"
            fill="none"
            opacity="0.85"
            filter="url(#neonGlowWide)"
          />

          {/* Frontal Lobe & Cerebellum Neural Spirals */}
          <path
            d="M 340 140 Q 380 150 410 135 T 440 175 T 410 220 T 360 210"
            stroke="#06B6D4"
            strokeWidth="1.4"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M 360 240 Q 400 250 425 280 T 380 320 T 330 295"
            stroke="#38BDF8"
            strokeWidth="1.4"
            fill="none"
            opacity="0.75"
          />

          {/* High Energy Thruster Core Plume */}
          <ellipse
            cx="148"
            cy="312"
            rx="28"
            ry="10"
            transform="rotate(-38 148 312)"
            fill="url(#thrusterBurn)"
            filter="url(#thrusterPlume)"
            opacity="0.9"
          />
          <circle cx="148" cy="312" r="5" fill="#FFFFFF" filter="url(#neonGlowWide)" />

          {/* ========================================================= */}
          {/* 2. SLEEK, GLOSSY 3D METALLIC SILVER AIRPLANE */}
          {/* Flying diagonally upward toward (280, 150) */}
          {/* ========================================================= */}
          <g className="animate-aircraft origin-[220px_230px]">
            {/* Outer Cyan Glowing Aura around Jet Contour */}
            <path
              d="M 285 142 
                 L 220 205 
                 L 85 275 
                 L 135 295 
                 L 142 320 
                 L 175 305 
                 L 230 330 
                 L 242 270 
                 L 285 142 Z"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="4"
              strokeLinejoin="round"
              filter="url(#neonGlowWide)"
              opacity="0.75"
            />

            {/* Port Wing (Underbody/Far Wing) */}
            <path
              d="M 230 215 L 265 240 L 250 270 L 222 245 Z"
              fill="#1E293B"
              stroke="#06B6D4"
              strokeWidth="1"
            />

            {/* Starboard Main Wing (Swept forward, facing viewer) */}
            <path
              d="M 225 210 
                 L 75 272 
                 L 130 292 
                 L 190 250 Z"
              fill="url(#wingChrome)"
              stroke="#22D3EE"
              strokeWidth="1.2"
              className="drop-shadow-md"
            />
            {/* Wing leading edge gloss line */}
            <line x1="225" y1="210" x2="75" y2="272" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />
            {/* Wingtip navigation beacon */}
            <circle cx="75" cy="272" r="2.5" fill="#22D3EE" filter="url(#neonGlowWide)" />

            {/* Main Aircraft Fuselage: Precision Silver Aerodynamic Geometry */}
            <path
              d="M 288 140 
                 C 285 145, 240 215, 205 260
                 C 185 285, 155 310, 142 316
                 C 140 317, 140 310, 146 302
                 C 165 275, 200 230, 245 175
                 C 270 145, 288 135, 288 140 Z"
              fill="url(#fuselageSilver)"
              stroke="#94A3B8"
              strokeWidth="0.8"
            />

            {/* Fuselage Spine Highlight & Canopy Glass */}
            <path
              d="M 285 142 
                 C 275 160, 240 220, 195 270
                 L 185 260
                 C 230 210, 270 155, 285 142 Z"
              fill="url(#fuselageHighlight)"
            />
            {/* Cybernetic Tinted Cockpit Canopy */}
            <path
              d="M 272 158 
                 C 265 170, 252 190, 242 205 
                 L 237 200 
                 C 248 185, 260 166, 268 155 Z"
              fill="#06B6D4"
              opacity="0.9"
              filter="url(#neonGlowWide)"
            />

            {/* Vertical Tail Stabilizer */}
            <path
              d="M 165 280 
                 L 138 318 
                 L 148 322 
                 L 182 288 Z"
              fill="url(#fuselageSilver)"
              stroke="#06B6D4"
              strokeWidth="0.8"
            />
            {/* Stabilizer Glowing Tip */}
            <circle cx="138" cy="318" r="2" fill="#22D3EE" filter="url(#neonGlowWide)" />

            {/* ========================================================= */}
            {/* THE "CF" MONOGRAM EMBEDDED PROMINENTLY ON THE AIRPLANE WING */}
            {/* ========================================================= */}
            <g
              transform="translate(132, 242) rotate(-22) scale(0.68)"
              className="cursor-pointer"
            >
              {/* Glowing Badge Housing */}
              <rect
                x="0"
                y="0"
                width="36"
                height="36"
                rx="9"
                fill="#0A192F"
                stroke="#06B6D4"
                strokeWidth="2"
                filter="url(#neonGlowWide)"
              />
              {/* Monogram C arc */}
              <path
                d="M 18 9 C 13 9 9 13 9 18 C 9 23 13 27 18 27 C 20.5 27 22.5 26 23.8 24.5"
                stroke="#22D3EE"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />
              {/* Monogram F bar */}
              <path
                d="M 16 11 H 27 V 14.5 H 20.5 V 17.5 H 25 V 20.5 H 20.5 V 25.5 H 16 Z"
                fill="#FFFFFF"
              />
              <circle cx="27" cy="12" r="1.5" fill="#22D3EE" />
            </g>
          </g>

          {/* ========================================================= */}
          {/* 3. INTERACTIVE NEURAL SYNAPSE NODES */}
          {/* ========================================================= */}
          {nodes.map((node) => {
            const isHovered = activeNode === node.id;
            return (
              <g
                key={node.id}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                className="cursor-pointer transition-all duration-300"
              >
                {/* Pulsing Outer Radar Circle */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={isHovered ? 20 : 12}
                  fill={isHovered ? 'rgba(6, 182, 212, 0.25)' : 'rgba(6, 182, 212, 0.1)'}
                  stroke="#06B6D4"
                  strokeWidth={isHovered ? '1.5' : '1'}
                  className={isHovered ? 'animate-ping' : ''}
                />
                {/* Core Metallic Node */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={isHovered ? 7 : 5}
                  fill={isHovered ? '#FFFFFF' : '#22D3EE'}
                  stroke="#0A192F"
                  strokeWidth="2"
                  filter="url(#neonGlowWide)"
                />
                {/* Node Label Tooltip when hovered */}
                <g
                  transform={`translate(${node.cx + 14}, ${node.cy - 12})`}
                  opacity={isHovered ? 1 : 0.8}
                  className="transition-opacity duration-200 pointer-events-none"
                >
                  <rect
                    x="0"
                    y="0"
                    width={node.label.length * 7.5 + 24}
                    height="24"
                    rx="5"
                    fill="#0A192F"
                    stroke={isHovered ? '#22D3EE' : '#1E293B'}
                    strokeWidth="1"
                  />
                  <text
                    x="12"
                    y="16"
                    fill={isHovered ? '#22D3EE' : '#94A3B8'}
                    fontSize="10"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontWeight="600"
                  >
                    {node.label}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Ambient Floating Micro-Telemetry Badge (Zero-Pill compliant) */}
        <div className="absolute bottom-2 left-4 flex items-center gap-3 text-xs text-slate-400 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
            <CFMonogram size="xs" withBackground={false} />
            <span>Neural Trajectory</span>
          </div>
          <span className="text-slate-600">·</span>
          <span className="font-mono-nums text-slate-300">Mach 4.2 AI Loop</span>
          <span className="text-slate-600">·</span>
          <span className="text-emerald-400 font-mono-nums">Active Ensemble</span>
        </div>
      </div>
    </div>
  );
};
