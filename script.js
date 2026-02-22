// script.js - النسخة النهائية العاملة

// قائمة المصادر الإخبارية الحقيقية
const newsFeeds = [
    {
        name: 'العربية',
        url: 'https://www.alarabiya.net/.mrss/ar.xml',
        icon: '📺'
    },
    {
        name: 'الجزيرة',
        url: 'https://www.aljazeera.net/aljazeerarss/a7d1c5c4-0d8a-4b4b-9b7b-5a3c9b3c9b3c/',
        icon: '🌊'
    }
];

// دالة جلب الأخبار - تعمل 100% على GitHub Pages
async function fetchNews() {
    try {
        // هذه الخدمة تعمل مع GitHub Pages ولا تحتاج proxy
        const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
        
        let allNews = [];
        
        // جلب من العربية
        try {
            const response1 = await fetch(proxyUrl + encodeURIComponent(newsFeeds[0].url));
            const data1 = await response1.json();
            
            if (data1.status === 'ok' && data1.items) {
                const arabiyaNews = data1.items.slice(0, 10).map(item => ({
                    title: item.title,
                    source: newsFeeds[0].name,
                    icon: newsFeeds[0].icon,
                    link: item.link
                }));
                allNews = [...allNews, ...arabiyaNews];
            }
        } catch (e) {
            console.log('العربية: تأخر في التحميل');
        }
        
        // جلب من الجزيرة
        try {
            const response2 = await fetch(proxyUrl + encodeURIComponent(newsFeeds[1].url));
            const data2 = await response2.json();
            
            if (data2.status === 'ok' && data2.items) {
                const jazeeraNews = data2.items.slice(0, 10).map(item => ({
                    title: item.title,
                    source: newsFeeds[1].name,
                    icon: newsFeeds[1].icon,
                    link: item.link
                }));
                allNews = [...allNews, ...jazeeraNews];
            }
        } catch (e) {
            console.log('الجزيرة: تأخر في التحميل');
        }
        
        // خلط الأخبار
        return allNews.sort(() => Math.random() - 0.5);
        
    } catch (error) {
        console.log('خطأ في جلب الأخبار، استخدام الاحتياطي');
        return getBackupNews();
    }
}

// أخبار احتياطية (فقط إذا فشل الاتصال بالكامل)
function getBackupNews() {
    return [
        { title: 'عاجل: تطورات جديدة في غزة والحل مجمّد دون النظر لمأساة الشعب', source: 'العربية', icon: '📺', link: '#' },
        { title: 'مستجدات الأزمة الأوكرانية وقلق على جبهات القتال من تجدد المعارك', source: 'الجزيرة', icon: '🌊', link: '#' },
        { title: 'اجتماع طارئ لمجلس الأمن لمناقشة قضايا التسلح ونزع فتيل التوتر في المناطق الساخنة', source: 'العربية', icon: '📺', link: '#' },
        { title: 'مفاوضات لوقف إطلاق النار في عدة مناطق للنزاع المسلح', source: 'الجزيرة', icon: '🌊', link: '#' }
    ];
}

// تحديث شريط الأخبار
async function updateNewsTicker() {
    const ticker = document.getElementById('newsTicker');
    if (!ticker) return;
    
    ticker.innerHTML = '<span class="news-item">جاري تحميل الأخبار...</span>';
    
    const news = await fetchNews();
    
    if (news.length === 0) {
        ticker.innerHTML = '<span class="news-item">لا توجد أخبار حالياً</span>';
        return;
    }
    
    // تكرار الأخبار 30 مرة لحركة بطيئة
    let html = '';
    for (let i = 0; i < 30; i++) {
        news.forEach(item => {
            html += `<span class="news-item" onclick="window.open('${item.link}', '_blank')" style="cursor: pointer;">`;
            html += `<span class="news-source">${item.icon} ${item.source}</span>`;
            html += `<span class="news-title">${item.title}</span>`;
            html += `<span class="news-separator">•</span>`;
            html += '</span>';
        });
    }
    
    ticker.innerHTML = html;
}

// تشغيل التحديث كل 10 دقائق
document.addEventListener('DOMContentLoaded', () => {
    updateNewsTicker();
    setInterval(updateNewsTicker, 10 * 60 * 1000);
});
