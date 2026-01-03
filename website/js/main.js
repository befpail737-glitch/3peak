/* 
 * 3peak Website JavaScript
 * Modern interactive features for the website
 */

// DOM Content Loaded event
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initStickyHeader();
  initSmoothScrolling();
  initCardHoverEffects();
  initSearchFunctionality();
  initAccessibilityFeatures();
});

// Sticky header on scroll
function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down - hide header
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up - show header
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
}

// Enhanced card hover effects
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.solution-item, .value-item, .resource-item, .support-item');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// Enhanced search functionality
function initSearchFunctionality() {
  const searchInput = document.getElementById('resource-search');
  const searchButton = document.getElementById('search-button');
  
  if (searchInput && searchButton) {
    // Handle search button click
    searchButton.addEventListener('click', performSearch);
    
    // Handle Enter key in search input
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
  
  function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
      // In a real implementation, this would filter resources
      // For now, we'll just show an alert
      console.log('Searching for: ', searchTerm);
      // Here we would typically filter the content based on search term
    }
  }
}

// Accessibility improvements
function initAccessibilityFeatures() {
  // Add keyboard support for interactive elements
  const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
  
  buttons.forEach(button => {
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // Ensure focus management for accessibility
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  
  // Add visual focus indicators
  focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
      this.classList.add('focused');
    });
    
    element.addEventListener('blur', function() {
      this.classList.remove('focused');
    });
  });
}

// Mobile menu toggle (if needed)
function initMobileMenu() {
  // This would be implemented if a mobile menu exists
  // In the current HTML, it appears navigation is already responsive via CSS
}

// Animation on scroll for elements
function initScrollAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate on scroll
  document.querySelectorAll('.solution-item, .value-item, .resource-item, .support-item').forEach(el => {
    observer.observe(el);
  });
}

// Initialize scroll animations after other content loads
window.addEventListener('load', initScrollAnimations);