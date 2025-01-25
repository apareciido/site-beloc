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