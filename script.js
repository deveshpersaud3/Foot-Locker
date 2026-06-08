document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mainNav = document.getElementById('main-nav');

    menuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        
        // Toggle icon between hamburger and close
        const icon = menuBtn.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Simple sticky header background transition on scroll
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});