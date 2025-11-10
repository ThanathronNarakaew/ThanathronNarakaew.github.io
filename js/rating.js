function calculateRatings(compareHomes) {
    const weights = { A: 45, B: 20, C: 25, D: 10 };
    const itemTypeMap = window.itemTypeMap || {};
    const itemScoreMap = window.itemScoreMap || {};

    function getMaxCountByType(compareHomes) {
        const maxCount = { A: 0, B: 0, C: 0, D: 0 };
        const allKeys = new Set();

        compareHomes.forEach(home => {
            Object.keys(home.formData || {}).forEach(k => {
                // ข้าม key ที่เป็น metadata
                if (k.includes('_spec_') || k.includes('_other') || k.includes('_detail')) {
                    return;
                }

                // ถ้า key มี _type หรือ _count ให้เก็บ key เต็ม
                // ระบบจะจัดการเองในขั้นตอนต่อไป
                allKeys.add(k);
            });
        });

        allKeys.forEach(key => {
            // หา baseKey โดยตัด suffix ทั้งหมดออก
            let lookupKey = key;
            const suffixes = ['_type', '_count'];
            for (const suffix of suffixes) {
                if (key.endsWith(suffix)) {
                    lookupKey = key.replace(suffix, '');
                    break;
                }
            }

            const type = itemTypeMap[lookupKey];
            if (type) maxCount[type] += 1;
        });

        return maxCount;
    }

    const maxCountByType = getMaxCountByType(compareHomes);

    return compareHomes.map((home) => {
        const score = { A: 0, B: 0, C: 0, D: 0 };
        const count = { A: 0, B: 0, C: 0, D: 0 };

        for (const key in home.formData) {
            if (key.endsWith("_detail") || key.endsWith("_count") || key.endsWith("_other") || key.includes("_spec_")) continue;

            // ✅ จัดการ Water_Tank , Grese_Trap , ev_charger
            if (key.endsWith("_type") && (key.startsWith("Water_Tank") || key.startsWith("Grese_Trap") || key.startsWith("Septic_Tank") || key.startsWith("ev_charger"))) {
                const baseKey = key.replace("_type", "");
                const type = itemTypeMap[baseKey];
                if (!type) continue;

                const typeValue = home.formData[key];
                const countValue = home.formData[`${baseKey}_count`];

                if (!typeValue || typeValue === "" || typeValue === "ไม่มี") continue;

                // ใช้ itemScoreMap สำหรับการให้คะแนน
                if (typeValue && countValue) {
                    const scoreValue = itemScoreMap[baseKey] ? (itemScoreMap[baseKey][typeValue] || 0) : 1;
                    score[type] += scoreValue;
                    console.log(`[✓] ${home.name} | ${baseKey}: "${typeValue}" + จำนวน ${countValue} → +${scoreValue} → ${type}`);
                }
                count[type] += 1;
                continue;
            }

            const type = itemTypeMap[key];
            if (!type) continue;

            const value = home.formData[key];
            if (!value || value === "") continue; // ✅ ข้ามถ้ายังไม่ได้เลือกอะไร

            if (typeof value === "boolean") {
                if (value) {
                    score[type] += 1;
                    console.log(`[✓] ${home.name} | ${key}: Checkbox TRUE → +1 → ${type}`);
                }
                count[type] += 1;
            }
            else if (typeof value === "string") {
                if (itemScoreMap[key]) {
                    const percent = itemScoreMap[key][value] || 0;
                    score[type] += percent;
                    console.log(`[✓] ${home.name} | ${key}: "${value}" → ${percent} → ${type}`);
                } else if (value !== "ไม่มี") {
                    score[type] += 1;
                    console.log(`[✓] ${home.name} | ${key}: "${value}" (no map) → +1 → ${type}`);
                } else {
                    console.log(`[✘] ${home.name} | ${key}: "ไม่มี" → skip`);
                    continue;
                }
                count[type] += 1;
            }
        }

        const breakdown = {};
        let total = 0;
        for (const type of ["A", "B", "C", "D"]) {
            const maxScore = maxCountByType[type]; // 🆕 ใช้ค่าคงที่แทน count ที่กรอกจริง
            const actualScore = score[type];
            const ratio = maxScore > 0 ? actualScore / maxScore : 0;
            const points = ratio * weights[type];

            breakdown[type] = parseFloat(points.toFixed(2));
            total += points;

            console.log(`>> หมวด ${type} ได้ ${actualScore}/${maxScore} → ${points.toFixed(2)} คะแนน`);
        }

        return {
            name: home.name,
            rating: parseFloat(total.toFixed(2)), // ⭐ คะแนนรวมแบบทศนิยม
            breakdown
        };
    });
}

