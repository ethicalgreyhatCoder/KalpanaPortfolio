import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './MediaCarousel.css';

const MediaCarousel = ({ media = [], className = '' }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'center',
        skipSnaps: false,
        duration: 30, // Luxury smooth easing
        watchDrag: true,  // Enable drag/swipe! 
        watchSlides: true, // Watch for slide changes
        dragFree: false    // Snap to slides, don't free scroll
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);
    const [showSwipeHint, setShowSwipeHint] = useState(true);
    const videoRefs = useRef([]);

    // Track arrow availability
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    // Initialize scroll snaps
    const onInit = useCallback(() => {
        if (!emblaApi) return;
        const snaps = emblaApi.scrollSnapList();
        setScrollSnaps(snaps);

        // Update arrow availability
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    // Handle slide selection
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        const newIndex = emblaApi.selectedScrollSnap();
        setSelectedIndex(newIndex);

        // Hide swipe hint after first interaction
        if (showSwipeHint) {
            setShowSwipeHint(false);
        }

        // Update arrow availability
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());

        // Pause all videos except the active one
        videoRefs.current.forEach((video, index) => {
            if (video) {
                if (index === emblaApi.selectedScrollSnap()) {
                    // Play active video
                    video.play().catch(err => console.log('Video autoplay prevented:', err));
                } else {
                    // Pause inactive videos
                    video.pause();
                }
            }
        });
    }, [emblaApi, showSwipeHint]);

    // Setup event listeners
    useEffect(() => {
        if (!emblaApi) return;

        onInit();
        onSelect();

        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onInit);

        // Consolidated pointer event logging
        emblaApi.on('pointerDown', () => {
            console.log('Drag started');
        });

        emblaApi.on('pointerUp', () => {
            console.log('Drag ended');
        });

        emblaApi.on('settle', () => console.log('Carousel settled'));

        // Track scroll events
        emblaApi.on('scroll', () => {
            const progress = emblaApi.scrollProgress();
            // Optional: log scroll progress for debugging
            // console.log('Scroll progress:', progress.toFixed(3));
        });

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onInit);
        };
    }, [emblaApi, onInit, onSelect, media.length]);

    // Keyboard navigation
    useEffect(() => {
        if (!emblaApi) return;

        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                emblaApi.scrollPrev();
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                emblaApi.scrollNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [emblaApi]);

    // Auto-play first video on mount (if first slide is video)
    useEffect(() => {
        if (media[0]?.type === 'video' && videoRefs.current[0]) {
            videoRefs.current[0].play().catch(err => console.log('Video autoplay prevented:', err));
        }
    }, [media]);

    // Scroll to specific slide
    const scrollTo = useCallback((index) => {
        console.log('🔄 Attempting to scroll to slide:', index);
        if (emblaApi) {
            emblaApi.scrollTo(index);
            console.log('✅ Scroll command sent');
        } else {
            console.log('❌ Cannot scroll - emblaApi not available');
        }
    }, [emblaApi]);

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!media || media.length === 0) {
        return <div className="media-carousel-empty">No media available</div>;
    }

    return (
        <div className={`media-carousel ${className}`}>
            <div
                className="embla"
                ref={emblaRef}
            >
                <div className="embla__container">
                    {media.map((item, index) => (
                        <div className="embla__slide" key={index}>
                            {item.type === 'video' ? (
                                <video
                                    ref={el => videoRefs.current[index] = el}
                                    className="carousel-video"
                                    src={item.src}
                                    muted={item.muted !== false}
                                    loop={item.loop !== false}
                                    playsInline
                                    preload={index === 0 ? 'auto' : 'metadata'}
                                    aria-label={item.alt || `Video ${index + 1} `}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img
                                    className="carousel-image"
                                    src={item.src}
                                    alt={item.alt || `Slide ${index + 1} `}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            {media.length > 1 && (
                <>
                    <button
                        className={`embla__arrow embla__arrow--prev ${!canScrollPrev ? 'embla__arrow--disabled' : ''}`}
                        onClick={() => emblaApi?.scrollPrev()}
                        disabled={!canScrollPrev}
                        aria-label="Previous slide"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <button
                        className={`embla__arrow embla__arrow--next ${!canScrollNext ? 'embla__arrow--disabled' : ''}`}
                        onClick={() => emblaApi?.scrollNext()}
                        disabled={!canScrollNext}
                        aria-label="Next slide"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </>
            )}

            {/* Swipe Hint - Shows initially, fades after first interaction */}
            {showSwipeHint && media.length > 1 && !prefersReducedMotion && (
                <div className="swipe-hint" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                    <span>Swipe</span>
                </div>
            )}

            {/* Pagination Dots */}
            {media.length > 1 && (
                <div className="embla__dots" role="tablist" aria-label="Carousel navigation">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''} `}
                            type="button"
                            role="tab"
                            aria-selected={index === selectedIndex}
                            aria-label={`Go to slide ${index + 1} `}
                            onClick={() => scrollTo(index)}
                        />
                    ))}
                </div>
            )}

            {/* Screen reader announcement */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                Slide {selectedIndex + 1} of {media.length}
            </div>
        </div>
    );
};

export default MediaCarousel;
