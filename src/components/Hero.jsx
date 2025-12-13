import React, { useState, useEffect } from 'react';

const Hero = () => {
    // Typewriter Effect Hook
    const useTypewriter = (textArray, speed = 100, pause = 2000) => {
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
        'BBA Student | Business Mind',
        'Lifestyle & Travel Creator'
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
        <section id="hero" className="min-h-screen relative flex items-center justify-center bg-transparent pt-6 md:pt-0 top-0" style={{ scrollSnapAlign: 'start' }}>

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
                {/* Left Column: Text & Content */}
                <div className="order-2 md:order-1 space-y-8 text-left animate-fade-in-up">
                    <div className="space-y-2">
                        <h2 className="text-lg md:text-2xl font-serif italic text-theme-accent opacity-90">
                            Hello, I am
                        </h2>
                        <h1 className="text-5xl md:text-[5.3rem] font-thin font-serif tracking-tight text-theme-text leading-none">
                            KALPANA
                        </h1>
                        <p className="text-sm mobile-lg:text-xl font-sans tracking-widest text-[#545454] uppercase pt-2 opacity-80 italic">
                            Where beauty meets business strategy.
                        </p>
                    </div>

                    <div className="h-24 md:h-32">
                        <p className="text-lg md:text-3xl font-light text-theme-text font-sans border-l-4 border-theme-accent pl-6 py-2">
                            I am a <span className="font-semibold text-theme-highlight">{typewriterText}</span>
                            <span className="animate-pulse">|</span>
                        </p>
                        {/* Quotation */}
                        <p className="mt-4 text-xs md:text-base italic text-gray-500 font-serif max-w-md pl-6">
                            "Beauty is not about masking who you are, but revealing the star within."
                        </p>
                    </div>

                    <p className="text-base md:text-lg text-theme-text/80 max-w-lg leading-relaxed pt-4">
                        Passionate makeup artist with a strong foundation in business strategy.
                        I blend creativity, professionalism, and client-focused thinking to deliver
                        looks that enhance confidence and individuality.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 pt-4">
                        <button onClick={() => scrollTo('contact')} className="px-10 py-4 border-2 border-[#545454] text-[#545454] bg-transparent font-bold uppercase tracking-widest rounded-full hover:bg-[#ff0026] hover:border-[#ff0026] hover:text-white hover:shadow-[0_0_10px_rgba(255,0,38,0.5)] transition-all duration-300 transform hover:-translate-y-1 w-full md:w-auto text-sm md:text-base">
                            Book Now
                        </button>

                        <div className="flex items-center gap-6 justify-center md:justify-start">
                            {/* Instagram */}
                            <a href="https://www.instagram.com/_kalpan.aaaa/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-theme-accent text-theme-accent hover:text-[#ff0026] hover:border-[#ff0026] hover:shadow-[0_0_10px_rgba(255,0,38,0.5)] transition-all duration-300 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>

                            {/* Snapchat */}
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-theme-accent text-theme-accent hover:text-[#ff0026] hover:border-[#ff0026] hover:shadow-[0_0_10px_rgba(255,0,38,0.5)] transition-all duration-300 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.84 17.58a7 7 0 0 1-11.68 0" /><path d="M7 9a5 5 0 0 1 10 0v2.75a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V9Z" /><circle cx="9.5" cy="11.5" r="0.5" fill="currentColor" stroke="none" /><circle cx="14.5" cy="11.5" r="0.5" fill="currentColor" stroke="none" /></svg>
                            </a>

                            {/* YouTube */}
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-theme-accent text-theme-accent hover:text-[#ff0026] hover:border-[#ff0026] hover:shadow-[0_0_10px_rgba(255,0,38,0.5)] transition-all duration-300 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                            </a>

                            {/* WhatsApp */}
                            <a href={`https://wa.me/919310807014?text=${encodeURIComponent("Hi kalpana I found you from your portfolio I really want to work with you please give me the details")}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-theme-accent text-theme-accent hover:text-[#ff0026] hover:border-[#ff0026] hover:shadow-[0_0_10px_rgba(255,0,38,0.5)] transition-all duration-300 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Column: Hero Image with Pop-Out Blob */}
                <div
                    className="order-1 md:order-2 h-full flex items-center justify-center relative z-20 pt-8 md:pt-0"
                    style={{ transform: `translateY(${offset * 0.3}px)` }} // Parallax Effect
                >
                    {/* SVG Container - Overflow Visible to allow Pop-Out */}
                    <div className="relative w-full max-w-75 md:max-w-112.5 aspect-square transition-transform duration-700 hover:scale-105 animate-pulse-slow">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
                            <defs>
                                <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FFFFFF" /> {/* White Fill */}
                                    <stop offset="100%" stopColor="#FFFFFF" /> {/* White Fill */}
                                </linearGradient>

                                <filter id="pinkBloom" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="15" result="blur" />
                                    <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
                                    {/* Centered Bloom */}

                                    <feFlood floodColor="#ff0026" floodOpacity="0.5" result="offsetColor" />
                                    <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur" />
                                    <feMerge>
                                        <feMergeNode in="offsetBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>

                                <clipPath id="popOutClip">
                                    {/* 1. The Blob Shape (Bottom) */}
                                    <path transform="translate(100 100) scale(0.95)" d="M42.7,-72.1C55.3,-66.3,65.6,-56.3,73.1,-44.5C80.6,-32.7,85.3,-19.1,84.2,-6.1C83.2,7,76.4,19.4,67.3,30.3C58.2,41.2,46.8,50.6,34.7,58.3C22.6,66,9.8,71.9,-1.9,75.2C-13.6,78.5,-24.3,79.1,-35.3,74.5C-46.3,69.9,-57.7,60.1,-66.3,48.5C-74.9,36.9,-80.7,23.5,-80.3,10.2C-79.9,-3.1,-73.2,-16.3,-64.2,-27.4C-55.2,-38.5,-43.8,-47.5,-32.1,-53.8C-20.4,-60.1,-8.3,-63.7,4.8,-72C18,-80.3,30.1,-93.3,42.7,-72.1Z" />
                                    {/* 2. Top Rect to allow head pop-out (covers top half) */}
                                    <rect x="-100" y="-200" width="400" height="250" />
                                </clipPath>
                            </defs>

                            {/* 1. Background Blob (The "Mask" Border Layer) */}
                            {/* White Border, White Fill, Red Bloom Shadow */}
                            <path
                                fill="url(#blobGradient)"
                                stroke="#FFFFFF"
                                strokeWidth="3"
                                filter="url(#pinkBloom)"
                                d="M42.7,-72.1C55.3,-66.3,65.6,-56.3,73.1,-44.5C80.6,-32.7,85.3,-19.1,84.2,-6.1C83.2,7,76.4,19.4,67.3,30.3C58.2,41.2,46.8,50.6,34.7,58.3C22.6,66,9.8,71.9,-1.9,75.2C-13.6,78.5,-24.3,79.1,-35.3,74.5C-46.3,69.9,-57.7,60.1,-66.3,48.5C-74.9,36.9,-80.7,23.5,-80.3,10.2C-79.9,-3.1,-73.2,-16.3,-64.2,-27.4C-55.2,-38.5,-43.8,-47.5,-32.1,-53.8C-20.4,-60.1,-8.3,-63.7,4.8,-72C18,-80.3,30.1,-93.3,42.7,-72.1Z"
                                transform="translate(100 100) scale(0.95)"
                            />

                            {/* 2. The Pop-Out Image */}
                            {/* Clipped to (Blob U Top-Rect) so bottom stays in shape, head pops out */}
                            <image
                                href={`${import.meta.env.BASE_URL}Kalpana-Hero.png`}
                                x="20" y="-20" width="160" height="220"
                                clipPath="url(#popOutClip)"
                                preserveAspectRatio="xMidYMax slice"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10 hidden md:block">
                <div className="w-px h-16 bg-linear-to-b from-transparent via-theme-accent to-transparent opacity-50"></div>
            </div>
        </section>
    );
};

export default Hero;
