import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  loading?: 'lazy' | 'eager';
}

const ImageWithFallback = ({
  src,
  alt,
  className,
  fallbackClassName,
  loading = 'lazy',
}: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center ${className ?? ''} ${fallbackClassName ?? ''}`}
        style={{
          background:
            'linear-gradient(135deg, rgba(201,115,154,0.1), rgba(155,107,168,0.1))',
        }}
      >
        <ImageIcon className="w-8 h-8 text-[#9E9EAA]" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading={loading}
    />
  );
};

export default ImageWithFallback;
