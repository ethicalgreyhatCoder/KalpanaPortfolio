import React, { useState } from 'react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollTo = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-[15px] flex justify-between items-center transition-all duration-300 bg-theme-bg/80 backdrop-blur-sm">
            <div
                className="text-2xl md:text-3xl font-medium tracking-tighter uppercase cursor-pointer text-theme-text font-serif"
                onClick={() => scrollTo('hero')}
            >
                Kalpana
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase text-theme-text">
                <button onClick={() => scrollTo('about')} className="hover:text-theme-accent transition-colors">About</button>
                <button onClick={() => scrollTo('gallery')} className="hover:text-theme-accent transition-colors">Portfolio</button>
                <button onClick={() => scrollTo('services')} className="hover:text-theme-accent transition-colors">Services</button>
                <button onClick={() => scrollTo('contact')} className="hover:text-theme-accent transition-colors">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-theme-text focus:outline-none"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-theme-bg/95 backdrop-blur-md border-b border-theme-border flex flex-col items-center py-6 space-y-4 shadow-lg md:hidden animate-fade-in-down">
                    <button onClick={() => scrollTo('about')} className="text-lg font-medium tracking-widest uppercase text-theme-text hover:text-theme-accent transition-colors">About</button>
                    <button onClick={() => scrollTo('gallery')} className="text-lg font-medium tracking-widest uppercase text-theme-text hover:text-theme-accent transition-colors">Portfolio</button>
                    <button onClick={() => scrollTo('services')} className="text-lg font-medium tracking-widest uppercase text-theme-text hover:text-theme-accent transition-colors">Services</button>
                    <button onClick={() => scrollTo('contact')} className="text-lg font-medium tracking-widest uppercase text-theme-text hover:text-theme-accent transition-colors">Contact</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
