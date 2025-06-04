// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// Theme Management (same as main site)
const body = document.body;
const btnThemeFixed = document.querySelector('#btn-theme-fixed');

const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass);
  if (btnThemeFixed) {
    btnThemeFixed.classList.remove('fa-moon', 'fa-sun');
    btnThemeFixed.classList.add(btnClass);
  }
};

const getThemeFromStorage = () => {
  const storedTheme = localStorage.getItem('portfolio-theme');
  const storedIcon = localStorage.getItem('portfolio-btn-theme');
  
  if (storedTheme && storedIcon) {
    addThemeClass(storedTheme, storedIcon);
  } else {
    setTheme('light', 'fa-moon');
  }
};

const isDark = () => body.classList.contains('dark');

const setTheme = (bodyClass, btnClass) => {
  body.classList.remove('light', 'dark');
  addThemeClass(bodyClass, btnClass);
  localStorage.setItem('portfolio-theme', bodyClass);
  localStorage.setItem('portfolio-btn-theme', btnClass);
};

const toggleTheme = () => {
  if (isDark()) {
    setTheme('light', 'fa-moon');
  } else {
    setTheme('dark', 'fa-sun');
  }
};

// Ultra-Fast Gallery Implementation
class FastGallery {
  constructor() {
    this.container = document.getElementById('gallery-grid');
    this.loadingIndicator = document.getElementById('loading-indicator');
    this.progressFill = document.getElementById('progress-fill');
    this.progressPercentage = document.getElementById('progress-percentage');
    this.progressCount = document.getElementById('progress-count');
    this.shuffleBtn = document.getElementById('shuffle-btn');
    this.photoCountEl = document.getElementById('photo-count');
    
    // Image array - updated with your actual files
    this.images = [
      'travel-images/248BBBC8-BF8A-4285-9BBE-DE96EFA37645.jpg',
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
      'travel-images/IMG_8920 2.JPG',
      'travel-images/IMG_8989 3.JPG',
      'travel-images/IMG_9072.JPG'
    ];
    
    this.loadedCount = 0;
    this.totalImages = this.images.length;
    this.currentImages = [...this.images];
    this.visibleImages = 20; // Only load first 20 images initially
    
    this.init();
  }
  
  init() {
    // Update photo count
    if (this.photoCountEl) {
      this.photoCountEl.textContent = this.totalImages;
    }
    
    // Shuffle images initially
    this.shuffleArray(this.currentImages);
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Start with fast initial load
    this.fastInitialLoad();
  }
  
  setupEventListeners() {
    if (this.shuffleBtn) {
      this.shuffleBtn.addEventListener('click', () => this.shuffleAndReload());
    }
    
    // Initialize theme
    getThemeFromStorage();
    
    if (btnThemeFixed) {
      btnThemeFixed.addEventListener('click', toggleTheme);
    }
  }
  
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  shuffleAndReload() {
    this.shuffleArray(this.currentImages);
    this.container.innerHTML = '';
    this.loadedCount = 0;
    this.visibleImages = 20;
    this.fastInitialLoad();
  }
  
  fastInitialLoad() {
    this.showLoading();
    
    // Create ALL grid items immediately with placeholders
    this.createAllGridItems();
    
    // Hide loading immediately - placeholders are showing
    setTimeout(() => {
      this.hideLoading();
    }, 500);
    
    // Start loading actual images in background
    this.loadImagesInBackground();
  }
  
  createAllGridItems() {
    // Create all 60 grid items instantly with placeholders
    this.currentImages.forEach((src, index) => {
      const item = document.createElement('div');
      item.className = 'gallery__grid-item';
      item.innerHTML = `
        <div class="gallery__placeholder" data-src="${src}" data-index="${index}">
          <span class="placeholder-icon">📸</span>
        </div>
      `;
      this.container.appendChild(item);
    });
    
    // Update progress to show grid is ready
    this.updateProgress(20, 'Grid ready, loading images...');
  }
  
  loadImagesInBackground() {
    // Load only first 15 images immediately for viewport
    for (let i = 0; i < Math.min(15, this.totalImages); i++) {
      setTimeout(() => {
        this.loadSingleImage(i);
      }, i * 100);
    }
    
    // Load remaining images when user scrolls or after delay
    setTimeout(() => {
      this.loadRemainingImages();
    }, 2000);
  }
  
  loadSingleImage(index) {
    const placeholder = this.container.children[index]?.querySelector('.gallery__placeholder');
    if (!placeholder) return;
    
    const src = placeholder.dataset.src;
    const img = document.createElement('img');
    
    img.onload = () => {
      placeholder.style.opacity = '0';
      setTimeout(() => {
        placeholder.replaceWith(img);
        this.loadedCount++;
        this.updateProgress();
      }, 200);
    };
    
    img.onerror = () => {
      placeholder.innerHTML = '<div class="gallery__error">📷</div>';
      this.loadedCount++;
      this.updateProgress();
    };
    
    // Optimized image loading
    img.src = src;
    img.alt = `Travel photo ${index + 1}`;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
      img.style.opacity = '1';
    }, 100);
  }
  
  loadRemainingImages() {
    // Load remaining images in small batches
    for (let i = 15; i < this.totalImages; i++) {
      setTimeout(() => {
        this.loadSingleImage(i);
      }, (i - 15) * 200); // Slower loading for remaining images
    }
  }
  
  showLoading() {
    if (this.loadingIndicator) {
      this.loadingIndicator.style.display = 'flex';
      this.loadingIndicator.style.opacity = '1';
    }
  }
  
  hideLoading() {
    if (this.loadingIndicator) {
      this.loadingIndicator.style.opacity = '0';
      setTimeout(() => {
        this.loadingIndicator.style.display = 'none';
      }, 300);
    }
  }
  
  updateProgress(forcePercentage = null, customText = null) {
    const percentage = forcePercentage || Math.round((this.loadedCount / this.totalImages) * 100);
    
    if (this.progressFill) {
      this.progressFill.style.width = `${percentage}%`;
    }
    
    if (this.progressPercentage) {
      this.progressPercentage.textContent = `${percentage}%`;
    }
    
    if (this.progressCount) {
      this.progressCount.textContent = customText || `${this.loadedCount} / ${this.totalImages} photos`;
    }
  }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FastGallery();
});