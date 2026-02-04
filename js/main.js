/**
 * POPULAR GLASS PRINTERS - Main JavaScript
 * Premium B2B Website Functionality
 */

// ============================================================================
// NAVIGATION - Sticky Header with Scroll Behavior
// ============================================================================

class Navigation {
  constructor() {
    this.header = document.querySelector('.header');
    this.menuToggle = document.querySelector('.header__menu-toggle');
    this.nav = document.querySelector('.header__nav');
    this.navLinks = document.querySelectorAll('.header__nav-link');

    this.init();
  }

  init() {
    // Scroll behavior
    window.addEventListener('scroll', () => this.handleScroll());

    // Mobile menu toggle
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Smooth scroll to sections
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });

    // Close mobile menu on link click
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => this.handleOutsideClick(e));

    // Close mobile menu with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.nav.classList.contains('header__nav--open')) {
        this.closeMobileMenu();
      }
    });

    // Active section highlighting
    window.addEventListener('scroll', () => this.highlightActiveSection());
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.header.classList.add('header--scrolled');
    } else {
      this.header.classList.remove('header--scrolled');
    }
  }

  toggleMobileMenu() {
    this.menuToggle.classList.toggle('header__menu-toggle--active');
    this.nav.classList.toggle('header__nav--open');

    // Prevent body scroll when menu is open
    document.body.style.overflow =
      this.nav.classList.contains('header__nav--open') ? 'hidden' : '';
  }

  closeMobileMenu() {
    if (this.menuToggle) {
      this.menuToggle.classList.remove('header__menu-toggle--active');
    }
    this.nav.classList.remove('header__nav--open');
    document.body.style.overflow = '';
  }

  handleOutsideClick(e) {
    // Only handle clicks when mobile menu is open
    if (!this.nav.classList.contains('header__nav--open')) {
      return;
    }

    // Check if click is outside nav and toggle button
    const isClickInsideNav = this.nav.contains(e.target);
    const isClickOnToggle = this.menuToggle && this.menuToggle.contains(e.target);

    if (!isClickInsideNav && !isClickOnToggle) {
      this.closeMobileMenu();
    }
  }

  handleNavClick(e) {
    const href = e.currentTarget.getAttribute('href');

    // Only handle hash links (same-page navigation)
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerHeight = this.header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }

  highlightActiveSection() {
    const scrollPos = window.scrollY + 100; // Offset for header

    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const section = document.getElementById(targetId);

        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            link.classList.add('header__nav-link--active');
          } else {
            link.classList.remove('header__nav-link--active');
          }
        }
      }
    });
  }
}

// ============================================================================
// PORTFOLIO FILTERING
// ============================================================================

class PortfolioFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('[data-filter]');
    this.portfolioItems = document.querySelectorAll('[data-category]');

    if (this.filterButtons.length > 0) {
      this.init();
    }
  }

  init() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => this.handleFilter(e));
    });
  }

  handleFilter(e) {
    const filterValue = e.currentTarget.getAttribute('data-filter');

    // Update active button
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');

    // Filter portfolio items
    this.portfolioItems.forEach(item => {
      const categories = item.getAttribute('data-category').split(' ');

      if (filterValue === 'all' || categories.includes(filterValue)) {
        item.style.display = 'block';
        item.classList.add('animate-fade-in');
      } else {
        item.style.display = 'none';
      }
    });
  }
}

// ============================================================================
// FORM VALIDATION
// ============================================================================

