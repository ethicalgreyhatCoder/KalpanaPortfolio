// ========================================
// PORTFOLIO DATA STRUCTURE
// Centralized data for all portfolio categories, filters, and regions
// ========================================

// ===== REGIONS =====
export const regions = [
    { id: 'all', name: 'All Regions', label: 'All Regions' },
    { id: 'gujarati', name: 'Gujarati', label: 'Gujarati' },
    { id: 'marathi', name: 'Marathi', label: 'Marathi' },
    { id: 'rajasthani', name: 'Rajasthani', label: 'Rajasthani' }
];

// ===== FILTERS =====
export const filterCategories = {
    makeup: ['All', 'Bridal', 'Editorial', 'Party'],
    hair: ['All', 'Bridal', 'Party', 'Casual'],
    nails: ['All', 'Bridal', 'French', 'Minimalist'],
    eyes: ['All', 'Smokey', 'Natural', 'Dramatic']
};

// ===== MAKEUP LOOKS =====
export const makeupLooks = [
    {
        id: 'makeup-1',
        title: 'Gujarati Bridal Elegance',
        category: 'Bridal',
        region: 'gujarati',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=375&fit=crop&q=80',
        skinType: 'Combination',
        occasion: 'Wedding',
        colorPalette: ['#D4A574', '#C08B7F', '#E8C4A0', '#8B4513'],
        colorNames: ['Warm Sand', 'Rose Blush', 'Champagne', 'Bronze'],
        modelName: 'Aishwarya Patel',
        modelInstagram: 'https://instagram.com/aishwarya.patel',
        productsUsed: [
            { name: 'HD Foundation', brand: 'MAC', shade: 'NC30' },
            { name: 'Contour Kit', brand: 'Anastasia Beverly Hills' },
            { name: 'Eyeshadow Palette', brand: 'Huda Beauty', shade: 'Desert Dusk' }
        ],
        testimonial: {
            text: 'The makeup was absolutely stunning! Kalpana really understood my vision and brought my dream bridal look to life.',
            author: 'Aishwarya'
        },
        caseStudy: {
            title: 'Gujarati Bridal Look Case Study',
            content: 'Client has combination skin with oily T-zone. Used airbrush foundation for longevity and matte finish. Chose warm-toned colors to complement traditional attire.'
        }
    },
    {
        id: 'makeup-gujarati-1',
        title: 'Gujarati Wedding Glam',
        category: 'Bridal',
        region: 'gujarati',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=375&fit=crop&q=80',
        skinType: 'Normal',
        occasion: 'Wedding',
        colorPalette: ['#FFD700', '#D4A574', '#C08B7F'],
        colorNames: ['Royal Gold', 'Warm Sand', 'Rose Blush'],
        modelName: 'Priya Shah',
        modelInstagram: 'https://instagram.com/priya.shah',
        productsUsed: [
            { name: 'Radiant Foundation', brand: 'Estée Lauder', shade: 'Silk' },
            { name: 'Gold Eyeshadow', brand: 'MAC', shade: 'Gold' },
            { name: 'Red Lipstick', brand: 'Charlotte Tilbury', shade: 'Red Carpet Red' }
        ],
        testimonial: {
            text: 'Beautiful traditional look that made me feel like a queen on my special day.',
            author: 'Priya'
        },
        caseStudy: {
            title: 'Gujarati Wedding Makeup Case Study',
            content: 'Traditional Gujarati wedding makeup focusing on gold accents and warm tones.'
        }
    },
    {
        id: 'makeup-2',
        title: 'Editorial High Fashion',
        category: 'Editorial',
        region: 'marathi',
        image: 'https://images.unsplash.com/photo-1494883334519-3a2ca2dccb17?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1494883334519-3a2ca2dccb17?w=300&h=375&fit=crop&q=80',
        skinType: 'Normal',
        occasion: 'Photoshoot',
        colorPalette: ['#4A4A4A', '#D4A574', '#8B0000'],
        colorNames: ['Charcoal', 'Warm Sand', 'Deep Red'],
        modelName: 'Ananya Desai',
        modelInstagram: 'https://instagram.com/ananya.desai',
        productsUsed: [
            { name: 'Face & Body Foundation', brand: 'MAC', shade: 'C3' },
            { name: 'Smokey Eye Palette', brand: 'Urban Decay', shade: 'Naked 3' }
        ],
        testimonial: {
            text: 'A bold, editorial makeup that captured the essence of modern luxury.',
            author: 'Priya'
        },
        caseStudy: {
            title: 'Editorial Makeup Case Study',
            content: 'Editorial shoots require bold, high-contrast makeup that translates well in professional photography.'
        }
    },
    {
        id: 'makeup-marathi-1',
        title: 'Marathi Bridal Tradition',
        category: 'Bridal',
        region: 'marathi',
        image: 'https://images.unsplash.com/photo-1487412720507-e21cc028cb29?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1487412720507-e21cc028cb29?w=300&h=375&fit=crop&q=80',
        skinType: 'Dry',
        occasion: 'Wedding',
        colorPalette: ['#FFD700', '#800000', '#DC143C'],
        colorNames: ['Gold', 'Maroon', 'Crimson'],
        modelName: 'Anjali Kulkarni',
        modelInstagram: 'https://instagram.com/anjali.kulkarni',
        productsUsed: [
            { name: 'Hydrating Primer', brand: 'Smashbox' },
            { name: 'Dewy Foundation', brand: 'Estée Lauder', shade: 'Tawny' }
        ],
        testimonial: {
            text: 'Traditional elegance meets modern beauty. Absolutely mesmerizing!',
            author: 'Anjali'
        },
        caseStudy: {
            title: 'Marathi Bridal Case Study',
            content: 'Dry skin requires intense hydration. Traditional Marathi weddings call for bold red lips and gold accents.'
        }
    },
    {
        id: 'makeup-4',
        title: 'Party Glam Look',
        category: 'Party',
        region: 'rajasthani',
        image: 'https://images.unsplash.com/photo-1532746622601-72c8c540206d?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1532746622601-72c8c540206d?w=300&h=375&fit=crop&q=80',
        skinType: 'Oily',
        occasion: 'Evening Party',
        colorPalette: ['#B76E79', '#D4A574', '#F5E6D3'],
        colorNames: ['Dusty Rose', 'Sand', 'Nude'],
        modelName: 'Kavya Sharma',
        modelInstagram: 'https://instagram.com/kavya.sharma',
        productsUsed: [
            { name: 'Mattifying Primer', brand: 'Benefit' },
            { name: 'Matte Foundation', brand: 'Estée Lauder' }
        ],
        testimonial: {
            text: 'Fast, efficient, and still maintains that premium look!',
            author: 'Viewer'
        },
        caseStudy: {
            title: 'Party Glam Case Study',
            content: 'Oily skin requires oil-control products. Evening events need subtle glamour with controlled shimmer.'
        }
    },
    {
        id: 'makeup-rajasthani-1',
        title: 'Rajasthani Royal Bridal',
        category: 'Bridal',
        region: 'rajasthani',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=375&fit=crop&q=80',
        skinType: 'Fair',
        occasion: 'Wedding',
        colorPalette: ['#FFD700', '#DC143C', '#8B0000', '#D4A574'],
        colorNames: ['Royal Gold', 'Crimson', 'Burgundy', 'Sand'],
        modelName: 'Neha Rathore',
        modelInstagram: 'https://instagram.com/neha.rathore',
        productsUsed: [
            { name: 'Luminous Foundation', brand: 'MAC', shade: 'NW20' },
            { name: 'Gold Kohl', brand: 'Lakme' },
            { name: 'Deep Red Lipstick', brand: 'Charlotte Tilbury', shade: 'Red Carpet Red' }
        ],
        testimonial: {
            text: 'Royal and majestic, exactly as I envisioned my wedding day.',
            author: 'Neha'
        },
        caseStudy: {
            title: 'Rajasthani Royal Bridal Case Study',
            content: 'Rajasthani weddings celebrate regal elegance with bold colors, rich golds, and dramatic eyes inspired by royal heritage.'
        }
    }
];

