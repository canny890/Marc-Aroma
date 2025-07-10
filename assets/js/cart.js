// Cart functionality

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

// Checkout modal elements
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckout = document.getElementById('close-checkout');
const cancelCheckout = document.getElementById('cancel-checkout');
const checkoutForm = document.getElementById('checkout-form');
const sameAsBillingCheckbox = document.getElementById('same-as-billing');
const shippingFields = document.getElementById('shipping-fields');

// Promo codes
const promoCodes = {
    'WELCOME10': { discount: 10, type: 'percentage' },
    'SAVE20': { discount: 20, type: 'fixed' },
    'LUXURY15': { discount: 15, type: 'percentage' }
};

let appliedPromo = null;

// Initialize cart
function initCart() {
    updateCartDisplay();
    updateCartSummary();
    
    // Event listeners
    if (checkoutBtn) checkoutBtn.addEventListener('click', handleCheckout);
    if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
    if (applyPromoBtn) applyPromoBtn.addEventListener('click', applyPromoCode);
    
    // Checkout modal event listeners
    if (closeCheckout) closeCheckout.addEventListener('click', closeCheckoutModal);
    if (cancelCheckout) cancelCheckout.addEventListener('click', closeCheckoutModal);
    if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    if (sameAsBillingCheckbox) sameAsBillingCheckbox.addEventListener('change', toggleShippingFields);
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => selectPaymentMethod(method));
    });
    
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

// Handle checkout
function handleCheckout() {
    if (cart.length === 0) return;
    
    // Open checkout modal
    openCheckoutModal();
}

// Open checkout modal
function openCheckoutModal() {
    if (checkoutModal) {
        // Update checkout summary
        updateCheckoutSummary();
        
        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close checkout modal
function closeCheckoutModal() {
    if (checkoutModal) {
        checkoutModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Update checkout summary
function updateCheckoutSummary() {
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
    
    // Update checkout modal summary
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTax = document.getElementById('checkout-tax');
    const checkoutTotal = document.getElementById('checkout-total');
    
    if (checkoutSubtotal) checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (checkoutTax) checkoutTax.textContent = `$${tax.toFixed(2)}`;
    if (checkoutTotal) checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

// Toggle shipping fields
function toggleShippingFields() {
    if (sameAsBillingCheckbox && shippingFields) {
        if (sameAsBillingCheckbox.checked) {
            shippingFields.style.display = 'none';
            // Clear shipping field requirements
            const shippingInputs = shippingFields.querySelectorAll('input, select');
            shippingInputs.forEach(input => {
                input.removeAttribute('required');
            });
        } else {
            shippingFields.style.display = 'block';
            // Add shipping field requirements
            const shippingInputs = shippingFields.querySelectorAll('input, select');
            shippingInputs.forEach(input => {
                if (input.name && input.name.includes('shipping')) {
                    input.setAttribute('required', 'required');
                }
            });
        }
    }
}

// Select payment method
function selectPaymentMethod(selectedMethod) {
    // Remove selected class from all methods
    document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('selected');
    });
    
    // Add selected class to clicked method
    selectedMethod.classList.add('selected');
    
    // Check the radio button
    const radio = selectedMethod.querySelector('input[type="radio"]');
    if (radio) {
        radio.checked = true;
    }
    
    // Handle card field requirements
    const paymentMethod = selectedMethod.getAttribute('data-method');
    const cardFields = document.querySelectorAll('#card-number, #card-expiry, #card-cvv, #card-name');
    
    if (paymentMethod === 'card') {
        cardFields.forEach(field => field.setAttribute('required', 'required'));
    } else {
        cardFields.forEach(field => field.removeAttribute('required'));
    }
}

// Handle checkout form submission
function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(checkoutForm);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = [
        'billingFirstName', 'billingLastName', 'billingEmail', 'billingPhone',
        'billingAddress', 'billingCity', 'billingState', 'billingZip', 'billingCountry'
    ];
    
    // Add shipping fields if not same as billing
    if (!sameAsBillingCheckbox.checked) {
        requiredFields.push(
            'shippingFirstName', 'shippingLastName', 'shippingAddress',
            'shippingCity', 'shippingState', 'shippingZip', 'shippingCountry'
        );
    }
    
    // Add card fields if card payment selected
    if (data.paymentMethod === 'card') {
        requiredFields.push('cardNumber', 'cardExpiry', 'cardCvv', 'cardName');
    }
    
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
        showCheckoutMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.billingEmail)) {
        showCheckoutMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate order processing
    const submitBtn = checkoutForm.querySelector('.checkout-submit');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Generate order number
        const orderNumber = 'MA' + Date.now().toString().slice(-6);
        
        let successMessage = `Order placed successfully! Order #${orderNumber}`;
        
        if (data.paymentMethod === 'cod') {
            successMessage += '\n\nYour order will be delivered within 3-5 business days. Please have the exact amount ready for cash payment upon delivery.';
        } else if (data.paymentMethod === 'card') {
            successMessage += '\n\nPayment processed successfully. You will receive a confirmation email shortly.';
        } else if (data.paymentMethod === 'paypal') {
            successMessage += '\n\nPayPal payment completed. You will receive a confirmation email shortly.';
        }
        
        alert(successMessage);
        
        // Clear cart and close modal
        cart = [];
        appliedPromo = null;
        saveCartToStorage();
        updateCartDisplay();
        updateCartSummary();
        resetPromoCode();
        closeCheckoutModal();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        checkoutForm.reset();
        
        // Reset payment method selection
        document.querySelectorAll('.payment-method').forEach(method => {
            method.classList.remove('selected');
        });
        document.querySelector('.payment-method[data-method="cod"]').classList.add('selected');
        document.querySelector('input[value="cod"]').checked = true;
        
    }, 2000);
}

// Show checkout message
function showCheckoutMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.checkout-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `checkout-message checkout-message-${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        padding: 12px 16px;
        border-radius: 6px;
        margin-bottom: 16px;
        font-size: 14px;
        background: ${type === 'success' ? '#d1fae5' : '#fee2e2'};
        color: ${type === 'success' ? '#065f46' : '#991b1b'};
        border: 1px solid ${type === 'success' ? '#a7f3d0' : '#fca5a5'};
    `;
    
    if (checkoutForm) {
        checkoutForm.insertBefore(messageElement, checkoutForm.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Close modal when clicking outside
if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            closeCheckoutModal();
        }
    });
}

// Handle checkout - old function kept for compatibility
function handleCheckoutOld() {
    if (cart.length === 0) return;
    
    // Simulate checkout process
    alert('Redirecting to secure checkout...');
    
    // In a real application, this would redirect to a payment processor
    // For demo purposes, we'll just show a success message
    setTimeout(() => {
        alert('Order placed successfully! Thank you for your purchase.');
        cart = [];
        appliedPromo = null;
        saveCartToStorage();
        updateCartDisplay();
        updateCartSummary();
        resetPromoCode();
    }, 1000);
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

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', initCart);

// Make functions globally available
window.updateQuantity = updateQuantity;
window.setQuantity = setQuantity;
window.removeFromCart = removeFromCart;