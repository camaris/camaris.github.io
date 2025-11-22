// Smooth scrolling for navigation links (safe guard + accessibility focus)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // move focus for keyboard/screen reader users (best-effort)
        try {
            target.setAttribute('tabindex', '-1');
            target.focus();
        } catch (err) {
            // ignore - focus is non-critical
        }
    });
});