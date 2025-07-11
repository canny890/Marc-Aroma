// Collections page functionality

// Collection-specific product data
const collectionProducts = {
    men: [
        {
            id: 1,
            name: 'Midnight Elegance',
            category: 'men',
            price: 120,
            originalPrice: 150,
            image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
            description: 'A sophisticated blend of cedar, bergamot, and amber.',
            rating: 4.8,
            reviews: 124,
            notes: ['woody', 'spicy', 'citrus'],
            sizes: ['50ml', '100ml'],
            intensity: 'strong',
            availability: 'in-stock'
        },
        {
            id: 5,
            name: 'Urban Legend',
            category: 'men',
            price: 125,
            originalPrice: 155,
            image: 'https://images.pexels.com/photos/1190832/pexels-photo-1190832.jpeg',
            description: 'Bold spices with leather and tobacco notes.',
            rating: 4.6,
            reviews: 78,
            notes: ['spicy', 'leather', 'woody'],
            sizes: ['30ml', '50ml', '100ml'],
            intensity: 'strong',
            availability: 'in-stock'
        }
    ],
    women: [
        {
            id: 2,
            name: 'Rose Mystique',
            category: 'women',
            price: 135,
            originalPrice: 160,
            image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg',
            description: 'Delicate rose petals with hints of vanilla and musk.',
            rating: 4.9,
            reviews: 89,
            notes: ['floral', 'rose', 'vanilla'],
            sizes: ['30ml', '50ml', '100ml'],
            intensity: 'moderate',
            availability: 'in-stock'
        },
        {
            id: 4,
            name: 'Golden Sunset',
            category: 'women',
            price: 145,
            originalPrice: 170,
            image: 'https://images.pexels.com/photos/1190831/pexels-photo-1190831.jpeg',
            description: 'Warm amber and honey with floral undertones.',
            rating: 4.8,
            reviews: 203,
            notes: ['floral', 'sweet', 'amber'],
            sizes: ['50ml', '100ml'],
            intensity: 'moderate',
            availability: 'in-stock'
        }
    ],
    unisex: [
        {
            id: 3,
            name: 'Ocean Breeze',
            category: 'unisex',
            price: 110,
            originalPrice: 130,
            image: 'https://images.pexels.com/photos/1190830/pexels-photo-1190830.jpeg',
            description: 'Fresh aquatic notes with citrus and marine accords.',
            rating: 4.7,
            reviews: 156,
            notes: ['fresh', 'citrus', 'aquatic'],
            sizes: ['30ml', '50ml', '100ml'],
            intensity: 'light',
            availability: 'in-stock'
        },
        {
            id: 6,
            name: 'Eternal Spring',
            category: 'unisex',
            price: 115,
            originalPrice: 140,
            image: 'https://images.pexels.com/photos/1190833/pexels-photo-1190833.jpeg',
            description: 'Fresh florals with green leaves and white tea.',
            rating: 4.9,
            reviews: 167,
            notes: ['fresh', 'green', 'clean'],
            sizes: ['50ml', '100ml'],
            intensity: 'light',
            availability: 'in-stock'
        }
    ],
    luxury: [
        {
            id: 7,
            name: 'Royal Oud',
            category: 'luxury',
            price: 350,
            originalPrice: 400,
            image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
            description: 'Exquisite oud with rare sandalwood and amber.',
            rating: 4.9,
            reviews: 45,
            notes: ['oud', 'sandalwood', 'amber'],
            sizes: ['50ml', '100ml'],
            intensity: 'strong',
            availability: 'in-stock'
        },
        {
            id: 8,
            name: 'Diamond Rose',
            category: 'luxury',
            price: 450,
            originalPrice: 500,
            image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg',
            description: 'Bulgarian rose with precious jasmine and gold accents.',
            rating: 5.0,
            reviews: 23,
            notes: ['rose', 'jasmine', 'precious'],
            sizes: ['50ml', '100ml', '200ml'],
            intensity: 'moderate',
            availability: 'in-stock'
        }
    ],
    seasonal: [
        {
            id: 9,
            name: 'Summer Breeze',
            category: 'seasonal',
            price: 95,
            originalPrice: 120,
            image: 'https://images.pexels.com/photos/1190830/pexels-photo-1190830.jpeg',
            description: 'Light citrus and marine notes perfect for summer.',
            rating: 4.6,
            reviews: 89,
            notes: ['citrus', 'fresh', 'marine'],
            sizes: ['30ml', '50ml'],
            season: 'summer',
            intensity: 'light',
            availability: 'in-stock'
        },
        {
            id: 10,
            name: 'Winter Warmth',
            category: 'seasonal',
            price: 140,
            originalPrice: 165,
            image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
            description: 'Rich spices and warm woods for cold winter nights.',
            rating: 4.8,
            reviews: 67,
            notes: ['spicy', 'woody', 'warm'],
            sizes: ['50ml', '100ml'],
            season: 'winter',
            intensity: 'strong',
            availability: 'in-stock'
        }
    ],
    'daily-wear': [
        {
            id: 11,
            name: 'Office Elegance',
            category: 'daily-wear',
            price: 85,
            originalPrice: 100,
            image: 'https://images.pexels.com/photos/1190833/pexels-photo-1190833.jpeg',
            description: 'Professional yet personal, perfect for daily wear.',
            rating: 4.5,
            reviews: 156,
            notes: ['light', 'clean', 'subtle'],
            sizes: ['30ml', '50ml'],
            intensity: 'light',
            availability: 'in-stock'
        },
        {
            id: 12,
            name: 'Everyday Fresh',
            category: 'daily-wear',
            price: 75,
            originalPrice: 90,
            image: 'https://images.pexels.com/photos/1190830/pexels-photo-1190830.jpeg',
            description: 'Clean and fresh scent for everyday confidence.',
            rating: 4.4,
            reviews: 234,
            notes: ['fresh', 'citrus', 'clean'],
            sizes: ['30ml', '50ml', '100ml'],
            intensity: 'light',
            availability: 'in-stock'
        }
    ],
    'limited-edition': [
        {
            id: 13,
            name: 'Anniversary Gold',
            category: 'limited-edition',
            price: 600,
            originalPrice: 750,
            image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
            description: 'Exclusive anniversary edition with gold accents.',
            rating: 5.0,
            reviews: 12,
            notes: ['exclusive', 'rare', 'precious'],
            sizes: ['100ml'],
            edition: 'anniversary',
            intensity: 'strong',
            availability: 'in-stock',
            limitedQuantity: 50
        },
        {
            id: 14,
            name: 'Artist Collaboration',
            category: 'limited-edition',
            price: 400,
            originalPrice: 450,
            image: 'https://images.pexels.com/photos/1190831/pexels-photo-1190831.jpeg',
            description: 'Unique collaboration with renowned perfume artist.',
            rating: 4.9,
            reviews: 8,
            notes: ['artistic', 'unique', 'creative'],
            sizes: ['50ml'],
            edition: 'artist',
            intensity: 'moderate',
            availability: 'pre-order',
            limitedQuantity: 100
        }
    ]
};

