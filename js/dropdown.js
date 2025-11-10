/*---------------------- Show name_img after uploaded ----------------------*/
const fileInput = document.getElementById('project_image');
const fileNameSpan = document.getElementById('file-name');
const preview = document.getElementById('image_preview');

fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        // แสดงชื่อไฟล์
        fileNameSpan.textContent = file.name;

        // แสดง preview รูป
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.setAttribute('src', e.target.result);
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        fileNameSpan.textContent = 'ยังไม่ได้เลือกไฟล์';
        preview.style.display = 'none';
    }
});

/*---------------------- Dropdown ----------------------*/
// ฟังก์ชันเพิ่มจุลภาคในตัวเลข
function formatNumber(value) {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return num.toLocaleString('en-US');
}

// ฟังก์ชันลบจุลภาคออกจากตัวเลข
function removeCommas(value) {
    return value.replace(/,/g, "");
}

// ฟังก์ชันจัดการ input ตัวเลข
function handleNumberInput(input, allowDecimal = true) {
    input.addEventListener('input', function () {
        if (allowDecimal) {
            // อนุญาตตัวเลขและจุดทศนิยม
            this.value = this.value.replace(/[^0-9.]/g, '');

            // ป้องกันจุดทศนิยมมากกว่า 1 จุด
            const parts = this.value.split('.');
            if (parts.length > 2) {
                this.value = parts[0] + '.' + parts.slice(1).join('');
            }
        } else {
            // รับเฉพาะตัวเลข
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });
}

const template = document.getElementById('form-row-template');

function renderFormGroups() {
    formGroups.forEach(group => {
        const container = document.getElementById(group.containerId);
        if (!container) return;

        group.options.forEach(opt => {
            let row;
            const type = opt.type || group.type;

            if (type === 'textOnly') {
                row = document.createElement('div');
                row.className = 'form-row';
                row.innerHTML = `<div class="icon">
    <img src="/assets/icon/${opt.folder}/${opt.icon}" alt="${opt.label}"></div>
    <label>${opt.label}</label>
    <div class="select-with-spec"><input type="text" name="${opt.name}" placeholder="${opt.placeholderUnit}">
    ${opt.unit ? `<p class="unit">${opt.unit}</p>` : ""}</div>`;
                // เพิ่มการจัดการตัวเลขสำหรับ input ที่เป็นตัวเลข
                const input = row.querySelector('input[type="text"]');
                if (opt.isNumber || (opt.unit && /หลัง|ชั้น|ห้อง|คัน|บาท|ตร\.ม\.|เมตร/.test(opt.unit))) {
                    handleNumberInput(input, true); // true = อนุญาตทศนิยม
                }
            }
            else if (type === 'select') {
                row = document.createElement('div');
                row.className = 'form-row';

                const iconDiv = document.createElement('div');
                iconDiv.className = 'icon';
                const icon = document.createElement('img');
                icon.src = `/assets/icon/${opt.folder}/${opt.icon}`;
                icon.alt = opt.label;
                iconDiv.appendChild(icon);

                const label = document.createElement('label');
                label.textContent = opt.label;

                const select = document.createElement('select');
                select.name = opt.name;

                const placeholderOption = document.createElement('option');
                placeholderOption.value = "";
                placeholderOption.textContent = "เลือกประเภท/จำนวน";
                placeholderOption.disabled = true;
                placeholderOption.selected = true;
                select.appendChild(placeholderOption);
                opt.choices.forEach(choice => {
                    const option = document.createElement('option');
                    option.value = choice;
                    option.textContent = choice;
                    select.appendChild(option);
                });

                const selectWrapper = document.createElement("div");
                selectWrapper.className = "select-with-spec";
                selectWrapper.appendChild(select);

                // ✅ ช่องสเปกเดี่ยวหลัง select (ไม่มี spec หลายช่อง)
                if (!opt.specUnit && opt.allowSingleDetail) {
                    const inlineSpec = document.createElement("input");
                    inlineSpec.type = "text";
                    inlineSpec.name = `${opt.name}_detail`;
                    inlineSpec.placeholder = "ระบุสเปก (หากทราบ)";
                    inlineSpec.className = "inline-spec";
                    selectWrapper.appendChild(inlineSpec);
                    placeholderOption.textContent = "จำนวน";
                }
                if (opt.specUnit) {
                    select.addEventListener("change", () => {
                        // ลบ input เดิม + unit เดิม
                        selectWrapper.querySelectorAll(".spec-row, .unit").forEach(el => el.remove());

                        // ✅ ถ้าเป็น alwaysShowSingleSpec → แสดง input เดียวเท่านั้น
                        if (opt.alwaysShowSingleSpec) {
                            const selectedVal = select.value;

                            // ❌ ไม่แสดง input ถ้าเลือก "ไม่มี"
                            if (selectedVal === "ไม่มี") return;

                            // ❌ ไม่แสดง input ถ้าไม่ใช่ "อื่นๆ" และ opt.name ไม่ใช่ "Solar_Rooftop"
                            if (opt.name !== "Solar_Rooftop" && selectedVal !== "อื่นๆ") return;

                            const specRow = document.createElement("div");
                            specRow.className = "spec-row";

                            const spec = document.createElement("input");
                            spec.type = "text";
                            spec.name = `${opt.name}_spec_1`;
                            spec.classList.add("spec-input");

                            // ✅ placeholder
                            spec.placeholder = selectedVal === "อื่นๆ"
                                ? "ระบุเพิ่มเติม"
                                : `ระบุสเปก (${opt.specUnit || ""})`;

                            specRow.appendChild(spec);

                            // ✅ แสดง unit เฉพาะถ้าเป็น meter
                            if (opt.name === "Solar_Rooftop" && opt.unit) {
                                const unitP = document.createElement("p");
                                unitP.className = 'unit';
                                unitP.textContent = opt.unit;
                                specRow.appendChild(unitP);
                            }

                            selectWrapper.appendChild(specRow);

                            // ✅ อัปเดต dropdown ความสูง
                            const dropdownOptions = row.closest(".dropdown-options");
                            if (dropdownOptions && dropdownOptions.classList.contains("show")) {
                                dropdownOptions.style.maxHeight = dropdownOptions.scrollHeight + "px";
                            }
                        }
                        else {
                            const count = parseInt(select.value);
                            if (!isNaN(count) && count > 0) {
                                for (let i = 1; i <= count; i++) {
                                    const specRow = document.createElement("div");
                                    specRow.className = "spec-row";

                                    const spec = document.createElement("input");
                                    spec.type = "text";
                                    spec.name = `${opt.name}_spec_${i}`;
                                    spec.placeholder = `ระบุขนาด - รายการ ${i}`;
                                    spec.classList.add("spec-input");

                                    specRow.appendChild(spec);

                                    if (opt.unit) {
                                        const unitP = document.createElement("p");
                                        unitP.className = 'unit';
                                        unitP.textContent = opt.unit;
                                        specRow.appendChild(unitP);
                                    }

                                    selectWrapper.appendChild(specRow);
                                }
                            }
                            // ✅ อัปเดตความสูงของ .dropdown-options หลังเพิ่ม input
                            const dropdownOptions = row.closest(".dropdown-options");
                            if (dropdownOptions && dropdownOptions.classList.contains("show")) {
                                dropdownOptions.style.maxHeight = dropdownOptions.scrollHeight + "px";
                            }
                        }

                    });
                }
                else if (opt.unit) {
                    // ✅ ไม่มีสเปก แต่มีหน่วย -> unit ใต้ select
                    const unitP = document.createElement("p");
                    unitP.className = 'unit';
                    unitP.textContent = opt.unit;
                    selectWrapper.appendChild(unitP);
                }

                const specInputs = selectWrapper.querySelectorAll('.spec-input');
                specInputs.forEach(specInput => {
                    if (opt.isNumber || (opt.unit && /หลัง|ชั้น|ห้อง|คัน|บาท|ตร\.ม\.|เมตร/.test(opt.unit))) {
                        handleNumberInput(specInput);
                    }
                });

                row.appendChild(iconDiv);
                row.appendChild(label);
                row.appendChild(selectWrapper);

            }
            else {
                const clone = template.content.cloneNode(true);
                clone.querySelector('img').src = `/assets/icon/${opt.folder}/${opt.icon}`;
                clone.querySelector('img').alt = opt.label;
                clone.querySelector('label').textContent = opt.label;
                clone.querySelector('input[type="checkbox"]').name = opt.name;
                clone.querySelector('input[type="text"]').name = `${opt.name}_detail`;
                row = clone;
            }

            // ✅ เฉพาะ plumbing แบบใหม่ที่มี secondaryChoices เท่านั้น
            if (
                (group.containerId === "form-plumbing" || group.containerId === "form-electrical") &&
                opt.choices && Array.isArray(opt.secondaryChoices)
            ) {
                row = document.createElement('div');
                row.className = 'form-row';

                const iconDiv = document.createElement('div');
                iconDiv.className = 'icon';
                const icon = document.createElement('img');
                icon.src = `/assets/icon/${opt.folder}/${opt.icon}`;
                icon.alt = opt.label;
                iconDiv.appendChild(icon);

                const label = document.createElement('label');
                label.textContent = opt.label;

                const selectWrapper = document.createElement("div");
                selectWrapper.className = "select-with-count";

                const selectType = document.createElement("select");
                selectType.className = "select-type-count";
                selectType.name = `${opt.name}_type`;
                const placeholderType = document.createElement("option");
                placeholderType.value = "";
                placeholderType.textContent = "เลือกประเภท";
                placeholderType.disabled = true;
                placeholderType.selected = true;
                selectType.appendChild(placeholderType);

                opt.choices.forEach(choice => {
                    const option = document.createElement("option");
                    option.value = choice;
                    option.textContent = choice;
                    selectType.appendChild(option);
                });

                selectWrapper.appendChild(selectType);

                const dynamicArea = document.createElement("div");
                dynamicArea.className = "count-after-select";
                selectWrapper.appendChild(dynamicArea);

                selectType.addEventListener("change", () => {
                    dynamicArea.innerHTML = "";

                    // ✅ ถ้าเลือก "ไม่มี" → ไม่ต้องทำอะไร
                    if (selectType.value === "ไม่มี") return;

                    // ✅ ถ้าเลือก "อื่นๆ" ให้แสดง input ก่อน
                    if (selectType.value === "อื่นๆ") {
                        const otherInput = document.createElement("input");
                        otherInput.type = "text";
                        otherInput.name = `${opt.name}_type_other`;
                        otherInput.placeholder = "ระบุประเภทเพิ่มเติม";
                        otherInput.className = "inline-spec";
                        dynamicArea.appendChild(otherInput);
                    }

                    // ✅ ต่อด้วย select จำนวน
                    const selectCount = document.createElement("select");
                    selectCount.name = `${opt.name}_count`;
                    const placeholderCount = document.createElement("option");
                    placeholderCount.value = "";
                    placeholderCount.textContent = "เลือกจำนวน";
                    placeholderCount.disabled = true;
                    placeholderCount.selected = true;
                    selectCount.appendChild(placeholderCount);

                    opt.secondaryChoices.forEach(num => {
                        const option = document.createElement("option");
                        option.value = num;
                        option.textContent = num;
                        selectCount.appendChild(option);
                    });

                    dynamicArea.appendChild(selectCount);

                    // ✅ render ช่องใส่ input หลังเลือกจำนวน
                    selectCount.addEventListener("change", () => {
                        dynamicArea.querySelectorAll(".spec-row").forEach(el => el.remove());

                        const count = parseInt(selectCount.value);
                        if (!isNaN(count)) {

                            if (opt.noSpec) {
                                if (opt.unit) {
                                    const unitWrapper = document.createElement("div");
                                    unitWrapper.className = "spec-row";

                                    const unit = document.createElement("p");
                                    unit.className = "unit";
                                    unit.textContent = opt.unit;

                                    unitWrapper.appendChild(unit);
                                    dynamicArea.appendChild(unitWrapper);
                                }
                                return;
                            }

                            for (let i = 1; i <= count; i++) {
                                const specRow = document.createElement("div");
                                specRow.className = "spec-row";

                                const input = document.createElement("input");
                                input.type = "text";
                                input.name = `${opt.name}_spec_${i}`;
                                input.placeholder = `ระบุขนาด - รายการ ${i}`;
                                input.classList.add("spec-input");
                                specRow.appendChild(input);

                                if (opt.unit) {
                                    const unit = document.createElement("p");
                                    unit.className = "unit";
                                    unit.textContent = opt.unit;
                                    specRow.appendChild(unit);
                                }

                                dynamicArea.appendChild(specRow);
                            }
                        }

                        const dropdownOptions = row.closest(".dropdown-options");
                        if (dropdownOptions && dropdownOptions.classList.contains("show")) {
                            dropdownOptions.style.maxHeight = dropdownOptions.scrollHeight + "px";
                        }
                    });

                    const dropdownOptions = row.closest(".dropdown-options");
                    if (dropdownOptions && dropdownOptions.classList.contains("show")) {
                        dropdownOptions.style.maxHeight = dropdownOptions.scrollHeight + "px";
                    }
                });

                row.appendChild(iconDiv);
                row.appendChild(label);
                row.appendChild(selectWrapper);
                container.appendChild(row);
                return; // ❗ข้ามของเดิม
            }


            container.appendChild(row);
        });
    });
}


// formGroups.forEach(group => {
//     const container = document.getElementById(group.containerId);
//     if (!container) return;

//     group.options.forEach(opt => {
//         let row;

//         if (group.type === 'textOnly') {
//             row = document.createElement('div');
//             row.className = 'form-row';
//             row.innerHTML = `<div class="icon">
//         <img src="../assets/icon/${opt.folder}/${opt.icon}" alt="${opt.label}"></div>
//         <label>${opt.label}</label>
//         <input type="text" name="${opt.name}" placeholder="กรอกข้อมูล">`;
//         }
//         else if (group.type === 'select') {
//             row = document.createElement('div');
//             row.className = 'form-row';

//             const iconDiv = document.createElement('div');
//             iconDiv.className = 'icon';
//             const icon = document.createElement('img');
//             icon.src = `../assets/icon/${opt.folder}/${opt.icon}`;
//             icon.alt = opt.label;
//             iconDiv.appendChild(icon);

//             const label = document.createElement('label');
//             label.textContent = opt.label;

//             const select = document.createElement('select');
//             select.name = opt.name;

//             const placeholderOption = document.createElement('option');
//             placeholderOption.value = "";
//             placeholderOption.textContent = "เลือกประเภท";
//             placeholderOption.disabled = true;
//             placeholderOption.selected = true;
//             select.appendChild(placeholderOption);

//             opt.choices.forEach(choice => {
//                 const option = document.createElement('option');
//                 option.value = choice;
//                 option.textContent = choice;
//                 select.appendChild(option);
//             });

//             row.appendChild(iconDiv);
//             row.appendChild(label);
//             row.appendChild(select);
//         }
//         else {
//             const clone = template.content.cloneNode(true);
//             clone.querySelector('img').src = `../assets/icon/${opt.folder}/${opt.icon}`;
//             clone.querySelector('img').alt = opt.label;
//             clone.querySelector('label').textContent = opt.label;
//             clone.querySelector('input[type="checkbox"]').name = opt.name;
//             clone.querySelector('input[type="text"]').name = `${opt.name}_detail`;
//             row = clone;
//         }

//         container.appendChild(row);
//     });
// });
// }

function setupDropdownToggle() {
    document.querySelectorAll('.dropdown-selected').forEach(selected => {
        selected.addEventListener('click', () => {
            const options = selected.nextElementSibling;
            const isOpen = options.classList.contains('show');

            document.querySelectorAll('.dropdown-options').forEach(opt => {
                if (opt !== options) {
                    opt.classList.remove('show');
                    opt.style.maxHeight = null;
                }
            });

            if (!isOpen) {
                options.classList.add('show');
                options.style.maxHeight = options.scrollHeight + "px";
            } else {
                options.classList.remove('show');
                options.style.maxHeight = null;
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderFormGroups();
    setupDropdownToggle();

    // ✅ โหลดข้อมูลหลัง DOM ถูกสร้างแล้ว
    const editIndex = localStorage.getItem("editIndex");
    if (editIndex !== null) {
        const homes = JSON.parse(localStorage.getItem("homes") || "[]");
        const home = homes[editIndex];

        // ✅ ใส่ชื่อโครงการ และ preview รูป
        if (home) {
            document.getElementById("project_name").value = home.name;
            document.getElementById("file-name").textContent = home.imageName || "";

            const preview = document.getElementById("image_preview");
            if (preview && home.imageBase64) {
                preview.src = home.imageBase64; // ใช้ base64 ที่เก็บไว้
                preview.style.display = "block";
            }

        }

        // ✅ ใส่ข้อมูลจากฟอร์ม dropdown
        if (home?.formData) {
            Object.entries(home.formData).forEach(([key, value]) => {
                const inputs = document.querySelectorAll(`[name="${key}"]`);
                inputs.forEach(input => {
                    if (input.type === "checkbox") {
                        input.checked = value;
                    } else if (input.tagName === "SELECT") {
                        input.value = value;
                        input.dispatchEvent(new Event("change"));

                        // ✅ รอให้ dropdown render spec แล้วค่อยใส่ค่า
                        const relatedSpecKeys = Object.entries(home.formData).filter(([k, _]) => k.startsWith(key + "_spec_"));
                        if (relatedSpecKeys.length > 0) {
                            setTimeout(() => {
                                relatedSpecKeys.forEach(([k, v]) => {
                                    const specInput = document.querySelector(`[name="${k}"]`);
                                    if (specInput) specInput.value = v;
                                });
                            }, 300);
                        }
                    } else if (input && input.type !== "file") {
                        // แสดงตัวเลขแบบมีจุลภาค
                        if (Number.isFinite(Number(removeCommas(value)))) {
                            input.value = formatNumber(removeCommas(value));
                        } else {
                            input.value = value;
                        }
                    }
                });
            });
        }
        // if (home?.formData) {
        //     Object.entries(home.formData).forEach(([key, value]) => {
        //         const inputs = document.querySelectorAll(`[name="${key}"]`);
        //         inputs.forEach(input => {
        //             if (input.type === "checkbox") {
        //                 input.checked = value;
        //             } else if (input.tagName === "SELECT") {
        //                 input.value = value;
        //                 input.dispatchEvent(new Event("change"));

        //                 // ✅ รอให้ dropdown render spec แล้วค่อยใส่ค่า
        //                 const relatedSpecKeys = Object.entries(home.formData).filter(([k, _]) => k.startsWith(key + "_spec_"));
        //                 if (relatedSpecKeys.length > 0) {
        //                     setTimeout(() => {
        //                         relatedSpecKeys.forEach(([k, v]) => {
        //                             const specInput = document.querySelector(`[name="${k}"]`);
        //                             if (specInput) specInput.value = v;
        //                         });
        //                     }, 300);
        //                 }
        //             } else if (input && input.type !== "file") {
        //                 input.value = value;
        //             }
        //         });
        //     });
        // }
    }
});