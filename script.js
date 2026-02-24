// روابط RSS الرسمية
const rssFeeds = [
    'https://www.aljazeera.net',
    'https://www.alarabiya.net'
];

async function loadNews() {
    const ticker = document.getElementById('news-ticker');
    if (!ticker) return;

    try {
        let allNews = [];

        for (const url of rssFeeds) {
            // استخدام وسيط AllOrigins لتجاوز حظر المتصفح (CORS)
            const proxyUrl = `https://api.allorigins.win{encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            // تحويل نص XML إلى كائنات JSON يدوياً
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "text/xml");
            const items = xmlDoc.querySelectorAll("item");

            items.forEach(item => {
                allNews.push({
                    title: item.querySelector("title")?.textContent,
                    link: item.querySelector("link")?.textContent,
                    source: url.includes('alarabiya') ? 'العربية' : 'الجزيرة'
                });
            });
        }

        if (allNews.length > 0) {
            ticker.innerHTML = ''; 
            // دمج الأخبار وعرضها
            const content = allNews.slice(0, 15).map(item => 
                `<span class="news-item"> ⚡ <strong>[${item.source}]</strong> ${item.title}</span>`
            ).join(' <span class="news-separator">•</span> ');

            // تكرار المحتوى لضمان انسيابية الحركة في الـ CSS
            ticker.innerHTML = content + ' <span class="news-separator">•</span> ' + content;
        }
    } catch (error) {
        console.error("فشل الجلب:", error);
        ticker.innerHTML = '<span class="news-item">🔴 متابعة مستمرة لأهم الأخبار العاجلة من الجزيرة والعربية...</span>';
    }
}

document.addEventListener('DOMContentLoaded', loadNews);
setInterval(loadNews, 600000); 
