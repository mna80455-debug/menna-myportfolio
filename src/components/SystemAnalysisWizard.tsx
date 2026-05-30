import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Database, Brain, Sparkles, CheckCircle2, ChevronRight, RefreshCw, Send } from 'lucide-react';
import FadeIn from './FadeIn';
import { playClickSound, playHoverSound } from '../utils/audio';

interface Question {
  id: string;
  titleEn: string;
  titleAr: string;
  options: {
    id: string;
    labelEn: string;
    labelAr: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const wizardSteps: Question[] = [
  {
    id: 'type',
    titleEn: 'What is the project type?',
    titleAr: 'ما هو نوع المشروع المراد تصميمه؟',
    options: [
      { id: 'web', labelEn: 'Web Platform', labelAr: 'منصة ويب', icon: Settings },
      { id: 'mobile', labelEn: 'Mobile App', labelAr: 'تطبيق هاتف', icon: SmartphoneIcon },
      { id: 'ai', labelEn: 'AI & Data Tool', labelAr: 'أداة ذكاء اصطناعي', icon: Brain },
      { id: 'enterprise', labelEn: 'Enterprise System', labelAr: 'نظام مؤسسي ولوحة تحكم', icon: Database }
    ]
  },
  {
    id: 'data',
    titleEn: 'Data Scale & Concurrency requirements?',
    titleAr: 'متطلبات البيانات والتزامن؟',
    options: [
      { id: 'none', labelEn: 'Static / Basic CRUD', labelAr: 'بيانات بسيطة / ثابتة', icon: Settings },
      { id: 'relational', labelEn: 'Relational DB (SQL)', labelAr: 'علاقات معقدة (Oracle/SQL)', icon: Database },
      { id: 'realtime', labelEn: 'Real-time Sync', labelAr: 'تزامن فوري متزامن', icon: RefreshCw },
      { id: 'massive', labelEn: 'Big Data & Analytics', labelAr: 'تحليل بيانات ضخمة وتقارير', icon: Brain }
    ]
  },
  {
    id: 'ai',
    titleEn: 'AI Integration Level?',
    titleAr: 'مستوى تكامل الذكاء الاصطناعي؟',
    options: [
      { id: 'none', labelEn: 'No AI Integration', labelAr: 'بدون تكامل ذكاء اصطناعي', icon: Settings },
      { id: 'llm', labelEn: 'Conversational LLM', labelAr: 'روبوت دردشة (Chatbot/Claude)', icon: Sparkles },
      { id: 'predictive', labelEn: 'Predictive Models', labelAr: 'نماذج توقعية (GPA/ATS Score)', icon: Brain }
    ]
  }
];

// Fallback icons for options where SmartphoneIcon is used
function SmartphoneIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

export default function SystemAnalysisWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [proposalApplied, setProposalApplied] = useState(false);

  const isLastStep = step === wizardSteps.length - 1;
  const showResult = step === wizardSteps.length;

  const handleSelectOption = (questionId: string, optionId: string) => {
    playClickSound();
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 150);
  };

  const handleReset = () => {
    playClickSound();
    setAnswers({});
    setStep(0);
    setProposalApplied(false);
  };

  // Generate dynamic system proposal based on questionnaire state
  const getProposal = () => {
    const type = answers['type'] || 'web';
    const data = answers['data'] || 'none';
    const ai = answers['ai'] || 'none';

    let stack = '';
    let db = '';
    let flow = '';

    if (type === 'web') {
      stack = 'Vite React + Tailwind CSS + Lucide Icons';
    } else if (type === 'mobile') {
      stack = 'React Native + Expo + Tailwind CSS';
    } else if (type === 'ai') {
      stack = 'Vite React + Claude API Node Server + Vercel Functions';
    } else {
      stack = 'Vite React + Oracle DB Client + Express API Node.js';
    }

    if (data === 'none') {
      db = 'No database needed. Sync state with React Context / localStorage.';
    } else if (data === 'relational') {
      db = 'PostgreSQL/Oracle. Map in 3NF (Normal Form) to eliminate redundancy. Separate tables for: Users, Projects, AuditLogs.';
    } else if (data === 'realtime') {
      db = 'Supabase Realtime Database. Enable Row Level Security (RLS) policies for user authentication and direct websocket sync.';
    } else {
      db = 'NoSQL / Firebase Firestore database structures. Leverage key-value map tables for rapid reads and analytics caching.';
    }

    if (ai === 'llm') {
      stack += ' + Anthropic Claude API Integration';
      flow = 'Client Chat Widget ➔ Express Proxy (Secrets Storage) ➔ Claude LLM stream response ➔ UI Render.';
    } else if (ai === 'predictive') {
      flow = 'Input data ➔ Client mathematical model script (Linear Regression / Custom parameters) ➔ Dynamic chart render.';
    } else {
      flow = 'Client interaction ➔ Database transaction ➔ Direct state updates.';
    }

    const proposalText = `--- PROJECT PROPOSAL GENERATED ---
[Project Architecture Details]
- Platform Stack: ${stack}
- Data Architecture: ${db}
- Flow Logic: ${flow}

Please review this proposal for my upcoming project!`;

    return { stack, db, flow, text: proposalText };
  };

