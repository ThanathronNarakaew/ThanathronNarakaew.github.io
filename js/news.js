document.addEventListener("DOMContentLoaded", () => {
  const homes = JSON.parse(localStorage.getItem("homes") || "[]");
  const box = document.getElementById("add-home-box");

  if (homes.length >= 1) {
    box.style.display = "none";
  }

  box.addEventListener("click", () => {
    window.location.href = "/add";
  });

  // JavaScript สำหรับ Modal Logic (ไม่เปลี่ยนแปลง)
  const confirmModal = document.getElementById("confirmDeleteModal");
  const alertModal = document.getElementById("alertModal");

  const clearBtn = document.getElementById("clearBtn");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

  const closeConfirm = document.getElementById("closeConfirmModal");
  const closeAlert = document.getElementById("closeAlertModal");

  const compareModal = document.getElementById("alertCompareModal");
  const closeCompare = document.getElementById("compareBtn");
  const compareOkBtn = document.getElementById("alertCOkBtn");

  clearBtn.addEventListener("click", () => {
    const selectedCheckboxes = document.querySelectorAll(
      'input[name="house"]:checked'
    );

    if (selectedCheckboxes.length > 0) {
      confirmModal.style.display = "block";
    } else {
      alertModal.style.display = "block";
    }
  });

  const hideConfirmModal = () => {
    confirmModal.style.display = "none";
  };
  const hideAlertModal = () => {
    alertModal.style.display = "none";
  };
  const hideCompareModal = () => {
    compareModal.style.display = "none";
  };

  closeConfirm.onclick = hideConfirmModal;
  cancelDeleteBtn.onclick = hideConfirmModal;
  closeAlert.onclick = hideAlertModal;
  alertOkBtn.onclick = hideAlertModal;
  closeCompare.onclick = hideCompareModal;
  compareOkBtn.onclick = hideCompareModal;

  window.onclick = (event) => {
    if (event.target == confirmModal) {
      hideConfirmModal();
    }
    if (event.target == alertModal) {
      hideAlertModal();
    }
    if (event.target == compareModal) {
      hideCompareModal();
    }
  };

  confirmDeleteBtn.addEventListener("click", () => {
    const selectedCheckboxes = document.querySelectorAll(
      'input[name="house"]:checked'
    );
    const idsToDelete = Array.from(selectedCheckboxes).map((cb) => cb.value);

    let currentHomes = JSON.parse(localStorage.getItem("homes") || "[]");

    // *** (ต้องแน่ใจว่า key 'id' ถูกต้อง) ***
    const updatedHomes = currentHomes.filter(
      (home) => !idsToDelete.includes(home.id)
    );

    localStorage.setItem("homes", JSON.stringify(updatedHomes));

    hideConfirmModal();
    window.location.reload();
  });
});

// Wait for the page to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get the tooltip element
  const tooltip = document.getElementById("mouse-tooltip");

  // Make sure the tooltip element exists
  if (!tooltip) {
    console.error("Tooltip element not found!");
    return;
  }

  // Listen for the mouse moving anywhere on the document
  document.addEventListener("mousemove", (e) => {
    // Check if the mouse is hovering over an element with the class 'card'
    const card = e.target.closest(".card");

    if (card) {
      // If over a card, show the tooltip
      tooltip.style.display = "block";

      // Position the tooltip near the cursor
      // e.clientX and e.clientY give the mouse's X/Y coordinates
      // We add 15px so it appears slightly below and to the right
      tooltip.style.left = e.clientX + 15 + "px";
      tooltip.style.top = e.clientY + 15 + "px";
    } else {
      // If not over a card, hide the tooltip
      tooltip.style.display = "none";
    }
  });
});

// โค้ดนี้ควรรวมอยู่ในไฟล์ JS ที่โหลดในหน้า index.html
document.addEventListener("DOMContentLoaded", () => {
  // --- 1. ส่วนสำหรับ *แสดง* Modal (จาก homeData.js) ---

  // ปุ่มหลักที่ใช้ "เปรียบเทียบ"
  const mainCompareBtn = document.querySelector(".compare button");
  // Modal ที่จะแสดง
  const compareModal = document.getElementById("alertCompareModal");

  if (mainCompareBtn) {
    mainCompareBtn.addEventListener("click", () => {
      const checked = document.querySelectorAll(
        "input[type='checkbox']:checked"
      );

      // ตรวจสอบว่ามีบ้านที่เลือกหรือไม่
      if (checked.length === 0) {
        // ถ้าไม่เลือก ให้แสดง Modal
        if (compareModal) {
          compareModal.style.display = "block";
        }
        return; // หยุดการทำงาน
      }

      // (ส่วนที่เหลือคือโค้ดเดิมของคุณ ถ้าเลือกบ้านแล้ว)
      const homes = JSON.parse(localStorage.getItem("homes") || "[]");
      const selected = Array.from(checked).map(
        (cb) => homes[parseInt(cb.dataset.index)]
      );
      localStorage.setItem("compareHomes", JSON.stringify(selected));
      window.location.href = "/compare";
    });
  }

  // --- 2. ส่วนสำหรับ *ซ่อน* Modal (จาก news.js) ---

  // ปุ่มปิด (X) - *ใช้ ID ใหม่ที่เราตั้ง*
  const closeCompareBtn = document.getElementById("closeCompareModal");
  // ปุ่ม "ตกลง"
  const compareOkBtn = document.getElementById("alertCOkBtn");

  // ฟังก์ชันสำหรับซ่อน Modal
  const hideCompareModal = () => {
    if (compareModal) {
      compareModal.style.display = "none";
    }
  };

  // สั่งให้ปุ่ม (X) และปุ่ม "ตกลง" ปิด Modal เมื่อถูกคลิก
  if (closeCompareBtn) {
    closeCompareBtn.onclick = hideCompareModal;
  }
  if (compareOkBtn) {
    compareOkBtn.onclick = hideCompareModal;
  }

  // สั่งให้ปิด Modal เมื่อคลิกที่พื้นหลังสีเทา
  window.addEventListener("click", (event) => {
    if (event.target == compareModal) {
      hideCompareModal();
    }
  });
});
