/**
 * Portfolio Filter Functionality
 * Filters portfolio items by service type
 */

(function () {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function () {


        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const portfolioGrid = document.getElementById('portfolioGrid');
        const noResults = document.getElementById('noResults');

        // Filter function
        function filterPortfolio(filterValue) {
            let visibleCount = 0;

            portfolioItems.forEach(function (item) {
                const itemService = item.getAttribute('data-service');

                if (filterValue === 'all' || itemService === filterValue) {
                    // Show item with fade-in animation
                    item.style.display = 'block';
                    // Trigger reflow for animation
                    item.offsetHeight;
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';

                    // Animate in
                    setTimeout(function () {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);

                    visibleCount++;
                } else {
                    // Hide item with fade-out animation
                    item.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';

                    setTimeout(function () {
                        item.style.display = 'none';
                    }, 200);
                }
            });

            // Show/hide "no results" message
            if (visibleCount === 0) {
                noResults.style.display = 'block';
                portfolioGrid.style.display = 'none';
            } else {
                noResults.style.display = 'none';
                portfolioGrid.style.display = 'grid';
            }
        }

        // Add click event to all filter buttons
        filterButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                // Remove active class from all buttons
                filterButtons.forEach(function (btn) {
                    btn.classList.remove('filter-btn--active');
                });

                // Add active class to clicked button
                this.classList.add('filter-btn--active');

                // Get filter value
                const filterValue = this.getAttribute('data-filter');


                // Filter portfolio items
                filterPortfolio(filterValue);
            });
        });

        // Reset filters function (accessible globally)
        window.resetFilters = function () {
            // Click the "All Projects" button
            const allButton = document.querySelector('[data-filter="all"]');
            if (allButton) {
                allButton.click();
            }
        };


    });
})();
