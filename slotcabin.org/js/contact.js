// Contact form functionality

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate form data
    if (!validateContactForm(data)) {
        return;
    }
    
    // Simulate form submission
    submitContactForm(data);
}

function validateContactForm(data) {
    // Check required fields
    if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
        showContactMessage('Please fill in all required fields.', 'error');
        return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showContactMessage('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Validate message length
    if (data.message.length < 10) {
        showContactMessage('Please provide a more detailed message (at least 10 characters).', 'error');
        return false;
    }
    
    return true;
}

function submitContactForm(data) {
    const submitBtn = document.querySelector('.submit-btn');
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Store message in localStorage (simulate backend)
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        const newMessage = {
            id: Date.now(),
            ...data,
            timestamp: new Date().toISOString(),
            status: 'received'
        };
        messages.push(newMessage);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        // Show success message
        showContactMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        
    }, 2000);
}

function showContactMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.contact-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `contact-message ${type === 'success' ? 'success-message' : 'error-message'}`;
    message.textContent = text;
    
    // Insert message at the top of form
    const form = document.getElementById('contactForm');
    form.insertBefore(message, form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Add error message styles
const style = document.createElement('style');
style.textContent = `
    .error-message {
        background: rgba(255, 0, 0, 0.1);
        border: 1px solid rgba(255, 0, 0, 0.3);
        color: #ff6b6b;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
        font-weight: 600;
    }
`;
document.head.appendChild(style);