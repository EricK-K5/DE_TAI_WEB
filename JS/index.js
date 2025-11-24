

    document.addEventListener('DOMContentLoaded', function() {
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const mainNav = document.querySelector('.d_h'); 

        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    })

    document.addEventListener('DOMContentLoaded', function() {
        const hamburgerMenu = document.querySelector('.menu-toggle');
        const mainNav = document.querySelector('.nav-menu'); 

        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    })

