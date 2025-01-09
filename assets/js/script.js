document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const filters = document.querySelector('.portfolio-filters');
  const loadMoreBtn = document.getElementById('load-more');

  let products = [];
  let currentPage = 0;
  const itemsPerPage = 6;

  // Debounce utility
  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Fetch products data
  function fetchProducts() {
    return fetch('products.json')
      .then(response => response.json())
      .then(data => {
        products = data;
        localStorage.setItem('products', JSON.stringify(data)); // Cache products
        initialize();
      })
      .catch(() => {
        const cachedProducts = localStorage.getItem('products');
        if (cachedProducts) {
          products = JSON.parse(cachedProducts);
          initialize();
        } else {
          console.error('Failed to load products.');
        }
      });
  }

  // Render paginated products
  function renderPaginatedProducts(page, filterCategory = '*') {
    const startIndex = page * itemsPerPage;
  
    // Filter products based on the selected category
    const filteredProducts = filterCategory === '*'
      ? products
      : products.filter(product => product.category === filterCategory);
  
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  
    // Render the products
    paginatedProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'col-md-4';
  
      const limitedDescription = product.description.length > 100
        ? product.description.slice(0, 50) + '...'
        : product.description;
  
      productCard.innerHTML = `
        <div class="card" style="background-color: var(--surface-color); color: var(--heading-color);">
          <img src="${product.image}" loading="lazy" class="card-img-top" style="width: 100%; height: 200px; object-fit: fill" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title" style="font-size: 16px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bolder" title="${product.name}">${product.name}</h5>
            <p class="card-text" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${limitedDescription}</p>
            <a href="product.html?id=${product.id}" class="btn btn-primary" style="background-color: var(--accent-color); border-radius: 30px; border: 2px solid transparent; transition: 0.3s all ease-in-out; font-size: 14px; color: var(--contrast-color) !important;">View Details</a>
          </div>
        </div>
      `;
      productList.appendChild(productCard);
    });
  
    // Check if more products are available to load
    if ((page + 1) * itemsPerPage >= filteredProducts.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline';
    }
  }
  

  // Initialize filters and rendering
  function initialize() {
    const filterFromURL = new URLSearchParams(window.location.search).get('filter');
    const activeFilter = filterFromURL || '*';

    document.querySelectorAll('.portfolio-filters li').forEach(li => {
      li.classList.remove('filter-active');
      if (li.getAttribute('data-filter') === activeFilter) {
        li.classList.add('filter-active');
      }
    });

    productList.innerHTML = ''; // Clear skeletons
    renderPaginatedProducts(0, activeFilter);
    currentPage = 0;
  }

  // Add event listener for filters
  filters.addEventListener('click', debounce(event => {
    if (event.target.tagName === 'LI') {
      const filter = event.target.getAttribute('data-filter');
      document.querySelectorAll('.portfolio-filters li').forEach(li => li.classList.remove('filter-active'));
      event.target.classList.add('filter-active');
      productList.innerHTML = ''; // Clear existing cards
      currentPage = 0;
      renderPaginatedProducts(0, filter);
    }
  }, 300));

  // Add event listener for "Load More"
  loadMoreBtn.addEventListener('click', () => {
    const activeFilter = document.querySelector('.filter-active').getAttribute('data-filter');
    currentPage++;
    renderPaginatedProducts(currentPage, activeFilter);
  });

  fetchProducts();
});

function initialize() {
  const productList = document.getElementById('product-list');
  // Show skeleton loaders
  productList.innerHTML = `
    <div class="col-md-4"><div class="card-skeleton"></div></div>
    <div class="col-md-4"><div class="card-skeleton"></div></div>
    <div class="col-md-4"><div class="card-skeleton"></div></div>
  `;
  
  renderPaginatedProducts(currentPage); // Fetch and render actual products after skeleton loaders
}

