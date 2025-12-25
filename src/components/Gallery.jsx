import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    categories,
    regions,
    getFilteredItems,
    getFiltersForCategory
} from '../data/portfolioData';
import BrushStroke from './BrushStroke';
import MediaCarousel from './MediaCarousel';
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

    // Scroll-driven phases state
    const [scrollPhase, setScrollPhase] = useState({
        testimonialOpacity: 1,
        headerOpacity: 1,
        productsOpacity: 0,
        caseStudyOpacity: 0
    });

    // Refs for scroll containers and category buttons
    const categoryScrollContainerRef = useRef(null);
    const filterScrollContainerRef = useRef(null);
    const categoryButtonsRef = useRef({});
    const regionButtonRef = useRef(null);
    const modalScrollRef = useRef(null);
    const modalBottomAnchorRef = useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

    // Desktop layout detection for conditional rendering
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    // Get current category config
    categories.find(cat => cat.id === activeCategory);
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



    // Scroll-driven phase transitions
    useEffect(() => {
        const modalElement = modalScrollRef.current;
        if (!modalElement || !selectedItem) return;

        const handleModalScroll = () => {
            const scrollTop = modalElement.scrollTop;
            const imageHeight = window.innerWidth < 768 ? window.innerHeight * 0.5 : 450;

            // Phase breakpoints
            const phase1End = imageHeight * 0.3;  // 30% of image height
            const phase2End = imageHeight * 0.6;  // 60% of image height
            const phase3End = imageHeight * 0.9;  // 90% of image height

            // Calculate smooth opacity transitions
            const testimonialOpacity = Math.max(0, Math.min(1, 1 - (scrollTop / phase1End)));
            const headerOpacity = Math.max(0, Math.min(1, 1 - ((scrollTop - phase1End) / (phase2End - phase1End))));
            const productsOpacity = Math.max(0, Math.min(1, (scrollTop - phase1End) / (phase2End - phase1End)));
            const caseStudyOpacity = Math.max(0, Math.min(1, (scrollTop - phase2End) / (phase3End - phase2End)));

            setScrollPhase({
                testimonialOpacity,
                headerOpacity,
                productsOpacity,
                caseStudyOpacity
            });
        };

        modalElement.addEventListener('scroll', handleModalScroll, { passive: true });
        return () => modalElement.removeEventListener('scroll', handleModalScroll);
    }, [selectedItem]);

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
        // CRITICAL FIX: Save scroll position before opening modal
        const scrollY = window.scrollY;

        setSelectedItem(item);
        setIsCaseStudyOpen(false);
        setScrollPhase({
            testimonialOpacity: 1,
            headerOpacity: 1,
            productsOpacity: 0,
            caseStudyOpacity: 0
        });
        document.body.classList.add('modal-open');

        // Restore scroll position after brief delay to prevent page jump
        requestAnimationFrame(() => {
            window.scrollTo(0, scrollY);
        });
    };

    // Handle case study close
    const handleCloseCaseStudy = () => {
        setIsCaseStudyOpen(false);
    };

    // Handle modal close
    const handleCloseModal = () => {
        setSelectedItem(null);
        setIsCaseStudyOpen(false);
        setScrollPhase({
            testimonialOpacity: 1,
            headerOpacity: 1,
            productsOpacity: 0,
            caseStudyOpacity: 0
        });
        document.body.classList.remove('modal-open');
    };

    // Handle scroll to bottom on arrow click
    const handleScrollToBottom = () => {
        if (modalBottomAnchorRef.current && modalScrollRef.current) {
            modalBottomAnchorRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
            });
        }
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

                {/* Portfolio Grid - Scrollable Container with Fixed Height */}
                <div className="portfolio-grid-scroll-container">
                    <div className="portfolio-grid">
                        {displayData.length > 0 ? (
                            displayData.map((item) => (
                                <div
                                    key={item.id}
                                    className="portfolio-card"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleItemClick(item);
                                    }}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.stopPropagation();
                                            handleItemClick(item);
                                        }
                                    }}
                                >
                                    {/* Card Image */}
                                    <div className="card-image-container">
                                        <img
                                            src={item.thumbnail || (item.media && item.media[0]?.src) || item.thumbnailImage || item.image}
                                            alt={item.title}
                                            className="card-image"
                                            loading="eager"
                                            fetchPriority="high"
                                        />
                                        {/* Multi-stop gradient overlay */}
                                        <div className="card-gradient-overlay"></div>
                                        {/* Blur overlay - only in text area */}
                                        <div className="card-blur-overlay"></div>
                                        {/* Card Content with Enhanced Typography */}
                                        <div className="portfolio-card-content">
                                            {/* Optional Category Badge */}
                                            <span className="portfolio-category-badge">{item.category}</span>
                                            <h3 className="portfolio-card-title">{item.title}</h3>
                                            <p className="portfolio-card-meta">{renderMetadata(item)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">
                                <p>No items found for this selection.</p>
                            </div>
                        )}
                    </div>
                    {/* Bottom Fade Cue */}
                    <div className="grid-bottom-fade" aria-hidden="true"></div>
                </div>
            </div>

            {/* Netflix-Style Modal */}
            {selectedItem && (
                <div
                    className="modal-overlay"
                    onClick={handleCloseModal}
                >
                    <div
                        className="portfolio-modal-netflix"
                        onClick={e => e.stopPropagation()}
                        ref={modalScrollRef}
                    >
                        {/* Hero Media Section with MediaCarousel */}
                        <div className="modal-hero-image-container">
                            {/* Multi-Media Carousel */}
                            {selectedItem.media && selectedItem.media.length > 0 ? (
                                <MediaCarousel
                                    media={selectedItem.media}
                                    className={isCaseStudyOpen && !isDesktop ? 'blurred' : ''}
                                />
                            ) : (
                                /* Fallback to legacy single image */
                                <img
                                    src={selectedItem.image}
                                    alt={selectedItem.title}
                                    className={`modal-hero-image ${isCaseStudyOpen && !isDesktop ? 'blurred' : ''}`}
                                />
                            )}

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

                            {/* LAYER 1: Gradient + Blur (Background Effect Only - NO TEXT) */}
                            {/* Desktop: Always show. Mobile: Hide when case study open */}
                            {(!isCaseStudyOpen || isDesktop) && selectedItem.testimonial && (
                                <div className="testimonial-blur-layer" aria-hidden="true"></div>
                            )}

                            {/* LAYER 2: Text Content (Foreground - NO BLUR) */}
                            {/* Desktop: Always show. Mobile: Hide when case study open */}
                            {(!isCaseStudyOpen || isDesktop) && selectedItem.testimonial && (
                                <div
                                    className="testimonial-text-layer"
                                    style={{
                                        opacity: isDesktop ? 1 : scrollPhase.testimonialOpacity,
                                        pointerEvents: isDesktop || scrollPhase.testimonialOpacity < 0.1 ? 'none' : 'auto'
                                    }}
                                >
                                    <svg className="quote-mark" width="32" height="32" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" fill="currentColor" opacity="0.5" />
                                    </svg>
                                    <p className="quote-text">{selectedItem.testimonial.text}</p>
                                    <span className="quote-author">— {selectedItem.testimonial.author}</span>
                                </div>
                            )}
                        </div>

                        {/* Floating Instagram Icon at intersection */}
                        {selectedItem.modelInstagram && (
                            <a
                                href={selectedItem.modelInstagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="floating-instagram-icon"
                                aria-label={`Follow ${selectedItem.modelName} on Instagram`}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        )}

                        {/* Content Details Section */}
                        <div className="modal-content-netflix">
                            {/* Consolidated Metadata Header - STABLE (no fade) */}
                            <div className="metadata-header-netflix">
                                <span className="category-badge">{selectedItem.category}</span>
                                <h2 className="look-title-netflix">{selectedItem.title}</h2>
                                {selectedItem.modelName && (
                                    <div className="model-info-netflix">
                                        <span className="model-name-text">Model: {selectedItem.modelName}</span>
                                    </div>
                                )}
                            </div>

                            {/* Collapsible Products Section - fades in on scroll */}
                            {selectedItem.productsUsed && selectedItem.productsUsed.length > 0 && (
                                <details
                                    className="products-accordion-netflix"
                                    style={{
                                        opacity: scrollPhase.productsOpacity,
                                        transform: `translateY(${(1 - scrollPhase.productsOpacity) * 20}px)`
                                    }}
                                >
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

                            {/* Conditional Rendering: Color Palette (Makeup/Eyes) OR Tools Used (Hair/Nails) */}

                            {/* Color Palette - FOR Makeup AND Eyes */}
                            {(activeCategory === 'makeup' || activeCategory === 'eyes') && (selectedItem.colorPalette || selectedItem.colorScheme) && (
                                <div
                                    className="color-palette-netflix"
                                    style={{
                                        opacity: scrollPhase.productsOpacity,
                                        transform: `translateY(${(1 - scrollPhase.productsOpacity) * 20}px)`
                                    }}
                                >
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

                            {/* Tools Used - ONLY for Hair and Nails (NOT Eyes) */}
                            {(activeCategory === 'hair' || activeCategory === 'nails') && selectedItem.toolsUsed && selectedItem.toolsUsed.length > 0 && (
                                <div
                                    className="tools-used-netflix"
                                    style={{
                                        opacity: scrollPhase.productsOpacity,
                                        transform: `translateY(${(1 - scrollPhase.productsOpacity) * 20}px)`
                                    }}
                                >
                                    <span className="section-title-netflix">Tools Used</span>
                                    <div className="tools-grid">
                                        {selectedItem.toolsUsed.map((tool, idx) => (
                                            <div key={idx} className="tool-item-card">
                                                <div className="tool-icon-container">
                                                    {tool.icon ? (
                                                        <img
                                                            src={tool.icon}
                                                            alt={tool.name}
                                                            className="tool-icon"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextSibling.style.display = 'block';
                                                            }}
                                                        />
                                                    ) : null}
                                                    <svg
                                                        className="tool-icon-placeholder"
                                                        style={{ display: tool.icon ? 'none' : 'block' }}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <path d="M12 8v8M8 12h8"></path>
                                                    </svg>
                                                </div>
                                                <span className="tool-name">{tool.name}</span>
                                                {tool.brand && <span className="tool-brand">{tool.brand}</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Footer Surface with CTA and End Marker */}
                            <div className="modal-footer-surface">
                                {/* Tertiary Case Study CTA - Desktop: Toggle inline, Mobile: Open bottom sheet */}
                                {selectedItem.caseStudy && (
                                    <button
                                        className="case-study-cta-tertiary"
                                        onClick={() => {
                                            if (isDesktop) {
                                                // Desktop: Toggle inline content
                                                setIsCaseStudyOpen(!isCaseStudyOpen);
                                            } else {
                                                // Mobile: Open bottom sheet
                                                setIsCaseStudyOpen(true);
                                            }
                                        }}
                                        style={{
                                            opacity: isDesktop ? 1 : scrollPhase.caseStudyOpacity,
                                            transform: isDesktop ? 'none' : `translateY(${(1 - scrollPhase.caseStudyOpacity) * 20}px)`
                                        }}
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            style={{
                                                transform: isDesktop && isCaseStudyOpen ? 'rotate(180deg)' : 'none',
                                                transition: 'transform 0.25s ease'
                                            }}
                                        >
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 16v-4M12 8h.01"></path>
                                        </svg>
                                        {isDesktop && isCaseStudyOpen ? 'Close Case Study' : 'View Case Study'}
                                    </button>
                                )}

                                {/* Desktop Inline Case Study Content */}
                                {isDesktop && isCaseStudyOpen && selectedItem.caseStudy && (
                                    <div className="inline-case-study-content">
                                        <h3>{selectedItem.caseStudy.title}</h3>
                                        <p>{selectedItem.caseStudy.content}</p>
                                        {selectedItem.skinType && (
                                            <p><strong>Skin Type:</strong> {selectedItem.skinType}</p>
                                        )}
                                        {selectedItem.occasion && (
                                            <p><strong>Occasion:</strong> {selectedItem.occasion}</p>
                                        )}
                                    </div>
                                )}

                                {/* Visual End Marker */}
                                <div className="modal-end-marker">
                                    <div className="end-marker-line"></div>
                                    <svg className="end-marker-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="1"></circle>
                                    </svg>
                                    <div className="end-marker-line"></div>
                                </div>
                            </div>

                            {/* Bottom Anchor for Smooth Scroll */}
                            <div ref={modalBottomAnchorRef} style={{ height: '1px', visibility: 'hidden' }}></div>
                        </div>

                    </div>
                </div>
            )
            }

            {/* Case Study Backdrop Overlay - Outside modal for proper z-index */}
            {
                selectedItem && isCaseStudyOpen && (
                    <div
                        className="case-study-backdrop"
                        onClick={handleCloseCaseStudy}
                    />
                )
            }

            {/* Bottom Sheet Case Study Modal - Outside modal for proper position:fixed */}
            {
                selectedItem && (
                    <div
                        className={`case-study-bottom-sheet ${isCaseStudyOpen ? 'open' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
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
                )
            }

            {/* Region Dropdown Portal - Renders outside scroll container */}
            {
                isRegionDropdownOpen && activeCategory === 'makeup' && ReactDOM.createPortal(
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
                )
            }
        </section >
    );
};

export default Gallery;

