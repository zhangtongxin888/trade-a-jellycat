import './style.css';

document.documentElement.classList.add('js');

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    toggle.setAttribute('aria-expanded', String(!open));
  });

  // Close the menu when a link is chosen (mobile)
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Footer year
const year = document.querySelector('[data-year]');
if (year) {
  year.textContent = String(new Date().getFullYear());
}
