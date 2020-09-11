$(document).ready( () => {
    const toggleButton = document.querySelector('#toggleButton');
    const navigationButtons = document.querySelector('.navigation-buttons');

    const toggleMenu = () => {
        $(navigationButtons).toggleClass('navigation-buttons-active');
    };

    toggleButton.addEventListener('click', toggleMenu);
});