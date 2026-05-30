import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareCode, X, Send, Sparkles } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  isTypingEffect?: boolean;
}

const quickReplies = [
  { id: 'who', text: '👩‍💻 من هي منة عليوة؟', textEn: 'Who is Menna?' },
  { id: 'projects', text: '🚀 ما هي أبرز مشاريعها؟', textEn: 'Key Projects' },
  { id: 'tech', text: '🛠️ ما هي التقنيات التي تتقنها؟', textEn: 'Tech Stack' },
  { id: 'contact', text: '📞 كيف يمكنني التواصل معها؟', textEn: 'Contact Info' },
];

const responses: Record<string, { ar: string; en: string }> = {
  who: {
    ar: 'منة عليوة هي طالبة تكنولوجيا معلومات (IT) في السنة الثانية بجامعة دلتا للعلوم والتكنولوجيا. شغوفة بهندسة البرمجيات وتحليل النظم وتصميم واجهات المستخدم (UI/UX)، وتبني أدوات ذكية لحل مشكلات الطلاب والشركات.',
    en: 'Menna Aliwa is a 2nd-year IT student at Delta University for Science & Technology. She is passionate about software engineering, systems analysis, UI/UX design, and building smart tools to solve real-world student and corporate problems.',
  },
  projects: {
    ar: 'أبرز مشاريع منة المكتملة:\n• UniRoute: نظام نقل جامعي متكامل وموثق بالكامل.\n• Wasl Platform: منصة لربط الطلاب بفرص التدريب والعمل.\n• Portfolio Generator: أداة مدعومة بالذكاء الاصطناعي لإنشاء البورتفوليو مع فحص ATS.\n• GradeIQ: متعقب معدل ذكي مع مستشار أكاديمي بموديل تنبؤ.',
    en: "Menna's top projects:\n• UniRoute: Comprehensive university student transport system.\n• Wasl Platform: Student internship & job networking database.\n• Portfolio Generator: AI-driven developer portfolio builder with ATS checks.\n• GradeIQ: Smart academic planner & predictive GPA tracking advisor.",
  },
  tech: {
    ar: 'التقنيات والأدوات الأساسية:\n• لغات البرمجة: C, C++, JavaScript, HTML/CSS, SQL\n• قواعد البيانات: Oracle DB, Supabase, Firebase\n• الأدوات: Git & GitHub, VS Code, Figma, Vercel, AI Prompting',
    en: 'Core Technologies & Tools:\n• Languages: C, C++, JavaScript, HTML/CSS, SQL\n• Databases: Oracle DB, Supabase, Firebase\n• Tools & Platforms: Git & GitHub, VS Code, Figma, Vercel, AI Prompting',
  },
  contact: {
    ar: 'يمكنك التواصل مع منة مباشرة عبر:\n• البريد الإلكتروني: mna80455@gmail.com\n• واتساب: https://wa.me/20101752728\nأو يمكنك الضغط على زر "Contact Me" بالأسفل لتعبئة النموذج وإرسال رسالة مباشرة.',
    en: 'You can contact Menna directly via:\n• Email: mna80455@gmail.com\n• WhatsApp: https://wa.me/20101752728\nOr click the "Contact Me" button below to fill out the form and send a message.',
  },
};

const renderMessageText = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      const isWhatsApp = part.includes('wa.me');
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C9739A] hover:underline font-bold break-all inline-flex items-center gap-1 bg-[#C9739A]/10 px-2 py-0.5 rounded"
        >
          {isWhatsApp ? 'WhatsApp Chat 🔗' : part}
        </a>
      );
    }
    return part;
  });
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'أهلاً بك! أنا مساعد منة الذكي المبرمج بالكامل لتسريع إجابة استفساراتك. اختر سؤالاً من الأسفل لنتحدث! 👋\n\nWelcome! I am Menna\'s AI assistant. Pick any question below to chat!',
      sender: 'bot',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleQuickReply = (replyId: string, replyText: string) => {
    playClickSound();

    // Add user message
    const userMsgId = Date.now().toString();
    setMessages((prev) => [...prev, { id: userMsgId, text: replyText, sender: 'user' }]);

    // Trigger typing state
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsgId = (Date.now() + 1).toString();
      const responseObj = responses[replyId];
      const responseText = `${responseObj.en}\n\n🤖 ${responseObj.ar}`;

      // Append bot message container
      setMessages((prev) => [...prev, { id: botMsgId, text: responseText, sender: 'bot', isTypingEffect: true }]);
      playClickSound();

      // Disable typing effect once the character sequence has finished rendering
      const typingDuration = responseText.length * 15;
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) => (m.id === botMsgId ? { ...m, isTypingEffect: false } : m))
        );
      }, typingDuration + 100);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => {
          playClickSound();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={playHoverSound}
        className="fixed bottom-22 right-6 md:bottom-6 md:right-22 z-[9999] w-12 h-12 rounded-full bg-gradient-to-r from-[#C9739A] to-[#9B6BA8] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(201,115,154,0.3)] hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
        aria-label="Toggle AI assistant"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquareCode className="w-5 h-5" />}
      </motion.button>

      {/* Chat window overlay drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed bottom-36 right-6 md:bottom-20 md:right-22 w-[310px] sm:w-[350px] h-[480px] rounded-3xl theme-bg-card border theme-border-card shadow-2xl z-[9999] flex flex-col overflow-hidden select-none"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#C9739A] to-[#9B6BA8] p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Sparkles className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold tracking-wide">
                    مساعد منة الافتراضي
                  </h3>
                  <span className="text-[9px] opacity-75 block font-light">
                    Menna's AI Assistant · Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  setIsOpen(false);
                }}
                onMouseEnter={playHoverSound}
                className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#C9739A] text-white self-end rounded-br-sm'
                      : 'theme-input-bg theme-text-secondary self-start rounded-bl-sm border border-current/5'
                  }`}
                >
                  {msg.isTypingEffect ? (
                    <TypingEffect text={msg.text} />
                  ) : (
                    renderMessageText(msg.text)
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="bg-theme-input-bg theme-input-bg p-3 rounded-2xl rounded-bl-sm border border-current/5 self-start flex gap-1 items-center max-w-[60px] justify-center">
                  <span className="w-1.5 h-1.5 bg-[#C9739A] rounded-full animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 bg-[#C9739A] rounded-full animate-bounce delay-200" />
                  <span className="w-1.5 h-1.5 bg-[#C9739A] rounded-full animate-bounce delay-300" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Footer / Quick Replies */}
            <div className="p-3 border-t theme-border-card bg-current/5">
              <span className="text-[10px] theme-text-muted font-medium uppercase tracking-wider block mb-2 px-1">
                الأسئلة الشائعة / Quick Questions:
              </span>
              <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply.id, reply.text)}
                    onMouseEnter={playHoverSound}
                    className="w-full text-left px-3 py-2 rounded-xl text-[11px] theme-input-bg border border-current/5 theme-text-secondary hover:border-[#C9739A]/30 hover:bg-current/5 transition-all text-right dir-rtl flex justify-between items-center cursor-pointer"
                  >
                    <span className="font-medium text-[#C9739A]">{reply.text}</span>
                    <span className="text-[9px] opacity-60 font-light">{reply.textEn}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Subcomponent for character-by-character render with mechanical audio ticks
function TypingEffect({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text.charAt(index));
      index++;
      // Play tick sound every few characters to represent typing
      if (index % 3 === 0) {
        playHoverSound();
      }
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [text]);

  return <>{displayText}</>;
}