window.calculateRatings = calculateRatings;

// function calculateRatings(compareHomes) {
//     const weights = { A: 45, B: 20, C: 25, D: 10 };
//     const itemTypeMap = window.itemTypeMap || {};
//     const itemScoreMap = window.itemScoreMap || {};

//     function getMaxCountByType(compareHomes) {
//         const maxCount = { A: 0, B: 0, C: 0, D: 0 };
//         const allKeys = new Set();

//         compareHomes.forEach(home => {
//             Object.keys(home.formData || {}).forEach(k => allKeys.add(k));
//         });

//         allKeys.forEach(key => {
//             const type = itemTypeMap[key];
//             if (type) maxCount[type] += 1;
//         });

//         return maxCount;
//     }

//     const maxCountByType = getMaxCountByType(compareHomes);

//     return compareHomes.map((home) => {
//         const score = { A: 0, B: 0, C: 0, D: 0 };
//         const count = { A: 0, B: 0, C: 0, D: 0 };

//         for (const key in home.formData) {
//             if (key.endsWith("_detail")) continue;
//             const type = itemTypeMap[key];
//             if (!type) continue;

//             const value = home.formData[key];
//             if (!value || value === "") continue; // ✅ ข้ามถ้ายังไม่ได้เลือกอะไร

//             if (typeof value === "boolean") {
//                 if (value) {
//                     score[type] += 1;
//                     console.log(`[✓] ${home.name} | ${key}: Checkbox TRUE → +1 → ${type}`);
//                 }
//                 count[type] += 1;
//             }
//             else if (typeof value === "string") {
//                 if (itemScoreMap[key]) {
//                     const percent = itemScoreMap[key][value] || 0;
//                     score[type] += percent;
//                     console.log(`[✓] ${home.name} | ${key}: "${value}" → ${percent} → ${type}`);
//                 } else if (value !== "ไม่มี") {
//                     score[type] += 1;
//                     console.log(`[✓] ${home.name} | ${key}: "${value}" (no map) → +1 → ${type}`);
//                 } else {
//                     console.log(`[✘] ${home.name} | ${key}: "ไม่มี" → skip`);
//                     continue;
//                 }
//                 count[type] += 1;
//             }
//         }

//         const breakdown = {};
//         let total = 0;
//         for (const type of ["A", "B", "C", "D"]) {
//             const maxScore = maxCountByType[type]; // 🆕 ใช้ค่าคงที่แทน count ที่กรอกจริง
//             const actualScore = score[type];
//             const ratio = maxScore > 0 ? actualScore / maxScore : 0;
//             const points = ratio * weights[type];

//             breakdown[type] = parseFloat(points.toFixed(2));
//             total += points;

//             console.log(`>> หมวด ${type} ได้ ${actualScore}/${maxScore} → ${points.toFixed(2)} คะแนน`);
//         }


//         return {
//             name: home.name,
//             rating: parseFloat(total.toFixed(2)), // ⭐ คะแนนรวมแบบทศนิยม
//             breakdown
//         };
//     });

// }

// window.calculateRatings = calculateRatings;

