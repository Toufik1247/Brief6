export function initNavBarMenu() {
    document.addEventListener("DOMContentLoaded", function () {

        const navbarBurgers = document.querySelectorAll('.navbar-burger');

        navbarBurgers.forEach(navbarBurger => {
            navbarBurger.addEventListener('click', function (e) {
                e.preventDefault();

                const target = this.getAttribute('data-target');
                const targetElement = document.getElementById(target);

                this.classList.toggle('is-active');
                targetElement.classList.toggle('is-active');
            });
        });
    });
}

initNavBarMenu()