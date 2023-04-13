export function initNavBarMenu() {
    document.addEventListener("DOMContentLoaded", function () {

        const navbarBurgers = document.querySelectorAll('.navbar-burger');

        navbarBurgers.forEach(navbarBurger => {
            navbarBurger.addEventListener('click', function (e) {
                e.preventDefault();

                // Get the target from the "data-target" attribute
                const target = this.getAttribute('data-target');
                const targetElement = document.getElementById(target);

                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                this.classList.toggle('is-active');
                targetElement.classList.toggle('is-active');
            });
        });
    });
}