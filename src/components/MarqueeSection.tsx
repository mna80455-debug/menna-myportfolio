import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';

const row1Images = [
  '/images/uniroute-hero.png',
  '/images/uniroute-features.png',
  '/images/wasl-hero.png',
  '/images/wasl-how.png',
  '/images/invoice-app.png',
  '/images/portfolio-gen.png',
  '/images/gpa-dashboard.png',
  '/images/university-1.jpeg',
];

const row2Images = [
  '/images/uniroute-how.png',
  '/images/wasl-reviews.png',
  '/images/portfolio-gen-2.png',
  '/images/gpa-planner.png',
  '/images/university-2.jpeg',
  '/images/profile-2.jpeg',
];

// Triple for seamless scrolling
const row1 = [...row1Images, ...row1Images, ...row1Images];
const row2 = [...row2Images, ...row2Images, ...row2Images];

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Use scroll progress through viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Transform scroll progress to clean horizontal translation ranges
  const x1 = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const x2 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section
      ref={sectionRef}
      className="theme-bg-primary pt-20 sm:pt-28 md:pt-36 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1 — moves right */}
        <motion.div
          className="flex gap-3"
          style={{
            x: x1,
            willChange: 'transform',
          }}
        >
          {row1.map((src, i) => (
            <div
              key={`r1-${i}`}
              className="w-[380px] h-[240px] sm:w-[420px] sm:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden"
            >
              <ImageWithFallback
                src={src}
                alt={`Project screenshot ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>

        {/* Row 2 — moves left */}
        <motion.div
          className="flex gap-3"
          style={{
            x: x2,
            willChange: 'transform',
          }}
        >
          {row2.map((src, i) => (
            <div
              key={`r2-${i}`}
              className="w-[380px] h-[240px] sm:w-[420px] sm:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden"
            >
              <ImageWithFallback
                src={src}
                alt={`Project screenshot ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
