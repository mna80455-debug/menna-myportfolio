import { useRef, useState, ReactNode, MouseEvent, CSSProperties } from 'react';

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}

const Magnet = ({
  children,
  padding = 100,
  strength = 3,
  className,
}: MagnetProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({
    transform: 'translate3d(0, 0, 0)',
    transition: 'transform 0.6s ease-in-out',
    willChange: 'transform',
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    // Check if cursor is within padding distance of element edge
    const isWithinX =
      e.clientX >= rect.left - padding && e.clientX <= rect.right + padding;
    const isWithinY =
      e.clientY >= rect.top - padding && e.clientY <= rect.bottom + padding;

    if (isWithinX && isWithinY) {
      setStyle({
        transform: `translate3d(${distX / strength}px, ${distY / strength}px, 0)`,
        transition: 'transform 0.3s ease-out',
        willChange: 'transform',
      });
    }
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'translate3d(0, 0, 0)',
      transition: 'transform 0.6s ease-in-out',
      willChange: 'transform',
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        display: 'inline-block',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default Magnet;
