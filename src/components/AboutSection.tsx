import { useRef, useState, useEffect } from 'react';
import { useInView, motion } from 'framer-motion';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';
import ImageWithFallback from './ImageWithFallback';
import { playClickSound, playHoverSound } from '../utils/audio';

interface CounterItemProps {
  target: number;
  suffix: string;
  labelEn: string;
  labelAr: string;
  duration?: number;
}

function CounterItem({ target, suffix, labelEn, labelAr, duration = 1.5 }: CounterItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, target, duration]);

  return (
    <div
      ref={ref}
      onMouseEnter={playHoverSound}
      className="flex flex-col items-center p-4 sm:p-5 theme-bg-card border theme-border-card rounded-2xl w-full text-center shadow-[0_10px_30px_rgba(201,115,154,0.02)] transition-all duration-300 hover:border-[#C9739A]/30 hover:scale-[1.03]"
    >
      <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#C9739A] mb-1">
        {count}
        {suffix}
      </span>
      <span className="text-[10px] sm:text-xs theme-text-primary font-semibold uppercase tracking-wider">
        {labelEn}
      </span>
      <span className="text-[9px] sm:text-[10px] theme-text-muted mt-0.5 font-light">
        {labelAr}
      </span>
    </div>
  );
}

interface PolaroidCardProps {
  src: string;
  caption: string;
  index: number;
  activeIndex: number;
  onClick: () => void;
}

function PolaroidCard({ src, caption, index, activeIndex, onClick }: PolaroidCardProps) {
  const isTop = index === activeIndex;

  // Visual layout offset variants for fanning out
  const rotations = [-5, 6, -3];
  const translatesX = [-18, 12, -6];
  
  const rot = rotations[index % rotations.length];
  const transX = translatesX[index % translatesX.length];

  return (
    <motion.div
      style={{ zIndex: isTop ? 30 : 10 + index }}
      animate={{
        rotate: isTop ? 0 : rot,
        x: isTop ? 0 : transX,
        y: isTop ? -10 : 0,
        scale: isTop ? 1.04 : 0.95,
      }}
      whileHover={{
        scale: 1.05,
        rotate: isTop ? 1 : rot * 1.3,
        y: -15,
        zIndex: 40,
        transition: { duration: 0.2 }
      }}
      onClick={onClick}
      className="absolute w-[230px] sm:w-[260px] bg-white p-3 pb-6 rounded-md shadow-xl border border-black/5 cursor-pointer transform origin-bottom transition-shadow duration-300 hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] select-none"
    >
      <div className="w-full aspect-[4/3] bg-neutral-200 overflow-hidden rounded-sm relative">
        <ImageWithFallback
          src={src}
          alt={caption}
          className="w-full h-full object-cover grayscale-[10%] contrast-[105%] pointer-events-none"
          loading="lazy"
        />
      </div>
      <p className="font-outfit font-medium text-center text-[10px] sm:text-xs text-neutral-700 mt-4 leading-none uppercase tracking-wide">
        {caption}
      </p>
    </motion.div>
  );
}

export default function AboutSection() {
  const [activePhoto, setActivePhoto] = useState(0);

  const photos = [
    { src: '/images/profile-2.jpeg', caption: 'IT Student / حياة برمجية' },
    { src: '/images/university-2.jpeg', caption: 'Delta University / جامعة الدلتا' },
    { src: '/images/university-1.jpeg', caption: 'Campus Activities / الأنشطة الطلابية' },
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center flex-col px-5 sm:px-8 md:px-10 py-20 relative"
    >
      <div className="max-w-6xl w-full flex flex-col gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,11vw,140px)]">
            About Me
          </h2>
        </FadeIn>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bio & Counter Stats */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-8 sm:gap-10">
            <AnimatedText
              text="Second-year IT student at Delta University with a passion for software development, system analysis, and AI-powered applications. I build smart web tools that solve real-world problems — from database-driven platforms to full-stack apps. Proficient in leveraging AI tools to accelerate development and deliver production-quality results. Let's build something incredible together!"
              className="theme-text-primary font-medium text-center lg:text-left leading-relaxed max-w-[560px] text-[clamp(0.95rem,1.8vw,1.3rem)] animate-word"
            />

            {/* Stats Grid */}
            <FadeIn delay={0.2} y={30} className="w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <CounterItem
                  target={5}
                  suffix="+"
                  labelEn="Projects Done"
                  labelAr="مشاريع منجزة"
                />
                <CounterItem
                  target={15}
                  suffix="+"
                  labelEn="Tech Skills"
                  labelAr="مهارات برمجية"
                />
                <CounterItem
                  target={250}
                  suffix="+"
                  labelEn="Git Commits"
                  labelAr="مساهمات برمجية"
                />
                <CounterItem
                  target={800}
                  suffix="+"
                  labelEn="Coding Hours"
                  labelAr="ساعات التطوير"
                />
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Polaroid Card Stack */}
          <div className="lg:col-span-5 flex justify-center items-center relative min-h-[350px] sm:min-h-[400px]">
            <FadeIn delay={0.3} y={30} className="w-full h-full flex justify-center items-center">
              <div className="relative w-[230px] sm:w-[260px] h-[300px] sm:h-[350px] flex items-center justify-center">
                {photos.map((photo, index) => (
                  <PolaroidCard
                    key={photo.src}
                    src={photo.src}
                    caption={photo.caption}
                    index={index}
                    activeIndex={activePhoto}
                    onClick={() => {
                      playClickSound();
                      // Cycle cards by updating top active index
                      setActivePhoto(index);
                    }}
                  />
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      <div className="mt-14 sm:mt-18 md:mt-22 relative z-20">
        <FadeIn delay={0.4} y={20}>
          <div onClick={() => playClickSound()} onMouseEnter={playHoverSound}>
            <ContactButton />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
