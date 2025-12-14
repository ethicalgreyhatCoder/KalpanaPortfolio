import React, { useState, useEffect } from 'react';
import { useBooking } from '../contexts/BookingContext';
import './Contact.css';

/**
 * CONTACT SECTION
 *
 * Single source of truth for all booking and inquiry actions.
 * Reads from BookingContext to auto-populate form when user
 * completes booking flow via BookingIntentSheet.
 */
const Contact = () => {
    const { bookingIntent, clearBooking, hasBookingContext } = useBooking();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Auto-populate message when booking context exists
     * Runs when bookingIntent.serviceId changes (indicates new booking)
     * This intentionally sets state in an effect to auto-fill the contact form
     */
    useEffect(() => {
        if (bookingIntent.source === 'booking' && bookingIntent.serviceId) {
            const service = bookingIntent.serviceTitle;
            const pkg = bookingIntent.packageLabel ? ` (${bookingIntent.packageLabel}` : '';
            const price = bookingIntent.packagePrice ? ` - ${bookingIntent.packagePrice})` : (pkg ? ')' : '');
            const defaultMessage = `I'm interested in ${service}${pkg}${price}. Please contact me to discuss details.`;

            // Intentional setState in effect for form pre-population from booking context
            setFormData(prev => ({ ...prev, message: defaultMessage }));
        }
        // Only trigger when serviceId changes (new booking initiated)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookingIntent.serviceId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission (no backend)
        console.log('Form Data:', formData);
        console.log('Booking Context:', bookingIntent);

        // In a real app, this would send to a backend or email service
        setTimeout(() => {
            alert('Thank you! Your inquiry has been received. We will contact you soon.');

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            });

            // Clear booking context
            clearBooking();
            setIsSubmitting(false);
        }, 1000);
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
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    required
                                />
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
                                    className="form-textarea"
                                    rows="5"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="form-submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : (hasBookingContext() ? 'Send Booking Request' : 'Send Inquiry')}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="contact-footer">
                    <p>&copy; 2025 Kalpana Portfolio. All rights reserved.</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
