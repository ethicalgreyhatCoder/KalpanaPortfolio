import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
    // Typewriter Effect Hook - Slower for luxury feel
    const useTypewriter = (textArray, speed = 120, pause = 2500) => {
        const [displayedText, setDisplayedText] = useState('');
        const [currentIndex, setCurrentIndex] = useState(0);
        const [isDeleting, setIsDeleting] = useState(false);

        useEffect(() => {
            const handleTyping = () => {
                const currentFullText = textArray[currentIndex];

                if (isDeleting) {
                    setDisplayedText(prev => prev.slice(0, -1));
                    if (displayedText === '') {
                        setIsDeleting(false);
                        setCurrentIndex(prev => (prev + 1) % textArray.length);
                    }
                } else {
                    setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
                    if (displayedText === currentFullText) {
                        setTimeout(() => setIsDeleting(true), pause);
                    }
                }
            };

            const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
            return () => clearTimeout(timer);
        }, [displayedText, isDeleting, currentIndex, textArray, speed, pause]);

        return displayedText;
    };

    const typewriterText = useTypewriter([
        'Professional Makeup Artist',
        'BBA Student | Business Mind'
    ]);

    const scrollTo = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="hero" className="hero-section" style={{ scrollSnapAlign: 'start' }}>

            <div className="container mx-auto px-6 hero-content">
                {/* Left Column: Text & Content */}
                <div className="hero-text-section">
                    <div>
                        <h2 className="hero-intro">Hello, I am</h2>
                        <h1 className="hero-title">KALPANA</h1>
                        <p className="hero-tagline">Where beauty meets business strategy.</p>
                    </div>

                    <div className="hero-typewriter">
                        <p className="typewriter-text">
                            I am a <span className="typewriter-highlight">{typewriterText}</span>
                            <span className="typewriter-cursor">|</span>
                        </p>
                        {/* Quotation with refined styling */}
                        <div className="hero-quote-section">
                            <p className="hero-quote">
                                <span className="quote-mark">"</span>Beauty is not about masking who you are, but revealing the star within.
                            </p>
                        </div>
                    </div>

                    <p className="hero-description">
                        Passionate makeup artist with a strong foundation in business strategy.
                        I blend creativity, professionalism, and client-focused thinking.
                    </p>

                    {/* Primary CTA - Above the fold (Desktop only) */}
                    <button onClick={() => scrollTo('gallery')} className="hero-primary-cta">
                        View Portfolio
                    </button>

                    {/* Achievements Section */}
                    <div className="hero-achievements">
                        <div className="achievement-item">
                            <div className="achievement-value">50+</div>
                            <div className="achievement-label">HAPPY CLIENTS</div>
                        </div>
                        <div className="achievement-item">
                            <div className="achievement-value">3+</div>
                            <div className="achievement-label">YEARS EXPERIENCE</div>
                        </div>
                        <div className="achievement-item">
                            <div className="achievement-value">2</div>
                            <div className="achievement-label">CERTIFICATIONS</div>
                        </div>
                        <div className="achievement-item">
                            <div className="achievement-value">100+</div>
                            <div className="achievement-label">LOOKS DELIVERED</div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Hero Image */}
                <div
                    className="hero-image-section"
                    style={{ transform: `translateY(${offset * 0.3}px)` }} // Parallax Effect
                >
                    <div className="hero-image-wrapper hero-blob-glow">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible hero-parallax-image">
                            <defs>
                                <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#edededc4" />
                                    <stop offset="100%" stopColor="#edededc4" />
                                </linearGradient>

                                {/* Optimized neon bloom - mobile-friendly with reduced spread */}
                                <filter id="neonBloom"
                                    x="-80%" y="-80%"
                                    width="260%" height="260%"
                                    colorInterpolationFilters="sRGB">

                                    {/* Inner blur for smoothness */}
                                    <feGaussianBlur in="SourceGraphic"
                                        stdDeviation="4"
                                        result="blur1" />

                                    {/* Outer glow - reduced for mobile */}
                                    <feGaussianBlur in="SourceGraphic"
                                        stdDeviation="8"
                                        result="blur2" />

                                    {/* Gentle animation */}
                                    <animate attributeName="stdDeviation"
                                        values="6;12;6"
                                        dur="4s"
                                        repeatCount="indefinite" />

                                    {/* Subtle neon color with reduced opacity */}
                                    <feFlood floodColor="#b76e79"
                                        floodOpacity="0.25"
                                        result="color" />

                                    <feComposite in="color"
                                        in2="blur2"
                                        operator="in"
                                        result="glow" />

                                    {/* Merge glow + shape */}
                                    <feMerge>
                                        <feMergeNode in="glow" />
                                        <feMergeNode in="blur1" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>


                                <clipPath id="popOutClip">
                                    <path transform="translate(100 100) scale(0.95)" d="M42.7,-72.1C55.3,-66.3,65.6,-56.3,73.1,-44.5C80.6,-32.7,85.3,-19.1,84.2,-6.1C83.2,7,76.4,19.4,67.3,30.3C58.2,41.2,46.8,50.6,34.7,58.3C22.6,66,9.8,71.9,-1.9,75.2C-13.6,78.5,-24.3,79.1,-35.3,74.5C-46.3,69.9,-57.7,60.1,-66.3,48.5C-74.9,36.9,-80.7,23.5,-80.3,10.2C-79.9,-3.1,-73.2,-16.3,-64.2,-27.4C-55.2,-38.5,-43.8,-47.5,-32.1,-53.8C-20.4,-60.1,-8.3,-63.7,4.8,-72C18,-80.3,30.1,-93.3,42.7,-72.1Z" />
                                    {/* Prevent petals from overlapping face */}
                                    <rect x="-100" y="-200" width="400" height="250" />
                                </clipPath>
                            </defs>

                            {/* Background Blob with optimized glow */}
                            <path
                                fill="url(#blobGradient)"
                                stroke="#edededc4"
                                strokeWidth="3"
                                filter="url(#neonBloom)"
                                d="M42.7,-72.1C55.3,-66.3,65.6,-56.3,73.1,-44.5C80.6,-32.7,85.3,-19.1,84.2,-6.1C83.2,7,76.4,19.4,67.3,30.3C58.2,41.2,46.8,50.6,34.7,58.3C22.6,66,9.8,71.9,-1.9,75.2C-13.6,78.5,-24.3,79.1,-35.3,74.5C-46.3,69.9,-57.7,60.1,-66.3,48.5C-74.9,36.9,-80.7,23.5,-80.3,10.2C-79.9,-3.1,-73.2,-16.3,-64.2,-27.4C-55.2,-38.5,-43.8,-47.5,-32.1,-53.8C-20.4,-60.1,-8.3,-63.7,4.8,-72C18,-80.3,30.1,-93.3,42.7,-72.1Z"
                                transform="translate(100 100) scale(0.95)"
                            />

                            {/* Image clipped to prevent petal overlap */}
                            <image
                                href={`${import.meta.env.BASE_URL}Kalpana-Hero.webp`}
                                x="20" y="0" width="160" height="200"
                                clipPath="url(#popOutClip)"
                                preserveAspectRatio="xMidYMax slice"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Desktop only */}
            <div className="hero-scroll-indicator">
                <div className="w-px h-16 bg-linear-to-b from-transparent via-theme-accent to-transparent opacity-50"></div>
            </div>
        </section>
    );
};

export default Hero;
