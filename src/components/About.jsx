import React, { useState, useEffect } from 'react';
import RevealOnScroll from './RevealOnScroll';
import './About.css';
import './About-Enhanced.css';
import './About-Cards-Timeline-Enhanced.css';

const About = () => {
    const [activeTimelineDots, setActiveTimelineDots] = useState({});

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

    return (
        <section id="about" className="about-section">
            <div className="container mx-auto px-6 space-y-24">

                {/* 1. Intro Section (Portrait + Bio) */}
                <RevealOnScroll>
                    <div className="about-intro-wrapper">
                        {/* Portrait */}
                        <div className="about-portrait-container">
                            <div className="relative group mx-auto w-[75%] max-w-[260px] md:w-full md:max-w-[340px]">
                                <div className="absolute inset-0 bg-theme-accent/10 translate-x-3 translate-y-3 rounded-2xl transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                                <div
                                    className="relative aspect-[4/5] bg-theme-surface rounded-2xl overflow-hidden border border-theme-highlight/20 shadow-lg shadow-theme-highlight/5 transition-all duration-500 group-hover:shadow-theme-highlight/20"
                                    style={{
                                        '--tw-shadow': '0 0 10px var(--tw-shadow-color, rgba(255, 0, 38, 0.5))',
                                        boxShadow: 'var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)'
                                    }}
                                >
                                    <img
                                        src={`${import.meta.env.BASE_URL}Kalpana-About.png`}
                                        alt="Kalpana - Professional Makeup Artist"
                                        className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-1000"
                                        style={{ transform: 'scaleX(-1)' }}
                                    />
                                </div>
                            </div>
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
                            { year: '2021', title: 'Passion Ignited', quote: 'Discovered the transformative power of makeup.' },
                            { year: '2022', title: 'Professional Training', quote: 'Honing skills with master artists at Red Fox.' },
                            { year: '2023', title: 'Freelance Career', quote: 'Building a portfolio of diverse faces and stories.' },
                            { year: '2024', title: 'BBA & Brand Growth', quote: 'Merging business strategy with creative artistry.' }
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

            </div>
        </section>
    );
};

export default About;

