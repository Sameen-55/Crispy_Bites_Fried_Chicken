(function () {
  'use strict';

  const STORAGE_KEY = 'crispyBitesCart';
  const DELIVERY_FEE = 250;
  const products = [
    { id: 'zinger-burger', name: 'Zinger Burger', description: 'Golden crunch, creamy sauce, all the fixings.', price: 690, category: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85' },
    { id: 'crispy-burger', name: 'Crispy Chicken Burger', description: 'Our signature fillet with a serious crunch.', price: 590, category: 'Burgers', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=85' },
    { id: 'chicken-bucket', name: 'Chicken Bucket', description: 'Six pieces of golden, seasoned goodness.', price: 1490, category: 'Fried Chicken', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=85' },
    { id: 'hot-wings', name: 'Hot Wings', description: 'Fiery, sticky and made to get messy.', price: 720, category: 'Wings', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=85' },
    { id: 'chicken-strips', name: 'Chicken Strips', description: 'Tender inside, extra crunchy outside.', price: 650, category: 'Fried Chicken', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=85' },
    { id: 'loaded-fries', name: 'Loaded Fries', description: 'Golden fries, cheese sauce, big energy.', price: 490, category: 'Fries', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=85' },
    { id: 'family-meal', name: 'Family Meal', description: 'A little something for everyone at the table.', price: 2490, category: 'Deals', image: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?auto=format&fit=crop&w=800&q=85' },
    { id: 'chicken-wrap', name: 'Chicken Wrap', description: 'Fresh, saucy, satisfying. Wrapped just right.', price: 570, category: 'Wraps', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=85' },
    { id: 'classic-fries', name: 'Classic Fries', description: 'Crispy, golden, and perfectly salted.', price: 290, category: 'Fries', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=85' },
    { id: 'spicy-chicken', name: 'Spicy Crunch Chicken', description: 'Two pieces with our bold house seasoning.', price: 790, category: 'Fried Chicken', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=85' },
    { id: 'bbq-wings', name: 'Smoky BBQ Wings', description: 'Eight wings glazed in smoky BBQ sauce.', price: 750, category: 'Wings', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=85' },
    { id: 'crispy-wrap', name: 'Crispy Chicken Wrap', description: 'Crunchy chicken, crisp lettuce, tangy sauce.', price: 620, category: 'Wraps', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=85' },
    { id: 'cola', name: 'Chilled Cola', description: 'The classic ice-cold sidekick.', price: 180, category: 'Drinks', image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=800&q=85' },
    { id: 'lemonade', name: 'Fresh Lemonade', description: 'Cool, citrusy and freshly poured.', price: 220, category: 'Drinks', image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=800&q=85' },
    { id: 'student-deal', name: 'Study Break Deal', description: 'Zinger burger, regular fries and a chilled drink.', price: 890, category: 'Deals', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=85' },
    { id: 'couple-deal', name: 'Double Crunch', description: 'Two burgers, two fries and two chilled drinks.', price: 1790, category: 'Deals', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=85' },
    { id: 'family-deal', name: 'The Full House', description: 'Eight pieces of chicken, four fries and four drinks.', price: 3490, category: 'Deals', image: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?auto=format&fit=crop&w=800&q=85' },
    { id: 'mega-bucket-deal', name: 'Mega Bucket', description: 'Twelve pieces of chicken and two large fries.', price: 2990, category: 'Deals', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=85' },
    { id: 'weekend-special', name: 'Weekend Wing Run', description: 'Twelve hot wings, loaded fries and two drinks.', price: 1490, category: 'Deals', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=85' },
    { id: 'burger-buddy', name: 'Burger Buddy', description: 'Crispy chicken burger, golden fries and a cold drink.', price: 790, category: 'Deals', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85' }
  ];
  const productMap = new Map(products.map(function (product) { return [product.id, product]; }));
  window.CrispyBites = { products: products, deliveryFee: DELIVERY_FEE, formatPrice: formatPrice, getCart: getCart, addToCart: addToCart };

  function formatPrice(amount) {
    return 'Rs. ' + Number(amount).toLocaleString('en-PK');
  }

  function getCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!Array.isArray(saved)) return [];
      return saved.filter(function (item) {
        return item && productMap.has(item.id) && Number.isInteger(item.quantity) && item.quantity > 0;
      }).map(function (item) {
        const product = productMap.get(item.id);
        return { id: product.id, name: product.name, description: product.description, price: product.price, category: product.category, image: product.image, quantity: item.quantity };
      });
    } catch (error) {
      console.error('Unable to read the saved Crispy Bites cart.', error);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.map(function (item) {
        return { id: item.id, quantity: item.quantity };
      })));
    } catch (error) {
      console.error('Unable to save the Crispy Bites cart.', error);
      showToast('Your cart could not be saved on this device.');
    }
    updateCartCounter(cart);
    window.dispatchEvent(new CustomEvent('crispy-cart-updated', { detail: { cart: cart } }));
  }

  function updateCartCounter(cart) {
    const count = cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    document.querySelectorAll('.cart-count').forEach(function (element) {
      element.textContent = String(count);
      element.setAttribute('aria-label', count + ' items in cart');
      element.classList.remove('bump');
      void element.offsetWidth;
      element.classList.add('bump');
    });
  }

  function addToCart(id) {
    const product = productMap.get(id);
    if (!product) {
      console.error('Unknown Crispy Bites product ID:', id);
      showToast('Sorry, this item is unavailable.');
      return;
    }
    const cart = getCart();
    const existing = cart.find(function (item) { return item.id === id; });
    if (existing) existing.quantity += 1;
    else cart.push(Object.assign({}, product, { quantity: 1 }));
    saveCart(cart);
    showToast(product.name + ' added to your cart!');
  }

  function changeQuantity(id, amount) {
    const cart = getCart();
    const item = cart.find(function (entry) { return entry.id === id; });
    if (!item) return;
    item.quantity = Math.max(1, item.quantity + amount);
    saveCart(cart);
  }

  function removeFromCart(id) {
    saveCart(getCart().filter(function (item) { return item.id !== id; }));
    showToast('Item removed from your cart.');
  }

  function emptyCart() {
    saveCart([]);
    showToast('Your cart has been emptied.');
  }

  function showToast(message) {
    const toast = document.querySelector('.toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(function () { toast.classList.remove('visible'); }, 2400);
  }

  function renderCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    const cart = getCart();
    const heading = document.querySelector('.cart-heading');
    if (heading && !heading.querySelector('.clear-cart')) {
      const clearButton = document.createElement('button');
      clearButton.className = 'clear-cart';
      clearButton.type = 'button';
      clearButton.textContent = 'Empty cart';
      clearButton.addEventListener('click', emptyCart);
      heading.appendChild(clearButton);
    }
    const clearButton = heading && heading.querySelector('.clear-cart');
    if (clearButton) clearButton.hidden = cart.length === 0;
    const empty = document.getElementById('cart-empty');
    const summary = document.getElementById('cart-summary');
    container.innerHTML = '';
    if (empty) empty.hidden = cart.length > 0;
    if (summary) summary.hidden = cart.length === 0;
    cart.forEach(function (item) {
      const row = document.createElement('article');
      row.className = 'cart-row';
      row.innerHTML = '<img src="' + item.image + '" alt="' + escapeHTML(item.name) + '"><div class="cart-product"><h3>' + escapeHTML(item.name) + '</h3><p>' + escapeHTML(item.description) + '</p></div><span class="cart-unit-price">' + formatPrice(item.price) + ' each</span><div class="quantity-control" aria-label="Quantity for ' + escapeHTML(item.name) + '"><button type="button" data-quantity="-1" aria-label="Decrease quantity">−</button><span>' + item.quantity + '</span><button type="button" data-quantity="1" aria-label="Increase quantity">+</button></div><strong class="cart-row-subtotal">' + formatPrice(item.price * item.quantity) + '</strong><button class="remove-item" type="button" aria-label="Remove ' + escapeHTML(item.name) + '">×</button>';
      row.querySelectorAll('[data-quantity]').forEach(function (button) {
        button.addEventListener('click', function () { changeQuantity(item.id, Number(button.dataset.quantity)); });
      });
      row.querySelector('.remove-item').addEventListener('click', function () { removeFromCart(item.id); });
      container.appendChild(row);
    });
    const subtotal = cart.reduce(function (sum, item) { return sum + item.price * item.quantity; }, 0);
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');
    if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
    if (totalElement) totalElement.textContent = formatPrice(subtotal + DELIVERY_FEE);
    updateCartCounter(cart);
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  document.addEventListener('click', function (event) {
    const button = event.target.closest('[data-add]');
    if (button) addToCart(button.dataset.add);
  });
  window.addEventListener('storage', function (event) {
    if (event.key === STORAGE_KEY) {
      updateCartCounter(getCart());
      renderCart();
      if (typeof window.renderCheckoutSummary === 'function') window.renderCheckoutSummary();
    }
  });
  window.addEventListener('crispy-cart-updated', function () {
    updateCartCounter(getCart());
    renderCart();
    if (typeof window.renderCheckoutSummary === 'function') window.renderCheckoutSummary();
  });
  document.addEventListener('DOMContentLoaded', function () {
    updateCartCounter(getCart());
    renderCart();
  });
})();
