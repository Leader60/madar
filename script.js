// script.js
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('langToggle');
    const langText = document.querySelector('.lang-text');
    const langIcon = document.getElementById('langIcon');
    const html = document.documentElement;
    
    // ترجمة عناصر القائمة
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navBrand = document.getElementById('navBrand');
    
    // نصوص القائمة باللغتين
    const menuTexts = {
        arabic: ['الرئيسية', 'سياسة', 'اقتصاد', 'مجتمع', 'تكنولوجيا', 'متفرقات', 'المدار', 'تواصل معنا'],
        english: ['Home', 'Politics', 'Economy', 'Community', 'Technology', 'Misc', 'About', 'Contact']
    };

    function setLanguage(lang) {
        if (lang === 'en') {
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', 'en');
            langText.textContent = 'عربي';
            langIcon.textContent = '🇸🇦';
            navBrand.textContent = 'Madar - مدار';
            
            // تغيير نصوص القائمة للإنجليزية
            navLinks.forEach((link, index) => {
                link.textContent = menuTexts.english[index];
            });
        } else {
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
            langText.textContent = 'English';
            langIcon.textContent = '🇬🇧';
            navBrand.textContent = 'مدار - Madar';
            
            // تغيير نصوص القائمة للعربية
            navLinks.forEach((link, index) => {
                link.textContent = menuTexts.arabic[index];
            });
        }
    }

    langToggle.addEventListener('click', function() {
        if (html.getAttribute('dir') === 'rtl') {
            setLanguage('en');
        } else {
            setLanguage('ar');
        }
    });

    // تأكد من أن روابط القائمة تحافظ على مساراتها الصحيحة
    // (لأننا غيرنا النصوص فقط وليس الـ href)
});