// Current collection and filters
let currentCollection = '';
let currentFilters = {
    search: '',
    price: 'all',
    notes: [],
    size: [],
    intensity: 'all',
    season: 'all',
    availability: 'all',
    edition: [],
    sort: 'popularity'
};

let displayedProducts = [];
let productsPerPage = 6;
let currentPage = 1;

// DOM Elements
const collectionSearch = document.getElementById('collection-search');
const productsGrid = document.getElementById('products-grid');
const resultsCount = document.getElementById('results-count');
const totalProducts = document.getElementById('total-products');
const loadMoreBtn = document.getElementById('load-more');
const clearFiltersBtn = document.getElementById('clear-filters');
const applyFiltersBtn = document.getElementById('apply-filters');
const sortSelect = document.getElementById('sort-select');
const viewBtns = document.querySelectorAll('.view-btn');

// Initialize collection page
function initCollectionPage() {
    // Get collection from URL path
    const path = window.location.pathname;
    const collectionMatch = path.match(/\/collections\/([^\/]+)/);
    
    if (collectionMatch) {
        currentCollection = collectionMatch[1];
    }
    
    setupEventListeners();
    loadCollectionProducts();
}

// Setup event listeners
function setupEventListeners() {
    // Search
    if (collectionSearch) {
        collectionSearch.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Filter inputs
    const priceInputs = document.querySelectorAll('input[name="price"]');
    priceInputs.forEach(input => {
        input.addEventListener('change', handlePriceFilter);
    });
    
    const notesInputs = document.querySelectorAll('input[name="notes"]');
    notesInputs.forEach(input => {
        input.addEventListener('change', handleNotesFilter);
    });
    
    const sizeInputs = document.querySelectorAll('input[name="size"]');
    sizeInputs.forEach(input => {
        input.addEventListener('change', handleSizeFilter);
    });
    
    const intensityInputs = document.querySelectorAll('input[name="intensity"]');
    intensityInputs.forEach(input => {
        input.addEventListener('change', handleIntensityFilter);
    });
    
    const seasonInputs = document.querySelectorAll('input[name="season"]');
    seasonInputs.forEach(input => {
        input.addEventListener('change', handleSeasonFilter);
    });
    
    const availabilityInputs = document.querySelectorAll('input[name="availability"]');
    availabilityInputs.forEach(input => {
        input.addEventListener('change', handleAvailabilityFilter);
    });
    
    const editionInputs = document.querySelectorAll('input[name="edition"]');
    editionInputs.forEach(input => {
        input.addEventListener('change', handleEditionFilter);
    });
    
    // Sort
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    
    // Filter actions
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
    
    // Load more
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
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

// Load collection products
function loadCollectionProducts() {
    const products = collectionProducts[currentCollection] || [];
    displayedProducts = [...products];
    
    if (totalProducts) {
        totalProducts.textContent = products.length;
    }
    
    applyFilters();
}

// Handle search
function handleSearch(e) {
    currentFilters.search = e.target.value.toLowerCase();
    currentPage = 1;
    applyFilters();
}

// Handle price filter
function handlePriceFilter(e) {
    currentFilters.price = e.target.value;
    currentPage = 1;
}

// Handle notes filter
function handleNotesFilter(e) {
    const note = e.target.value;
    if (e.target.checked) {
        if (!currentFilters.notes.includes(note)) {
            currentFilters.notes.push(note);
        }
    } else {
        currentFilters.notes = currentFilters.notes.filter(n => n !== note);
    }
    currentPage = 1;
}

// Handle size filter
function handleSizeFilter(e) {
    const size = e.target.value;
    if (e.target.checked) {
        if (!currentFilters.size.includes(size)) {
            currentFilters.size.push(size);
        }
    } else {
        currentFilters.size = currentFilters.size.filter(s => s !== size);
    }
    currentPage = 1;
}

// Handle intensity filter
function handleIntensityFilter(e) {
    currentFilters.intensity = e.target.value;
    currentPage = 1;
}

// Handle season filter
function handleSeasonFilter(e) {
    currentFilters.season = e.target.value;
    currentPage = 1;
}

// Handle availability filter
function handleAvailabilityFilter(e) {
    currentFilters.availability = e.target.value;
    currentPage = 1;
}

// Handle edition filter
function handleEditionFilter(e) {
    const edition = e.target.value;
    if (e.target.checked) {
        if (!currentFilters.edition.includes(edition)) {
            currentFilters.edition.push(edition);
        }
    } else {
        currentFilters.edition = currentFilters.edition.filter(ed => ed !== edition);
    }
    currentPage = 1;
}

// Handle sort
function handleSort(e) {
    currentFilters.sort = e.target.value;
    currentPage = 1;
    applyFilters();
}

// Apply filters
function applyFilters() {
    let filteredProducts = [...(collectionProducts[currentCollection] || [])];
    
    // Search filter
    if (currentFilters.search) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(currentFilters.search) ||
            product.description.toLowerCase().includes(currentFilters.search) ||
            product.notes.some(note => note.toLowerCase().includes(currentFilters.search))
        );
    }
    
    // Price filter
    if (currentFilters.price !== 'all') {
        const [min, max] = currentFilters.price.split('-').map(p => {
            if (p.includes('+')) return [parseInt(p.replace('+', '')), Infinity];
            return parseInt(p);
        });
        
        if (Array.isArray(min)) {
            filteredProducts = filteredProducts.filter(product => product.price >= min[0]);
        } else {
            filteredProducts = filteredProducts.filter(product => 
                product.price >= min && product.price <= max
            );
        }
    }
    
    // Notes filter
    if (currentFilters.notes.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            currentFilters.notes.some(note => product.notes.includes(note))
        );
    }
    
    // Size filter
    if (currentFilters.size.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            currentFilters.size.some(size => product.sizes.includes(size))
        );
    }
    
    // Intensity filter
    if (currentFilters.intensity !== 'all') {
        filteredProducts = filteredProducts.filter(product =>
            product.intensity === currentFilters.intensity
        );
    }
    
    // Season filter
    if (currentFilters.season !== 'all') {
        filteredProducts = filteredProducts.filter(product =>
            product.season === currentFilters.season
        );
    }
    
    // Availability filter
    if (currentFilters.availability !== 'all') {
        filteredProducts = filteredProducts.filter(product =>
            product.availability === currentFilters.availability
        );
    }
    
    // Edition filter
    if (currentFilters.edition.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            currentFilters.edition.includes(product.edition)
        );
    }
    
    // Sort products
    filteredProducts = sortProducts(filteredProducts, currentFilters.sort);
    
    displayedProducts = filteredProducts;
    displayProducts();
    updateResultsCount();
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
        case 'newest':
            return products.sort((a, b) => b.id - a.id);
        case 'popularity':
        default:
            return products.sort((a, b) => b.reviews - a.reviews);
    }
}

