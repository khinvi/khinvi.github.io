// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// Initialize GLightbox for gallery
const lightbox = GLightbox({
  touchNavigation: true,
  loop: true,
  autoplayVideos: true
});

// DOM Elements
const body = document.body;
const mobileHeader = document.querySelector('.mobile-header');
const btnThemeDesktop = document.querySelector('#btn-theme-desktop');
const btnThemeMobile = document.querySelector('#btn-theme-mobile');
const btnThemeFixed = document.querySelector('#btn-theme-fixed');
const hamburgerMenu = document.querySelector('.header__main-ham-menu');
const smallMenu = document.querySelector('.header__sm-menu');
const scrollTopBtn = document.querySelector('.scroll-top-btn');
const skillLevelBars = document.querySelectorAll('.skills__item-level-bar');
const eduDetailsBtns = document.querySelectorAll('.education__details-btn');
const menuLinks = document.querySelectorAll('.side-nav__link, .header__sm-menu-link a');

// Theme Management
const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass);
  btnThemeDesktop.classList.remove('fa-moon', 'fa-sun');
  btnThemeMobile.classList.remove('fa-moon', 'fa-sun');
  if (btnThemeFixed) {
    btnThemeFixed.classList.remove('fa-moon', 'fa-sun');
    btnThemeFixed.classList.add(btnClass);
  }
  btnThemeDesktop.classList.add(btnClass);
  btnThemeMobile.classList.add(btnClass);
};

// Get theme from local storage or set default
const getThemeFromStorage = () => {
  const storedTheme = localStorage.getItem('portfolio-theme');
  const storedIcon = localStorage.getItem('portfolio-btn-theme');
  
  if (storedTheme && storedIcon) {
    addThemeClass(storedTheme, storedIcon);
  } else {
    // Default to light theme if no theme in storage
    setTheme('light', 'fa-moon');
  }
};

// Check if current theme is dark
const isDark = () => body.classList.contains('dark');

// Set theme and save to local storage
const setTheme = (bodyClass, btnClass) => {
  body.classList.remove('light', 'dark');
  
  addThemeClass(bodyClass, btnClass);
  
  localStorage.setItem('portfolio-theme', bodyClass);
  localStorage.setItem('portfolio-btn-theme', btnClass);
};

// loading between light and dark themes
const toggleTheme = () => {
  if (isDark()) {
    setTheme('light', 'fa-moon');
  } else {
    setTheme('dark', 'fa-sun');
  }
};

// Mobile Menu Toggle
const toggleMenu = () => {
  hamburgerMenu.classList.toggle('open');
  smallMenu.classList.toggle('open');
  
  // Disable scroll when menu is open
  if (smallMenu.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
};

// Handle scroll events
const handleScroll = () => {
  const currentScrollPos = window.pageYOffset;
  
  // Add/remove sticky class to header
  if (currentScrollPos > 50) {
    mobileHeader.classList.add('sticky');
  } else {
    mobileHeader.classList.remove('sticky');
  }
  
  // Show/hide scroll to top button
  if (currentScrollPos > 500) {
    scrollTopBtn.classList.add('active');
  } else {
    scrollTopBtn.classList.remove('active');
  }
  
  // Animate skill level bars when in viewport
  animateSkillBars();
};

// Animate skill level bars when they come into viewport
const animateSkillBars = () => {
  skillLevelBars.forEach(bar => {
    const barPos = bar.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;
    
    if (barPos < screenPos) {
      const level = bar.getAttribute('data-level');
      bar.style.width = `${level}%`;
    }
  });
};

// Toggle education courses
const toggleCourses = (e) => {
  const btn = e.currentTarget;
  const targetId = btn.getAttribute('data-target');
  const coursesElement = document.getElementById(targetId);
  
  btn.classList.toggle('active');
  coursesElement.classList.toggle('active');
  
  const isActive = btn.classList.contains('active');
  
  if (isActive) {
    btn.querySelector('i').classList.remove('fa-chevron-down');
    btn.querySelector('i').classList.add('fa-chevron-up');
  } else {
    btn.querySelector('i').classList.remove('fa-chevron-up');
    btn.querySelector('i').classList.add('fa-chevron-down');
  }
};

// Scroll to section
const scrollToSection = (e) => {
  e.preventDefault();
  
  const targetId = e.currentTarget.getAttribute('href');
  
  // If it's a link to the top
  if (targetId === '#' || targetId === '') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (smallMenu.classList.contains('open')) {
      toggleMenu();
    }
    
    return;
  }
  
  const targetSection = document.querySelector(targetId);
  
  if (targetSection) {
    // Close mobile menu if open
    if (smallMenu.classList.contains('open')) {
      toggleMenu();
    }
    
    const headerHeight = mobileHeader.offsetHeight;
    const targetPosition = targetSection.offsetTop - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};

// Scroll to top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Handle page preloading
const setupPreloader = () => {
  const preloader = document.createElement('div');
  preloader.classList.add('preloader');
  
  // Create loader animation
  const loader = document.createElement('div');
  loader.classList.add('loader');
  preloader.appendChild(loader);
  
  // Add preloader to body
  document.body.appendChild(preloader);
  
  // Hide preloader after page loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 1000);
  });
};

