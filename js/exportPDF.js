// This function creates the HTML for the PDF
function generateSummaryHTML() {
  const container = document.getElementById("pdf-content");
  container.innerHTML = "";

  const homes = window.compareHomes || [];
  const groups = window.formGroups || [];

  const sectionClass = "pdf-section";
  const tableClass = "pdf-table";
  const colLeftClass = "col-left";
  const colHomeClass = "col-home";

  // ตารางคะแนนบ้าน
  const scoreSection = document.createElement("div");
  scoreSection.className = "pdf-section";

  const scoreTitle = document.createElement("h3");
  scoreTitle.textContent = "คะแนน (Rating)";
  scoreTitle.style.marginBottom = "10px";
  scoreSection.appendChild(scoreTitle);

  const note = document.createElement("p");
  note.className = "score-note";
  note.textContent =
    "**เราจะใช้การให้คะแนนแบบถ่วงน้ำหนัก (Weighted Average) เพื่อประเมินความคุ้มค่าของบ้าน โดยเน้นที่สเปกของบ้าน ทั้งในด้านอายุการใช้งาน คุณภาพวัสดุ และความแข็งแรง ซึ่งล้วนเป็นปัจจัยสำคัญต่อการอยู่อาศัยในระยะยาว**";
  scoreSection.appendChild(note); 

  const scoreTable = document.createElement("table");
  scoreTable.className = "pdf-table";

  const headerRow = document.createElement("tr");
  const labelTh = document.createElement("th");
  labelTh.textContent = "คะแนน";
  headerRow.appendChild(labelTh);

  homes.forEach((home) => {
    const th = document.createElement("th");
    th.textContent = home.name || "บ้าน";
    headerRow.appendChild(th);
  });
  scoreTable.appendChild(headerRow);

  const categories = [
    { label: "คะแนนรวม", key: "total" },
    { label: "โครงสร้าง (45%)", key: "A" },
    { label: "ความปลอดภัย (20%)", key: "B" },
    { label: "ความสะดวกสบาย (25%)", key: "C" },
    { label: "เทคโนโลยี (10%)", key: "D" },
  ];

  homes.forEach((home, i) => {
    if (!home.ratingInfo && window.calculateRatings) {
      home.ratingInfo = window.calculateRatings(homes)[i];
    }
  });

  categories.forEach((cat) => {
    const row = document.createElement("tr");
    const labelCell = document.createElement("td");
    labelCell.textContent = cat.label;
    row.appendChild(labelCell);

    homes.forEach((home) => {
      const ratingInfo = home.ratingInfo || {};
      const value =
        cat.key === "total"
          ? ratingInfo.rating != null
            ? ratingInfo.rating
            : "-"
          : ratingInfo.breakdown?.[cat.key] ?? "-";
      const td = document.createElement("td");
      td.textContent = value != null ? value : "-";
      row.appendChild(td);
    });
    scoreTable.appendChild(row);
  });

  scoreSection.appendChild(scoreTable);
  container.appendChild(scoreSection);

  // loop กลุ่ม → รายการ
  groups.forEach((group) => {
    const section = document.createElement("div");
    section.className = sectionClass;

    const sectionTitle = document.createElement("h3");
    sectionTitle.textContent = `${group.title}`;
    section.appendChild(sectionTitle);

    const table = document.createElement("table");
    table.className = tableClass;

    const headerRow = document.createElement("tr");
    const thTitle = document.createElement("th");
    thTitle.textContent = "รายการ";
    thTitle.className = colLeftClass;
    headerRow.appendChild(thTitle);

    homes.forEach((home) => {
      const th = document.createElement("th");
      th.textContent = home.name || "-";
      th.className = colHomeClass;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    group.options.forEach((opt) => {
      const row = document.createElement("tr");
      const labelCell = document.createElement("td");
      labelCell.textContent = opt.label;
      labelCell.className = colLeftClass;
      row.appendChild(labelCell);

      homes.forEach((home) => {
        const type = opt.type || group.type;
        const typeVal = home.formData?.[`${opt.name}_type`] || "";
        const typeOther = home.formData?.[`${opt.name}_type_other`] || "";
        const count = home.formData?.[`${opt.name}_count`] || "";
        const specs = Object.entries(home.formData || {})
          .filter(
            ([k]) => k.startsWith(`${opt.name}_spec_`) && home.formData[k]
          )
          .map(([_, v]) => {
            const cleanVal = removeCommas(v);
            const formattedVal = Number.isFinite(Number(cleanVal))
              ? formatNumber(cleanVal)
              : v;
            return `ขนาด ${formattedVal} ${opt.unit || ""}`;
          });

        const hasNewDropdown =
          group.containerId === "form-plumbing" &&
          (typeVal || count || specs.length > 0);
        const value = home.formData?.[opt.name] ?? typeVal ?? "";
        const detail = home.formData?.[`${opt.name}_detail`];
        const td = document.createElement("td");
        td.className = colHomeClass;

        if (type === "Checkbox") {
          td.textContent = detail?.trim() || (value ? "✅" : "❌");
        } else {
          if (value === "ไม่มี") {
            td.textContent = "❌";
          } else if (
            !hasNewDropdown &&
            (value === undefined ||
              value === "" ||
              value === null ||
              value === "0" ||
              value === 0 ||
              value === "ไม่มี")
          ) {
            td.textContent = "❌";
          }
          else if (
            (group.containerId === "form-plumbing" ||
              group.containerId === "form-electrical") &&
            opt.secondaryChoices &&
            (home.formData?.[`${opt.name}_type`] !== undefined ||
              home.formData?.[`${opt.name}_count`] !== undefined)
          ) {
            const typeDisplay =
              typeVal === "อื่นๆ" ? `อื่นๆ ${typeOther}` : typeVal;
            let display = typeDisplay;
            if (count) {
              display += ` ${count} ${opt.specUnit || opt.unit || ""}`;
            }
            if (specs.length > 0 && !opt.noSpec) {
              display += "<br>" + specs.join("<br>");
            }
            td.innerHTML = display;
          }
          else if (opt.allowSingleDetail) {
            const detail = home.formData?.[`${opt.name}_detail`];
            if (detail?.trim()) {
              td.innerHTML = `${value} ${opt.unit || ""}<br>${detail}`;
            } else {
              td.textContent = `${value} ${opt.unit || ""}`;
            }
          } else if (opt.alwaysShowSingleSpec) {
            const detail = home.formData?.[`${opt.name}_spec_1`];
            if (detail) {
              const cleanDetail = removeCommas(detail);
              const formattedDetail = Number.isFinite(Number(cleanDetail))
                ? formatNumber(cleanDetail)
                : detail;
              td.innerHTML = `${value} ${formattedDetail} ${opt.unit || ""}`;
            } else {
              td.innerHTML = detail
                ? `${value} ${detail} ${opt.unit || ""}`
                : value;
            }
          }
          else if (Number.isFinite(Number(removeCommas(value)))) {
            if (
              group.containerId === "form-information" ||
              group.title === "ข้อมูลทั่วไป"
            ) {
              const numValue = formatNumber(removeCommas(value));
              td.textContent = opt.unit
                ? `${numValue} ${opt.unit}`
                : `${numValue}`;
            } else {
              const numValue = formatNumber(removeCommas(value));
              let display = `${numValue} ${opt.specUnit || "" || opt.unit}`;
              const specs = Object.entries(home.formData || {})
                .filter(
                  ([key]) =>
                    key.startsWith(`${opt.name}_spec_`) && home.formData[key]
                )
                .map(([_, val]) => {
                  const cleanVal = removeCommas(val);
                  return Number.isFinite(Number(cleanVal))
                    ? `ขนาด ${formatNumber(cleanVal)} ${opt.unit || ""}`
                    : `ขนาด ${val} ${opt.unit || ""}`;
                });
              if (specs.length > 0) {
                display += "<br>" + specs.join("<br>");
              }
              td.innerHTML = display;
            }
          } else {
            td.textContent = value;
          }
        }
        row.appendChild(td);
      });
      table.appendChild(row);
    });
    section.appendChild(table);
    container.appendChild(section);
  });
}

// Helper functions
function formatNumber(value) {
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return num.toLocaleString("en-US");
}

function removeCommas(value) {
  return value.replace(/,/g, "");
}


// --- THIS IS THE ONLY FUNCTION THAT GENERATES A PDF ---
// It sends the HTML to the server to be rendered by Puppeteer.
function generateAndExport() {
  console.log("Generating PDF on client-side...");

  // 1. Generate the HTML table data
  generateSummaryHTML(); 
  const content = document.getElementById("pdf-content");

  // (อย่าลืมใส่ header/วันที่ เข้าไปใน #pdf-content ด้วย)

  const { jsPDF } = window.jspdf;

  html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // คำนวณอัตราส่วนเพื่อให้ภาพพอดีกับหน้ากระดาษ
      const ratio = canvasHeight / canvasWidth;
      const imgHeight = pdfWidth * ratio;

      // (คุณอาจต้องเขียนโค้ดเพิ่มเพื่อตัดแบ่งเนื้อหาที่ยาวเกิน 1 หน้า)
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);

      // 4. เปิด PDF (วิธีนี้คือการบังคับดาวน์โหลด)
      window.open(pdf.output('bloburl'), '_blank');

      // หรือถ้าอยากเปิดในแท็บใหม่ (อาจโดน popup blocker)
      // window.open(pdf.output('bloburl'), '_blank');
  })
  .catch(err => {
      alert("❌ Export PDF ผิดพลาด: " + err.message);
      console.error(err);
  });
}