// ===== HAIR STYLES =====
export const hairStyles = [
    {
        id: 'hair-1',
        title: 'Bridal Updo with Florals',
        category: 'Bridal',
        region: 'gujarati',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=375&fit=crop&q=80',
        hairType: 'Medium-thick, wavy',
        length: 'Long',
        occasion: 'Wedding',
        productsUsed: [
            { name: 'Volumizing Mousse', brand: 'Tresemmé' },
            { name: 'Strong Hold Hairspray', brand: 'L\'Oréal' }
        ],
        caseStudy: {
            title: 'Bridal Updo Case Study',
            content: 'Wavy hair holds styles well. Created structured updo that lasts all day while maintaining soft, romantic feel.'
        }
    },
    {
        id: 'hair-2',
        title: 'Loose Beach Waves',
        category: 'Party',
        region: 'marathi',
        image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=375&fit=crop&q=80',
        hairType: 'Fine, straight',
        length: 'Medium',
        occasion: 'Evening Party',
        productsUsed: [
            { name: 'Heat Protection Spray', brand: 'Tresemmé' },
            { name: 'Texturizing Spray', brand: 'Oribe' }
        ],
        caseStudy: {
            title: 'Beach Waves Case Study',
            content: 'Fine hair needs volume and texture. Used large barrel curling iron and texturizing products for effortless, beachy look.'
        }
    }
];

