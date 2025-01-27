//navbar

const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      if (navLinks.classList.contains('active')) {
        menuToggle.textContent = '✖'; // Change to X when menu is open
      } else {
        menuToggle.textContent = '☰'; // Change back to ☰ when menu is closed
      }
    });

//navbar fim

//catálogo

function filterProducts(category) {
  const products = document.querySelectorAll('.product');
  const showAllButton = document.getElementById('showAllButton');

  if (category === 'all') {
    products.forEach(product => product.style.display = 'block');
    showAllButton.style.display = 'none';
  } else {
    products.forEach(product => {
      product.style.display = product.getAttribute('data-category') === category ? 'block' : 'none';
    });
    showAllButton.style.display = 'inline-block';
  }
}

//catálogo fim