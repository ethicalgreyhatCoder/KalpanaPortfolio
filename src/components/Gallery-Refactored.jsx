import React, { useState, useRef } from 'react';
import { portfolioCategories, getItemsByCategory } from '../data/portfolioData';
import './Gallery-Refactored.css';

const Gallery = () => {
    // State management
    const [activeCategory, setActiveCategory] = useState('makeup');
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null);

    // Refs for scroll containers
    const categoryScrollRef = useRef(null);
    const filterScrollRef = useRef(null);

    // Get current category config
    const currentCategory = portfolioCategories.find(cat => cat.id === activeCategory);
    const items = getItemsByCategory(activeCategory, activeFilter);

    // Handle category change - reset filter to 'All'
    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
        setActiveFilter('All');
    };

    // Handle filter change
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    // Handle item click - open modal
    const handleItemClick = (item) => {
        setSelectedItem(item);
        document.body.classList.add('modal-open');
    };

    // Close modal
    const closeModal = () => {
        setSelectedItem(null);
        document.body.classList.remove('modal-open');
    };

    // Handle Instagram link
    const handleInstagramClick = () => {
        if (selectedItem?.instagramUrl) {
            window.open(selectedItem.instagramUrl, '_blank');
        }
    };

    // Render category-specific metadata
    const renderMetadata = (item) => {
        const category = activeCategory;

        if (category === 'makeup') {
            return (
                <>
                    <span className="meta-item">{item.skinType}</span>
                    <span className="meta-divider">·</span>
                    <span className="meta-item">{item.occasion}</span>
                </>
            );
        }

        if (category === 'hair') {
            return (
                <>
                    <span className="meta-item">{item.hairType}</span>
                    <span className="meta-divider">·</span>
                    <span className="meta-item">{item.length}</span>
                </>
            );
        }

        if (category === 'nails') {
            return (
                <>
                    <span className="meta-item">{item.nailShape}</span>
                    <span className="meta-divider">·</span>
                    <span className="meta-item">{item.nailLength}</span>
                </>
            );
        }

        if (category === 'eyes') {
            return (
                <>
                    <span className="meta-item">{item.eyeShape}</span>
                    <span className="meta-divider">·</span>
                    <span className="meta-item">{item.technique}</span>
                </>
            );
        }

        return null;
    };

    return (
        <section id="gallery" className="portfolio-section">
            <div className="portfolio-container">
                {/* Section Header */}
                <div className="portfolio-header">
                    <h2 className="portfolio-title">My Portfolio</h2>
                    <div className="portfolio-divider"></div>
                </div>

                {/* Category Navigation - Horizontally Scrollable */}
                <div className="category-nav-wrapper">
                    <div
                        className="category-nav-scroll"
                        ref={categoryScrollRef}
                    >
                        <div className="category-nav-content">
                            {portfolioCategories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                                    onClick={() => handleCategoryChange(category.id)}
                                    aria-pressed={activeCategory === category.id}
                                >
                                    <span className="category-icon">{category.icon}</span>
                                    <span className="category-label">{category.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="category-fade-left"></div>
                    <div className="category-fade-right"></div>
                </div>

                {/* Sub-Filter Navigation - Horizontally Scrollable */}
                <div className="filter-nav-wrapper">
                    <div
                        className="filter-nav-scroll"
                        ref={filterScrollRef}
                    >
                        <div className="filter-nav-content">
                            {currentCategory?.filters.map((filter) => (
                                <button
                                    key={filter}
                                    className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                                    onClick={() => handleFilterChange(filter)}
                                    aria-pressed={activeFilter === filter}
                                >
                                    <span className="filter-label">{filter}</span>
                                    {activeFilter === filter && (
                                        <span className="filter-underline"></span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Portfolio Grid - Full-Width Cards */}
                <div className="portfolio-grid">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="portfolio-card"
                            onClick={() => handleItemClick(item)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleItemClick(item);
                                }
                            }}
                        >
                            {/* Card Image */}
                            <div className="card-image-wrapper">
                                <img
                                    src={item.thumbnailImage || item.image}
                                    alt={item.title}
                                    className="card-image"
                                    loading="lazy"
                                />
                                <div className="card-overlay"></div>
                            </div>

                            {/* Card Content */}
                            <div className="card-content">
                                <h3 className="card-title">{item.title}</h3>
                                <div className="card-meta">
                                    {renderMetadata(item)}
                                </div>

                                {/* Tertiary CTA */}
                                <div className="card-actions">
                                    <button
                                        className="card-cta-tertiary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleItemClick(item);
                                        }}
                                    >
                                        View Case Study
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Instagram CTA */}
                <div className="portfolio-cta-container">
                    <button
                        className="portfolio-cta-button"
                        onClick={() => window.open('https://instagram.com', '_blank')}
                        aria-label="See more on Instagram"
                    >
                        <span className="cta-icon">📷</span>
                        See More on Instagram
                    </button>
                </div>
            </div>

            {/* Bottom-Sheet Case Study Modal */}
            {selectedItem && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <button
                            className="modal-close-btn"
                            onClick={closeModal}
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        {/* Modal Header with Blurred Image */}
                        <div className="modal-header">
                            <div
                                className="modal-header-bg"
                                style={{ backgroundImage: `url(${selectedItem.image})` }}
                            ></div>
                            <div className="modal-header-overlay"></div>
                            <div className="modal-header-content">
                                <h2 className="modal-title">{selectedItem.title}</h2>
                                <p className="modal-subtitle">
                                    {selectedItem.category} · {selectedItem.occasion}
                                </p>
                            </div>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="modal-content">
                            {/* Client Profile */}
                            <div className="modal-section">
                                <h3 className="section-title">Client Profile</h3>
                                <p className="section-text">
                                    {selectedItem.caseStudy.clientProfile}
                                </p>
                            </div>

                            {/* Technique & Approach */}
                            <div className="modal-section">
                                <h3 className="section-title">Technique & Approach</h3>
                                <p className="section-text">
                                    {selectedItem.caseStudy.technique}
                                </p>
                            </div>

                            {/* Decision Rationale */}
                            <div className="modal-section">
                                <h3 className="section-title">Why These Choices?</h3>
                                <p className="section-text">
                                    {selectedItem.caseStudy.decisionRationale}
                                </p>
                            </div>

                            {/* Key Products (Compact) */}
                            {selectedItem.caseStudy.productsUsed && (
                                <div className="modal-section">
                                    <h3 className="section-title">Key Products</h3>
                                    <div className="products-compact">
                                        {selectedItem.caseStudy.productsUsed.slice(0, 3).map((product, idx) => (
                                            <div key={idx} className="product-compact">
                                                <span className="product-brand">{product.brand}</span>
                                                <span className="product-name">{product.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Result */}
                            <div className="modal-section">
                                <h3 className="section-title">Result</h3>
                                <p className="section-text result-highlight">
                                    {selectedItem.caseStudy.result}
                                </p>
                            </div>

                            {/* Instagram CTA */}
                            <button
                                className="modal-instagram-btn"
                                onClick={handleInstagramClick}
                            >
                                <span className="instagram-icon">📷</span>
                                View on Instagram
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;

