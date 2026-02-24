// روابط RSS الرسمية
const rssFeeds = [
    'https://www.aljazeera.net',
    'https://www.alarabiya.net'
];

async function loadNews() {
    const ticker = document.getElementById('news-ticker');
    if (!ticker) return; // حماية في حال عدم وجود العنصر

    try {
        const allNews = [];
        
        // جلب البيانات من المصادر
        for (const url of rssFeeds) {
            const apiUrl = `https://api.rss2json.com{encodeURIComponent(url)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            if (data.status === 'ok') {
                allNews.push(...data.items);
            }
        }

        // ترتيب الأخبار حسب الأحدث
        allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        if (allNews.length > 0) {
            ticker.innerHTML = ''; // مسح رسالة التحميل
            
            allNews.forEach(item => {
                const newsItem = document.createElement('span');
                newsItem.className = 'news-item';
                
                // تمييز المصدر
                const sourceIcon = item.link.includes('alarabiya') ? '🔴 العربية:' : '🔵 الجزيرة:';
                
                // إضافة النص مع رابط للمقال الأصلي (اختياري)
                newsItem.innerHTML = ` ${sourceIcon} ${item.title} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; `;
                ticker.appendChild(newsItem);
            });
        }
    } catch (error) {
        console.error("تعذر جلب الأخبار:", error);
        ticker.innerHTML = '<span class="news-item">⚠️ تعذر تحديث الأخبار حالياً.. تابعنا لاحقاً</span>';
    }
}

// تشغيل الوظيفة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadNews);

// تحديث الأخبار تلقائياً كل 15 دقيقة دون إعادة تحميل الصفحة
setInterval(loadNews, 900000);
