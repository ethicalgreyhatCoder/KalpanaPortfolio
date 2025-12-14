import React, { createContext, useContext, useState } from 'react';

/**
 * BOOKING CONTEXT
 *
 * Manages booking intent state across the application.
 * This is the single source of truth for booking data that flows
 * from BookingIntentSheet → Contact section.
 *
 * State includes:
 * - serviceId: ID of selected service
 * - serviceTitle: Display name of service
 * - packageId: ID of selected package
 * - packageLabel: Display name of package
 * - packagePrice: Price display (informational)
 * - source: "manual" (direct contact) | "booking" (via booking sheet)
 */

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookingIntent, setBookingIntent] = useState({
        serviceId: null,
        serviceTitle: '',
        packageId: null,
        packageLabel: '',
        packagePrice: '',
        source: 'manual'
    });

    /**
     * Sets booking context when user completes package selection
     * Called from BookingIntentSheet → "Proceed to Contact"
     */
    const setBooking = (bookingData) => {
        setBookingIntent({
            serviceId: bookingData.serviceId || null,
            serviceTitle: bookingData.serviceName || '',
            packageId: bookingData.packageId || null,
            packageLabel: bookingData.packageLabel || '',
            packagePrice: bookingData.packagePrice || '',
            source: 'booking'
        });
    };

    /**
     * Clears booking context
     * Called when user dismisses booking summary or submits form
     */
    const clearBooking = () => {
        setBookingIntent({
            serviceId: null,
            serviceTitle: '',
            packageId: null,
            packageLabel: '',
            packagePrice: '',
            source: 'manual'
        });
    };

    /**
     * Checks if booking context exists
     */
    const hasBookingContext = () => {
        return bookingIntent.source === 'booking' && bookingIntent.serviceId !== null;
    };

    return (
        <BookingContext.Provider value={{
            bookingIntent,
            setBooking,
            clearBooking,
            hasBookingContext
        }}>
            {children}
        </BookingContext.Provider>
    );
};

/**
 * Custom hook to access booking context
 * Usage: const { bookingIntent, setBooking, clearBooking } = useBooking();
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within BookingProvider');
    }
    return context;
};

export default BookingContext;

