// Shopping Cart
let cart = [];
let cartTotal = 0;

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(name, price) {
    cart.push({ name, price });
    cartTotal += price;
    updateCartDisplay();
    saveCart();
    
    // Show success message
    showMessage('Item added to cart!', 'success');
}

// Remove item from cart
function removeFromCart(index) {
    cartTotal -= cart[index].price;
    cart.splice(index, 1);
    updateCartDisplay();
    saveCart();
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    
    cartItems.innerHTML = '';
    cartTotal = 0;
    
    cart.forEach((item, index) => {
        cartTotal += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Study Notes</p>
            </div>
            <div class="cart-item-price">₹${item.price}</div>
            <button class="remove-item" onclick="removeFromCart(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotalElement.textContent = cartTotal;
    cartCount.textContent = cart.length;
}

// Toggle cart
function toggleCart() {
    const cart = document.getElementById('cart');
    cart.classList.toggle('open');
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showMessage('Your cart is empty!', 'error');
        return;
    }
    
    showMessage('Thank you for your order! We will contact you soon.', 'success');
    cart = [];
    cartTotal = 0;
    updateCartDisplay();
    saveCart();
    toggleCart();
}

// Show message
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Mobile navigation
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Study notes filtering
function filterNotes(category) {
    const noteCards = document.querySelectorAll('.note-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter cards
    noteCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Contact form handling
function handleContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        showMessage('Please fill in all required fields!', 'error');
        return;
    }
    
    // Simulate form submission
    showMessage('Thank you for your message! We will get back to you soon.', 'success');
    event.target.reset();
}

// Smooth scrolling for navigation links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load cart
    loadCart();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Study notes filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            filterNotes(category);
        });
    });
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        const cart = document.getElementById('cart');
        const cartToggle = document.querySelector('.cart-toggle');
        
        if (!cart.contains(e.target) && !cartToggle.contains(e.target)) {
            cart.classList.remove('open');
        }
    });
});

// WhatsApp function
function openWhatsApp() {
    const phone = '+919876543210';
    const message = 'Hi! I would like to know more about your services.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Add WhatsApp button
const whatsappFloat = document.createElement('div');
whatsappFloat.className = 'whatsapp-float';
whatsappFloat.innerHTML = '<i class="fab fa-whatsapp"></i>';
whatsappFloat.addEventListener('click', openWhatsApp);
document.body.appendChild(whatsappFloat); 