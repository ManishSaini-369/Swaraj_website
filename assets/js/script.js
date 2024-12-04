fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const productList = document.getElementById('product-list');
    const filters = document.querySelector('.portfolio-filters');

    // Function to render products
    function renderProducts(filterCategory = '*') {
      productList.innerHTML = ''; // Clear current products
    
      const filteredProducts = filterCategory === '*'
        ? products
        : products.filter(product => product.category === filterCategory);
    
      filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = `col-md-4`; // Bootstrap grid column
    
        // Limit the product description to 100 words
        const limitedDescription = product.description.split(' ').slice(0, 20).join(' ') + (product.description.split(' ').length > 20 ? '...' : '');
    
        productCard.innerHTML = `
          <div class="card">
            <img src="${product.image}" class="card-img-top" style="width: 100%; height: 200px; object-fit: cover" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${limitedDescription}</p>
              
            </div>
            <a href="product.html?id=${product.id}" class="btn btn-primary">View Details</a>
          </div>
        `;
        productList.appendChild(productCard);
      });
    }
    

    // Render all products initially
    renderProducts();

    // Event listener for filter clicks
    filters.addEventListener('click', event => {
      if (event.target.tagName === 'LI') {
        // Remove active class from all filter buttons
        document.querySelectorAll('.portfolio-filters li').forEach(li => li.classList.remove('filter-active'));

        // Add active class to the clicked button
        event.target.classList.add('filter-active');

        const filter = event.target.getAttribute('data-filter');
        // Render products based on selected filter
        renderProducts(filter === '*' ? '*' : filter);
      }
    });

    // Check if there's a filter passed via URL (e.g., ?filter=Category2)
    const urlParams = new URLSearchParams(window.location.search);
    const filterFromURL = urlParams.get('filter');
    if (filterFromURL) {
      // Apply the filter based on URL parameter
      document.querySelectorAll('.portfolio-filters li').forEach(li => {
        li.classList.remove('filter-active');
        if (li.getAttribute('data-filter') === filterFromURL) {
          li.classList.add('filter-active');
        }
      });
      renderProducts(filterFromURL);
    }
  })
  .catch(error => console.error('Error loading products:', error));
