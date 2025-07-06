// Products page specific functionality
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
    let filteredProducts = [...products];
    
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
    displayProducts(productsToShow, productsGrid);
    
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initProductsPage);

// Make functions globally available
window.filterByCollection = filterByCollection;