import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import './About.css';
import './About-Enhanced.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container mx-auto px-6 space-y-24">

                {/* 1. Intro Section (Portrait + Bio) */}
                <RevealOnScroll>
                    <div className="about-intro-wrapper">
                        {/* Portrait */}
                        <div className="about-portrait-container">
                            <div className="relative group mx-auto w-[75%] max-w-65 md:w-full md:max-w-85">
                                <div className="absolute inset-0 bg-theme-accent/10 translate-x-3 translate-y-3 rounded-2xl transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                                <div
                                    className="relative aspect-4/5 bg-theme-surface rounded-2xl overflow-hidden border border-theme-highlight/20 shadow-lg shadow-theme-highlight/5 transition-all duration-500 group-hover:shadow-theme-highlight/20"
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

                {/* 3. Dual Identity (Split Cards) */}
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

                {/* 4. Journey Timeline */}
                <div className="timeline-container">
                    {/* Central Vertical Line (Left on Mobile, Center on Desktop) */}
                    <div className="timeline-line"></div>

                    {/* Timeline Content Wrapper */}
                    <div className="timeline-wrapper">

                    {/* 2021 */}
                    <RevealOnScroll className="mb-8">
                        {/* Mobile: Row with Dot on left, Content on right. Desktop: Alternating columns */}
                        <div className="relative flex md:justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-6 group pl-12 md:pl-0 text-left md:text-center">

                            {/* Desktop Left Content / Mobile Content */}
                            <div className="w-full md:w-5/12 md:text-right order-1 md:order-1">
                                <h4 className="text-2xl md:text-3xl font-serif font-bold text-theme-text mb-1">2021</h4>
                                <p className="text-theme-text/60 font-sans tracking-wide text-xs md:text-sm uppercase">Passion Ignited</p>
                                <p className="text-theme-text/40 text-sm italic mt-2 opacity-80 md:hidden xl:block">
                                    "Discovered the transformative power of makeup."
                                </p>
                            </div>

                            {/* Dot (Left on Mobile, Center on Desktop) */}
                            <div className="timeline-dot active"></div>

                            {/* Desktop Right Spacer / Quote Context */}
                            <div className="w-full md:w-5/12 order-3 md:order-2 md:pl-8 text-center md:text-left text-theme-text/70 italic hidden md:block">
                                "Discovered the transformative power of makeup."
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* 2022 */}
                    <RevealOnScroll className="mb-8">
                        <div className="relative flex md:justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-6 group pl-12 md:pl-0 text-left md:text-center">

                            <div className="w-full md:w-5/12 order-1 md:order-1 md:text-right md:pr-8 text-center text-theme-text/70 italic hidden md:block">
                                "Honing skills with master artists at Red Fox."
                            </div>

                            {/* Dot */}
                            <div className="timeline-dot active"></div>

                            <div className="w-full md:w-5/12 md:text-left order-1 md:order-2">
                                <h4 className="text-2xl md:text-3xl font-serif font-bold text-theme-text mb-1">2022</h4>
                                <p className="text-theme-text/60 font-sans tracking-wide text-xs md:text-sm uppercase">Professional Training</p>
                                <p className="text-theme-text/40 text-sm italic mt-2 opacity-80 md:hidden xl:block">
                                    "Honing skills with master artists at Red Fox."
                                </p>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* 2023 */}
                    <RevealOnScroll className="mb-8">
                        <div className="relative flex md:justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-6 group pl-12 md:pl-0 text-left md:text-center">

                            <div className="w-full md:w-5/12 md:text-right order-1 md:order-1">
                                <h4 className="text-2xl md:text-3xl font-serif font-bold text-theme-text mb-1">2023</h4>
                                <p className="text-theme-text/60 font-sans tracking-wide text-xs md:text-sm uppercase">Freelance Career</p>
                                <p className="text-theme-text/40 text-sm italic mt-2 opacity-80 md:hidden xl:block">
                                    "Building a portfolio of diverse faces and stories."
                                </p>
                            </div>

                            {/* Dot */}
                            <div className="timeline-dot active"></div>

                            <div className="w-full md:w-5/12 order-3 md:order-2 md:pl-8 text-center md:text-left text-theme-text/70 italic hidden md:block">
                                "Building a portfolio of diverse faces and stories."
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* 2024 */}
                    <RevealOnScroll className="mb-8">
                        <div className="relative flex md:justify-between items-start md:items-center flex-col md:flex-row gap-4 md:gap-6 group pl-12 md:pl-0 text-left md:text-center">

                            <div className="w-full md:w-5/12 order-1 md:order-1 md:text-right md:pr-8 text-center text-theme-text/70 italic hidden md:block">
                                "Merging business strategy with creative artistry."
                            </div>

                            {/* Dot */}
                            <div className="timeline-dot active"></div>

                            <div className="w-full md:w-5/12 md:text-left order-1 md:order-2">
                                <h4 className="text-2xl md:text-3xl font-serif font-bold text-theme-text mb-1">2024</h4>
                                <p className="text-theme-text/60 font-sans tracking-wide text-xs md:text-sm uppercase">BBA & Brand Growth</p>
                                <p className="text-theme-text/40 text-sm italic mt-2 opacity-80 md:hidden xl:block">
                                    "Merging business strategy with creative artistry."
                                </p>
                            </div>
                        </div>
                    </RevealOnScroll>
                    </div>
                </div>

                {/* Transition Divider to Values */}
                <RevealOnScroll>
                    <div className="relative max-w-2xl mx-auto text-center mb-12 md:mb-16 mt-16 md:mt-20 px-8">
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className="h-px bg-linear-to-r from-transparent via-theme-highlight/50 to-theme-accent/30 flex-1"></div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-linear-to-br from-theme-highlight/20 to-theme-accent/20 flex items-center justify-center border border-theme-highlight/30">
                                    <span className="text-xl md:text-2xl">💎</span>
                                </div>
                                <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-theme-text/70 font-semibold whitespace-nowrap">Core Values</span>
                            </div>
                            <div className="h-px bg-linear-to-l from-transparent via-theme-highlight/50 to-theme-accent/30 flex-1"></div>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* 5. Values & Philosophy */}
                <RevealOnScroll>
                    <div className="about-values-grid">
                        {[
                            { title: "Authenticity", icon: "✨", desc: "True to self and client individuality" },
                            { title: "Client Focus", icon: "🤝", desc: "Your vision drives every brushstroke" },
                            { title: "Hygiene", icon: "🧼", desc: "Professional tools, sanitized always" },
                            { title: "Growth", icon: "📈", desc: "Learning, evolving, creating daily" }
                        ].map((value, i) => (
                            <div key={i} className="about-value-item">
                                <div className="about-value-icon">{value.icon}</div>
                                <h4 className="about-value-title">{value.title}</h4>
                                <p className="about-value-desc">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>

                {/* 6. Closing CTA */}
                <RevealOnScroll>
                    <div className="about-cta-section">
                        <h3 className="about-cta-title">Ready to create something beautiful?</h3>
                        <p className="about-cta-subtitle">Available for bridal, editorial & freelance projects</p>
                        <div className="about-cta-buttons">
                            {/* Primary CTA - View Portfolio */}
                            <button onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })} className="about-cta-primary">
                                View Portfolio
                            </button>

                            {/* Secondary CTA - Book Session (Text Style) */}
                            <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="about-cta-secondary">
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
