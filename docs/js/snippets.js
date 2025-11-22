document.addEventListener("DOMContentLoaded", function () {
    Promise.all([
        fetch("footer.html").then(response => response.text()),
        fetch("cookie_banner.html").then(response => response.text())
    ]).then(([footerData, cookieData]) => {
        document.body.insertAdjacentHTML('beforeend', footerData);
        document.body.insertAdjacentHTML('beforeend', cookieData);

        // Set current year in footer
        document.getElementById('year').textContent = new Date().getFullYear();

        // Load and initialize cookie script
        const script = document.createElement('script');
        script.src = 'js/cookies.js';
        script.onload = function () {
            initCookieConsent();
        };
        document.body.appendChild(script);
    });


});