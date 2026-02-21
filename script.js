// script.js
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('langToggle');
    const html = document.documentElement;

    langToggle.addEventListener('click', function() {
        if (html.getAttribute('dir') === 'rtl') {
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', 'en');
            langToggle.textContent = 'عربي';
        } else {
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
            langToggle.textContent = 'English';
        }
    });
});
