// روابط RSS الرسمية
const rssFeeds = [
    {
        url: 'https://www.aljazeera.net/aljazeerarss/ae73c9e3-2c8c-46e6-9cb3-6d645a74e506/73d50210-2aae-4dbe-907b-8017f475fe3f',
        name: 'الجزيرة'
    },
    {
        url: 'https://www.alarabiya.net/alarabiya-rss.xml',
        name: 'العربية'
    }
];

async function loadNews() {
    const ticker = document.getElementById('news-ticker');
    if (!ticker) return;

    try {
        let allNews = [];

        for (const feed of rssFeeds) {
            try {
                const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`;
                const response = await fetch(proxyUrl);
                
                if (!response.ok) {
                    console.warn(`فشل الاتصال بمصدر ${feed.name}`);
                    continue;
                }
                
                const data = await response.json();
                
                if (!data.contents) {
                    console.warn(`لا يوجد محتوى من ${feed.name}`);
                    continue;
                }

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data.contents, "text/xml");
                
                const parserError = xmlDoc.querySelector('parsererror');
                if (parserError) {
                    console.warn(`خطأ في تحليل XML من ${feed.name}`);
                    continue;
                }

                const items = xmlDoc.querySelectorAll("item");

                items.forEach(item => {
                    const title = item.querySelector("title")?.textContent;
                    const link = item.querySelector("link")?.textContent;
                    
                    if (title && link) {
                        allNews.push({
                            title: title.trim(),
                            link: link.trim(),
                            source: feed.name
                        });
                    }
                });
                
                console.log(`تم جلب ${items.length} خبر من ${feed.name}`);
                
            } catch (feedError) {
                console.error(`خطأ في جلب أخبار ${feed.name}:`, feedError);
                continue;
            }
        }

        if (allNews.length > 0) {
            allNews = shuffleArray(allNews);
            
            ticker.innerHTML = ''; 
            
            const content = allNews.slice(0, 20).map(item => 
                `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="news-item">
                    ⚡ <strong>[${item.source}]</strong> ${item.title}
                </a>`
            ).join(' <span class="news-separator">•</span> ');

            ticker.innerHTML = content + ' <span class="news-separator">•</span> ' + content;
        } else {
            ticker.innerHTML = '<span class="news-item">🔴 لا توجد أخبار حالياً، جاري التحديث...🤔</span>';
        }
    } catch (error) {
        console.error("فشل الجلب الرئيسي:", error);
        ticker.innerHTML = '<span class="news-item">🔴 متابعة مستمرة لأهم الأخبار العاجلة...🔊</span>';
    }
}

// دالة خلط الأخبار
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// دالة محسنة لتفعيل الرابط النشط
function setActiveNavLink() {
    // الحصول على اسم الصفحة الحالية
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // إزالة كلاس active من جميع الروابط أولاً
    document.querySelectorAll('.nav-menu a, .footer-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // تفعيل الروابط في القائمة الرئيسية
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    // تفعيل الروابط في الفوتر
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    console.log('تم تفعيل الرابط النشط للصفحة:', currentPage); // للتأكد من العمل
}

// بدء التحميل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    loadNews();
    setActiveNavLink();
});

// تحديث الأخبار كل 10 دقائق
setInterval(loadNews, 600000);