  const handleApplyToForm = () => {
    playClickSound();
    const proposal = getProposal();
    window.dispatchEvent(new CustomEvent('autofill_message', { detail: proposal.text }));
    setProposalApplied(true);
  };

  return (
    <section id="wizard" className="theme-bg-secondary py-20 sm:py-24 relative overflow-hidden">
      {/* Visual Tech Grid */}
      <div className="absolute inset-0 tech-grid opacity-5 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="theme-text-secondary font-black uppercase tracking-tight text-[clamp(2.5rem,8vw,90px)] mb-3">
            Proposal Builder
          </h2>
          <p className="theme-text-muted text-xs sm:text-sm font-light uppercase tracking-widest pl-1">
            مساعد التخطيط وتحليل النظم الذكي
          </p>
        </div>

        {/* Outer Card */}
        <div className="theme-bg-card border theme-border-card rounded-[32px] p-6 sm:p-10 shadow-2xl relative min-h-[380px] flex flex-col justify-between overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-rose/5 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          
          <AnimatePresence mode="wait">
            {!showResult ? (
              // STEP PROGRESSION VIEW
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Step Indicators */}
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xs font-bold text-rose tracking-wider uppercase">
                      Step {step + 1} of {wizardSteps.length}
                    </span>
                    <div className="flex gap-1">
                      {wizardSteps.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-8 h-1 rounded-full transition-all duration-300 ${
                            idx <= step ? 'bg-rose' : 'bg-current/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question */}
                  <h3 className="font-extrabold text-xl sm:text-2xl theme-text-primary leading-snug">
                    {wizardSteps[step].titleEn}
                  </h3>
                  <h4 className="text-sm text-rose font-medium mt-1 mb-8">
                    {wizardSteps[step].titleAr}
                  </h4>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wizardSteps[step].options.map((opt) => {
                      const OptIcon = opt.icon;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(wizardSteps[step].id, opt.id)}
                          onMouseEnter={playHoverSound}
                          className="flex items-center gap-4 p-4 rounded-xl border border-current/10 theme-bg-primary theme-text-primary hover:border-rose/50 hover:bg-rose/5 text-left transition-all duration-300 cursor-pointer active:scale-[0.98] group"
                        >
                          <div className="p-3 bg-current/5 group-hover:bg-rose/10 group-hover:text-rose rounded-xl transition-colors duration-300">
                            <OptIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="block font-bold text-sm leading-tight">
                              {opt.labelEn}
                            </span>
                            <span className="text-[10px] theme-text-muted font-light leading-none">
                              {opt.labelAr}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Back button (Only beyond step 1) */}
                {step > 0 && (
                  <button
                    onClick={() => {
                      playClickSound();
                      setStep((prev) => prev - 1);
                    }}
                    className="self-start text-xs font-semibold text-rose hover:underline mt-8 cursor-pointer"
                  >
                    ← Back / السابق
                  </button>
                )}
              </motion.div>
            ) : (
              // RESULT VIEW (ARCHITECTURE PROPOSAL)
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 25 }}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-extrabold text-2xl theme-text-primary leading-tight flex items-center gap-2">
                    <CheckCircle2 className="w-7 h-7 text-green-500" />
                    Architecture Proposal Generated!
                  </h3>
                  <h4 className="text-xs font-semibold text-rose mt-1 mb-8">
                    تم توليد المقترح الهيكلي ونظام البيانات للمشروع
                  </h4>

                  {/* Proposal Summary Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-sm">
                    {/* Platform Stack */}
                    <div className="p-4 theme-bg-primary rounded-2xl border theme-border-card">
                      <span className="text-xs font-bold text-rose uppercase tracking-wide block mb-2">
                        🚀 Recommended Stack
                      </span>
                      <p className="theme-text-primary font-medium">{getProposal().stack}</p>
                    </div>

                    {/* Data Schema */}
                    <div className="p-4 theme-bg-primary rounded-2xl border theme-border-card">
                      <span className="text-xs font-bold text-rose uppercase tracking-wide block mb-2">
                        🗄️ Database Architecture
                      </span>
                      <p className="theme-text-primary font-light text-xs leading-relaxed">
                        {getProposal().db}
                      </p>
                    </div>

                    {/* Concurrency Flow */}
                    <div className="p-4 theme-bg-primary rounded-2xl border theme-border-card">
                      <span className="text-xs font-bold text-rose uppercase tracking-wide block mb-2">
                        📐 Logic Flow Logic
                      </span>
                      <p className="theme-text-primary font-light text-xs leading-relaxed">
                        {getProposal().flow}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleApplyToForm}
                    onMouseEnter={playHoverSound}
                    disabled={proposalApplied}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-white text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
                    style={{
                      background: proposalApplied
                        ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                        : 'linear-gradient(135deg, #C9739A 0%, #9B6BA8 100%)',
                    }}
                  >
                    {proposalApplied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Proposal Pre-filled in Form / تم الملء بنجاح
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Autofill Contact Form &amp; Send / تعبئة نموذج الاتصال
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleReset}
                    onMouseEnter={playHoverSound}
                    className="px-6 py-3.5 border theme-border-card theme-text-primary rounded-full hover:bg-current/5 transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset Builder / إعادة البناء
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
