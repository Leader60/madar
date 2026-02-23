// script.js - النسخة النهائية المصلحة
async function fetchNews() {
    try {
        // إضافة طابع زمني (Timestamp) لإجبار الـ API على التحديث وعدم استخدام التخزين المؤقت
        const cacheBuster = `&_t=${new Date().getTime()}`;
        const rssUrl = encodeURIComponent('https://www.alarabiya.net');
        const proxyUrl = `https://api.rss2json.com{rssUrl}${cacheBuster}`;
        
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items.length > 0) {
            return data.items.slice(0, 10).map(item => ({
                title: item.title,
                link: item.link
            }));
        }
        return getBackupNews(); // استخدام الاحتياطي إذا كان الـ API بطيئاً
    } catch (error) {
        return getBackupNews();
    }
}

async function updateNewsTicker() {
    const ticker = document.getElementById('newsTicker');
    if (!ticker) return;
    
    const news = await fetchNews();
    let html = '';
    
    // تقليل التكرار إلى 3 مرات فقط لجعل الحركة رشيقة وسريعة
    for (let i = 0; i < 3; i++) {
        news.forEach(item => {
            html += `
                <a href="${item.link}" target="_blank" class="news-item">
                    <span class="news-title">${item.title}</span>
                    <span class="news-separator"> | </span>
                </a>`;
        });
    }
    ticker.innerHTML = html;
}

function getBackupNews() {
    return [
        { title: 'عاجل: متابعة مستمرة لآخر التطورات الميدانية والسياسية في المنطقة', link: '#' },
        { title: 'آخر المستجدات الاقتصادية وحركة الأسواق العالمية', link: '#' }
    ];
}

document.addEventListener('DOMContentLoaded', updateNewsTicker);
