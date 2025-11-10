window.formGroups = [
    {
        title: "ข้อมูลบ้าน (House Information)",
        containerId: "form-information",
        options: [
            { label: "ราคาบ้าน", name: "house_price", icon: "house price.png", folder: "information", type: "textOnly", placeholderUnit: "ล้านบาท", unit: "ลบ." },
            { label: "พื้นที่ใช้สอย", name: "useable_area", icon: "useable area.png", folder: "information", type: "textOnly", placeholderUnit: "ตารางเมตร", unit: "ตร.ม." },
            {
                label: "ห้องนอน",
                name: "bedroom",
                icon: "bedroom.png",
                folder: "information",
                choices: ["ไม่มี", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                type: "select",
                unit: "ห้อง"
            },
            {
                label: "ห้องน้ำ",
                name: "bathroom",
                icon: "bathroom.png",
                folder: "information",
                choices: ["ไม่มี", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                type: "select",
                unit: "ห้อง"
            },
            {
                label: "ห้องแม่บ้าน",
                name: "land_maidroomsize",
                icon: "maidroom.png",
                folder: "information",
                choices: ["ไม่มี", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                type: "select",
                unit: "ห้อง"
            },
            {
                label: "ที่จอดรถ",
                name: "garage",
                icon: "garage.png",
                folder: "information",
                choices: ["ไม่มี", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                type: "select",
                unit: "คัน"
            }
        ]
    },
    {
        title: "งานโครงสร้าง (Structural)",
        containerId: "form-structural",
        options: [
            {
                label: "โครงสร้างผนัง",
                name: "Wall",
                icon: "wall.png",
                folder: "structural",
                choices: ["ผนังคอนกรีตเสริมเหล็ก (หล่อใน)", "ผนังคอนกรีตสำเร็จรูป (พรีแคส)", "ผนังก่ออิฐ (อิฐมอญ,อิญมวลเบา)"]
            },
            {
                label: "โครงสร้างคาน/เสา",
                name: "pile_structure",
                icon: "pile.png",
                folder: "structural",
                choices: ["เหล็ก (Steel Structure)", "คอนกรีตเสริมเหล็ก (ค.ส.ล.)", "คอนกรีตเสริมเหล็กสำเร็จรูป (Precast Concrete)", "ไม้ (Wooden Structure)"]
            },
            {
                label: "โครงหลังคา",
                name: "roof_structure",
                icon: "roof.png",
                folder: "structural",
                choices: ["Smart Truss", "Smart Trussและเหล็ก (ใช้งานร่วมกัน)", "เหล็กรูปพรรณ", "คอนกรีตเสริมเหล็ก (ค.ส.ล.)"]
            },
            {
                label: "วัสดุมุงหลังคา",
                name: "roofing_structure",
                icon: "roofing.png",
                folder: "structural",
                choices: ["กระเบื้องเซรามิก", "กระเบื้องคอนกรีต/โมเนีย", "เมมเบรนยาง (สำหรับหลังคาเรียบ,ดาดฟ้า)", "เมทัลชีท", "ชิงเกิ้ลรูฟ (Asphalt Shingles)", "กระเบื้องลอนคู่ (ไฟเบอร์ซีเมนต์)", "กระเบื้องดินเผา", "อื่นๆ"],
                specUnit: "ประเภท",
                alwaysShowSingleSpec: true
            },
            {
                label: "พื้นที่จอดรถ",
                name: "garage_structure",
                icon: "garage.png",
                folder: "structural",
                choices: ["ลงเสาเข็ม", "ไม่ลงเสาเข็ม"]
            },
            {
                label: "พื้นที่ซักล้าง",
                name: "wash_structure",
                icon: "wash.png",
                folder: "structural",
                choices: ["ไม่มีพื้นที่ซักล้าง", "ลงเสาเข็ม", "ไม่ลงเสาเข็ม"]
            }
        ],
        type: "select"
    },
    {
        title: "การรับประกัน (Defect Warranty)",
        containerId: "form-warranty",
        options: [
            { label: "ประกันโครงสร้างบ้าน 5 ปี", name: "Structural_Defects", icon: "warranty.png", folder: "warranty" },
            { label: "ประกันส่วนประกอบหรืออุปกรณ์ 1 ปี", name: "Non_Structural_Defects", icon: "warranty.png", folder: "warranty" }
        ],
        type: "Checkbox"
    },
    {
        title: "งานประปา, สุขาภิบาล (Plumbing-Sanitary)",
        containerId: "form-plumbing",
        type: "select",
        options: [
            {
                label: "ระบบท่อปลวก",
                name: "Pipe_Termites",
                icon: "pipe termites.png",
                folder: "plumbing",
                choices: ["ไม่มี", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                unit: "จุด",
                allowSingleDetail: true
            },
            {
                label: "บ่อพักดักกลิ่น",
                name: "Ordor_Trap",
                icon: "ordor.png",
                folder: "plumbing",
                choices: ["ไม่มี", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                unit: "บ่อ",
                allowSingleDetail: true
            },
            {
                label: "ปั้มน้ำอัตโนมัติ",
                name: "Water_Pump",
                icon: "pump.png",
                folder: "plumbing",
                choices: ["ไม่มี", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                specUnit: "เครื่อง",
                unit: "วัตต์"
            },
            {
                label: "ถังบำบัดน้ำเสีย",
                name: "Septic_Tank",
                icon: "septic tank.png",
                folder: "plumbing",
                choices: ["ไม่มี", "DOS (ดอส)", "WAVE (เวฟ)", "AQUA (อควา)", "SAFE (เซฟ)", "อื่นๆ"],
                secondaryChoices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                specUnit: "ถัง",
                unit: "ลิตร"
            },
            {
                label: "ถังดักไขมัน",
                name: "Grese_Trap",
                icon: "grease.png",
                folder: "plumbing",
                choices: ["ไม่มี", "DOS (ดอส)", "WAVE (เวฟ)", "AQUA (อควา)", "SAFE (เซฟ)", "อื่นๆ"],
                secondaryChoices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                specUnit: "ถัง",
                unit: "ลิตร"
            },
            {
                label: "แทงค์น้ำ",
                name: "Water_Tank",
                icon: "water tank.png",
                folder: "plumbing",
                choices: ["ไม่มี", "DOS (ดอส)", "WAVE (เวฟ)", "COTTO", "Safe (เซฟ)", "Diamond (ไดมอนด์)", "อื่นๆ"],
                secondaryChoices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                specUnit: "ถัง",
                unit: "ลิตร"
            }
        ]
    },
    {
        title: "งานหลังคา (Roofing)",
        containerId: "form-roof",
        options: [
            {
                label: "ฉนวนกันความร้อนใต้หลังคา",
                name: "Fiberglass_Insulation",
                icon: "fiberglass.png",
                folder: "roof",
                choices: ["ไม่มี", "โฟมโพลียูริเทน (PU Foam)", "ฉนวนใยแก้ว/ไฟเบอร์กลาส", "ฉนวนเซลลูโลส/ฉนวนเยื่อกระดาษ", "โฟมโพลีเอทิลีน (PE Foam)", "ฉนวนแอร์บับเบิล", "แผ่นสะท้อนความร้อน", "ฝ้าสะท้อนความร้อน", "อื่นๆ"],
                type: "select",
                specUnit: "ประเภท",
                alwaysShowSingleSpec: true
            },
            {
                label: "หลังคาโซลาร์เซลล์",
                name: "Solar_Rooftop",
                icon: "solar rooftop.png",
                folder: "roof",
                choices: ["ไม่มี", "ระบบออนกริด (On Grid)", "ระบบไฮบริด (Hybrid Grid)", "ระบบออฟกริด (Off Grid)"],
                type: "select",
                specUnit: "วัตต์",
                unit: "วัตต์",
                alwaysShowSingleSpec: true
            },
            { label: "ระบบระบายความร้อนใต้หลังคา", name: "RoofTile_Ventilator", icon: "roof tile.png", folder: "roof", type: "Checkbox" },
            { label: "ฝ้าระบายอากาศเหนือฝ้าชายคา ", name: "Roof_Ventilation ", icon: "ventilation.png", folder: "roof", type: "Checkbox" },
        ]
    },
    {
        title: "งานไฟฟ้า (Electrical)",
        containerId: "form-electrical",
        options: [
            {
                label: "มิเตอร์ไฟ",
                name: "meter",
                icon: "meter.png",
                folder: "electrical",
                type: "select",
                choices: ["ไม่มี", "1 เฟส 5(15)A", "1 เฟส 15(45)A", "1 เฟส 30(100)A", "3 เฟส 15(45)A", "3 เฟส 30(100)A", "3 เฟส 50(150)A"],
            },
            {
                label: "เมนเบรกเกอร์ไฟ",
                name: "cb",
                icon: "cb.png",
                folder: "electrical",
                type: "select",
                choices: ["ไม่มี", "Bticino", "Schneider", "Siemens", "ABB", "Haco", "Mizu save", "อื่นๆ"],
                specUnit: "ประเภท",
                alwaysShowSingleSpec: true
            },
            {
                label: "เบรกเกอร์กันดูดชั้น 1",
                name: "rcd1",
                icon: "rcd.png",
                folder: "electrical",
                type: "select",
                choices: ["ไม่มี", "RCCB", "RCBO", "อื่นๆ"],
                specUnit: "ประเภท",
                alwaysShowSingleSpec: true
            },
            {
                label: "เบรกเกอร์กันดูดชั้น 2",
                name: "rcd2",
                icon: "rcd.png",
                folder: "electrical",
                type: "select",
                choices: ["ไม่มี", "RCCB", "RCBO", "อื่นๆ"],
                specUnit: "ประเภท",
                alwaysShowSingleSpec: true
            },
            {
                label: "สวิทซ์และปลั๊ก",
                name: "switch_plug",
                icon: "switch plug.png",
                folder: "electrical",
                type: "select",
                choices: ["ไม่มี", "Bticino", "Schneider", "Siemens", "Panasonic", "Philips", "Legrand", "ART DNA", "Chang", "Mizu save", "Nano", "อื่นๆ"],
                specUnit: "ประเภท",
                alwaysShowSingleSpec: true
            },
            {
                label: "ระบบสาย Fiber Optic",
                name: "optic_cable",
                icon: "optic cable.png",
                folder: "electrical",
                type: "select",
                choices: ["ไม่มี", "AIS Fibre", "TrueOnline", "NT (National Telecom)", "3BB", "อื่นๆ"],
                specUnit: "ประเภท",
                alwaysShowSingleSpec: true
            },
            {
                label: "หลักดิน/สายดิน",
                name: "earth_pit",
                icon: "earth pit.png",
                folder: "electrical",
                type: "select",
                choices: ["ไม่มี", "บ่อกราวน์", "ฝังลงดิน", "อื่นๆ"],
                specUnit: "ประเภท",
                alwaysShowSingleSpec: true
            },
            {
                label: "EV Charger",
                name: "ev_charger",
                icon: "ev charger.png",
                folder: "electrical",
                type: "select",
                choices: ["ไม่มี", "เครื่องชาร์จ", "บล็อกไฟ"],
                secondaryChoices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                unit: "จุด",
                noSpec: true
            },
            {
                label: "ไฟฉุกเฉิน",
                name: "emergency_light",
                icon: "emergency light.png",
                folder: "electrical",
                type: "select",
                choices: ["ไม่มี", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                unit: "จุด",
                allowSingleDetail: true
            },
            {
                label: "บล็อกไฟมอเตอร์ประตูรั้ว",
                name: "door_automatic",
                icon: "door automatic.png",
                folder: "electrical",
                type: "select",
                choices: ["ไม่มี", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                unit: "จุด",
                allowSingleDetail: true
            },
            {
                label: "เครื่องปรับอากาศ",
                name: "air_conditioner",
                icon: "air-conditioner.png",
                folder: "electrical",
                type: "select",
                choices: ["ไม่มี", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                unit: "จุด",
                allowSingleDetail: true
            },
            {
                label: "บล็อกไฟน้ำอุ่น",
                name: "water_heater",
                icon: "water-heater.png",
                folder: "electrical",
                type: "select",
                choices: ["ไม่มี", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                unit: "จุด",
                allowSingleDetail: true
            },
            {
                label: "ระบบสาย LAN",
                name: "lan_cable",
                icon: "lan cable.png",
                folder: "electrical",
                type: "select",
                choices: ["ไม่มี", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                unit: "จุด",
                allowSingleDetail: true
            }
        ]
    },
    {
        title: "นวัตกรรม (Living Soloution)",
        containerId: "form-living",
        options: [
            { label: "ระบบสมาร์ทโฮม", name: "smart_home", icon: "smart-house.png", folder: "solution" },
            { label: "เครื่องตรวจจับความร้อน", name: "heat_detector", icon: "heat detector.png", folder: "solution" },
            { label: "เครื่องตรวจจับควัน", name: "Smoke_Detector", icon: "smoke detector.png", folder: "solution" },
            { label: "ระบบรักษาความปลอดภัย", name: "Security_Home", icon: "home-security.png", folder: "solution" },
            { label: "กล้องวงจรปิด", name: "cctv", icon: "cctv-camera.png", folder: "solution" },
            { label: "ประตูอัตโนมัติโรงรถ", name: "Automatic_Garage_Door", icon: "auto garage.png", folder: "solution" },
            { label: "กระจกเขียวตัดแสง ", name: "Green_Glass", icon: "green glass.png", folder: "solution" },
            { label: "แอพพลิเคชั่นตัวบ้าน", name: "House_Appllication", icon: "house app.png", folder: "solution" },
            { label: "ระบบกรองอากาศในบ้าน", name: "Air_Quality", icon: "air quality.png", folder: "solution" },
        ],
        type: "Checkbox"
    },
    {
        title: "งานเบล็ดเตล็ด (Utility)",
        containerId: "form-utility",
        options: [
            { label: "กริ่งบ้าน", name: "bell", icon: "bell.png", folder: "utility" },
            { label: "ตู้ไปรษณีย์", name: "mailbox", icon: "mailbox.png", folder: "utility" },
            { label: "ถังขยะ", name: "bin", icon: "rubbish bin.png", folder: "utility" },
            { label: "ครัวไทย", name: "kitchen_furniture", icon: "kitchen furniture.png", folder: "utility" },
            { label: "Built- in เคาน์เตอร์ชุดครัว", name: "countertop", icon: "countertop.png", folder: "utility" },
            { label: "ครัวฝรั่ง (Pantry)", name: "pantry", icon: "pantry.png", folder: "utility" },
            { label: "ฉากกั้นอาบน้ำ", name: "Shower_Enclosures", icon: "shower enclosure.png", folder: "utility" },
            { label: "งานจัดสวน", name: "gardening", icon: "gardening.png", folder: "utility" },
            { label: "รางน้ำ", name: "gutters", icon: "gutters.png", folder: "utility" },
            { label: "ท่อสำหรับติดตั้งโซลาร์เซลล์", name: "upvc", icon: "upvc conduit pipe.png", folder: "utility" },
            { label: "ครีบกันดินทรุด (ฟิน) ", name: "retaining", icon: "retaining wall.png", folder: "utility" },
        ],
        type: "Checkbox",
    },
    {
        title: "งานส่วนกลาง (facility)",
        containerId: "form-facility",
        options: [
            { label: "ฟิตเนส", name: "fitness", icon: "weights.png", folder: "facility" },
            { label: "สระว่ายน้ำ", name: "swimming_pool", icon: "swimming-pool.png", folder: "facility" },
            { label: "สนามเด็กเล่น", name: "playground", icon: "playground.png", folder: "facility" },
            { label: "สโมสร", name: "club", icon: "night-club.png", folder: "facility" },
            { label: "สวนส่วนกลาง", name: "common_garden", icon: "park.png", folder: "facility" },
            { label: "ห้องประชุม", name: "meeting_room", icon: "meeting-room.png", folder: "facility" },
            { label: "โคเวิร์คกิ้งสเปซ", name: "co_working_space", icon: "collaborative.png", folder: "facility" },
            { label: "คลับเฮาส์", name: "clubhouse", icon: "club.png", folder: "facility" },
            { label: "ห้องเด็กเล่น", name: "kids_room", icon: "baby-crib.png", folder: "facility" }
],
        type: "Checkbox",
    }
];