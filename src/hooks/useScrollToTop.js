import { useEffect } from 'react';

/**
 * Custom hook to ensure the page always scrolls to the top on mount
 * Handles multiple edge cases and browser quirks
 */
export const useScrollToTop = () => {
  useEffect(() => {
    // Add initial-load class to prevent smooth scrolling during page load
    document.documentElement.classList.add('initial-load');
    document.body.classList.add('initial-load');

    // Disable browser automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Helper function to scroll to top
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Scroll to top immediately
    scrollToTop();

    // Use requestAnimationFrame for smooth execution
    const rafId = requestAnimationFrame(() => {
      scrollToTop();
    });

    // Multiple setTimeout fallbacks for various timing scenarios
    const timeouts = [
      setTimeout(scrollToTop, 0),
      setTimeout(scrollToTop, 50),
      setTimeout(scrollToTop, 100),
      setTimeout(scrollToTop, 150),
      setTimeout(scrollToTop, 200),
      // Remove initial-load class after all scroll attempts
      setTimeout(() => {
        document.documentElement.classList.remove('initial-load');
        document.body.classList.remove('initial-load');
        scrollToTop();
      }, 300),
    ];

    // Handle window load event
    const handleWindowLoad = () => {
      scrollToTop();
      // Ensure classes are removed
      setTimeout(() => {
        document.documentElement.classList.remove('initial-load');
        document.body.classList.remove('initial-load');
      }, 100);
    };

    window.addEventListener('load', handleWindowLoad);

    // Handle beforeunload to reset scroll position
    const handleBeforeUnload = () => {
      scrollToTop();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      timeouts.forEach(timeout => clearTimeout(timeout));
      window.removeEventListener('load', handleWindowLoad);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.documentElement.classList.remove('initial-load');
      document.body.classList.remove('initial-load');
    };
  }, []);
};

export default useScrollToTop;

