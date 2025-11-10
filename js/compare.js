document.addEventListener("DOMContentLoaded", () => {
    const compareHomes = JSON.parse(localStorage.getItem("compareHomes") || "[]");
    window.compareHomes = compareHomes; // ✅ เพิ่มบรรทัดนี้
    if (!window.formGroups || compareHomes.length === 0) return;

    const ratings = calculateRatings(compareHomes);

    const tableNameRow = document.getElementById("row-name");
    const tableImageRow = document.getElementById("row-image");
    const tableStarRow = document.getElementById("row-star");
    const container = document.getElementById("dropdown-container");

    compareHomes.forEach((home, index) => {
        const ratingInfo = ratings[index];

        // ➔ ชื่อโครงการ
        const nameCell = document.createElement("td");
        nameCell.textContent = home.name || "-";
        tableNameRow.appendChild(nameCell);

        // ➔ รูปภาพ
        const imageCell = document.createElement("td");
        const img = document.createElement("img");
        img.src = home.imageBase64 || "/assets/photo/logo-01.jpg";
        img.alt = home.name;
        img.style.maxWidth = "100px";
        imageCell.appendChild(img);
        tableImageRow.appendChild(imageCell);

        // ➔ คะแนนรวม (ดาว)
        const tooltip = `
โครงสร้าง: ${ratingInfo.breakdown.A}
ความปลอดภัย: ${ratingInfo.breakdown.B}
ความสะดวกสบาย: ${ratingInfo.breakdown.C}
เทคโนโลยี: ${ratingInfo.breakdown.D}`.trim();

        const starCell = document.createElement("td");
        starCell.innerHTML = `<div class="home-rating" title="${tooltip.replace(/\n/g, '&#10;')}">
        ${renderStars(ratingInfo.rating)}</div>`;
        tableStarRow.appendChild(starCell);
    });

    // ➔ รายละเอียดคะแนนแบบ dropdown
    const scoreGroup = document.createElement("div");
    scoreGroup.className = "group-block";

    const header = document.createElement("h3");
    header.className = "group-title";
    header.textContent = "กดเพื่อดูเกฑณ์การให้คะแนน";

    const dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown-content";

    const scoreTable = document.createElement("table");
    scoreTable.classList.add("compare-table");

    const categories = [
        { label: "โครงสร้าง (45%)", key: "A" },
        { label: "ความปลอดภัย (20%)", key: "B" },
        { label: "ความสะดวกสบาย (25%)", key: "C" },
        { label: "เทคโนโลยี (10%)", key: "D" }
    ];

    categories.forEach(category => {
        const row = document.createElement("tr");
        const th = document.createElement("th");
        th.textContent = category.label;
        row.appendChild(th);

        compareHomes.forEach((home, index) => {
            const ratingInfo = ratings[index];
            const td = document.createElement("td");
            td.textContent = ratingInfo.breakdown[category.key];
            row.appendChild(td);
        });

        scoreTable.appendChild(row);
    });

    const note = document.createElement("p");
    note.className = "score-note";
    note.textContent = "**เราจะใช้การให้คะแนนแบบถ่วงน้ำหนัก (Weighted Average) เพื่อประเมินความคุ้มค่าของบ้าน โดยเน้นที่สเปกของบ้าน ทั้งในด้านอายุการใช้งาน คุณภาพวัสดุ และความแข็งแรง ซึ่งล้วนเป็นปัจจัยสำคัญต่อการอยู่อาศัยในระยะยาว**";

    dropdownContent.appendChild(note);
    dropdownContent.appendChild(scoreTable);
    scoreGroup.appendChild(header);
    scoreGroup.appendChild(dropdownContent);
    container.appendChild(scoreGroup);

    header.addEventListener("click", () => {
        document.querySelectorAll(".dropdown-content").forEach(dc => {
            if (dc !== dropdownContent) {
                dc.style.maxHeight = null;
                dc.classList.remove("open");
            }
        });

        const isOpen = dropdownContent.classList.contains("open");
        if (isOpen) {
            dropdownContent.style.maxHeight = null;
            dropdownContent.classList.remove("open");
        } else {
            dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
            dropdownContent.classList.add("open");
        }
    });

    formGroups.forEach(group => {
        const groupBlock = document.createElement("div");
        groupBlock.className = "group-block";

        const header = document.createElement("h3");
        header.className = "group-title";
        header.textContent = group.title;

        const dropdownContent = document.createElement("div");
        dropdownContent.className = "dropdown-content";

        const table = document.createElement("table");
        table.classList.add("compare-table");

        group.options.forEach(opt => {
            const row = document.createElement("tr");

            const labelCell = document.createElement("th");
            const wrapper = document.createElement("div");
            wrapper.className = "label-wrapper";

            const iconDiv = document.createElement("div");
            iconDiv.className = "label-icon";
            const icon = document.createElement("img");
            icon.src = `/assets/icon/${opt.folder}/${opt.icon}`;
            icon.alt = opt.label;
            icon.style.width = "24px";
            iconDiv.appendChild(icon);

            const textDiv = document.createElement("div");
            textDiv.className = "label-text";
            textDiv.textContent = opt.label;

            wrapper.appendChild(iconDiv);
            wrapper.appendChild(textDiv);
            labelCell.appendChild(wrapper);
            row.appendChild(labelCell);

            compareHomes.forEach(home => {
                const valueCell = document.createElement("td");
                const type = opt.type || group.type;
                // const value = home.formData?.[opt.name];
                const typeVal = home.formData?.[`${opt.name}_type`] || "";
                const typeOther = home.formData?.[`${opt.name}_type_other`] || "";
                const count = home.formData?.[`${opt.name}_count`] || "";
                const specs = Object.entries(home.formData || {})
                    .filter(([k]) => k.startsWith(`${opt.name}_spec_`) && home.formData[k])
                    .map(([_, v]) => `ขนาด ${v} ${opt.unit || ""}`);

                const hasNewDropdown = group.containerId === "form-plumbing" && (typeVal || count || specs.length > 0);
                const value = home.formData?.[opt.name] ?? typeVal ?? "";

                if (type === "Checkbox") {
                    const checked = value;
                    const detail = home.formData?.[`${opt.name}_detail`];
                    valueCell.textContent = detail?.trim()
                        ? detail
                        : (checked ? "✅" : "❌");
                }
                else {
                    if (value === "ไม่มี") {
                        valueCell.textContent = "❌";
                    }
                    else if (!hasNewDropdown && (value === undefined || value === "" || value === null || value === "0" || value === 0 || value === "ไม่มี")) {
                        valueCell.textContent = "❌";
                    }
                    // ✅ สำหรับกลุ่ม plumbing แบบใหม่
                    else if ((group.containerId === "form-plumbing" || group.containerId === "form-electrical") && opt.secondaryChoices) {
                        const typeVal = home.formData?.[`${opt.name}_type`] || "";
                        const typeOther = home.formData?.[`${opt.name}_type_other`] || "";
                        const count = home.formData?.[`${opt.name}_count`] || "";
                        const specs = Object.entries(home.formData || {})
                            .filter(([k]) => k.startsWith(`${opt.name}_spec_`) && home.formData[k])
                            .map(([_, v]) => {
                                // ✅ เพิ่ม formatNumber สำหรับ specs
                                const cleanVal = removeCommas(v);
                                const formattedVal = Number.isFinite(Number(cleanVal)) ? formatNumber(cleanVal) : v;
                                return `ขนาด ${formattedVal} ${opt.unit || ""}`;
                            });

                        const typeDisplay = (typeVal === "อื่นๆ") ? `อื่นๆ ${typeOther}` : typeVal;
                        let display = typeDisplay;

                        // ✅ เพิ่มการแสดงจำนวน+หน่วย
                        if (count) {
                            display += ` ${count} ${opt.specUnit || opt.unit || ""}`;
                        }

                        // ✅ ถ้ามี specs → แสดงแบบ plumbing เดิม (เฉพาะรายการที่ไม่ใช่ noSpec)
                        if (specs.length > 0 && !opt.noSpec) {
                            display += "<br>" + specs.join("<br>");
                        }

                        valueCell.innerHTML = display;
                    }

                    // ✅ สำหรับรายการที่มี allowSingleDetail (แสดงจำนวน • รายละเอียด)
                    else if (opt.allowSingleDetail) {
                        const detail = home.formData?.[`${opt.name}_detail`];
                        if (detail?.trim()) {
                            valueCell.innerHTML = `${value} ${opt.unit || ""}<br>${detail}`;
                        } else {
                            valueCell.textContent = `${value} ${opt.unit || ""}`;
                        }
                    }

                    // else if (opt.alwaysShowSingleSpec) {
                    //     const detail = home.formData?.[`${opt.name}_spec_1`];
                    //     valueCell.innerHTML = detail ? `${value} ${detail} ${opt.unit || ""}` : value;
                    // }

                    else if (opt.alwaysShowSingleSpec) {
                        const detail = home.formData?.[`${opt.name}_spec_1`];
                        if (detail) {
                            // ✅ ตรวจสอบว่า detail เป็นตัวเลขหรือไม่
                            const cleanDetail = removeCommas(detail);
                            const formattedDetail = Number.isFinite(Number(cleanDetail)) ? formatNumber(cleanDetail) : detail;
                            valueCell.innerHTML = `${value} ${formattedDetail} ${opt.unit || ""}`;
                        } else {
                            valueCell.innerHTML = value;
                        }
                    }

                    else if (Number.isFinite(Number(removeCommas(value)))) {
                        if (group.containerId === "form-information" || group.title === "ข้อมูลทั่วไป") {
                            const numValue = formatNumber(removeCommas(value));
                            valueCell.textContent = opt.unit ? `${numValue} ${opt.unit}` : `${numValue}`;
                        } else {
                            const numValue = formatNumber(removeCommas(value));
                            let display = `${numValue} ${opt.specUnit || opt.unit || ""}`;
                            const specs = Object.entries(home.formData || {})
                                .filter(([key]) => key.startsWith(`${opt.name}_spec_`) && home.formData[key])
                                .map(([_, val]) => {
                                    const cleanVal = removeCommas(val);
                                    return Number.isFinite(Number(cleanVal)) ?
                                        `ขนาด ${formatNumber(cleanVal)} ${opt.unit || ""}` :
                                        `ขนาด ${val} ${opt.unit || ""}`;
                                });
                            if (specs.length > 0) {
                                display += "<br>" + specs.join("<br>");
                            }
                            valueCell.innerHTML = display;
                        }
                    }
                    else {
                        valueCell.textContent = value;
                    }
                }

                row.appendChild(valueCell);
            });

            table.appendChild(row);
        });

        dropdownContent.appendChild(table);
        groupBlock.appendChild(header);
        groupBlock.appendChild(dropdownContent);
        container.appendChild(groupBlock);

        header.addEventListener("click", () => {
            document.querySelectorAll(".dropdown-content").forEach(dc => {
                if (dc !== dropdownContent) {
                    dc.style.maxHeight = null;
                    dc.classList.remove("open");
                }
            });

            const isOpen = dropdownContent.classList.contains("open");
            if (isOpen) {
                dropdownContent.style.maxHeight = null;
                dropdownContent.classList.remove("open");
            } else {
                dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
                dropdownContent.classList.add("open");
            }
        });
    });
});

function renderStars(score) {
    const full = Math.round(score / 20);
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        stars += i <= full ? "⭐" : "☆";
    }
    return stars + ` (${score})`;
}

window.addEventListener("load", () => {
    document.dispatchEvent(new Event("compare-loaded"));
});

// เพิ่มฟังก์ชันช่วยที่ต้นไฟล์ compare.js
function formatNumber(value) {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return num.toLocaleString('en-US');
}

function removeCommas(value) {
    return value.replace(/,/g, "");
}