// Display products
function displayProducts() {
    const productsToShow = displayedProducts.slice(0, currentPage * productsPerPage);
    
    if (productsGrid) {
        productsGrid.innerHTML = productsToShow.map(product => createCollectionProductCard(product)).join('');
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

// Create collection product card
function createCollectionProductCard(product) {
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    let badges = '';
    if (discount > 0) {
        badges += `<div class="product-badge">-${discount}%</div>`;
    }
    if (product.category === 'limited-edition') {
        badges += `<div class="limited-edition-badge">Limited</div>`;
    }
    
    let availabilityText = '';
    if (product.availability === 'pre-order') {
        availabilityText = '<span style="color: #f59e0b; font-weight: 600;">Pre-Order</span>';
    } else if (product.availability === 'sold-out') {
        availabilityText = '<span style="color: #ef4444; font-weight: 600;">Sold Out</span>';
    }
    
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-overlay"></div>
                ${badges}
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
                    ${product.availability === 'sold-out' ? 
                        `<button class="add-to-cart" disabled>Sold Out</button>` :
                        `<button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>`
                    }
                </div>
                ${availabilityText ? `<div style="margin-top: 8px; text-align: center;">${availabilityText}</div>` : ''}
            </div>
        </div>
    `;
}

// Update results count
function updateResultsCount() {
    if (resultsCount) {
        resultsCount.textContent = displayedProducts.length;
    }
}

// Load more products
function loadMoreProducts() {
    currentPage++;
    displayProducts();
}

// Clear all filters
function clearAllFilters() {
    currentFilters = {
        search: '',
        price: 'all',
        notes: [],
        size: [],
        intensity: 'all',
        season: 'all',
        availability: 'all',
        edition: [],
        sort: 'popularity'
    };
    currentPage = 1;
    
    // Reset UI
    if (collectionSearch) collectionSearch.value = '';
    
    // Reset radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        if (input.value === 'all' || input.value === 'popularity') {
            input.checked = true;
        } else {
            input.checked = false;
        }
    });
    
    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(input => {
        input.checked = false;
    });
    
    // Reset sort
    if (sortSelect) sortSelect.value = 'popularity';
    
    applyFilters();
}

// Toggle view
function toggleView(view) {
    if (productsGrid) {
        if (view === 'list') {
            productsGrid.classList.add('list-view');
        } else {
            productsGrid.classList.remove('list-view');
        }
    }
}

// Debounce function
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCollectionPage);

// Make functions globally available
window.toggleWishlist = window.toggleWishlist || function(id) {
    console.log('Added to wishlist:', id);
};

window.quickView = window.quickView || function(id) {
    console.log('Quick view:', id);
};

window.addToCart = window.addToCart || function(id) {
    console.log('Added to cart:', id);
};