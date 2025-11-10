document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("project_name");
    const imageInput = document.getElementById("project_image");

    const editIndex = localStorage.getItem("editIndex");
    const isEditing = editIndex !== null && editIndex !== "null";
    const homes = JSON.parse(localStorage.getItem("homes") || "[]");

    // ✅ แสดงชื่อไฟล์รูปที่เลือก
    imageInput.addEventListener("change", function () {
        const fileName = this.files[0]?.name || "ยังไม่ได้เลือกไฟล์";
        document.getElementById("file-name").textContent = fileName;
    });

    // ✅ เมื่อผู้ใช้กด Submit ฟอร์ม
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const imageFile = imageInput.files[0];
        const fileName = document.getElementById("file-name").textContent;

        if (!name) {
            alert("กรุณาระบุชื่อโครงการ");
            return;
        }

        // อ่านรูปเป็น base64 ถ้ามี
        // const imageBase64 = imageFile ? await readFileAsBase64(imageFile) : null;
        let imageBase64;

        if (imageFile) {
            imageBase64 = await resizeImage(imageFile);
        } else if (isEditing && homes[editIndex]?.imageBase64) {
            // ✅ ใช้รูปเก่าถ้าไม่ได้อัปโหลดใหม่
            imageBase64 = homes[editIndex].imageBase64;
        } else {
            // imageBase64 = null;
            imageBase64 = "/assets/photo/logo-01.jpg";
        }

        // ดึงค่าทุก input/select ลง formData
        const formData = {};
        document.querySelectorAll("input, select").forEach(input => {
            if (!input.name) return;
            formData[input.name] = input.type === "checkbox" ? input.checked : input.value;
        });

        const newHome = {
            name,
            imageName: fileName,
            imageBase64, // <-- base64 string หรือ null
            formData
        };

        if (isEditing && homes[editIndex]) {
            homes[editIndex] = newHome;
        } else {
            homes.push(newHome);
        }

        localStorage.setItem("homes", JSON.stringify(homes));
        localStorage.removeItem("editIndex");
        window.location.href = "/";
    });

    // 🔧 ฟังก์ชันลดขนาดภาพก่อนเก็บ base64
    function resizeImage(file, maxWidth = 800) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();

            reader.onload = e => {
                img.src = e.target.result;
            };
            reader.onerror = reject;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const scale = maxWidth / img.width;
                canvas.width = maxWidth;
                canvas.height = img.height * scale;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const resizedBase64 = canvas.toDataURL("image/jpeg", 0.8); // ปรับคุณภาพ 80%
                resolve(resizedBase64);
            };

            reader.readAsDataURL(file);
        });
    }

});
