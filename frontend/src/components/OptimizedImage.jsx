/**
 * Enhanced Image Optimization Component
 * Provides WebP support with fallbacks, lazy loading, and responsive srcset
 */

import React, { useState, useRef, useEffect } from 'react';
import { handleError } from '../utils/errorHandler';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  priority = false,
  sizes = '100vw',
  srcSet,
  customSrcSet = null,
  fallbackSrc = null
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  // Generate responsive srcSet for different screen sizes
  const generateResponsiveSrcSet = (baseSrc) => {
    if (customSrcSet) return customSrcSet;
    
    const extension = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${extension}`, '');
    
    // Generate srcSet for common breakpoints
    return {
      webp: `
        ${baseName}-320w.webp 320w,
        ${baseName}-640w.webp 640w,
        ${baseName}-1024w.webp 1024w,
        ${baseName}-1440w.webp 1440w,
        ${baseName}-1920w.webp 1920w
      `,
      fallback: `
        ${baseName}-320w.${extension} 320w,
        ${baseName}-640w.${extension} 640w,
        ${baseName}-1024w.${extension} 1024w,
        ${baseName}-1440w.${extension} 1440w,
        ${baseName}-1920w.${extension} 1920w
      `
    };
  };

  // Generate optimized sizes attribute based on common breakpoints
  const generateSizes = () => {
    if (sizes !== '100vw') return sizes;
    
    return `
      (max-width: 640px) 100vw,
      (max-width: 1024px) 100vw,
      (max-width: 1440px) 100vw,
      100vw
    `;
  };

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
      { 
        threshold: 0.1, 
        rootMargin: '50px' 
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleImageError = (e) => {
    setHasError(true);
    handleError(new Error(`Failed to load image: ${src}`), 'IMAGE_LOAD_ERROR', 'LOW', {
      imageSource: src,
      altText: alt,
      width,
      height
    });

    // Fallback to fallbackSrc or a placeholder
    if (fallbackSrc && e.target.src !== fallbackSrc) {
      e.target.src = fallbackSrc;
    }
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const sources = generateResponsiveSrcSet(src);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {isInView && !hasError && (
        <picture>
          {/* WebP source with responsive srcset */}
          <source 
            srcSet={sources.webp} 
            type="image/webp" 
            sizes={generateSizes()}
          />
          
          {/* Fallback source with responsive srcset */}
          <source 
            srcSet={sources.fallback} 
            sizes={generateSizes()}
          />
          
          {/* Default image as fallback */}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              aspectRatio: width && height ? `${width}/${height}` : undefined,
              objectFit: 'cover'
            }}
            sizes={generateSizes()}
            {...(srcSet && { srcSet })}
          />
        </picture>
      )}
      
      {/* Loading skeleton */}
      {!isInView && (
        <div 
          className="bg-gray-200 animate-pulse flex items-center justify-center"
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined,
            width: width || '100%',
            height: height || 'auto',
            minHeight: '200px'
          }}
        >
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div 
          className="bg-gray-100 border border-gray-300 rounded flex items-center justify-center"
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined,
            width: width || '100%',
            height: height || 'auto',
            minHeight: '200px'
          }}
        >
          <div className="text-center text-gray-500 p-4">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image unavailable</div>
            <div className="text-xs mt-1">{alt}</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simpler responsive image component for basic use cases
export const ResponsiveImage = ({ src, alt, className = '', ...props }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
    handleError(new Error(`Failed to load image: ${src}`), 'IMAGE_LOAD_ERROR', 'LOW', {
      imageSource: src,
      altText: alt
    });
  };

  if (error) {
    return (
      <div className={`bg-gray-100 border border-gray-300 rounded flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500 p-4">
          <div className="text-sm">{alt}</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`transition-opacity duration-300 ${className}`}
      onError={handleError}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};

// Background image component with optimized loading
export const BackgroundImage = ({ src, alt, children, className = '', ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const handleImageError = () => {
    setError(true);
    handleError(new Error(`Failed to load background image: ${src}`), 'IMAGE_LOAD_ERROR', 'LOW', {
      imageSource: src,
      altText: alt
    });
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {!error && (
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105 blur-sm'
          }`}
          aria-hidden="true"
        />
      )}
      
      <div className={`relative z-10 ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
        {children}
      </div>
      
      {error && (
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <div className="text-gray-600 text-center p-4">
            <div className="text-lg mb-2">🏗️</div>
            <div className="text-sm">Background image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
