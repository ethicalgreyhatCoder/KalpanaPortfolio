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
        type: 'makeup',
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
                   author: 'Aishwarya',
            role: 'Bride',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Gujarati Bridal Look Case Study',
            content: 'Client has combination skin with oily T-zone. Used airbrush foundation for longevity and matte finish. Chose warm-toned colors to complement traditional attire.'
        }
    },
    {
        id: 'makeup-gujarati-1',
        type: 'makeup',
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
            author: 'Priya',
            role: 'Bride',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Gujarati Wedding Makeup Case Study',
            content: 'Traditional Gujarati wedding makeup focusing on gold accents and warm tones.'
        }
    },
    {
        id: 'makeup-2',
        type: 'makeup',
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
            author: 'Ananya',
            role: 'Model',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Editorial Makeup Case Study',
            content: 'Editorial shoots require bold, high-contrast makeup that translates well in professional photography.'
        }
    },
    {
        id: 'makeup-marathi-1',
        type: 'makeup',
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
            author: 'Anjali',
            role: 'Bride',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Marathi Bridal Case Study',
            content: 'Dry skin requires intense hydration. Traditional Marathi weddings call for bold red lips and gold accents.'
        }
    },
    {
        id: 'makeup-4',
        type: 'makeup',
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
            author: 'Kavya',
            role: 'Client',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Party Glam Case Study',
            content: 'Oily skin requires oil-control products. Evening events need subtle glamour with controlled shimmer.'
        }
    },
    {
        id: 'makeup-rajasthani-1',
        type: 'makeup',
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
            author: 'Neha',
            role: 'Bride',
            fadeOnScroll: true
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
        type: 'hair',
        title: 'Bridal Updo with Florals',
        category: 'Bridal',
        region: 'gujarati',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=375&fit=crop&q=80',
        hairType: 'Medium-thick, wavy',
        length: 'Long',
        occasion: 'Wedding',
        modelName: 'Isha Mehta',
        modelInstagram: 'https://instagram.com/isha.mehta',
        productsUsed: [
            { name: 'Volumizing Mousse', brand: 'Tresemmé' },
            { name: 'Strong Hold Hairspray', brand: 'L\'Oréal' }
        ],
        toolsUsed: [
            { name: 'Hair Curler', icon: '/icons/curler.png', brand: 'Dyson' },
            { name: 'Round Brush', icon: '/icons/round-brush.png', brand: 'Mason Pearson' },
            { name: 'Hair Pins', icon: '/icons/pins.png', brand: 'Bobby Pin Co' },
            { name: 'Teasing Comb', icon: '/icons/comb.png', brand: 'Tangle Teezer' }
        ],
        testimonial: {
            text: 'My hair stayed perfect throughout the entire wedding day. The updo was elegant and comfortable!',
            author: 'Isha',
            role: 'Bride',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Bridal Updo Case Study',
            content: 'Wavy hair holds styles well. Created structured updo that lasts all day while maintaining soft, romantic feel. Used strategic pinning and hairspray layers for maximum hold.'
        }
    },
    {
        id: 'hair-2',
        type: 'hair',
        title: 'Loose Beach Waves',
        category: 'Party',
        region: 'marathi',
        image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=375&fit=crop&q=80',
        hairType: 'Fine, straight',
        length: 'Medium',
        occasion: 'Evening Party',
        modelName: 'Shreya Iyer',
        modelInstagram: 'https://instagram.com/shreya.iyer',
        productsUsed: [
            { name: 'Heat Protection Spray', brand: 'Tresemmé' },
            { name: 'Texturizing Spray', brand: 'Oribe' }
        ],
        toolsUsed: [
            { name: 'Large Barrel Curler', icon: '/icons/curler.png', brand: 'GHD' },
            { name: 'Paddle Brush', icon: '/icons/paddle-brush.png', brand: 'Wet Brush' },
            { name: 'Diffuser', icon: '/icons/diffuser.png', brand: 'Dyson' }
        ],
        testimonial: {
            text: 'Effortless waves that looked natural and glamorous. Perfect for a night out!',
            author: 'Shreya',
            role: 'Client',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Beach Waves Case Study',
            content: 'Fine hair needs volume and texture. Used large barrel curling iron and texturizing products for effortless, beachy look. Key is alternating curl direction for natural movement.'
        }
    }
];

