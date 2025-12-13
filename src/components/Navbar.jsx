import React, { useState } from 'react';
import './Navbar.css';

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
        <nav className="navbar">
            <div
                className="navbar-logo"
                onClick={() => scrollTo('hero')}
            >
                Kalpana
            </div>

            {/* Desktop Menu */}
            <div className="navbar-desktop-menu">
                <button onClick={() => scrollTo('about')}>About</button>
                <button onClick={() => scrollTo('gallery')}>Portfolio</button>
                <button onClick={() => scrollTo('services')}>Services</button>
                <button onClick={() => scrollTo('contact')}>Contact</button>
            </div>

            {/* Mobile Menu Button - 44x44 tap area */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="navbar-hamburger"
                aria-label="Toggle navigation menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    )}
                </svg>
            </button>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="navbar-mobile-menu">
                    <button onClick={() => scrollTo('about')}>About</button>
                    <button onClick={() => scrollTo('gallery')}>Portfolio</button>
                    <button onClick={() => scrollTo('services')}>Services</button>
                    <button onClick={() => scrollTo('contact')}>Contact</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
