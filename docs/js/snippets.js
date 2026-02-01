document.addEventListener("DOMContentLoaded", function() {
    Promise.all([
        fetch("header.html").then(response => response.text()),
        fetch("footer.html").then(response => response.text()),
        fetch("cookie_banner.html").then(response => response.text())
    ]).then(([headerData, footerData, cookieData]) => {
        const header = document.querySelector('.site-header');
        if(header) {
            header.innerHTML = headerData;

            // Get the current page's path
            const currentPage = window.location.pathname.split("/").pop();

            // Find the corresponding link in the navigation and add the 'active' class
            const navLinks = header.querySelectorAll('.nav a');
            navLinks.forEach(link => {
                const linkPage = link.getAttribute('href').split("/").pop();
                if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }

        const footer = document.querySelector('.site-footer');
        if(footer) {
            footer.innerHTML = footerData;
            document.getElementById('year').textContent = new Date().getFullYear();
        }
        document.body.insertAdjacentHTML('beforeend', cookieData);

        // Load and initialize cookie script
        const script = document.createElement('script');
        script.src = 'js/cookies.js';
        script.onload = function() {
            initCookieConsent();
        };
        document.body.appendChild(script);
    });

    // Load privacy content if on privacy page
    if (window.location.pathname.endsWith("privacy.html")) {
        fetch("privacy_content.html")
            .then(response => response.text())
            .then(data => {
                document.querySelector("main.container").innerHTML = data;
            });
    }
});