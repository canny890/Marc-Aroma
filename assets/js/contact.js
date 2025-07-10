// Contact page functionality

// FAQ functionality
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = button.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        q.parentElement.querySelector('.faq-answer').classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        button.classList.add('active');
        answer.classList.add('active');
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = ['firstName', 'lastName', 'email', 'inquiryType', 'subject', 'message'];
            const missingFields = requiredFields.filter(field => !data[field]);
            
            if (missingFields.length > 0) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Show form message function
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
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
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.insertBefore(messageElement, contactForm.firstChild);
        
        // Remove message after 5 seconds for success, 8 seconds for error
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, type === 'success' ? 5000 : 8000);
    }
}

// Initialize contact page
document.addEventListener('DOMContentLoaded', initContactForm);

// Make functions globally available
window.toggleFAQ = toggleFAQ;