// ===== NAIL DESIGNS =====
export const nailDesigns = [
    {
        id: 'nails-1',
        title: 'Bridal French with Gold',
        category: 'Bridal',
        region: 'rajasthani',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=375&fit=crop&q=80',
        nailLength: 'Medium',
        nailShape: 'Almond',
        occasion: 'Wedding',
        colorScheme: ['#FFFFFF', '#FFD700', '#F5E6D3'],
        productsUsed: [
            { name: 'Gel Base Coat', brand: 'OPI' },
            { name: 'White Gel Polish', brand: 'Gelish' }
        ],
        caseStudy: {
            title: 'French with Gold Case Study',
            content: 'Classic French manicure with gold accent line. Gel polish for 2-week wear.'
        }
    },
    {
        id: 'nails-2',
        title: 'Nude Minimalist Elegance',
        category: 'Minimalist',
        region: 'all',
        image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=300&h=375&fit=crop&q=80',
        nailLength: 'Short',
        nailShape: 'Round',
        occasion: 'Everyday',
        colorScheme: ['#F5E6D3', '#D4A574'],
        productsUsed: [
            { name: 'Nude Base', brand: 'Essie', shade: 'Ballet Slippers' }
        ],
        caseStudy: {
            title: 'Minimalist Case Study',
            content: 'Short nails benefit from minimalist designs. Nude gradient adds sophistication.'
        }
    }
];

// ===== EYE LOOKS =====
export const eyeLooks = [
    {
        id: 'eyes-1',
        title: 'Smokey Eye Perfection',
        category: 'Smokey',
        region: 'all',
        image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=375&fit=crop&q=80',
        eyeShape: 'Almond',
        technique: 'Cut Crease with Smokey Shadow',
        occasion: 'Evening Event',
        colorPalette: ['#000000', '#4A4A4A', '#8B4513'],
        productsUsed: [
            { name: 'Eyeshadow Primer', brand: 'Urban Decay' },
            { name: 'Smokey Palette', brand: 'Anastasia Beverly Hills' }
        ],
        caseStudy: {
            title: 'Smokey Eye Case Study',
            content: 'Classic smokey eye with cut crease for definition. False lashes complete the dramatic effect.'
        }
    }
];

// ===== CATEGORY DEFINITIONS =====
export const categories = [
    {
        id: 'makeup',
        label: 'Makeup',
        data: makeupLooks,
        filters: filterCategories.makeup
    },
    {
        id: 'hair',
        label: 'Hair',
        data: hairStyles,
        filters: filterCategories.hair
    },
    {
        id: 'nails',
        label: 'Nails',
        data: nailDesigns,
        filters: filterCategories.nails
    },
    {
        id: 'eyes',
        label: 'Eyes',
        data: eyeLooks,
        filters: filterCategories.eyes
    }
];

// ===== HELPER FUNCTIONS =====

/**
 * Get items filtered by category, filter, and region
 * Region filter is independent - if selected, it overrides other filters
 */
export const getFilteredItems = (categoryId, filterName, regionId) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return [];

    let items = [...category.data];

    // If region is selected (not 'all'), only filter by region (independent)
    if (regionId !== 'all') {
        items = items.filter(item => item.region === regionId);
    } else {
        // Only apply category filter if region is 'all'
        if (filterName !== 'All') {
            items = items.filter(item => item.category === filterName);
        }
    }

    return items;
};

/**
 * Get filters for a specific category
 */
export const getFiltersForCategory = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.filters || [];
};

/**
 * Get all category data for rendering
 */
export const getCategoryData = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.data || [];
};

