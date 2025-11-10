document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addBtn");
    // const clearBtn = document.getElementById("clearBtn");
    const cardList = document.getElementById("cardList");
    const template = document.getElementById("home-card-template");
    let homes = JSON.parse(localStorage.getItem("homes") || "[]");

    if (addBtn) {
        addBtn.addEventListener("click", () => {
            localStorage.removeItem("editIndex");
            window.location.href = "/add";
        });
    }

    // if (clearBtn) {
    //     clearBtn.addEventListener("click", () => {
    //         const checkboxes = cardList.querySelectorAll("input[type='checkbox']:checked");
    //         if (checkboxes.length === 0) return;

    //         // ✅ กล่องยืนยันก่อนลบ
    //         const confirmDelete = confirm("คุณต้องการลบข้อมูลบ้านที่เลือกใช่หรือไม่?");
    //         if (!confirmDelete) return;

    //         const checkedIndexes = Array.from(checkboxes).map(checkbox =>
    //             parseInt(checkbox.dataset.index)
    //         );

    //         homes = homes.filter((_, index) => !checkedIndexes.includes(index));
    //         localStorage.setItem("homes", JSON.stringify(homes));
    //         location.reload();
    //     });
    // }

    homes.forEach((home, index) => {
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector(".card");
        const img = card.querySelector("img");
        const checkbox = card.querySelector("input[type='checkbox']");
        const details = card.querySelector(".details");

        // ✅ แสดงรูปจาก base64 ถ้ามี, ไม่มีก็ใช้ default
        if (home.imageBase64) {
            img.src = home.imageBase64;
        } else {
            img.src = "/assets/photo/logo-01.jpg";
        }
        img.alt = home.name;

        details.textContent = home.name;

        checkbox.dataset.index = index;

        card.addEventListener("click", (e) => {
            if (e.target.tagName.toLowerCase() !== "input") {
                localStorage.setItem("editIndex", index);
                window.location.href = "/add";
            }
        });

        cardList.appendChild(clone);
        console.log("โหลด homes:", homes);
    });

    const compareBtn = document.querySelector(".compare button");
    if (compareBtn) {
        compareBtn.addEventListener("click", () => {
            const checked = document.querySelectorAll("input[type='checkbox']:checked");
            const homes = JSON.parse(localStorage.getItem("homes") || "[]");

            const selected = Array.from(checked).map(cb => homes[parseInt(cb.dataset.index)]);
            if (selected.length === 0) {
                // alert("กรุณาเลือกบ้านอย่างน้อย 1 หลังเพื่อเปรียบเทียบ");
                return;
            }

            localStorage.setItem("compareHomes", JSON.stringify(selected));
            window.location.href = "/compare"; // หรือปรับตาม path ของคุณ
        });
    }

});
