// script.js
document.addEventListener('DOMContentLoaded', function() {
    // عناصر الصفحة
    const langToggle = document.getElementById('langToggle');
    const langText = document.querySelector('.lang-text');
    const langIcon = document.getElementById('langIcon');
    const html = document.documentElement;
    const navBrand = document.getElementById('navBrand');
    
    // جميع روابط القائمة
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // نصوص القائمة باللغتين (بنفس ترتيب الروابط)
    const menuTexts = {
        arabic: ['الرئيسية', 'سياسة', 'اقتصاد', 'مجتمع', 'تكنولوجيا', 'متفرقات', 'المدار', 'تواصل معنا'],
        english: ['Home', 'Politics', 'Economy', 'Community', 'Technology', 'Misc', 'About', 'Contact']
    };

    // دالة تبديل اللغة
    function setLanguage(lang) {
        if (lang === 'en') {
            // تغيير اتجاه الصفحة
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', 'en');
            
            // تغيير نص الزر
            if (langText) langText.textContent = 'عربي';
            if (langIcon) langIcon.textContent = '🇸🇦';
            
            // تغيير عبارة مدار - Madar
            if (navBrand) navBrand.textContent = 'Madar - مدار';
            
            // تغيير نصوص القائمة للإنجليزية
            navLinks.forEach((link, index) => {
                if (link) link.textContent = menuTexts.english[index];
            });
            
            console.log('تم التبديل إلى الإنجليزية');
        } else {
            // تغيير اتجاه الصفحة
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
            
            // تغيير نص الزر
            if (langText) langText.textContent = 'English';
            if (langIcon) langIcon.textContent = '🇬🇧';
            
            // تغيير عبارة مدار - Madar
            if (navBrand) navBrand.textContent = 'مدار - Madar';
            
            // تغيير نصوص القائمة للعربية
            navLinks.forEach((link, index) => {
                if (link) link.textContent = menuTexts.arabic[index];
            });
            
            console.log('تم التبديل إلى العربية');
        }
    }

    // حدث الضغط على زر اللغة
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            if (html.getAttribute('dir') === 'rtl') {
                setLanguage('en');
            } else {
                setLanguage('ar');
            }
        });
    }

    // تأكد من أن الصفحة تبدأ بالعربية
    setLanguage('ar');
});
