import React, { useState } from 'react';

const KalpanaPortfolio = () => {
    const services = [
        { title: 'Bridal Makeup', desc: 'Timeless elegance for your special day.' },
        { title: 'Editorial & Fashion', desc: 'Avant-garde looks for high-fashion shoots.' },
        { title: 'HD Photoshoot', desc: 'Flawless finishes for the camera lens.' },
        { title: 'Consultation', desc: 'Personalized beauty advice and trials.' }
    ];

    const galleryItems = [
        { category: 'Editorial', image: 'https://placehold.co/600x800/d4af37/ffffff?text=Editorial', title: 'Vogue Inspired' },
        { category: 'Bridal', image: 'https://placehold.co/600x800/d4af37/ffffff?text=Bridal', title: 'Royal Heritage' },
        { category: 'Avant-Garde', image: 'https://placehold.co/600x800/d4af37/ffffff?text=Avant-Garde', title: 'Neon Dreams' },
        { category: 'Beauty', image: 'https://placehold.co/600x800/d4af37/ffffff?text=Beauty', title: 'Natural Glow' }
    ];

    const scrollTo = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="portfolio-container font-sans overflow-x-hidden selection:bg-teal selection:text-white">
            {/* Floating Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center transition-all duration-300 bg-cream-transparent backdrop-blur-sm">
                <div
                    className="text-2xl font-bold tracking-tighter uppercase cursor-pointer text-text-primary font-serif"
                    onClick={() => scrollTo('hero')}
                >
                    Kalpana
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase text-text-primary">
                    <button onClick={() => scrollTo('about')} className="hover:text-accent transition-colors">About</button>
                    <button onClick={() => scrollTo('gallery')} className="hover:text-accent transition-colors">Portfolio</button>
                    <button onClick={() => scrollTo('services')} className="hover:text-accent transition-colors">Services</button>
                    <button onClick={() => scrollTo('contact')} className="hover:text-accent transition-colors">Contact</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-cream">
                {/* Soft Background Gradient */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-cream via-cream-dark to-cream opacity-50"></div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 animate-fade-in-up">
                    <h2 className="text-md md:text-xl text-accent font-medium tracking-[0.3em] uppercase mb-4 font-sans">
                        Makeup Designer & Artist
                    </h2>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-6 leading-none text-text-primary font-serif">
                        KALPANA
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-text-secondary tracking-wide max-w-2xl mx-auto italic opacity-0 animate-fade-in-delay-1 font-serif">
                        "Bold. Enigmatic. Magnetic."
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-accent to-transparent opacity-50"></div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="min-h-screen flex items-center py-20 bg-white relative">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-accent/20 translate-x-4 translate-y-4 transition-transform duration-500"></div>
                        <div className="relative w-full aspect-[3/4] bg-cream-dark flex items-center justify-center overflow-hidden">
                            <span className="text-6xl opacity-50 grayscale">👩‍🎨</span>
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold font-serif italic text-text-primary">
                            Metamorphosis <br /> <span className="text-accent not-italic font-sans">Through Art</span>
                        </h2>

                        <p className="text-lg text-text-secondary leading-relaxed font-sans">
                            I am a funny, outgoing, and philosophical soul who believes in living life to the fullest.
                            Born in the millennium year, I blend the vibrancy of youth with the discipline of my BBA education
                            from Manipal University and the artistry honed at Red Fox Academy.
                        </p>

                        <p className="text-lg text-text-secondary leading-relaxed font-sans">
                            Makeup is not just meaningful; it's a transformation. My philosophy is to unveil the enigmatic
                            beauty hidden within every face, creating looks that are as bold and independent as the women I work with.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <span className="px-5 py-2 border border-accent rounded-full text-accent text-sm tracking-wider uppercase font-medium hover:bg-accent hover:text-white transition-colors duration-300">Artist</span>
                            <span className="px-5 py-2 border border-accent rounded-full text-accent text-sm tracking-wider uppercase font-medium hover:bg-accent hover:text-white transition-colors duration-300">Visionary</span>
                            <span className="px-5 py-2 border border-accent rounded-full text-accent text-sm tracking-wider uppercase font-medium hover:bg-accent hover:text-white transition-colors duration-300">Storyteller</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-32 bg-cream">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight text-text-primary font-serif">
                        Selected Works
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {galleryItems.map((item, index) => (
                            <div key={index} className="group relative aspect-[3/4] overflow-hidden bg-white shadow-sm cursor-pointer hover:shadow-xl transition-shadow duration-300">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                ) : (
                                    /* Image Placeholder */
                                    <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300 group-hover:scale-105 transition-transform duration-700 ease-out bg-gray-50">
                                        📷
                                    </div>
                                )}

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center">
                                    <span className="text-accent text-xs font-bold uppercase tracking-wider mb-3">{item.category}</span>
                                    <h3 className="text-2xl font-serif italic text-text-primary">{item.title}</h3>
                                    <div className="w-8 h-px bg-accent mt-4"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <button className="px-10 py-4 bg-text-primary text-white font-bold uppercase tracking-widest hover:bg-accent transition-colors duration-300 text-sm">
                            View All Projects
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-32 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-4xl font-bold mb-16 text-center text-text-primary font-serif">Services</h2>

                    <div className="divide-y divide-gray-100">
                        {services.map((service, index) => (
                            <div key={index} className="flex flex-col md:flex-row justify-between py-10 group hover:bg-cream transition-colors duration-300 px-6 rounded-lg">
                                <h3 className="text-2xl font-serif text-text-primary group-hover:text-accent transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-text-secondary md:max-w-xs mt-2 md:mt-0 font-light">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact / Footer */}
            <section id="contact" className="min-h-[70vh] flex flex-col justify-between py-20 bg-cream-dark">
                <div className="container mx-auto px-6 text-center flex-grow flex flex-col justify-center">
                    <p className="text-accent tracking-widest uppercase text-sm mb-6 font-medium">Start a Conversation</p>
                    <h2 className="text-5xl md:text-7xl font-serif font-black mb-12 text-text-primary leading-tight">
                        Let's Create<br />Magic Together.
                    </h2>

                    <button className="inline-block px-12 py-5 border-2 border-text-primary rounded-full text-lg text-text-primary hover:bg-text-primary hover:text-white transition-all duration-300 mx-auto uppercase tracking-wider font-medium">
                        Book a Consultation
                    </button>
                </div>

                <div className="container mx-auto px-6 mt-20 flex flex-col md:flex-row justify-between items-center text-sm text-text-secondary border-t border-gray-200 pt-8">
                    <p>&copy; 2025 Kalpana Portfolio.</p>
                    <div className="flex gap-8 mt-4 md:mt-0 uppercase tracking-wider text-xs font-bold">
                        <a href="#" className="hover:text-accent transition-colors">Instagram</a>
                        <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-accent transition-colors">Email</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default KalpanaPortfolio;
