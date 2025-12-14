import React, { useEffect, useRef } from 'react';
import './SkillModal.css';

const SkillModal = ({ skill, isOpen, onClose }) => {
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);

    // Lock body scroll when modal is open - preserve scroll position
    useEffect(() => {
        if (isOpen) {
            // Store current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            // Restore the scroll position without triggering scroll event
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
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

    // Focus management and keyboard interactions
    useEffect(() => {
        if (isOpen && closeButtonRef.current) {
            // Focus close button when modal opens
            closeButtonRef.current.focus();
        }

        // Handle Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        // Focus trap
        const handleTabKey = (e) => {
            if (!isOpen || !modalRef.current) return;

            const focusableElements = modalRef.current.querySelectorAll(
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

    if (!isOpen || !skill) return null;

    return (
        <>
            {/* Dark backdrop */}
            <div
                className="skill-modal-backdrop"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* Bottom sheet modal */}
            <div className="skill-modal-sheet" role="dialog" aria-modal="true" ref={modalRef}>
                {/* Close button */}
                <button
                    ref={closeButtonRef}
                    className="skill-modal-close"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* Handle bar for swipe affordance */}
                <div className="skill-modal-handle">
                    <div className="handle-bar"></div>
                </div>

                {/* Scrollable content */}
                <div className="skill-modal-content">
                    {/* Title */}
                    <h3 className="skill-modal-title">{skill.title}</h3>

                    {/* Tagline */}
                    {skill.tagline && (
                        <p className="skill-modal-tagline">{skill.tagline}</p>
                    )}

                    {/* Experience bullets */}
                    {skill.experience && skill.experience.length > 0 && (
                        <div className="skill-modal-section">
                            <h4 className="skill-modal-section-title">Experience</h4>
                            <ul className="skill-modal-list">
                                {skill.experience.map((item, index) => (
                                    <li key={index} className="skill-modal-list-item">
                                        <span className="list-bullet"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Approach */}
                    {skill.approach && (
                        <div className="skill-modal-section">
                            <h4 className="skill-modal-section-title">Approach</h4>
                            <p className="skill-modal-text">{skill.approach}</p>
                        </div>
                    )}

                    {/* Practical application */}
                    {skill.practical && (
                        <div className="skill-modal-section">
                            <h4 className="skill-modal-section-title">In Practice</h4>
                            <p className="skill-modal-text">{skill.practical}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SkillModal;

