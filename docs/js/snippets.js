document.addEventListener("DOMContentLoaded", function() {
    // Load footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
            // Set current year in footer
            document.getElementById('year').textContent = new Date().getFullYear();
        });

    // Load cookie banner
    fetch("cookie_banner.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
            
            const script = document.createElement('script');
            script.src = 'js/cookies.js';
            script.onload = function() {
                initCookieConsent(); // Initialize cookie consent logic
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