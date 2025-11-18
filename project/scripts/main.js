const hamburgerMenu = document.getElementById('hamburger-menu');
const mainNav = document.getElementById('main-nav');

hamburgerMenu.addEventListener('click', () => {
    // Toggle the 'active' class on the navigation menu
    mainNav.querySelector('.nav-links').classList.toggle('active');
});



document.addEventListener('DOMContentLoaded', function () {
    const hamburgerButton = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav');

    if (hamburgerButton && mainNav) {
        hamburgerButton.addEventListener('click', function () {
            mainNav.classList.toggle('active');
        });
    }
});
