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
          td.textContent = detail?.trim() || (value ? "⭕" : "❌");
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
  console.log("Generating HTML for server...");
  
  // 1. Generate the HTML table data
  generateSummaryHTML(); 
  const bodyContent = document.getElementById("pdf-content").innerHTML;

  // 2. Create the full HTML string for the server
  // This is CRITICAL: We include the <style> tag so Puppeteer
  // knows how to load the font.
  const fullHTML = `
      <!DOCTYPE html>
      <html lang="th">
      <head>
          <meta charset="UTF-8">
          <style>
              /* === 1. CSS RESET === */
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }

              /* === 2. FONT EMBEDDING (Absolute URL) === */
              @font-face {
                  font-family: 'FCSound-Regular';
                  /* This full URL is what Puppeteer will load */
                  src: url('http://localhost:5500/assets/font/FCSound-Regular.ttf') format('truetype');
              }

              /* === 3. APPLY FONT & BASIC STYLES === */
              body {
                  font-family: 'FCSound-Regular', sans-serif;
                  font-size: 16px;
                  line-height: 1.4;
              }
              h3 {
                  margin-bottom: 15px;
                  font-size: 18px;
              }
              .pdf-header {
                  font-size: 24px;
                  font-weight: bold;
                  text-align: center;
                  padding: 10px;
                  margin-bottom: 20px;
                  border-bottom: 2px solid #333;
                  page-break-after: avoid; /* Don't break page after header */
              }

              /* === 4. LAYOUT STYLES (from cp.css) === */
              .pdf-table {
                  table-layout: fixed;
                  border-collapse: collapse;
                  width: 100%;
                  margin-bottom: 30px;
              }
              .pdf-table th,
              .pdf-table td {
                  border: 1px solid #ccc;
                  padding: 6px;
                  text-align: center;
                  font-size: 12px;
                  word-wrap: break-word;
                  overflow-wrap: break-word;
              }
              .pdf-table th:first-child,
              .pdf-table td:first-child {
                  text-align: left;
                  width: 35% !important;
              }
              .col-left {
                  width: 35% !important;
                  text-align: left;
              }
              .col-home {
                  width: 21.5% !important;
                  text-align: center;
              }
              .pdf-section {
                  padding: 15px;
                  page-break-after: always;
              }
              .score-note {
                  font-size: 12px;
                  color: #666;
                  padding: 10px;
                  text-align: left;
              }
          </style>
      </head>
      <body>
          ${bodyContent}
      </body>
      </html>
  `;

  // 3. Send the HTML to the server API
  console.log("Sending HTML to server...");
  fetch("http://localhost:5500/api/export-pdf", {
      method: "POST",
      headers: { "Content-Type": "text/html" },
      body: fullHTML,
  })
  .then((res) => {
      if (!res.ok) throw new Error("PDF export failed (check server logs)");
      return res.blob();
  })
  .then((blob) => {
      // 4. Open the PDF in a new tab
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
  })
  .catch((err) => {
      alert("❌ Export PDF ผิดพลาด: " + err.message);
      console.error(err);
  });
}