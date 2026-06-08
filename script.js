// ========================================================================
// FOOT LOCKER CANADA - INTERACTIVE FUNCTIONALITY
// Premium E-commerce Homepage JavaScript
// ========================================================================

// ========== DOM ELEMENTS ==========
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const searchInput = document.getElementById('searchInput');
const cartBadge = document.querySelector('.cart-badge');
const quickViewButtons = document.querySelectorAll('.quick-view-btn');
const addCartButtons = document.querySelectorAll('.btn-add-cart');
const newsLetterForm = document.getElementById('newsletterForm');
const cartBtn = document.querySelector('.cart-btn');

// ========== MOBILE MENU TOGGLE ==========
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header') && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
    }
  }, { once: true });
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});

// ========== SHOPPING CART MANAGEMENT ==========
let cart = {
  items: [],
  total: 0
};

// Load cart from localStorage on page load
function loadCart() {
  const savedCart = localStorage.getItem('footLockerCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartBadge();
  }
}

// Update cart badge number
function updateCartBadge() {
  const itemCount = cart.items.length;
  cartBadge.textContent = itemCount > 0 ? itemCount : '0';
  
  // Add visual feedback if cart has items
  if (itemCount > 0) {
    cartBtn.classList.add('has-items');
  } else {
    cartBtn.classList.remove('has-items');
  }
}

// Add item to cart
function addToCart(productName, productPrice) {
  const newItem = {
    id: Date.now(),
    name: productName,
    price: productPrice,
    quantity: 1
  };
  
  // Check if item already exists in cart
  const existingItem = cart.items.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push(newItem);
  }
  
  // Save to localStorage
  localStorage.setItem('footLockerCart', JSON.stringify(cart));
  updateCartBadge();
  
  // Show success feedback
  showNotification(`${productName} added to cart!`);
}

// ========== ADD TO CART EVENT LISTENERS ==========
addCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Get product info from the card
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-name').textContent;
    const priceText = productCard.querySelector('.current-price').textContent;
    const productPrice = parseFloat(priceText.replace('$', ''));
    
    addToCart(productName, productPrice);
    
    // Add animation to button
    button.textContent = '✓ Added!';
    button.style.backgroundColor = 'var(--primary-red)';
    
    setTimeout(() => {
      button.textContent = 'Add to Cart';
      button.style.backgroundColor = '';
    }, 2000);
  });
});

// ========== QUICK VIEW FUNCTIONALITY ==========
quickViewButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-name').textContent;
    const productBrand = productCard.querySelector('.product-brand').textContent;
    const productPrice = productCard.querySelector('.current-price').textContent;
    const productImage = productCard.querySelector('.product-image img').src;
    
    showQuickViewModal(productName, productBrand, productPrice, productImage);
  });
});

// Quick View Modal
function showQuickViewModal(name, brand, price, image) {
  // Create modal HTML
  const modal = document.createElement('div');
  modal.className = 'quick-view-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <div class="modal-grid">
        <div class="modal-image">
          <img src="${image}" alt="${name}" />
        </div>
        <div class="modal-info">
          <span class="product-brand">${brand}</span>
          <h3>${name}</h3>
          <div class="product-rating">
            <span class="stars">★★★★★</span>
            <span class="rating-count">(150+)</span>
          </div>
          <div class="product-price" style="font-size: 24px; margin: 20px 0;">
            ${price}
          </div>
          <p style="color: #666; margin-bottom: 20px;">Premium quality sneaker with premium materials and exceptional comfort.</p>
          <div style="display: flex; gap: 16px; flex-direction: column;">
            <button class="btn btn-primary" id="modalAddCart">Add to Cart</button>
            <button class="btn btn-secondary" id="modalClose">Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-overlay"></div>
  `;
  
  document.body.appendChild(modal);
  
  // Add styles to modal dynamically
  const style = document.createElement('style');
  style.textContent = `
    .quick-view-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: -1;
    }
    
    .modal-content {
      background-color: white;
      border-radius: 12px;
      max-width: 700px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    @media (max-width: 768px) {
      .modal-content {
        grid-template-columns: 1fr;
      }
    }
    
    .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      font-size: 32px;
      cursor: pointer;
      color: #666;
      z-index: 10;
      transition: color 0.2s;
    }
    
    .modal-close:hover {
      color: #e60000;
    }
    
    .modal-image {
      height: 400px;
      overflow: hidden;
      border-radius: 12px 0 0 12px;
    }
    
    .modal-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    @media (max-width: 768px) {
      .modal-image {
        height: 300px;
        border-radius: 12px 12px 0 0;
      }
    }
    
    .modal-info {
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    @media (max-width: 768px) {
      .modal-info {
        padding: 24px;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Event listeners
  const closeBtn = modal.querySelector('.modal-close');
  const modalCloseBtn = modal.querySelector('#modalClose');
  const modalAddCartBtn = modal.querySelector('#modalAddCart');
  const overlay = modal.querySelector('.modal-overlay');
  
  function closeModal() {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(modal);
      document.head.removeChild(style);
    }, 300);
  }
  
  closeBtn.addEventListener('click', closeModal);
  modalCloseBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  
  modalAddCartBtn.addEventListener('click', () => {
    const priceNum = parseFloat(price.replace('$', ''));
    addToCart(name, priceNum);
    closeModal();
  });
}

