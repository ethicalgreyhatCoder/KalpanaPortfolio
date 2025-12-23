import React, { useState, useEffect } from 'react';
import { useBooking } from '../contexts/BookingContext';
import './Contact.css';

/**
 * CONTACT SECTION
 * 
 * Client-side booking/inquiry with WhatsApp and Email flows.
 * Supports service-based prefill from BookingContext.
 * NO backend, NO API, NO fake success claims.
 */

// Contact Details - Hardcoded as per requirements
const PORTFOLIO_OWNER_EMAIL = 'kalpanavr062@gmail.com';
const PORTFOLIO_OWNER_WHATSAPP = '919310807014';  // Format: country code + number, no + or spaces
const PORTFOLIO_OWNER_NAME = 'Kalpana';

const Contact = () => {
    const { bookingIntent, clearBooking, hasBookingContext } = useBooking();

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    // Contact method: 'whatsapp' | 'email'
    const [contactMethod, setContactMethod] = useState('whatsapp');

    // Validation errors
    const [errors, setErrors] = useState({});

    // Success modal for email flow
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Submitting state
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Auto-populate message when booking context OR contact method changes
     */
    useEffect(() => {
        if (bookingIntent.source === 'booking' && bookingIntent.serviceId) {
            const service = bookingIntent.serviceTitle;

            // Message template as per user requirements
            const defaultMessage = `Hi ${PORTFOLIO_OWNER_NAME}, I'm interested in the ${service} service. I'd love to know more about availability and next steps.`;

            setFormData(prev => ({ ...prev, message: defaultMessage }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookingIntent.serviceId, contactMethod]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleContactMethodChange = (method) => {
        setContactMethod(method);
        // Message format is now consistent, no need to update on method change
    };

    /**
     * Validate form fields
     * Returns true if valid, false otherwise
     */
    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        // Phone is optional - no validation needed

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Generate WhatsApp URL with message format:
     * Hi Kalpana,
     * My name is [Name].
     * I'm interested in the [Service Name] service.
     * 
     * Message:
     * [User Message]
     * 
     * Email: [Email]
     * Phone: [Phone if provided]
     */
    const generateWhatsAppURL = () => {
        const serviceName = bookingIntent.serviceTitle || 'General Inquiry';

        const text = `Hi ${PORTFOLIO_OWNER_NAME},

My name is ${formData.name}.
I'm interested in the ${serviceName} service.

Message:
${formData.message}

Email: ${formData.email}${formData.phone ? `
Phone: ${formData.phone}` : ''}`;

        return `https://wa.me/${PORTFOLIO_OWNER_WHATSAPP}?text=${encodeURIComponent(text)}`;
    };

    /**
     * Generate Email mailto link
     */
    const generateMailtoLink = () => {
        const serviceName = bookingIntent.serviceTitle || 'General';
        const subject = `New Service Inquiry – ${serviceName}`;

        const body = `Name: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}\n` : ''}Service: ${serviceName}

${formData.message}`;

        return `mailto:${PORTFOLIO_OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    /**
     * Reset form to initial state
     */
    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
        setErrors({});
        clearBooking();
    };

    /**
     * Handle form submission
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        if (contactMethod === 'whatsapp') {
            // WhatsApp Flow
            const whatsappURL = generateWhatsAppURL();

            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');

            // Reset form after a brief delay
            setTimeout(() => {
                resetForm();
                setIsSubmitting(false);
            }, 500);

        } else {
            // Email Flow
            const mailtoLink = generateMailtoLink();

            // Trigger email client
            window.location.href = mailtoLink;

            // Show success modal
            setTimeout(() => {
                setShowSuccessModal(true);
                setIsSubmitting(false);
            }, 300);
        }
    };

    /**
     * Close success modal and reset form
     */
    const closeSuccessModal = () => {
        setShowSuccessModal(false);
        resetForm();
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">
                {/* Section Title */}
                <div className="contact-header">
                    <p className="contact-label">Start a Conversation</p>
                    <h2 className="contact-title">Let's Create Magic Together</h2>
                    <p className="contact-subtitle">
                        Whether you're planning your dream wedding or need professional makeup for a special event,
                        I'm here to bring your vision to life.
                    </p>

                    {/* Compact Icon Row for Contact Info */}
                    <div className="contact-icons">
                        <a
                            href="mailto:kalpana@example.com"
                            className="contact-icon-link"
                            aria-label="Email"
                            title="Email: kalpana@example.com"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                <path d="M22 7l-10 7L2 7"></path>
                            </svg>
                        </a>

                        <a
                            href="tel:+919876543210"
                            className="contact-icon-link"
                            aria-label="Phone"
                            title="Phone: +91 98765 43210"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                            </svg>
                        </a>

                        <a
                            href="https://instagram.com/kalpana"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-icon-link"
                            aria-label="Instagram"
                            title="Instagram: @kalpana_makeup"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>

                        <a
                            href="https://linkedin.com/in/kalpana"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-icon-link"
                            aria-label="LinkedIn"
                            title="LinkedIn: Kalpana Makeup Artist"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="contact-content">
                    {/* Inquiry Form - Now the main focus */}
                    <div className="contact-form-wrapper">
                        {/* Booking Summary (if context exists) */}
                        {hasBookingContext() && (
                            <div className="booking-summary">
                                <div className="booking-summary-header">
                                    <h4 className="booking-summary-title">Booking Details</h4>
                                    <button
                                        onClick={clearBooking}
                                        className="booking-summary-clear"
                                        aria-label="Clear booking details"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
                                <div className="booking-summary-content">
                                    <div className="booking-summary-item">
                                        <span className="booking-summary-label">Service:</span>
                                        <span className="booking-summary-value">{bookingIntent.serviceTitle}</span>
                                    </div>
                                    {bookingIntent.packageLabel && (
                                        <div className="booking-summary-item">
                                            <span className="booking-summary-label">Package:</span>
                                            <span className="booking-summary-value">{bookingIntent.packageLabel}</span>
                                        </div>
                                    )}
                                    {bookingIntent.packagePrice && (
                                        <div className="booking-summary-item">
                                            <span className="booking-summary-label">Price:</span>
                                            <span className="booking-summary-value">{bookingIntent.packagePrice}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="contact-form">
                            {/* Contact Method Selection */}
                            <div className="form-group">
                                <label className="form-label">How would you like to connect? *</label>
                                <div className="contact-method-selector">
                                    <button
                                        type="button"
                                        className={`contact-method-option ${contactMethod === 'whatsapp' ? 'active' : ''}`}
                                        onClick={() => handleContactMethodChange('whatsapp')}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        <span>Connect via WhatsApp</span>
                                    </button>
                                    <button
                                        type="button"
                                        className={`contact-method-option ${contactMethod === 'email' ? 'active' : ''}`}
                                        onClick={() => handleContactMethodChange('email')}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                            <path d="M22 7l-10 7L2 7"></path>
                                        </svg>
                                        <span>Connect via Email</span>
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`form-input ${errors.name ? 'error' : ''}`}
                                />
                                {errors.name && <span className="form-error">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                />
                                {errors.email && <span className="form-error">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                                    rows="5"
                                ></textarea>
                                {errors.message && <span className="form-error">{errors.message}</span>}
                            </div>

                            <button
                                type="submit"
                                className="form-submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Processing...' : (hasBookingContext() ? 'Send Booking Request' : 'Send Inquiry')}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="contact-footer">
                    <p>&copy; 2025 Kalpana Portfolio. All rights reserved.</p>
                </div>
            </div>

            {/* Success Modal (Email Flow Only) */}
            {showSuccessModal && (
                <div className="success-modal-overlay" onClick={closeSuccessModal}>
                    <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="success-modal-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h3 className="success-modal-title">Thank You!</h3>
                        <p className="success-modal-message">
                            Thank you for connecting with me. I'll get back to you as soon as possible.
                        </p>
                        <button className="success-modal-button" onClick={closeSuccessModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Contact;
