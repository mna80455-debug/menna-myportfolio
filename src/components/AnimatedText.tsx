import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const WordSpan = ({
  word,
  progress,
  index,
  total,
}: {
  word: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) => {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity, position: 'relative' }} className="inline-block mr-1.5">
      {word}
    </motion.span>
  );
};

const AnimatedText = ({ text, className }: AnimatedTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.2'],
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <WordSpan
          key={i}
          word={word}
          progress={scrollYProgress}
          index={i}
          total={words.length}
        />
      ))}
    </p>
  );
};

export default AnimatedText;