// ===== NAIL DESIGNS =====
export const nailDesigns = [
    {
        id: 'nails-1',
        type: 'nails',
        title: 'Bridal French with Gold',
        category: 'Bridal',
        region: 'rajasthani',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=375&fit=crop&q=80',
        nailLength: 'Medium',
        nailShape: 'Almond',
        occasion: 'Wedding',
        modelName: 'Divya Reddy',
        modelInstagram: 'https://instagram.com/divya.reddy',
        colorScheme: ['#FFFFFF', '#FFD700', '#F5E6D3'],
        productsUsed: [
            { name: 'Gel Base Coat', brand: 'OPI' },
            { name: 'White Gel Polish', brand: 'Gelish' },
            { name: 'Gold Foil', brand: 'Moyra' }
        ],
        toolsUsed: [
            { name: 'UV LED Lamp', icon: '/icons/uv-lamp.png', brand: 'Sunuv' },
            { name: 'Nail File', icon: '/icons/nail-file.png', brand: 'OPI' },
            { name: 'Detail Brush', icon: '/icons/detail-brush.png', brand: 'Winstonia' },
            { name: 'Cuticle Pusher', icon: '/icons/cuticle-pusher.png', brand: 'Tweezerman' }
        ],
        testimonial: {
            text: 'The gold detail was so precise and elegant. My nails looked perfect for my wedding and lasted beautifully!',
            author: 'Divya',
            role: 'Bride',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'French with Gold Case Study',
            content: 'Classic French manicure with gold accent line. Gel polish for 2-week wear. Used fine detail brush for precise gold application along smile line.'
        }
    },
    {
        id: 'nails-2',
        type: 'nails',
        title: 'Nude Minimalist Elegance',
        category: 'Minimalist',
        region: 'all',
        image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=300&h=375&fit=crop&q=80',
        nailLength: 'Short',
        nailShape: 'Round',
        occasion: 'Everyday',
        modelName: 'Sana Khan',
        modelInstagram: 'https://instagram.com/sana.khan',
        colorScheme: ['#F5E6D3', '#D4A574'],
        productsUsed: [
            { name: 'Nude Base', brand: 'Essie', shade: 'Ballet Slippers' },
            { name: 'Gel Top Coat', brand: 'Seche Vite' }
        ],
        toolsUsed: [
            { name: 'UV LED Lamp', icon: '/icons/uv-lamp.png', brand: 'Sunuv' },
            { name: 'Nail Buffer', icon: '/icons/nail-buffer.png', brand: 'Sally Hansen' },
            { name: 'Ombre Sponge', icon: '/icons/sponge.png', brand: 'Beauty Blender' }
        ],
        testimonial: {
            text: 'Simple, elegant, and perfect for everyday wear. The ombre is so subtle and beautiful!',
            author: 'Sana',
            role: 'Client',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Minimalist Case Study',
            content: 'Short nails benefit from minimalist designs. Nude gradient adds sophistication. Sponge technique creates seamless ombre transition.'
        }
    }
];

