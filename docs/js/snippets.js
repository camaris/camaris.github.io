document.addEventListener("DOMContentLoaded", function() {
    // Load footer
    fetch("_footer.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
            // Set current year in footer
            document.getElementById('year').textContent = new Date().getFullYear();
        });

    // Load cookie banner
    fetch("_cookie_banner.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });

    // Load privacy content if on privacy page
    if (window.location.pathname.endsWith("privacy.html")) {
        fetch("_privacy_content.html")
            .then(response => response.text())
            .then(data => {
                document.querySelector("main.container").innerHTML = data;
            });
    }
});