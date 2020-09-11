$(document).ready( () => {
    const toggleButton = document.querySelector('#toggleButton');
    const navbarItems = document.querySelector('.navbar-items');

    const toggleMenu = () => {
        $(navbarItems).toggleClass('navbar-items-active');
    };

    toggleButton.addEventListener('click', toggleMenu);
});