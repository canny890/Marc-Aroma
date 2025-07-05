// Products Data
const products = [
    {
        id: 1,
        name: 'Midnight Elegance',
        category: 'men',
        price: 120,
        image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
        description: 'A sophisticated blend of cedar, bergamot, and amber.',
    },
    {
        id: 2,
        name: 'Rose Mystique',
        category: 'women',
        price: 135,
        image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg',
        description: 'Delicate rose petals with hints of vanilla and musk.',
    },
    {
        id: 3,
        name: 'Ocean Breeze',
        category: 'unisex',
        price: 110,
        image: 'https://images.pexels.com/photos/1190830/pexels-photo-1190830.jpeg',
        description: 'Fresh aquatic notes with citrus and marine accords.',
    },
    {
        id: 4,
        name: 'Golden Sunset',
        category: 'women',
        price: 145,
        image: 'https://images.pexels.com/photos/1190831/pexels-photo-1190831.jpeg',
        description: 'Warm amber and honey with floral undertones.',
    },
    {
        id: 5,
        name: 'Urban Legend',
        category: 'men',
        price: 125,
        image: 'https://images.pexels.com/photos/1190832/pexels-photo-1190832.jpeg',
        description: 'Bold spices with leather and tobacco notes.',
    },
    {
        id: 6,
        name: 'Eternal Spring',
        category: 'unisex',
        price: 115,
        image: 'https://images.pexels.com/photos/1190833/pexels-photo-1190833.jpeg',
        description: 'Fresh florals with green leaves and white tea.',
    },
];

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMobile = document.querySelector('.nav-mobile');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const productsGrid = document.getElementById('products-grid');
const featuredGrid = document.getElementById('featured-grid');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterSuccess = document.getElementById('newsletter-success');
const contactForm = document.getElementById('contact-form');
const footerNewsletterForm = document.getElementById('footer-newsletter-form');

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

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navMobile && navMobile.classList.contains('active')) {
                navMobile.classList.remove('active');
                const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
                hamburgers.forEach(line => {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                });
            }
        }
    });
});

// Update Active Navigation Link on Scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Create Product Card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
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
                <div class="product-category">${product.category}</div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

// Display Products
function displayProducts(productsToShow, container) {
    if (container) {
        container.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    }
}

// Filter Products
function filterProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayProducts(filteredProducts, productsGrid);
}

// Category Filter Event Listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Filter products
        const category = btn.getAttribute('data-category');
        filterProducts(category);
    });
});

// Newsletter Form Submission (Main)
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Simulate newsletter subscription
        console.log('Newsletter subscription:', email);
        
        // Show success message
        newsletterForm.style.display = 'none';
        newsletterSuccess.classList.add('show');
        
        // Reset form and hide success message after 3 seconds
        setTimeout(() => {
            newsletterForm.style.display = 'flex';
            newsletterSuccess.classList.remove('show');
            newsletterForm.reset();
        }, 3000);
    });
}

// Footer Newsletter Form Submission
if (footerNewsletterForm) {
    footerNewsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = footerNewsletterForm.querySelector('input[type="email"]').value;
        
        // Simulate newsletter subscription
        console.log('Footer Newsletter subscription:', email);
        
        // Show success message
        const button = footerNewsletterForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.style.background = '#28a745';
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            footerNewsletterForm.reset();
        }, 2000);
    });
}

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        console.log('Contact form submission:', data);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! We\'ll get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
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
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.background = 'var(--gold)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1000);
        
        console.log('Cart updated:', cart);
    }
}

function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        console.log('Toggled wishlist:', product);
        // You can implement wishlist functionality here
        alert(`${product.name} added to wishlist!`);
    }
}

function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        console.log('Quick view:', product);
        // You can implement quick view modal here
        alert(`Quick view: ${product.name}\n${product.description}\nPrice: $${product.price}`);
    }
}

// Cart functionality
function updateCartCount() {
    const cartBtn = document.querySelector('.cart-btn');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cartBtn && count > 0) {
        // Remove existing count if any
        const existingCount = cartBtn.querySelector('.cart-count');
        if (existingCount) {
            existingCount.remove();
        }
        
        // Add new count
        const countElement = document.createElement('span');
        countElement.className = 'cart-count';
        countElement.textContent = count;
        countElement.style.cssText = `
            position: absolute;
            top: -8px;
            right: -8px;
            background: var(--gold);
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        `;
        
        cartBtn.style.position = 'relative';
        cartBtn.appendChild(countElement);
        
        // Add click handler to go to cart page
        cartBtn.onclick = () => {
            window.location.href = 'cart.html';
        };
    }
}

// Intersection Observer for Animations
function createObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize App
function initApp() {
    // Display featured products (first 3)
    const featuredProducts = products.slice(0, 3);
    displayProducts(featuredProducts, featuredGrid);
    
    // Display all products initially
    displayProducts(products, productsGrid);
    
    // Initialize intersection observer for animations
    createObserver();
    
    // Set initial active nav link
    updateActiveNavLink();
    
    // Update cart count on page load
    updateCartCount();
}

// Smooth scroll for hero buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

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

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Preload images for better performance
function preloadImages() {
    products.forEach(product => {
        const img = new Image();
        img.src = product.image;
    });
}

// Call preload function
preloadImages();

// Footer scroll to top functionality
function addScrollToTop() {
    const footer = document.querySelector('.footer');
    if (footer) {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5,12 12,5 19,12"></polyline>
            </svg>
        `;
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--gold);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });
        
        document.body.appendChild(scrollToTopBtn);
    }
}

// Initialize scroll to top
addScrollToTop();