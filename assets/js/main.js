// Products Data
const products = [
    {
        id: 1,
        name: 'Midnight Elegance',
        category: 'men',
        price: 120,
        originalPrice: 150,
        image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
        description: 'A sophisticated blend of cedar, bergamot, and amber.',
        featured: true,
        rating: 4.8,
        reviews: 124,
        collection: 'oriental',
        season: 'winter'
    },
    {
        id: 2,
        name: 'Rose Mystique',
        category: 'women',
        price: 135,
        originalPrice: 160,
        image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg',
        description: 'Delicate rose petals with hints of vanilla and musk.',
        featured: true,
        rating: 4.9,
        reviews: 89,
        collection: 'floral',
        season: 'summer'
    },
    {
        id: 3,
        name: 'Ocean Breeze',
        category: 'unisex',
        price: 110,
        originalPrice: 130,
        image: 'https://images.pexels.com/photos/1190830/pexels-photo-1190830.jpeg',
        description: 'Fresh aquatic notes with citrus and marine accords.',
        featured: false,
        rating: 4.7,
        reviews: 156,
        collection: 'fresh',
        season: 'summer'
    },
    {
        id: 4,
        name: 'Golden Sunset',
        category: 'women',
        price: 145,
        originalPrice: 170,
        image: 'https://images.pexels.com/photos/1190831/pexels-photo-1190831.jpeg',
        description: 'Warm amber and honey with floral undertones.',
        featured: true,
        rating: 4.8,
        reviews: 203,
        collection: 'oriental',
        season: 'winter'
    },
    {
        id: 5,
        name: 'Urban Legend',
        category: 'men',
        price: 125,
        originalPrice: 155,
        image: 'https://images.pexels.com/photos/1190832/pexels-photo-1190832.jpeg',
        description: 'Bold spices with leather and tobacco notes.',
        featured: false,
        rating: 4.6,
        reviews: 78,
        collection: 'oriental',
        season: 'winter'
    },
    {
        id: 6,
        name: 'Eternal Spring',
        category: 'unisex',
        price: 115,
        originalPrice: 140,
        image: 'https://images.pexels.com/photos/1190833/pexels-photo-1190833.jpeg',
        description: 'Fresh florals with green leaves and white tea.',
        featured: true,
        rating: 4.9,
        reviews: 167,
        collection: 'fresh',
        season: 'summer'
    },
];

// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMobile = document.getElementById('nav-mobile');
const searchBtn = document.getElementById('search-btn');
const searchModal = document.getElementById('search-modal');
const closeSearch = document.getElementById('close-search');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const newsletterForm = document.getElementById('newsletter-form');

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Mobile Menu Toggle
if (mobileMenuBtn && navMobile) {
    mobileMenuBtn.addEventListener('click', () => {
        navMobile.classList.toggle('active');
        
        // Animate hamburger menu
        const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
        hamburgers.forEach((line, index) => {
            if (navMobile.classList.contains('active')) {
                if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) line.style.opacity = '0';
                if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                line.style.transform = 'none';
                line.style.opacity = '1';
            }
        });
    });
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// Search functionality
if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', () => {
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (searchInput) searchInput.focus();
    });
}

if (closeSearch) {
    closeSearch.addEventListener('click', () => {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
        if (searchInput) searchInput.value = '';
        if (searchResults) searchResults.innerHTML = '';
    });
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
            
            if (filteredProducts.length > 0) {
                searchResults.innerHTML = filteredProducts.map(product => `
                    <div class="search-result-item" onclick="selectProduct(${product.id})">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="result-info">
                            <h4>${product.name}</h4>
                            <p>${product.description}</p>
                            <span class="result-price">$${product.price}</span>
                        </div>
                    </div>
                `).join('');
            } else {
                searchResults.innerHTML = '<div class="no-results">No products found</div>';
            }
        } else {
            searchResults.innerHTML = '';
        }
    });
}

function selectProduct(productId) {
    if (searchModal) searchModal.classList.remove('active');
    document.body.style.overflow = '';
    // Navigate to products page if not already there
    if (!window.location.pathname.includes('products.html')) {
        window.location.href = 'products.html';
    }
}

// Newsletter Form Submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show success message
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        const originalBackground = button.style.background;
        
        button.textContent = 'Subscribed!';
        button.style.background = '#28a745';
        button.disabled = true;
        
        showNotification('Successfully subscribed to newsletter!', 'success');
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = originalBackground;
            button.disabled = false;
            newsletterForm.reset();
        }, 2000);
    });
}

// Create Product Card HTML
function createProductCard(product) {
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-overlay"></div>
                ${discount > 0 ? `<div class="product-badge">-${discount}%</div>` : ''}
                <div class="product-actions">
                    <button class="action-btn" onclick="toggleWishlist(${product.id})" aria-label="Add to wishlist">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <button class="action-btn" onclick="quickView(${product.id})" aria-label="Quick view">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">
                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                </div>
                <div class="product-footer">
                    <div class="product-price">
                        <span class="current-price">$${product.price}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

// Make createProductCard globally available
window.createProductCard = createProductCard;

// Make products data globally available
window.products = products;

// Display Products
function displayProducts(productsToShow, container) {
    if (container) {
        container.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    }
}

// Product Actions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartCount();
        
        // Show success message with animation
        const button = event?.target || document.querySelector(`[onclick="addToCart(${productId})"]`);
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Added!';
            button.style.background = 'var(--primary-black)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 1000);
        }
        
        // Show a more visible notification
        showNotification(`${product.name} added to cart!`, 'success');
    }
}

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        showNotification(`${product.name} added to wishlist!`, 'success');
    }
}

function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        showNotification(`Quick view: ${product.name}`, 'info');
        // In a real application, this would open a modal with product details
    }
}

// Cart functionality
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    
    if (cartCount) {
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Initialize featured products on home page
function initFeaturedProducts() {
    const featuredProductsGrid = document.getElementById('featured-products-grid');
    if (featuredProductsGrid) {
        const featuredProducts = products.filter(product => product.featured);
        displayProducts(featuredProducts, featuredProductsGrid);
    }
}

// Initialize app
function initApp() {
    // Initialize featured products
    initFeaturedProducts();
    
    // Update cart count on page load
    updateCartCount();
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === searchModal) {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navMobile && navMobile.classList.contains('active')) {
        navMobile.classList.remove('active');
        const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
        hamburgers.forEach(line => {
            line.style.transform = 'none';
            line.style.opacity = '1';
        });
    }
});

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

function safeQuerySelectorAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Elements not found: ${selector}`);
        return [];
    }
}

// Make functions globally available
window.addToCart = addToCart;
window.toggleWishlist = toggleWishlist;
window.quickView = quickView;
window.selectProduct = selectProduct;
window.showNotification = showNotification;