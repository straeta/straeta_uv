'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});



/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function(currentSlider) {

  const sldierContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sldierContainer.style.transform = `translateX(-${sldierContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  /**
   * NEXT SLIDE
   */

  const slideNext = function () {
    const slideEnd = currentSlidePos >= sldierContainer.childElementCount - 1;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */

   const slidePrev = function () {

    if (currentSlidePos <= 0) {
      currentSlidePos = sldierContainer.childElementCount - 1;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = sldierContainer.childElementCount <= 1;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = "none";
    sliderPrevBtn.style.display = "none";
  }

}

for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }



/**
 * ACCORDION
 */

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion = accordions[0];

const initAccordion = function (currentAccordion) {

  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

  const expandAccordion = function () {
    if (lastActiveAccordion && lastActiveAccordion !== currentAccordion) {
      lastActiveAccordion.classList.remove("expanded");
    }

    currentAccordion.classList.toggle("expanded");

    lastActiveAccordion = currentAccordion;
  }

  accordionBtn.addEventListener("click", expandAccordion);

}

for (let i = 0, len = accordions.length; i < len; i++) { initAccordion(accordions[i]); }

/**
 * PRICING TOGGLE
 */
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('pricingToggle');
  const standardPlans = document.getElementById('standardPlans');
  const premiumPlans = document.getElementById('premiumPlans');
  const standardLabel = document.querySelector('.toggle-label.standard');
  const premiumLabel = document.querySelector('.toggle-label.premium');

  // Initial state
  if (standardPlans && premiumPlans) {
    standardPlans.style.display = 'grid';
    premiumPlans.style.display = 'none';
  }

  if (toggle) {
    toggle.addEventListener('change', function() {
      if (this.checked) {
        // Show Premium Plans
        standardPlans.style.display = 'none';
        premiumPlans.style.display = 'grid';
        
        // Update labels
        standardLabel.style.color = 'var(--charcoal)';
        standardLabel.style.opacity = '0.7';
        premiumLabel.style.color = 'var(--violet-blue-crayola)';
        premiumLabel.style.opacity = '1';
      } else {
        // Show Standard Plans
        standardPlans.style.display = 'grid';
        premiumPlans.style.display = 'none';
        
        // Update labels
        standardLabel.style.color = 'var(--violet-blue-crayola)';
        standardLabel.style.opacity = '1';
        premiumLabel.style.color = 'var(--charcoal)';
        premiumLabel.style.opacity = '0.7';
      }
    });
  }
});

// Process Carousel
const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const items = carousel.querySelectorAll('.carousel-item');
  const indicators = carousel.querySelectorAll('.indicator');
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');
  let currentSlide = 0;

  const showSlide = (index) => {
    items.forEach(item => item.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    items[index].classList.add('active');
    indicators[index].classList.add('active');
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % items.length;
    showSlide(currentSlide);
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + items.length) % items.length;
    showSlide(currentSlide);
  };

  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto advance slides every 5 seconds
  setInterval(nextSlide, 5000);
}

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
  const faqCards = document.querySelectorAll('.faq-card');

  faqCards.forEach(card => {
    const button = card.querySelector('.faq-button');
    const content = card.querySelector('.faq-content');

    button.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      
      // Close all cards
      faqCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('active');
          const otherContent = otherCard.querySelector('.faq-content');
          otherContent.style.height = '0';
        }
      });

      // Toggle current card
      if (!isActive) {
        card.classList.add('active');
        content.style.height = content.scrollHeight + 'px';
      } else {
        card.classList.remove('active');
        content.style.height = '0';
      }
    });
  });
});


