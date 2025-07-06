// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Products data (same as main.js)
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
const cartItemsList = document.getElementById('cart-items-list');
const emptyCart = document.getElementById('empty-cart');
const itemsCount = document.getElementById('items-count');
const cartCount = document.getElementById('cart-count');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');
const clearCartBtn = document.getElementById('clear-cart');
const promoInput = document.getElementById('promo-input');
const applyPromoBtn = document.getElementById('apply-promo');
const promoMessage = document.getElementById('promo-message');

// Payment Modal Elements
const paymentModal = document.getElementById('payment-modal');
const closePaymentModal = document.getElementById('close-payment-modal');
const paymentForm = document.getElementById('payment-form');
const successModal = document.getElementById('success-modal');

// Promo codes
const promoCodes = {
    'WELCOME10': { discount: 10, type: 'percentage' },
    'SAVE20': { discount: 20, type: 'fixed' },
    'LUXURY15': { discount: 15, type: 'percentage' }
};

let appliedPromo = null;
let currentStep = 1;

// Initialize cart
function initCart() {
    updateCartDisplay();
    updateCartSummary();
    
    // Event listeners
    if (checkoutBtn) checkoutBtn.addEventListener('click', openPaymentModal);
    if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
    if (applyPromoBtn) applyPromoBtn.addEventListener('click', applyPromoCode);
    if (closePaymentModal) closePaymentModal.addEventListener('click', closeModal);
    
    // Payment form navigation
    setupPaymentNavigation();
    
    // Load cart from localStorage
    loadCartFromStorage();
}

// Update cart display
function updateCartDisplay() {
    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartItemsList) cartItemsList.style.display = 'none';
        if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
        if (emptyCart) emptyCart.style.display = 'none';
        if (cartItemsList) cartItemsList.style.display = 'block';
        if (checkoutBtn) checkoutBtn.disabled = false;
        renderCartItems();
    }
    
    updateCartCount();
    updateItemsCount();
}

// Render cart items
function renderCartItems() {
    if (!cartItemsList) return;
    
    cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-category">${item.category}</p>
                <p class="item-description">${item.description}</p>
                <div class="item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="setQuantity(${item.id}, this.value)">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                    <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        saveCartToStorage();
        updateCartDisplay();
        updateCartSummary();
    }
}

// Set quantity
function setQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, parseInt(quantity) || 1);
        saveCartToStorage();
        updateCartDisplay();
        updateCartSummary();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartDisplay();
    updateCartSummary();
}

// Clear cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        appliedPromo = null;
        saveCartToStorage();
        updateCartDisplay();
        updateCartSummary();
        resetPromoCode();
    }
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Update items count
function updateItemsCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    if (itemsCount) itemsCount.textContent = count;
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    let discount = 0;
    
    if (appliedPromo) {
        if (appliedPromo.type === 'percentage') {
            discount = subtotal * (appliedPromo.discount / 100);
        } else {
            discount = appliedPromo.discount;
        }
    }
    
    const discountedSubtotal = subtotal - discount;
    const tax = discountedSubtotal * 0.08; // 8% tax
    const total = discountedSubtotal + tax;
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    
    // Show discount if applied
    if (discount > 0) {
        if (!document.querySelector('.discount-row')) {
            const discountRow = document.createElement('div');
            discountRow.className = 'summary-row discount-row';
            discountRow.innerHTML = `
                <span>Discount:</span>
                <span style="color: #10b981;">-$${discount.toFixed(2)}</span>
            `;
            if (taxElement && taxElement.parentElement) {
                taxElement.parentElement.parentElement.insertBefore(discountRow, taxElement.parentElement);
            }
        } else {
            const discountElement = document.querySelector('.discount-row span:last-child');
            if (discountElement) discountElement.textContent = `-$${discount.toFixed(2)}`;
        }
    }
}

