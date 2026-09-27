(function () {
  'use strict';
  const grid = document.getElementById('menu-grid');
  if (!grid || !window.CrispyBites) return;
  const products = window.CrispyBites.products;
  const search = document.getElementById('menu-search');
  const result = document.getElementById('menu-result');
  const empty = document.getElementById('empty-search');
  const initialFilter = document.querySelector('[data-filter][id="' + decodeURIComponent(window.location.hash.slice(1)) + '"]');
  let activeCategory = initialFilter ? initialFilter.dataset.filter : 'all';
  if (initialFilter) {
    document.querySelectorAll('[data-filter]').forEach(function (button) {
      button.classList.toggle('active', button === initialFilter);
    });
  }

  function render() {
    const query = search.value.trim().toLowerCase();
    const filtered = products.filter(function (product) {
      const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
      const searchMatch = (product.name + ' ' + product.description + ' ' + product.category).toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });
    grid.innerHTML = filtered.map(function (product) {
      return '<article class="food-card"><div class="food-image"><img src="' + product.image + '" alt="' + escapeHTML(product.name) + '" loading="lazy"><button class="favorite" type="button" aria-label="Add ' + escapeHTML(product.name) + ' to favorites" aria-pressed="false">♡</button><span class="tag">' + escapeHTML(product.category.toUpperCase()) + '</span></div><div class="food-info"><h3>' + escapeHTML(product.name) + '</h3><p>' + escapeHTML(product.description) + '</p><div class="food-bottom"><strong>' + window.CrispyBites.formatPrice(product.price) + '</strong><button class="add-button" type="button" data-add="' + escapeHTML(product.id) + '">＋ Add</button></div></div></article>';
    }).join('');
    result.textContent = 'Showing ' + filtered.length + (filtered.length === 1 ? ' delicious item' : ' delicious items');
    empty.hidden = filtered.length > 0;
    grid.hidden = filtered.length === 0;
    grid.querySelectorAll('.favorite').forEach(function (button) {
      button.addEventListener('click', function () {
        const favorite = button.classList.toggle('is-favorite');
        button.textContent = favorite ? '♥' : '♡';
        button.setAttribute('aria-pressed', String(favorite));
      });
    });
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  document.querySelectorAll('[data-filter]').forEach(function (button) {
    button.addEventListener('click', function () {
      activeCategory = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(function (filter) { filter.classList.toggle('active', filter === button); });
      if (button.id) history.replaceState(null, '', '#' + button.id);
      else history.replaceState(null, '', window.location.pathname);
      render();
    });
  });
  search.addEventListener('input', render);
  search.addEventListener('keydown', function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      search.focus();
    }
  });
  render();
})();
