// Products page specific functionality

// Use products data from main.js (available as window.products)

let currentFilters = {
    category: 'all',
    price: 'all',
    sort: 'featured'
};

let displayedProducts = [];
let productsPerPage = 6;
let currentPage = 1;

// DOM Elements
const filterBtns = document.querySelectorAll('.filter-btn');
const priceFilterBtns = document.querySelectorAll('[data-price]');
const sortSelect = document.getElementById('sort-select');
const productsGrid = document.getElementById('products-grid');
const productsCount = document.getElementById('products-count');
const loadMoreBtn = document.getElementById('load-more');
const filterReset = document.getElementById('filter-reset');
const viewBtns = document.querySelectorAll('.view-btn');

// Initialize products page
function initProductsPage() {
    if (!productsGrid) return;
    
    setupEventListeners();
    applyFilters();
}

// Setup event listeners
function setupEventListeners() {
    // Category filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilters.category = btn.getAttribute('data-category');
            currentPage = 1;
            applyFilters();
        });
    });
    
    // Price filters
    priceFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            priceFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilters.price = btn.getAttribute('data-price');
            currentPage = 1;
            applyFilters();
        });
    });
    
    // Sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            currentFilters.sort = sortSelect.value;
            currentPage = 1;
            applyFilters();
        });
    }
    
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            currentPage++;
            loadMoreProducts();
        });
    }
    
    // Reset filters
    if (filterReset) {
        filterReset.addEventListener('click', () => {
            resetFilters();
        });
    }
    
    // View toggle
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.getAttribute('data-view');
            toggleView(view);
        });
    });
}

// Apply filters
function applyFilters() {
    let filteredProducts = [...window.products];
    
    // Category filter
    if (currentFilters.category !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === currentFilters.category
        );
    }
    
    // Price filter
    if (currentFilters.price !== 'all') {
        const [min, max] = currentFilters.price.split('-').map(p => 
            p === '150+' ? Infinity : parseInt(p)
        );
        filteredProducts = filteredProducts.filter(product => {
            if (max === Infinity) return product.price >= min;
            return product.price >= min && product.price <= max;
        });
    }
    
    // Sort products
    filteredProducts = sortProducts(filteredProducts, currentFilters.sort);
    
    displayedProducts = filteredProducts;
    displayFilteredProducts();
    updateProductsCount();
}

// Sort products
function sortProducts(products, sortBy) {
    switch (sortBy) {
        case 'price-low':
            return products.sort((a, b) => a.price - b.price);
        case 'price-high':
            return products.sort((a, b) => b.price - a.price);
        case 'name':
            return products.sort((a, b) => a.name.localeCompare(b.name));
        case 'rating':
            return products.sort((a, b) => b.rating - a.rating);
        case 'featured':
        default:
            return products.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return 0;
            });
    }
}

// Display filtered products
function displayFilteredProducts() {
    const productsToShow = displayedProducts.slice(0, currentPage * productsPerPage);
    
    if (productsGrid) {
        // Use the createProductCard function from main.js
        if (typeof window.createProductCard === 'function') {
            productsGrid.innerHTML = productsToShow.map(product => window.createProductCard(product)).join('');
        } else {
            // Fallback if createProductCard is not available
            productsGrid.innerHTML = productsToShow.map(product => `
                <div class="product-card" data-category="${product.category}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                        <div class="product-overlay"></div>
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
            `).join('');
        }
    }
    
    // Show/hide load more button
    if (loadMoreBtn) {
        if (productsToShow.length >= displayedProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

// Load more products
function loadMoreProducts() {
    displayFilteredProducts();
}

// Update products count
function updateProductsCount() {
    if (productsCount) {
        productsCount.textContent = displayedProducts.length;
    }
}

// Reset filters
function resetFilters() {
    currentFilters = {
        category: 'all',
        price: 'all',
        sort: 'featured'
    };
    currentPage = 1;
    
    // Reset UI
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === 'all') {
            btn.classList.add('active');
        }
    });
    
    priceFilterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-price') === 'all') {
            btn.classList.add('active');
        }
    });
    
    if (sortSelect) {
        sortSelect.value = 'featured';
    }
    
    applyFilters();
}

// Toggle view (grid/list)
function toggleView(view) {
    if (productsGrid) {
        if (view === 'list') {
            productsGrid.classList.add('list-view');
        } else {
            productsGrid.classList.remove('list-view');
        }
    }
}

// Filter by collection (called from collection cards)
function filterByCollection(collection) {
    // This would filter products by collection
    // For now, just scroll to products
    if (productsGrid) {
        productsGrid.scrollIntoView({ behavior: 'smooth' });
    }
}

// Filter by season (called from seasonal collection buttons)
function filterBySeason(season) {
    // This would filter products by season
    // For now, just scroll to products
    if (productsGrid) {
        productsGrid.scrollIntoView({ behavior: 'smooth' });
    }
}

// Filter by category (called from gender collection buttons)
function filterByCategory(category) {
    // This would filter products by category
    // For now, just scroll to products
    if (productsGrid) {
        productsGrid.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initProductsPage);

// Make functions globally available