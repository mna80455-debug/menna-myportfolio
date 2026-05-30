import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          onMouseEnter={playHoverSound}
          className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full bg-[#111114] border border-[#C9739A]/20 flex items-center justify-center shadow-lg hover:border-[#C9739A]/60 cursor-pointer text-[#D7E2EA] transition-colors"
          style={{ pointerEvents: 'auto' }}
        >
          {/* Progress Ring */}
          <svg className="absolute w-full h-full -rotate-90">
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-white/10 fill-none"
              strokeWidth="2.5"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-[#C9739A] fill-none transition-all duration-100"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <ArrowUp className="w-5 h-5 relative z-10 text-[#C9739A]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
