// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false
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

// Toggle between light and dark themes
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
  
  // If it's a link to the gallery page, don't prevent default
  if (targetId === 'gallery.html') {
    return; // Let the browser handle the navigation
  }
  
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
  
  // Navigation links (filter out gallery links)
  menuLinks.forEach(link => {
    if (!link.getAttribute('href').includes('gallery.html')) {
      link.addEventListener('click', scrollToSection);
    }
  });
  
  // Initialize fancy effects
  setupPreloader();
  setupColorRGB();
  createBackgroundShapes();
  addBackgroundShapesStyles();
  
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
});