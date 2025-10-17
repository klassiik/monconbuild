/**
 * Image Optimization Component
 * Provides WebP support with fallbacks and lazy loading
 */

import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  priority = false,
  sizes = '100vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate WebP and fallback sources
  const generateSources = (baseSrc) => {
    const extension = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${extension}`, '');
    
    return {
      webp: `${baseName}.webp`,
      original: baseSrc
    };
  };

  const sources = generateSources(src);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {isInView && (
        <picture>
          <source srcSet={sources.webp} type="image/webp" sizes={sizes} />
          <img
            src={sources.original}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              aspectRatio: width && height ? `${width}/${height}` : undefined
            }}
          />
        </picture>
      )}
      
      {!isInView && (
        <div 
          className="bg-gray-200 animate-pulse"
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined,
            width: width || '100%',
            height: height || 'auto'
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;