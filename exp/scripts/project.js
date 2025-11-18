
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function () {
            // Toggle the 'open' class on the mobile navigation menu
            mobileNav.classList.toggle('open');
            // Toggle an 'active' class on the button itself for styling the icon
            menuToggle.classList.toggle('active');
        });
    }
});
