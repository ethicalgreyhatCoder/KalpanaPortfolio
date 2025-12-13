import React, { useState } from 'react';
import './Gallery-Instagram.css';

const Gallery = () => {
    // Portfolio items with Instagram-style content (portrait aspect ratios)
    const portfolioItems = [
        {
            id: 1,
            type: 'image',
            category: 'Bridal',
            title: 'Gujarati Bridal Look',
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=625&fit=crop&q=80',
            aspectRatio: '4:5',
            instagramUrl: 'https://instagram.com'
        },
        {
            id: 2,
            type: 'image',
            category: 'Editorial',
            title: 'Editorial Elegance',
            image: 'https://images.unsplash.com/photo-1494883334519-3a2ca2dccb17?w=500&h=625&fit=crop&q=80',
            aspectRatio: '4:5',
            instagramUrl: 'https://instagram.com'
        },
        {
            id: 3,
            type: 'reel',
            category: 'Reels',
            title: 'Makeup Tutorial',
            image: 'https://images.unsplash.com/photo-1532746622601-72c8c540206d?w=500&h=625&fit=crop&q=80',
            aspectRatio: '4:5',
            instagramUrl: 'https://instagram.com'
        },
        {
            id: 4,
            type: 'image',
            category: 'Marathi',
            title: 'Marathi Bride',
            image: 'https://images.unsplash.com/photo-1487412720507-e21cc028cb29?w=500&h=625&fit=crop&q=80',
            aspectRatio: '4:5',
            instagramUrl: 'https://instagram.com'
        },
        {
            id: 5,
            type: 'image',
            category: 'Bridal',
            title: 'Bridal Glow',
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=625&fit=crop&q=80',
            aspectRatio: '4:5',
            instagramUrl: 'https://instagram.com'
        },
        {
            id: 6,
            type: 'reel',
            category: 'Reels',
            title: 'Quick Look Tutorial',
            image: 'https://images.unsplash.com/photo-1532746622601-72c8c540206d?w=500&h=625&fit=crop&q=80',
            aspectRatio: '4:5',
            instagramUrl: 'https://instagram.com'
        },
        {
            id: 7,
            type: 'image',
            category: 'Gujarati',
            title: 'Gujarati Elegance',
            image: 'https://images.unsplash.com/photo-1487412720507-e21cc028cb29?w=500&h=625&fit=crop&q=80',
            aspectRatio: '4:5',
            instagramUrl: 'https://instagram.com'
        },
        {
            id: 8,
            type: 'image',
            category: 'Editorial',
            title: 'High Fashion',
            image: 'https://images.unsplash.com/photo-1494883334519-3a2ca2dccb17?w=500&h=625&fit=crop&q=80',
            aspectRatio: '4:5',
            instagramUrl: 'https://instagram.com'
        }
    ];

    const filters = ['All', 'Bridal', 'Gujarati', 'Marathi', 'Editorial', 'Reels'];
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null);

    // Filter portfolio items
    const filteredItems = activeFilter === 'All'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeFilter);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    const handleInstagramClick = () => {
        if (selectedItem?.instagramUrl) {
            window.open(selectedItem.instagramUrl, '_blank');
        }
    };

    return (
        <section id="gallery" className="instagram-gallery-section">
            <div className="instagram-gallery-container">
                {/* Section Heading */}
                <div className="instagram-gallery-header">
                    <h2 className="instagram-gallery-title">My Portfolio</h2>
                    <div className="instagram-gallery-divider"></div>
                </div>

                {/* Filter Pills */}
                <div className="filter-pills-wrapper">
                    <div className="filter-pills-container">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter)}
                                aria-pressed={activeFilter === filter}
                                aria-label={`Filter by ${filter}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Instagram-style 2-Column Grid */}
                <div className="instagram-grid">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="instagram-grid-item"
                            onClick={() => handleItemClick(item)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleItemClick(item);
                                }
                            }}
                            aria-label={`${item.title}, ${item.category}`}
                        >
                            {/* Image */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="instagram-grid-image"
                                loading="lazy"
                            />

                            {/* Dark Overlay on Tap */}
                            <div className="instagram-grid-overlay"></div>

                            {/* Reel Badge */}
                            {item.type === 'reel' && (
                                <div className="reel-badge">
                                    <span className="reel-icon">▶</span>
                                    <span className="reel-text">Reel</span>
                                </div>
                            )}

                            {/* Play Icon for Reels */}
                            {item.type === 'reel' && (
                                <div className="play-icon-overlay">
                                    <div className="play-icon">▶</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA Button - See More on Instagram */}
                <div className="instagram-cta-container">
                    <button
                        className="instagram-cta-button"
                        onClick={() => window.open('https://instagram.com', '_blank')}
                        aria-label="See more on Instagram"
                    >
                        <span className="instagram-icon">📷</span>
                        See more on Instagram
                    </button>
                </div>
            </div>

            {/* Modal Lightbox */}
            {selectedItem && (
                <div className="modal-lightbox" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <button
                            className="modal-close"
                            onClick={closeModal}
                            aria-label="Close modal"
                        >
                            ✕
                        </button>

                        {/* Modal Image/Video */}
                        <div className="modal-media-container">
                            {selectedItem.type === 'reel' ? (
                                <div className="modal-reel-placeholder">
                                    <img
                                        src={selectedItem.image}
                                        alt={selectedItem.title}
                                        className="modal-image"
                                    />
                                    <div className="modal-play-icon">▶</div>
                                </div>
                            ) : (
                                <img
                                    src={selectedItem.image}
                                    alt={selectedItem.title}
                                    className="modal-image"
                                />
                            )}
                        </div>

                        {/* Modal Content */}
                        <div className="modal-info">
                            <div>
                                <h3 className="modal-title">{selectedItem.title}</h3>
                                <p className="modal-category">{selectedItem.category}</p>
                            </div>
                            <button
                                className="modal-instagram-link"
                                onClick={handleInstagramClick}
                                aria-label="View on Instagram"
                            >
                                <span className="modal-instagram-icon">📷</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;

