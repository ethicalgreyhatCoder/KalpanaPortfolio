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

                    <div className="hero-cta-group">
                        <button onClick={() => scrollTo('contact')} className="hero-cta-button">
                            Book Now
                        </button>

                        <div className="social-icons-group">
                            {/* Instagram */}
                            <a href="https://www.instagram.com/_kalpan.aaaa/" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>

                            {/* Snapchat */}
                            <a href="#" className="social-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.84 17.58a7 7 0 0 1-11.68 0" /><path d="M7 9a5 5 0 0 1 10 0v2.75a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V9Z" /><circle cx="9.5" cy="11.5" r="0.5" fill="currentColor" stroke="none" /><circle cx="14.5" cy="11.5" r="0.5" fill="currentColor" stroke="none" /></svg>
                            </a>

                            {/* YouTube */}
                            <a href="#" className="social-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                            </a>

                            {/* WhatsApp */}
                            <a href={`https://wa.me/919310807014?text=${encodeURIComponent("Hi kalpana I found you from your portfolio I really want to work with you please give me the details")}`} target="_blank" rel="noopener noreferrer" className="social-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                            </a>
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
                                    <stop offset="0%" stopColor="#FFFFFF" />
                                    <stop offset="100%" stopColor="#FFFFFF" />
                                </linearGradient>

                                {/* Reduced glow intensity with less intense bloom */}
                                <filter id="pinkBloom" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
                                    <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
                                    <feFlood floodColor="#b76e79" floodOpacity="0.15" result="offsetColor" />
                                    <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur" />
                                    <feMerge>
                                        <feMergeNode in="offsetBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>

                                <clipPath id="popOutClip">
                                    <path transform="translate(100 100) scale(0.95)" d="M42.7,-72.1C55.3,-66.3,65.6,-56.3,73.1,-44.5C80.6,-32.7,85.3,-19.1,84.2,-6.1C83.2,7,76.4,19.4,67.3,30.3C58.2,41.2,46.8,50.6,34.7,58.3C22.6,66,9.8,71.9,-1.9,75.2C-13.6,78.5,-24.3,79.1,-35.3,74.5C-46.3,69.9,-57.7,60.1,-66.3,48.5C-74.9,36.9,-80.7,23.5,-80.3,10.2C-79.9,-3.1,-73.2,-16.3,-64.2,-27.4C-55.2,-38.5,-43.8,-47.5,-32.1,-53.8C-20.4,-60.1,-8.3,-63.7,4.8,-72C18,-80.3,30.1,-93.3,42.7,-72.1Z" />
                                    {/* Prevent petals from overlapping face */}
                                    <rect x="-100" y="-200" width="400" height="250" />
                                </clipPath>
                            </defs>

                            {/* Background Blob with reduced glow */}
                            <path
                                fill="url(#blobGradient)"
                                stroke="#FFFFFF"
                                strokeWidth="3"
                                filter="url(#pinkBloom)"
                                d="M42.7,-72.1C55.3,-66.3,65.6,-56.3,73.1,-44.5C80.6,-32.7,85.3,-19.1,84.2,-6.1C83.2,7,76.4,19.4,67.3,30.3C58.2,41.2,46.8,50.6,34.7,58.3C22.6,66,9.8,71.9,-1.9,75.2C-13.6,78.5,-24.3,79.1,-35.3,74.5C-46.3,69.9,-57.7,60.1,-66.3,48.5C-74.9,36.9,-80.7,23.5,-80.3,10.2C-79.9,-3.1,-73.2,-16.3,-64.2,-27.4C-55.2,-38.5,-43.8,-47.5,-32.1,-53.8C-20.4,-60.1,-8.3,-63.7,4.8,-72C18,-80.3,30.1,-93.3,42.7,-72.1Z"
                                transform="translate(100 100) scale(0.95)"
                            />

                            {/* Image clipped to prevent petal overlap */}
                            <image
                                href={`${import.meta.env.BASE_URL}Kalpana-Hero.png`}
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
