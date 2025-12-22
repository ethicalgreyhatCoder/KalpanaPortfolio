// ========================================
// PORTFOLIO DATA STRUCTURE
// Centralized data for all portfolio categories, filters, and regions
// ========================================

// ===== REGIONS =====
export const regions = [
    { id: 'all', name: 'All Regions', label: 'All Regions' },
    { id: 'gujarati', name: 'Gujarati', label: 'Gujarati' },
    { id: 'marathi', name: 'Marathi', label: 'Marathi' },
    { id: 'rajasthani', name: 'Rajasthani', label: 'Rajasthani' },
    { id: 'punjabi', name: 'Punjabi', label: 'Punjabi' },
    // { id: 'south-indian', name: 'South Indian', label: 'South Indian' },
    { id: 'bengali', name: 'Bengali', label: 'Bengali' },
    { id: 'international', name: 'International', label: 'International' }
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
        title: 'Rajasthani Bridal Elegance',
        category: 'Bridal',
        region: 'rajasthani',
        // Multi-media support: images and videos
        media: [
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfoilo1/rajasthani.webp`,
                alt: 'Front view - Gujarati bridal makeup'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfoilo1/rajasthani-before.webp`,
                alt: 'Side profile with jewelry'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfoilo1/rajasthani-after.webp`,
                alt: 'Eye makeup detail'
            },
            {
                type: 'video',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfoilo1/rajasthani-video.mov`,
                autoplay: true,
                muted: true,
                loop: true
            }
        ],
        thumbnail: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfoilo1/rajasthani.webp`,
        // Backward compatibility - deprecated but maintained
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=625&fit=crop&q=80',
        thumbnailImage: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfoilo1/rajasthani.webp`,
        skinType: 'Combination',
        occasion: 'Wedding',
        colorPalette: ['#D4A574', '#C08B7F', '#E8C4A0', '#8B4513'],
        colorNames: ['Warm Sand', 'Rose Blush', 'Champagne', 'Bronze'],
        modelName: 'Ms. Disha',
        modelInstagram: 'https://www.instagram.com/ms._dishuu/',
        productsUsed: [
            { name: 'HD Foundation', brand: 'MAC', shade: 'NC30' },
            { name: 'Contour Kit', brand: 'Anastasia Beverly Hills' },
            { name: 'Eyeshadow Palette', brand: 'Huda Beauty', shade: 'Desert Dusk' }
        ],
        testimonial: {
            text: 'The makeup was absolutely stunning! Kalpana really understood my vision and brought my dream bridal look to life.',
            author: 'Ms. Disha',
            role: 'Bride',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Rajasthani Bridal Look Case Study',
            content: 'Client has combination skin with oily T-zone and a lots of dark circle. Used airbrush foundation for longevity and matte finish. Chose warm-toned colors to complement traditional attire.'
        }
    },
    {
        id: 'makeup-gujarati-1',
        type: 'makeup',
        title: 'Marathi Wedding Glam',
        category: 'Bridal',
        region: 'marathi',
        media: [
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio2/marathi.webp`,
                alt: 'Front view - Gujarati bridal makeup'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio2/marathi2.webp`,
                alt: 'Side profile with jewelry'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio2/marathi3.webp`,
                alt: 'Eye makeup detail'
            },
            {
                type: 'video',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio2/marathi-video.mp4`,
                autoplay: true,
                muted: true,
                loop: true
            }
        ],
        image: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio2/marathi2.webp`,
        thumbnailImage: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio2/marathi2.webp`,
        skinType: 'Normal',
        occasion: 'Wedding',
        colorPalette: ['#FFD700', '#D4A574', '#C08B7F'],
        colorNames: ['Royal Gold', 'Warm Sand', 'Rose Blush'],
        modelName: 'Kalpana Verma',
        modelInstagram: 'https://instagram.com/_kalpan.aaaa',
        productsUsed: [
            { name: 'Radiant Foundation', brand: 'Estée Lauder', shade: 'Silk' },
            { name: 'Gold Eyeshadow', brand: 'MAC', shade: 'Gold' },
            { name: 'Red Lipstick', brand: 'Charlotte Tilbury', shade: 'Red Carpet Red' }
        ],
        testimonial: {
            text: 'Though this is a self makeup for my friends weeding, The makeup lasted all day and night.',
            author: 'Kalpana',
            role: 'Model',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Marathi Wedding Makeup Case Study',
            content: 'Traditional Marathi wedding makeup focusing on gold accents and warm tones.'
        }
    },
    {
        id: 'makeup-2',
        type: 'makeup',
        title: 'Editorial High Fashion',
        category: 'Editorial',
        region: 'bengali',
        media: [
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio3/elegent.webp`,
                alt: 'Editorial high fashion look'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio3/elegent1.webp`,
                alt: 'Dramatic lighting shot'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio3/elegent2.webp`,
                alt: 'Close-up details'
            },
            {
                type: 'video',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio3/elegent-video.mp4`,
                autoplay: true,
                muted: true,
                loop: true
            }
        ],
        thumbnail: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio3/elegent.webp`,
        image: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio3/elegent.webp`,
        thumbnailImage: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio3/elegent.webp`,
        skinType: 'Normal',
        occasion: 'Photoshoot',
        colorPalette: ['#4A4A4A', '#D4A574', '#8B0000'],
        colorNames: ['Charcoal', 'Warm Sand', 'Deep Red'],
        modelName: 'Kashish Arora',
        modelInstagram: 'https://www.instagram.com/__.kashisharora.__/',
        productsUsed: [
            { name: 'Face & Body Foundation', brand: 'MAC', shade: 'C3' },
            { name: 'Smokey Eye Palette', brand: 'Urban Decay', shade: 'Naked 3' }
        ],
        testimonial: {
            text: 'A soft, editorial makeup that captured the essence of modern luxury.',
            author: 'Kashish Arora',
            role: 'Model',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Editorial Makeup Case Study',
            content: 'Soft and shuttle make up for daytime party with dual shade glittery eye makeup'
        }
    },
    {
        id: 'makeup-marathi-1',
        type: 'makeup',
        title: 'Gujarati Bridal Tradition',
        category: 'Bridal',
        region: 'gujarati',
        media: [
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio4/gujrathi.webp`,
                alt: 'Editorial high fashion look'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio4/gujrathi1.webp`,
                alt: 'Dramatic lighting shot'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio4/gujrathi2.webp`,
                alt: 'Close-up details'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio4/gujrathi3.webp`,
                alt: 'Close-up details'
            }
        ],
        image: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio4/gujrathi3.webp`,
        thumbnailImage: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio4/gujrathi3.webp`,
        skinType: 'Dry',
        occasion: 'Wedding',
        colorPalette: ['#FFD700', '#800000', '#DC143C'],
        colorNames: ['Gold', 'Maroon', 'Crimson'],
        modelName: 'Mousami',
        modelInstagram: 'https://www.instagram.com/mahima_ahuja_',
        productsUsed: [
            { name: 'Hydrating Primer', brand: 'Smash box' },
            { name: 'Dewy Foundation', brand: 'Estée Lauder', shade: 'Tawny' }
        ],
        testimonial: {
            text: 'Traditional elegance meets modern beauty. Absolutely mesmerizing!',
            author: 'Mousami',
            role: 'Weeding Attendee',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Gujarati Bridal Case Study',
            content: 'Dry skin requires intense hydration. Traditional Gujarati weddings call for bold lips and pink accents.'
        }
    },
    {
        id: 'makeup-4',
        type: 'makeup',
        title: 'Bridal Glam Look',
        category: 'Bridal',
        region: 'punjabi',
        media: [
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio5/punjabi.webp`,
                alt: 'Editorial high fashion look'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio5/punjabi1.webp`,
                alt: 'Dramatic lighting shot'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio5/punjabi2.webp`,
                alt: 'Close-up details'
            },
            {
                type: 'video',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio5/punjabi-video.mp4`,
                autoplay: true,
                muted: true,
                loop: true
            }

        ],
        image: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio5/punjabi.webp`,
        thumbnailImage: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio5/punjabi.webp`,
        skinType: 'Oily',
        occasion: 'Evening Party',
        colorPalette: ['#B76E79', '#D4A574', '#F5E6D3'],
        colorNames: ['Dusty Rose', 'Sand', 'Nude'],
        modelName: '𝑱𝒉𝒂𝒏𝒔𝒊 𝑹𝒂𝒏𝒊 𝑩𝒆𝒉𝒆𝒓𝒂',
        modelInstagram: 'https://www.instagram.com/the_rani_touch/',
        productsUsed: [
            { name: 'Mattifying Primer', brand: 'Benefit' },
            { name: 'Matte Foundation', brand: 'Estée Lauder' }
        ],
        testimonial: {
            text: 'Fast, efficient, and still maintains that premium look!',
            author: '𝑱𝒉𝒂𝒏𝒔𝒊 𝑹𝒂𝒏𝒊 𝑩𝒆𝒉𝒆𝒓𝒂',
            role: 'Client',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Punjabi Glam Case Study',
            content: 'Oily skin requires oil-control products. Evening events need subtle glamour with controlled shimmer.'
        }
    },
    {
        id: 'makeup-punjabi-1',
        type: 'makeup',
        title: 'Elegant soft editorial look',
        category: 'Editorial',
        region: 'punjabi',
        media: [
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio6/editorial.webp`,
                alt: 'Editorial high fashion look'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio6/editorial1.webp`,
                alt: 'Dramatic lighting shot'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio6/editorial2.webp`,
                alt: 'Close-up details'
            },
            {
                type: 'video',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio6/editorial-vedio.mp4`,
                autoplay: true,
                muted: true,
                loop: true
            }

        ],
        image: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio6/editorial.webp`,
        thumbnailImage: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio6/editorial.webp`,
        skinType: 'Fair',
        occasion: 'Casual Photoshoot',
        colorPalette: ['#FFD700', '#DC143C', '#8B0000', '#D4A574'],
        colorNames: ['Royal Gold', 'Crimson', 'Burgundy', 'Sand'],
        modelName: 'Mannat',
        modelInstagram: 'https://www.instagram.com/_mannat_0608/',
        productsUsed: [
            { name: 'Luminous Foundation', brand: 'MAC', shade: 'NW20' },
            { name: 'Gold Kohl', brand: 'Lakme' },
            { name: 'Deep Red Lipstick', brand: 'Charlotte Tilbury', shade: 'Red Carpet Red' }
        ],
        testimonial: {
            text: 'Royal and majestic, exactly as I envisioned my wedding day.',
            author: 'Mannat',
            role: 'Model',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Punjabi Elegant Glam Look Case Study',
            content: 'Punjabi Elegance celebrate regal elegance with bold colors, rich golds, and dramatic eyes inspired by soft natural elegance.'
        }
    },
    {
        id: 'makeup-5',
        type: 'makeup',
        title: 'International Party look',
        category: 'Party',
        region: 'international',
        media: [
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio7/party.webp`,
                alt: 'Editorial high fashion look'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio7/party1.webp`,
                alt: 'Dramatic lighting shot'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio7/party2.webp`,
                alt: 'Close-up details'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio7/party3.webp`,
                alt: 'Close-up details'
            },
            {
                type: 'video',
                src: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio7/party-vedio.mp4`,
                autoplay: true,
                muted: true,
                loop: true
            }

        ],
        image: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio7/party.webp`,
        thumbnailImage: `${import.meta.env.BASE_URL}portfolio/Makeup/Portfolio7/party.webp`,
        skinType: 'Fair',
        occasion: 'Wedding',
        colorPalette: ['#FFD700', '#DC143C', '#8B0000', '#D4A574'],
        colorNames: ['Royal Gold', 'Crimson', 'Burgundy', 'Sand'],
        modelName: 'Yash Aggarwal',
        modelInstagram: 'https://instagram.com/_kalpan.aaaa',
        productsUsed: [
            { name: 'Luminous Foundation', brand: 'MAC', shade: 'NW20' },
            { name: 'Gold Kohl', brand: 'Lakme' },
            { name: 'Deep Red Lipstick', brand: 'Charlotte Tilbury', shade: 'Red Carpet Red' }
        ],
        testimonial: {
            text: 'The Party look was absolutely stunning! Kalpana really exceeded my expectations.',
            author: 'Mannat',
            role: 'Model',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'International Party Look Case Study',
            content: 'Bold and glamorous party makeup with rich jewel tones and shimmering highlights for a night to remember.'
        }
    }
];

// ===== HAIR STYLES =====
export const hairStyles = [
    {
        id: 'hair-1',
        type: 'hair',
        title: 'Bridal Bun with Florals',
        category: 'Casual',
        region: 'gujarati',
        media: [
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Hari/hair1/bun.webp`,
                alt: 'Bridal updo front view'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio//Hari/hair1/bun1.webp`,
                alt: 'Side profile with florals'
            },
            {
                type: 'video',
                src: `${import.meta.env.BASE_URL}portfolio//Hari/hair1/bun-video.mp4`,
                autoplay: true,
                muted: true,
                loop: true
            }
        ],
        thumbnail: `${import.meta.env.BASE_URL}portfolio/Hari/hair1/bun.webp`,
        image: `${import.meta.env.BASE_URL}portfolio/Hari/hair1/bun.webp`,
        thumbnailImage: `${import.meta.env.BASE_URL}portfolio/Hari/hair1/bun.webp`,
        hairType: 'Medium-thick, wavy',
        length: 'Long',
        occasion: 'Wedding',
        modelName: 'Isha Mehta',
        modelInstagram: 'https://instagram.com/_kalpan.aaaa',
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
            role: 'Bride Mate',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Bridal Updo Case Study',
            content: 'Created structured updo that lasts all day while maintaining soft, romantic feel. Used strategic pinning and hairspray layers for maximum hold.'
        }
    },
    {
        id: 'hair-2',
        type: 'hair',
        title: 'Loose Breaded Crown',
        category: 'Bridal',
        region: 'marathi',
        media: [
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Hari/hair2/bridal.webp`,
                alt: 'Bridal updo front view'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio//Hari/hair2/bridal1.webp`,
                alt: 'Side profile with florals'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio//Hari/hair2/bridal2.webp`,
                alt: 'Side profile with florals'
            },
            {
                type: 'video',
                src: `${import.meta.env.BASE_URL}portfolio//Hari/hair2/bridal-video.mp4`,
                autoplay: true,
                muted: true,
                loop: true
            }
        ],
        image: `${import.meta.env.BASE_URL}portfolio/Hari/hair2/bridal.webp`,
        thumbnailImage: `${import.meta.env.BASE_URL}portfolio/Hari/hair2/bridal.webp`,
        hairType: 'Fine, straight',
        length: 'Long',
        occasion: 'Wedding Party',
        modelName: 'Shreya Iyer',
        modelInstagram: 'https://instagram.com/_kalpan.aaaa',
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
            title: 'Loose Breaded Crown',
            content: 'Fine hair needs volume and texture. Used large barrel curling iron and texturizing products for effortless, beachy look. Key is alternating curl direction for natural movement.'
        }
    },
    {
        id: 'hair-3',
        type: 'hair',
        title: 'Loose Open Hair',
        category: 'Party',
        media: [
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Hari/hair3/party.webp`,
                alt: 'Side profile with florals'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Hari/hair3/party1.webp`,
                alt: 'Side profile with florals'
            },
            {
                type: 'video',
                src: `${import.meta.env.BASE_URL}portfolio/Hari/hair3/party-video.mp4`,
                autoplay: true,
                muted: true,
                loop: true
            }
        ],
        image: `${import.meta.env.BASE_URL}portfolio/Hari/hair3/party.webp`,
        thumbnailImage: `${import.meta.env.BASE_URL}portfolio/Hari/hair3/party.webp`,
        hairType: 'Fine, straight',
        length: 'Long',
        occasion: 'Wedding Party',
        modelName: 'Shreya Iyer',
        modelInstagram: 'https://instagram.com/_kalpan.aaaa',
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
            text: 'Open Hair with Minimalist design is perfect for my taste. Perfect for a night out!',
            author: 'Shreya',
            role: 'Client',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Loose Open Hair',
            content: 'Fine hair needs volume and texture. Use the free flow of hair with texturizing products for effortless, beachy look. Key is alternating curl direction for natural movement.'
        }
    },
    {
        id: 'hair-4',
        type: 'hair',
        title: 'Casual Collage Styles',
        category: 'Casual',
        region: 'gujarati',
        media: [
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio/Hari/hair4/casual.webp`,
                alt: 'Bridal updo front view'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio//Hari/hair4/casual1.webp`,
                alt: 'Side profile with florals'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio//Hari/hair4/casual2.webp`,
                alt: 'Side profile with florals'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio//Hari/hair4/casual3.webp`,
                alt: 'Side profile with florals'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio//Hari/hair4/casual4.webp`,
                alt: 'Side profile with florals'
            },
            {
                type: 'image',
                src: `${import.meta.env.BASE_URL}portfolio//Hari/hair4/casual5.webp`,
                alt: 'Side profile with florals'
            },

        ],
        thumbnail: `${import.meta.env.BASE_URL}portfolio/Hari/hair4/casual.webp`,
        image: `${import.meta.env.BASE_URL}portfolio/Hari/hair4/casual.webp`,
        thumbnailImage: `${import.meta.env.BASE_URL}portfolio/Hari/hair4/casual.webp`,
        hairType: 'Medium-thick, wavy',
        length: 'Long',
        occasion: 'Casual Event',
        modelName: 'Dummy Dolly',
        modelInstagram: 'https://instagram.com/_kalpan.aaaa',
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
            text: 'These are all my works For casual events on dummy doll Head.',
            author: 'Kalpana Verma',
            role: 'Makeup Artist',
            fadeOnScroll: true
        },
        caseStudy: {
            title: 'Casual Collage Styles Case Study',
            content: 'As the dummy dolls here are little bit rough Need to take care extensively with shampoo and conditioner for better smoothening and styling.'
        }
    },
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
    // {
    //     id: 'nails',
    //     label: 'Nails',
    //     data: nailDesigns,
    //     filters: filterCategories.nails
    // },
    // {
    //     id: 'eyes',
    //     label: 'Eyes',
    //     data: eyeLooks,
    //     filters: filterCategories.eyes
    // }
];

// ===== HELPER FUNCTIONS =====

/**
 * Get items filtered by category, filter, and region.
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

