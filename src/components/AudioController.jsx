import React, { useState, useEffect, useRef } from 'react';
import { audioConfig } from '../config/audioConfig';
import './AudioController.css';

/**
 * AUDIO CONTROLLER COMPONENT
 *
 * Manages background ambient music with user interaction.
 *
 * Behavior:
 * 1. Button appears ONLY after user scrolls (delayed entrance)
 * 2. Music does NOT autoplay (browser policy compliance)
 * 3. First click ANYWHERE on page starts music automatically
 * 4. After first click, button can toggle play/pause
 * 5. Respects reduced-motion preferences
 *
 * State Flow:
 * - hasScrolled: false → User scrolls → Button appears
 * - hasInteracted: false → User clicks anywhere → Music plays
 * - isPlaying: true → User clicks button → Music pauses/resumes
 */
const AudioController = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const audioRef = useRef(null);
    const fadeIntervalRef = useRef(null);

    /**
     * Check for reduced motion preference
     */
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    /**
     * Scroll detection - shows button after user scrolls
     * Button appears with delay to avoid instant popup
     * Music does NOT autoplay (user must click button)
     */
    useEffect(() => {
        if (hasScrolled) return; // Already triggered

        const handleScroll = () => {
            if (!hasScrolled) {
                setHasScrolled(true);

                // Show button after user has scrolled (delayed entrance)
                // This gives user time to see content before button appears
                setTimeout(() => {
                    setIsVisible(true);
                }, 1500); // 1.5 second delay after first scroll

                // Remove listener after first trigger
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasScrolled]);

    /**
     * Global click detection - starts music on first click anywhere
     * After button appears, ANY click on the page will start music
     * This provides easier activation (not limited to small button)
     */
    useEffect(() => {
        if (hasInteracted || !isVisible) return; // Already played or button not visible yet

        const handleFirstClick = (e) => {
            // Don't trigger if clicking the audio button itself
            // (let the button's onClick handle that)
            if (e.target.closest('.audio-controller')) {
                return;
            }

            // First click anywhere on page starts music
            if (!hasInteracted && !isPlaying) {
                setHasInteracted(true);
                fadeIn();

                // Remove listener after first interaction
                document.removeEventListener('click', handleFirstClick);
            }
        };

        document.addEventListener('click', handleFirstClick);

        return () => {
            document.removeEventListener('click', handleFirstClick);
        };
    }, [hasInteracted, isVisible, isPlaying]);

    /**
     * Initialize audio element
     */
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0; // Start at 0 for fade in
        audio.loop = audioConfig.loopEnabled;

        // Log audio path for debugging
        console.log('🎵 Audio path:', audioConfig.audioSrc);

        // Handle audio load errors
        const handleError = () => {
            console.warn('⚠️ Audio file not found:', audioConfig.audioSrc);
            console.warn('To enable music, place your audio file in: /public/audio/ambient-koto.mp3');
        };

        audio.addEventListener('error', handleError);

        // Cleanup on unmount
        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
                audio.removeEventListener('error', handleError);
            }
            if (fadeIntervalRef.current) {
                clearInterval(fadeIntervalRef.current);
            }
        };
    }, []);

    /**
     * Fade in audio smoothly
     * Handles browser autoplay policies gracefully
     */
    const fadeIn = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        const startVolume = 0;
        const targetVolume = audioConfig.defaultVolume;
        const duration = audioConfig.fadeInDuration;
        const steps = 50;
        const stepDuration = duration / steps;
        const volumeIncrement = targetVolume / steps;

        audio.volume = startVolume;

        try {
            // Try to play - this requires user interaction
            await audio.play();

            // Start fade in animation
            let currentStep = 0;
            fadeIntervalRef.current = setInterval(() => {
                currentStep++;
                audio.volume = Math.min(startVolume + (volumeIncrement * currentStep), targetVolume);

                if (currentStep >= steps) {
                    clearInterval(fadeIntervalRef.current);
                }
            }, stepDuration);

            setIsPlaying(true);
            setIsPlaying(true);
        } catch {
            // Browser blocked autoplay - this is expected
            // User needs to click the button to start music
            console.log('🎵 Audio ready - click button to start music');
            setIsPlaying(false);
        }
    };

    /**
     * Fade out audio smoothly
     */
    const fadeOut = () => {
        const audio = audioRef.current;
        if (!audio) return;

        const startVolume = audio.volume;
        const duration = audioConfig.fadeOutDuration;
        const steps = 30;
        const stepDuration = duration / steps;
        const volumeDecrement = startVolume / steps;

        let currentStep = 0;
        fadeIntervalRef.current = setInterval(() => {
            currentStep++;
            audio.volume = Math.max(startVolume - (volumeDecrement * currentStep), 0);

            if (currentStep >= steps) {
                clearInterval(fadeIntervalRef.current);
                audio.pause();
            }
        }, stepDuration);

        setIsPlaying(false);
    };

    /**
     * Toggle play/pause
     * Called when user clicks the audio button
     */
    const togglePlayback = () => {
        // Mark as interacted (removes global click listener)
        if (!hasInteracted) {
            setHasInteracted(true);
        }

        // Toggle playback state
        if (isPlaying) {
            fadeOut();
        } else {
            fadeIn();
        }
    };

    return (
        <>
            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                src={audioConfig.audioSrc}
                preload="auto"
                style={{ display: 'none' }}
            />

            {/* Floating music control button - appears ONLY after scroll */}
            {isVisible && (
                <button
                    className="audio-controller"
                    onClick={togglePlayback}
                    aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
                    title={isPlaying ? 'Pause music' : 'Play music'}
                >
                    {/* Animated equalizer bars */}
                    <div className={`equalizer ${isPlaying ? 'playing' : 'paused'} ${prefersReducedMotion ? 'no-animation' : ''}`}>
                        <div className="bar bar-1"></div>
                        <div className="bar bar-2"></div>
                        <div className="bar bar-3"></div>
                        <div className="bar bar-4"></div>
                    </div>
                </button>
            )}
        </>
    );
};

export default AudioController;

