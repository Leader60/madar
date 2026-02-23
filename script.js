async function loadBreakingNews() {
    const rssUrl = "https://www.alarabiya.net/.mrss/en.xml";
    const proxy = "https://api.allorigins.win/get?url=" + encodeURIComponent(rssUrl);

    try {
        const response = await fetch(proxy);
        const data = await response.json();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "text/xml");

        const items = xml.querySelectorAll("item");
        let headlines = [];

        items.forEach((item, index) => {
            if (index < 10) {
                headlines.push(item.querySelector("title").textContent);
            }
        });

        const container = document.getElementById("breaking-news-content");
        if (container) {
            container.innerHTML = headlines.join(" &nbsp;&nbsp; ♦ &nbsp;&nbsp; ");
        }

    } catch (error) {
        console.error("RSS Error:", error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadBreakingNews();
    setInterval(loadBreakingNews, 300000); // تحديث كل 5 دقائق
});
