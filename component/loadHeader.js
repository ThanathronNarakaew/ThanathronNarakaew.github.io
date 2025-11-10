document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    if (header) {
        fetch("/component/header.html")
            .then(res => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");

                const titleEl = doc.querySelector(".header-title");
                const subtitleEl = doc.querySelector(".header-subtitle");

                const pageTitle = header.getAttribute("data-title");
                const pageSubtitle = header.getAttribute("header-subtitle");

                if (pageTitle && titleEl) {
                    titleEl.textContent = pageTitle;
                }
                if (pageSubtitle && subtitleEl) {
                    subtitleEl.textContent = pageSubtitle;
                }

                header.innerHTML = doc.body.innerHTML;
            })
            .catch(err => {
                console.error("โหลด header ไม่สำเร็จ:", err);
            });
    }
});
