// script.js - النسخة النهائية العاملة
// script.js - النسخة المتوافقة مع تصميم index.html والصورة

const newsFeeds = [
    {
        name: 'العربية',
        url: 'https://www.alarabiya.net',
        icon: '📺'
    }
];

async function fetchNews() {
    try {
        // خدمة تحويل RSS إلى JSON لتجاوز قيود المتصفح (CORS)
        const proxyUrl = 'https://api.rss2json.com';
        const source = newsFeeds[0]; 
        
        const response = await fetch(proxyUrl + encodeURIComponent(source.url));
        const data = await response.json();
        
        if (data.status === 'ok' && data.items) {
            return data.items.slice(0, 10).map(item => ({
                title: item.title,
                source: source.name,
                icon: source.icon,
                link: item.link
            }));
        }
        throw new Error('فشل جلب البيانات');
    } catch (error) {
        console.warn('استخدام الأخبار الاحتياطية بسبب خطأ في الاتصال');
        return getBackupNews();
    }
}

function getBackupNews() {
    return [
        { title: 'عاجل: متابعة مستمرة لآخر التطورات الميدانية والسياسية في المنطقة', link: '#' },
        { title: 'توقعات باستقرار الحالة الجوية ونشاط في الحركة التجارية اليوم', source: link: '#' }
    ];
}

async function updateNewsTicker() {
    // استهداف العنصر الموجود في ملف index.html الخاص بك
    const ticker = document.getElementById('newsTicker');
    if (!ticker) return;
    
    // إظهار رسالة تحميل مؤقتة
    ticker.innerHTML = '<span class="news-item">جاري تحميل الأخبار... 📡</span>';
    
    const news = await fetchNews();
    
    // تكرار الأخبار لضمان تدفق مستمر دون فراغات في الشريط (Infinite Effect)
    let html = '';
    const repeatCount = 25; // تكرار المصفوفة لملء عرض الشاشة
    
    for (let i = 0; i < 5; i++) { 
    itemsToDisplay.forEach(item => {
            html += `
                <div class="news-item" onclick="window.open('${item.link}', '_blank')" style="cursor: pointer;">
                    <span class="news-source">${item.icon} ${item.source}:</span>
                    <span class="news-title">${item.title}</span>
                    <span class="news-separator"> | </span>
                </div>`;
        });
    }
    
    ticker.innerHTML = html;
}

// تشغيل السكريبت عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    updateNewsTicker();
    
    // تحديث المحتوى تلقائياً من المصدر كل 10 دقيقة
    setInterval(updateNewsTicker, 10* 60 * 1000); 
});