// Create dynamic shapes in the background
const createBackgroundShapes = () => {
  const heroSection = document.querySelector('.home-hero');
  const numShapes = 5;
  
  if (!heroSection) return;
  
  for (let i = 0; i < numShapes; i++) {
    const shape = document.createElement('div');
    shape.classList.add('bg-shape');
    
    // Random size between 50px and 200px
    const size = Math.random() * 150 + 50;
    
    // Random position within the hero section
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random rotation
    const rotation = Math.random() * 360;
    
    // Random opacity
    const opacity = Math.random() * 0.07 + 0.03;
    
    // Apply styles to the shape
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.left = `${posX}%`;
    shape.style.top = `${posY}%`;
    shape.style.transform = `rotate(${rotation}deg)`;
    shape.style.opacity = opacity;
    
    // Set background color based on theme
    shape.style.backgroundColor = 'var(--clr-primary)';
    
    // Append shape to the hero section
    heroSection.appendChild(shape);
    
    // Animate the shape
    animateShape(shape);
  }
};

// Animate shapes slowly
const animateShape = (shape) => {
  const duration = Math.random() * 50 + 30; // seconds
  const direction = Math.random() > 0.5 ? 1 : -1;
  
  shape.style.animation = `float ${duration}s infinite ease-in-out, rotate ${duration * 2}s infinite linear ${direction < 0 ? 'reverse' : ''}`;
};

// Add CSS for background shapes
const addBackgroundShapesStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .bg-shape {
      position: absolute;
      background-color: var(--clr-primary);
      border-radius: 50%;
      z-index: -1;
      filter: blur(50px);
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0) rotate(0);
      }
      50% {
        transform: translateY(-20px) rotate(10deg);
      }
    }
    
    @keyframes rotate {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;
  
  document.head.appendChild(style);
};

// Enhanced fullscreen gallery positioning
const enhanceGalleryFullscreen = () => {
  const fullscreenView = document.querySelector('.gallery__fullscreen');
  const fullscreenImg = document.querySelector('.gallery__fullscreen-img');
  
  if (fullscreenImg) {
    // Center the image by default
    fullscreenImg.style.margin = '0 auto';
    
    // Adjust image orientation based on dimensions
    fullscreenImg.addEventListener('load', () => {
      // Reset styles
      fullscreenImg.style.maxWidth = '100%';
      fullscreenImg.style.maxHeight = '90vh';
      
      // Center the image
      fullscreenImg.style.margin = '0 auto';
    });
  }
};

