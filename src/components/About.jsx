import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const About = () => {
    return (
        <section id="about" className="py-24 bg-theme-bg relative transition-all duration-700">
            <div className="container mx-auto px-6 space-y-24">

                {/* 1. Intro Section (Portrait + Bio) */}
                <RevealOnScroll>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Portrait */}
                        <div className="relative group mx-auto w-full max-w-sm md:max-w-md">
                            <div className="absolute inset-0 bg-theme-accent/20 translate-x-4 translate-y-4 rounded-lg transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                            <div className="relative aspect-[3/4] bg-theme-surface rounded-lg overflow-hidden border border-theme-border shadow-lg">
                                <img
                                    src={`${import.meta.env.BASE_URL}Kalpana-About.png`}
                                    alt="Kalpana - Professional Makeup Artist"
                                    className="w-full h-full object-cover"
                                    style={{ transform: 'scaleX(-1)' }}
                                />
                            </div>
                        </div>

                        {/* Bio Text */}
                        <div className="space-y-6 text-center md:text-left">
                            <h3 className="text-theme-accent font-serif italic text-2xl">About Me</h3>
                            <h2 className="text-4xl md:text-5xl font-bold font-serif text-theme-text leading-tight">
                                Hi, I’m Kalpana <br />
                                <span className="text-3xl md:text-4xl font-light block pt-2">Professional Makeup Artist & BBA Student</span>
                            </h2>
                            <div className="w-20 h-1 bg-theme-highlight mx-auto md:mx-0"></div>
                            <p className="text-lg text-theme-text/80 leading-relaxed font-sans">
                                I am a funny, outgoing, and philosophical soul who believes in living life to the fullest.
                                Born in the millennium year, I blend the vibrancy of youth with the discipline of my BBA education
                                from Manipal University and the artistry honed at Red Fox Academy.
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* 2. Passion & Purpose */}
                <RevealOnScroll>
                    <div className="max-w-4xl mx-auto text-center space-y-8 py-12 border-y border-theme-border/30">
                        <h3 className="text-3xl md:text-4xl font-serif italic text-theme-text leading-relaxed">
                            "I believe beauty is confidence, expression, and strategy working together."
                        </h3>
                        <p className="text-theme-text/80 text-lg leading-relaxed max-w-2xl mx-auto font-sans">
                            Makeup is not just meaningful; it's a transformation. My philosophy is to unveil the enigmatic
                            beauty hidden within every face, creating looks that are as bold and independent as the women I work with.
                        </p>
                    </div>
                </RevealOnScroll>

                {/* 3. Dual Identity (Split Cards) */}
                <RevealOnScroll>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Artist Card */}
                        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl border border-theme-border/50 hover:shadow-xl hover:border-theme-accent transition-all duration-300 transform hover:-translate-y-2 group">
                            <div className="w-16 h-16 bg-theme-surface rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-theme-accent group-hover:text-white transition-all duration-300">
                                <span className="text-3xl group-hover:grayscale-0 grayscale transition-all duration-300">🎨</span>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-center mb-4 text-theme-text">The Artist</h3>
                            <ul className="space-y-3 text-theme-text/80 text-center font-sans">
                                <li>Red Fox Academy Certified</li>
                                <li>Bridal & Editorial Makeup</li>
                                <li>Skin Analysis & Prep</li>
                                <li>Creative Vision</li>
                            </ul>
                        </div>

                        {/* Business Card */}
                        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl border border-theme-border/50 hover:shadow-xl hover:border-theme-highlight transition-all duration-300 transform hover:-translate-y-2 group">
                            <div className="w-16 h-16 bg-theme-surface rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-theme-highlight group-hover:text-white transition-all duration-300">
                                <span className="text-3xl group-hover:grayscale-0 grayscale transition-all duration-300">💼</span>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-center mb-4 text-theme-text">The Strategist</h3>
                            <ul className="space-y-3 text-theme-text/80 text-center font-sans">
                                <li>BBA, Manipal University</li>
                                <li>Brand Management</li>
                                <li>Client Relations</li>
                                <li>Business Strategy</li>
                            </ul>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* 4. Journey Timeline */}
                <RevealOnScroll>
                    <div className="relative max-w-3xl mx-auto py-12">
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-theme-border"></div>

                        {/* 2021 */}
                        <div className="relative flex justify-between items-center mb-12 flex-col md:flex-row gap-4">
                            <div className="w-full md:w-5/12 text-center md:text-right order-2 md:order-1 px-4">
                                <h4 className="text-xl font-bold text-theme-highlight">2021</h4>
                                <p className="text-theme-text/80">Discovered passion for makeup artistry.</p>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-theme-highlight border-4 border-white z-10 top-0 md:top-1/2 md:-translate-y-1/2"></div>
                            <div className="w-full md:w-5/12 order-3 md:order-2"></div>
                        </div>

                        {/* 2022 */}
                        <div className="relative flex justify-between items-center mb-12 flex-col md:flex-row gap-4">
                            <div className="w-full md:w-5/12 order-2 md:order-1"></div>
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-theme-highlight border-4 border-white z-10 top-0 md:top-1/2 md:-translate-y-1/2"></div>
                            <div className="w-full md:w-5/12 text-center md:text-left order-3 md:order-2 px-4">
                                <h4 className="text-xl font-bold text-theme-highlight">2022</h4>
                                <p className="text-theme-text/80">Professional training at Red Fox Academy.</p>
                            </div>
                        </div>

                        {/* 2023 */}
                        <div className="relative flex justify-between items-center mb-12 flex-col md:flex-row gap-4">
                            <div className="w-full md:w-5/12 text-center md:text-right order-2 md:order-1 px-4">
                                <h4 className="text-xl font-bold text-theme-highlight">2023</h4>
                                <p className="text-theme-text/80">Started freelance work & building portfolio.</p>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-theme-highlight border-4 border-white z-10 top-0 md:top-1/2 md:-translate-y-1/2"></div>
                            <div className="w-full md:w-5/12 order-3 md:order-2"></div>
                        </div>

                        {/* 2024 */}
                        <div className="relative flex justify-between items-center mb-12 flex-col md:flex-row gap-4">
                            <div className="w-full md:w-5/12 order-2 md:order-1"></div>
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-theme-highlight border-4 border-white z-10 top-0 md:top-1/2 md:-translate-y-1/2"></div>
                            <div className="w-full md:w-5/12 text-center md:text-left order-3 md:order-2 px-4">
                                <h4 className="text-xl font-bold text-theme-highlight">2024</h4>
                                <p className="text-theme-text/80">Pursuing BBA & Expanding Personal Brand.</p>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* 5. Values & Philosophy */}
                <RevealOnScroll>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { title: "Authenticity", icon: "✨" },
                            { title: "Client Focus", icon: "🤝" },
                            { title: "Hygiene", icon: "🧼" },
                            { title: "Growth", icon: "📈" }
                        ].map((value, i) => (
                            <div key={i} className="p-6 bg-white rounded-lg shadow-sm border border-theme-border/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                <div className="text-3xl mb-3">{value.icon}</div>
                                <h4 className="font-serif font-bold text-theme-text">{value.title}</h4>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>

                {/* 6. Closing CTA */}
                <RevealOnScroll>
                    <div className="text-center py-12 bg-gradient-nude rounded-2xl border border-theme-border">
                        <h3 className="text-3xl font-serif font-bold text-theme-text mb-8">Ready to create something beautiful?</h3>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-theme-highlight text-white font-bold uppercase tracking-widest rounded-full hover:bg-theme-accent transition-all duration-300 shadow-lg">
                                View Portfolio
                            </button>
                            <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 border-2 border-theme-highlight text-theme-highlight font-bold uppercase tracking-widest rounded-full hover:bg-theme-highlight hover:text-white transition-all duration-300">
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
