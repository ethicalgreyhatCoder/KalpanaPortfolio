import React, { useState } from 'react';
import { servicesData, pricingNote } from '../data/servicesData';
import { useBooking } from '../contexts/BookingContext';
import './Services.css';

/**
 * SERVICES COMPONENT
 *
 * Displays service accordion with pricing and booking
 * NO MODALS - Direct scroll to Contact section
 * Uses BookingContext to pass service selection to Contact form
 */
const Services = () => {
    const [openServiceId, setOpenServiceId] = useState(null);

    // Access booking context to pass data to Contact section
    const { setBooking } = useBooking();

    /**
     * Toggle accordion open/closed
     * Does NOT lock scroll or create modals
     */
    const toggleService = (serviceId) => {
        setOpenServiceId(openServiceId === serviceId ? null : serviceId);
    };

    /**
     * Handle "Book this service" click
     *
     * Flow:
     * 1. Set booking context with service details
     * 2. Smooth scroll to Contact section
     * 3. Contact form auto-populates from context
     *
     * NO MODAL - Direct action
     */
    const handleBookService = (service) => {
        // Update booking context with service details
        setBooking({
            serviceId: service.id,
            serviceName: service.title,
            packageId: null,
            packageLabel: 'Standard Package',
            packagePrice: service.price,
            source: 'booking'
        });

        // Smooth scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Add highlight effect to contact section
            contactSection.classList.add('highlight-section');
            setTimeout(() => {
                contactSection.classList.remove('highlight-section');
            }, 2000);
        }
    };

    return (
        <section id="services" className="services-section py-32 bg-theme-bg">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-4xl font-bold mb-16 text-center text-theme-text font-serif">Services</h2>

                <div className="services-accordion divide-y divide-theme-border">
                    {servicesData.map((service) => {
                        const isOpen = openServiceId === service.id;

                        return (
                            <div key={service.id} className="service-item">
                                {/* Clickable Header */}
                                <button
                                    onClick={() => toggleService(service.id)}
                                    className="service-header"
                                    aria-expanded={isOpen}
                                    aria-controls={`service-content-${service.id}`}
                                >
                                    <h3 className="service-title">
                                        {service.title}
                                    </h3>

                                    {/* Chevron Icon */}
                                    <svg
                                        className={`service-chevron ${isOpen ? 'open' : ''}`}
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>

                                {/* Expandable Content */}
                                <div
                                    id={`service-content-${service.id}`}
                                    className={`service-content ${isOpen ? 'open' : ''}`}
                                    aria-hidden={!isOpen}
                                >
                                    <div className="service-content-inner">
                                        {/* Description */}
                                        <p className="service-description">
                                            {service.description}
                                        </p>

                                        {/* Feature Points */}
                                        {service.points && service.points.length > 0 && (
                                            <ul className="service-points">
                                                {service.points.map((point, index) => (
                                                    <li key={index} className="service-point">
                                                        <span className="point-bullet"></span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Pricing */}
                                        {service.price && (
                                            <div className="service-pricing">
                                                <p className="service-price">
                                                    Starting from <span className="price-amount">{service.price}</span>
                                                </p>
                                                <p className="pricing-note">{pricingNote}</p>
                                            </div>
                                        )}

                                        {/* CTA Button - Direct scroll to Contact */}
                                        {service.cta && (
                                            <button
                                                className="service-cta"
                                                onClick={() => handleBookService(service)}
                                            >
                                                {service.cta}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
