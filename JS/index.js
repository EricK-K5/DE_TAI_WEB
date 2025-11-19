

    document.addEventListener('DOMContentLoaded', function() {
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const mainNav = document.querySelector('.d_h'); 

        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    })

