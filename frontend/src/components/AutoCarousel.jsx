import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Derive the optimized "medium" variant path (mirrors getOptimizedImage in Portfolio).
const toMedium = (src) =>
  src && src.startsWith('/images/') ? src.replace('/images/', '/images/medium/') : src;

/**
 * AutoCarousel — an auto-advancing image slideshow.
 * SSR-safe (vite-react-ssg): all browser APIs are touched only inside effects.
 *
 * @param {Array}   slides        [{ src, title, caption }]
 * @param {number}  interval      ms between auto-advances (default 4500)
 * @param {string}  aspectClass   Tailwind aspect ratio for the frame
 * @param {function} onSlideClick called with the active index when a slide is clicked
 */
const AutoCarousel = ({
  slides = [],
  interval = 4500,
  aspectClass = 'aspect-[16/9]',
  onSlideClick,
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  // Default to "in view" so autoplay runs from mount even if IntersectionObserver
  // never reports; the observer is only used to PAUSE while scrolled off-screen.
  const [inView, setInView] = useState(true);
  const containerRef = useRef(null);

  const count = slides.length;
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  // Respect the user's reduced-motion preference.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  // Pause auto-play while the carousel is scrolled out of view (optimization only).
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const el = containerRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The auto-advance timer.
  useEffect(() => {
    if (paused || reduced || !inView || count <= 1) return undefined;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [paused, reduced, inView, count, interval, next]);

  if (count === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects slideshow"
    >
      <div className={`relative ${aspectClass} w-full overflow-hidden rounded-xl shadow-2xl bg-slate-200`}>
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            tabIndex={i === index ? 0 : -1}
            aria-hidden={i === index ? undefined : true}
            onClick={() => onSlideClick?.(index)}
            className={`absolute inset-0 h-full w-full cursor-pointer transition-opacity duration-700 ease-in-out ${
              i === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={toMedium(slide.src)}
              alt={[slide.title, slide.caption].filter(Boolean).join(' — ') || 'Project photo'}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="h-full w-full object-cover"
            />
            {(slide.title || slide.caption) && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 md:p-6 text-left">
                {slide.title && (
                  <h3 className="text-white text-lg md:text-2xl font-bold drop-shadow">{slide.title}</h3>
                )}
                {slide.caption && (
                  <p className="text-gray-200 text-sm md:text-base drop-shadow">{slide.caption}</p>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {count > 1 && (
        <>
          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((slide, i) => (
              <button
                key={`dot-${slide.src}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AutoCarousel;
