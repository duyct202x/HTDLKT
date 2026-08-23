/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * PHÂN HỆ QUẢN TRỊ 26 BẢNG DỮ LIỆU CHỦ (MDM), DATA CATALOG & DYNAMIC DATA MASKING (DDM)
 */

const MdmCatalogManager = {
  currentGroup: 'ALL',
  currentTableCode: 'MD.DOANH_NGHIEP_DKKD',
  activeView: 'catalog', // 'catalog' | 'viewer' | 'dictionary'
  searchKeyword: '',

  // 26 Master Data Tables Catalog Definitions
  masterTables: [
    // NHÓM 1: DOANH NGHIỆP, HỘ KINH DOANH & TỔ CHỨC KINH TẾ
    {
      code: "MD.DOANH_NGHIEP_DKKD",
      name: "Doanh nghiệp Đăng ký Kinh doanh toàn tỉnh",
      group: "1. Doanh nghiệp & Tổ chức kinh tế",
      provider: "Cục Quản lý ĐKKD (Bộ KH&ĐT) & Cục Thuế tỉnh",
      recordsCount: "14.890",
      frequency: "Hằng tháng (Delta Sync)",
      ddmMasked: "CCCD, Tên đại diện (Masked)",
      description: "Danh bạ toàn bộ doanh nghiệp, chi nhánh, VPĐD đăng ký hoạt động trên địa bàn tỉnh Khánh Hòa.",
      schema: [
        { col: "MA_DOANH_NGHIEP", type: "VARCHAR(20)", pk: true, fk: false, masked: false, desc: "Mã định danh doanh nghiệp" },
        { col: "TEN_DOANH_NGHIEP", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Tên pháp nhân doanh nghiệp" },
        { col: "MA_SO_THUE", type: "VARCHAR(20)", pk: false, fk: false, masked: false, desc: "Mã số thuế (10 hoặc 13 số)" },
        { col: "NGUOI_DAI_DIEN_PL", type: "NVARCHAR(255)", pk: false, fk: false, masked: true, desc: "Họ và tên người đại diện pháp luật (DDM)" },
        { col: "SO_CCCD_DINH_DANH", type: "VARCHAR(20)", pk: false, fk: false, masked: true, desc: "Số định danh cá nhân / CCCD (DDM Masked)" },
        { col: "VON_DIEU_LE", type: "DECIMAL(18,2)", pk: false, fk: false, masked: false, desc: "Vốn điều lệ đăng ký kinh doanh (VNĐ)" },
        { col: "TRANG_THAI_HOAT_DONG", type: "VARCHAR(50)", pk: false, fk: false, masked: false, desc: "Đang hoạt động / Tạm ngừng / Giải thể" }
      ],
      sampleRows: [
        { c1: "DN-001", c2: "Tổng Công ty Khánh Việt (KHATOCO)", c3: "4200238910", c4: "Phan Quang Huy", c5: "056082001928", c6: "2.500.000.000.000 đ", c7: "Đang hoạt động" },
        { c2: "Công ty Cổ phần Nước Giải khát Yến Sào Khánh Hòa", c1: "DN-002", c3: "4200429779", c4: "Nguyễn Thị Hồng", c5: "056185002341", c6: "330.000.000.000 đ", c7: "Đang hoạt động" },
        { c2: "Công ty CP Đầu tư & Du lịch Biển Xanh Nha Trang", c1: "DN-003", c3: "4201887766", c4: "Vũ Đức Toàn", c5: "056090008871", c6: "450.000.000.000 đ", c7: "Đang hoạt động" }
      ]
    },
    {
      code: "MD.HO_KINH_DOANH_CA_THE",
      name: "Danh bạ Hộ Kinh doanh cá thể",
      group: "1. Doanh nghiệp & Tổ chức kinh tế",
      provider: "Hệ thống ĐKKD Hộ cá thể (Bộ KH&ĐT) & Chi cục Thuế",
      recordsCount: "42.350",
      frequency: "Hằng tháng",
      ddmMasked: "CCCD, Tên chủ hộ (Masked)",
      description: "Danh bạ hộ kinh doanh cá thể phân rã theo 65 đơn vị hành chính cấp xã, phường, đặc khu trên toàn tỉnh.",
      schema: [
        { col: "MA_HO_KINH_DOANH", type: "VARCHAR(30)", pk: true, fk: false, masked: false, desc: "Mã số thuế hộ kinh doanh" },
        { col: "TEN_HO_KINH_DOANH", type: "NVARCHAR(300)", pk: false, fk: false, masked: false, desc: "Tên cơ sở / cửa hàng kinh doanh" },
        { col: "HO_TEN_CHU_HO", type: "NVARCHAR(255)", pk: false, fk: false, masked: true, desc: "Chủ hộ kinh doanh (DDM Masked)" },
        { col: "MA_DIA_BAN_XA", type: "VARCHAR(20)", pk: false, fk: true, masked: false, desc: "Mã xã/phường nơi đặt địa điểm kinh doanh" },
        { col: "NGANH_NGHE_CHINH", type: "NVARCHAR(255)", pk: false, fk: false, masked: false, desc: "Ngành nghề kinh doanh chính" },
        { col: "VON_KINH_DOANH", type: "DECIMAL(18,2)", pk: false, fk: false, masked: false, desc: "Vốn kinh doanh kê khai ban đầu" }
      ],
      sampleRows: [
        { c1: "HKD-7901-0012", c2: "Hộ Kinh doanh Hải sản Tươi sống Biển Đông", c3: "4201990011", c4: "Lê Văn Tám", c5: "056088003412", c6: "500.000.000 đ", c7: "Đang hoạt động" },
        { c1: "HKD-7901-0013", c2: "Cơ sở May mặc & Thời trang Nha Trang Silk", c3: "4201990022", c4: "Trần Thị Mai", c5: "056192004561", c6: "300.000.000 đ", c7: "Đang hoạt động" }
      ]
    },
    {
      code: "MD.HOP_TAC_XA_LIEN_HIEP_HTX",
      name: "Hợp tác xã & Liên hiệp Hợp tác xã",
      group: "1. Doanh nghiệp & Tổ chức kinh tế",
      provider: "Cục Kinh tế Hợp tác (Bộ KH&ĐT) & Liên minh HTX tỉnh",
      recordsCount: "385",
      frequency: "Hằng tháng / Hằng quý",
      ddmMasked: "Không yêu cầu che mờ",
      description: "Danh mục các Hợp tác xã nông nghiệp, thủy sản, vận tải và quỹ tín dụng nhân dân theo Luật HTX 2023.",
      schema: [
        { col: "MA_HOP_TAC_XA", type: "VARCHAR(30)", pk: true, fk: false, masked: false, desc: "Mã số HTX (MST)" },
        { col: "TEN_HOP_TAC_XA", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Tên Hợp tác xã / Liên hiệp HTX" },
        { col: "LOAI_HINH_HTX", type: "VARCHAR(50)", pk: false, fk: false, masked: false, desc: "HTX Nông nghiệp / Vận tải / TTCN / TDND" },
        { col: "SO_THANH_VIEN", type: "INT", pk: false, fk: false, masked: false, desc: "Số lượng thành viên chính thức" },
        { col: "VON_DIEU_LE", type: "DECIMAL(18,2)", pk: false, fk: false, masked: false, desc: "Vốn điều lệ HTX (VNĐ)" }
      ],
      sampleRows: [
        { c1: "HTX-001", c2: "HTX Nông nghiệp Công nghệ cao Vạn Ninh", c3: "4201881122", c4: "Nguyễn Văn Hùng", c5: "056075001234", c6: "15.000.000.000 đ", c7: "Đang hoạt động" },
        { c1: "HTX-002", c2: "HTX Khai thác & Nuôi trồng Thủy sản Cam Ranh", c3: "4201881133", c4: "Đặng Đình Nam", c5: "056079002345", c6: "28.000.000.000 đ", c7: "Đang hoạt động" }
      ]
    },
    {
      code: "MD.DON_VI_QUAN_HE_NGAN_SACH",
      name: "Danh mục Đơn vị Quan hệ Ngân sách (ĐVQHNS)",
      group: "1. Doanh nghiệp & Tổ chức kinh tế",
      provider: "Cục KHTC & KBNN (Bộ Tài chính - Mã 7 ký tự)",
      recordsCount: "1.280",
      frequency: "Định kỳ khi phát sinh",
      ddmMasked: "Không",
      description: "Mã 7 ký tự chuẩn quốc gia cho tất cả các sở, ban, ngành, cơ quan hành chính, đơn vị sự nghiệp, UBND xã.",
      schema: [
        { col: "MA_DVQHNS", type: "VARCHAR(20)", pk: true, fk: false, masked: false, desc: "Mã 7 ký tự chuẩn Bộ Tài chính" },
        { col: "TEN_DON_VI", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Tên chính thức đơn vị dự toán" },
        { col: "MA_CHUONG", type: "VARCHAR(10)", pk: false, fk: true, masked: false, desc: "Mã cấp Chương ngân sách" },
        { col: "CAP_DU_TOAN", type: "VARCHAR(10)", pk: false, fk: false, masked: false, desc: "Cấp 1, Cấp 2, Cấp 3" }
      ],
      sampleRows: [
        { c1: "1056421", c2: "Sở Tài chính tỉnh Khánh Hòa", c3: "154", c4: "Đơn vị cấp 1", c5: "---", c6: "Ngân sách tỉnh", c7: "Hoạt động" },
        { c1: "1056425", c2: "Văn phòng Ủy ban Nhân dân tỉnh Khánh Hòa", c3: "154", c4: "Đơn vị cấp 1", c5: "---", c6: "Ngân sách tỉnh", c7: "Hoạt động" }
      ]
    },

    // NHÓM 2: ĐẦU TƯ CÔNG & QUY HOẠCH
    {
      code: "MD.DU_AN_DAU_TU_CONG",
      name: "Danh mục Dự án Đầu tư công trung hạn & hằng năm",
      group: "2. Đầu tư công & Quy hoạch",
      provider: "Hệ thống TABMIS KBNN & Sở Tài chính (Phòng Quản lý Đầu tư công)",
      recordsCount: "186",
      frequency: "Hằng tuần / Hằng tháng",
      ddmMasked: "Không",
      description: "Danh bạ toàn bộ các dự án đầu tư công nhóm A, B, C sử dụng vốn NSNN và vốn ODA trên địa bàn tỉnh.",
      schema: [
        { col: "MA_DU_AN", type: "VARCHAR(50)", pk: true, fk: false, masked: false, desc: "Mã định danh dự án ĐTC" },
        { col: "TEN_DU_AN", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Tên dự án phê duyệt" },
        { col: "CHU_DAU_TU", type: "NVARCHAR(500)", pk: false, fk: true, masked: false, desc: "Tên Chủ đầu tư / Ban QLDA" },
        { col: "NHOM_DU_AN", type: "VARCHAR(20)", pk: false, fk: false, masked: false, desc: "Nhóm A, Nhóm B, Nhóm C" },
        { col: "TONG_MUC_DAU_TU", type: "DECIMAL(18,2)", pk: false, fk: false, masked: false, desc: "Tổng mức đầu tư được duyệt (VNĐ)" }
      ],
      sampleRows: [
        { c1: "DA-79-001", c2: "Đường Vành đai 2 Nha Trang", c3: "Ban QLDA Giao thông Khánh Hòa", c4: "Nhóm A", c5: "---", c6: "1.450.000.000.000 đ", c7: "Tiến độ 78.5%" },
        { c1: "DA-79-002", c2: "Kè & Nạo vét khơi thông luồng Sông Tắc - Sông Quán Trường", c3: "Ban QLDA Nông nghiệp & PTNT", c4: "Nhóm B", c5: "---", c6: "820.000.000.000 đ", c7: "Tiến độ 92.0%" }
      ]
    },
    {
      code: "MD.DU_AN_NGOAI_NGAN_SACH_FDI",
      name: "Dự án Đầu tư Ngoài ngân sách & FDI (IRC)",
      group: "2. Đầu tư công & Quy hoạch",
      provider: "Sở Tài chính (Phòng ĐT Ngoài ngân sách & FDI) / Ban QL KKT Vân Phong",
      recordsCount: "312",
      frequency: "Hằng quý / Khi cấp mới",
      ddmMasked: "Không",
      description: "Danh bạ dự án ngoài ngân sách đã được cấp Giấy chứng nhận đăng ký đầu tư (IRC) và QĐ chủ trương.",
      schema: [
        { col: "MA_DU_AN_NNS", type: "VARCHAR(50)", pk: true, fk: false, masked: false, desc: "Mã số dự án trên Giấy IRC" },
        { col: "TEN_DU_AN", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Tên dự án đầu tư" },
        { col: "NHA_DAU_TU", type: "NVARCHAR(500)", pk: false, fk: true, masked: false, desc: "Tên nhà đầu tư trong nước hoặc FDI" },
        { col: "QUY_MO_VON_USD", type: "DECIMAL(18,2)", pk: false, fk: false, masked: false, desc: "Tổng vốn đăng ký (USD/VNĐ)" }
      ],
      sampleRows: [
        { c1: "IRC-FDI-001", c2: "Tổ hợp Cảng Trung chuyển Quốc tế Bắc Vân Phong", c3: "Tập đoàn Sumitomo - Nhật Bản", c4: "FDI", c5: "---", c6: "2.500.000.000 USD", c7: "Đang thẩm định" },
        { c1: "IRC-NNS-002", c2: "Khu Đô thị Sinh thái Nghỉ dưỡng Cam Lâm Pearl", c3: "Công ty CP Đầu tư Biển Xanh", c4: "Trong nước", c5: "---", c6: "4.800.000.000.000 đ", c7: "Đã cấp IRC" }
      ]
    },
    {
      code: "MD.HO_SO_QUY_HOACH_TINH",
      name: "Hồ sơ & Bản đồ CSDL Quy hoạch tỉnh Khánh Hòa",
      group: "2. Đầu tư công & Quy hoạch",
      provider: "CSDL Quy hoạch Quốc gia (Bộ KH&ĐT) & Cổng GIS Tỉnh",
      recordsCount: "120",
      frequency: "Khi có phê duyệt điều chỉnh",
      ddmMasked: "Không",
      description: "Quy hoạch tỉnh Khánh Hòa thời kỳ 2021-2030 (QĐ 318/QĐ-TTg), quy hoạch phân khu và quy hoạch sử dụng đất.",
      schema: [
        { col: "MA_QUY_HOACH", type: "VARCHAR(50)", pk: true, fk: false, masked: false, desc: "Mã hồ sơ quy hoạch" },
        { col: "TEN_QUY_HOACH", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Tên quy hoạch được duyệt" },
        { col: "SO_QD_PHE_DUYET", type: "NVARCHAR(100)", pk: false, fk: false, masked: false, desc: "QĐ số 318/QĐ-TTg ngày 29/03/2023" },
        { col: "LINK_BAN_DO_GIS", type: "VARCHAR(500)", pk: false, fk: false, masked: false, desc: "Liên kết lớp không gian WMS" }
      ],
      sampleRows: [
        { c1: "QH-TINH-318", c2: "Quy hoạch tỉnh Khánh Hòa thời kỳ 2021-2030, tầm nhìn 2050", c3: "318/QĐ-TTg (29/03/2023)", c4: "Thủ tướng CP", c5: "---", c6: "Toàn tỉnh (GIS Live)", c7: "Có hiệu lực" },
        { c1: "QH-KKT-VP-2023", c2: "Điều chỉnh Quy hoạch chung xây dựng KKT Vân Phong đến 2040", c3: "451/QĐ-TTg (27/03/2023)", c4: "Thủ tướng CP", c5: "---", c6: "150.000 ha", c7: "Có hiệu lực" }
      ]
    },
    {
      code: "MD.CHUNG_CHI_HANH_NGHE_DAU_THAU_TDG",
      name: "Danh bạ Thẩm định viên về giá & Chứng chỉ Đấu thầu",
      group: "2. Đầu tư công & Quy hoạch",
      provider: "Cục Quản lý Giá (Bộ Tài chính) & Mạng Đấu thầu QG",
      recordsCount: "597",
      frequency: "Hằng tuần / Khi phát sinh",
      ddmMasked: "CCCD / Ngày sinh",
      description: "Thẻ Thẩm định viên về giá đủ điều kiện hành nghề (Luật Giá 2023) và chứng chỉ hành nghề đấu thầu.",
      schema: [
        { col: "MA_CHUNG_CHI", type: "VARCHAR(50)", pk: true, fk: false, masked: false, desc: "Số thẻ Thẩm định viên / Số CC Đấu thầu" },
        { col: "HO_VA_TEN", type: "NVARCHAR(255)", pk: false, fk: false, masked: false, desc: "Họ và tên cá nhân hành nghề" },
        { col: "LOAI_CHUNG_CHI", type: "VARCHAR(100)", pk: false, fk: false, masked: false, desc: "Thẻ TĐV về giá / CC Đấu thầu" },
        { col: "DON_VI_CONG_TAC", type: "NVARCHAR(500)", pk: false, fk: true, masked: false, desc: "Doanh nghiệp TĐG / Đơn vị tư vấn" }
      ],
      sampleRows: [
        { c1: "TDV-BTC-08241", c2: "Nguyễn Thành Long", c3: "Thẻ Thẩm định viên về giá (BTC)", c4: "Công ty TNHH Thẩm định giá Khánh Hòa", c5: "---", c6: "Còn hiệu lực", c7: "Đủ điều kiện" },
        { c1: "CCHN-ĐT-0912", c2: "Phan Văn Minh", c3: "Chứng chỉ hành nghề Đấu thầu (BKHĐT)", c4: "Công ty CP Tư vấn Đầu tư Xây dựng Nam Trung Bộ", c5: "---", c6: "Còn hiệu lực", c7: "Đủ điều kiện" }
      ]
    },

    // NHÓM 3: TÀI SẢN CÔNG & GIÁ
    {
      code: "MD.TAI_SAN_CONG_DIA_PHUONG",
      name: "CSDL Quản lý Tài sản công địa phương",
      group: "3. Tài sản công & Giá",
      provider: "CSDL Quốc gia về Tài sản công (Cục QL Công sản - BTC)",
      recordsCount: "3.820",
      frequency: "Hằng tháng / Hằng quý",
      ddmMasked: "Không",
      description: "Danh mục trụ sở làm việc, quyền sử dụng đất, xe ô tô công vụ và tài sản máy móc thiết bị trên 500 triệu.",
      schema: [
        { col: "MA_TAI_SAN", type: "VARCHAR(50)", pk: true, fk: false, masked: false, desc: "Mã tài sản công chuẩn hóa" },
        { col: "TEN_TAI_SAN", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Tên tài sản công" },
        { col: "LOAI_TAI_SAN", type: "VARCHAR(50)", pk: false, fk: false, masked: false, desc: "Đất, Nhà/Trụ sở, Xe ô tô, Máy móc" },
        { col: "DON_VI_QUAN_LY", type: "NVARCHAR(500)", pk: false, fk: true, masked: false, desc: "Cơ quan/Đơn vị trực tiếp quản lý" },
        { col: "NGUYEN_GIA_SO_SACH", type: "DECIMAL(18,2)", pk: false, fk: false, masked: false, desc: "Nguyên giá theo sổ sách kế toán (VNĐ)" }
      ],
      sampleRows: [
        { c1: "TSC-001", c2: "Trụ sở Sở Tài chính tỉnh Khánh Hòa", c3: "Nhà & Đất trụ sở", c4: "Sở Tài chính", c5: "---", c6: "185.000.000.000 đ", c7: "Đang sử dụng" },
        { c1: "TSC-002", c2: "Xe ô tô 7 chỗ phục vụ công tác chung", c3: "Xe ô tô công vụ (79A-002.34)", c4: "Văn phòng UBND tỉnh", c5: "---", c6: "1.150.000.000 đ", c7: "Đang sử dụng" }
      ]
    },
    {
      code: "MD.CO_SO_NHA_DAT_CONG",
      name: "Cơ sở Nhà đất công sắp xếp lại (NĐ 167 & NĐ 67)",
      group: "3. Tài sản công & Giá",
      provider: "Phòng Quản lý Giá và Công sản (STC Khánh Hòa)",
      recordsCount: "1.840",
      frequency: "Hằng quý / Theo đợt phê duyệt",
      ddmMasked: "Không",
      description: "Danh mục 1.840 cơ sở nhà đất công thuộc diện sắp xếp lại, xử lý theo Nghị định số 167/2017/NĐ-CP và NĐ 67/2021/NĐ-CP.",
      schema: [
        { col: "MA_CO_SO_NHA_DAT", type: "VARCHAR(50)", pk: true, fk: false, masked: false, desc: "Mã định danh cơ sở nhà đất" },
        { col: "DIA_CHI_NHA_DAT", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Địa chỉ cụ thể nhà đất công" },
        { col: "DIEN_TICH_DAT_M2", type: "DECIMAL(18,2)", pk: false, fk: false, masked: false, desc: "Diện tích khuôn viên đất (m²)" },
        { col: "PHUONG_AN_SAP_XEP", type: "VARCHAR(100)", pk: false, fk: false, masked: false, desc: "Giữ lại tiếp tục sử dụng / Bán đấu giá / Điều chuyển" }
      ],
      sampleRows: [
        { c1: "CSND-NTR-001", c2: "Số 26 đường Trần Phú, Phường Nha Trang", c3: "Khuôn viên 4.250 m²", c4: "Sở Giáo dục và Đào tạo", c5: "---", c6: "Giữ lại sử dụng", c7: "Đã duyệt PA" },
        { c1: "CSND-CR-002", c2: "Số 18 đường Hùng Vương, Phường Cam Ranh", c3: "Khuôn viên 1.800 m²", c4: "Trung tâm Dạy nghề Cam Ranh cũ", c5: "---", c6: "Bán đấu giá tài sản", c7: "Chờ phê duyệt" }
      ]
    },
    {
      code: "MD.TAI_SAN_KET_CAU_HA_TANG",
      name: "Tài sản Kết cấu Hạ tầng (Giao thông, Thủy lợi, Cấp nước)",
      group: "3. Tài sản công & Giá",
      provider: "Sở Xây dựng & Sở Nông nghiệp và Môi trường",
      recordsCount: "640",
      frequency: "Hằng năm",
      ddmMasked: "Không",
      description: "CSDL tài sản kết cấu hạ tầng đường bộ, cầu cống, đê kè, hồ chứa thủy lợi và công trình cấp nước sạch nông thôn.",
      schema: [
        { col: "MA_HA_TANG", type: "VARCHAR(50)", pk: true, fk: false, masked: false, desc: "Mã công trình hạ tầng" },
        { col: "TEN_CONG_TRINH", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Tên tài sản hạ tầng" },
        { col: "LOAI_HA_TANG", type: "VARCHAR(100)", pk: false, fk: false, masked: false, desc: "Hạ tầng Giao thông / Thủy lợi / Cấp nước" }
      ],
      sampleRows: [
        { c1: "HTGT-DT657I", c2: "Tuyến đường tỉnh ĐT.657I kết nối KKT Vân Phong", c3: "Hạ tầng đường bộ", c4: "Sở Xây dựng", c5: "---", c6: "950.000.000.000 đ", c7: "Vận hành tốt" }
      ]
    },
    {
      code: "MD.BANG_GIA_DAT_TINH",
      name: "Khung và Bảng giá các loại đất tỉnh Khánh Hòa",
      group: "3. Tài sản công & Giá",
      provider: "UBND tỉnh Khánh Hòa & Sở Nông nghiệp và Môi trường",
      recordsCount: "8.420",
      frequency: "Hằng năm theo Luật Đất đai 2024",
      ddmMasked: "Không",
      description: "Bảng giá đất ở, đất thương mại dịch vụ, đất sản xuất phi nông nghiệp và đất nông nghiệp trên toàn bộ tuyến đường.",
      schema: [
        { col: "MA_TUYEN_DUONG", type: "VARCHAR(50)", pk: true, fk: false, masked: false, desc: "Mã đoạn đường / khu vực" },
        { col: "TEN_DUONG_DOAN_DUONG", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Tên tuyến đường và đoạn phân rã giá" },
        { col: "LOAI_DAT", type: "VARCHAR(50)", pk: false, fk: false, masked: false, desc: "Đất ở đô thị / Đất ở nông thôn / TMDV" },
        { col: "GIA_VI_TRI_1", type: "DECIMAL(18,2)", pk: false, fk: false, masked: false, desc: "Mức giá vị trí 1 (đồng/m²)" }
      ],
      sampleRows: [
        { c1: "DAT-NTR-TP-01", c2: "Đường Trần Phú (Đoạn từ Cầu Trần Phú đến Biệt Thự)", c3: "Đất ở đô thị (Vị trí 1)", c4: "UBND phường Nha Trang", c5: "---", c6: "350.000.000 đ/m²", c7: "Áp dụng 2026" }
      ]
    },
    {
      code: "MD.BANG_GIA_NHA_VAT_KIEN_TRUC",
      name: "Bảng giá xây dựng mới Nhà, Công trình, Vật kiến trúc",
      group: "3. Tài sản công & Giá",
      provider: "Sở Xây dựng tỉnh Khánh Hòa",
      recordsCount: "450",
      frequency: "Hằng năm / Khi có biến động",
      ddmMasked: "Không",
      description: "Đơn giá bồi thường, hỗ trợ tái định cư và tính lệ phí trước bạ nhà xây dựng mới theo QĐ của UBND tỉnh.",
      schema: [
        { col: "MA_LOAI_NHA", type: "VARCHAR(50)", pk: true, fk: false, masked: false, desc: "Mã cấp nhà / công trình" },
        { col: "TEN_CAP_CONG_TRINH", type: "NVARCHAR(300)", pk: false, fk: false, masked: false, desc: "Nhà cấp 1, cấp 2, cấp 3, cấp 4" },
        { col: "DON_GIA_XAY_DUNG_M2", type: "DECIMAL(18,2)", pk: false, fk: false, masked: false, desc: "Đơn giá xây dựng mới (đồng/m² sàn)" }
      ],
      sampleRows: [
        { c1: "NHA-CAP-2A", c2: "Nhà biệt thự kiên cố bê tông cốt thép > 3 tầng", c3: "Nhà cấp 2A", c4: "Sở Xây dựng", c5: "---", c6: "11.850.000 đ/m²", c7: "Áp dụng 2026" }
      ]
    },

    // NHÓM 4: ĐVSNCL, DNNN & QUỸ TÀI CHÍNH
    {
      code: "MD.DON_VI_SU_NGHIEP_CONG_LAP",
      name: "Danh mục 542 Đơn vị Sự nghiệp Công lập tự chủ (NĐ 60)",
      group: "4. ĐVSNCL & Quỹ tài chính",
      provider: "Phòng Tài chính Hành chính sự nghiệp (Sở Tài chính Khánh Hòa)",
      recordsCount: "542",
      frequency: "Hằng năm / Theo thời kỳ ổn định 5 năm",
      ddmMasked: "Không",
      description: "542 đơn vị sự nghiệp công lập phân loại tự chủ tài chính theo 4 nhóm quy định tại Nghị định số 60/2021/NĐ-CP.",
      schema: [
        { col: "MA_DVSNCL", type: "VARCHAR(30)", pk: true, fk: false, masked: false, desc: "Mã ĐVSNCL (Mã QHNS)" },
        { col: "TEN_DON_VI", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Tên trường học, bệnh viện, trung tâm" },
        { col: "NHOM_TU_CHU", type: "VARCHAR(50)", pk: false, fk: false, masked: false, desc: "Nhóm 1 (Toàn phần), Nhóm 2, Nhóm 3, Nhóm 4" },
        { col: "KINH_PHI_NS_HO_TRO", type: "DECIMAL(18,2)", pk: false, fk: false, masked: false, desc: "Kinh phí chi thường xuyên giao tự chủ" }
      ],
      sampleRows: [
        { c1: "SNCL-79-001", c2: "Bệnh viện Đa khoa tỉnh Khánh Hòa", c3: "Y tế cấp tỉnh", c4: "Nhóm 2 (Tự bảo đảm chi thường xuyên)", c5: "---", c6: "Tự chủ 100%", c7: "Ổn định 2022-2026" },
        { c1: "SNCL-79-002", c2: "Trường THPT Chuyên Lê Quý Đôn", c3: "Giáo dục THPT", c4: "Nhóm 4 (Nhà nước bảo đảm 100% kinh phí)", c5: "---", c6: "18.500.000.000 đ", c7: "Ổn định 2022-2026" }
      ]
    },
    {
      code: "MD.DOANH_NGHIEP_NHA_NUOC_VON_NN",
      name: "Doanh nghiệp Nhà nước & Doanh nghiệp có vốn Nhà nước",
      group: "4. ĐVSNCL & Quỹ tài chính",
      provider: "Phòng Quản lý Doanh nghiệp (STC Khánh Hòa)",
      recordsCount: "24",
      frequency: "Hằng quý / Báo cáo tài chính năm",
      ddmMasked: "Không",
      description: "Danh mục DNNN nắm giữ 100% vốn điều lệ và doanh nghiệp có vốn góp nhà nước do UBND tỉnh đại diện chủ sở hữu.",
      schema: [
        { col: "MA_DNNN", type: "VARCHAR(20)", pk: true, fk: false, masked: false, desc: "Mã số thuế DNNN" },
        { col: "TEN_DOANH_NGHIEP", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Tên DNNN / Công ty TNHH MTV" },
        { col: "TY_LE_VON_NHA_NUOC", type: "DECIMAL(5,2)", pk: false, fk: false, masked: false, desc: "Tỷ lệ sở hữu vốn nhà nước (100%, 51%...)" }
      ],
      sampleRows: [
        { c1: "4200429779", c2: "Công ty TNHH MTV Yến Sào Khánh Hòa", c3: "Doanh nghiệp 100% vốn Nhà nước", c4: "UBND tỉnh đại diện CSH", c5: "---", c6: "Vốn NN: 100%", c7: "Bảo toàn vốn tốt" }
      ]
    },
    {
      code: "MD.QUY_TAI_CHINH_NGOAI_NGAN_SACH",
      name: "Danh bạ các Quỹ Tài chính Nhà nước ngoài Ngân sách",
      group: "4. ĐVSNCL & Quỹ tài chính",
      provider: "Sở Tài chính & Ban Điều hành các Quỹ địa phương",
      recordsCount: "14",
      frequency: "Hằng quý / Hằng năm",
      ddmMasked: "Không",
      description: "Quỹ Đầu tư Phát triển, Quỹ Phát triển đất, Quỹ Bảo vệ Môi trường, Quỹ Hỗ trợ Nông dân...",
      schema: [
        { col: "MA_QUY", type: "VARCHAR(30)", pk: true, fk: false, masked: false, desc: "Mã định danh quỹ ngoài ngân sách" },
        { col: "TEN_QUY", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Tên Quỹ tài chính nhà nước" },
        { col: "VON_DIEU_LE_DUOC_CAP", type: "DECIMAL(18,2)", pk: false, fk: false, masked: false, desc: "Vốn điều lệ ngân sách tỉnh đã cấp" }
      ],
      sampleRows: [
        { c1: "QUY-DTPT-KH", c2: "Quỹ Đầu tư Phát triển tỉnh Khánh Hòa", c3: "Quỹ Tài chính ngoài NS", c4: "UBND tỉnh", c5: "---", c6: "Vốn: 850.000.000.000 đ", c7: "Hoạt động tốt" }
      ]
    },

    // NHÓM 5: DANH MỤC CHUẨN HÓA & KHO BẠC
    {
      code: "MD.DANH_MUC_MUC_LUC_NSNN",
      name: "Mục lục Ngân sách Nhà nước (MLNS)",
      group: "5. Danh mục Chuẩn hóa & Kho bạc",
      provider: "Thông tư số 324/2016/TT-BTC (Bộ Tài chính)",
      recordsCount: "3.450",
      frequency: "Chuẩn quốc gia",
      ddmMasked: "Không",
      description: "Hệ thống phân loại mục lục NSNN gồm Chương, Loại, Khoản, Mục, Tiểu mục thu chi ngân sách.",
      schema: [
        { col: "MA_TIEU_MUC", type: "VARCHAR(20)", pk: true, fk: false, masked: false, desc: "Mã tiểu mục thu/chi" },
        { col: "TEN_TIEU_MUC", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Tên chi tiết nội dung kinh tế" },
        { col: "MA_MUC", type: "VARCHAR(10)", pk: false, fk: true, masked: false, desc: "Mã mục cha" }
      ],
      sampleRows: [
        { c1: "1001", c2: "Thuế TNDN từ các doanh nghiệp nhà nước địa phương", c3: "Thuế TNDN (Mục 1000)", c4: "Kho bạc Nhà nước", c5: "---", c6: "Thu NSNN", c7: "Chuẩn BTC" }
      ]
    },
    {
      code: "MD.DANH_MUC_DIA_BAN_HANH_CHINH",
      name: "Danh mục Địa bàn Hành chính (Tỉnh, Xã/Phường/Đặc khu)",
      group: "5. Danh mục Chuẩn hóa & Kho bạc",
      provider: "Sở Nội vụ tỉnh Khánh Hòa & Tổng cục Thống kê",
      recordsCount: "66",
      frequency: "NQ 1667/NQ-UBTVQH15",
      ddmMasked: "Không",
      description: "65 đơn vị hành chính cấp xã (48 xã, 16 phường, 01 đặc khu) trực thuộc tỉnh Khánh Hòa theo Nghị quyết số 1667/NQ-UBTVQH15.",
      schema: [
        { col: "MA_DIA_BAN", type: "VARCHAR(20)", pk: true, fk: false, masked: false, desc: "Mã địa bàn hành chính chuẩn hóa" },
        { col: "TEN_DIA_BAN", type: "NVARCHAR(255)", pk: false, fk: false, masked: false, desc: "Tên đơn vị hành chính" },
        { col: "CAP_HANH_CHINH", type: "VARCHAR(20)", pk: false, fk: false, masked: false, desc: "Cấp Tỉnh / Cấp Xã, Phường, Đặc khu (Chính quyền 2 cấp)" }
      ],
      sampleRows: [
        { c1: "79", c2: "Tỉnh Khánh Hòa", c3: "Cấp Tỉnh", c4: "Trung ương", c5: "---", c6: "Mã Vùng 79", c7: "Chuẩn TCTK" },
        { c1: "KH65_49", c2: "Phường Nha Trang", c3: "Cấp Xã (Phường)", c4: "Tỉnh Khánh Hòa", c5: "---", c6: "STT 49 / 65 Đơn vị", c7: "NQ 1667" }
      ]
    },
    {
      code: "MD.DANH_MUC_HANG_HOA_DICH_VU_THI_TRUONG",
      name: "Danh mục Hàng hóa, Dịch vụ khảo sát giá thị trường",
      group: "5. Danh mục Chuẩn hóa & Kho bạc",
      provider: "Cục Quản lý Giá (Bộ Tài chính) & Phòng Giá STC",
      recordsCount: "680",
      frequency: "Hằng tháng",
      ddmMasked: "Không",
      description: "Danh mục vật liệu xây dựng (xi măng, sắt thép, cát đá) và hàng hóa thiết yếu phục vụ thẩm định giá dự toán.",
      schema: [
        { col: "MA_HANG_HOA", type: "VARCHAR(50)", pk: true, fk: false, masked: false, desc: "Mã hàng hóa chuẩn hóa" },
        { col: "TEN_HANG_HOA", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Tên mặt hàng/quy cách" },
        { col: "DON_VI_TINH", type: "VARCHAR(50)", pk: false, fk: false, masked: false, desc: "Tấn, m³, kg, lít..." }
      ],
      sampleRows: [
        { c1: "VLXD-THEP-CB400", c2: "Thép xây dựng Hòa Phát D10-D32 (CB400)", c3: "Vật liệu xây dựng", c4: "Tấn", c5: "---", c6: "14.850.000 đ/tấn", c7: "Khảo sát tháng 8" }
      ]
    },
    {
      code: "MD.DANH_MUC_DON_VI_THU_HUONG_KHO_BAC",
      name: "Danh mục Đơn vị thụ hưởng mở tài khoản tại KBNN",
      group: "5. Danh mục Chuẩn hóa & Kho bạc",
      provider: "Kho bạc Nhà nước Khu vực XIV (Khánh Hòa)",
      recordsCount: "1.650",
      frequency: "Real-time liên thông",
      ddmMasked: "Không",
      description: "Danh bạ tài khoản giao dịch của các chủ đầu tư, ban quản lý dự án, đơn vị dự toán mở tại Kho bạc.",
      schema: [
        { col: "SO_TAI_KHOAN_KB", type: "VARCHAR(30)", pk: true, fk: false, masked: false, desc: "Số tài khoản giao dịch KBNN" },
        { col: "TEN_DON_VI_MO_TK", type: "NVARCHAR(500)", pk: false, fk: true, masked: false, desc: "Tên đơn vị đứng tên tài khoản" }
      ],
      sampleRows: [
        { c1: "3713.0.1056421", c2: "Sở Tài chính tỉnh Khánh Hòa - TK Chi thường xuyên", c3: "KBNN Tỉnh Khánh Hòa", c4: "TK Dự toán", c5: "---", c6: "Hoạt động", c7: "Khớp 100%" }
      ]
    },
    {
      code: "MD.DANH_MUC_SAC_THUE_KHOAN_THU",
      name: "Danh mục Sắc thuế và Khoản thu Ngân sách",
      group: "5. Danh mục Chuẩn hóa & Kho bạc",
      provider: "Tổng cục Thuế (Hệ thống TMS)",
      recordsCount: "185",
      frequency: "Chuẩn quốc gia",
      ddmMasked: "Không",
      description: "Thuế GTGT, Thuế TNDN, Thuế TNCN, Lệ phí trước bạ, Tiền sử dụng đất, Tiền thuê mặt đất mặt nước...",
      schema: [
        { col: "MA_SAC_THUE", type: "VARCHAR(20)", pk: true, fk: false, masked: false, desc: "Mã định danh sắc thuế" },
        { col: "TEN_SAC_THUE", type: "NVARCHAR(300)", pk: false, fk: false, masked: false, desc: "Tên loại thuế/khoản thu" }
      ],
      sampleRows: [
        { c1: "THUE-GTGT", c2: "Thuế Giá trị Gia tăng", c3: "Thuế nội địa", c4: "Cục Thuế tỉnh", c5: "---", c6: "Chỉ tiêu HĐND giao", c7: "Chuẩn TCT" }
      ]
    },
    {
      code: "MD.DANH_MUC_NGUON_VON_DAU_TU",
      name: "Danh mục Nguồn vốn Đầu tư công",
      group: "5. Danh mục Chuẩn hóa & Kho bạc",
      provider: "Bộ Kế hoạch & Đầu tư / Vụ Đầu tư Bộ Tài chính",
      recordsCount: "42",
      frequency: "Chuẩn quốc gia",
      ddmMasked: "Không",
      description: "Vốn ngân sách trung ương, Vốn ngân sách cấp tỉnh, Vốn ngân sách cấp xã/phường/đặc khu, Vốn ODA, Vốn vay lại...",
      schema: [
        { col: "MA_NGUON_VON", type: "VARCHAR(20)", pk: true, fk: false, masked: false, desc: "Mã nguồn vốn" },
        { col: "TEN_NGUON_VON", type: "NVARCHAR(300)", pk: false, fk: false, masked: false, desc: "Tên nguồn vốn đầu tư" }
      ],
      sampleRows: [
        { c1: "NV-NSTW", c2: "Vốn Ngân sách Trung ương hỗ trợ theo ngành lĩnh vực", c3: "Nguồn NSTW", c4: "Bộ Tài chính", c5: "---", c6: "Vốn ĐTC", c7: "Chuẩn BTC" }
      ]
    },

    // NHÓM 6: PHÁP CHẾ, CHIA SẺ & CHỈ TIÊU VĨ MÔ
    {
      code: "MD.VAN_BAN_QPPL_TAI_CHINH",
      name: "CSDL 342 Văn bản QPPL & Nghị quyết 55/2022/QH15",
      group: "6. Pháp chế & Chỉ tiêu vĩ mô",
      provider: "Phòng Pháp chế (STC Khánh Hòa)",
      recordsCount: "342",
      frequency: "Khi có ban hành VB mới",
      ddmMasked: "Không",
      description: "Toàn bộ 342 văn bản quy phạm pháp luật tài chính, Nghị quyết HĐND và cơ chế đặc thù NQ 55 của Quốc hội.",
      schema: [
        { col: "MA_VAN_BAN", type: "VARCHAR(50)", pk: true, fk: false, masked: false, desc: "Số hiệu văn bản pháp quy" },
        { col: "TRICH_YEU_NOI_DUNG", type: "NVARCHAR(1000)", pk: false, fk: false, masked: false, desc: "Trích yếu nội dung văn bản" },
        { col: "CO_QUAN_BAN_HANH", type: "NVARCHAR(300)", pk: false, fk: false, masked: false, desc: "Quốc hội / HĐND tỉnh / UBND tỉnh" }
      ],
      sampleRows: [
        { c1: "NQ-55/2022/QH15", c2: "Nghị quyết của Quốc hội về thí điểm một số cơ chế, chính sách đặc thù phát triển tỉnh Khánh Hòa", c3: "Quốc hội khóa XV", c4: "Cơ chế tài chính đặc thù", c5: "---", c6: "Toàn văn PDF", c7: "Đang thi hành" }
      ]
    },
    {
      code: "MD.DANH_MUC_DOITAC_CHIASE_DAAS",
      name: "Danh mục Cơ quan, Đối tác Khai thác Dữ liệu (DaaS)",
      group: "6. Pháp chế & Chỉ tiêu vĩ mô",
      provider: "Trung tâm CNTT & Dữ liệu Kinh tế STC",
      recordsCount: "18",
      frequency: "Khi cấp API Key mới",
      ddmMasked: "API Key (Masked)",
      description: "Danh bạ các sở, ban, ngành, Trung tâm IOC tỉnh, UBND các xã, phường, đặc khu được cấp quyền truy xuất API DaaS.",
      schema: [
        { col: "MA_DOI_TAC", type: "VARCHAR(30)", pk: true, fk: false, masked: false, desc: "Mã đối tác sử dụng DaaS" },
        { col: "TEN_CO_QUAN", type: "NVARCHAR(500)", pk: false, fk: false, masked: false, desc: "Tên cơ quan, đơn vị khai thác" }
      ],
      sampleRows: [
        { c1: "PARTNER-IOC-TINH", c2: "Trung tâm Giám sát Điều hành Đô thị Thông minh (IOC tỉnh)", c3: "Full DaaS Scope", c4: "UBND tỉnh", c5: "---", c6: "Không giới hạn", c7: "Active" }
      ]
    },
    {
      code: "MD.DANH_MUC_CHI_TIEU_KINH_TE_XA_HOI",
      name: "Danh mục Chỉ tiêu Thống kê Kinh tế - Xã hội tỉnh",
      group: "6. Pháp chế & Chỉ tiêu vĩ mô",
      provider: "Cục Thống kê tỉnh Khánh Hòa",
      recordsCount: "128",
      frequency: "Hằng tháng / Hằng quý / Hằng năm",
      ddmMasked: "Không",
      description: "Hệ thống chỉ tiêu GRDP, thu nhập bình quân, chỉ số CPI, kim ngạch XNK, thu hút khách du lịch...",
      schema: [
        { col: "MA_CHI_TIEU", type: "VARCHAR(30)", pk: true, fk: false, masked: false, desc: "Mã chỉ tiêu thống kê" },
        { col: "TEN_CHI_TIEU", type: "NVARCHAR(300)", pk: false, fk: false, masked: false, desc: "Tên chỉ tiêu kinh tế - xã hội" }
      ],
      sampleRows: [
        { c1: "CT-GRDP-01", c2: "Tốc độ tăng trưởng Tổng sản phẩm trên địa bàn (GRDP)", c3: "Chỉ tiêu vĩ mô", c4: "Cục Thống kê", c5: "---", c6: "% tăng trưởng", c7: "Kỳ báo cáo 2026" }
      ]
    },
    {
      code: "MD.DANH_MUC_LOAI_TAI_KHOAN_KHO_BAC",
      name: "Danh mục Tài khoản Kế toán Nhà nước KBNN",
      group: "6. Pháp chế & Chỉ tiêu vĩ mô",
      provider: "Kho bạc Nhà nước (Hệ thống TABMIS)",
      recordsCount: "96",
      frequency: "Chuẩn quốc gia",
      ddmMasked: "Không",
      description: "Tài khoản 7111 (Thu NSNN), 7113 (Thu tạm giữ), 3713 (Tiền gửi dự toán), 8993 (Thanh toán song phương)...",
      schema: [
        { col: "MA_TAI_KHOAN_KT", type: "VARCHAR(20)", pk: true, fk: false, masked: false, desc: "Số hiệu tài khoản kế toán KBNN" },
        { col: "TEN_TAI_KHOAN_KT", type: "NVARCHAR(300)", pk: false, fk: false, masked: false, desc: "Tên nội dung tài khoản" }
      ],
      sampleRows: [
        { c1: "7111", c2: "Tài khoản Thu Ngân sách Nhà nước", c3: "Tài khoản KBNN", c4: "KBNN", c5: "---", c6: "Tài khoản hạch toán", c7: "Chuẩn KBNN" }
      ]
    }
  ],

  init() {
    this.renderMasterDataManagement('mdmMainCard');
  },

  renderMasterDataManagement(containerId = 'mdmMainCard') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <!-- TOP NAVIGATION TABS -->
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header" style="padding-bottom: 12px;">
          <div>
            <h3 class="card-title"><i data-lucide="layers"></i> Quản trị cơ sở dữ liệu chủ (MDM)</h3>
            <p class="card-subtitle">Chuẩn hóa danh mục dùng chung và kiểm soát bảo mật theo Nghị định 356/2025/NĐ-CP</p>
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-secondary btn-sm" onclick="MdmCatalogManager.exportMdmCatalog()">
              <i data-lucide="download"></i> Xuất từ điển dữ liệu
            </button>
          </div>
        </div>

        <div class="tabs-nav" id="mdmViewTabs">
          <button class="tab-btn ${this.activeView === 'catalog' ? 'active' : ''}" onclick="MdmCatalogManager.switchActiveView('catalog', this)">
            <i data-lucide="table"></i> 1. Danh mục dữ liệu chủ
          </button>
          <button class="tab-btn ${this.activeView === 'viewer' ? 'active' : ''}" onclick="MdmCatalogManager.switchActiveView('viewer', this)">
            <i data-lucide="eye"></i> 2. Cấu trúc bảng & Dữ liệu mẫu
          </button>
          <button class="tab-btn ${this.activeView === 'dictionary' ? 'active' : ''}" onclick="MdmCatalogManager.switchActiveView('dictionary', this)">
            <i data-lucide="book-open"></i> 3. Từ điển dữ liệu
          </button>
        </div>
      </div>

      <!-- DYNAMIC SUB-VIEW CONTAINER -->
      <div id="mdmDynamicSubContainer"></div>
    `;

    this.renderCurrentMdmSubView();
    if (window.lucide) window.lucide.createIcons();
  },

  switchActiveView(viewName, btn) {
    this.activeView = viewName;
    document.querySelectorAll('#mdmViewTabs .tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderCurrentMdmSubView();
  },

  renderCurrentMdmSubView() {
    const container = document.getElementById('mdmDynamicSubContainer');
    if (!container) return;

    if (this.activeView === 'catalog') {
      container.innerHTML = this.renderCatalogListView();
    } else if (this.activeView === 'viewer') {
      container.innerHTML = this.renderTableDetailViewer();
    } else if (this.activeView === 'dictionary') {
      container.innerHTML = `
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="book-open"></i> Từ điển Siêu dữ liệu (Data Dictionary) & Bảo vệ Dữ liệu Cá nhân</h3>
              <p class="card-subtitle">Chuẩn hóa ngữ nghĩa dữ liệu theo Quyết định số 1323/QĐ-BTC và Nghị định 356/2025/NĐ-CP</p>
            </div>
            <span class="badge badge-success">Data Privacy Compliance</span>
          </div>
          <div class="table-container" id="catalogGlossaryContainer"></div>
        </div>
      `;
      this.renderDataCatalogGlossary();
    }

    if (window.lucide) window.lucide.createIcons();
  },

  // -------------------------------------------------------------
  // 1. DANH MỤC TỔNG THỂ 26 BẢNG DỮ LIỆU CHỦ (MASTER CATALOG)
  // -------------------------------------------------------------
  renderCatalogListView() {
    let tables = this.masterTables;
    if (this.currentGroup !== 'ALL') {
      tables = tables.filter(t => t.group.includes(this.currentGroup));
    }
    if (this.searchKeyword) {
      const kw = this.searchKeyword.toLowerCase();
      tables = tables.filter(t => t.code.toLowerCase().includes(kw) || t.name.toLowerCase().includes(kw) || t.provider.toLowerCase().includes(kw));
    }

    return `
      <div class="card">
        <!-- FILTER & SEARCH BAR -->
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;">
          <div style="display: flex; gap: 8px; flex: 1; min-width: 280px;">
            <input type="text" class="form-control" placeholder="Tìm bảng theo Mã CSDL, Tên bảng, Đơn vị cung cấp..." value="${this.searchKeyword}" oninput="MdmCatalogManager.handleMdmSearch(event)" />
            <select class="form-control" style="width: 260px;" onchange="MdmCatalogManager.handleMdmGroupFilter(this.value)">
              <option value="ALL">Tất cả 6 nhóm nghiệp vụ (26 Bảng)</option>
              <option value="1. Doanh nghiệp">1. Doanh nghiệp & Hộ KD, HTX</option>
              <option value="2. Đầu tư công">2. Đầu tư công & Quy hoạch</option>
              <option value="3. Tài sản công">3. Tài sản công & Giá</option>
              <option value="4. ĐVSNCL">4. ĐVSNCL & Quỹ tài chính</option>
              <option value="5. Danh mục">5. Chuẩn hóa & Kho bạc</option>
              <option value="6. Pháp chế">6. Pháp chế & Chỉ tiêu vĩ mô</option>
            </select>
          </div>
          <div style="font-size: 12.5px; color: #64748b;">
            Hiển thị <strong>${tables.length} / ${this.masterTables.length}</strong> bảng dữ liệu chủ
          </div>
        </div>

        <!-- 26 TABLES MASTER DIRECTORY -->
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 40px;">STT</th>
                <th style="width: 190px;">Mã Bảng Master Data</th>
                <th style="min-width: 240px;">Tên Bảng Dữ Liệu Chủ</th>
                <th>Nhóm Nghiệp Vụ</th>
                <th>Cơ Quan Cung Cấp / CSDL Nguồn</th>
                <th style="text-align: right;">Số Bản Ghi</th>
                <th>Tần Suất Nạp</th>
                <th>Bảo Vệ DDM</th>
                <th style="width: 110px; text-align: center;">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              ${tables.map((t, idx) => `
                <tr>
                  <td style="text-align: center; color: #94a3b8; font-size: 11px;">${idx + 1}</td>
                  <td><code style="font-weight: 700; color: #0284c7; font-size: 11px;">${t.code}</code></td>
                  <td>
                    <div style="font-weight: 700; color: var(--text-pure); font-size: 13px;">${t.name}</div>
                    <div style="font-size: 11px; color: #64748b;">${t.description}</div>
                  </td>
                  <td><span class="badge badge-purple" style="font-size: 10px;">${t.group}</span></td>
                  <td style="font-size: 11.5px; color: #334155;">${t.provider}</td>
                  <td style="text-align: right; font-weight: 700; color: #15803d;">${t.recordsCount}</td>
                  <td style="font-size: 11px; color: #64748b;">${t.frequency}</td>
                  <td>
                    <span class="badge ${t.ddmMasked.includes('Masked') ? 'badge-warning' : 'badge-info'}" style="font-size: 9.5px;">
                      ${t.ddmMasked}
                    </span>
                  </td>
                  <td style="text-align: center;">
                    <button class="btn btn-primary btn-sm" onclick="MdmCatalogManager.viewTableDetail('${t.code}')" style="padding: 4px 8px; font-size: 11px;">
                      <i data-lucide="eye"></i> Xem Schema
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  handleMdmSearch(e) {
    this.searchKeyword = e.target.value;
    const container = document.getElementById('mdmDynamicSubContainer');
    if (container && this.activeView === 'catalog') {
      container.innerHTML = this.renderCatalogListView();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  handleMdmGroupFilter(val) {
    this.currentGroup = val;
    const container = document.getElementById('mdmDynamicSubContainer');
    if (container && this.activeView === 'catalog') {
      container.innerHTML = this.renderCatalogListView();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  viewTableDetail(tableCode) {
    this.currentTableCode = tableCode;
    this.activeView = 'viewer';
    document.querySelectorAll('#mdmViewTabs .tab-btn').forEach(b => b.classList.remove('active'));
    const viewerBtn = document.querySelectorAll('#mdmViewTabs .tab-btn')[1];
    if (viewerBtn) viewerBtn.classList.add('active');
    this.renderCurrentMdmSubView();
  },

  // -------------------------------------------------------------
  // 2. TRÌNH DUYỆT SCHEMA & DỮ LIỆU MẪU CỦA BẢNG ĐƯỢC CHỌN
  // -------------------------------------------------------------
  renderTableDetailViewer() {
    const table = this.masterTables.find(t => t.code === this.currentTableCode) || this.masterTables[0];
    const isMasked = (App.currentUser.role !== 'LEAD');

    return `
      <div class="card">
        <!-- HEADER SELECTOR -->
        <div class="card-header" style="flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
              <code style="font-size: 14px; font-weight: 700; color: #0284c7;">${table.code}</code>
              <span class="badge badge-purple">${table.group}</span>
              <span class="badge ${isMasked ? 'badge-warning' : 'badge-success'}">
                ${isMasked ? '<i class="status-dot"></i> DDM Masked (Chuyên viên)' : '<i class="status-dot"></i> Unmasked (Lãnh đạo Sở)'}
              </span>
            </div>
            <h3 class="card-title">${table.name}</h3>
            <p class="card-subtitle">Nguồn dữ liệu: <strong>${table.provider}</strong> • Tổng quy mô: <strong style="color:#15803d;">${table.recordsCount} bản ghi</strong></p>
          </div>
          
          <div style="display: flex; gap: 8px; align-items: center;">
            <select class="form-control" style="width: 320px;" onchange="MdmCatalogManager.viewTableDetail(this.value)">
              ${this.masterTables.map(t => `
                <option value="${t.code}" ${t.code === table.code ? 'selected' : ''}>[${t.code}] ${t.name}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- 1. CẤU TRÚC SCHEMA -->
        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 13.5px; font-weight: 700; color: #0f172a; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="database" style="color: #0284c7; width: 16px; height: 16px;"></i> 1. Cấu trúc Cột & Khóa Ràng Buộc (Data Schema & Constraints)
          </h4>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Tên Cột (Column Name)</th>
                  <th>Kiểu Dữ Liệu</th>
                  <th>Khóa Chính (PK)</th>
                  <th>Khóa Ngoại (FK)</th>
                  <th>Quy Tắc DDM Masking</th>
                  <th>Mô Tả Thuộc Tính</th>
                </tr>
              </thead>
              <tbody>
                ${table.schema.map(col => `
                  <tr>
                    <td><code style="font-weight: 700; color: #0f172a;">${col.col}</code></td>
                    <td><span class="badge badge-info" style="font-size: 10px;">${col.type}</span></td>
                    <td>${col.pk ? '<span class="badge badge-danger">PK</span>' : '<span style="color:#cbd5e1;">-</span>'}</td>
                    <td>${col.fk ? '<span class="badge badge-warning">FK</span>' : '<span style="color:#cbd5e1;">-</span>'}</td>
                    <td>
                      ${col.masked 
                        ? '<span class="badge badge-warning">DDM Masked (SHA/Star)</span>' 
                        : '<span style="color:#94a3b8; font-size: 11px;">Clear Text</span>'}
                    </td>
                    <td style="font-size: 11.5px; color: #475569;">${col.desc}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 2. DỮ LIỆU MẪU (SAMPLE DATA) -->
        <div>
          <h4 style="font-size: 13.5px; font-weight: 700; color: #0f172a; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="table" style="color: #10b981; width: 16px; height: 16px;"></i> 2. Trích Xuất Dữ Liệu Mẫu (Sample Records Extracted)
          </h4>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  ${table.schema.slice(0, 7).map(c => `
                    <th>${c.col} ${c.masked && isMasked ? '<span class="badge badge-warning" style="font-size:8px;">Masked</span>' : ''}</th>
                  `).join('')}
                </tr>
              </thead>
              <tbody>
                ${table.sampleRows.map(row => `
                  <tr>
                    <td><strong style="color: #0284c7;">${row.c1 || ''}</strong></td>
                    <td><strong>${row.c2 || ''}</strong></td>
                    <td>${row.c3 || ''}</td>
                    <td>${table.schema[3] && table.schema[3].masked && isMasked ? MdmCatalogManager.maskName(row.c4 || '') : (row.c4 || '')}</td>
                    <td><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0; color: #0f172a;">${table.schema[4] && table.schema[4].masked && isMasked ? MdmCatalogManager.maskCCCD(row.c5 || '') : (row.c5 || '')}</code></td>
                    <td>${row.c6 || ''}</td>
                    <td><span class="badge badge-success">${row.c7 || ''}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  maskName(name) {
    if (!name) return '***';
    const parts = name.split(' ');
    if (parts.length <= 1) return '***';
    return parts[0] + ' ' + parts.slice(1).map(p => p[0] + '**').join(' ');
  },

  maskCCCD(cccd) {
    if (!cccd || cccd.length < 6) return '******';
    return cccd.substring(0, 3) + '******' + cccd.substring(cccd.length - 3);
  },

  exportMdmCatalog() {
    App.showNotification("Đang xuất tệp Excel Từ điển 26 Bảng Dữ liệu chủ (Data Dictionary)...", "info");
    setTimeout(() => {
      App.showNotification("Đã tải xuống Từ điển CSDL 26 bảng Master Data chuẩn hóa thành công!", "success");
    }, 800);
  },

  renderDataCatalogGlossary() {
    const container = document.getElementById('catalogGlossaryContainer');
    if (!container) return;

    const terms = [
      { code: 'TERM-NSNN-01', term: 'Dự toán Thu NSNN', standard: 'QĐ 1323/QĐ-BTC', privacy: 'Public', desc: 'Dự toán thu ngân sách nhà nước được cấp có thẩm quyền giao đầu năm hoặc điều chỉnh trong năm.' },
      { code: 'TERM-DTC-04', term: 'Tổng mức Đầu tư được duyệt', standard: 'Luật Đầu tư công', privacy: 'Public', desc: 'Toàn bộ chi phí đầu tư xây dựng của dự án được xác định trong Quyết định phê duyệt dự án.' },
      { code: 'TERM-DN-12', term: 'Số Định danh Cá nhân / CCCD Đại diện', standard: 'NĐ 356/2025/NĐ-CP', privacy: 'Sensitive (DDM Masked)', desc: 'Mã định danh cá nhân 12 số của người đại diện pháp luật, bắt buộc che mờ khi xuất ra bên ngoài.' },
      { code: 'TERM-HKD-01', term: 'Mã định danh Hộ kinh doanh', standard: 'Nghị định 01/2021/NĐ-CP', privacy: 'Sensitive (DDM Masked)', desc: 'Mã số thuế 10-13 số của hộ kinh doanh cá thể liên thông giữa cơ quan ĐKKD cấp cơ sở và Thuế.' },
      { code: 'TERM-HTX-02', term: 'Hợp tác xã theo Luật HTX 2023', standard: 'Luật HTX 2023', privacy: 'Public', desc: 'Tổ chức kinh tế tập thể, đồng sở hữu, có tư cách pháp nhân, do ít nhất 5 thành viên tự nguyện thành lập.' },
      { code: 'TERM-QHG-01', term: 'CSDL Quốc gia về Quy hoạch', standard: 'Luật Quy hoạch 2017 & QĐ 318/QĐ-TTg', privacy: 'Public', desc: 'Hệ thống thông tin và CSDL quốc gia về quy hoạch do Bộ KH&ĐT quản lý, lưu trữ quy hoạch tỉnh Khánh Hòa.' },
      { code: 'TERM-TT-08', term: 'Số tiền Nợ Thuế & Sai phạm Thanh tra', standard: 'Luật Thanh tra & QL Thuế', privacy: 'Confidential (AES-256)', desc: 'Số tiền nợ thuế chi tiết và tiền sai phạm chưa thu hồi, mã hóa cột ở mức CSDL.' }
    ];

    container.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Mã Thuật ngữ</th>
            <th>Tên Thuật ngữ Nghiệp vụ</th>
            <th>Căn cứ Tiêu chuẩn</th>
            <th>Cấp độ Bảo vệ Dữ liệu</th>
            <th>Mô tả Ngữ nghĩa Chuẩn</th>
          </tr>
        </thead>
        <tbody>
          ${terms.map(t => `
            <tr>
              <td><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0; color: #0284c7;">${t.code}</code></td>
              <td><strong>${t.term}</strong></td>
              <td>${t.standard}</td>
              <td>
                <span class="badge ${t.privacy.includes('Sensitive') ? 'badge-warning' : t.privacy.includes('Confidential') ? 'badge-danger' : 'badge-success'}">
                  ${t.privacy}
                </span>
              </td>
              <td style="font-size: 11.5px; color: #475569;">${t.desc}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  },

  renderDataCatalog(containerId = 'catalogMainCard') {
    this.activeView = 'dictionary';
    this.renderMasterDataManagement(containerId);
  }
};

window.MdmManager = MdmCatalogManager;
window.MdmCatalog = MdmCatalogManager;
