// JavaScript to toggle the navbar on mobile view
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.getElementById('nav-links');
    const navToggle = document.createElement('button');
    navToggle.classList.add('nav-toggle');
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.navbar .container').prepend(navToggle);
  
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  });
  