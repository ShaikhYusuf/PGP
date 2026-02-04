/* ============================================================================
   SCROLL REVEAL ANIMATION SYSTEM
   Triggers animations when elements enter viewport
   ============================================================================ */

(function () {
    'use strict';

    // Configuration
    const config = {
        threshold: 0.15, // Element must be 15% visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully visible
    };

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, config);

    // Observe all elements with .scroll-reveal class
    function observeElements() {
        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach(el => observer.observe(el));
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', observeElements);
    } else {
        observeElements();
    }

    // Re-observe if new elements are added dynamically
    window.observeScrollReveals = observeElements;

})();
