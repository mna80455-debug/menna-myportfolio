import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackToTop from './components/BackToTop';
import AIChatbot from './components/AIChatbot';
import LearningTimeline from './components/LearningTimeline';
import SystemAnalysisWizard from './components/SystemAnalysisWizard';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Toggle class on document element when theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  // Hide the HTML splash screen when React mounts
  useEffect(() => {
    const splash = document.getElementById('splash');
    if (splash) splash.classList.add('hide');
    setTimeout(() => splash?.remove(), 700);
  }, []);

  // Scroll progress indicator physics
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (loading) {
    return <LoadingScreen onFinish={() => setLoading(false)} />;
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div style={{ overflowX: 'clip' }} className="font-outfit relative theme-bg-primary min-h-screen tech-grid">
      {/* Custom Desktop Glow Cursor */}
      <CustomCursor />

      {/* Back to Top Progress Circle */}
      <BackToTop />

      {/* Floating AI Chatbot Simulator */}
      <AIChatbot />

      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C9739A] via-[#9B6BA8] to-[#E8A0BF] origin-left z-[100000]"
        style={{ scaleX }}
      />
      {/* Slow-moving ambient background blobs */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#C9739A] opacity-[0.06] blur-[80px] sm:blur-[130px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] right-[-10%] w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] rounded-full bg-[#9B6BA8] opacity-[0.05] blur-[80px] sm:blur-[130px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, 60, -20, 0],
          scale: [1, 1.05, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#E8A0BF] opacity-[0.04] blur-[100px] pointer-events-none z-0"
      />

      <div className="relative z-10">
        <HeroSection theme={theme} toggleTheme={toggleTheme} />
        <MarqueeSection />
        <AboutSection />
        <SkillsSection />
        <LearningTimeline />
        <ProjectsSection />
        <EducationSection />
        <SystemAnalysisWizard />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