// Apply promo code
function applyPromoCode() {
    const code = promoInput.value.trim().toUpperCase();
    
    if (!code) {
        showPromoMessage('Please enter a promo code', 'error');
        return;
    }
    
    if (promoCodes[code]) {
        appliedPromo = promoCodes[code];
        showPromoMessage(`Promo code applied! You saved ${appliedPromo.type === 'percentage' ? appliedPromo.discount + '%' : '$' + appliedPromo.discount}`, 'success');
        promoInput.value = '';
        applyPromoBtn.textContent = 'Applied';
        applyPromoBtn.disabled = true;
        updateCartSummary();
    } else {
        showPromoMessage('Invalid promo code', 'error');
    }
}

// Show promo message
function showPromoMessage(message, type) {
    if (promoMessage) {
        promoMessage.textContent = message;
        promoMessage.className = `promo-message ${type}`;
        
        setTimeout(() => {
            if (type === 'error') {
                promoMessage.style.display = 'none';
            }
        }, 3000);
    }
}

// Reset promo code
function resetPromoCode() {
    appliedPromo = null;
    if (promoInput) promoInput.value = '';
    if (applyPromoBtn) {
        applyPromoBtn.textContent = 'Apply';
        applyPromoBtn.disabled = false;
    }
    if (promoMessage) promoMessage.style.display = 'none';
    
    // Remove discount row
    const discountRow = document.querySelector('.discount-row');
    if (discountRow) {
        discountRow.remove();
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
        updateCartSummary();
    }
}

// Payment Modal Functions
function openPaymentModal() {
    if (cart.length === 0) return;
    
    if (paymentModal) {
        paymentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        currentStep = 1;
        showStep(1);
    }
}

function closeModal() {
    if (paymentModal) paymentModal.classList.remove('active');
    if (successModal) successModal.classList.remove('active');
    document.body.style.overflow = '';
    resetPaymentForm();
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.payment-step').forEach(stepEl => {
        stepEl.style.display = 'none';
    });
    
    // Show current step
    const currentStepEl = document.getElementById(`step-${step}`);
    if (currentStepEl) currentStepEl.style.display = 'block';
    
    // Update step indicators
    document.querySelectorAll('.step').forEach((stepEl, index) => {
        stepEl.classList.remove('active', 'completed');
        if (index + 1 === step) {
            stepEl.classList.add('active');
        } else if (index + 1 < step) {
            stepEl.classList.add('completed');
        }
    });
    
    currentStep = step;
}

function setupPaymentNavigation() {
    // Next step buttons
    document.querySelectorAll('.next-step-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const nextStep = parseInt(btn.dataset.next);
            if (validateStep(currentStep)) {
                if (nextStep === 3) {
                    populateOrderReview();
                }
                showStep(nextStep);
            }
        });
    });
    
    // Previous step buttons
    document.querySelectorAll('.prev-step-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const prevStep = parseInt(btn.dataset.prev);
            showStep(prevStep);
        });
    });
    
    // Payment form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', handleOrderSubmission);
    }
    
    // Payment method change
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', togglePaymentForms);
    });
    
    // Card number formatting
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', formatCardNumber);
    }
    
    // Expiry date formatting
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', formatExpiryDate);
    }
    
    // CVV formatting
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', formatCVV);
    }
}

function validateStep(step) {
    const stepElement = document.getElementById(`step-${step}`);
    if (!stepElement) return true;
    
    const requiredFields = stepElement.querySelectorAll('input[required], select[required]');
    
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            field.focus();
            field.style.borderColor = '#ef4444';
            setTimeout(() => {
                field.style.borderColor = '';
            }, 3000);
            return false;
        }
    }
    
    return true;
}

