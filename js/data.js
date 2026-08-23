/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * MÔ HÌNH DỮ LIỆU & BỘ DỮ LIỆU MẪU CHUẨN NGHIỆP VỤ SỞ TÀI CHÍNH
 */

const APP_DATA = {
  // 1. Chỉ số Kinh tế Vĩ mô Tỉnh Khánh Hòa
  macro: {
    year: 2026,
    grdp_growth: 8.45, // %
    grdp_value: 128500, // Tỷ đồng
    total_budget_revenue: 18520.6, // Tỷ đồng
    revenue_target: 18100.0, // Tỷ đồng (102.3% dự toán)
    domestic_revenue: 15420.0, // Thu nội địa
    import_export_revenue: 3100.6, // Thu XNK
    total_budget_expenditure: 16240.2, // Tỷ đồng
    public_investment_disbursed: 7850.4, // Tỷ đồng
    public_investment_plan: 11480.0, // Tỷ đồng (68.38%)
    fdi_registered_usd: 485.6, // Triệu USD
    active_enterprises: 14890, // Doanh nghiệp
    new_enterprises_ytd: 1420,
    export_import_turnover_usd: 2150.0 // Triệu USD
  },

  // 2. Danh mục 65 đơn vị hành chính cấp xã, phường, đặc khu thuộc tỉnh Khánh Hòa (Sở Nội vụ)
  districts: [
    {
        "stt": 1,
        "id": "KH65_01",
        "code": "X_NCR",
        "name": "Xã Nam Cam Ranh",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 210.5,
        "revenue_target": 202.1,
        "revenue_rate": "104,2%",
        "exp": 180.0,
        "dtc_rate": 72.5,
        "dtc_amount": "152.6 Tỷ",
        "enterprises": 180,
        "land_k": 1.15,
        "center": [
            11.85,
            109.12
        ]
    },
    {
        "stt": 2,
        "id": "KH65_02",
        "code": "X_BNH",
        "name": "Xã Bắc Ninh Hòa",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 340.0,
        "revenue_target": 326.4,
        "revenue_rate": "104,2%",
        "exp": 290.0,
        "dtc_rate": 69.0,
        "dtc_amount": "234.6 Tỷ",
        "enterprises": 210,
        "land_k": 1.15,
        "center": [
            12.56,
            109.13
        ]
    },
    {
        "stt": 3,
        "id": "KH65_03",
        "code": "X_TD",
        "name": "Xã Tân Định",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 180.0,
        "revenue_target": 172.8,
        "revenue_rate": "104,2%",
        "exp": 160.0,
        "dtc_rate": 65.0,
        "dtc_amount": "117.0 Tỷ",
        "enterprises": 140,
        "land_k": 1.1,
        "center": [
            12.48,
            109.05
        ]
    },
    {
        "stt": 4,
        "id": "KH65_04",
        "code": "X_NNH",
        "name": "Xã Nam Ninh Hòa",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 290.0,
        "revenue_target": 278.4,
        "revenue_rate": "104,2%",
        "exp": 250.0,
        "dtc_rate": 70.5,
        "dtc_amount": "204.4 Tỷ",
        "enterprises": 230,
        "land_k": 1.15,
        "center": [
            12.42,
            109.1
        ]
    },
    {
        "stt": 5,
        "id": "KH65_05",
        "code": "X_TNH",
        "name": "Xã Tây Ninh Hòa",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 190.0,
        "revenue_target": 182.4,
        "revenue_rate": "104,2%",
        "exp": 210.0,
        "dtc_rate": 64.0,
        "dtc_amount": "121.6 Tỷ",
        "enterprises": 120,
        "land_k": 1.05,
        "center": [
            12.52,
            108.95
        ]
    },
    {
        "stt": 6,
        "id": "KH65_06",
        "code": "X_HT",
        "name": "Xã Hòa Trí",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 220.0,
        "revenue_target": 211.2,
        "revenue_rate": "104,2%",
        "exp": 190.0,
        "dtc_rate": 68.0,
        "dtc_amount": "149.6 Tỷ",
        "enterprises": 160,
        "land_k": 1.1,
        "center": [
            12.51,
            109.08
        ]
    },
    {
        "stt": 7,
        "id": "KH65_07",
        "code": "X_DL",
        "name": "Xã Đại Lãnh",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 310.0,
        "revenue_target": 297.6,
        "revenue_rate": "104,2%",
        "exp": 270.0,
        "dtc_rate": 78.0,
        "dtc_amount": "241.8 Tỷ",
        "enterprises": 240,
        "land_k": 1.25,
        "center": [
            12.85,
            109.34
        ]
    },
    {
        "stt": 8,
        "id": "KH65_08",
        "code": "X_TB",
        "name": "Xã Tu Bông",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 260.0,
        "revenue_target": 249.6,
        "revenue_rate": "104,2%",
        "exp": 230.0,
        "dtc_rate": 75.0,
        "dtc_amount": "195.0 Tỷ",
        "enterprises": 190,
        "land_k": 1.2,
        "center": [
            12.82,
            109.28
        ]
    },
    {
        "stt": 9,
        "id": "KH65_09",
        "code": "X_VT",
        "name": "Xã Vạn Thắng",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 280.0,
        "revenue_target": 268.8,
        "revenue_rate": "104,2%",
        "exp": 240.0,
        "dtc_rate": 76.0,
        "dtc_amount": "212.8 Tỷ",
        "enterprises": 210,
        "land_k": 1.2,
        "center": [
            12.75,
            109.26
        ]
    },
    {
        "stt": 10,
        "id": "KH65_10",
        "code": "X_VN",
        "name": "Xã Vạn Ninh",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 450.0,
        "revenue_target": 432.0,
        "revenue_rate": "104,2%",
        "exp": 380.0,
        "dtc_rate": 81.0,
        "dtc_amount": "364.5 Tỷ",
        "enterprises": 380,
        "land_k": 1.3,
        "center": [
            12.69,
            109.18
        ]
    },
    {
        "stt": 11,
        "id": "KH65_11",
        "code": "X_VH",
        "name": "Xã Vạn Hưng",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 240.0,
        "revenue_target": 230.4,
        "revenue_rate": "104,2%",
        "exp": 210.0,
        "dtc_rate": 74.0,
        "dtc_amount": "177.6 Tỷ",
        "enterprises": 170,
        "land_k": 1.15,
        "center": [
            12.62,
            109.2
        ]
    },
    {
        "stt": 12,
        "id": "KH65_12",
        "code": "X_DK",
        "name": "Xã Diên Khánh",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 480.0,
        "revenue_target": 460.8,
        "revenue_rate": "104,2%",
        "exp": 390.0,
        "dtc_rate": 77.0,
        "dtc_amount": "369.6 Tỷ",
        "enterprises": 420,
        "land_k": 1.25,
        "center": [
            12.25,
            109.09
        ]
    },
    {
        "stt": 13,
        "id": "KH65_13",
        "code": "X_DLAC",
        "name": "Xã Diên Lạc",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 190.0,
        "revenue_target": 182.4,
        "revenue_rate": "104,2%",
        "exp": 170.0,
        "dtc_rate": 71.0,
        "dtc_amount": "134.9 Tỷ",
        "enterprises": 150,
        "land_k": 1.15,
        "center": [
            12.26,
            109.06
        ]
    },
    {
        "stt": 14,
        "id": "KH65_14",
        "code": "X_DD",
        "name": "Xã Diên Điền",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 230.0,
        "revenue_target": 220.8,
        "revenue_rate": "104,2%",
        "exp": 200.0,
        "dtc_rate": 73.0,
        "dtc_amount": "167.9 Tỷ",
        "enterprises": 180,
        "land_k": 1.15,
        "center": [
            12.28,
            109.09
        ]
    },
    {
        "stt": 15,
        "id": "KH65_15",
        "code": "X_DLAM",
        "name": "Xã Diên Lâm",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 160.0,
        "revenue_target": 153.6,
        "revenue_rate": "104,2%",
        "exp": 180.0,
        "dtc_rate": 68.0,
        "dtc_amount": "108.8 Tỷ",
        "enterprises": 110,
        "land_k": 1.1,
        "center": [
            12.31,
            109.02
        ]
    },
    {
        "stt": 16,
        "id": "KH65_16",
        "code": "X_DT",
        "name": "Xã Diên Thọ",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 210.0,
        "revenue_target": 201.6,
        "revenue_rate": "104,2%",
        "exp": 190.0,
        "dtc_rate": 70.0,
        "dtc_amount": "147.0 Tỷ",
        "enterprises": 160,
        "land_k": 1.1,
        "center": [
            12.24,
            108.99
        ]
    },
    {
        "stt": 17,
        "id": "KH65_17",
        "code": "X_SH",
        "name": "Xã Suối Hiệp",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 290.0,
        "revenue_target": 278.4,
        "revenue_rate": "104,2%",
        "exp": 240.0,
        "dtc_rate": 75.0,
        "dtc_amount": "217.5 Tỷ",
        "enterprises": 260,
        "land_k": 1.2,
        "center": [
            12.21,
            109.05
        ]
    },
    {
        "stt": 18,
        "id": "KH65_18",
        "code": "X_CL",
        "name": "Xã Cam Lâm",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 620.0,
        "revenue_target": 595.2,
        "revenue_rate": "104,2%",
        "exp": 480.0,
        "dtc_rate": 76.5,
        "dtc_amount": "474.3 Tỷ",
        "enterprises": 480,
        "land_k": 1.35,
        "center": [
            12.08,
            109.14
        ]
    },
    {
        "stt": 19,
        "id": "KH65_19",
        "code": "X_SD",
        "name": "Xã Suối Dầu",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 490.0,
        "revenue_target": 470.4,
        "revenue_rate": "104,2%",
        "exp": 380.0,
        "dtc_rate": 74.0,
        "dtc_amount": "362.6 Tỷ",
        "enterprises": 390,
        "land_k": 1.25,
        "center": [
            12.15,
            109.06
        ]
    },
    {
        "stt": 20,
        "id": "KH65_20",
        "code": "X_CH",
        "name": "Xã Cam Hiệp",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 220.0,
        "revenue_target": 211.2,
        "revenue_rate": "104,2%",
        "exp": 200.0,
        "dtc_rate": 69.0,
        "dtc_amount": "151.8 Tỷ",
        "enterprises": 160,
        "land_k": 1.15,
        "center": [
            12.06,
            109.08
        ]
    },
    {
        "stt": 21,
        "id": "KH65_21",
        "code": "X_CA",
        "name": "Xã Cam An",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 280.0,
        "revenue_target": 268.8,
        "revenue_rate": "104,2%",
        "exp": 240.0,
        "dtc_rate": 71.0,
        "dtc_amount": "198.8 Tỷ",
        "enterprises": 210,
        "land_k": 1.2,
        "center": [
            11.98,
            109.09
        ]
    },
    {
        "stt": 22,
        "id": "KH65_22",
        "code": "X_BKV",
        "name": "Xã Bắc Khánh Vĩnh",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 140.0,
        "revenue_target": 134.4,
        "revenue_rate": "104,2%",
        "exp": 210.0,
        "dtc_rate": 63.0,
        "dtc_amount": "88.2 Tỷ",
        "enterprises": 80,
        "land_k": 1.05,
        "center": [
            12.35,
            108.92
        ]
    },
    {
        "stt": 23,
        "id": "KH65_23",
        "code": "X_TRKV",
        "name": "Xã Trung Khánh Vĩnh",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 120.0,
        "revenue_target": 115.2,
        "revenue_rate": "104,2%",
        "exp": 190.0,
        "dtc_rate": 60.0,
        "dtc_amount": "72.0 Tỷ",
        "enterprises": 70,
        "land_k": 1.05,
        "center": [
            12.4,
            108.82
        ]
    },
    {
        "stt": 24,
        "id": "KH65_24",
        "code": "X_TYKV",
        "name": "Xã Tây Khánh Vĩnh",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 110.0,
        "revenue_target": 105.6,
        "revenue_rate": "104,2%",
        "exp": 180.0,
        "dtc_rate": 58.0,
        "dtc_amount": "63.8 Tỷ",
        "enterprises": 60,
        "land_k": 1.0,
        "center": [
            12.32,
            108.75
        ]
    },
    {
        "stt": 25,
        "id": "KH65_25",
        "code": "X_NKV",
        "name": "Xã Nam Khánh Vĩnh",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 130.0,
        "revenue_target": 124.8,
        "revenue_rate": "104,2%",
        "exp": 190.0,
        "dtc_rate": 61.0,
        "dtc_amount": "79.3 Tỷ",
        "enterprises": 75,
        "land_k": 1.05,
        "center": [
            12.22,
            108.78
        ]
    },
    {
        "stt": 26,
        "id": "KH65_26",
        "code": "X_KV",
        "name": "Xã Khánh Vĩnh",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 260.0,
        "revenue_target": 249.6,
        "revenue_rate": "104,2%",
        "exp": 280.0,
        "dtc_rate": 67.0,
        "dtc_amount": "174.2 Tỷ",
        "enterprises": 170,
        "land_k": 1.1,
        "center": [
            12.28,
            108.88
        ]
    },
    {
        "stt": 27,
        "id": "KH65_27",
        "code": "X_KS",
        "name": "Xã Khánh Sơn",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 210.0,
        "revenue_target": 201.6,
        "revenue_rate": "104,2%",
        "exp": 240.0,
        "dtc_rate": 64.0,
        "dtc_amount": "134.4 Tỷ",
        "enterprises": 130,
        "land_k": 1.1,
        "center": [
            12.02,
            108.96
        ]
    },
    {
        "stt": 28,
        "id": "KH65_28",
        "code": "X_TYKS",
        "name": "Xã Tây Khánh Sơn",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 120.0,
        "revenue_target": 115.2,
        "revenue_rate": "104,2%",
        "exp": 180.0,
        "dtc_rate": 59.0,
        "dtc_amount": "70.8 Tỷ",
        "enterprises": 65,
        "land_k": 1.0,
        "center": [
            12.06,
            108.86
        ]
    },
    {
        "stt": 29,
        "id": "KH65_29",
        "code": "X_DKS",
        "name": "Xã Đông Khánh Sơn",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 160.0,
        "revenue_target": 153.6,
        "revenue_rate": "104,2%",
        "exp": 190.0,
        "dtc_rate": 62.0,
        "dtc_amount": "99.2 Tỷ",
        "enterprises": 95,
        "land_k": 1.05,
        "center": [
            11.97,
            109.01
        ]
    },
    {
        "stt": 30,
        "id": "KH65_30",
        "code": "X_NP",
        "name": "Xã Ninh Phước",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 380.0,
        "revenue_target": 364.8,
        "revenue_rate": "104,2%",
        "exp": 340.0,
        "dtc_rate": 72.0,
        "dtc_amount": "273.6 Tỷ",
        "enterprises": 310,
        "land_k": 1.2,
        "center": [
            11.51,
            108.89
        ]
    },
    {
        "stt": 31,
        "id": "KH65_31",
        "code": "X_PHUU",
        "name": "Xã Phước Hữu",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 220.0,
        "revenue_target": 211.2,
        "revenue_rate": "104,2%",
        "exp": 230.0,
        "dtc_rate": 68.0,
        "dtc_amount": "149.6 Tỷ",
        "enterprises": 160,
        "land_k": 1.1,
        "center": [
            11.48,
            108.81
        ]
    },
    {
        "stt": 32,
        "id": "KH65_32",
        "code": "X_PHAU",
        "name": "Xã Phước Hậu",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 240.0,
        "revenue_target": 230.4,
        "revenue_rate": "104,2%",
        "exp": 220.0,
        "dtc_rate": 70.0,
        "dtc_amount": "168.0 Tỷ",
        "enterprises": 180,
        "land_k": 1.15,
        "center": [
            11.55,
            108.84
        ]
    },
    {
        "stt": 33,
        "id": "KH65_33",
        "code": "X_TN",
        "name": "Xã Thuận Nam",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 580.0,
        "revenue_target": 556.8,
        "revenue_rate": "104,2%",
        "exp": 450.0,
        "dtc_rate": 82.0,
        "dtc_amount": "475.6 Tỷ",
        "enterprises": 410,
        "land_k": 1.3,
        "center": [
            11.42,
            108.85
        ]
    },
    {
        "stt": 34,
        "id": "KH65_34",
        "code": "X_CNA",
        "name": "Xã Cà Ná",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 890.0,
        "revenue_target": 854.4,
        "revenue_rate": "104,2%",
        "exp": 520.0,
        "dtc_rate": 88.0,
        "dtc_amount": "783.2 Tỷ",
        "enterprises": 520,
        "land_k": 1.4,
        "center": [
            11.33,
            108.87
        ]
    },
    {
        "stt": 35,
        "id": "KH65_35",
        "code": "X_PHA",
        "name": "Xã Phước Hà",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 140.0,
        "revenue_target": 134.4,
        "revenue_rate": "104,2%",
        "exp": 210.0,
        "dtc_rate": 63.0,
        "dtc_amount": "88.2 Tỷ",
        "enterprises": 85,
        "land_k": 1.05,
        "center": [
            11.43,
            108.74
        ]
    },
    {
        "stt": 36,
        "id": "KH65_36",
        "code": "X_PDINH",
        "name": "Xã Phước Dinh",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 340.0,
        "revenue_target": 326.4,
        "revenue_rate": "104,2%",
        "exp": 290.0,
        "dtc_rate": 75.0,
        "dtc_amount": "255.0 Tỷ",
        "enterprises": 230,
        "land_k": 1.2,
        "center": [
            11.46,
            108.99
        ]
    },
    {
        "stt": 37,
        "id": "KH65_37",
        "code": "X_NH",
        "name": "Xã Ninh Hải",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 420.0,
        "revenue_target": 403.2,
        "revenue_rate": "104,2%",
        "exp": 360.0,
        "dtc_rate": 76.0,
        "dtc_amount": "319.2 Tỷ",
        "enterprises": 350,
        "land_k": 1.25,
        "center": [
            11.62,
            109.08
        ]
    },
    {
        "stt": 38,
        "id": "KH65_38",
        "code": "X_XH",
        "name": "Xã Xuân Hải",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 260.0,
        "revenue_target": 249.6,
        "revenue_rate": "104,2%",
        "exp": 230.0,
        "dtc_rate": 71.0,
        "dtc_amount": "184.6 Tỷ",
        "enterprises": 190,
        "land_k": 1.15,
        "center": [
            11.64,
            109.01
        ]
    },
    {
        "stt": 39,
        "id": "KH65_39",
        "code": "X_VHAI",
        "name": "Xã Vĩnh Hải",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 390.0,
        "revenue_target": 374.4,
        "revenue_rate": "104,2%",
        "exp": 310.0,
        "dtc_rate": 77.0,
        "dtc_amount": "300.3 Tỷ",
        "enterprises": 280,
        "land_k": 1.3,
        "center": [
            11.71,
            109.18
        ]
    },
    {
        "stt": 40,
        "id": "KH65_40",
        "code": "X_TBAC",
        "name": "Xã Thuận Bắc",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 650.0,
        "revenue_target": 624.0,
        "revenue_rate": "104,2%",
        "exp": 460.0,
        "dtc_rate": 83.0,
        "dtc_amount": "539.5 Tỷ",
        "enterprises": 410,
        "land_k": 1.3,
        "center": [
            11.75,
            108.98
        ]
    },
    {
        "stt": 41,
        "id": "KH65_41",
        "code": "X_CHAI",
        "name": "Xã Công Hải",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 280.0,
        "revenue_target": 268.8,
        "revenue_rate": "104,2%",
        "exp": 250.0,
        "dtc_rate": 72.0,
        "dtc_amount": "201.6 Tỷ",
        "enterprises": 190,
        "land_k": 1.15,
        "center": [
            11.83,
            109.04
        ]
    },
    {
        "stt": 42,
        "id": "KH65_42",
        "code": "X_NS",
        "name": "Xã Ninh Sơn",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 290.0,
        "revenue_target": 278.4,
        "revenue_rate": "104,2%",
        "exp": 270.0,
        "dtc_rate": 68.0,
        "dtc_amount": "197.2 Tỷ",
        "enterprises": 210,
        "land_k": 1.15,
        "center": [
            11.72,
            108.72
        ]
    },
    {
        "stt": 43,
        "id": "KH65_43",
        "code": "X_LS",
        "name": "Xã Lâm Sơn",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 160.0,
        "revenue_target": 153.6,
        "revenue_rate": "104,2%",
        "exp": 210.0,
        "dtc_rate": 64.0,
        "dtc_amount": "102.4 Tỷ",
        "enterprises": 95,
        "land_k": 1.05,
        "center": [
            11.81,
            108.68
        ]
    },
    {
        "stt": 44,
        "id": "KH65_44",
        "code": "X_AD",
        "name": "Xã Anh Dũng",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 110.0,
        "revenue_target": 105.6,
        "revenue_rate": "104,2%",
        "exp": 180.0,
        "dtc_rate": 60.0,
        "dtc_amount": "66.0 Tỷ",
        "enterprises": 60,
        "land_k": 1.0,
        "center": [
            11.58,
            108.62
        ]
    },
    {
        "stt": 45,
        "id": "KH65_45",
        "code": "X_MS",
        "name": "Xã Mỹ Sơn",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 210.0,
        "revenue_target": 201.6,
        "revenue_rate": "104,2%",
        "exp": 200.0,
        "dtc_rate": 67.0,
        "dtc_amount": "140.7 Tỷ",
        "enterprises": 140,
        "land_k": 1.1,
        "center": [
            11.66,
            108.82
        ]
    },
    {
        "stt": 46,
        "id": "KH65_46",
        "code": "X_BAD",
        "name": "Xã Bác Ái Đông",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 180.0,
        "revenue_target": 172.8,
        "revenue_rate": "104,2%",
        "exp": 220.0,
        "dtc_rate": 66.0,
        "dtc_amount": "118.8 Tỷ",
        "enterprises": 110,
        "land_k": 1.05,
        "center": [
            11.89,
            108.92
        ]
    },
    {
        "stt": 47,
        "id": "KH65_47",
        "code": "X_BA",
        "name": "Xã Bác Ái",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 250.0,
        "revenue_target": 240.0,
        "revenue_rate": "104,2%",
        "exp": 260.0,
        "dtc_rate": 74.0,
        "dtc_amount": "185.0 Tỷ",
        "enterprises": 150,
        "land_k": 1.1,
        "center": [
            11.86,
            108.81
        ]
    },
    {
        "stt": 48,
        "id": "KH65_48",
        "code": "X_BAT",
        "name": "Xã Bác Ái Tây",
        "type": "Xã",
        "category": "Xã cơ sở",
        "revenue": 130.0,
        "revenue_target": 124.8,
        "revenue_rate": "104,2%",
        "exp": 190.0,
        "dtc_rate": 62.0,
        "dtc_amount": "80.6 Tỷ",
        "enterprises": 70,
        "land_k": 1.0,
        "center": [
            11.96,
            108.75
        ]
    },
    {
        "stt": 49,
        "id": "KH65_49",
        "code": "P_NT",
        "name": "Phường Nha Trang",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 3850.0,
        "revenue_target": 3696.0,
        "revenue_rate": "104,2%",
        "exp": 1820.0,
        "dtc_rate": 78.5,
        "dtc_amount": "3022.2 Tỷ",
        "enterprises": 4200,
        "land_k": 1.5,
        "center": [
            12.245,
            109.195
        ]
    },
    {
        "stt": 50,
        "id": "KH65_50",
        "code": "P_BNT",
        "name": "Phường Bắc Nha Trang",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 1950.0,
        "revenue_target": 1872.0,
        "revenue_rate": "104,2%",
        "exp": 1120.0,
        "dtc_rate": 74.0,
        "dtc_amount": "1443.0 Tỷ",
        "enterprises": 2100,
        "land_k": 1.4,
        "center": [
            12.29,
            109.19
        ]
    },
    {
        "stt": 51,
        "id": "KH65_51",
        "code": "P_TNT",
        "name": "Phường Tây Nha Trang",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 1420.0,
        "revenue_target": 1363.2,
        "revenue_rate": "104,2%",
        "exp": 980.0,
        "dtc_rate": 72.0,
        "dtc_amount": "1022.4 Tỷ",
        "enterprises": 1650,
        "land_k": 1.35,
        "center": [
            12.25,
            109.14
        ]
    },
    {
        "stt": 52,
        "id": "KH65_52",
        "code": "P_NNT",
        "name": "Phường Nam Nha Trang",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 1680.0,
        "revenue_target": 1612.8,
        "revenue_rate": "104,2%",
        "exp": 1050.0,
        "dtc_rate": 73.5,
        "dtc_amount": "1234.8 Tỷ",
        "enterprises": 1850,
        "land_k": 1.4,
        "center": [
            12.2,
            109.18
        ]
    },
    {
        "stt": 53,
        "id": "KH65_53",
        "code": "P_BCR",
        "name": "Phường Bắc Cam Ranh",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 720.0,
        "revenue_target": 691.2,
        "revenue_rate": "104,2%",
        "exp": 540.0,
        "dtc_rate": 71.0,
        "dtc_amount": "511.2 Tỷ",
        "enterprises": 620,
        "land_k": 1.25,
        "center": [
            11.99,
            109.14
        ]
    },
    {
        "stt": 54,
        "id": "KH65_54",
        "code": "P_CR",
        "name": "Phường Cam Ranh",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 890.0,
        "revenue_target": 854.4,
        "revenue_rate": "104,2%",
        "exp": 610.0,
        "dtc_rate": 72.5,
        "dtc_amount": "645.2 Tỷ",
        "enterprises": 780,
        "land_k": 1.3,
        "center": [
            11.92,
            109.155
        ]
    },
    {
        "stt": 55,
        "id": "KH65_55",
        "code": "P_CLIN",
        "name": "Phường Cam Linh",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 450.0,
        "revenue_target": 432.0,
        "revenue_rate": "104,2%",
        "exp": 380.0,
        "dtc_rate": 69.0,
        "dtc_amount": "310.5 Tỷ",
        "enterprises": 380,
        "land_k": 1.2,
        "center": [
            11.89,
            109.145
        ]
    },
    {
        "stt": 56,
        "id": "KH65_56",
        "code": "P_BN",
        "name": "Phường Ba Ngòi",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 520.0,
        "revenue_target": 499.2,
        "revenue_rate": "104,2%",
        "exp": 420.0,
        "dtc_rate": 70.0,
        "dtc_amount": "364.0 Tỷ",
        "enterprises": 440,
        "land_k": 1.25,
        "center": [
            11.88,
            109.13
        ]
    },
    {
        "stt": 57,
        "id": "KH65_57",
        "code": "P_NH",
        "name": "Phường Ninh Hòa",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 920.0,
        "revenue_target": 883.2,
        "revenue_rate": "104,2%",
        "exp": 650.0,
        "dtc_rate": 73.0,
        "dtc_amount": "671.6 Tỷ",
        "enterprises": 850,
        "land_k": 1.3,
        "center": [
            12.49,
            109.125
        ]
    },
    {
        "stt": 58,
        "id": "KH65_58",
        "code": "P_DNH",
        "name": "Phường Đông Ninh Hòa",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 680.0,
        "revenue_target": 652.8,
        "revenue_rate": "104,2%",
        "exp": 510.0,
        "dtc_rate": 71.5,
        "dtc_amount": "486.2 Tỷ",
        "enterprises": 590,
        "land_k": 1.25,
        "center": [
            12.48,
            109.2
        ]
    },
    {
        "stt": 59,
        "id": "KH65_59",
        "code": "P_HTH",
        "name": "Phường Hòa Thắng",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 410.0,
        "revenue_target": 393.6,
        "revenue_rate": "104,2%",
        "exp": 360.0,
        "dtc_rate": 68.5,
        "dtc_amount": "280.9 Tỷ",
        "enterprises": 340,
        "land_k": 1.2,
        "center": [
            12.44,
            109.14
        ]
    },
    {
        "stt": 60,
        "id": "KH65_60",
        "code": "P_PR",
        "name": "Phường Phan Rang",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 1650.0,
        "revenue_target": 1584.0,
        "revenue_rate": "104,2%",
        "exp": 1050.0,
        "dtc_rate": 80.0,
        "dtc_amount": "1320.0 Tỷ",
        "enterprises": 1950,
        "land_k": 1.45,
        "center": [
            11.565,
            108.99
        ]
    },
    {
        "stt": 61,
        "id": "KH65_61",
        "code": "P_DH",
        "name": "Phường Đông Hải",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 620.0,
        "revenue_target": 595.2,
        "revenue_rate": "104,2%",
        "exp": 480.0,
        "dtc_rate": 76.0,
        "dtc_amount": "471.2 Tỷ",
        "enterprises": 580,
        "land_k": 1.3,
        "center": [
            11.545,
            109.02
        ]
    },
    {
        "stt": 62,
        "id": "KH65_62",
        "code": "P_NC",
        "name": "Phường Ninh Chữ",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 710.0,
        "revenue_target": 681.6,
        "revenue_rate": "104,2%",
        "exp": 510.0,
        "dtc_rate": 77.5,
        "dtc_amount": "550.2 Tỷ",
        "enterprises": 670,
        "land_k": 1.35,
        "center": [
            11.58,
            109.03
        ]
    },
    {
        "stt": 63,
        "id": "KH65_63",
        "code": "P_BA",
        "name": "Phường Bảo An",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 480.0,
        "revenue_target": 460.8,
        "revenue_rate": "104,2%",
        "exp": 390.0,
        "dtc_rate": 74.0,
        "dtc_amount": "355.2 Tỷ",
        "enterprises": 420,
        "land_k": 1.25,
        "center": [
            11.575,
            108.955
        ]
    },
    {
        "stt": 64,
        "id": "KH65_64",
        "code": "P_DV",
        "name": "Phường Đô Vinh",
        "type": "Phường",
        "category": "Phường đô thị",
        "revenue": 520.0,
        "revenue_target": 499.2,
        "revenue_rate": "104,2%",
        "exp": 410.0,
        "dtc_rate": 75.0,
        "dtc_amount": "390.0 Tỷ",
        "enterprises": 460,
        "land_k": 1.25,
        "center": [
            11.6,
            108.97
        ]
    },
    {
        "stt": 65,
        "id": "KH65_65",
        "code": "DK_TS",
        "name": "Đặc khu Trường Sa",
        "type": "Đặc khu",
        "category": "Đặc khu biển đảo",
        "revenue": 380.0,
        "revenue_target": 364.8,
        "revenue_rate": "104,2%",
        "exp": 480.0,
        "dtc_rate": 82.0,
        "dtc_amount": "311.6 Tỷ",
        "enterprises": 120,
        "land_k": 1.1,
        "center": [
            10.5,
            114.8
        ]
    }
],

  // 3. Doanh nghiệp nộp thuế & nhà đầu tư trọng điểm tỉnh Khánh Hòa
  keyEnterprises: [
    { mst: "4200238910", name: "Tổng công ty Khánh Việt (KHATOCO)", revenue_contribution: 3620.5, sector: "Sản xuất thuốc lá & công nghiệp tiêu dùng", progress_pct: 104.2, status: "Đạt vượt kế hoạch" },
    { mst: "4200429779", name: "Công ty Yến Sào Khánh Hòa", revenue_contribution: 2180.0, sector: "Chế biến yến sào & dịch vụ du lịch", progress_pct: 101.8, status: "Đạt kế hoạch" },
    { mst: "4500336688", name: "Tập đoàn Năng lượng Trung Nam (Thuận Bắc - Thuận Nam)", revenue_contribution: 1850.0, sector: "Năng lượng tái tạo & hạ tầng cảng Cà Ná", progress_pct: 106.5, status: "Đạt vượt kế hoạch" },
    { mst: "4200789012", name: "Công ty Bia Sài Gòn - Nam Trung Bộ", revenue_contribution: 1450.0, sector: "Đồ uống & thực phẩm", progress_pct: 98.5, status: "Đang theo dõi" },
    { mst: "4500123456", name: "Công ty CP Cảng Quốc tế Cà Ná (Thuận Nam)", revenue_contribution: 920.0, sector: "Logistics, cảng biển nước sâu & kho bãi", progress_pct: 103.4, status: "Đạt kế hoạch" },
    { mst: "4201123456", name: "Công ty CP Điện lực Khánh Hòa (PC Khánh Hòa)", revenue_contribution: 720.0, sector: "Năng lượng & truyền tải điện", progress_pct: 102.0, status: "Đạt kế hoạch" },
    { mst: "4200987654", name: "Công ty CP Thủy sản Nha Trang", revenue_contribution: 510.4, sector: "Chế biến thủy sản xuất khẩu", progress_pct: 96.2, status: "Đang theo dõi" },
    { mst: "4201345678", name: "Công ty CP Cảng Cam Ranh", revenue_contribution: 380.0, sector: "Logistics và cảng biển", progress_pct: 105.1, status: "Đạt vượt kế hoạch" }
  ],

  // 4. Danh mục 12 API tích hợp từ Bộ Tài chính & CSDL Quốc gia (CV 4760 / QĐ 1323 / Đặc tả IOC v1.0)
  btcApis: [
    {
      code: "00210101",
      name: "Dữ liệu Thu Ngân sách Nhà nước (Tổng cục Thuế)",
      category: "Quản lý NSNN & Thuế",
      provider: "Tổng cục Thuế - Bộ Tài chính",
      endpoint: "https://api-csdltc.mof.gov.vn/ioc-data-exchange/api/v1/shared/nsnn_thu",
      method: "POST",
      authType: "mTLS + OAuth 2.0 (Bearer)",
      targetTable: "FT.FACT_THU_NGAN_SACH_THUE",
      cronSchedule: "0 4 * * * (04:00 Hằng ngày)",
      frequency: "Hằng ngày (Sysdate-1)",
      timeoutMs: 5000,
      enabled: true,
      status: "HEALTHY",
      latency: "42ms",
      lastSync: "2026-08-20 04:30:15",
      recordsSynced: 1240,
      description: "Đồng bộ số thu thuế, thu nội địa, thu xuất nhập khẩu phân bổ theo từng địa bàn xã, phường và nội dung kinh tế.",
      fieldMappings: [
        { source: "DT", target: "NGAY_THU", type: "DATE", desc: "Ngày hạch toán thu thuế" },
        { source: "MA_DB", target: "MA_DIA_BAN", type: "VARCHAR(20)", desc: "Mã địa bàn hành chính (Tỉnh, Xã/Phường/Đặc khu)" },
        { source: "MA_CNS", target: "MA_CAP_NS", type: "VARCHAR(10)", desc: "Mã cấp ngân sách (1: Cấp Tỉnh, 2: Cấp Xã/Phường/Đặc khu)" },
        { source: "ICODE", target: "MA_TIEU_MUC", type: "VARCHAR(20)", desc: "Mã tiểu mục thu theo Mục lục NSNN" },
        { source: "VAL", target: "SO_TIEN", type: "DECIMAL(18,2)", desc: "Số tiền thu thực tế (VNĐ)" }
      ]
    },
    {
      code: "KB-M04",
      name: "Bảng kê chứng từ nộp NSNN Mẫu 04/BKCTNNS (KBNN)",
      category: "Kho bạc Nhà nước",
      provider: "Kho bạc Nhà nước Khu vực XIV (Khánh Hòa)",
      endpoint: "https://kbnn.gov.vn/api/v1/so-tai-chinh/chung-tu-thu",
      method: "REST/mTLS",
      authType: "mTLS Certificate + SHA-256",
      targetTable: "FT.FACT_GIAO_DICH_KHO_BAC_CHI_TIET",
      cronSchedule: "*/15 * * * * (Mỗi 15 phút)",
      frequency: "Hằng ngày (Real-time)",
      timeoutMs: 3000,
      enabled: true,
      status: "HEALTHY",
      latency: "28ms",
      lastSync: "2026-08-20 06:15:22",
      recordsSynced: 2450,
      description: "Chi tiết từng dòng chứng từ nộp NSNN hạch toán tài khoản 7111, 7113 tại KBNN Khu vực XIV (Khánh Hòa).",
      fieldMappings: [
        { source: "SO_CT", target: "SO_CHUNG_TU", type: "VARCHAR(50)", desc: "Số hiệu chứng từ KBNN" },
        { source: "NGAY_CT", target: "NGAY_CHUNG_TU", type: "DATE", desc: "Ngày ký chứng từ" },
        { source: "MST", target: "MA_SO_THUE", type: "VARCHAR(20)", desc: "Mã số thuế người nộp" },
        { source: "TK_THU", target: "SO_TAI_KHOAN_THU", type: "VARCHAR(20)", desc: "Tài khoản thu 7111 / 7113" },
        { source: "SO_TIEN", target: "SO_TIEN_NOP", type: "DECIMAL(18,2)", desc: "Số tiền nộp ngân sách" }
      ]
    },
    {
      code: "00210201",
      name: "Tình hình thực hiện Chi NSNN (Kho bạc & TABMIS)",
      category: "Quản lý NSNN & Thuế",
      provider: "Cục KHTC & Kho bạc Nhà nước - Bộ Tài chính",
      endpoint: "https://api-csdltc.mof.gov.vn/ioc-data-exchange/api/v1/shared/nsnn_chi",
      method: "POST",
      authType: "OAuth 2.0 (Bearer Token)",
      targetTable: "FT.FACT_CHI_NGAN_SACH_KHO_BAC",
      cronSchedule: "0 5 * * * (05:00 Hằng ngày)",
      frequency: "Hằng ngày (Sysdate-1)",
      timeoutMs: 5000,
      enabled: true,
      status: "HEALTHY",
      latency: "55ms",
      lastSync: "2026-08-20 04:30:28",
      recordsSynced: 980,
      description: "Đồng bộ cơ cấu chi thường xuyên, chi đầu tư phát triển theo từng cấp ngân sách và đơn vị thụ hưởng.",
      fieldMappings: [
        { source: "MA_DV", target: "MA_DVQHNS", type: "VARCHAR(20)", desc: "Mã đơn vị quan hệ ngân sách" },
        { source: "MA_CAP_NS", target: "CAP_NGAN_SACH", type: "VARCHAR(10)", desc: "Cấp ngân sách chi" },
        { source: "LOAI_CHI", target: "LOAI_CHI_PHI", type: "VARCHAR(50)", desc: "Chi thường xuyên / Chi ĐTPT" },
        { source: "SO_TIEN_CHI", target: "GIA_TRI_CHI", type: "DECIMAL(18,2)", desc: "Số tiền thực chi KBNN" }
      ]
    },
    {
      code: "0040201",
      name: "Giải ngân vốn Đầu tư công (KBNN & TABMIS)",
      category: "Đầu tư công",
      provider: "Vụ Đầu tư & KBNN - Bộ Tài chính",
      endpoint: "https://api-csdltc.mof.gov.vn/ioc-data-exchange/api/v1/shared/dtc_giaingan_tuan",
      method: "POST",
      authType: "OAuth 2.0 + HMAC-SHA256",
      targetTable: "FT.FACT_GIAI_NGAN_DAU_TU_CONG",
      cronSchedule: "0 20 * * 5 (20:00 Thứ 6 hằng tuần)",
      frequency: "Hằng tuần / Hằng tháng",
      timeoutMs: 6000,
      enabled: true,
      status: "HEALTHY",
      latency: "38ms",
      lastSync: "2026-08-18 20:00:00",
      recordsSynced: 450,
      description: "Đồng bộ tiến độ giải ngân vốn đầu tư công, số dư tạm ứng chưa thu hồi theo từng dự án và chủ đầu tư.",
      fieldMappings: [
        { source: "MA_DU_AN", target: "MA_DU_AN", type: "VARCHAR(50)", desc: "Mã định danh dự án ĐTC" },
        { source: "KE_HOACH_VON", target: "VON_KE_HOACH_NAM", type: "DECIMAL(18,2)", desc: "Kế hoạch vốn được giao" },
        { source: "GIAI_NGAN_LK", target: "GIAI_NGAN_LUY_KE", type: "DECIMAL(18,2)", desc: "Lũy kế giải ngân thực tế" },
        { source: "DU_TAM_UNG", target: "SO_DU_TAM_UNG", type: "DECIMAL(18,2)", desc: "Số dư tạm ứng chưa thu hồi" }
      ]
    },
    {
      code: "007003",
      name: "Tổng trị giá hàng hóa Xuất Nhập Khẩu (Tổng cục Hải quan)",
      category: "Hải quan & Ngoại thương",
      provider: "Cục Hải quan tỉnh Khánh Hòa / Tổng cục Hải quan",
      endpoint: "https://api-csdltc.mof.gov.vn/api_csdlth/shared/hhxnk",
      method: "POST",
      authType: "API Key + IP Whitelist",
      targetTable: "FT.FACT_TRIGIAXNK",
      cronSchedule: "0 23 * * * (23:00 Hằng ngày)",
      frequency: "Hằng ngày / Hằng tháng",
      timeoutMs: 5000,
      enabled: true,
      status: "HEALTHY",
      latency: "61ms",
      lastSync: "2026-08-19 23:15:00",
      recordsSynced: 310,
      description: "Đồng bộ kim ngạch xuất khẩu, nhập khẩu theo nhóm mặt hàng chủ lực (thủy sản, dệt may, thiết bị công nghiệp).",
      fieldMappings: [
        { source: "MA_NHOM_HANG", target: "MA_HANG_HOA", type: "VARCHAR(50)", desc: "Mã nhóm hàng hóa XNK" },
        { source: "LOAI_HINH", target: "LOAI_HINH_XNK", type: "VARCHAR(20)", desc: "XUAT_KHAU / NHAP_KHAU" },
        { source: "TRI_GIA_USD", target: "KIM_NGOACH_USD", type: "DECIMAL(18,2)", desc: "Trị giá kim ngạch (USD)" }
      ]
    },
    {
      code: "0080101-08",
      name: "Dữ liệu Đăng ký & Phát triển Doanh nghiệp (Bộ KH&ĐT)",
      category: "Doanh nghiệp & Đầu tư",
      provider: "Cục Quản lý Đăng ký Kinh doanh - Bộ KH&ĐT",
      endpoint: "https://api-csdltc.mof.gov.vn/ioc-data-exchange/api/v1/shared/doanhnghiep",
      method: "POST",
      authType: "OAuth 2.0 (Bearer)",
      targetTable: "MD.DOANH_NGHIEP_DKKD",
      cronSchedule: "0 1 1 * * (01:00 Ngày đầu tháng)",
      frequency: "Hằng tháng",
      timeoutMs: 10000,
      enabled: true,
      status: "HEALTHY",
      latency: "48ms",
      lastSync: "2026-08-01 08:00:00",
      recordsSynced: 14890,
      description: "Đồng bộ số lượng doanh nghiệp đang hoạt động, thành lập mới, giải thể, vốn đăng ký và lao động.",
      fieldMappings: [
        { source: "MST", target: "MA_SO_THUE", type: "VARCHAR(20)", desc: "Mã số thuế doanh nghiệp" },
        { source: "TEN_DN", target: "TEN_DOANH_NGHIEP", type: "NVARCHAR(500)", desc: "Tên doanh nghiệp" },
        { source: "VON_DIEU_LE", target: "VON_DIEU_LE", type: "DECIMAL(18,2)", desc: "Vốn điều lệ đăng ký" },
        { source: "TRANG_THAI", target: "TRANG_THAI_HOAT_DONG", type: "VARCHAR(50)", desc: "Đang hoạt động / Tạm ngừng" }
      ]
    },
    {
      code: "01001-05",
      name: "CSDL Quản lý Tài sản công Toàn quốc (Cục QL Công sản)",
      category: "Tài sản công & Giá",
      provider: "Cục Quản lý Công sản - Bộ Tài chính",
      endpoint: "https://api-csdltc.mof.gov.vn/ioc-data-exchange/api/v1/shared/taisancong",
      method: "POST",
      authType: "OAuth 2.0 (Bearer)",
      targetTable: "MD.TAI_SAN_CONG_DIA_PHUONG",
      cronSchedule: "0 2 1 * * (02:00 Ngày đầu tháng)",
      frequency: "Hằng tháng / Hằng quý",
      timeoutMs: 8000,
      enabled: true,
      status: "HEALTHY",
      latency: "52ms",
      lastSync: "2026-08-15 10:00:00",
      recordsSynced: 3820,
      description: "Đồng bộ danh mục tài sản công, trụ sở làm việc, xe ô tô công vụ và giá trị còn lại của các cơ quan HCSN.",
      fieldMappings: [
        { source: "MA_TS", target: "MA_TAI_SAN", type: "VARCHAR(50)", desc: "Mã tài sản công chuẩn hóa" },
        { source: "TEN_TS", target: "TEN_TAI_SAN", type: "NVARCHAR(500)", desc: "Tên tài sản công" },
        { source: "NGUYEN_GIA", target: "NGUYEN_GIA_SO_SACH", type: "DECIMAL(18,2)", desc: "Nguyên giá theo sổ sách" }
      ]
    },
    {
      code: "01201-04",
      name: "CSDL Giá & Thẩm định giá (Cục Quản lý Giá)",
      category: "Tài sản công & Giá",
      provider: "Cục Quản lý Giá - Bộ Tài chính",
      endpoint: "https://api-csdltc.mof.gov.vn/ioc-data-exchange/api/v1/shared/csdl_gia",
      method: "POST",
      authType: "API Key + Token",
      targetTable: "FT.FACT_GIA_THI_TRUONG",
      cronSchedule: "0 3 1 * * (03:00 Ngày đầu tháng)",
      frequency: "Hằng tháng",
      timeoutMs: 5000,
      enabled: true,
      status: "HEALTHY",
      latency: "45ms",
      lastSync: "2026-08-15 11:30:00",
      recordsSynced: 640,
      description: "Đồng bộ khung bảng giá đất tỉnh, diễn biến giá thị trường hàng hóa thiết yếu và giá vật liệu xây dựng.",
      fieldMappings: [
        { source: "MA_HANG", target: "MA_HANG_HOA", type: "VARCHAR(50)", desc: "Mã hàng hóa/vật liệu" },
        { source: "GIA_BINH_QUAN", target: "MUC_GIA_KHAO_SAT", type: "DECIMAL(18,2)", desc: "Mức giá thị trường" }
      ]
    },
    {
      code: "01501-TDG",
      name: "Danh bạ Thẩm định viên về giá đủ điều kiện (Cục QL Giá)",
      category: "Tài sản công & Giá",
      provider: "Cục Quản lý Giá - Bộ Tài chính",
      endpoint: "https://api-csdltc.mof.gov.vn/api/v1/thamdinhvien_gia_danhmuc",
      method: "GET",
      authType: "API Key (Chờ cấp phép)",
      targetTable: "MD.CHUNG_CHI_HANH_NGHE_DAU_THAU_TDG",
      cronSchedule: "Định kỳ khi phát sinh",
      frequency: "Định kỳ khi phát sinh",
      timeoutMs: 5000,
      enabled: false,
      status: "PENDING_CONN",
      latency: "Chờ kết nối",
      lastSync: "Đang gửi công văn",
      recordsSynced: 185,
      description: "Tra cứu danh sách cá nhân có Thẻ Thẩm định viên về giá và doanh nghiệp đủ điều kiện hành nghề thẩm định giá.",
      fieldMappings: [
        { source: "SO_THE", target: "MA_CHUNG_CHI", type: "VARCHAR(50)", desc: "Số thẻ Thẩm định viên về giá" },
        { source: "HO_TEN", target: "HO_VA_TEN", type: "NVARCHAR(255)", desc: "Họ và tên thẩm định viên" },
        { source: "DON_VI_HANH_NGHE", target: "DON_VI_CONG_TAC", type: "NVARCHAR(500)", desc: "Doanh nghiệp thẩm định giá" }
      ]
    },
    {
      code: "01801-ĐTQG",
      name: "Dữ liệu Hệ thống Mạng Đấu thầu Quốc gia (Bộ KH&ĐT)",
      category: "Đầu tư công",
      provider: "Cục Quản lý Đấu thầu - Bộ KH&ĐT",
      endpoint: "https://muasamcong.mpi.gov.vn/api/v1/shared/dauthau_khanhhoa",
      method: "POST",
      authType: "OAuth 2.0 (Chờ cấp phép)",
      targetTable: "MD.CHUNG_CHI_HANH_NGHE_DAU_THAU_TDG",
      cronSchedule: "0 6 * * 1 (06:00 Thứ 2 hằng tuần)",
      frequency: "Hằng tuần",
      timeoutMs: 5000,
      enabled: false,
      status: "PENDING_CONN",
      latency: "Chờ kết nối",
      lastSync: "Đang gửi công văn",
      recordsSynced: 412,
      description: "Đồng bộ thông tin chứng chỉ hành nghề đấu thầu, kết quả lựa chọn nhà thầu và tỷ lệ tiết kiệm qua đấu thầu qua mạng.",
      fieldMappings: [
        { source: "SO_CHUNG_CHI", target: "MA_CHUNG_CHI", type: "VARCHAR(50)", desc: "Số chứng chỉ hành nghề đấu thầu" },
        { source: "HO_TEN", target: "HO_VA_TEN", type: "NVARCHAR(255)", desc: "Họ và tên chuyên gia đấu thầu" }
      ]
    },
    {
      code: "QHNS-01",
      name: "Mã số Đơn vị Quan hệ Ngân sách (ĐVQHNS)",
      category: "Dữ liệu chủ",
      provider: "Cục Kế hoạch Tài chính - Bộ Tài chính",
      endpoint: "https://qhns.btc/api/v2/master-data/dvsdns",
      method: "SOAP/XML",
      authType: "WS-Security / X.509 Certificate",
      targetTable: "MD.DON_VI_QUAN_HE_NGAN_SACH",
      cronSchedule: "0 1 * * * (01:00 Hằng ngày)",
      frequency: "Định kỳ khi phát sinh",
      timeoutMs: 4000,
      enabled: true,
      status: "HEALTHY",
      latency: "44ms",
      lastSync: "2026-08-19 14:20:00",
      recordsSynced: 1280,
      description: "Đồng bộ mã 7 ký tự chuẩn quốc gia cho tất cả các cơ quan, đơn vị dự toán, trường học, bệnh viện trên toàn tỉnh.",
      fieldMappings: [
        { source: "MA_DVSDNS", target: "MA_DVQHNS", type: "VARCHAR(20)", desc: "Mã 7 ký tự chuẩn Bộ Tài chính" },
        { source: "TEN_DV", target: "TEN_DON_VI", type: "NVARCHAR(500)", desc: "Tên đầy đủ của đơn vị QHNS" }
      ]
    },
    {
      code: "GIS-KH-01",
      name: "Cổng Thông tin GIS & Bản đồ Quy hoạch tỉnh Khánh Hòa",
      category: "Quy hoạch & Bản đồ",
      provider: "Sở Xây dựng / Sở TN&MT tỉnh Khánh Hòa",
      endpoint: "https://gis.khanhhoa.gov.vn/api/v1/spatial/quyhoach_tinh",
      method: "WMS/REST",
      authType: "OAuth 2.0 (LGSP Khánh Hòa)",
      targetTable: "MD.HO_SO_QUY_HOACH_TINH",
      cronSchedule: "Khi có phê duyệt quy hoạch mới",
      frequency: "Khi có điều chỉnh",
      timeoutMs: 12000,
      enabled: true,
      status: "HEALTHY",
      latency: "68ms",
      lastSync: "2026-08-10 16:00:00",
      recordsSynced: 85,
      description: "Chia sẻ lớp dữ liệu không gian, ranh giới đồ án quy hoạch tỉnh theo QĐ 318/QĐ-TTg và quy hoạch sử dụng đất cấp cơ sở (65 xã, phường, đặc khu).",
      fieldMappings: [
        { source: "MA_QH", target: "MA_QUY_HOACH", type: "VARCHAR(50)", desc: "Mã đồ án quy hoạch" },
        { source: "TEN_DO_AN", target: "TEN_QUY_HOACH", type: "NVARCHAR(500)", desc: "Tên quy hoạch tỉnh/đô thị" },
        { source: "SO_QD", target: "SO_QD_PHE_DUYET", type: "NVARCHAR(100)", desc: "Số quyết định phê duyệt (QĐ 318...)" }
      ]
    },
    {
      code: "0080301-HKD",
      name: "Dữ liệu Đăng ký Hộ Kinh doanh cá thể (Bộ KH&ĐT & Tổng cục Thuế)",
      category: "Doanh nghiệp & Đầu tư",
      provider: "Cục QL Đăng ký Kinh doanh (Bộ KH&ĐT) & Cục Thuế tỉnh",
      endpoint: "https://api-csdltc.mof.gov.vn/ioc-data-exchange/api/v1/shared/hokinhdoanh",
      method: "POST",
      authType: "OAuth 2.0 (Bearer Token)",
      targetTable: "MD.HO_KINH_DOANH_CA_THE",
      cronSchedule: "0 2 1 * * (02:00 Ngày đầu tháng)",
      frequency: "Hằng tháng",
      timeoutMs: 8000,
      enabled: true,
      status: "HEALTHY",
      latency: "46ms",
      lastSync: "2026-08-01 08:30:00",
      recordsSynced: 42350,
      description: "Đồng bộ số lượng hộ kinh doanh cá thể, ngành nghề kinh doanh, địa bàn phường/xã, vốn kinh doanh và trạng thái nộp thuế khoán.",
      fieldMappings: [
        { source: "MA_HKD", target: "MA_HO_KINH_DOANH", type: "VARCHAR(30)", desc: "Mã định danh hộ kinh doanh (Mã số thuế 10-13 số)" },
        { source: "TEN_HKD", target: "TEN_HO_KINH_DOANH", type: "NVARCHAR(300)", desc: "Tên cơ sở kinh doanh" },
        { source: "CHU_HO", target: "HO_TEN_CHU_HO", type: "NVARCHAR(255)", desc: "Họ và tên chủ hộ kinh doanh (DDM Masked)" },
        { source: "DIA_CHI", target: "DIA_CHI_KINH_DOANH", type: "NVARCHAR(500)", desc: "Địa chỉ trụ sở kinh doanh tại xã/phường" }
      ]
    },
    {
      code: "0080201-HTX",
      name: "Dữ liệu Đăng ký & Báo cáo Hợp tác xã (Bộ KH&ĐT - Luật HTX 2023)",
      category: "Doanh nghiệp & Đầu tư",
      provider: "Cục Quản lý Đăng ký Kinh doanh & Cục Kinh tế Hợp tác (Bộ KH&ĐT)",
      endpoint: "https://api-csdltc.mof.gov.vn/ioc-data-exchange/api/v1/shared/hoptacxa",
      method: "POST",
      authType: "OAuth 2.0 (Bearer Token)",
      targetTable: "MD.HOP_TAC_XA_LIEN_HIEP_HTX",
      cronSchedule: "0 3 1 * * (03:00 Ngày đầu tháng)",
      frequency: "Hằng tháng / Hằng quý",
      timeoutMs: 8000,
      enabled: true,
      status: "HEALTHY",
      latency: "41ms",
      lastSync: "2026-08-01 08:45:00",
      recordsSynced: 385,
      description: "Đồng bộ danh bạ Hợp tác xã, Liên hiệp Hợp tác xã, số lượng thành viên, vốn điều lệ và tình hình tài chính theo Luật HTX 2023.",
      fieldMappings: [
        { source: "MST_HTX", target: "MA_SO_THUE", type: "VARCHAR(20)", desc: "Mã số thuế Hợp tác xã" },
        { source: "TEN_HTX", target: "TEN_HOP_TAC_XA", type: "NVARCHAR(500)", desc: "Tên Hợp tác xã / Liên hiệp HTX" },
        { source: "SO_THANH_VIEN", target: "SO_LUONG_THANH_VIEN", type: "INT", desc: "Số lượng thành viên tham gia" }
      ]
    },
    {
      code: "01901-QHQG",
      name: "CSDL Quốc gia về Quy hoạch & Bản đồ Quy hoạch tỉnh (Bộ KH&ĐT)",
      category: "Quy hoạch & Bản đồ",
      provider: "Bộ Kế hoạch và Đầu tư (Hệ thống CSDL Quy hoạch Quốc gia)",
      endpoint: "https://quyhoachquocgia.mpi.gov.vn/api/v1/open/quyhoach_tinh_khanhhoa",
      method: "GET / WMS",
      authType: "REST API Key + Open Data Hub",
      targetTable: "MD.HO_SO_QUY_HOACH_TINH",
      cronSchedule: "Định kỳ khi có điều chỉnh quy hoạch",
      frequency: "Khi phát sinh điều chỉnh",
      timeoutMs: 15000,
      enabled: true,
      status: "HEALTHY",
      latency: "52ms",
      lastSync: "2026-08-15 09:00:00",
      recordsSynced: 120,
      description: "Khai thác hồ sơ Quy hoạch tỉnh Khánh Hòa thời kỳ 2021-2030 (QĐ 318/QĐ-TTg), danh mục dự án trọng điểm và lớp bản đồ quy hoạch số hóa.",
      fieldMappings: [
        { source: "PLAN_ID", target: "MA_QUY_HOACH", type: "VARCHAR(50)", desc: "Mã định danh quy hoạch quốc gia" },
        { source: "TITLE", target: "TEN_QUY_HOACH", type: "NVARCHAR(500)", desc: "Tên quy hoạch tỉnh được phê duyệt" },
        { source: "DOC_DECISION", target: "SO_QD_PHE_DUYET", type: "NVARCHAR(100)", desc: "Số Quyết định 318/QĐ-TTg của Thủ tướng CP" }
      ]
    }
  ],

  // 5. Hồ sơ Khảo sát & Nhập liệu Chờ duyệt (Dữ liệu 7 Phòng chuyên môn)
  pendingSubmissions: [
    {
      id: "SUB-2026-089",
      dept: "Phòng Quản lý Đầu tư ngoài ngân sách",
      title: "Hồ sơ Chấp thuận chủ trương đầu tư Khu đô thị sinh thái Bắc Cam Ranh",
      type: "Dự án ngoài ngân sách",
      submittedBy: "Nguyễn Văn Tuấn (Chuyên viên)",
      submittedDate: "2026-08-19 15:40",
      status: "PENDING",
      data: {
        ten_du_an: "Khu đô thị sinh thái Bắc Cam Ranh",
        so_qd_chu_truong: "1289/QĐ-UBND",
        ngay_qd: "2026-08-15",
        nha_dau_tu: "Tập đoàn Phát triển Đô thị Khánh Hòa",
        mst: "4201889922",
        dia_ban: "Phường Cam Ranh",
        tong_von: "4.850.000.000.000 VND",
        von_usd: "194.000.000 USD",
        dien_tich: "125.4 ha",
        tien_do: "2026 - 2029"
      }
    },
    {
      id: "SUB-2026-090",
      dept: "Phòng Pháp chế",
      title: "Kết luận thanh tra tài chính tại Ban Quản lý dự án Giao thông Nông thôn",
      type: "Thanh tra & Xử phạt",
      submittedBy: "Trần Thị Mai (Chuyên viên)",
      submittedDate: "2026-08-20 08:15",
      status: "PENDING",
      data: {
        ten_cuoc_tt: "Thanh tra công tác quản lý tài chính, đầu tư xây dựng năm 2025",
        so_kltt: "45/KL-STC",
        ngay_kltt: "2026-08-18",
        doi_tuong: "Ban Quản lý dự án Giao thông Nông thôn Khánh Hòa",
        tong_sai_pham: "1.250.000.000 VND",
        kien_nghi_thu_ns: "850.000.000 VND",
        giam_tru_qtoan: "400.000.000 VND",
        tien_do: "Đang đôn đốc nộp NSNN"
      }
    },
    {
      id: "SUB-2026-091",
      dept: "Phòng Quản lý Giá và Công sản",
      title: "Phương án điều chỉnh Bảng giá đất định kỳ 5 năm đoạn Quốc lộ 1A qua Diên Khánh",
      type: "Giá & Công sản",
      submittedBy: "Lê Hoàng Phúc (Chuyên viên)",
      submittedDate: "2026-08-20 09:30",
      status: "PENDING",
      data: {
        loai_tai_lieu: "Bảng giá đất & Hệ số K",
        dia_ban: "Khu vực Diên Khánh",
        muc_dieu_chinh: "Tăng 12% so với năm 2025",
        can_cu: "Luật Đất đai 2024 & Luật Giá 2023",
        he_so_k_de_xuat: "1.25",
        ngay_ap_dung: "2026-09-01"
      }
    },
    {
      id: "SUB-2026-092",
      dept: "Phòng Tài chính Hành chính Sự nghiệp",
      title: "Phương án tự chủ tài chính giai đoạn 2026-2030 Bệnh viện Đa khoa Khu vực Cam Ranh",
      type: "Tự chủ HCSN (Nghị định số 60)",
      submittedBy: "Hoàng Minh Tâm (Chuyên viên)",
      submittedDate: "2026-08-18 16:20",
      status: "APPROVED",
      approvedBy: "Lãnh đạo Sở Tài chính",
      approvedDate: "2026-08-19 10:00",
      data: {
        ten_don_vi: "Bệnh viện Đa khoa Khu vực Cam Ranh",
        ma_dvsdns: "1048821",
        nhom_tu_chu: "Nhóm 2 (Tự bảo đảm chi thường xuyên)",
        ty_le_tu_bao_dam: "100%",
        so_bien_che: "420 người",
        nguon_thu_su_nghiep: "85.000.000.000 VND/năm"
      }
    }
  ],

  // 6. Kho Hồ sơ Số hóa Lịch sử (1.057.980 trang A4 / 137,4 mét) có phân quyền & dữ liệu bóc tách
  digitalArchive: [
    {
      docId: "DOC-DTNS-00184",
      dept: "Phòng Quản lý Đầu tư ngoài ngân sách",
      deptCode: "dtns",
      boxNumber: "Hộp số 42",
      shelfLocation: "Giá 03 - Kệ B2",
      title: "Hồ sơ Chấp thuận chủ trương đầu tư & GCN ĐKĐT Dự án Tổ hợp Du lịch Vinpearl Hòn Tre",
      regNumber: "512/QĐ-UBND",
      issueDate: "2018-04-12",
      totalPages: 384,
      fileSize: "48.2 MB",
      format: "PDF/A-2b (Searchable OCR)",
      investor: "Công ty Cổ phần Vinpearl",
      retentionPeriod: "Vĩnh viễn",
      securityLevel: "CONFIDENTIAL",
      securityLabel: "Mật (Chỉ Lãnh đạo & Phòng ĐT Ngoài NS)",
      allowedRoles: ["lanhdao", "admin", "dtns"],
      mappedRecord: "MD.DU_AN_DAU_TU_NGOAI_NGAN_SACH (ID: DA-NNS-79-001)",
      extractedData: {
        "Mã dự án đầu tư": "DA-NNS-79-001",
        "Tên dự án": "Tổ hợp Du lịch, Nghỉ dưỡng & Vui chơi Giải trí Vinpearl Hòn Tre",
        "Nhà đầu tư": "Công ty Cổ phần Vinpearl (MST: 4200456848)",
        "Tổng mức đầu tư": "18.500.000.000.000 VND (780 triệu USD)",
        "Diện tích đất & mặt nước": "622,5 ha (Toàn bộ đảo Hòn Tre)",
        "Địa điểm thực hiện": "Đảo Hòn Tre, Phường Nha Trang",
        "Tiến độ hoàn thành": "Đã hoàn thành các phân khu 1, 2, 3 và đưa vào khai thác",
        "Ưu đãi theo NQ 55/2022/QH15": "Thuế suất TNDN 10% trong 15 năm, miễn 4 năm giảm 50% 9 năm tiếp theo",
        "Số giấy chứng nhận IRC": "GCN ĐKĐT số 8923487192 do Sở Tài chính cấp",
        "Trạng thái bóc tách OCR": "Đã đối soát 100% với CSDL Quốc gia về Đầu tư (Bộ KH&ĐT)"
      }
    },
    {
      docId: "DOC-DTC-00421",
      dept: "Phòng Quản lý Đầu tư công",
      deptCode: "dtc",
      boxNumber: "Hộp số 18",
      shelfLocation: "Giá 01 - Kệ A4",
      title: "Hồ sơ Thẩm định & Phê duyệt Quyết toán Dự án Tuyến đường Vành đai 2 Nha Trang",
      regNumber: "1420/QĐ-UBND",
      issueDate: "2021-11-20",
      totalPages: 512,
      fileSize: "64.5 MB",
      format: "PDF/A-2b",
      investor: "Ban QLDA Đầu tư Xây dựng các Công trình Giao thông tỉnh Khánh Hòa",
      retentionPeriod: "70 năm",
      securityLevel: "INTERNAL",
      securityLabel: "Nội bộ Sở Tài chính",
      allowedRoles: ["lanhdao", "admin", "dtc"],
      mappedRecord: "MD.DU_AN_DAU_TU_CONG (ID: DA-DTC-79-012)",
      extractedData: {
        "Mã dự án ĐTC": "DA-DTC-79-012",
        "Tên công trình": "Đường Vành đai 2 Nha Trang (kết nối Nút giao thông Ngọc Hội)",
        "Chủ đầu tư": "Ban QLDA ĐTXD các Công trình Giao thông tỉnh Khánh Hòa",
        "Tổng mức đầu tư duyệt": "1.480.000.000.000 VND",
        "Nguồn vốn bố trí": "Ngân sách tỉnh Khánh Hòa (Kế hoạch ĐTC trung hạn 2021-2025)",
        "Giá trị giải ngân thực tế": "1.425.800.000.000 VND (Đạt 96.3% qua TABMIS KBNN)",
        "Giá trị quyết toán phê duyệt": "1.418.650.000.000 VND",
        "Giá trị giảm trừ quyết toán": "7.150.000.000 VND (Tiết kiệm nộp trả NS)",
        "Đơn vị thẩm tra quyết toán": "Sở Tài chính (Phòng Quản lý Đầu tư công)",
        "Trạng thái bóc tách OCR": "Đã bóc tách 38 biên bản nghiệm thu & phụ lục quyết toán A-B"
      }
    },
    {
      docId: "DOC-KTNS-00095",
      dept: "Phòng Kinh tế và Ngân sách",
      deptCode: "ktns",
      boxNumber: "Hộp số 05",
      shelfLocation: "Giá 02 - Kệ C1",
      title: "Hồ sơ Quyết toán Ngân sách Nhà nước tỉnh Khánh Hòa niên độ 2022 & Báo cáo Kiểm toán",
      regNumber: "NQ 18/2023/NQ-HĐND",
      issueDate: "2023-07-15",
      totalPages: 240,
      fileSize: "28.0 MB",
      format: "PDF/A-2b",
      investor: "Sở Tài chính tỉnh Khánh Hòa",
      retentionPeriod: "Vĩnh viễn",
      securityLevel: "PUBLIC",
      securityLabel: "Công khai toàn bộ",
      allowedRoles: ["lanhdao", "admin", "ktns", "dtc", "dtns", "doanhnghiep", "giacongsan", "hcsn", "phapche"],
      mappedRecord: "FT.FACT_QUYET_TOAN_NGAN_SACH (Niên độ 2022)",
      extractedData: {
        "Niên độ quyết toán": "Năm ngân sách 2022",
        "Tổng thu NSNN trên địa bàn": "16.480.000.000.000 VND (Đạt 137.2% dự toán HĐND giao)",
        "Thu nội địa": "12.850.000.000.000 VND (Chiếm 78.0%)",
        "Thu từ hoạt động XNK": "3.630.000.000.000 VND (Hải quan)",
        "Tổng chi ngân sách địa phương": "14.120.000.000.000 VND",
        "Kết dư ngân sách cấp tỉnh": "2.360.000.000.000 VND (Trích nộp Quỹ dự trữ tài chính và ĐTPT)",
        "Căn cứ pháp lý": "Nghị quyết số 18/2023/NQ-HĐND ngày 15/07/2023 của HĐND tỉnh Khánh Hòa",
        "Xác nhận Kiểm toán Nhà nước": "Kiểm toán Nhà nước Khu vực VIII xác nhận trung thực và hợp lý",
        "Trạng thái bóc tách OCR": "Đã bóc tách biểu mẫu phụ lục 01, 02, 03 theo Thông tư 342/2016/TT-BTC"
      }
    },
    {
      docId: "DOC-PC-00112",
      dept: "Phòng Pháp chế",
      deptCode: "phapche",
      boxNumber: "Hộp số 11",
      shelfLocation: "Giá 04 - Kệ D3",
      title: "Hồ sơ Quyết định xử phạt VPHC & Truy thu nghĩa vụ tài chính tại Cụm Công nghiệp Diên Phú",
      regNumber: "88/QĐ-XPHC",
      issueDate: "2020-09-08",
      totalPages: 168,
      fileSize: "19.4 MB",
      format: "PDF/A-2b",
      investor: "Sở Tài chính & UBND tỉnh Khánh Hòa",
      retentionPeriod: "20 năm",
      securityLevel: "RESTRICTED",
      securityLabel: "Hạn chế (Chỉ Lãnh đạo & Tổ Pháp chế)",
      allowedRoles: ["lanhdao", "admin", "phapche"],
      mappedRecord: "FT.FACT_KHIEU_NAI_TO_CAO_THANH_TRA (ID: VPHC-2020-088)",
      extractedData: {
        "Mã quyết định": "88/QĐ-XPHC-UBND",
        "Đối tượng xử phạt": "Công ty Cổ phần Chế biến Gỗ Miền Trung (MST: 4200389124)",
        "Hành vi vi phạm": "Chậm thực hiện nghĩa vụ nộp tiền thuê đất và chậm đưa đất vào sử dụng",
        "Số tiền phạt VPHC": "250.000.000 VND",
        "Số tiền truy thu nộp KBNN": "1.250.000.000 VND",
        "Thời hạn thi hành": "30 ngày kể từ ngày nhận quyết định",
        "Tình trạng thi hành": "Đã nộp phạt 100% vào KBNN Khu vực XIV (Biên lai số 004821/BL)",
        "Cơ quan thụ lý đơn thư": "Tổ Pháp chế - Sở Tài chính",
        "Trạng thái bóc tách OCR": "Đã bóc tách toàn văn biên bản vi phạm & quyết định xử phạt"
      }
    },
    {
      docId: "DOC-GCS-00054",
      dept: "Phòng Quản lý Giá và Công sản",
      deptCode: "giacongsan",
      boxNumber: "Hộp số 09",
      shelfLocation: "Giá 02 - Kệ A2",
      title: "Hồ sơ Phương án sắp xếp lại, xử lý cơ sở nhà đất số 12 Hàn Thuyên, Phường Nha Trang",
      regNumber: "348/QĐ-UBND",
      issueDate: "2024-03-10",
      totalPages: 142,
      fileSize: "18.5 MB",
      format: "PDF/A-2b",
      investor: "Sở Tài chính (Phòng Quản lý Giá và Công sản)",
      retentionPeriod: "Vĩnh viễn",
      securityLevel: "INTERNAL",
      securityLabel: "Nội bộ Sở Tài chính",
      allowedRoles: ["lanhdao", "admin", "giacongsan"],
      mappedRecord: "MD.CO_SO_NHA_DAT_CONG (ID: ND-167-NTR-042)",
      extractedData: {
        "Mã cơ sở nhà đất": "ND-167-NTR-042",
        "Tên cơ sở": "Trụ sở cũ Chi cục Tiêu chuẩn Đo lường Chất lượng (Số 12 Hàn Thuyên, Nha Trang)",
        "Diện tích khuôn viên đất": "840,5 m²; Diện tích sàn xây dựng: 1.620 m² (3 tầng)",
        "Hiện trạng sử dụng": "Đang để trống sau khi chuyển về Khu liên cơ quan tỉnh",
        "Phương án phê duyệt": "Bán đấu giá quyền sử dụng đất và tài sản trên đất (NĐ 167 & NĐ 67)",
        "Giá trị thu NS dự kiến": "85.000.000.000 VND",
        "Đơn vị tổ chức đấu giá": "Trung tâm Dịch vụ Đấu giá tài sản tỉnh Khánh Hòa",
        "Trạng thái bóc tách OCR": "Đã trích xuất sơ đồ trích đo địa chính & bản định giá tài sản"
      }
    },
    {
      docId: "DOC-HCSN-00078",
      dept: "Phòng Tài chính Hành chính Sự nghiệp",
      deptCode: "hcsn",
      boxNumber: "Hộp số 15",
      shelfLocation: "Giá 03 - Kệ C4",
      title: "Hồ sơ Đề án Tự chủ tài chính giai đoạn 2026-2030 Bệnh viện Đa khoa Tỉnh Khánh Hòa",
      regNumber: "758/QĐ-UBND",
      issueDate: "2025-12-28",
      totalPages: 210,
      fileSize: "24.6 MB",
      format: "PDF/A-2b",
      investor: "Bệnh viện Đa khoa Tỉnh Khánh Hòa (Sở Y tế)",
      retentionPeriod: "30 năm",
      securityLevel: "INTERNAL",
      securityLabel: "Nội bộ Sở Tài chính",
      allowedRoles: ["lanhdao", "admin", "hcsn"],
      mappedRecord: "FT.FACT_DU_TOAN_CHI_TX (ID: HCSN-BV-001)",
      extractedData: {
        "Đơn vị sự nghiệp": "Bệnh viện Đa khoa Tỉnh Khánh Hòa (Mã ĐVQHNS: 1048750)",
        "Giai đoạn tự chủ": "2026 - 2030 theo Nghị định số 60/2021/NĐ-CP",
        "Phân loại tự chủ": "Nhóm 1 (Tự bảo đảm toàn bộ chi thường xuyên và chi đầu tư)",
        "Tổng thu sự nghiệp": "540.000.000.000 VND/năm (Từ nguồn KCB và BHYT)",
        "Số người làm việc hưởng lương": "1.250 viên chức và người lao động",
        "Dự toán NSNN chi TX": "0 đồng (Tiết kiệm NS cấp tỉnh 45 tỷ đồng/năm)",
        "Hỗ trợ mua sắm thiết bị": "NS tỉnh bố trí vốn ĐTC mua thiết bị kỹ thuật cao (120 tỷ đồng)",
        "Trạng thái bóc tách OCR": "Đã bóc tách toàn bộ dự toán thu chi và phương án trích lập các quỹ"
      }
    },
    {
      docId: "DOC-DN-00062",
      dept: "Phòng Quản lý Doanh nghiệp",
      deptCode: "doanhnghiep",
      boxNumber: "Hộp số 22",
      shelfLocation: "Giá 04 - Kệ A1",
      title: "Hồ sơ BCTC Kiểm toán năm & Đánh giá Hiệu quả Vốn Nhà nước tại Tổng Công ty Khánh Việt (KHATOCO)",
      regNumber: "128/BC-STC",
      issueDate: "2026-04-15",
      totalPages: 320,
      fileSize: "39.1 MB",
      format: "PDF/A-2b",
      investor: "Tổng Công ty Khánh Việt (UBND tỉnh là đại diện chủ sở hữu)",
      retentionPeriod: "Vĩnh viễn",
      securityLevel: "CONFIDENTIAL",
      securityLabel: "Mật (Chỉ Lãnh đạo & Phòng QL Doanh nghiệp)",
      allowedRoles: ["lanhdao", "admin", "doanhnghiep"],
      mappedRecord: "FT.FACT_TAI_CHINH_DOANH_NGHIEP (ID: DN-KHATOCO-2025)",
      extractedData: {
        "Tên doanh nghiệp": "Tổng Công ty Khánh Việt (KHATOCO) (MST: 4200234120)",
        "Loại hình": "Công ty TNHH MTV do Nhà nước nắm giữ 100% vốn điều lệ",
        "Vốn chủ sở hữu nhà nước": "2.850.000.000.000 VND",
        "Doanh thu thuần hợp nhất": "8.920.000.000.000 VND",
        "Lợi nhuận trước thuế": "420.000.000.000 VND",
        "Nộp ngân sách nhà nước": "2.950.000.000.000 VND (Chiếm tỷ trọng lớn thu nội địa)",
        "Chỉ số ROE / ROA": "ROE: 14.7%; ROA: 8.9% (Xếp loại A - Doanh nghiệp xuất sắc)",
        "Trạng thái bóc tách OCR": "Đã bóc tách Bảng CĐKT, Báo cáo KQKD và Báo cáo Lưu chuyển Tiền tệ"
      }
    }
  ],

  // 7. Dữ liệu Phân tán Rủi ro Doanh nghiệp (Scatter Plot Matrix)
  enterpriseRiskMatrix: [
    { name: "Công ty TNHH Vận tải & Xây dựng ABC", roa: -4.2, roe: -8.5, tax_compliance_score: 32, risk_level: "Cao", debt_bhxh_mil: 450, color: "#ef4444" },
    { name: "Công ty CP Thủy sản Xuất khẩu Phương Nam", roa: 1.2, roe: 2.4, tax_compliance_score: 65, risk_level: "Trung bình", debt_bhxh_mil: 0, color: "#f59e0b" },
    { name: "Tổng Công ty Khánh Việt (KHATOCO)", roa: 14.8, roe: 22.4, tax_compliance_score: 98, risk_level: "An toàn", debt_bhxh_mil: 0, color: "#10b981" },
    { name: "Công ty TNHH Bất động sản Hoàng Gia", roa: -2.1, roe: -5.0, tax_compliance_score: 41, risk_level: "Cao", debt_bhxh_mil: 280, color: "#ef4444" },
    { name: "Công ty Yến Sào Khánh Hòa", roa: 18.5, roe: 26.2, tax_compliance_score: 99, risk_level: "An toàn", debt_bhxh_mil: 0, color: "#10b981" },
    { name: "Công ty CP Du lịch & Nghỉ dưỡng Nha Trang Bay", roa: 6.8, roe: 10.2, tax_compliance_score: 85, risk_level: "An toàn", debt_bhxh_mil: 0, color: "#10b981" },
    { name: "Công ty TNHH Khoáng sản Miền Trung", roa: 0.5, roe: 1.1, tax_compliance_score: 52, risk_level: "Trung bình", debt_bhxh_mil: 120, color: "#f59e0b" }
  ]
};