// ===== EYE LOOKS =====
export const eyeLooks = [
    {
        id: 'eyes-1',
        type: 'eyes',
        title: 'Smokey Eye Perfection',
        category: 'Smokey',
        region: 'all',
        image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=375&fit=crop&q=80',
        eyeShape: 'Almond',
        technique: 'Cut Crease with Smokey Shadow',
        occasion: 'Evening Event',
        modelName: 'Sanya Malhotra',
        modelInstagram: 'https://instagram.com/sanya.malhotra',
        colorPalette: ['#2B2B2B', '#4A4A4A', '#8B4513', '#D4A574', '#F7E7CE'],
        colorNames: ['Charcoal Black', 'Graphite', 'Warm Bronze', 'Sand', 'Champagne Glow'],
        productsUsed: [
            { name: 'Eyeshadow Primer', brand: 'Urban Decay' },
            { name: 'Smokey Palette', brand: 'Anastasia Beverly Hills' },
            { name: 'Gel Kajal', brand: 'Lakmé', shade: 'Deep Black' },
            { name: 'False Lashes', brand: 'Ardell', shade: 'Demi Wispies' }
        ],
        testimonial: {
            text: 'The smokey eye look elevated my entire appearance and lasted all night. Perfect drama without being over the top!',
            author: 'Sanya',
            role: 'Evening Event',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Smokey Eye Case Study',
            content: 'Classic smokey eye with cut crease for definition. Almond eyes benefit from elongating technique. Built depth gradually using transition shades before applying darker tones. False lashes complete the dramatic effect.'
        }
    },
    {
        id: 'eyes-2',
        type: 'eyes',
        title: 'Natural Bridal Elegance',
        category: 'Natural',
        region: 'all',
        image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=300&h=375&fit=crop&q=80',
        eyeShape: 'Round',
        technique: 'Soft Blended Natural',
        occasion: 'Bridal',
        modelName: 'Rhea Kapoor',
        modelInstagram: 'https://instagram.com/rhea.kapoor',
        colorPalette: ['#D4A574', '#C08B7F', '#F5E6D3', '#B76E79'],
        colorNames: ['Warm Sand', 'Rose Blush', 'Nude Shimmer', 'Dusty Rose'],
        productsUsed: [
            { name: 'Eye Primer', brand: 'MAC' },
            { name: 'Neutral Palette', brand: 'Huda Beauty', shade: 'New Nude' },
            { name: 'Brown Kajal', brand: 'Lakmé', shade: 'Deep Brown' },
            { name: 'Mascara', brand: 'Maybelline', shade: 'Lash Sensational' }
        ],
        testimonial: {
            text: 'Beautifully natural yet elevated. My eyes looked bright and defined throughout my wedding day.',
            author: 'Rhea',
            role: 'Bride',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Natural Bridal Eye Case Study',
            content: 'Bridal makeup requires longevity and subtle enhancement. Used warm neutral tones to complement skin. Focused on brightening inner corners and defining lash line with brown kajal for soft definition.'
        }
    },
    {
        id: 'eyes-3',
        type: 'eyes',
        title: 'Dramatic Cut Crease',
        category: 'Dramatic',
        region: 'all',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=625&fit=crop&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=375&fit=crop&q=80',
        eyeShape: 'Hooded',
        technique: 'Cut Crease with Shimmer',
        occasion: 'Party',
        modelName: 'Kiara Advani',
        modelInstagram: 'https://instagram.com/kiara.advani',
        colorPalette: ['#4A148C', '#D4A574', '#FFD700', '#2B2B2B'],
        colorNames: ['Deep Plum', 'Bronze', 'Golden Shimmer', 'Black Liner'],
        productsUsed: [
            { name: 'Concealer Base', brand: 'Tarte', shade: 'Shape Tape' },
            { name: 'Jewel Tone Palette', brand: 'Urban Decay', shade: 'Electric' },
            { name: 'Liquid Liner', brand: 'Stila', shade: 'Intense Black' },
            { name: 'Glitter Adhesive', brand: 'NYX' }
        ],
        testimonial: {
            text: 'Bold, glamorous, and party-ready! The cut crease technique opened up my hooded eyes beautifully.',
            author: 'Kiara',
            role: 'Party Makeup',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Dramatic Cut Crease Case Study',
            content: 'Hooded eyes need strategic placement above the natural crease. Used concealer to carve out clean cut crease line. Applied jewel tones for bold impact with golden shimmer on lid for dimension.'
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