// Travel Gallery Functionality - 60-image gallery implementation (optimized for performance)
const initGallery = () => {
  // DOM elements
  const gridContainer = document.querySelector('.gallery__grid-container');
  const randomButton = document.querySelector('.gallery__random-btn');
  const loadingElement = document.querySelector('.gallery__loading');
  
  // Image array with travel images
  const travelImages = [
    'travel-images/IMG_7428.jpg',
    'travel-images/3092FFB1-5FDE-4AA9-8D31-BF1A53290291.jpg',
    'travel-images/A4354952-2B24-4141-90CE-1FD091E12395.jpg',
    'travel-images/E69D841A-A2B0-4DAC-9FE3-1333A063D448.jpg',
    'travel-images/IMG_1825.jpg',
    'travel-images/IMG_1855.JPG',
    'travel-images/IMG_1857.JPG',
    'travel-images/IMG_1902.jpg',
    'travel-images/IMG_2049.jpg',
    'travel-images/IMG_2126.jpg',
    'travel-images/IMG_2198.jpg',
    'travel-images/IMG_2207.jpg',
    'travel-images/IMG_2227.jpg',
    'travel-images/IMG_2316.JPG',
    'travel-images/IMG_2319 2.jpg',
    'travel-images/IMG_2409.jpg',
    'travel-images/IMG_4036.jpg',
    'travel-images/IMG_4146.jpg',
    'travel-images/IMG_5154.jpg',
    'travel-images/IMG_5172.jpg',
    'travel-images/IMG_5304 2.JPG',
    'travel-images/IMG_5308.jpg',
    'travel-images/IMG_5352.jpg',
    'travel-images/IMG_5377.jpg',
    'travel-images/IMG_5432.jpg',
    'travel-images/IMG_5451.jpg',
    'travel-images/IMG_5509.jpg',
    'travel-images/IMG_5518.jpg',
    'travel-images/IMG_5553.jpg',
    'travel-images/IMG_5871.jpg',
    'travel-images/IMG_7307.jpg',
    'travel-images/IMG_7438.JPG',
    'travel-images/IMG_7448.jpg',
    'travel-images/IMG_7456.jpg',
    'travel-images/IMG_7463.jpg',
    'travel-images/IMG_7471.jpg',
    'travel-images/IMG_7528.jpg',
    'travel-images/IMG_7532.jpg',
    'travel-images/IMG_7571.jpg',
    'travel-images/IMG_7584.jpg',
    'travel-images/IMG_7592.jpg',
    'travel-images/IMG_7611.jpg',
    'travel-images/IMG_7614.jpg',
    'travel-images/IMG_7620.jpg',
    'travel-images/IMG_7803.JPG',
    'travel-images/IMG_8009 2.JPG',
    'travel-images/IMG_8029 3.JPG',
    'travel-images/IMG_8173.JPG',
    'travel-images/IMG_8261 4.JPG',
    'travel-images/IMG_8370.JPG',
    'travel-images/IMG_8397.JPG',
    'travel-images/IMG_8428.JPG',
    'travel-images/IMG_8528.JPG',
    'travel-images/IMG_8745 4.JPG',
    'travel-images/IMG_8750.JPG',
    'travel-images/IMG_8839 2.JPG',
    'travel-images/IMG_8870 2.JPG',
    'travel-images/IMG_7605.jpg',
    'travel-images/IMG_8989 3.JPG',
    'travel-images/IMG_9072.JPG'
  ];
  
  
  // Shuffle images by default
  let currentImages = [...travelImages];
  shuffleArray(currentImages);
  
  // Track loading progress
  let loadedCount = 0;
  const totalToLoad = currentImages.length;
  
  // Performance optimization: batch loading
  const loadImagesInBatches = () => {
    // Show loading indicator
    if (loadingElement) {
      loadingElement.style.display = 'flex';
      loadingElement.style.opacity = '1';
    }
    
    // Clear grid container
    gridContainer.innerHTML = '';
    
    // Reset loaded count
    loadedCount = 0;
    
    // Function to actually load images
    const loadNextBatch = (startIndex, totalImages) => {
      const batchSize = 20; // Load 20 images at a time
      const endIndex = Math.min(startIndex + batchSize, totalImages);
      
      // Add images to grid
      for (let i = startIndex; i < endIndex; i++) {
        createGridItem(i);
      }
      
      // If more images to load, schedule next batch
      if (endIndex < totalImages) {
        setTimeout(() => {
          loadNextBatch(endIndex, totalImages);
        }, 100); // Small delay to prevent UI blocking
      }
    };
    
    // Start loading first batch
    loadNextBatch(0, totalToLoad);
  };
  
  // Create a grid item for an image
  const createGridItem = (index) => {
    const gridItem = document.createElement('div');
    gridItem.className = 'gallery__grid-item';
    
    const img = document.createElement('img');
    img.src = currentImages[index];
    img.alt = `Travel photo ${index + 1}`;
    img.loading = 'lazy'; // Use native lazy loading
    
    // Handle load event
    img.onload = () => {
      loadedCount++;
      checkLoadingComplete();
    };
    
    // Handle error event
    img.onerror = () => {
      gridItem.classList.add('gallery__grid-item--error');
      img.remove();
      loadedCount++; // Count as loaded even though it failed
      checkLoadingComplete();
    };
    
    gridItem.appendChild(img);
    gridContainer.appendChild(gridItem);
  };
  
  // Check if all images are loaded
  const checkLoadingComplete = () => {
    if (loadedCount >= totalToLoad) {
      // All images loaded, hide the loading indicator
      if (loadingElement) {
        loadingElement.style.opacity = '0';
        setTimeout(() => {
          loadingElement.style.display = 'none';
        }, 300);
      }
    } else if (loadedCount > 0 && loadedCount >= totalToLoad / 2) {
      // When half the images are loaded, start fading the loader
      if (loadingElement) {
        loadingElement.style.opacity = '0.3';
      }
    }
  };
  
  // Initialize gallery
  loadImagesInBatches();
  
  // Handle shuffle button click
  if (randomButton) {
    randomButton.addEventListener('click', () => {
      // Reshuffle images
      shuffleArray(currentImages);
      
      // Reload gallery
      loadImagesInBatches();
    });
  }
};

