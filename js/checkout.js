(function () {
  'use strict';
  const form = document.getElementById('checkout-form');
  const layout = document.getElementById('checkout-layout');
  const success = document.getElementById('order-success');
  if (!form || !window.CrispyBites) return;

  window.renderCheckoutSummary = function () {
    const cart = window.CrispyBites.getCart();
    const container = document.getElementById('checkout-items');
    const subtotalElement = document.getElementById('checkout-subtotal');
    const totalElement = document.getElementById('checkout-total');
    if (!container || !subtotalElement || !totalElement) return;
    container.innerHTML = cart.map(function (item) {
      return '<div class="checkout-item"><img src="' + item.image + '" alt="' + escapeHTML(item.name) + '"><div><strong>' + escapeHTML(item.name) + '</strong><span>Qty ' + item.quantity + ' · ' + window.CrispyBites.formatPrice(item.price) + '</span></div><b>' + window.CrispyBites.formatPrice(item.price * item.quantity) + '</b></div>';
    }).join('');
    const subtotal = cart.reduce(function (sum, item) { return sum + item.price * item.quantity; }, 0);
    subtotalElement.textContent = window.CrispyBites.formatPrice(subtotal);
    totalElement.textContent = window.CrispyBites.formatPrice(subtotal + window.CrispyBites.deliveryFee);
  };

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const cart = window.CrispyBites.getCart();
    if (cart.length === 0) {
      window.location.href = 'menu.html';
      return;
    }
    try {
      localStorage.removeItem('crispyBitesCart');
    } catch (error) {
      console.error('Unable to clear the Crispy Bites cart after checkout.', error);
      return;
    }
    window.dispatchEvent(new CustomEvent('crispy-cart-updated', { detail: { cart: [] } }));
    layout.hidden = true;
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  window.renderCheckoutSummary();
})();
