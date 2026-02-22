// قائمة بمصادر RSS الإخبارية
const newsFeeds = [
    {
        name: 'العربية',
        url: 'https://www.alarabiya.net/.mrss/ar.xml',
        icon: '🇸🇦'
    },
    {
        name: 'الجزيرة',
        url: 'https://www.aljazeera.net/aljazeerarss/a7d1c5c4-0d8a-4b4b-9b7b-5a3c9b3c9b3c/',
        icon: '🇶🇦'
    },
    {
        name: 'بي بي سي',
        url: 'http://feeds.bbci.co.uk/arabic/rss.xml',
        icon: '🇬🇧'
    },
     {
        name: 'روسيا اليوم',
        url: 'http://arabic.rt.com/arabic/rss.xml',
        icon: '🎙'
    },
    {
        name: 'سكاي نيوز',
        url: 'https://www.skynewsarabia.com/rss/',
        icon: '🇦🇪'
    }
];

// دالة لجلب الأخبار من RSS (باستخدام خدمة مؤقتة)
async function fetchNews() {
    try {
        // استخدام خدمة مؤقتة لتحويل RSS إلى JSON
        const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
        
        // جلب الأخبار من أول مصدرين (العربية والجزيرة)
        const sources = [
            encodeURIComponent('https://www.alarabiya.net/.mrss/ar.xml'),
            encodeURIComponent('https://www.aljazeera.net/aljazeerarss/a7d1c5c4-0d8a-4b4b-9b7b-5a3c9b3c9b3c/')
        ];
        
        const response1 = await fetch(proxyUrl + sources[0]);
        const response2 = await fetch(proxyUrl + sources[1]);
        
        const data1 = await response1.json();
        const data2 = await response2.json();
        
        let allNews = [];
        
        if (data1.status === 'ok' && data1.items) {
            const arabiyaNews = data1.items.slice(0, 5).map(item => ({
                title: item.title,
                source: 'العربية',
                icon: '🇸🇦',
                link: item.link
            }));
            allNews = [...allNews, ...arabiyaNews];
        }
        
        if (data2.status === 'ok' && data2.items) {
            const jazeeraNews = data2.items.slice(0, 5).map(item => ({
                title: item.title,
                source: 'الجزيرة',
                icon: '🇶🇦',
                link: item.link
            }));
            allNews = [...allNews, ...jazeeraNews];
        }
        
        return allNews;
        
    } catch (error) {
        console.error('خطأ في جلب الأخبار:', error);
        // بيانات افتراضية في حالة فشل الاتصال
        return [
            { title: 'عاجل: تطورات جديدة في غزة', source: 'العربية', icon: '🇸🇦', link: '#' },
            { title: 'مستجدات الأزمة الأوكرانية', source: 'الجزيرة', icon: '🇶🇦', link: '#' },
            { title: 'الأسواق العالمية تستقر', source: 'العربية', icon: '🇸🇦', link: '#' },
            { title: 'قمة عربية طارئة السبت', source: 'الجزيرة', icon: '🇶🇦', link: '#' },
            { title: 'النفط يرتفع مع توقعات الطلب', source: 'العربية', icon: '🇸🇦', link: '#' },
            { title: 'مفاوضات وقف إطلاق النار', source: 'الجزيرة', icon: '🇶🇦', link: '#' }
        ];
    }
}

// دالة لتحديث شريط الأخبار
async function updateNewsTicker() {
    const ticker = document.getElementById('newsTicker');
    if (!ticker) return;
    
    const news = await fetchNews();
    
    if (news.length === 0) {
        ticker.innerHTML = '<span class="news-item">لا توجد أخبار حالياً</span>';
        return;
    }
    
    // تكرار الأخبار لجعل الحركة مستمرة
    let html = '';
    for (let i = 0; i < 3; i++) { // تكرار الأخبار 3 مرات
        news.forEach(item => {
            html += `<span class="news-item" onclick="window.open('${item.link}', '_blank')" style="cursor: pointer;">
                <span class="news-source">${item.icon} ${item.source}</span>
                <span class="news-title">${item.title}</span>
                <span class="news-separator">•</span>
            </span>`;
        });
    }
    
    ticker.innerHTML = html;
    
    // إيقاف الحركة عند المرور بالماوس
    ticker.addEventListener('mouseenter', () => {
        ticker.style.animationPlayState = 'paused';
    });
    
    ticker.addEventListener('mouseleave', () => {
        ticker.style.animationPlayState = 'running';
    });
}

// تحديث الأخبار كل 10 دقائق
function startNewsTicker() {
    updateNewsTicker();
    setInterval(updateNewsTicker, 10 * 60 * 1000); // كل 10 دقائق
}

// بدء تشغيل شريط الأخبار عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', startNewsTicker);

console.log('موقع مدار - تم تفعيل شريط الأخبار المتحرك');
