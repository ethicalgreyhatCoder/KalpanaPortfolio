// ========================================
// AUDIO CONFIGURATION
// Background ambient music settings
// ========================================

/**
 * Get audio file path that works in both development and production
 * Uses Vite's BASE_URL to handle GitHub Pages deployment
 */
const getAudioPath = () => {
    // In Vite, import.meta.env.BASE_URL gives us the correct base path
    // Development: '/'
    // GitHub Pages: '/repository-name/'
    const basePath = import.meta.env.BASE_URL || '/';
    return `${basePath}audio/ambient-koto.mp3`;
};

export const audioConfig = {
    // Audio file path (auto-adjusts for dev/production)
    // For local: /audio/ambient-koto.mp3
    // For GitHub Pages: /repo-name/audio/ambient-koto.mp3
    audioSrc: getAudioPath(),

    // Audio settings
    defaultVolume: 0.12, // 12% volume (very subtle)
    fadeInDuration: 2000, // 2 seconds fade in
    fadeOutDuration: 1500, // 1.5 seconds fade out

    // Music characteristics (for documentation)
    style: 'Japanese Koto-inspired ambient',
    tempo: '60-80 BPM',
    characteristics: 'Calm, elegant, minimal, no vocals',

    // User experience
    autoplayEnabled: false, // Never autoplay (browser policy compliance)
    requireUserClick: true, // User must click button to start music
    loopEnabled: true // Seamless loop
};

/**
 * AUDIO FILE NOTES:
 *
 * For production, replace '/audio/ambient-koto.mp3' with:
 *
 * 1. Royalty-free options:
 *    - Epidemic Sound
 *    - AudioJungle
 *    - Artlist
 *
 * 2. Search terms:
 *    - "Japanese Koto ambient"
 *    - "Zen meditation music"
 *    - "Cherry blossom background music"
 *    - "Minimal Asian instrumental"
 *
 * 3. Requirements:
 *    - 60-80 BPM
 *    - No vocals
 *    - Seamless loop
 *    - MP3 format (best compatibility)
 *    - Under 5MB file size
 *
 * 4. Placeholder:
 *    Use a silent audio file or generated tone for testing
 */

