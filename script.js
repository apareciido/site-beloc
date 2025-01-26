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
  if (category === 'all') {
    products.forEach(product => product.style.display = 'block');
  } else {
    products.forEach(product => {
      product.style.display = product.getAttribute('data-category') === category ? 'block' : 'none';
    });
  }
}

//catálogo fim