class FormValidator {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);

    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Real-time validation
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let isValid = true;
    const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Get form values
      const fullName = this.form.querySelector('#fullName')?.value || '';
      const email = this.form.querySelector('#email')?.value || '';
      const company = this.form.querySelector('#company')?.value || '';
      const phone = this.form.querySelector('#phone')?.value || 'Not provided';
      const service = this.form.querySelector('#service')?.value || '';
      const message = this.form.querySelector('#message')?.value || '';

      // Create professional email
      const subject = encodeURIComponent(`Business Inquiry: ${service} - ${company}`);
      const body = encodeURIComponent(
        `NEW BUSINESS INQUIRY - POPULAR GLASS PRINTERS\n` +
        `============================================\n\n` +
        `CONTACT INFORMATION:\n` +
        `-------------------\n` +
        `Name: ${fullName}\n` +
        `Company: ${company}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n\n` +
        `SERVICE INTEREST:\n` +
        `----------------\n` +
        `${service}\n\n` +
        `PROJECT DETAILS:\n` +
        `---------------\n` +
        `${message}\n\n` +
        `---\n` +
        `This inquiry was submitted via the Popular Glass Printers website.\n` +
        `Please respond within 24 business hours.`
      );

      // Open mailto
      window.location.href = `mailto:popularglassprinters@hotmail.com?subject=${subject}&body=${body}`;

      // Reset form
      setTimeout(() => {
        this.form.reset();
      }, 1000);
    }
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';

    // Required field check
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (fieldType === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation (basic)
    if (fieldType === 'tel' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    this.showFieldError(field, isValid, errorMessage);
    return isValid;
  }

  showFieldError(field, isValid, message) {
    // Remove existing error
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }

    if (!isValid) {
      field.style.borderColor = 'var(--color-error)';

      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.textContent = message;
      errorDiv.style.color = 'var(--color-error)';
      errorDiv.style.fontSize = 'var(--text-sm)';
      errorDiv.style.marginTop = 'var(--space-2)';

      field.parentElement.appendChild(errorDiv);
    } else {
      field.style.borderColor = 'var(--color-gray-soft)';
    }
  }

  showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
      <p style="color: var(--color-success); font-weight: var(--font-semibold); margin-top: var(--space-4);">
        Thank you for your inquiry! We'll respond within 24 business hours.
      </p>
    `;

    this.form.appendChild(successDiv);
    this.form.reset();

    // Remove success message after 5 seconds
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }
}

// ============================================================================
// LAZY LOADING IMAGES
// ============================================================================

class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
      this.initIntersectionObserver();
    } else {
      this.loadAllImages();
    }
  }

  initIntersectionObserver() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    this.images.forEach(img => imageObserver.observe(img));
  }

  loadAllImages() {
    this.images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('[data-animate]');

    if (this.elements.length > 0 && 'IntersectionObserver' in window) {
      this.init();
    }
  }

  init() {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          animationObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    this.elements.forEach(el => animationObserver.observe(el));
  }
}

// ============================================================================
// ANALYTICS EVENT TRACKING (Hooks for Future Integration)
// ============================================================================

class Analytics {
  static trackEvent(category, action, label = '') {
    // Hook for Google Analytics 4 or other analytics


    // In production with GA4:
    // if (window.gtag) {
    //   gtag('event', action, {
    //     'event_category': category,
    //     'event_label': label
    //   });
    // }
  }

  static trackCTA(ctaName) {
    this.trackEvent('CTA', 'click', ctaName);
  }

  static trackDownload(fileName) {
    this.trackEvent('Download', 'click', fileName);
  }

  static trackFormSubmit(formName) {
    this.trackEvent('Form', 'submit', formName);
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  new Navigation();

  // Track CTA clicks
  document.querySelectorAll('.btn--primary, .btn--primary-dark').forEach(btn => {
    btn.addEventListener('click', () => {
      const ctaText = btn.textContent.trim();
      Analytics.trackCTA(ctaText);
    });
  });

  // Track download links
  document.querySelectorAll('a[href$=".pdf"], a[download]').forEach(link => {
    link.addEventListener('click', () => {
      const fileName = link.getAttribute('href') || link.getAttribute('download');
      Analytics.trackDownload(fileName);
    });
  });


});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth scroll to element (alternative to native smooth scroll for older browsers)
function smoothScrollTo(targetPosition, duration = 600) {
  const start = window.pageYOffset;
  const distance = targetPosition - start;
  const startTime = performance.now();

  function animation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function
    const easeInOutCubic = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, start + distance * easeInOutCubic);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}
