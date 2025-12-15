/**
 * TEST PLACEHOLDER IMAGES
 *
 * These are temporary placeholder images used for testing the mobile carousel system.
 * Purpose: Validate swipe, skew, z-index, and overlap behavior
 *
 * Aspect Ratio: 4:5 (consistent across all)
 * Format: JPG/PNG from public sources
 *
 * How to replace:
 * 1. Export these URLs to your About.jsx
 * 2. Use them in mobilePhotos array for testing
 * 3. Replace with actual Kalpana images when ready
 */

export const TEST_PLACEHOLDER_IMAGES = [
    // Placeholder 1: Portrait style
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',

    // Placeholder 2: Professional portrait
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',

    // Placeholder 3: Makeup/Beauty related
    'https://images.unsplash.com/photo-1539571696357-5a69c006ae90?w=400&h=500&fit=crop',

    // Placeholder 4: Artistic portrait
    'https://images.unsplash.com/photo-1501196354995-991a7e7f81b1?w=400&h=500&fit=crop',

    // Placeholder 5: Studio style
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',

    // Placeholder 6: Professional headshot
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',

    // Placeholder 7: Additional
    'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=400&h=500&fit=crop',

    // Placeholder 8: Additional
    'https://images.unsplash.com/photo-1494760900919-aad179e17070?w=400&h=500&fit=crop',

    // Placeholder 9: Additional
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',

    // Placeholder 10: Additional
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
];

/**
 * USAGE IN About.jsx:
 *
 * 1. Import at top:
 *    import { TEST_PLACEHOLDER_IMAGES } from './testPlaceholders';
 *
 * 2. For testing mobile carousel:
 *    const mobilePhotos = TEST_PLACEHOLDER_IMAGES.slice(0, 6);
 *
 * 3. For testing with your real images, revert to original:
 *    const mobilePhotos = [
 *        `${import.meta.env.BASE_URL}Kalpana-About.png`,
 *        // ... etc
 *    ];
 *
 * TESTING CHECKLIST:
 * ✓ Swipe left/right - images should change
 * ✓ Center image - always visible, no skew, opacity 1.0
 * ✓ Adjacent images - subtle hints, skewed, opacity 0.4
 * ✓ NO click interaction - only swipe changes images
 * ✓ NO scroll interaction - scrolling doesn't change images
 * ✓ Smooth transitions - no jumpy/jerky animation
 * ✓ Z-index - secondary images behind primary
 * ✓ Pointer events - only primary image responds to touch
 */