// Helper function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Helper function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Helper function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Helper function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Helper function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Check if WebP is supported
function checkWebPSupport() {
  const elem = document.createElement('canvas');
  if (elem.getContext && elem.getContext('2d')) {
    // Was able or not to get WebP representation
    return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
  }
  return false;
}

// Helper function to shuffle array (same as your original)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Add CSS variables for primary color RGB values
const setupColorRGB = () => {
  const root = document.documentElement;
  const primaryColor = getComputedStyle(root).getPropertyValue('--clr-primary-light').trim();
  
  // Convert hex to RGB for use in rgba() values
  const rgb = hexToRgb(primaryColor);
  if (rgb) {
    root.style.setProperty('--clr-primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  }
  
  // Handle theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && document.body.classList.contains('dark')) {
        const darkPrimaryColor = getComputedStyle(root).getPropertyValue('--clr-primary-dark').trim();
        const rgb = hexToRgb(darkPrimaryColor);
        if (rgb) {
          root.style.setProperty('--clr-primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
        }
      } else if (mutation.attributeName === 'class' && !document.body.classList.contains('dark')) {
        const lightPrimaryColor = getComputedStyle(root).getPropertyValue('--clr-primary-light').trim();
        const rgb = hexToRgb(lightPrimaryColor);
        if (rgb) {
          root.style.setProperty('--clr-primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
        }
      }
    });
  });
  
  observer.observe(document.body, { attributes: true });
};

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert shorthand hex to full hex
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return { r, g, b };
}

// Helper function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  getThemeFromStorage();
  
  // Add event listeners
  btnThemeDesktop.addEventListener('click', toggleTheme);
  btnThemeMobile.addEventListener('click', toggleTheme);
  if (btnThemeFixed) {
    btnThemeFixed.addEventListener('click', toggleTheme);
  }
  hamburgerMenu.addEventListener('click', toggleMenu);
  scrollTopBtn.addEventListener('click', scrollToTop);
  
  // Education course toggles
  eduDetailsBtns.forEach(btn => {
    btn.addEventListener('click', toggleCourses);
  });
  
  // Navigation links
  menuLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
  });
  
  // Initialize fancy effects
  setupPreloader();
  setupColorRGB();
  createBackgroundShapes();
  addBackgroundShapesStyles();
  
  // Initialize gallery with enhancements
  initGallery();
  enhanceGalleryFullscreen();
  
  // Change "Hobby Projects" to "Notable Projects"
  const projectCategories = document.querySelectorAll('.projects__category-title');
  projectCategories.forEach(title => {
    if (title.textContent === 'Hobby Projects') {
      title.textContent = 'Notable Projects';
    }
  });
});

// Use original scroll handler
window.addEventListener('scroll', handleScroll);

// Handle resizing
window.addEventListener('resize', () => {
  // Recalculate skill bars animation
  animateSkillBars();
  
  // Re-enhance gallery fullscreen
  enhanceGalleryFullscreen();
});