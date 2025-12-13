import React from 'react';

const Gallery = () => {
    const galleryItems = [
        { category: 'Editorial', image: 'https://placehold.co/600x800/d4af37/ffffff?text=Editorial', title: 'Vogue Inspired' },
        { category: 'Bridal', image: 'https://placehold.co/600x800/d4af37/ffffff?text=Bridal', title: 'Royal Heritage' },
        { category: 'Avant-Garde', image: 'https://placehold.co/600x800/d4af37/ffffff?text=Avant-Garde', title: 'Neon Dreams' },
        { category: 'Beauty', image: 'https://placehold.co/600x800/d4af37/ffffff?text=Natural Glow' }
    ];

    return (
        <section id="gallery" className="py-32 bg-theme-surface/30">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight text-theme-text font-serif">
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
                                <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300 group-hover:scale-105 transition-transform duration-700 ease-out bg-gray-50">
                                    📷
                                </div>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center">
                                <span className="text-theme-accent text-xs font-bold uppercase tracking-wider mb-3">{item.category}</span>
                                <h3 className="text-2xl font-serif italic text-theme-text">{item.title}</h3>
                                <div className="w-8 h-px bg-theme-accent mt-4"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <button className="px-10 py-4 bg-theme-text text-white font-bold uppercase tracking-widest hover:bg-theme-accent transition-colors duration-300 text-sm">
                        View All Projects
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
