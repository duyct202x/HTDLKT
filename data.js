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

  // 2. Dữ liệu địa bàn cơ sở (xã, phường, đặc khu) tỉnh Khánh Hòa
  districts: [
    { id: "7901", code: "NTR", name: "Khu vực Nha Trang", type: "Xã, phường", revenue: 8450.2, exp: 5120.0, projects: 42, fdi: 210.5, dtc_rate: 74.2 },
    { id: "7902", code: "CRH", name: "Khu vực Cam Ranh", type: "Xã, phường", revenue: 2650.0, exp: 2100.0, projects: 18, fdi: 125.0, dtc_rate: 69.5 },
    { id: "7903", code: "NHO", name: "Khu vực Ninh Hòa", type: "Xã, phường", revenue: 2840.4, exp: 2400.0, projects: 24, fdi: 85.0, dtc_rate: 65.8 },
    { id: "7904", code: "VNI", name: "Khu vực Vạn Ninh", type: "Xã, thị trấn", revenue: 1120.0, exp: 1350.0, projects: 15, fdi: 42.0, dtc_rate: 62.1 },
    { id: "7905", code: "CLM", name: "Khu vực Cam Lâm", type: "Xã, thị trấn", revenue: 1680.0, exp: 1780.0, projects: 19, fdi: 23.1, dtc_rate: 71.0 },
    { id: "7906", code: "DKH", name: "Khu vực Diên Khánh", type: "Xã, thị trấn", revenue: 980.0, exp: 1240.0, projects: 12, fdi: 0.0, dtc_rate: 68.0 },
    { id: "7907", code: "KVH", name: "Khu vực Khánh Vĩnh", type: "Xã", revenue: 320.0, exp: 960.0, projects: 8, fdi: 0.0, dtc_rate: 58.4 },
    { id: "7908", code: "KSO", name: "Khu vực Khánh Sơn", type: "Xã", revenue: 210.0, exp: 820.0, projects: 6, fdi: 0.0, dtc_rate: 55.2 },
    { id: "7909", code: "TSA", name: "Đặc khu Trường Sa", type: "Xã đảo", revenue: 270.0, exp: 470.2, projects: 4, fdi: 0.0, dtc_rate: 82.0 }
  ],

  // 3. Doanh nghiệp nộp thuế trọng điểm tỉnh Khánh Hòa
  keyEnterprises: [
    { mst: "4200238910", name: "Tổng công ty Khánh Việt (KHATOCO)", revenue_contribution: 3620.5, sector: "Sản xuất thuốc lá và dịch vụ", progress_pct: 104.2, status: "Đạt vượt kế hoạch" },
    { mst: "4200429779", name: "Công ty Yến Sào Khánh Hòa", revenue_contribution: 2180.0, sector: "Chế biến và dịch vụ", progress_pct: 101.8, status: "Đạt kế hoạch" },
    { mst: "4200789012", name: "Công ty Bia Sài Gòn - Nam Trung Bộ", revenue_contribution: 1450.0, sector: "Đồ uống", progress_pct: 98.5, status: "Đang theo dõi" },
    { mst: "4201123456", name: "Công ty CP Điện lực Khánh Hòa (PC Khánh Hòa)", revenue_contribution: 720.0, sector: "Năng lượng", progress_pct: 102.0, status: "Đạt kế hoạch" },
    { mst: "4200987654", name: "Công ty CP Thủy sản Nha Trang", revenue_contribution: 510.4, sector: "Chế biến thủy sản", progress_pct: 96.2, status: "Đang theo dõi" },
    { mst: "4201345678", name: "Công ty CP Cảng Nha Trang", revenue_contribution: 380.0, sector: "Logistics và cảng biển", progress_pct: 105.1, status: "Đạt vượt kế hoạch" }
  ],

  // 4. Danh mục 9 API tích hợp từ Bộ Tài chính (CV 4760 / Đặc tả IOC v1.0)
  btcApis: [
    {
      code: "00210101",
      name: "Tình hình thực hiện thu NSNN",
      category: "Quản lý NSNN",
      endpoint: "https://api-csdltc.mof.gov.vn/ioc-data-exchange/api/v1/shared/nsnn_thu",
      method: "POST",
      frequency: "Hằng ngày (Sysdate-1)",
      status: "HEALTHY",
      latency: "42ms",
      lastSync: "2026-08-20 04:30:15",
      recordsSynced: 1240,
      description: "Đồng bộ số thu thuế, thu nội địa, thu xuất nhập khẩu phân bổ theo từng địa bàn xã, phường và nội dung kinh tế."
    },
    {
      code: "00210201",
      name: "Tình hình thực hiện Chi NSNN",
      category: "Quản lý NSNN",
      endpoint: "https://api-csdltc.mof.gov.vn/ioc-data-exchange/api/v1/shared/nsnn_chi",
      method: "POST",
      frequency: "Hằng ngày (Sysdate-1)",
      status: "HEALTHY",
      latency: "55ms",
      lastSync: "2026-08-20 04:30:28",
      recordsSynced: 980,
      description: "Đồng bộ cơ cấu chi thường xuyên, chi đầu tư phát triển theo từng cấp ngân sách và đơn vị thụ hưởng."
    },
    {
      code: "0040201",
      name: "Giải ngân vốn Đầu tư công",
      category: "Đầu tư công",
      endpoint: "https://api-csdltc.mof.gov.vn/ioc-data-exchange/api/v1/shared/dtc_giaingan_tuan",
      method: "POST",
      frequency: "Hằng tuần / Hằng tháng",
      status: "HEALTHY",
      latency: "38ms",
      lastSync: "2026-08-18 20:00:00",
      recordsSynced: 450,
      description: "Đồng bộ tiến độ giải ngân vốn đầu tư công, số dư tạm ứng chưa thu hồi theo từng dự án và chủ đầu tư."
    },
    {
      code: "007003",
      name: "Tổng trị giá hàng hóa Xuất Nhập Khẩu",
      category: "Hải quan",
      endpoint: "https://api-csdltc.mof.gov.vn/api_csdlth/shared/hhxnk",
      method: "POST",
      frequency: "Hằng ngày / Hằng tháng",
      status: "HEALTHY",
      latency: "61ms",
      lastSync: "2026-08-19 23:15:00",
      recordsSynced: 310,
      description: "Đồng bộ kim ngạch xuất khẩu, nhập khẩu theo nhóm mặt hàng chủ lực (thủy sản, dệt may, thiết bị công nghiệp)."
    },
    {
      code: "0080101-08",
      name: "Dữ liệu Phát triển Doanh nghiệp",
      category: "Hoạt động Doanh nghiệp",
      endpoint: "https://api-csdltc.mof.gov.vn/ioc-data-exchange/api/v1/shared/doanhnghiep",
      method: "POST",
      frequency: "Hằng tháng",
      status: "HEALTHY",
      latency: "48ms",
      lastSync: "2026-08-01 08:00:00",
      recordsSynced: 14890,
      description: "Đồng bộ số lượng doanh nghiệp đang hoạt động, thành lập mới, giải thể, vốn đăng ký và lao động."
    },
    {
      code: "0080201-03",
      name: "Dữ liệu Hợp tác xã & Kinh tế tập thể",
      category: "Hoạt động Doanh nghiệp",
      endpoint: "https://api-csdltc.mof.gov.vn/ioc-data-exchange/api/v1/shared/htx",
      method: "POST",
      frequency: "Hằng tháng",
      status: "HEALTHY",
      latency: "35ms",
      lastSync: "2026-08-01 08:05:00",
      recordsSynced: 420,
      description: "Đồng bộ tình hình phát triển HTX, liên hiệp HTX và tổ hợp tác trên địa bàn tỉnh Khánh Hòa."
    },
    {
      code: "01801-08",
      name: "Dữ liệu Quản lý Đấu thầu qua mạng",
      category: "Quản lý Đấu thầu",
      endpoint: "https://api-csdltc.mof.gov.vn/ioc-data-exchange/api/v1/shared/qldt",
      method: "POST",
      frequency: "Hằng tháng",
      status: "HEALTHY",
      latency: "52ms",
      lastSync: "2026-08-15 12:00:00",
      recordsSynced: 680,
      description: "Đồng bộ số gói thầu thực hiện, giá trị gói thầu, tỷ lệ tiết kiệm qua đấu thầu điện tử trên Hệ thống mạng ĐTQG."
    },
    {
      code: "KB-M04",
      name: "Bảng kê chứng từ nộp NSNN Mẫu 04/BKCTNNS",
      category: "Kho bạc Nhà nước",
      endpoint: "https://kbnn.gov.vn/api/v1/so-tai-chinh/chung-tu-thu",
      method: "REST/mTLS",
      frequency: "Hằng ngày (Real-time)",
      status: "HEALTHY",
      latency: "28ms",
      lastSync: "2026-08-20 06:15:22",
      recordsSynced: 2450,
      description: "Chi tiết từng dòng chứng từ nộp NSNN hạch toán tài khoản 7111, 7113 tại KBNN tỉnh Khánh Hòa."
    },
    {
      code: "QHNS-01",
      name: "Mã số Đơn vị Quan hệ Ngân sách (ĐVQHNS)",
      category: "Dữ liệu chủ",
      endpoint: "https://qhns.btc/api/v2/master-data/dvsdns",
      method: "SOAP/XML",
      frequency: "Định kỳ khi phát sinh",
      status: "HEALTHY",
      latency: "44ms",
      lastSync: "2026-08-19 14:20:00",
      recordsSynced: 1280,
      description: "Đồng bộ mã 7 ký tự chuẩn quốc gia cho tất cả các cơ quan, đơn vị dự toán, trường học, bệnh viện trên toàn tỉnh."
    }
  ],

  // 5. Hồ sơ Khảo sát & Nhập liệu Chờ duyệt (Dữ liệu 7 Phòng chuyên môn)
  pendingSubmissions: [
    {
      id: "SUB-2026-089",
      dept: "Phòng Quản lý Đầu tư ngoài ngân sách",
      title: "Hồ sơ Chấp thuận chủ trương đầu tư Khu đô thị sinh thái Bắc Cam Ranh",
      type: "Dự án Ngoài Ngân Sách",
      submittedBy: "Nguyễn Văn Tuấn (Chuyên viên)",
      submittedDate: "2026-08-19 15:40",
      status: "PENDING",
      data: {
        ten_du_an: "Khu đô thị sinh thái Bắc Cam Ranh",
        so_qd_chu_truong: "1289/QĐ-UBND",
        ngay_qd: "2026-08-15",
        nha_dau_tu: "Tập đoàn Phát triển Đô thị Khánh Hòa",
        mst: "4201889922",
        dia_ban: "TP. Cam Ranh",
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

  // 6. Kho Hồ sơ Số hóa Lịch sử (1.057.980 trang A4 / 137,4 mét)
  digitalArchive: [
    {
      docId: "DOC-DTNS-00184",
      dept: "Phòng Quản lý Đầu tư ngoài ngân sách",
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
      mappedRecord: "MD.DU_AN_DAU_TU_NGOAI_NGAN_SACH (ID: DA-NNS-79-001)"
    },
    {
      docId: "DOC-DTC-00421",
      dept: "Phòng Quản lý Đầu tư công",
      boxNumber: "Hộp số 18",
      shelfLocation: "Giá 01 - Kệ A4",
      title: "Hồ sơ Thẩm định & Phê duyệt Quyết toán Dự án Đường Vành đai 2 TP. Nha Trang",
      regNumber: "1420/QĐ-UBND",
      issueDate: "2021-11-20",
      totalPages: 512,
      fileSize: "64.5 MB",
      format: "PDF/A-2b",
      investor: "Ban Quản lý dự án Đầu tư Xây dựng các Công trình Giao thông tỉnh",
      retentionPeriod: "70 năm",
      mappedRecord: "MD.DU_AN_DAU_TU_CONG (ID: DA-DTC-79-012)"
    },
    {
      docId: "DOC-KTNS-00095",
      dept: "Phòng Kinh tế và Ngân sách",
      boxNumber: "Hộp số 05",
      shelfLocation: "Giá 02 - Kệ C1",
      title: "Hồ sơ Quyết toán Ngân sách Nhà nước tỉnh Khánh Hòa niên độ 2022 và Báo cáo Kiểm toán",
      regNumber: "NQ 18/2023/NQ-HĐND",
      issueDate: "2023-07-15",
      totalPages: 240,
      fileSize: "28.0 MB",
      format: "PDF/A-2b",
      investor: "Sở Tài chính tỉnh Khánh Hòa",
      retentionPeriod: "Vĩnh viễn",
      mappedRecord: "FT.FACT_QUYET_TOAN_NGAN_SACH (Năm 2022)"
    },
    {
      docId: "DOC-PC-00112",
      dept: "Phòng Pháp chế",
      boxNumber: "Hộp số 11",
      shelfLocation: "Giá 04 - Kệ D3",
      title: "Kết luận Thanh tra việc chấp hành nghĩa vụ nộp thuế và quản lý đất đai tại Cụm Công nghiệp Diên Phú",
      regNumber: "88/KL-STC",
      issueDate: "2020-09-08",
      totalPages: 168,
      fileSize: "19.4 MB",
      format: "PDF/A-2b",
      investor: "Đoàn Thanh tra Sở Tài chính",
      retentionPeriod: "20 năm",
      mappedRecord: "FT.FACT_KHIEU_NAI_TO_CAO_THANH_TRA (ID: TT-2020-08)"
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
