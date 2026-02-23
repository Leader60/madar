// استبدل 'YOUR_API_KEY' بالمفتاح الذي حصلت عليه
const apiKey = '2b6c165e0ad14ce682cc33f026267af9';
const url = `https://newsapi.org{apiKey}`;

async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'ok') {
            const newsTicker = document.getElementById('news-ticker');
            // مسح أي محتوى قديم
            newsTicker.innerHTML = ''; 
            
            // جلب العناوين وعرضها
            data.articles.forEach(article => {
                const span = document.createElement('span');
                span.innerHTML = ` ⚡ ${article.title} &nbsp;&nbsp;&nbsp; `;
                newsTicker.appendChild(span);
            });
        }
    } catch (error) {
        console.error('حدث خطأ أثناء جلب الأخبار:', error);
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

// تشغيل الوظيفة عند تحميل الصفحة
window.onload = fetchNews;
