import React, { useState } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  containerClassName?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt = 'Image',
  className = '',
  containerClassName = '',
  fallbackText = 'SW',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Derive 2 letter monogram from fallbackText or alt
  const initials = (fallbackText || alt || 'SW')
    .split(' ')
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Skeleton / Shimmer before image finishes loading */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-zinc-200/60 dark:bg-zinc-800/60 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-purple-500/40 border-t-purple-500 animate-spin" />
        </div>
      )}

      {/* Graceful Fallback Gradient if image fails or broken URL */}
      {error ? (
        <div className={`w-full h-full min-h-[60px] bg-gradient-to-br from-purple-700 via-pink-600 to-indigo-800 flex flex-col items-center justify-center text-white p-3 text-center ${className}`}>
          <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center font-black text-sm tracking-wider shadow">
            {initials}
          </div>
          <span className="text-[10px] font-semibold text-white/80 mt-1 truncate max-w-full px-1">
            {fallbackText || alt}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`transition-all duration-500 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${className}`}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};
