import React, { useState, useRef, useEffect } from 'react';
import RevealOnScroll from './RevealOnScroll';
import './About.css';
import './About-Enhanced.css';
import './About-Cards-Timeline-Enhanced.css';

const About = () => {
    const [activeTimelineDots, setActiveTimelineDots] = useState({});

    // Mobile carousel state
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(2); // Start with center image
    const carouselRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [swipeOffset, setSwipeOffset] = useState(0); // Track swipe position for continuous animation
    const [isTransitioning, setIsTransitioning] = useState(false); // Track if auto-transitioning

    // Desktop fade-cycle state
    const [desktopPhotoIndex, setDesktopPhotoIndex] = useState(0);
    const desktopCycleIntervalRef = useRef(null);

    // Cherry blossom petals state - generated once on mount to avoid impure function during render
    const [petals, setPetals] = useState([]);

    // Photo collection (6 mobile, 8+ desktop)
    const mobilePhotos = [
        `${import.meta.env.BASE_URL}Kalpana-About.png`,
        `${import.meta.env.BASE_URL}Kalpana-About2.png`,
        `${import.meta.env.BASE_URL}Kalpana-About3.png`,
        `${import.meta.env.BASE_URL}Kalpana-About2.png`,
        `${import.meta.env.BASE_URL}Kalpana-About.png`,
        `${import.meta.env.BASE_URL}Kalpana-About3.png`,
    ];

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

    // Mobile carousel swipe handling with visible transitions
    useEffect(() => {
        if (!isMobile || !carouselRef.current) return;

        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;
        let isHorizontalSwipe = false;

        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            currentX = startX;
            currentY = startY;
            isHorizontalSwipe = false;
            setIsTransitioning(false); // Disable CSS transitions during drag
        };

        const handleTouchMove = (e) => {
            if (isTransitioning) return;

            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
            const diffX = Math.abs(currentX - startX);
            const diffY = Math.abs(currentY - startY);

            // CRITICAL: Detect horizontal intent EARLIER (5px threshold)
            if (!isHorizontalSwipe && (diffX > 5 || diffY > 5)) {
                isHorizontalSwipe = diffX > diffY;
            }

            // AGGRESSIVE GESTURE LOCK: Once horizontal, prevent ALL browser interference
            if (isHorizontalSwipe) {
                e.preventDefault(); // Lock gesture immediately
                e.stopPropagation(); // Stop event bubbling
            }

            const diff = currentX - startX;

            // Update swipe offset for real-time sliding effect
            // Normalize to percentage of container width for smooth scaling
            const containerWidth = carouselRef.current?.offsetWidth || 260;
            const offsetPercent = (diff / containerWidth) * 100;
            setSwipeOffset(offsetPercent);
        };

        const handleTouchEnd = () => {
            const diff = startX - currentX;
            const threshold = 50; // Minimum swipe distance

            setIsTransitioning(true); // Enable CSS transitions for snap

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe left - next photo
                    setCurrentPhotoIndex((prev) => (prev + 1) % mobilePhotos.length);
                } else {
                    // Swipe right - previous photo
                    setCurrentPhotoIndex((prev) => (prev - 1 + mobilePhotos.length) % mobilePhotos.length);
                }
            }

            // Reset swipe offset after a brief delay to allow transition
            setTimeout(() => {
                setSwipeOffset(0);
            }, 50);
        };

        const carousel = carouselRef.current;
        carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
        // touchmove must NOT be passive to allow preventDefault
        carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
        carousel.addEventListener('touchend', handleTouchEnd);

        return () => {
            carousel.removeEventListener('touchstart', handleTouchStart);
            carousel.removeEventListener('touchmove', handleTouchMove);
            carousel.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isMobile, mobilePhotos.length, isTransitioning]);


    // Desktop photo fade cycle (7 second intervals for cinematic feel)
    // Fade transitions: 1 second, visible duration: ~6 seconds
    useEffect(() => {
        if (isMobile) return;

        // Clear any existing interval
        if (desktopCycleIntervalRef.current) {
            clearInterval(desktopCycleIntervalRef.current);
        }

        // Set up new interval: 7000ms = 7 seconds per image (1s fade + 6s visible)
        // This creates calm, editorial magazine-style pacing
        desktopCycleIntervalRef.current = setInterval(() => {
            setDesktopPhotoIndex((prev) => (prev + 1) % desktopPhotos.length);
        }, 7000); // 7 seconds for even more cinematic, slow-paced presentation

        return () => {
            if (desktopCycleIntervalRef.current) {
                clearInterval(desktopCycleIntervalRef.current);
            }
        };
    }, [isMobile, desktopPhotos.length]);

    // Helper functions for smooth book-swap 3D layering
    // Calculate dynamic z-index based on swipe direction and progress
    const getLayerDepth = (position, offset) => {
        // Normalize swipe offset: -100 (swipe left) to +100 (swipe right)
        const normalizedOffset = Math.max(-100, Math.min(100, offset));

        if (position === 'center') {
            // Center starts at 30, decreases as it moves away
            if (normalizedOffset > 20) {
                // Swiping right - center moving to right
                return Math.max(20, 30 - Math.abs(normalizedOffset - 20) / 3);
            } else if (normalizedOffset < -20) {
                // Swiping left - center moving to left
                return Math.max(20, 30 - Math.abs(normalizedOffset + 20) / 3);
            }
            return 30; // Center dominant
        } else if (position === 'left') {
            // Left starts at 20, increases when becoming center
            if (normalizedOffset < -20) {
                // Swiping left - left image coming to center
                return Math.min(30, 20 + Math.abs(normalizedOffset + 20) / 3);
            }
            return 20;
        } else if (position === 'right') {
            // Right starts at 20, increases when becoming center
            if (normalizedOffset > 20) {
                // Swiping right - right image coming to center
                return Math.min(30, 20 + Math.abs(normalizedOffset - 20) / 3);
            }
            return 20;
        }
        return 20;
    };

    // Calculate dynamic opacity for smooth fade transitions
    const getLayerOpacity = (position, offset) => {
        const normalizedOffset = Math.max(-100, Math.min(100, offset));

        if (position === 'center') {
            // Center: 1.0 at rest, fades slightly as it moves
            const fadeAmount = Math.abs(normalizedOffset) / 100;
            return Math.max(0.65, 1.0 - (fadeAmount * 0.35));
        } else if (position === 'left') {
            // Left: 0.65 at rest, brightens when becoming center
            if (normalizedOffset < -20) {
                const brighten = Math.abs(normalizedOffset + 20) / 80;
                return Math.min(1.0, 0.65 + (brighten * 0.35));
            }
            return 0.65;
        } else if (position === 'right') {
            // Right: 0.65 at rest, brightens when becoming center
            if (normalizedOffset > 20) {
                const brighten = Math.abs(normalizedOffset - 20) / 80;
                return Math.min(1.0, 0.65 + (brighten * 0.35));
            }
            return 0.65;
        }
        return 0.65;
    };

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
                        {/* Portrait - Carousel (Mobile) / Fade Cycle (Desktop) */}
                        <div className="about-portrait-container">
                            {isMobile ? (
                                // Mobile: Horizontal swipe carousel
                                // MOBILE IMAGE SYSTEM:
                                // - Only ONE primary image visible at a time (center)
                                // - Adjacent images barely visible (skewed, dimmed)
                                // - Prevents image overlap by strict opacity and z-index layering
                                // - Expected image format: PNG with 4:5 aspect ratio (height > width)
                                // - All images must have transparent backgrounds
                                // - Container enforces fixed aspect ratio to prevent jumping
                                <div
                                    className="mobile-photo-carousel"
                                    ref={carouselRef}
                                    onClickCapture={(e) => e.preventDefault()}
                                >
                                    {/* Left preview image: Previous (skewed left, partially visible) */}
                                    <div
                                        className="carousel-photo-wrapper left"
                                        style={{
                                            transform: `translateX(calc(-45% + ${swipeOffset}%)) translateZ(-60px) scale(0.85) rotateY(12deg)`,
                                            zIndex: getLayerDepth('left', swipeOffset),
                                            opacity: getLayerOpacity('left', swipeOffset),
                                            transition: isTransitioning ?
                                                'transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1.5s ease' :
                                                'transform 0.15s ease-out, opacity 0.15s ease-out',
                                        }}
                                    >
                                        <img
                                            src={mobilePhotos[(currentPhotoIndex - 1 + mobilePhotos.length) % mobilePhotos.length]}
                                            alt="Previous"
                                            className="carousel-photo"
                                        />
                                    </div>

                                    {/* Center image: Active, fully visible, highest z-index */}
                                    <div
                                        className="carousel-photo-wrapper center"
                                        style={{
                                            transform: `translateX(${swipeOffset}%) translateZ(80px) scale(1)`,
                                            zIndex: getLayerDepth('center', swipeOffset),
                                            opacity: getLayerOpacity('center', swipeOffset),
                                            transition: isTransitioning ? 'transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1.5s ease' : 'transform 0.15s ease-out, opacity 0.15s ease-out',
                                        }}
                                    >
                                        <img
                                            src={mobilePhotos[currentPhotoIndex]}
                                            alt={`Kalpana Portfolio ${currentPhotoIndex + 1}`}
                                            className="carousel-photo"
                                        />
                                    </div>

                                    {/* Right preview image: Next (skewed right, partially visible) */}
                                    <div
                                        className="carousel-photo-wrapper right"
                                        style={{
                                            transform: `translateX(calc(45% + ${swipeOffset}%)) translateZ(-60px) scale(0.85) rotateY(-12deg)`,
                                            zIndex: getLayerDepth('right', swipeOffset),
                                            opacity: getLayerOpacity('right', swipeOffset),
                                            transition: isTransitioning ? 'transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1.5s ease' : 'transform 0.15s ease-out, opacity 0.15s ease-out',
                                        }}
                                    >
                                        <img
                                            src={mobilePhotos[(currentPhotoIndex + 1) % mobilePhotos.length]}
                                            alt="Next"
                                            className="carousel-photo"
                                        />
                                    </div>
                                </div>
                            ) : (
                                // Desktop: Cinematic fade cycle
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

