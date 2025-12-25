import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import RevealOnScroll from './RevealOnScroll';
import { modalContent } from '../data/aboutModalContent.js';
import { aboutTimelineData } from '../data/aboutTimelineData';
import { coreValuesData } from '../data/coreValuesData';
import './About.css';
import './About-Enhanced.css';
import './About-Cards-Timeline-Enhanced.css';
import './BottomSheetScrollIndicator.css';

const About = () => {
    const [activeTimelineDots, setActiveTimelineDots] = useState({});

    // NEW CARD CAROUSEL STATE
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const carouselRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isDragging, setIsDragging] = useState(false);
    const [swipeProgress, setSwipeProgress] = useState(0); // -1 to 1 for smooth interpolation
    const velocityRef = useRef(0);
    const lastPosRef = useRef({ x: 0, time: 0 });

    // Desktop fade-cycle state (unchanged)
    const [desktopPhotoIndex, setDesktopPhotoIndex] = useState(0);
    const desktopCycleIntervalRef = useRef(null);

    // Cherry blossom petals state
    const [petals, setPetals] = useState([]);

    // Bottom sheet modal state (mobile only)
    const [bottomSheetCard, setBottomSheetCard] = useState(null); // 'artist', 'strategist', or null
    const [bottomSheetClosing, setBottomSheetClosing] = useState(false);
    const bottomSheetRef = useRef(null);

    // TASK 3: Core Values bottom sheet state (mobile)
    const [valueSheetOpen, setValueSheetOpen] = useState(null); // 'authenticity', 'client-focus', 'hygiene', 'growth', or null
    const [valueSheetClosing, setValueSheetClosing] = useState(false);
    const valueSheetRef = useRef(null);

    // Core Values desktop modal state
    const [desktopValueModalOpen, setDesktopValueModalOpen] = useState(null); // value key or null
    const [desktopValueModalClosing, setDesktopValueModalClosing] = useState(false);
    const desktopValueModalRef = useRef(null);

    // Scroll direction indicators
    const [showUpArrow, setShowUpArrow] = useState(false);
    const [showDownArrow, setShowDownArrow] = useState(true);
    const sheetContentRef = useRef(null);

    // Desktop modal state (desktop only - centered modal)
    const [desktopModalCard, setDesktopModalCard] = useState(null); // 'artist', 'strategist', or null
    const [desktopModalClosing, setDesktopModalClosing] = useState(false);
    const desktopModalRef = useRef(null);


    // CARD DATA - Dynamically load all available portrait photos
    // Add more Kalpana-About5.webp, About6.webp etc. and they'll auto-appear!
    const cardData = [
        { image: `${import.meta.env.BASE_URL}Kalpana-About.webp`, title: 'Bridal Elegance' },
        { image: `${import.meta.env.BASE_URL}Kalpana-About2.webp`, title: 'Editorial Artistry' },
        { image: `${import.meta.env.BASE_URL}Kalpana-About3.webp`, title: 'Natural Radiance' },
        { image: `${import.meta.env.BASE_URL}Kalpana-About4.webp`, title: 'Glamour & Grace' }
    ].filter(card => card.image); // Filter out any missing images

    // Desktop photos (unchanged)
    const desktopPhotos = [
        `${import.meta.env.BASE_URL}Kalpana-About.webp`,
        `${import.meta.env.BASE_URL}Kalpana-About3.webp`,
        `${import.meta.env.BASE_URL}Kalpana-About2.webp`,
        `${import.meta.env.BASE_URL}Kalpana-About3.webp`,
        `${import.meta.env.BASE_URL}Kalpana-About.webp`,
        `${import.meta.env.BASE_URL}Kalpana-About2.webp`,
        `${import.meta.env.BASE_URL}Kalpana-About3.webp`,
        `${import.meta.env.BASE_URL}Kalpana-About.webp`,
        `${import.meta.env.BASE_URL}Kalpana-About2.webp`,
        `${import.meta.env.BASE_URL}Kalpana-About3.webp`,
    ];

    // Generate cherry blossom petals on mount (pure function outside of render)

    useEffect(() => {
        const generatedPetals = [...Array(15)].map(() => ({
            left: Math.random() * 100,
            delay: Math.random() * 10,
            duration: Math.random() * 15 + 25,
            size: Math.random() * 10 + 10,
        }));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPetals(generatedPetals);
    }, []);

    // Timeline observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('data-timeline-id');
                    setActiveTimelineDots((prev) => ({
                        ...prev,
                        [id]: true,
                    }));
                }
            });
        }, { threshold: 0.5 });

        // Observe timeline dots
        document.querySelectorAll('[data-timeline-id]').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Handle responsive change
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // NEW CARD CAROUSEL TOUCH & MOUSE HANDLERS
    // Supports both mobile touch and desktop mouse drag at mobile viewport width
    useEffect(() => {
        if (!isMobile || !carouselRef.current) return;

        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let isHorizontalLocked = false;
        let isPointerDown = false;

        // UNIFIED START HANDLER (touch or mouse)
        const handleStart = (clientX, clientY) => {
            startX = clientX;
            startY = clientY;
            currentX = startX;
            isHorizontalLocked = false;
            isPointerDown = true;

            setIsDragging(true);
            setSwipeProgress(0);

            // Initialize velocity tracking
            lastPosRef.current = { x: startX, time: Date.now() };
            velocityRef.current = 0;
        };

        // UNIFIED MOVE HANDLER (touch or mouse)
        const handleMove = (clientX, clientY, event) => {
            // CRITICAL FIX: Only check isPointerDown (synchronous local variable)
            // Don't check isDragging (async state) - causes every-other-swipe to fail
            if (!isPointerDown) return;

            currentX = clientX;
            const currentY = clientY;
            const diffX = Math.abs(currentX - startX);
            const diffY = Math.abs(currentY - startY);

            // HORIZONTAL INTENT DETECTION: Detect early with 8px threshold
            // Once horizontal intent is detected, lock the gesture
            if (!isHorizontalLocked && (diffX > 8 || diffY > 8)) {
                isHorizontalLocked = diffX > diffY;
            }

            // GESTURE LOCK: If horizontal, prevent page scroll/navigation
            if (isHorizontalLocked) {
                event.preventDefault();
                event.stopPropagation();
            }

            // Calculate drag offset using startX directly
            // Positive offset = swiped RIGHT → show previous card
            // Negative offset = swiped LEFT → show next card
            const offset = currentX - startX;
            const containerWidth = carouselRef.current?.offsetWidth || 300;
            const progress = offset / containerWidth; // Normalized -1 to 1

            // FIX #2: Reduced sensitivity from 2.0 to 1.2 for more controlled feel
            // Small finger movements no longer cause aggressive visual jumps
            setSwipeProgress(Math.max(-1, Math.min(1, progress * 1.2)));

            // Calculate velocity for snap behavior
            const now = Date.now();
            const timeDelta = now - lastPosRef.current.time;
            if (timeDelta > 0) {
                const velocity = (currentX - lastPosRef.current.x) / timeDelta;
                velocityRef.current = velocity;
                lastPosRef.current = { x: currentX, time: now };
            }
        };

        // UNIFIED END HANDLER (touch or mouse)
        const handleEnd = () => {
            // CRITICAL FIX: Only check isPointerDown (synchronous)
            // Don't check isDragging - it's async state and causes cards to never advance
            if (!isPointerDown) return;

            const threshold = 80; // Minimum drag distance to trigger swipe
            const velocityThreshold = 0.5; // Fast swipe detection (px/ms)

            setIsDragging(false);
            isPointerDown = false;

            // CRITICAL: Calculate final swipe delta using startX directly
            // This avoids potential stale state from dragOffset
            const finalDelta = currentX - startX;

            // Determine if we should advance to next/previous card
            const shouldAdvance = Math.abs(finalDelta) > threshold || Math.abs(velocityRef.current) > velocityThreshold;

            if (shouldAdvance) {
                // SWIPE DIRECTION LOGIC (using startX for accuracy):
                // finalDelta < 0 → user dragged LEFT → show NEXT card
                // finalDelta > 0 → user dragged RIGHT → show PREVIOUS card
                if (finalDelta < 0) {
                    setCurrentCardIndex((prev) => (prev + 1) % cardData.length);
                } else {
                    setCurrentCardIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
                }
            }

            // Reset swipe progress smoothly to allow cards to settle
            // Don't use setTimeout - let the transition handle it naturally
            setSwipeProgress(0);
        };

        // TOUCH EVENT HANDLERS
        const handleTouchStart = (e) => {
            handleStart(e.touches[0].clientX, e.touches[0].clientY);
        };

        const handleTouchMove = (e) => {
            handleMove(e.touches[0].clientX, e.touches[0].clientY, e);
        };

        const handleTouchEnd = () => {
            handleEnd();
        };

        // MOUSE EVENT HANDLERS (for desktop at mobile width)
        const handleMouseDown = (e) => {
            e.preventDefault(); // Prevent text selection
            handleStart(e.clientX, e.clientY);
        };

        const handleMouseMove = (e) => {
            handleMove(e.clientX, e.clientY, e);
        };

        const handleMouseUp = () => {
            handleEnd();
        };

        const handleMouseLeave = () => {
            // End drag if mouse leaves carousel area
            if (isPointerDown) {
                handleEnd();
            }
        };

        const carousel = carouselRef.current;

        // Add touch event listeners
        carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
        carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
        carousel.addEventListener('touchend', handleTouchEnd);

        // Add mouse event listeners (for desktop at mobile viewport)
        carousel.addEventListener('mousedown', handleMouseDown);
        carousel.addEventListener('mousemove', handleMouseMove);
        carousel.addEventListener('mouseup', handleMouseUp);
        carousel.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            carousel.removeEventListener('touchstart', handleTouchStart);
            carousel.removeEventListener('touchmove', handleTouchMove);
            carousel.removeEventListener('touchend', handleTouchEnd);
            carousel.removeEventListener('mousedown', handleMouseDown);
            carousel.removeEventListener('mousemove', handleMouseMove);
            carousel.removeEventListener('mouseup', handleMouseUp);
            carousel.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isMobile, cardData.length]); // CRITICAL: Removed isDragging - it was causing event listeners to detach mid-gesture


    // TASK 1: Dynamic z-index calculation during swipe
    // Incoming card rises, outgoing card sinks - creates alive layered depth
    const getCardZIndex = (cardPosition) => {
        const offset = cardPosition + swipeProgress;

        // Static z-index when not swiping (swipeProgress = 0)
        if (Math.abs(swipeProgress) < 0.01) {
            return cardPosition === 0 ? 30 : 20;
        }

        // Dynamic interpolation during swipe:
        // - Incoming card (moving toward center): gradually rises to z-index 35
        // - Center card (becoming outgoing): gradually sinks to z-index 25
        // - Far card: stays low at z-index 15

        if (offset < -0.3) {
            // Left card moving toward center
            const progress = Math.max(0, Math.min(1, (offset + 1) / 0.7));
            return Math.round(20 + (15 * progress)); // 20 → 35
        } else if (offset > 0.3) {
            // Right card moving toward center  
            const progress = Math.max(0, Math.min(1, (offset - 0.3) / 0.7));
            return Math.round(35 - (15 * progress)); // 35 → 20
        } else {
            // Center zone: highest z-index
            return 35;
        }
    };

    // Calculate card transforms based on position and swipe progress
    const getCardTransform = (cardPosition) => {
        // cardPosition: -1 (left), 0 (center), 1 (right)
        // CRITICAL FIX: Add swipeProgress instead of subtract to get correct direction
        const offset = cardPosition + swipeProgress;

        // Base transforms for each position
        const baseTransforms = {
            '-1': { // Left card
                translateX: -120,
                translateZ: -80,
                scale: 0.7,
                rotateY: 18,
                opacity: 0.5
            },
            '0': { // Center card
                translateX: 0,
                translateZ: 100,
                scale: 1,
                rotateY: 0,
                opacity: 1
            },
            '1': { // Right card
                translateX: 120,
                translateZ: -80,
                scale: 0.7,
                rotateY: -25,
                opacity: 0.5
            }
        };

        // FIX #1: Symmetric continuous interpolation curve
        // Replaced hard zones (-0.5/+0.5) with smooth curve centered at 0
        // Now left ↔ center ↔ right transitions feel identical in both directions
        const getInterpolated = (from, to, progress) => {
            return from + (to - from) * progress;
        };

        let transform;
        const absOffset = Math.abs(offset);

        if (offset < -0.3) {
            // Transitioning from left toward center (offset moving from -1 to -0.3)
            const progress = Math.max(0, Math.min(1, (offset + 1) / 0.7));
            transform = {
                translateX: getInterpolated(baseTransforms['-1'].translateX, baseTransforms['0'].translateX, progress),
                translateZ: getInterpolated(baseTransforms['-1'].translateZ, baseTransforms['0'].translateZ, progress),
                scale: getInterpolated(baseTransforms['-1'].scale, baseTransforms['0'].scale, progress),
                rotateY: getInterpolated(baseTransforms['-1'].rotateY, baseTransforms['0'].rotateY, progress),
                opacity: getInterpolated(baseTransforms['-1'].opacity, baseTransforms['0'].opacity, progress)
            };
        } else if (offset > 0.3) {
            // Transitioning from center toward right (offset moving from 0.3 to 1)
            const progress = Math.max(0, Math.min(1, (offset - 0.3) / 0.7));
            transform = {
                translateX: getInterpolated(baseTransforms['0'].translateX, baseTransforms['1'].translateX, progress),
                translateZ: getInterpolated(baseTransforms['0'].translateZ, baseTransforms['1'].translateZ, progress),
                scale: getInterpolated(baseTransforms['0'].scale, baseTransforms['1'].scale, progress),
                rotateY: getInterpolated(baseTransforms['0'].rotateY, baseTransforms['1'].rotateY, progress),
                opacity: getInterpolated(baseTransforms['0'].opacity, baseTransforms['1'].opacity, progress)
            };
        } else {
            // Center zone (-0.3 to +0.3): smoothly interpolate within center
            // This ensures seamless transition without dead zone
            const centerProgress = (offset + 0.3) / 0.6; // Maps -0.3..+0.3 to 0..1
            if (centerProgress < 0.5) {
                // Blend from slight left tilt to pure center
                const p = centerProgress * 2;
                transform = {
                    translateX: getInterpolated(-20, 0, p),
                    translateZ: baseTransforms['0'].translateZ,
                    scale: baseTransforms['0'].scale,
                    rotateY: getInterpolated(2, 0, p),
                    opacity: 1
                };
            } else {
                // Blend from pure center to slight right tilt
                const p = (centerProgress - 0.5) * 2;
                transform = {
                    translateX: getInterpolated(0, 20, p),
                    translateZ: baseTransforms['0'].translateZ,
                    scale: baseTransforms['0'].scale,
                    rotateY: getInterpolated(0, -2, p),
                    opacity: 1
                };
            }
        }

        // TASK 2: Velocity-based rotation boost
        // Fast swipes get slightly more rotation, slow drags stay controlled
        // Subtle effect clamped to ±30deg total for premium feel
        const velocity = velocityRef.current || 0;
        const velocityBoost = Math.max(-8, Math.min(8, velocity * 12)); // Clamp boost to ±8deg
        const finalRotateY = Math.max(-30, Math.min(30, transform.rotateY + velocityBoost));

        return `translateX(${transform.translateX}px) translateZ(${transform.translateZ}px) scale(${transform.scale}) rotateY(${finalRotateY}deg)`;
    };

    const getCardOpacity = (cardPosition) => {
        // CRITICAL FIX: Add swipeProgress instead of subtract (same fix as transform)
        const offset = cardPosition + swipeProgress;

        if (offset <= -0.5) {
            const progress = Math.max(0, Math.min(1, (offset + 1) / 0.5));
            return 0.5 + (0.5 * progress);
        } else if (offset >= 0.5) {
            const progress = Math.max(0, Math.min(1, offset / 0.5));
            return 1 - (0.5 * progress);
        }
        return 1;
    };

    // Desktop photo fade cycle (unchanged - 7 second intervals for cinematic feel)
    useEffect(() => {
        if (isMobile) return;

        if (desktopCycleIntervalRef.current) {
            clearInterval(desktopCycleIntervalRef.current);
        }

        desktopCycleIntervalRef.current = setInterval(() => {
            setDesktopPhotoIndex((prev) => (prev + 1) % desktopPhotos.length);
        }, 3500);

        return () => {
            if (desktopCycleIntervalRef.current) {
                clearInterval(desktopCycleIntervalRef.current);
            }
        };
    }, [isMobile, desktopPhotos.length]);

    // Card click handlers - mobile shows bottom sheet, desktop shows centered modal
    const handleCardClick = (cardType) => {
        if (!isMobile && window.innerWidth >= 1024) {
            // Desktop: Save scroll position before locking
            const scrollY = window.scrollY;
            document.body.style.top = `-${scrollY}px`;

            setDesktopModalCard(cardType);
            setDesktopModalClosing(false);
            document.body.classList.add('modal-open');
        } else if (isMobile && window.innerWidth <= 768) {
            // Mobile: Save scroll position
            const scrollY = window.scrollY;
            document.body.style.top = `-${scrollY}px`;

            setBottomSheetCard(cardType);
            setBottomSheetClosing(false);
            document.body.classList.add('modal-open');
        }
    };

    const handleBottomSheetClose = () => {
        setBottomSheetClosing(true);
        setTimeout(() => {
            setBottomSheetCard(null);
            setBottomSheetClosing(false);

            // Restore scroll position
            const scrollY = document.body.style.top;
            const scrollPosition = parseInt(scrollY || '0') * -1;
            document.body.classList.remove('modal-open');
            document.body.style.top = '';
            requestAnimationFrame(() => {
                window.scrollTo(0, scrollPosition);
            });
        }, 280);
    };

    const handleBackdropClick = () => {
        handleBottomSheetClose();
    };

    // Desktop modal handlers
    const handleDesktopModalClose = () => {
        setDesktopModalClosing(true);
        setTimeout(() => {
            setDesktopModalCard(null);
            setDesktopModalClosing(false);

            // Restore scroll position
            const scrollY = document.body.style.top;
            const scrollPosition = parseInt(scrollY || '0') * -1;
            document.body.classList.remove('modal-open');
            document.body.style.top = '';
            requestAnimationFrame(() => {
                window.scrollTo(0, scrollPosition);
            });
        }, 300);
    };

    const handleDesktopModalBackdropClick = () => {
        handleDesktopModalClose();
    };

    // TASK 3: Core Values bottom sheet handlers
    const handleValueClick = (valueKey) => {
        if (window.innerWidth > 768) {
            // Desktop/Tablet: Show centered modal (no scroll position manipulation)
            setDesktopValueModalOpen(valueKey);
            setDesktopValueModalClosing(false);
            document.body.classList.add('modal-open');
        } else {
            // Mobile: Show bottom sheet
            setValueSheetOpen(valueKey);
            setValueSheetClosing(false);
            document.body.classList.add('modal-open');
        }
    };

    const handleValueSheetClose = () => {
        setValueSheetClosing(true);
        setTimeout(() => {
            setValueSheetOpen(null);
            setValueSheetClosing(false);
            document.body.classList.remove('modal-open');
        }, 280);
    };

    const handleValueBackdropClick = () => {
        handleValueSheetClose();
    };

    // Desktop Value Modal handlers
    const handleDesktopValueModalClose = () => {
        setDesktopValueModalClosing(true);
        setTimeout(() => {
            setDesktopValueModalOpen(null);
            setDesktopValueModalClosing(false);

            // Simple cleanup - no scroll manipulation needed
            document.body.classList.remove('modal-open');
        }, 300);
    };

    const handleDesktopValueModalBackdropClick = () => {
        handleDesktopValueModalClose();
    };

    // Prevent parent scroll when bottom sheet is open - with boundary detection
    useEffect(() => {
        if (!bottomSheetCard) return;

        const preventScroll = (e) => {
            const target = e.target;
            // Check if scrolling inside the bottom sheet (scrollable container)
            const sheet = target.closest('.bottom-sheet');

            // If not scrolling inside sheet, always prevent (if cancelable)
            if (!sheet) {
                if (e.cancelable) { // Check before calling preventDefault
                    e.preventDefault();
                    e.stopPropagation();
                }
                return;
            }

            // If inside sheet, check for scroll chaining at boundaries
            const { scrollTop, scrollHeight, clientHeight } = sheet;
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight;

            // Prevent scroll chaining when at boundaries
            if (e.type === 'touchmove') {
                const touch = e.touches[0];
                const deltaY = touch.clientY - (preventScroll.lastY || touch.clientY);
                preventScroll.lastY = touch.clientY;

                // Scrolling up at top or down at bottom = prevent parent scroll
                if ((isAtTop && deltaY > 0) || (isAtBottom && deltaY < 0)) {
                    if (e.cancelable) { // Check before calling preventDefault
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            } else if (e.type === 'wheel') {
                // Scrolling up at top or down at bottom = prevent parent scroll
                if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                    if (e.cancelable) { // Check before calling preventDefault
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
                // Otherwise, allow normal wheel scrolling inside the sheet
            }
        };

        const resetTouch = () => {
            delete preventScroll.lastY;
        };

        // Prevent touch scroll on mobile
        document.addEventListener('touchmove', preventScroll, { passive: false });
        document.addEventListener('touchend', resetTouch);
        document.addEventListener('touchcancel', resetTouch);
        // Prevent wheel scroll on desktop
        document.addEventListener('wheel', preventScroll, { passive: false });

        return () => {
            document.removeEventListener('touchmove', preventScroll);
            document.removeEventListener('touchend', resetTouch);
            document.removeEventListener('touchcancel', resetTouch);
            document.removeEventListener('wheel', preventScroll);
        };
    }, [bottomSheetCard]);

    // Track scroll position in bottom sheet
    useEffect(() => {
        const contentEl = sheetContentRef.current;
        if (!contentEl || !bottomSheetCard) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = contentEl;
            const isAtTop = scrollTop < 50;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;

            setShowUpArrow(!isAtTop);
            setShowDownArrow(!isAtBottom);
        };

        // Initial check
        handleScroll();

        contentEl.addEventListener('scroll', handleScroll, { passive: true });
        return () => contentEl.removeEventListener('scroll', handleScroll);
    }, [bottomSheetCard]);

    // Desktop modal: ESC key handler
    useEffect(() => {
        if (!desktopModalCard) return;

        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                handleDesktopModalClose();
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [desktopModalCard]);

    // Desktop Value modal: ESC key handler
    useEffect(() => {
        if (!desktopValueModalOpen) return;

        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                handleDesktopValueModalClose();
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [desktopValueModalOpen]);

    return (
        <section id="about" className="about-section">
            {/* Cherry blossom effect - scoped to this section only */}
            <div className="about-section-blossoms">
                {petals.map((petal, i) => (
                    <div
                        key={i}
                        className="petal"
                        style={{
                            left: `${petal.left}%`,
                            top: '-50px',
                            width: `${petal.size}px`,
                            height: `${petal.size}px`,
                            animationDelay: `${petal.delay}s`,
                            animationDuration: `${petal.duration}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="container mx-auto px-6 space-y-20">

                {/* 1. Intro Section (Portrait + Bio) */}
                <RevealOnScroll>
                    <div className="about-intro-wrapper">
                        {/* Portrait - Card Carousel (Mobile) / Fade Cycle (Desktop) */}
                        <div className="about-portrait-container">
                            {isMobile ? (
                                <>
                                    {/* TASK 3: Card carousel container (3D scene only) */}
                                    <div
                                        className="card-carousel-container"
                                        ref={carouselRef}
                                    >
                                        <div className="card-carousel-track">
                                            {/* Render 3 cards: previous, current, next */}
                                            {[-1, 0, 1].map((offset) => {
                                                const cardIndex = (currentCardIndex + offset + cardData.length) % cardData.length;
                                                const card = cardData[cardIndex];

                                                return (
                                                    <div
                                                        key={`${cardIndex}-${offset}`}
                                                        className="carousel-card"
                                                        style={{
                                                            transform: getCardTransform(offset),
                                                            opacity: getCardOpacity(offset),
                                                            transition: isDragging
                                                                ? 'transform 0.1s ease-out, opacity 0.1s ease-out, z-index 0s'
                                                                : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease, z-index 0s',
                                                            // TASK 1: Dynamic z-index replaces static values
                                                            zIndex: getCardZIndex(offset),
                                                            pointerEvents: offset === 0 ? 'auto' : 'none'
                                                        }}
                                                    >
                                                        <div className="carousel-card-image-wrapper">
                                                            <img
                                                                src={card.image}
                                                                alt={card.title}
                                                                className="carousel-card-image"
                                                                draggable="false"
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* TASK 3: Arrow buttons as UI chrome - positioned relative to about-portrait-container */}
                                    {/* Left Arrow - Previous Card */}
                                    <button
                                        className="carousel-arrow carousel-arrow-left"
                                        onClick={() => setCurrentCardIndex((prev) => (prev - 1 + cardData.length) % cardData.length)}
                                        aria-label="Previous card"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    {/* Right Arrow - Next Card */}
                                    <button
                                        className="carousel-arrow carousel-arrow-right"
                                        onClick={() => setCurrentCardIndex((prev) => (prev + 1) % cardData.length)}
                                        aria-label="Next card"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </>
                            ) : (
                                // Desktop: Cinematic fade cycle (UNCHANGED)
                                <div className="desktop-photo-fade">
                                    {desktopPhotos.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo}
                                            alt={`Kalpana Portfolio ${index + 1}`}
                                            className={`fade-photo ${index === desktopPhotoIndex ? 'fade-in' : 'fade-out'}`}
                                            style={{
                                                transform: 'scaleX(-1)',
                                                opacity: index === desktopPhotoIndex ? 1 : 0
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Bio Text */}
                        <div className="about-bio-section">
                            <div>
                                <h3 className="about-label">About Me</h3>
                                <h2 className="about-name">Hi, I'm Kalpana</h2>
                                <p className="about-role">Professional Makeup Artist & BBA Student</p>
                            </div>
                            <div className="about-divider"></div>
                            <p className="about-intro-paragraph">
                                I am a funny, outgoing, and philosophical soul who believes in living life to the fullest.
                                Creating beauty is not just my profession; it's how I connect with the world.
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* 2. Passion & Purpose (Quote) */}
                <RevealOnScroll>
                    <div className="about-quote-section">
                        <div className="about-quote-divider"></div>
                        <div className="relative px-6">
                            <div className="about-quote-mark">"</div>
                            <h3 className="about-quote-text">
                                I believe beauty is confidence, expression, and strategy working together.
                            </h3>
                        </div>
                        <p className="about-philosophy">
                            Makeup is not just meaningful; it's a transformation. My philosophy is to unveil the enigmatic beauty hidden within every face.
                        </p>
                        <div className="about-quote-bottom-divider"></div>
                    </div>
                </RevealOnScroll>

                {/* 3. Dual Identity (Split Cards) - ENHANCED */}
                <RevealOnScroll>
                    <div className="about-cards-container">
                        {/* Artist Card */}
                        <div className="about-card" onClick={() => handleCardClick('artist')}>
                            <div className="about-card-icon" style={{ background: 'linear-gradient(135deg, var(--theme-accent) 0%, #f5b547 100%)' }}>
                                🎨
                            </div>
                            <h3 className="about-card-title">The Artist</h3>
                            <ul className="about-card-list">
                                <li>Red Fox Certified</li>
                                <li>Bridal Makeup</li>
                                <li>Editorial Makeup</li>
                                <li>Skin Analysis & Prep</li>
                                <li>Creative Vision</li>
                            </ul>
                        </div>

                        {/* Business Card */}
                        <div className="about-card" onClick={() => handleCardClick('strategist')}>
                            <div className="about-card-icon" style={{ background: 'linear-gradient(135deg, var(--theme-highlight) 0%, #f5a8c8 100%)' }}>
                                💼
                            </div>
                            <h3 className="about-card-title">The Strategist</h3>
                            <ul className="about-card-list">
                                <li>BBA, Manipal University</li>
                                <li>Brand Management</li>
                                <li>Client Relations</li>
                                <li>Business Strategy</li>
                                <li>Market Analysis</li>
                            </ul>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* 4. Journey Timeline - ENHANCED - Data-driven */}
                <div className="timeline-container-enhanced">
                    <div className="timeline-line-enhanced"></div>
                    <div className="timeline-wrapper-enhanced">
                        {aboutTimelineData.map((item, index) => {
                            return (
                                <RevealOnScroll key={index} className={`timeline-item ${item.isAnchor ? 'timeline-anchor' : 'timeline-supporting'}`} style={{ opacity: item.opacity }}>
                                    {index % 2 === 0 ? (
                                        // EVEN items (0, 2, 4) - Content LEFT, Dot CENTER, Quote RIGHT
                                        <>
                                            <div className="timeline-content">
                                                <h4 className="timeline-year">{item.year}</h4>
                                                <p className="timeline-subtitle">{item.title}</p>
                                                {item.isAnchor && <p className="timeline-quote timeline-quote-mobile">"{item.quote}"</p>}
                                            </div>
                                            <div className={`timeline-dot-enhanced ${activeTimelineDots[index] ? 'scroll-active' : ''} ${item.isAnchor ? 'timeline-dot-anchor' : ''}`} data-timeline-id={index}></div>
                                            {item.isAnchor && <p className="timeline-quote">"{item.quote}"</p>}
                                        </>
                                    ) : (
                                        // ODD items (1, 3) - Quote LEFT, Dot CENTER, Content RIGHT
                                        <>
                                            {item.isAnchor && <p className="timeline-quote">"{item.quote}"</p>}
                                            <div className={`timeline-dot-enhanced ${activeTimelineDots[index] ? 'scroll-active' : ''} ${item.isAnchor ? 'timeline-dot-anchor' : ''}`} data-timeline-id={index}></div>
                                            <div className="timeline-content">
                                                <h4 className="timeline-year">{item.year}</h4>
                                                <p className="timeline-subtitle">{item.title}</p>
                                                {item.isAnchor && <p className="timeline-quote timeline-quote-mobile">"{item.quote}"</p>}
                                            </div>
                                        </>
                                    )}
                                </RevealOnScroll>
                            );
                        })}
                    </div>
                </div>

                {/* TASK 2: Transition Divider to Values - Enhanced visual pause */}
                <RevealOnScroll>
                    <div className="about-values-header" style={{ marginTop: '4rem' }}>
                        <div className="about-values-divider"></div>
                        <div className="about-values-icon-wrapper">
                            <div className="about-values-icon">💎</div>
                            <span className="about-values-label">Core Values</span>
                        </div>
                        <div className="about-values-divider"></div>
                    </div>
                </RevealOnScroll>

                {/* 5. Values & Philosophy - Point 5: Data-driven from coreValuesData */}
                <RevealOnScroll>
                    <div className="about-values-grid-enhanced">
                        {coreValuesData.map((value) => (
                            <div
                                key={value.key}
                                className="about-value-item-enhanced"
                                onClick={() => handleValueClick(value.key)}
                            >
                                <span className="about-value-icon-item">{value.icon}</span>
                                <h4 className="about-value-title-enhanced">{value.title}</h4>
                                <p className="about-value-description">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>

                {/* 6. Closing CTA - ENHANCED */}
                <RevealOnScroll>
                    <div className="about-cta-section-enhanced">
                        <h3 className="about-cta-title-enhanced">Ready to create something beautiful?</h3>
                        <p className="about-cta-subtitle-enhanced">Available for bridal, editorial & freelance projects</p>
                        <div className="about-cta-buttons-enhanced">
                            <button
                                onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
                                className="about-cta-primary-enhanced"
                            >
                                View Portfolio
                            </button>
                            <button
                                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                                className="about-cta-secondary-enhanced"
                            >
                                Book Session
                            </button>
                        </div>
                    </div>
                </RevealOnScroll>

            </div >

            {/* Mobile-Only Bottom Sheet Modal - Rendered via Portal */}
            {bottomSheetCard && ReactDOM.createPortal(
                <>
                    {/* Backdrop - Global overlay */}
                    <div
                        className={`bottom-sheet-backdrop ${bottomSheetClosing ? 'closing' : ''}`}
                        onClick={handleBackdropClick}
                    />

                    {/* Bottom Sheet - Fixed positioning */}
                    <div
                        ref={bottomSheetRef}
                        className={`bottom-sheet ${bottomSheetClosing ? 'closing' : ''}`}
                    >
                        {/* Close Button */}
                        <button
                            className="bottom-sheet-close-button"
                            onClick={handleBottomSheetClose}
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        {/* Swipe Handle */}
                        <div className="bottom-sheet-handle"></div>

                        {/* Content */}
                        <div className="bottom-sheet-content" ref={sheetContentRef}>
                            {bottomSheetCard && modalContent[bottomSheetCard] && (
                                <>
                                    <h2 className="bottom-sheet-title">
                                        {modalContent[bottomSheetCard].title}
                                    </h2>
                                    <p className="bottom-sheet-subtitle">
                                        {modalContent[bottomSheetCard].subtitle}
                                    </p>

                                    {modalContent[bottomSheetCard].sections.map((section, index) => (
                                        <div key={index} className="bottom-sheet-section">
                                            <h3>{section.heading}</h3>
                                            <p>{section.content}</p>
                                        </div>
                                    ))}

                                    <p
                                        className="bottom-sheet-cta"
                                        onClick={() => {
                                            handleBottomSheetClose();
                                            setTimeout(() => {
                                                const servicesSection = document.getElementById('services');
                                                if (servicesSection) {
                                                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                                                    // Trigger first service accordion to open
                                                    setTimeout(() => {
                                                        const firstServiceButton = servicesSection.querySelector('.service-item button, .service-header');
                                                        if (firstServiceButton && !firstServiceButton.getAttribute('aria-expanded')) {
                                                            firstServiceButton.click();
                                                        }
                                                    }, 600);
                                                }
                                            }, 300);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {modalContent[bottomSheetCard].cta}
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Scroll Direction Indicators - Fixed to Viewport */}
                        {showDownArrow && (
                            <div className="bottom-sheet-scroll-indicator down">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>
                        )}
                        {showUpArrow && (
                            <div className="bottom-sheet-scroll-indicator up">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                            </div>
                        )}
                    </div>
                </>,
                document.body
            )}

            {/* TASK 3 & 4: Core Values Bottom Sheet Modal */}
            {valueSheetOpen && ReactDOM.createPortal(
                <>
                    <div
                        className={`bottom-sheet-backdrop ${valueSheetClosing ? 'closing' : ''}`}
                        onClick={handleValueBackdropClick}
                    />

                    <div
                        ref={valueSheetRef}
                        className={`bottom-sheet ${valueSheetClosing ? 'closing' : ''}`}
                    >
                        <button
                            className="bottom-sheet-close-button"
                            onClick={handleValueSheetClose}
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        <div className="bottom-sheet-handle"></div>

                        <div className="bottom-sheet-content" style={{ padding: '0 1.25rem 2rem' }}>
                            {/* Points 3, 4, 5: Data-driven content with improved structure */}
                            {coreValuesData.map((value) => (
                                valueSheetOpen === value.key && (
                                    <React.Fragment key={value.key}>
                                        <h2 className="bottom-sheet-title">{value.title}</h2>
                                        <p className="bottom-sheet-subtitle">{value.expandedDescription}</p>
                                        <div className="bottom-sheet-section">
                                            <ul style={{ margin: '0' }}>
                                                {value.bullets.map((bullet, idx) => (
                                                    <li key={idx} style={{ marginBottom: idx === value.bullets.length - 1 ? '0' : '0.75rem' }}>
                                                        {bullet}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </React.Fragment>
                                )
                            ))}
                        </div>
                    </div>
                </>,
                document.body
            )}

            {/* Desktop-Only Centered Modal - Rendered via Portal */}
            {desktopModalCard && ReactDOM.createPortal(
                <>
                    {/* Backdrop - Global overlay */}
                    <div
                        className={`desktop-modal-backdrop ${desktopModalClosing ? 'closing' : ''}`}
                        onClick={handleDesktopModalBackdropClick}
                    />

                    {/* Centered Modal */}
                    <div
                        ref={desktopModalRef}
                        className={`desktop-modal ${desktopModalClosing ? 'closing' : ''}`}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="desktop-modal-title"
                    >
                        {/* Close Button */}
                        <button
                            className="desktop-modal-close-button"
                            onClick={handleDesktopModalClose}
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        {/* Content */}
                        <div className="desktop-modal-content">
                            {desktopModalCard && modalContent[desktopModalCard] && (
                                <>
                                    <h2 id="desktop-modal-title" className="desktop-modal-title">
                                        {modalContent[desktopModalCard].title}
                                    </h2>
                                    <p className="desktop-modal-subtitle">
                                        {modalContent[desktopModalCard].subtitle}
                                    </p>

                                    {modalContent[desktopModalCard].sections.map((section, index) => (
                                        <div key={index} className="desktop-modal-section">
                                            <h3>{section.heading}</h3>
                                            <p>{section.content}</p>
                                        </div>
                                    ))}

                                    {modalContent[desktopModalCard].skills && (
                                        <div className="desktop-modal-skills">
                                            <h3>Core Skills</h3>
                                            <ul>
                                                {modalContent[desktopModalCard].skills.map((skill, index) => (
                                                    <li key={index}>{skill}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </>,
                document.body
            )}

            {/* Desktop-Only Core Values Modal - Rendered via Portal */}
            {desktopValueModalOpen && ReactDOM.createPortal(
                <>
                    {/* Backdrop - Global overlay */}
                    <div
                        className={`desktop-modal-backdrop ${desktopValueModalClosing ? 'closing' : ''}`}
                        onClick={handleDesktopValueModalBackdropClick}
                    />

                    {/* Centered Modal */}
                    <div
                        ref={desktopValueModalRef}
                        className={`desktop-modal ${desktopValueModalClosing ? 'closing' : ''}`}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="desktop-value-modal-title"
                    >
                        {/* Close Button */}
                        <button
                            className="desktop-modal-close-button"
                            onClick={handleDesktopValueModalClose}
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        {/* Content */}
                        <div className="desktop-modal-content">
                            {coreValuesData.map((value) => (
                                desktopValueModalOpen === value.key && (
                                    <React.Fragment key={value.key}>
                                        <h2 id="desktop-value-modal-title" className="desktop-modal-title">
                                            {value.title}
                                        </h2>
                                        <p className="desktop-modal-subtitle">
                                            {value.expandedDescription}
                                        </p>

                                        <div className="desktop-modal-section">
                                            <ul style={{
                                                margin: '0',
                                                padding: '0 0 0 1.25rem',
                                                listStyleType: 'disc'
                                            }}>
                                                {value.bullets.map((bullet, idx) => (
                                                    <li key={idx} style={{
                                                        marginBottom: idx === value.bullets.length - 1 ? '0' : '0.75rem',
                                                        fontSize: '0.9375rem',
                                                        lineHeight: '1.6',
                                                        color: 'rgba(74, 74, 74, 0.85)'
                                                    }}>
                                                        {bullet}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </React.Fragment>
                                )
                            ))}
                        </div>
                    </div>
                </>,
                document.body
            )}
        </section >
    );
};

export default About;

