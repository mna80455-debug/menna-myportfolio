import { motion } from 'framer-motion';

interface ProjectArchitectureProps {
  projectId: number;
}

export default function ProjectArchitecture({ projectId }: ProjectArchitectureProps) {
  // Styles for crawlers
  const svgStyle = `
    @keyframes crawlForward {
      to { stroke-dashoffset: -16; }
    }
    @keyframes crawlBackward {
      to { stroke-dashoffset: 16; }
    }
    @keyframes pulseGlow {
      0%, 100% { filter: drop-shadow(0 0 2px #C9739A); opacity: 0.85; }
      50% { filter: drop-shadow(0 0 6px #C9739A); opacity: 1; }
    }
    .flow-forward { stroke-dasharray: 8; stroke-dashoffset: 0; animation: crawlForward 1.2s linear infinite; }
    .flow-backward { stroke-dasharray: 8; stroke-dashoffset: 0; animation: crawlBackward 1.2s linear infinite; }
    .glow-node { animation: pulseGlow 3s ease-in-out infinite; }
  `;

  // Draw flowchart based on project ID
  const renderFlowchart = () => {
    switch (projectId) {
      case 1: // UniRoute
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full text-current">
            <defs>
              <linearGradient id="rose-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#C9739A" />
                <stop offset="100%" stopColor="#9B6BA8" />
              </linearGradient>
            </defs>
            <style>{svgStyle}</style>

            {/* Connecting lines */}
            <path d="M 90 70 L 200 100" fill="none" stroke="url(#rose-gradient)" strokeWidth="1.5" className="flow-forward opacity-50" />
            <path d="M 90 100 L 200 100" fill="none" stroke="url(#rose-gradient)" strokeWidth="1.5" className="flow-forward opacity-50" />
            <path d="M 90 130 L 200 100" fill="none" stroke="url(#rose-gradient)" strokeWidth="1.5" className="flow-forward opacity-50" />
            <path d="M 200 100 L 310 100" fill="none" stroke="url(#rose-gradient)" strokeWidth="2" className="flow-forward" />
            <path d="M 310 100 L 200 100" fill="none" stroke="#E8A0BF" strokeWidth="1" className="flow-backward opacity-30" />

            {/* Client nodes (Left) */}
            <g transform="translate(40, 50)" className="glow-node">
              <rect x="0" y="0" width="50" height="24" rx="6" fill="#111114" stroke="#C9739A" strokeWidth="1.5" />
              <text x="25" y="15" fill="#D7E2EA" fontSize="8" fontWeight="bold" textAnchor="middle">Student</text>
            </g>
            <g transform="translate(40, 88)" className="glow-node">
              <rect x="0" y="0" width="50" height="24" rx="6" fill="#111114" stroke="#C9739A" strokeWidth="1.5" />
              <text x="25" y="15" fill="#D7E2EA" fontSize="8" fontWeight="bold" textAnchor="middle">Driver</text>
            </g>
            <g transform="translate(40, 126)" className="glow-node">
              <rect x="0" y="0" width="50" height="24" rx="6" fill="#111114" stroke="#C9739A" strokeWidth="1.5" />
              <text x="25" y="15" fill="#D7E2EA" fontSize="8" fontWeight="bold" textAnchor="middle">Parent</text>
            </g>

            {/* Gateway node (Center) */}
            <g transform="translate(160, 82)">
              <rect x="0" y="0" width="80" height="36" rx="10" fill="#111114" stroke="#9B6BA8" strokeWidth="2" />
              <text x="40" y="17" fill="#D7E2EA" fontSize="8" fontWeight="bold" textAnchor="middle">Matching Engine</text>
              <text x="40" y="27" fill="#9E9EAA" fontSize="6" textAnchor="middle">System Router</text>
            </g>

            {/* DB Node (Right) */}
            <g transform="translate(300, 82)" className="glow-node">
              <rect x="0" y="0" width="60" height="36" rx="6" fill="#111114" stroke="#E8A0BF" strokeWidth="2" />
              <text x="30" y="18" fill="#D7E2EA" fontSize="9" fontWeight="bold" textAnchor="middle">Oracle DB</text>
              <text x="30" y="28" fill="#E8A0BF" fontSize="6" textAnchor="middle">Tables/Views</text>
            </g>

            {/* Labels */}
            <text x="65" y="35" fill="#9E9EAA" fontSize="8" textAnchor="middle">Clients / المستخدمين</text>
            <text x="200" y="145" fill="#9E9EAA" fontSize="8" textAnchor="middle">Routes Optimization / خوارزمية الربط</text>
            <text x="330" y="145" fill="#9E9EAA" fontSize="8" textAnchor="middle">Relational Data</text>
          </svg>
        );

      case 2: // Wasl Platform
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full text-current">
            <defs>
              <linearGradient id="wasl-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#C9739A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#9B6BA8" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <style>{svgStyle}</style>

            {/* Connections */}
            <path d="M 100 100 H 200" fill="none" stroke="url(#wasl-gradient)" strokeWidth="2" className="flow-forward" />
            <path d="M 280 100 H 310" fill="none" stroke="url(#wasl-gradient)" strokeWidth="2" className="flow-forward" />
            <path d="M 280 90 C 240 60, 140 60, 100 100" fill="none" stroke="#E8A0BF" strokeWidth="1" className="flow-backward opacity-30" />

            {/* Student Web App */}
            <g transform="translate(20, 75)" className="glow-node">
              <rect x="0" y="0" width="80" height="50" rx="12" fill="#111114" stroke="#C9739A" strokeWidth="2" />
              <text x="40" y="22" fill="#D7E2EA" fontSize="9" fontWeight="bold" textAnchor="middle">Student UI</text>
              <text x="40" y="34" fill="#9E9EAA" fontSize="7" textAnchor="middle">React &amp; Vite</text>
            </g>

            {/* Supabase backend */}
            <g transform="translate(190, 75)">
              <rect x="0" y="0" width="90" height="50" rx="12" fill="#111114" stroke="#9B6BA8" strokeWidth="2" />
              <text x="45" y="20" fill="#D7E2EA" fontSize="9" fontWeight="bold" textAnchor="middle">Supabase API</text>
              <text x="45" y="32" fill="#E8A0BF" fontSize="7" textAnchor="middle">Auth &amp; Realtime</text>
              <text x="45" y="42" fill="#9E9EAA" fontSize="6" textAnchor="middle">Serverless DB</text>
            </g>

            {/* Companies */}
            <g transform="translate(300, 75)" className="glow-node">
              <rect x="0" y="0" width="80" height="50" rx="12" fill="#111114" stroke="#E8A0BF" strokeWidth="2" />
              <text x="40" y="22" fill="#D7E2EA" fontSize="9" fontWeight="bold" textAnchor="middle">Sponsors</text>
              <text x="40" y="34" fill="#9E9EAA" fontSize="7" textAnchor="middle">Jobs Console</text>
            </g>

            {/* Descriptions */}
            <text x="145" y="150" fill="#9E9EAA" fontSize="8" textAnchor="middle">Query Matching / سحب الوظائف والتدريب</text>
          </svg>
        );

      case 3: // Portfolio Generator
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full text-current">
            <style>{svgStyle}</style>

            {/* Paths */}
            <path d="M 90 100 H 160" fill="none" stroke="#C9739A" strokeWidth="1.5" className="flow-forward" />
            <path d="M 240 100 H 310" fill="none" stroke="#9B6BA8" strokeWidth="1.5" className="flow-forward" />

            {/* Input Node */}
            <g transform="translate(20, 80)">
              <rect x="0" y="0" width="70" height="40" rx="8" fill="#111114" stroke="#C9739A" strokeWidth="1.5" />
              <text x="35" y="20" fill="#D7E2EA" fontSize="8" fontWeight="bold" textAnchor="middle">CV Details</text>
              <text x="35" y="30" fill="#9E9EAA" fontSize="6" textAnchor="middle">User Input</text>
            </g>

            {/* AI Generator Node */}
            <g transform="translate(150, 75)" className="glow-node">
              <rect x="0" y="0" width="90" height="50" rx="12" fill="#111114" stroke="#9B6BA8" strokeWidth="2" />
              <text x="45" y="20" fill="#D7E2EA" fontSize="9" fontWeight="bold" textAnchor="middle">Claude LLM</text>
              <text x="45" y="32" fill="#E8A0BF" fontSize="7" textAnchor="middle">Prompt Synthesis</text>
              <text x="45" y="42" fill="#9E9EAA" fontSize="6" textAnchor="middle">ATS Review</text>
            </g>

            {/* Export HTML Node */}
            <g transform="translate(300, 80)">
              <rect x="0" y="0" width="80" height="40" rx="8" fill="#111114" stroke="#E8A0BF" strokeWidth="1.5" />
              <text x="40" y="20" fill="#D7E2EA" fontSize="8" fontWeight="bold" textAnchor="middle">Portfolio page</text>
              <text x="40" y="30" fill="#9E9EAA" fontSize="6" textAnchor="middle">Vercel Deploy</text>
            </g>

            {/* Description */}
            <text x="200" y="155" fill="#9E9EAA" fontSize="8" textAnchor="middle">Dynamic HTML generation with AI &amp; ATS grading</text>
          </svg>
        );

      case 4: // InvoiceCraft
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full text-current">
            <style>{svgStyle}</style>

            {/* Connections */}
            <path d="M 90 100 H 160" fill="none" stroke="#C9739A" strokeWidth="1.5" className="flow-forward" />
            <path d="M 230 100 H 300" fill="none" stroke="#9B6BA8" strokeWidth="1.5" className="flow-forward" />
            <path d="M 330 80 Q 200 40, 60 80" fill="none" stroke="#E8A0BF" strokeWidth="1" className="flow-backward opacity-30" />

            {/* Constructor */}
            <g transform="translate(20, 80)">
              <rect x="0" y="0" width="70" height="40" rx="8" fill="#111114" stroke="#C9739A" strokeWidth="1.5" />
              <text x="35" y="20" fill="#D7E2EA" fontSize="8" fontWeight="bold" textAnchor="middle">Constructor</text>
              <text x="35" y="30" fill="#9E9EAA" fontSize="6" textAnchor="middle">Invoice Editor</text>
            </g>

            {/* Firebase Database & Sync */}
            <g transform="translate(150, 75)" className="glow-node">
              <rect x="0" y="0" width="80" height="50" rx="12" fill="#111114" stroke="#9B6BA8" strokeWidth="2" />
              <text x="40" y="20" fill="#D7E2EA" fontSize="9" fontWeight="bold" textAnchor="middle">Firebase DB</text>
              <text x="40" y="32" fill="#E8A0BF" fontSize="7" textAnchor="middle">Records Sync</text>
              <text x="40" y="42" fill="#9E9EAA" fontSize="6" textAnchor="middle">PDF Engine</text>
            </g>

            {/* Sharing channels */}
            <g transform="translate(290, 80)">
              <rect x="0" y="0" width="90" height="40" rx="8" fill="#111114" stroke="#E8A0BF" strokeWidth="1.5" />
              <text x="45" y="18" fill="#D7E2EA" fontSize="8" fontWeight="bold" textAnchor="middle">PDF / WhatsApp</text>
              <text x="45" y="28" fill="#9E9EAA" fontSize="6" textAnchor="middle">Sharing Channels</text>
            </g>

            {/* Arabic Description */}
            <text x="200" y="155" fill="#9E9EAA" fontSize="8" textAnchor="middle">بناء الفواتير وتوليد الـ PDF ومزامنتها سحابياً</text>
          </svg>
        );

      case 5: // GradeIQ
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full text-current">
            <style>{svgStyle}</style>

            {/* Paths */}
            <path d="M 90 100 H 160" fill="none" stroke="#C9739A" strokeWidth="1.5" className="flow-forward" />
            <path d="M 240 100 H 310" fill="none" stroke="#9B6BA8" strokeWidth="1.5" className="flow-forward" />

            {/* Tracker */}
            <g transform="translate(20, 80)">
              <rect x="0" y="0" width="70" height="40" rx="8" fill="#111114" stroke="#C9739A" strokeWidth="1.5" />
              <text x="35" y="20" fill="#D7E2EA" fontSize="8" fontWeight="bold" textAnchor="middle">GPA Tracker</text>
              <text x="35" y="30" fill="#9E9EAA" fontSize="6" textAnchor="middle">Grade records</text>
            </g>

            {/* Advisor Engine */}
            <g transform="translate(150, 75)" className="glow-node">
              <rect x="0" y="0" width="90" height="50" rx="12" fill="#111114" stroke="#9B6BA8" strokeWidth="2" />
              <text x="45" y="20" fill="#D7E2EA" fontSize="9" fontWeight="bold" textAnchor="middle">AI Advisor</text>
              <text x="45" y="32" fill="#E8A0BF" fontSize="7" textAnchor="middle">Predictive model</text>
              <text x="45" y="42" fill="#9E9EAA" fontSize="6" textAnchor="middle">GPA Simulator</text>
            </g>

            {/* Recommendations */}
            <g transform="translate(300, 80)">
              <rect x="0" y="0" width="80" height="40" rx="8" fill="#111114" stroke="#E8A0BF" strokeWidth="1.5" />
              <text x="40" y="20" fill="#D7E2EA" fontSize="8" fontWeight="bold" textAnchor="middle">Goal Pathways</text>
              <text x="40" y="30" fill="#9E9EAA" fontSize="6" textAnchor="middle">Dynamic Planner</text>
            </g>

            {/* Description */}
            <text x="200" y="155" fill="#9E9EAA" fontSize="8" textAnchor="middle">حساب وتوقع المعدل التراكمي وتوفير خطط التحسين</text>
          </svg>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center theme-text-muted text-xs font-light">
            Architecture Diagram Coming Soon
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="theme-bg-card w-full h-[240px] sm:h-[280px] rounded-2xl flex items-center justify-center p-3 border theme-border-card bg-[#0D0D11]/30 relative overflow-hidden"
    >
      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-[0.02] tech-grid pointer-events-none" />
      <div className="w-full h-full max-w-[420px] relative z-10 flex items-center justify-center">
        {renderFlowchart()}
      </div>
    </motion.div>
  );
}
