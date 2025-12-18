import React, { useState, useRef, useEffect } from 'react';
import RevealOnScroll from './RevealOnScroll';
import './About.css';
import './About-Enhanced.css';
import './About-Cards-Timeline-Enhanced.css';

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

    // CARD DATA - Dynamically load all available portrait photos
    // Add more Kalpana-About5.png, About6.png etc. and they'll auto-appear!
    const cardData = [
        { image: `${import.meta.env.BASE_URL}Kalpana-About.png`, title: 'Bridal Elegance' },
        { image: `${import.meta.env.BASE_URL}Kalpana-About2.png`, title: 'Editorial Artistry' },
        { image: `${import.meta.env.BASE_URL}Kalpana-About3.png`, title: 'Natural Radiance' },
        { image: `${import.meta.env.BASE_URL}Kalpana-About4.png`, title: 'Glamour & Grace' }
    ].filter(card => card.image); // Filter out any missing images

    // Desktop photos (unchanged)
    const desktopPhotos = [
        `${import.meta.env.BASE_URL}Kalpana-About.png`,
        `${import.meta.env.BASE_URL}Kalpana-About3.png`,
        `${import.meta.env.BASE_URL}Kalpana-About2.png`,
        `${import.meta.env.BASE_URL}Kalpana-About3.png`,
        `${import.meta.env.BASE_URL}Kalpana-About.png`,
        `${import.meta.env.BASE_URL}Kalpana-About2.png`,
        `${import.meta.env.BASE_URL}Kalpana-About3.png`,
        `${import.meta.env.BASE_URL}Kalpana-About.png`,
        `${import.meta.env.BASE_URL}Kalpana-About2.png`,
        `${import.meta.env.BASE_URL}Kalpana-About3.png`,
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

            setSwipeProgress(Math.max(-1, Math.min(1, progress * 2))); // Scale for sensitivity

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

        // Interpolate based on offset
        const getInterpolated = (from, to, progress) => {
            return from + (to - from) * progress;
        };

        let transform;
        if (offset <= -0.5) {
            // Interpolate from left to center
            const progress = Math.max(0, Math.min(1, (offset + 1) / 0.5));
            transform = {
                translateX: getInterpolated(baseTransforms['-1'].translateX, baseTransforms['0'].translateX, progress),
                translateZ: getInterpolated(baseTransforms['-1'].translateZ, baseTransforms['0'].translateZ, progress),
                scale: getInterpolated(baseTransforms['-1'].scale, baseTransforms['0'].scale, progress),
                rotateY: getInterpolated(baseTransforms['-1'].rotateY, baseTransforms['0'].rotateY, progress),
                opacity: getInterpolated(baseTransforms['-1'].opacity, baseTransforms['0'].opacity, progress)
            };
        } else if (offset >= 0.5) {
            // Interpolate from center to right
            const progress = Math.max(0, Math.min(1, offset / 0.5));
            transform = {
                translateX: getInterpolated(baseTransforms['0'].translateX, baseTransforms['1'].translateX, progress),
                translateZ: getInterpolated(baseTransforms['0'].translateZ, baseTransforms['1'].translateZ, progress),
                scale: getInterpolated(baseTransforms['0'].scale, baseTransforms['1'].scale, progress),
                rotateY: getInterpolated(baseTransforms['0'].rotateY, baseTransforms['1'].rotateY, progress),
                opacity: getInterpolated(baseTransforms['0'].opacity, baseTransforms['1'].opacity, progress)
            };
        } else {
            // Use center transform
            transform = baseTransforms['0'];
        }

        return `translateX(${transform.translateX}px) translateZ(${transform.translateZ}px) scale(${transform.scale}) rotateY(${transform.rotateY}deg)`;
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
        }, 7000);

        return () => {
            if (desktopCycleIntervalRef.current) {
                clearInterval(desktopCycleIntervalRef.current);
            }
        };
    }, [isMobile, desktopPhotos.length]);

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
                                // NEW CARD CAROUSEL - Horizontal 3-card layout with text overlays
                                <div
                                    className="card-carousel-container"
                                    ref={carouselRef}
                                >
                                    <div className="card-carousel-track">
                                        {/* Render 3 cards: previous, current, next */}
                                        {[-1, 0, 1].map((offset) => {
                                            const cardIndex = (currentCardIndex + offset + cardData.length) % cardData.length;
                                            const card = cardData[cardIndex];

                                            // Render logs removed to reduce spam

                                            return (
                                                <div
                                                    key={`${cardIndex}-${offset}`}
                                                    className="carousel-card"
                                                    style={{
                                                        transform: getCardTransform(offset),
                                                        opacity: getCardOpacity(offset),
                                                        transition: isDragging
                                                            ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
                                                            : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease',
                                                        zIndex: offset === 0 ? 30 : 20,
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

                                    {/* Arrow Navigation Controls (Mobile Only) */}
                                    <button
                                        className="carousel-arrow carousel-arrow-left"
                                        onClick={() => setCurrentCardIndex((prev) => (prev - 1 + cardData.length) % cardData.length)}
                                        aria-label="Previous card"
                                    >
                                        ◀
                                    </button>
                                    <button
                                        className="carousel-arrow carousel-arrow-right"
                                        onClick={() => setCurrentCardIndex((prev) => (prev + 1) % cardData.length)}
                                        aria-label="Next card"
                                    >
                                        ▶
                                    </button>
                                </div>
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
                        <div className="about-card">
                            <div className="about-card-icon" style={{ background: 'linear-gradient(135deg, var(--theme-accent) 0%, #f5b547 100%)' }}>
                                🎨
                            </div>
                            <h3 className="about-card-title">The Artist</h3>
                            <ul className="about-card-list">
                                <li>Red Fox Academy Certified</li>
                                <li>Bridal & Editorial Makeup</li>
                                <li>Skin Analysis & Prep</li>
                                <li>Creative Vision</li>
                            </ul>
                        </div>

                        {/* Business Card */}
                        <div className="about-card">
                            <div className="about-card-icon" style={{ background: 'linear-gradient(135deg, var(--theme-highlight) 0%, #f5a8c8 100%)' }}>
                                💼
                            </div>
                            <h3 className="about-card-title">The Strategist</h3>
                            <ul className="about-card-list">
                                <li>BBA, Manipal University</li>
                                <li>Brand Management</li>
                                <li>Client Relations</li>
                                <li>Business Strategy</li>
                            </ul>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* 4. Journey Timeline - ENHANCED */}
                <div className="timeline-container-enhanced">
                    <div className="timeline-line-enhanced"></div>
                    <div className="timeline-wrapper-enhanced">
                        {[
                            { year: '2021', title: 'Passion Ignited', quote: 'Found my calling in the art of transformation.' },
                            { year: '2022', title: 'Professional Training', quote: 'Mastered techniques under Red Fox Academy expertise.' },
                            { year: '2023', title: 'Freelance Career', quote: 'Built a diverse portfolio across bridal and editorial.' },
                            { year: '2024', title: 'BBA & Brand Growth', quote: 'Blending artistry with strategic business vision.' }
                        ].map((item, index) => (
                            <RevealOnScroll key={index} className="timeline-item">
                                {index % 2 === 0 ? (
                                    // ODD items (0, 2) - Content LEFT, Dot CENTER, Quote RIGHT
                                    <>
                                        <div className="timeline-content">
                                            <h4 className="timeline-year">{item.year}</h4>
                                            <p className="timeline-subtitle">{item.title}</p>
                                            <p className="timeline-quote timeline-quote-mobile">"{item.quote}"</p>
                                        </div>
                                        <div className={`timeline-dot-enhanced ${activeTimelineDots[index] ? 'scroll-active' : ''}`} data-timeline-id={index}></div>
                                        <p className="timeline-quote">"{item.quote}"</p>
                                    </>
                                ) : (
                                    // EVEN items (1, 3) - Quote LEFT, Dot CENTER, Content RIGHT
                                    <>
                                        <p className="timeline-quote">"{item.quote}"</p>
                                        <div className={`timeline-dot-enhanced ${activeTimelineDots[index] ? 'scroll-active' : ''}`} data-timeline-id={index}></div>
                                        <div className="timeline-content">
                                            <h4 className="timeline-year">{item.year}</h4>
                                            <p className="timeline-subtitle">{item.title}</p>
                                            <p className="timeline-quote timeline-quote-mobile">"{item.quote}"</p>
                                        </div>
                                    </>
                                )}
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>

                {/* Transition Divider to Values */}
                <RevealOnScroll>
                    <div className="about-values-header">
                        <div className="about-values-divider"></div>
                        <div className="about-values-icon-wrapper">
                            <div className="about-values-icon">💎</div>
                            <span className="about-values-label">Core Values</span>
                        </div>
                        <div className="about-values-divider"></div>
                    </div>
                </RevealOnScroll>

                {/* 5. Values & Philosophy - ENHANCED */}
                <RevealOnScroll>
                    <div className="about-values-grid-enhanced">
                        {[
                            { title: "Authenticity", icon: "✨", desc: "True to self, honest work" },
                            { title: "Client Focus", icon: "🤝", desc: "Your vision is my mission" },
                            { title: "Hygiene", icon: "🧼", desc: "Professional standards always" },
                            { title: "Growth", icon: "📈", desc: "Learning every single day" }
                        ].map((value, i) => (
                            <div key={i} className="about-value-item-enhanced">
                                <span className="about-value-icon-item">{value.icon}</span>
                                <h4 className="about-value-title-enhanced">{value.title}</h4>
                                <p className="about-value-description">{value.desc}</p>
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
        </section >
    );
};

export default About;

