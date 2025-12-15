import { useEffect } from 'react';

/**
 * Custom hook to implement soft section-settling behavior for mobile
 * When the next section crosses 50-60% of viewport height, gently settle it to top
 * Creates "guided storytelling scroll" effect - not hard snap scrolling
 */
export const useSectionSettling = () => {
  useEffect(() => {
    // Only apply on mobile (<768px)
    const isMobile = () => window.innerWidth < 768;

    if (!isMobile()) return;

    let ticking = false;
    const settlingThreshold = 0.55; // 55% of viewport height
    const smoothDuration = 600; // ms
    let startScrollTop = null;
    let animationStartTime = null;

    const getAllSections = () => {
      return Array.from(document.querySelectorAll('section[id]'));
    };

    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3);
    };

    const smoothScrollTo = (target) => {
      const currentScroll = window.scrollY;
      const difference = target - currentScroll;

      // Only settle if difference is meaningful (>20px) and downward movement
      if (Math.abs(difference) < 20 || difference < 0) return;

      startScrollTop = currentScroll;
      animationStartTime = null;

      const animate = (currentTime) => {
        if (animationStartTime === null) {
          animationStartTime = currentTime;
        }

        const elapsed = currentTime - animationStartTime;
        const progress = Math.min(elapsed / smoothDuration, 1);
        const easeProgress = easeOutCubic(progress);

        const newScroll = startScrollTop + difference * easeProgress;
        window.scrollTo(0, newScroll);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          ticking = false;
        }
      };

      requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (!isMobile()) return;

        const sections = getAllSections();
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const triggerPoint = viewportHeight * settlingThreshold;

        // Find the section that's crossing the trigger point
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top;

          // If next section is entering within trigger zone
          if (sectionTop > 0 && sectionTop < triggerPoint) {
            // Calculate scroll position to align section with top
            const targetScroll = scrollY + sectionTop - 80; // 80px offset for navbar
            smoothScrollTo(targetScroll);
            break;
          }
        }

        ticking = false;
      });
    };

    // Add scroll listener with passive flag for performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

