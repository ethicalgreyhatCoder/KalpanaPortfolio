import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    categories,
    regions,
    getFilteredItems,
    getFiltersForCategory
} from '../data/portfolioData';
import BrushStroke from './BrushStroke';
import './Portfolio.css';
import './NetflixModal.css';

const Gallery = () => {
    // State management
    const [activeCategory, setActiveCategory] = useState('makeup');
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeRegion, setActiveRegion] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
    const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);

    // Refs for scroll containers and category buttons
    const categoryScrollContainerRef = useRef(null);
    const filterScrollContainerRef = useRef(null);
    const categoryButtonsRef = useRef({});
    const regionButtonRef = useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

    // Get current category config
    const currentCategoryConfig = categories.find(cat => cat.id === activeCategory);
    const currentFilters = getFiltersForCategory(activeCategory);
    const displayData = getFilteredItems(activeCategory, activeFilter, activeRegion);

    // Auto-scroll category into center on mount and when it changes
    useEffect(() => {
        const scrollCategoryIntoCenter = () => {
            const categoryButton = categoryButtonsRef.current[activeCategory];
            if (categoryButton && categoryScrollContainerRef.current) {
                categoryButton.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        };

        // Small delay to ensure DOM is ready
        const timeoutId = setTimeout(scrollCategoryIntoCenter, 100);
        return () => clearTimeout(timeoutId);
    }, [activeCategory]);

    // Close dropdown when clicking outside or scrolling
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isRegionDropdownOpen &&
                regionButtonRef.current &&
                !regionButtonRef.current.contains(event.target) &&
                !event.target.closest('.region-dropdown-menu-inline')) {
                setIsRegionDropdownOpen(false);
            }
        };

        const handleScroll = () => {
            if (isRegionDropdownOpen) {
                setIsRegionDropdownOpen(false);
            }
        };

        if (isRegionDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('scroll', handleScroll, true);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                window.removeEventListener('scroll', handleScroll, true);
            };
        }
    }, [isRegionDropdownOpen]);

    // Handle category change
    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
        setActiveFilter('All');
        setSelectedItem(null);
        setIsCaseStudyOpen(false);
    };

    // Handle filter change
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        // Reset region to 'all' when category filter is selected (they work independently)
        setActiveRegion('all');
    };

    // Handle region dropdown toggle
    const handleRegionDropdownToggle = () => {
        if (!isRegionDropdownOpen && regionButtonRef.current) {
            const rect = regionButtonRef.current.getBoundingClientRect();
            const dropdownWidth = 150; // min-width from CSS

            // Calculate left position, ensuring it doesn't overflow viewport
            let leftPosition = rect.left;

            // If dropdown would overflow right edge, align to right edge of button
            if (leftPosition + dropdownWidth > window.innerWidth - 16) {
                leftPosition = window.innerWidth - dropdownWidth - 16;
            }

            // Ensure minimum left margin
            if (leftPosition < 16) {
                leftPosition = 16;
            }

            setDropdownPosition({
                top: rect.bottom,
                left: leftPosition
            });
        }
        setIsRegionDropdownOpen(!isRegionDropdownOpen);
    };

    // Handle region change
    const handleRegionChange = (regionId) => {
        setActiveRegion(regionId);
        setIsRegionDropdownOpen(false);
        // Reset category filter to 'All' when region is selected (region works independently)
        if (regionId !== 'all') {
            setActiveFilter('All');
        }
    };

    // Handle item click
    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsCaseStudyOpen(false);
        document.body.classList.add('modal-open');
    };

    // Handle case study close
    const handleCloseCaseStudy = () => {
        setIsCaseStudyOpen(false);
    };

    // Handle modal close
    const handleCloseModal = () => {
        setSelectedItem(null);
        setIsCaseStudyOpen(false);
        document.body.classList.remove('modal-open');
    };

    // Get active region label
    const activeRegionLabel = regions.find(r => r.id === activeRegion)?.label || 'All Regions';

    // Render category-specific metadata
    const renderMetadata = (item) => {
        switch (activeCategory) {
            case 'makeup':
                return item.skinType && item.occasion ? `${item.skinType} • ${item.occasion}` : item.category;
            case 'hair':
                return item.hairType && item.length ? `${item.hairType} • ${item.length}` : item.category;
            case 'nails':
                return item.nailShape && item.nailLength ? `${item.nailShape} • ${item.nailLength}` : item.category;
            case 'eyes':
                return item.eyeShape && item.technique ? `${item.eyeShape} • ${item.technique}` : item.category;
            default:
                return item.category;
        }
    };

    // Render modal content based on category
    const renderModalContent = () => {
        if (!selectedItem) return null;

        const header = (
            <div className="modal-header">
                <span className="modal-item-category">
                    {selectedItem.category}
                </span>
                <h2 className="modal-item-title">{selectedItem.title}</h2>
                {selectedItem.modelName && (
                    <div className="modal-model-info">
                        <span className="model-name">Model: {selectedItem.modelName}</span>
                        {selectedItem.modelInstagram && (
                            <a
                                href={selectedItem.modelInstagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="model-instagram-link"
                                aria-label={`Follow ${selectedItem.modelName} on Instagram`}
                            >
                                <svg className="instagram-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                        )}
                    </div>
                )}
            </div>
        );

        // Category-specific sections
        const renderCategorySpecific = () => {
            if (activeCategory === 'hair' && selectedItem.hairType) {
                return (
                    <div className="data-section">
                        <span className="section-label">Hair Details</span>
                        <div className="product-row">
                            <span className="product-name">Hair Type</span>
                            <span className="product-brand">{selectedItem.hairType}</span>
                        </div>
                        <div className="product-row">
                            <span className="product-name">Length</span>
                            <span className="product-brand">{selectedItem.length}</span>
                        </div>
                    </div>
                );
            }

            if (activeCategory === 'nails' && selectedItem.nailShape) {
                return (
                    <div className="data-section">
                        <span className="section-label">Nail Details</span>
                        <div className="product-row">
                            <span className="product-name">Shape</span>
                            <span className="product-brand">{selectedItem.nailShape}</span>
                        </div>
                        <div className="product-row">
                            <span className="product-name">Length</span>
                            <span className="product-brand">{selectedItem.nailLength}</span>
                        </div>
                    </div>
                );
            }

            return null;
        };

        // Products list
        const renderProducts = () => {
            if (!selectedItem.productsUsed || selectedItem.productsUsed.length === 0) return null;
            return (
                <div className="data-section">
                    <span className="section-label">Products Used</span>
                    <div className="products-list">
                        {selectedItem.productsUsed.map((prod, idx) => (
                            <div key={idx} className="product-row">
                                <span className="product-name">{prod.name}</span>
                                <span className="product-brand">{prod.brand}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        // Color palette with brush strokes
        const renderColors = () => {
            const colors = selectedItem.colorPalette || selectedItem.colorScheme;
            const colorNames = selectedItem.colorNames || colors.map((_, i) => `Color ${i + 1}`);

            if (!colors || colors.length === 0) return null;

            // Limit to 5 colors maximum
            const displayColors = colors.slice(0, 5);
            const displayNames = colorNames.slice(0, 5);

            return (
                <div className="data-section color-palette-section">
                    <span className="section-label">Color Palette</span>
                    <div className="brush-strokes-row">
                        {displayColors.map((color, idx) => (
                            <BrushStroke
                                key={idx}
                                color={color}
                                colorName={displayNames[idx]}
                                index={idx}
                            />
                        ))}
                    </div>
                </div>
            );
        };

        return (
            <div className="modal-content-panel">
                <button
                    className="modal-close-btn dark-mode"
                    onClick={handleCloseModal}
                    aria-label="Close"
                >
                    ✕
                </button>

                {header}
                {renderCategorySpecific()}
                {renderProducts()}
                {renderColors()}

                {selectedItem.caseStudy && (
                    <button
                        className="view-case-study-btn"
                        onClick={() => setIsCaseStudyOpen(true)}
                    >
                        View Case Study
                    </button>
                )}
            </div>
        );
    };

    return (
        <section id="gallery" className="portfolio-section">
            <div className="portfolio-wrapper">
                {/* Header */}
                <div className="portfolio-header">
                    <h2 className="portfolio-title">Portfolio</h2>
                </div>

                {/* Category Tabs - Horizontally Scrollable with Center Alignment */}
                <div className="category-tabs-wrapper">
                    <div
                        className="category-tabs-scroll"
                        ref={categoryScrollContainerRef}
                    >
                        <div className="category-tabs-container">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    ref={el => categoryButtonsRef.current[cat.id] = el}
                                    className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => handleCategoryChange(cat.id)}
                                    aria-pressed={activeCategory === cat.id}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sub-Filters and Regional Filter Row */}
                <div className="filters-header">
                    {/* Sub-Filters - Horizontally Scrollable */}
                    <div className="filters-wrapper">
                        <div
                            className="filters-scroll"
                            ref={filterScrollContainerRef}
                        >
                            <div className="filters-container">
                                {currentFilters.map(filter => (
                                    <button
                                        key={filter}
                                        className={`filter-tab ${activeFilter === filter && activeRegion === 'all' ? 'active' : ''} ${activeRegion !== 'all' ? 'inactive' : ''}`}
                                        onClick={() => handleFilterChange(filter)}
                                        aria-pressed={activeFilter === filter && activeRegion === 'all'}
                                    >
                                        <span className="filter-text">{filter}</span>
                                        {activeFilter === filter && activeRegion === 'all' && (
                                            <span className="filter-underline"></span>
                                        )}
                                    </button>
                                ))}

                                {/* Region Filter - Only for Makeup Section */}
                                {activeCategory === 'makeup' && (
                                    <div className="region-filter-inline">
                                        <button
                                            ref={regionButtonRef}
                                            className={`region-filter-btn ${activeRegion !== 'all' ? 'active' : ''}`}
                                            onClick={handleRegionDropdownToggle}
                                            aria-expanded={isRegionDropdownOpen}
                                        >
                                            <span className="region-text">
                                                {activeRegion === 'all' ? 'Region' : regions.find(r => r.id === activeRegion)?.label}
                                            </span>
                                            <span className={`dropdown-icon ${isRegionDropdownOpen ? 'open' : ''}`}>
                                                ▼
                                            </span>
                                        </button>
                                        {activeRegion !== 'all' && (
                                            <span className="filter-underline"></span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Portfolio Grid - 2 Columns Mobile */}
                <div className="portfolio-grid">
                    {displayData.length > 0 ? (
                        displayData.map((item) => (
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
                                <div className="card-image-container">
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
                                    <p className="card-meta">{renderMetadata(item)}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No items found for this selection.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Netflix-Style Modal */}
            {selectedItem && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="portfolio-modal-netflix" onClick={e => e.stopPropagation()}>
                        {/* Hero Image Section with Netflix Fade */}
                        <div className="modal-hero-image-container">
                            <img
                                src={selectedItem.image}
                                alt={selectedItem.title}
                                className={`modal-hero-image ${isCaseStudyOpen ? 'blurred' : ''}`}
                            />

                            {/* Netflix-style gradient fade to content */}
                            <div className="hero-gradient-fade"></div>

                            {/* Close Button */}
                            <button
                                className="modal-close-btn-netflix"
                                onClick={handleCloseModal}
                                aria-label="Close"
                            >
                                ✕
                            </button>

                            {/* Testimonial Caption Overlay - inside image container */}
                            {!isCaseStudyOpen && selectedItem.testimonial && (
                                <div className="testimonial-quote-netflix">
                                    <svg className="quote-mark" width="32" height="32" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" fill="currentColor" opacity="0.5"/>
                                    </svg>
                                    <p className="quote-text">{selectedItem.testimonial.text}</p>
                                    <span className="quote-author">— {selectedItem.testimonial.author}</span>
                                </div>
                            )}
                        </div>

                        {/* Content Details Section */}
                        <div className="modal-content-netflix">
                            {/* Consolidated Metadata Header */}
                            <div className="metadata-header-netflix">
                                <span className="category-badge">{selectedItem.category}</span>
                                <h2 className="look-title-netflix">{selectedItem.title}</h2>
                                {selectedItem.modelName && (
                                    <div className="model-info-netflix">
                                        <span className="model-name-text">Model: {selectedItem.modelName}</span>
                                        {selectedItem.modelInstagram && (
                                            <a
                                                href={selectedItem.modelInstagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="model-instagram-link-netflix"
                                                aria-label={`Follow ${selectedItem.modelName} on Instagram`}
                                            >
                                                <svg className="instagram-icon-netflix" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Collapsible Products Section */}
                            {selectedItem.productsUsed && selectedItem.productsUsed.length > 0 && (
                                <details className="products-accordion-netflix">
                                    <summary className="accordion-header">
                                        <span className="section-title-netflix">Products Used</span>
                                        <svg className="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </summary>
                                    <div className="products-list-netflix">
                                        {selectedItem.productsUsed.map((prod, idx) => (
                                            <div key={idx} className="product-item-netflix">
                                                <span className="product-name-netflix">{prod.name}</span>
                                                <span className="product-brand-netflix">{prod.brand}</span>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            )}

                            {/* Brush Stroke Color Palette */}
                            {(selectedItem.colorPalette || selectedItem.colorScheme) && (
                                <div className="color-palette-netflix">
                                    <span className="section-title-netflix">Color Palette</span>
                                    <div className="brush-strokes-container">
                                        {(selectedItem.colorPalette || selectedItem.colorScheme).slice(0, 5).map((color, idx) => {
                                            const colorName = selectedItem.colorNames?.[idx] || `Color ${idx + 1}`;
                                            return (
                                                <BrushStroke
                                                    key={idx}
                                                    color={color}
                                                    colorName={colorName}
                                                    index={idx}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Tertiary Case Study CTA */}
                            {selectedItem.caseStudy && (
                                <button
                                    className="case-study-cta-tertiary"
                                    onClick={() => setIsCaseStudyOpen(true)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M12 16v-4M12 8h.01"></path>
                                    </svg>
                                    View Case Study
                                </button>
                            )}
                        </div>

                        {/* Case Study Backdrop Overlay */}
                        {isCaseStudyOpen && (
                            <div
                                className="case-study-backdrop"
                                onClick={handleCloseCaseStudy}
                            />
                        )}

                        {/* Bottom Sheet Case Study Modal */}
                        <div
                            className={`case-study-bottom-sheet ${isCaseStudyOpen ? 'open' : ''}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="sheet-handle-bar" onClick={handleCloseCaseStudy}></div>
                            <div className="sheet-scrollable-content">
                                {selectedItem.caseStudy && (
                                    <>
                                        <h3 className="case-study-heading">{selectedItem.caseStudy.title}</h3>
                                        <div className="case-study-body">
                                            <p className="case-study-text-netflix">{selectedItem.caseStudy.content}</p>
                                            {selectedItem.skinType && (
                                                <div className="case-study-detail">
                                                    <strong>Skin Type:</strong> {selectedItem.skinType}
                                                </div>
                                            )}
                                            {selectedItem.occasion && (
                                                <div className="case-study-detail">
                                                    <strong>Occasion:</strong> {selectedItem.occasion}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                                <button
                                    className="sheet-close-button"
                                    onClick={handleCloseCaseStudy}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Region Dropdown Portal - Renders outside scroll container */}
            {isRegionDropdownOpen && activeCategory === 'makeup' && ReactDOM.createPortal(
                <div
                    className="region-dropdown-portal"
                    style={{
                        position: 'fixed',
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                        zIndex: 9999,
                        maxWidth: 'calc(100vw - 2rem)',
                        right: 'auto'
                    }}
                >
                    <div className="region-dropdown-menu-inline">
                        {regions.map(region => (
                            <button
                                key={region.id}
                                className={`region-option ${activeRegion === region.id ? 'active' : ''}`}
                                onClick={() => handleRegionChange(region.id)}
                            >
                                {region.label}
                            </button>
                        ))}
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
};

export default Gallery;

