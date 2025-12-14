// ========================================
// BOOKING DATA
// Service inquiry packages (NO payment logic)
// ========================================

export const bookingServices = [
    {
        id: 'consultation',
        title: 'Consultation',
        description: 'Personalized beauty advice, product recommendations, and makeup trials tailored exclusively to you.',
        packages: [
            {
                id: 'standard',
                label: 'Standard Consultation',
                price: '₹999',
                includes: [
                    'One-on-one consultation (30 min)',
                    'Skin type analysis',
                    'Product recommendations'
                ]
            },
            {
                id: 'premium',
                label: 'Premium Consultation',
                price: '₹1,999',
                includes: [
                    'Extended session (60 min)',
                    'Trial makeup application',
                    'Personalized beauty routine'
                ]
            }
        ]
    },
    {
        id: 'bridal-makeup',
        title: 'Bridal Makeup',
        description: 'Timeless elegance for your special day, crafted to last from ceremony to celebration.',
        packages: [
            {
                id: 'classic',
                label: 'Classic Bridal',
                price: 'Starting from ₹8,000',
                includes: [
                    'Bridal makeup for ceremony',
                    'Long-wear formulations',
                    'Basic touch-up kit'
                ]
            },
            {
                id: 'luxury',
                label: 'Luxury Bridal Experience',
                price: 'Starting from ₹15,000',
                includes: [
                    'Pre-wedding consultation & trial',
                    'Bridal makeup + touch-ups',
                    'Hairstyling included',
                    'Professional touch-up kit'
                ]
            }
        ]
    },
    {
        id: 'editorial-fashion',
        title: 'Editorial & Fashion',
        description: 'Bold, artistic makeup for high-fashion campaigns, runway, and editorial work.',
        packages: [
            {
                id: 'editorial',
                label: 'Editorial Shoot',
                price: 'Starting from ₹6,500',
                includes: [
                    'Creative makeup for editorial',
                    'Collaboration with photographers',
                    'Trending & experimental styles'
                ]
            }
        ]
    },
    {
        id: 'hd-photoshoot',
        title: 'HD Photoshoot',
        description: 'Flawless, camera-ready makeup engineered for high-definition imagery.',
        packages: [
            {
                id: 'standard-hd',
                label: 'Standard HD Makeup',
                price: 'Starting from ₹5,000',
                includes: [
                    'HD-optimized product selection',
                    'Airbrushed finish',
                    'Studio lighting considerations'
                ]
            }
        ]
    }
];

// Helper function to get service by ID
export const getServiceById = (serviceId) => {
    return bookingServices.find(service => service.id === serviceId);
};