// ========== SEARCH FUNCTIONALITY ==========
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      performSearch(searchTerm);
    }
  }
});

function performSearch(term) {
  showNotification(`Searching for "${term}"...`);
  // In a real application, this would trigger a search page or filter products
  console.log('Search term:', term);
}

// ========== NEWSLETTER FORM ==========
newsLetterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const emailInput = newsLetterForm.querySelector('input[type="email"]');
  const email = emailInput.value.trim();
  
  if (email) {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      // Save to localStorage (in real app, this would be sent to server)
      let subscribers = JSON.parse(localStorage.getItem('footLockerSubscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('footLockerSubscribers', JSON.stringify(subscribers));
      }
      
      showNotification('Thank you for subscribing! Check your email for exclusive offers.');
      emailInput.value = '';
    } else {
      showNotification('Please enter a valid email address.', 'error');
    }
  }
});

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'success') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles
  const style = document.createElement('style');
  if (!document.querySelector('style[data-notification-styles]')) {
    style.setAttribute('data-notification-styles', 'true');
    style.textContent = `
      .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
      }
      
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
      
      .notification-success {
        background-color: #4CAF50;
        color: white;
      }
      
      .notification-error {
        background-color: #e60000;
        color: white;
      }
      
      .notification-info {
        background-color: #2196F3;
        color: white;
      }
      
      @media (max-width: 768px) {
        .notification {
          bottom: 16px;
          right: 16px;
          left: 16px;
          max-width: none;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 4000);
}

// ========== SMOOTH SCROLL ANCHORS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========== CART ICON CLICK ==========
cartBtn.addEventListener('click', () => {
  if (cart.items.length > 0) {
    showCartPreview();
  } else {
    showNotification('Your cart is empty. Start shopping!', 'info');
  }
});

function showCartPreview() {
  let cartHTML = '<div style="max-height: 300px; overflow-y: auto;">';
  
  if (cart.items.length === 0) {
    cartHTML += '<p style="padding: 20px; text-align: center; color: #666;">Your cart is empty</p>';
  } else {
    cart.items.forEach(item => {
      cartHTML += `
        <div style="padding: 12px; border-bottom: 1px solid #e5e5e5; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <p style="font-weight: 600; margin-bottom: 4px;">${item.name}</p>
            <p style="font-size: 12px; color: #666;">Qty: ${item.quantity}</p>
          </div>
          <p style="font-weight: 700;">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      `;
    });
  }
  
  cartHTML += '</div>';
  
  // Calculate total
  const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  cartHTML += `
    <div style="padding: 20px; border-top: 2px solid #e5e5e5; text-align: center;">
      <p style="font-size: 14px; color: #666; margin-bottom: 12px;">Total: <strong>$${total.toFixed(2)}</strong></p>
      <button class="btn btn-primary" style="width: 100%; margin-bottom: 8px;">Proceed to Checkout</button>
      <button class="btn btn-secondary" id="continueShopping" style="width: 100%;">Continue Shopping</button>
    </div>
  `;
  
  // Create popup
  const cartPopup = document.createElement('div');
  cartPopup.className = 'cart-popup';
  cartPopup.innerHTML = `
    <div class="cart-popup-content" style="position: absolute; top: 60px; right: 0; background: white; border-radius: 8px; box-shadow: 0 8px 16px rgba(0,0,0,0.15); width: 350px; z-index: 1000;">
      ${cartHTML}
    </div>
  `;
  
  document.body.appendChild(cartPopup);
  
  cartPopup.querySelector('#continueShopping').addEventListener('click', () => {
    document.body.removeChild(cartPopup);
  });
  
  // Close when clicking outside
  setTimeout(() => {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.cart-btn') && document.body.contains(cartPopup)) {
        document.body.removeChild(cartPopup);
      }
    }, { once: true });
  }, 100);
}

// ========== PAGE LOAD INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  
  // Add hover effects to category cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Lazy load images
  const images = document.querySelectorAll('img');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '1';
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
      imageObserver.observe(img);
    });
  }
});

// ========== UTILITY FUNCTIONS ==========

// Prevent accidental page navigation on demo
window.addEventListener('beforeunload', (e) => {
  if (cart.items.length > 0) {
    e.returnValue = 'You have items in your cart. Are you sure you want to leave?';
  }
});

console.log('%c🔥 Foot Locker Canada Homepage', 'font-size: 16px; font-weight: bold; color: #e60000;');
console.log('%cWelcome to our premium sneaker and athletic apparel destination!', 'font-size: 12px; color: #666;');
