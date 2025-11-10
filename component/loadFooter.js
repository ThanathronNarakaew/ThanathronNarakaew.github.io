// 📁 js/loadFooter.js
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector("footer");
    if (footer) {
        fetch("/component/footer.html") // ปรับ path ให้สัมพันธ์กับหน้าแต่ละหน้า
            .then(res => res.text())
            .then(html => {
                footer.innerHTML = html;
            })
            .catch(err => {
                console.error("โหลด footer ไม่สำเร็จ:", err);
            });
    }
});
