// Order form functionality

// Initialize order form
function initOrderForm() {
    const orderForm = document.getElementById('order-form');
    const successModal = document.getElementById('success-modal');
    
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }
    
    // Auto-format phone number
    const phoneInput = document.getElementById('customer-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }
    
    // Auto-increment quantity with + and - buttons (if needed)
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('change', validateQuantity);
    }
}

// Handle order form submission
function handleOrderSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = ['name', 'phone', 'address', 'quantity'];
    const missingFields = requiredFields.filter(field => !orderData[field] || orderData[field].trim() === '');
    
    if (missingFields.length > 0) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate phone number format
    const phoneRegex = /^(\+92|0)?[0-9]{10}$/;
    if (!phoneRegex.test(orderData.phone.replace(/\s+/g, ''))) {
        showFormMessage('Please enter a valid Pakistani phone number.', 'error');
        return;
    }
    
    // Validate quantity
    if (parseInt(orderData.quantity) < 1) {
        showFormMessage('Quantity must be at least 1.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
        Submitting...
    `;
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual email sending logic)
    setTimeout(() => {
        // In a real application, you would send this data to your email service
        sendOrderEmail(orderData);
        
        // Reset form and show success
        e.target.reset();
        showSuccessModal();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Remove any existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
    }, 2000);
}

// Send order email (placeholder function)
function sendOrderEmail(orderData) {
    // This is where you would integrate with your email service
    // For example, using EmailJS, Formspree, or your own backend
    
    const emailBody = `
New Order Received:

Customer Information:
- Name: ${orderData.name}
- Phone: ${orderData.phone}
- Address: ${orderData.address}

Order Details:
- Product: ${orderData.productName || 'Not specified'}
- Quantity: ${orderData.quantity}
- Payment Method: Cash on Delivery

Additional Notes:
${orderData.notes || 'None'}

Please contact the customer to confirm the order details.
    `;
    
    // Example using EmailJS (you would need to set this up)
    /*
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: 'youremail@example.com',
        from_name: orderData.name,
        message: emailBody,
        customer_phone: orderData.phone,
        customer_address: orderData.address,
        product_name: orderData.productName,
        quantity: orderData.quantity,
        notes: orderData.notes
    });
    */
    
    console.log('Order data to be sent:', orderData);
    console.log('Email body:', emailBody);
}

// Format phone number as user types
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Add +92 prefix if not present
    if (value.length > 0 && !value.startsWith('92')) {
        if (value.startsWith('0')) {
            value = '92' + value.substring(1);
        } else {
            value = '92' + value;
        }
    }
    
    // Format the number
    if (value.length >= 2) {
        value = '+' + value;
    }
    
    e.target.value = value;
}

// Validate quantity
function validateQuantity(e) {
    const value = parseInt(e.target.value);
    if (value < 1) {
        e.target.value = 1;
    }
}

// Show form message
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Insert at the top of the form
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.insertBefore(messageElement, orderForm.firstChild);
        
        // Scroll to message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove message after 5 seconds for success, 8 seconds for error
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, type === 'success' ? 5000 : 8000);
    }
}

// Show success modal
function showSuccessModal() {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close success modal
function closeSuccessModal() {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Redirect to products page
    window.location.href = 'products.html';
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const successModal = document.getElementById('success-modal');
    if (e.target === successModal) {
        closeSuccessModal();
    }
});

// Handle escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSuccessModal();
    }
});

// Add CSS for spinning animation
const style = document.createElement('style');
style.textContent = `
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initOrderForm);

// Make functions globally available
window.closeSuccessModal = closeSuccessModal;