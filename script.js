// رابط يحول أخبار الجزيرة إلى تنسيق JSON ليعمل مباشرة
const newsUrl = 'https://api.rss2json.com';

async function loadNews() {
    try {
        const response = await fetch(newsUrl);
        const data = await response.json();
        
        // ربط المعرف الموجود في الـ HTML الخاص بك
        const ticker = document.getElementById('news-ticker'); 

        if (data.status === 'ok') {
            ticker.innerHTML = ''; // مسح جملة "جاري التحميل"
            
            data.items.forEach(item => {
                const newsItem = document.createElement('span');
                newsItem.className = 'news-item';
                // عرض العنوان مع أيقونة جذابة
                newsItem.innerHTML = ` ⚡ ${item.title} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; `;
                ticker.appendChild(newsItem);
            });
        }
    } catch (error) {
        console.error("تعذر جلب الأخبار:", error);
        document.getElementById('news-ticker').innerText = "حدث خطأ أثناء تحميل الأخبار.";
    }
}

function getBackupNews() {
    return [
        { title: 'عاجل: تطورات جديدة في غزة', source: 'العربية', icon: '📺', link: '#' },
        { title: 'مستجدات الأزمة الأوكرانية', source: 'الجزيرة', icon: '🌊', link: '#' },
        { title: 'اجتماع طارئ لمجلس الأمن', source: 'العربية', icon: '📺', link: '#' },
        { title: 'مفاوضات وقف إطلاق النار', source: 'الجزيرة', icon: '🌊', link: '#' }
    ];
}

// تشغيل الوظيفة فور تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadNews);




