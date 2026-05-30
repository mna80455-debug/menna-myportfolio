import { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onFinish: () => void;
}

const LoadingScreen = ({ onFinish }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const timerDone = useRef(false);
  const windowLoaded = useRef(false);
  const finished = useRef(false);

  const tryFinish = () => {
    if (timerDone.current && windowLoaded.current && !finished.current) {
      finished.current = true;
      onFinish();
    }
  };

  useEffect(() => {
    // Animate progress bar from 0 to 100 over ~2.2s
    const duration = 2200;
    const interval = 16;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setProgress(Math.min((step / steps) * 100, 100));
      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    // After 2.5s, mark timer as done
    const timeout = setTimeout(() => {
      timerDone.current = true;
      tryFinish();
    }, 2500);

    // Listen for window load event
    const handleLoad = () => {
      windowLoaded.current = true;
      tryFinish();
    };

    if (document.readyState === 'complete') {
      windowLoaded.current = true;
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
      window.removeEventListener('load', handleLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-check finish conditions when timer/load state changes
  useEffect(() => {
    tryFinish();
  });

  // Scattered background screenshots configuration
  const floatingImages = useMemo(() => {
    const list = [
      'WhatsApp Image 2026-05-29 at 5.01.10 AM.jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.20 AM.jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.24 AM (1).jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.24 AM (2).jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.24 AM.jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.26 AM (1).jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.26 AM (2).jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.26 AM.jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.34 AM.jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.37 AM.jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.40 AM.jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.41 AM (1).jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.41 AM (2).jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.41 AM (3).jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.41 AM (4).jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.41 AM (5).jpeg',
      'WhatsApp Image 2026-05-29 at 5.01.41 AM.jpeg',
    ];

    return list.map((src, index) => {
      // Split images between left gutter (2% to 32%) and right gutter (68% to 94%)
      const isLeft = index % 2 === 0;
      const xRange = isLeft ? [2, 30] : [70, 94];
      const left = Math.random() * (xRange[1] - xRange[0]) + xRange[0];
      
      // Distribute vertically across the viewport (5% to 85%)
      const top = (index / list.length) * 80 + 5 + Math.random() * 5;
      
      const rotation = Math.random() * 26 - 13; // -13deg to 13deg
      const scale = Math.random() * 0.12 + 0.88; // 0.88 to 1.0
      const delay = Math.random() * 0.6; // stagger fade in
      
      const floatY = Math.random() * 20 + 15; // 15px to 35px
      const duration = Math.random() * 4 + 7; // 7s to 11s
      
      return {
        src: `/cv-images/${src}`,
        left: `${left}%`,
        top: `${top}%`,
        rotation,
        scale,
        delay,
        floatY: isLeft ? -floatY : floatY,
        duration,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] bg-[#0C0C0C] flex items-center justify-center flex-col overflow-hidden select-none">
      {/* Background screenshots collage */}
      {floatingImages.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.7, rotate: item.rotation }}
          animate={{
            opacity: 0.35, // Clearer backdrop visibility
            scale: item.scale,
            y: [0, item.floatY, 0],
            rotate: [item.rotation, item.rotation + 2, item.rotation],
          }}
          transition={{
            opacity: { duration: 1.2, ease: "easeOut", delay: item.delay },
            scale: { duration: 1.2, ease: "easeOut", delay: item.delay },
            y: {
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: item.duration * 1.3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute w-16 sm:w-24 md:w-32 lg:w-36 pointer-events-none rounded-lg overflow-hidden border border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
          style={{
            left: item.left,
            top: item.top,
          }}
        >
          <img
            src={item.src}
            alt="Mockup preview"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      ))}

      {/* Main loading screen content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center relative z-10"
      >
        <h1
          className="font-outfit font-extrabold text-5xl sm:text-6xl bg-clip-text text-transparent"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #C9739A, #E8A0BF, #D8B4D8, #9B6BA8)',
          }}
        >
          menna.
        </h1>

        <div className="w-48 sm:w-56 h-[2px] mt-6 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full rounded-full"
            style={{
              background:
                'linear-gradient(90deg, #C9739A, #E8A0BF, #9B6BA8)',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
