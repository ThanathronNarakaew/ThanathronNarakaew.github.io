window.itemTypeMap = {
    //--------------- A ---------------//
    Wall: "A",
    pile_structure: "A",
    roof_structure: "A",
    roofing_structure: "A",
    garage_structure: "A",
    wash_structure: "A",
    Septic_Tank: "A",
    Ordor_Trap: "A",
    Grese_Trap: "A",
    Water_Tank: "A",
    Water_Pump: "A",
    Pipe_Termites: "A",
    Fiberglass_Insulation: "A",
    meter: "A",
    cb: "A",
    earth_pit: "A",
    retaining: "A",
    Structural_Defects: "A",
    Non_Structural_Defects: "A",
    //--------------- B ---------------//
    rcd1: "B",
    rcd2: "B",
    Security_Home: "B",
    cctv: "B",
    //--------------- C ---------------//
    RoofTile_Ventilator: "C",
    Roof_Ventilation: "C",
    emergency_light: "C",
    door_automatic: "C",
    bell: "C",
    switch_plug: "C",
    air_conditioner: "C",
    water_heater: "C",
    lan_cable: "C",
    heat_detector: "C",
    Smoke_Detector: "C",
    Automatic_Garage_Door: "C",
    Green_Glass: "C",
    Air_Quality_Sensor: "C",
    mailbox: "C",
    bin: "C",
    kitchen_furniture: "C",
    countertop: "C",
    Shower_Enclosures: "C",
    gardening: "C",
    gutters: "C",
    pantry: "C",
    upvc: "C",
    //--------------- D ---------------//
    Solar_Rooftop: "D",
    ev_charger: "D",
    smart_home: "D",
    optic_cable: "D",
    House_Appllication: "D",





    
    //---------News--------------------//
    //--------------- A (โครงสร้าง) ---------------//
// park: "A",
// bike_lane: "A",
// swimming_pool: "A",
// playground: "A",

// //--------------- B (ความปลอดภัย) ---------------//

// //--------------- C (ความสะดวกสบาย) ---------------//
// fitness: "C",
// sauna_stream: "C",
// co_working_space: "C",
// meeting_room: "C",

// //--------------- D (เทคโนโลยี) ---------------//
// ev_charger: "D",

};











window.itemScoreMap = {
    Wall: {
        "ผนังคอนกรีตเสริมเหล็ก (หล่อใน)": 1,
        "ผนังคอนกรีตสำเร็จรูป (พรีแคส)": 0.5,
        "ผนังก่ออิฐ (อิฐมอญ,อิญมวลเบา)": 0.3
    },
    pile_structure: {
        "เหล็ก (Steel Structure)": 1,
        "คอนกรีตเสริมเหล็ก (ค.ส.ล.)": 0.7,
        "คอนกรีตเสริมเหล็กสำเร็จรูป (Precast Concrete)": 0.5,
        "ไม้ (Wooden Structure)": 0.1
    },
    roof_structure: {
        "Smart Truss": 1,
        "Smart Trussและเหล็ก (ใช้งานร่วมกัน)": 0.8,
        "เหล็กรูปพรรณ": 0.6,
        "คอนกรีตเสริมเหล็ก (ค.ส.ล.)": 0.4
    },
    roofing_structure: {
        "กระเบื้องเซรามิก": 1.0,
        "กระเบื้องคอนกรีต/โมเนีย": 0.5,
        "เมมเบรนยาง (สำหรับหลังคาเรียบ,ดาดฟ้า)": 1.0,
        "เมทัลชีท": 0.5,
        "ชิงเกิ้ลรูฟ (Asphalt Shingles)": 0.5,
        "กระเบื้องลอนคู่ (ไฟเบอร์ซีเมนต์)": 0.5,
        "กระเบื้องดินเผา": 0.5,
        "อื่นๆ": 0.3,
    },
    garage_structure: {
        "ลงเสาเข็ม": 1,
        "ไม่ลงเสาเข็ม": 0.0
    },
    wash_structure: {
        "ลงเสาเข็ม": 1,
        "ไม่ลงเสาเข็ม": 0.0
    },
    Fiberglass_Insulation: {
        "โฟมโพลียูริเทน (PU Foam)": 1.0,
        "ฉนวนใยแก้ว/ไฟเบอร์กลาส": 0.8,
        "ฉนวนเซลลูโลส/ฉนวนเยื่อกระดาษ": 0.7,
        "โฟมโพลีเอทิลีน (PE Foam)": 0.6,
        "ฉนวนแอร์บับเบิล": 0.5,
        "แผ่นสะท้อนความร้อน": 0.4,
        "ฝ้าสะท้อนความร้อน": 0.2,
        "อื่นๆ": 0.5
    },
    earth_pit: {
        "บ่อกราวน์": 1.0,
        "ฝังลงดิน": 0.5,
        "อื่นๆ": 0.3
    },
    Grese_Trap: {
        "DOS (ดอส)": 1.0,
        "WAVE (เวฟ)": 0.5,
        "AQUA (อควา)": 0.5,
        "SAFE (เซฟ)": 0.5,
        "อื่นๆ": 0.3
    },
    Water_Tank: {
        "DOS": 1.0,
        "WAVE": 0.5,
        "COTTO": 0.5,
        "Safe": 0.5,
        "Diamond": 0.5,
        "อื่นๆ": 0.3
    },
    Septic_Tank: {
        "DOS (ดอส)": 1.0,
        "WAVE (เวฟ)": 0.5,
        "AQUA (อควา)": 0.5,
        "SAFE (เซฟ)": 0.5,
        "อื่นๆ": 0.3
    },
    ev_charger: {
        "เครื่องชาร์จ": 1.0,
        "บล็อกไฟ": 0.5,
    },
    Solar_Rooftop: {
        "ระบบออนกริด (On Grid)": 1.0,
        "ระบบไฮบริด (Hybrid Grid)": 0.5,
        "ระบบออฟกริด (Off Grid)": 0.3
    },
    optic_cable: {
        "AIS Fibre": 1.0,
        "TrueOnline": 1.0,
        "NT (National Telecom)": 1.0,
        "3BB": 1.0,
        "อื่นๆ": 0.3
    },
}
