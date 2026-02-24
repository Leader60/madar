// روابط RSS الرسمية (الجزيرة والعربية)
const rssFeeds = [
    'https://www.aljazeera.net',
    'https://www.alarabiya.net'
];

async function loadNews() {
    const ticker = document.getElementById('news-ticker');
    ticker.innerHTML = 'جاري تحميل الأخبار...';

    try {
        // تحميل البيانات من المصدرين ودمجهما
        const allNews = [];
        
        for (const url of rssFeeds) {
            const apiUrl = `https://api.rss2json.com{encodeURIComponent(url)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            if (data.status === 'ok') {
                allNews.push(...data.items);
            }
        }

        // ترتيب الأخبار حسب الأحدث (اختياري)
        allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        if (allNews.length > 0) {
            ticker.innerHTML = ''; // مسح رسالة التحميل
            
            allNews.forEach(item => {
                const newsItem = document.createElement('span');
                newsItem.className = 'news-item';
                // تم إضافة اسم المصدر تلقائياً لتمييز الخبر
                const source = item.link.includes('alarabiya') ? 'العربية' : 'الجزيرة';
                newsItem.innerHTML = ` ⚡ <b style="color: #ff4500;">[${source}]</b> ${item.title} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; `;
                ticker.appendChild(newsItem);
            });
        } else {
            throw new Error("لم يتم العثور على أخبار");
        }

    } catch (error) {
        console.error("تعذر تحميل الأخبار:", error);
        // عرض أخبار احتياطية في حال فشل الـ API
        displayBackupNews();
    }
}

function displayBackupNews() {
    const ticker = document.getElementById('news-ticker');
    const backupData = [
        "عاجل: تحديثات إخبارية مستمرة من المصادر الرسمية",
        "تابعوا آخر المستجدات عبر شريطنا الإخباري",
        "خطأ في الاتصال: يرجى التحقق من جودة الإنترنت"
    ];
    ticker.innerHTML = backupData.map(text => ` ⚠️ ${text} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; `).join('');
}

// تشغيل الوظيفة
document.addEventListener('DOMContentLoaded', loadNews);
