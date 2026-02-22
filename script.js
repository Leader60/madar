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
// دالة لجلب الأخبار من جميع المصادر
async function fetchNews() {
    try {
        const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
        
        // جلب الأخبار من جميع المصادر في newsFeeds
        const fetchPromises = newsFeeds.map(async (feed) => {
            try {
                const response = await fetch(proxyUrl + encodeURIComponent(feed.url));
                const data = await response.json();
                
                if (data.status === 'ok' && data.items) {
                    return data.items.slice(0, 3).map(item => ({
                        title: item.title,
                        source: feed.name,
                        icon: feed.icon,
                        link: item.link
                    }));
                }
                return [];
            } catch (error) {
                console.log(`خطأ في جلب ${feed.name}:`, error);
                return [];
            }
        });
        
        // انتظار كل طلبات الجلب
        const results = await Promise.all(fetchPromises);
        
        // دمج كل الأخبار في مصفوفة واحدة
        let allNews = results.flat();
        
        // إذا لم يتم جلب أي أخبار، استخدم البيانات الافتراضية
        if (allNews.length === 0) {
            allNews = [
                { title: 'عاجل: تطورات جديدة في غزة', source: 'العربية', icon: '📺', link: '#' },
                { title: 'مستجدات الأزمة الأوكرانية', source: 'الجزيرة', icon: '🌊', link: '#' },
                { title: 'الأسواق العالمية تستقر', source: 'بي بي سي', icon: '📻', link: '#' },
                { title: 'قمة عربية طارئة السبت', source: 'سكاي نيوز', icon: '☁️', link: '#' },
                { title: 'النفط يرتفع مع توقعات الطلب', source: 'العربية', icon: '📺', link: '#' },
                { title: 'مفاوضات وقف إطلاق النار', source: 'الجزيرة', icon: '🌊', link: '#' },
                { title: 'تصريحات جديدة لبايدن', source: 'بي بي سي', icon: '📻', link: '#' },
                { title: 'الطقس اليوم في الدول العربية', source: 'سكاي نيوز', icon: '☁️', link: '#' },
            ];
        }
        
        // خلط الأخبار (shuffle) عشان تتنوع
        return shuffleArray(allNews);
        
    } catch (error) {
        console.error('خطأ في جلب الأخبار:', error);
        return getDefaultNews();
    }
}

// دالة لخلط المصفوفة (عشان تتنوع الأخبار)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// دالة للأخبار الافتراضية
function getDefaultNews() {
    return [
        { title: 'عاجل: تطورات جديدة في غزة', source: 'العربية', icon: '📺', link: '#' },
        { title: 'مستجدات الأزمة الأوكرانية', source: 'الجزيرة', icon: '🌊', link: '#' },
        { title: 'الأسواق العالمية تستقر', source: 'بي بي سي', icon: '📻', link: '#' },
        { title: 'قمة عربية طارئة السبت', source: 'سكاي نيوز', icon: '☁️', link: '#' },
        { title: 'النفط يرتفع مع توقعات الطلب', source: 'العربية', icon: '📺', link: '#' },
        { title: 'مفاوضات وقف إطلاق النار', source: 'الجزيرة', icon: '🌊', link: '#' },
        { title: 'تصريحات جديدة لبايدن', source: 'بي بي سي', icon: '📻', link: '#' },
        { title: 'الطقس اليوم في الدول العربية', source: 'سكاي نيوز', icon: '☁️', link: '#' },
        { title: 'روسيا تعلق على الأحداث', source: 'روسيا اليوم', icon: '⛄', link: '#' },
        { title: 'اجتماع طارئ لمجلس الأمن', source: 'العربية', icon: '📺', link: '#' },
    ];
}
}

// دالة لتحديث شريط الأخبار
async function updateNewsTicker() {
    const ticker = document.getElementById('newsTicker');
    if (!ticker) return;
    
    const news = await fetchNews();
    
    // أضف هذا السطر للفحص
    console.log(`تم جلب ${news.length} خبر من ${newsFeeds.length} مصادر`);
    
    if (news.length === 0) {
        ticker.innerHTML = '<span class="news-item">لا يوجد أخبار محلية</span>';
        return;
    }
    
    // تكرار الأخبار لجعل الحركة مستمرة
    let html = '';
    for (let i = 0; i < 50; i++) { // تكرار الأخبار 50 مرة
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