function populateOrderReview() {
    if (!paymentForm) return;
    
    // Shipping address
    const shippingData = new FormData(paymentForm);
    const shippingAddress = `
        ${shippingData.get('firstName')} ${shippingData.get('lastName')}<br>
        ${shippingData.get('address')}<br>
        ${shippingData.get('city')}, ${shippingData.get('state')} ${shippingData.get('zip')}<br>
        ${shippingData.get('email')}<br>
        ${shippingData.get('phone')}
    `;
    const reviewShipping = document.getElementById('review-shipping');
    if (reviewShipping) reviewShipping.innerHTML = shippingAddress;
    
    // Payment method
    const paymentMethod = shippingData.get('paymentMethod');
    let paymentDisplay = '';
    
    if (paymentMethod === 'credit-card') {
        const cardNumber = shippingData.get('cardNumber');
        const maskedCard = cardNumber ? `**** **** **** ${cardNumber.slice(-4)}` : '';
        paymentDisplay = `Credit Card<br>${maskedCard}<br>${shippingData.get('cardName')}`;
    } else if (paymentMethod === 'paypal') {
        paymentDisplay = 'PayPal';
    } else if (paymentMethod === 'apple-pay') {
        paymentDisplay = 'Apple Pay';
    }
    
    const reviewPayment = document.getElementById('review-payment');
    if (reviewPayment) reviewPayment.innerHTML = paymentDisplay;
    
    // Order items
    const reviewItems = cart.map(item => `
        <div class="review-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    const reviewItemsEl = document.getElementById('review-items');
    if (reviewItemsEl) reviewItemsEl.innerHTML = reviewItems;
    
    // Order total
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    let discount = 0;
    
    if (appliedPromo) {
        if (appliedPromo.type === 'percentage') {
            discount = subtotal * (appliedPromo.discount / 100);
        } else {
            discount = appliedPromo.discount;
        }
    }
    
    const discountedSubtotal = subtotal - discount;
    const shipping = getShippingCost(shippingData.get('shipping'));
    const tax = (discountedSubtotal + shipping) * 0.08;
    const total = discountedSubtotal + shipping + tax;
    
    let totalHTML = `
        <div class="total-row">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
    `;
    
    if (discount > 0) {
        totalHTML += `
            <div class="total-row">
                <span>Discount:</span>
                <span style="color: #10b981;">-$${discount.toFixed(2)}</span>
            </div>
        `;
    }
    
    totalHTML += `
        <div class="total-row">
            <span>Shipping:</span>
            <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
        </div>
        <div class="total-row">
            <span>Tax:</span>
            <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="total-row final">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
    
    const reviewTotal = document.getElementById('review-total');
    if (reviewTotal) reviewTotal.innerHTML = totalHTML;
}

function getShippingCost(shippingMethod) {
    switch (shippingMethod) {
        case 'express': return 15;
        case 'overnight': return 25;
        default: return 0;
    }
}

function togglePaymentForms() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    const creditCardForm = document.getElementById('credit-card-form');
    
    if (paymentMethod && creditCardForm) {
        if (paymentMethod.value === 'credit-card') {
            creditCardForm.style.display = 'block';
        } else {
            creditCardForm.style.display = 'none';
        }
    }
}

function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
}

function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
}

function formatCVV(e) {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
}

function handleOrderSubmission(e) {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    // Check terms agreement
    const termsAgree = document.getElementById('terms-agree');
    if (termsAgree && !termsAgree.checked) {
        alert('Please agree to the terms and conditions');
        return;
    }
    
    // Simulate order processing
    const orderNumber = 'MA' + Date.now().toString().slice(-6);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    
    // Show success modal
    const orderNumberEl = document.getElementById('order-number');
    const deliveryDateEl = document.getElementById('delivery-date');
    if (orderNumberEl) orderNumberEl.textContent = orderNumber;
    if (deliveryDateEl) deliveryDateEl.textContent = deliveryDate.toLocaleDateString();
    
    if (paymentModal) paymentModal.classList.remove('active');
    if (successModal) successModal.classList.add('active');
    
    // Clear cart
    cart = [];
    appliedPromo = null;
    saveCartToStorage();
    
    // Reset form
    resetPaymentForm();
}

function resetPaymentForm() {
    if (paymentForm) paymentForm.reset();
    currentStep = 1;
    showStep(1);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        closeModal();
    }
    if (e.target === successModal) {
        closeModal();
    }
});

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', initCart);

// Make functions globally available
window.updateQuantity = updateQuantity;
window.setQuantity = setQuantity;
window.removeFromCart = removeFromCart;