import React, { useEffect, useState, useRef } from 'react';
import './BookingIntentSheet.css';

/**
 * BookingIntentSheet Component
 *
 * A bottom-sheet modal for service inquiry (NO payment logic)
 * Opens when user clicks "Book this service"
 * Allows package selection and proceeds to contact form
 */
const BookingIntentSheet = ({ service, isOpen, onClose, onProceedToContact }) => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const sheetRef = useRef(null);
    const closeButtonRef = useRef(null);

    // Lock body scroll when modal opens
    useEffect(() => {
        if (isOpen) {
            // Store current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';

            // Focus close button for accessibility
            setTimeout(() => {
                if (closeButtonRef.current) {
                    closeButtonRef.current.focus();
                }
            }, 100);
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY) * -1);
            }
        };
    }, [isOpen]);

    // Auto-select first package when service changes
    // Intentionally setting state in effect to auto-select first package on modal open
    useEffect(() => {
        if (isOpen && service?.packages?.length > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedPackage(service.packages[0].id);
        }
    }, [isOpen, service]);

    // Handle Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        // Focus trap
        const handleTabKey = (e) => {
            if (!isOpen || !sheetRef.current) return;

            const focusableElements = sheetRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('keydown', handleTabKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('keydown', handleTabKey);
        };
    }, [isOpen, onClose]);

    const handleProceed = () => {
        const selectedPackageData = service.packages.find(pkg => pkg.id === selectedPackage);

        // Pass selection data to parent
        onProceedToContact({
            serviceId: service.id,
            serviceName: service.title,
            packageId: selectedPackage,
            packageLabel: selectedPackageData?.label || '',
            packagePrice: selectedPackageData?.price || ''
        });

        // Close modal
        onClose();
    };

    if (!isOpen || !service) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="booking-sheet-backdrop"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* Bottom Sheet */}
            <div
                className="booking-sheet"
                role="dialog"
                aria-modal="true"
                aria-labelledby="booking-sheet-title"
                ref={sheetRef}
            >
                {/* Close Button */}
                <button
                    ref={closeButtonRef}
                    className="booking-sheet-close"
                    onClick={onClose}
                    aria-label="Close booking sheet"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* Handle Bar (swipe affordance) */}
                <div className="booking-sheet-handle">
                    <div className="handle-bar"></div>
                </div>

                {/* Scrollable Content */}
                <div className="booking-sheet-content">
                    {/* Service Title */}
                    <h2 id="booking-sheet-title" className="booking-sheet-title">
                        {service.title}
                    </h2>

                    {/* Service Description */}
                    {service.description && (
                        <p className="booking-sheet-description">
                            {service.description}
                        </p>
                    )}

                    {/* Package Selection */}
                    {service.packages && service.packages.length > 0 && (
                        <div className="booking-packages">
                            <h3 className="packages-title">Select Package</h3>

                            <div className="package-options">
                                {service.packages.map((pkg) => (
                                    <label
                                        key={pkg.id}
                                        className={`package-card ${selectedPackage === pkg.id ? 'selected' : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name="package"
                                            value={pkg.id}
                                            checked={selectedPackage === pkg.id}
                                            onChange={() => setSelectedPackage(pkg.id)}
                                            className="package-radio"
                                        />

                                        <div className="package-header">
                                            <span className="package-label">{pkg.label}</span>
                                            <span className="package-price">{pkg.price}</span>
                                        </div>

                                        {pkg.includes && pkg.includes.length > 0 && (
                                            <ul className="package-includes">
                                                {pkg.includes.map((item, index) => (
                                                    <li key={index} className="package-include-item">
                                                        <svg className="checkmark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Disclaimer */}
                    <p className="booking-disclaimer">
                        This is an inquiry form, not a payment. Final pricing will be confirmed during consultation.
                    </p>

                    {/* CTA Button */}
                    <button
                        className="booking-cta"
                        onClick={handleProceed}
                        disabled={!selectedPackage}
                    >
                        Proceed to Contact
                    </button>
                </div>
            </div>
        </>
    );
};

export default BookingIntentSheet;

