/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * PHÂN HỆ TÌM KIẾM TOÀN VĂN, CẢNH BÁO SỚM, CHIA SẺ DỮ LIỆU (DaaS) & NHẬT KÝ AUDIT
 */

const SystemAnalyticsManager = {
  // Dữ liệu Cảnh báo sớm (Early Warnings)
  warningRules: [
    {
      id: "WARN-DTC-001",
      level: "HIGH",
      category: "Đầu tư công",
      title: "Dự án nghẽn dòng vốn giải ngân trên 60 ngày",
      target: "Dự án kè chống sạt lở bờ sông Cái và đường Vành đai 2",
      detail: "Hơn 60 ngày không phát sinh chứng từ thanh toán giải ngân tại Kho bạc Nhà nước do vướng mắc giải phóng mặt bằng tại 12 hộ dân.",
      action: "Đã gửi thông báo cảnh báo tới Ban Quản lý dự án và Phòng Quản lý Đầu tư",
      date: "2026-08-20 08:30"
    },
    {
      id: "WARN-DN-002",
      level: "HIGH",
      category: "Doanh nghiệp và thuế",
      title: "Doanh nghiệp có dấu hiệu mất cân đối tài chính và nợ thuế",
      target: "Công ty CP Xây dựng và Thương mại Hải Vân (MST: 4201662211)",
      detail: "Hệ số ROA âm (-3.1%), nợ tiền sử dụng đất quá hạn 45 ngày với số tiền 12,8 tỷ đồng.",
      action: "Đã kích hoạt chuyển dữ liệu phối hợp Cục Thuế tỉnh Khánh Hòa",
      date: "2026-08-19 15:45"
    },
    {
      id: "WARN-TSC-003",
      level: "MEDIUM",
      category: "Tài sản công",
      title: "Cơ sở nhà đất quá hạn phê duyệt phương án sắp xếp lại",
      target: "Trụ sở cũ Trung tâm Dạy nghề Vạn Ninh",
      detail: "Dôi dư sau sắp xếp nhưng chưa trình UBND tỉnh phê duyệt phương án điều chuyển hoặc bán đấu giá.",
      action: "Nhắc nhở Phòng Quản lý Giá và Công sản hoàn thiện tờ trình",
      date: "2026-08-18 10:20"
    },
    {
      id: "WARN-NS-004",
      level: "LOW",
      category: "Thu ngân sách",
      title: "Hụt thu khoản thu lệ phí trước bạ nhà đất khu vực Diên Khánh",
      target: "Chi cục Thuế khu vực Diên Khánh - Khánh Vĩnh",
      detail: "Tiến độ thu lệ phí trước bạ đạt 58% dự toán năm (thấp hơn 12% so với tiến độ bình quân tỉnh).",
      action: "Đã đưa vào danh mục theo dõi của Phòng Quản lý Ngân sách",
      date: "2026-08-17 14:00"
    }
  ],

  // Dữ liệu quản lý dịch vụ chia sẻ dữ liệu (DaaS) và đối tác khai thác
  daasPartners: [
    {
      partnerId: "PARTNER-SXD",
      name: "Sở Xây dựng tỉnh Khánh Hòa",
      apiScope: "API-01 (Kế hoạch ĐTC), API-05 (Bảng giá VLXD & Công trình), API-09 (GIS & Hạ tầng GTVT)",
      apiKey: "sxd_kh_live_sec_8923487192",
      rateLimit: "1.500 req/phút",
      status: "ACTIVE",
      totalCalls: "142.850",
      lastAccess: "2026-08-20 12:10"
    },
    {
      partnerId: "PARTNER-SNNMT",
      name: "Sở Nông nghiệp và Môi trường tỉnh Khánh Hòa",
      apiScope: "API-05 (Bảng giá đất), API-08 (Hạ tầng thủy lợi), API-09 (Quy hoạch đất đai)",
      apiKey: "snnmt_kh_live_sec_7712390194",
      rateLimit: "1.200 req/phút",
      status: "ACTIVE",
      totalCalls: "98.400",
      lastAccess: "2026-08-20 11:55"
    },
    {
      partnerId: "PARTNER-CUCTHUE",
      name: "Cục Thuế tỉnh Khánh Hòa",
      apiScope: "API-03 (BCTC Doanh nghiệp), API-04 (Thu NSNN), API-07 (ĐKKD)",
      apiKey: "cucthue_kh_sec_9918237190",
      rateLimit: "2.500 req/phút",
      status: "ACTIVE",
      totalCalls: "389.200",
      lastAccess: "2026-08-20 12:14"
    },
    {
      partnerId: "PARTNER-IOC-TINH",
      name: "Trung tâm IOC tỉnh Khánh Hòa (UBND tỉnh)",
      apiScope: "Toàn bộ 09 dịch vụ dữ liệu kinh tế (Full DaaS Access)",
      apiKey: "ioc_khanhhoa_master_token_2026",
      rateLimit: "Không giới hạn",
      status: "ACTIVE",
      totalCalls: "1.250.400",
      lastAccess: "2026-08-20 12:15"
    },
    {
      partnerId: "PARTNER-UBND-NTR",
      name: "UBND Phường Nha Trang",
      apiScope: "API-04 (Thu ngân sách địa bàn), API-05 (Bảng giá đất)",
      apiKey: "ubnd_phuong_nhatrang_api_7718290",
      rateLimit: "500 req/phút",
      status: "ACTIVE",
      totalCalls: "64.120",
      lastAccess: "2026-08-20 11:45"
    }
  ],

  // Dữ liệu nhật ký thao tác hệ thống (Audit Action Logs)
  auditLogs: [
    { id: "LOG-98214", user: "Châu Ngô Anh Nhân", dept: "Lãnh đạo Sở", action: "Phê duyệt Báo cáo chỉ đạo điều hành theo Quyết định số 2071 quý III/2026", ip: "10.79.1.10", time: "2026-08-20 12:10:45", status: "SUCCESS" },
    { id: "LOG-98213", user: "Hệ thống tự động", dept: "Văn phòng Sở", action: "Đồng bộ tự động 15 API từ CSDL quốc gia và Bộ, ngành", ip: "127.0.0.1", time: "2026-08-20 12:00:00", status: "SUCCESS" },
    { id: "LOG-98212", user: "Lê Thị Thu Hằng", dept: "Phòng Kinh tế và Ngân sách", action: "Xuất dữ liệu cân đối ngân sách nhà nước tháng 8/2026", ip: "10.79.1.24", time: "2026-08-20 11:45:22", status: "SUCCESS" },
    { id: "LOG-98211", user: "Phạm Minh Tuấn", dept: "Phòng Quản lý Đầu tư công", action: "Điều chỉnh tiến độ giải ngân dự án kè chống sạt lở sông Cái", ip: "10.79.1.35", time: "2026-08-20 11:30:10", status: "SUCCESS" },
    { id: "LOG-98210", user: "Trần Thanh Bình", dept: "Phòng Quản lý Đầu tư ngoài ngân sách", action: "Nạp Quyết định chấp thuận chủ trương đầu tư dự án DA-NNS-001", ip: "10.79.1.18", time: "2026-08-20 10:55:04", status: "SUCCESS" },
    { id: "LOG-98209", user: "Võ Văn Hoàng", dept: "Phòng Pháp chế", action: "Thẩm định dự thảo Nghị quyết phân cấp nguồn thu và nhiệm vụ chi", ip: "10.79.1.42", time: "2026-08-20 10:20:18", status: "SUCCESS" }
  ],

  // Dữ liệu Lưu vết Lịch sử Điều chỉnh Con số Kế hoạch & Phân bổ vốn (Financial Number Audit Trail)
  financialAuditTrail: [
    {
      id: "ADT-NS-2026-001",
      target: "Dự toán Thu NSNN toàn tỉnh năm 2026",
      field: "Dự toán giao đầu năm ➔ Điều chỉnh bổ sung",
      oldVal: "18.520,6 tỷ đ",
      newVal: "19.250,0 tỷ đ",
      delta: "+729,4 tỷ đ (+3,9%)",
      adjustedBy: "Lê Thị Thu Hằng",
      dept: "Phòng Kinh tế và Ngân sách",
      approvedBy: "Châu Ngô Anh Nhân (Giám đốc Sở)",
      legalDocNumber: "Nghị quyết số 18/NQ-HĐND",
      docTitle: "Điều chỉnh, bổ sung dự toán thu NSNN và phương án phân bổ ngân sách tỉnh Khánh Hòa năm 2026",
      timestamp: "2026-07-15 14:30:22",
      reason: "Tăng thu đột biến từ thuế XNK KKT Vân Phong và thu tiền sử dụng đất khu đô thị",
      docFileId: "VB-STC-2026-01"
    },
    {
      id: "ADT-DTC-2026-002",
      target: "Dự án Tuyến đường Vành đai 2 Nha Trang",
      field: "Kế hoạch vốn Đầu tư công năm 2026",
      oldVal: "450,0 tỷ đ",
      newVal: "580,0 tỷ đ",
      delta: "+130,0 tỷ đ (+28,9%)",
      adjustedBy: "Phạm Minh Tuấn",
      dept: "Phòng Quản lý Đầu tư công",
      approvedBy: "Châu Ngô Anh Nhân (Giám đốc Sở)",
      legalDocNumber: "Quyết định số 1420/QĐ-UBND",
      docTitle: "Phê duyệt điều chỉnh kế hoạch vốn đầu tư công năm 2026 (Đợt 2) phục vụ giải phóng mặt bằng",
      timestamp: "2026-08-05 09:15:10",
      reason: "Bổ sung kinh phí chi trả bồi thường GPMB tại 12 hộ dân thuộc nút giao Ngọc Hội",
      docFileId: "VB-STC-2026-02"
    },
    {
      id: "ADT-HCSN-2026-003",
      target: "Kinh phí tự chủ Bệnh viện Đa khoa tỉnh Khánh Hòa",
      field: "Dự toán chi thường xuyên NSNN hỗ trợ",
      oldVal: "45,0 tỷ đ",
      newVal: "0,0 đ",
      delta: "-45,0 tỷ đ (Tiết kiệm 100% NS)",
      adjustedBy: "Ngô Mỹ Linh",
      dept: "Phòng Tài chính Hành chính sự nghiệp",
      approvedBy: "Châu Ngô Anh Nhân (Giám đốc Sở)",
      legalDocNumber: "Quyết định số 890/QĐ-UBND",
      docTitle: "Giao quyền tự chủ tài chính giai đoạn 2026-2028 cho Bệnh viện Đa khoa tỉnh (Nhóm 2)",
      timestamp: "2026-08-10 16:40:00",
      reason: "Đơn vị tự bảo đảm 100% chi thường xuyên theo Nghị định 60/2021/NĐ-CP",
      docFileId: "VB-STC-2026-03"
    },
    {
      id: "ADT-GCS-2026-004",
      target: "Cơ sở nhà đất dôi dư số 88 Trần Phú, Nha Trang",
      field: "Giá trị khởi điểm bán đấu giá tài sản công",
      oldVal: "185,0 tỷ đ",
      newVal: "215,5 tỷ đ",
      delta: "+30,5 tỷ đ (+16,5%)",
      adjustedBy: "Đặng Quốc Hưng",
      dept: "Phòng Quản lý Giá và Công sản",
      approvedBy: "Châu Ngô Anh Nhân (Giám đốc Sở)",
      legalDocNumber: "Quyết định số 312/QĐ-UBND",
      docTitle: "Phê duyệt giá khởi điểm bán đấu giá quyền sử dụng đất và tài sản gắn liền với đất",
      timestamp: "2026-08-12 11:20:45",
      reason: "Cập nhật bảng giá đất điều chỉnh theo Luật Đất đai 2024 và chứng thư thẩm định giá",
      docFileId: "VB-STC-2026-02"
    },
    {
      id: "ADT-DN-2026-005",
      target: "Tổng Công ty Khánh Việt (KHATOCO)",
      field: "Chỉ tiêu Nộp ngân sách nhà nước giao",
      oldVal: "3.450,0 tỷ đ",
      newVal: "3.620,5 tỷ đ",
      delta: "+170,5 tỷ đ (+4,9%)",
      adjustedBy: "Vũ Thị Mai",
      dept: "Phòng Quản lý Doanh nghiệp",
      approvedBy: "Châu Ngô Anh Nhân (Giám đốc Sở)",
      legalDocNumber: "Thông báo số 88/TB-STC",
      docTitle: "Thông báo kết luận đối soát chỉ tiêu tài chính và ước nộp NSNN năm 2026",
      timestamp: "2026-08-18 10:05:30",
      reason: "Kết quả kinh doanh 6 tháng đầu năm tăng trưởng tốt, nâng chỉ tiêu ước nộp NS",
      docFileId: "VB-STC-2026-04"
    }
  ],

  // Ma trận Phân quyền Dựa trên Vai trò 3 Lớp (RBAC 3-Layer Access Control Matrix)
  rbacMatrixData: [
    {
      roleName: "Lãnh đạo Sở (Ban Giám đốc)",
      roleCode: "DIRECTOR",
      functions: ["Xem toàn bộ", "Phê duyệt số liệu", "Khóa sổ CSDL", "Chỉ đạo điều hành", "Xuất PDF/Excel"],
      dataScope: "Toàn tỉnh (Toàn bộ 65 xã/phường, 8 phòng ban Sở, 6 nhóm cổng ngoài)",
      fieldSecurity: "Toàn quyền xem 100% các trường dữ liệu (Gồm cả số liệu Mật, Tối mật và chỉ số nhạy cảm)",
      badgeClass: "badge-purple"
    },
    {
      roleName: "Trưởng phòng Chuyên môn",
      roleCode: "DEPT_HEAD",
      functions: ["Xem", "Nhập liệu", "Sửa số liệu", "Thẩm tra hồ sơ", "Trình duyệt Lãnh đạo", "Xuất báo cáo"],
      dataScope: "Theo lĩnh vực phụ trách (KTNS, DTC, DTNS, Doanh nghiệp, HCSN, Giá công sản, Pháp chế, Văn phòng)",
      fieldSecurity: "Xem toàn bộ trường chuyên môn; DDM Masking tự động che mờ số CCCD và thông tin cá nhân",
      badgeClass: "badge-info"
    },
    {
      roleName: "Chuyên viên Nghiệp vụ",
      roleCode: "SPECIALIST",
      functions: ["Xem", "Nhập liệu", "Sửa dự thảo", "Đối soát số liệu", "Xuất báo cáo biểu mẫu"],
      dataScope: "Theo địa bàn & danh mục hồ sơ được phân công phụ trách",
      fieldSecurity: "Xem trường phục vụ nghiệp vụ; Không xem số dư tài khoản mật và dữ liệu thanh tra chưa công bố",
      badgeClass: "badge-info"
    },
    {
      roleName: "Quản trị Hệ thống",
      roleCode: "ADMIN",
      functions: ["Xem", "Cấu hình API Gateway", "Quản lý Queue", "Phân quyền RBAC", "Sao lưu / DR Site"],
      dataScope: "Toàn hệ thống (Hạ tầng, API, Metadata, DDM Masking, Audit Logs)",
      fieldSecurity: "Quản trị cấu trúc Schema và khóa mã hóa; Không can thiệp sửa đổi con số tài chính nghiệp vụ",
      badgeClass: "badge-danger"
    },
    {
      roleName: "Doanh nghiệp Kê khai ngoài (Khatoco, Yến Sào, FDI)",
      roleCode: "EXTERNAL_ENTERPRISE",
      functions: ["Xem", "Kê khai dự thảo", "Nộp giải trình", "Tải biên bản tiếp nhận"],
      dataScope: "Chỉ xem dữ liệu của chính doanh nghiệp mình (Entity-Level Scope)",
      fieldSecurity: "Ẩn hoàn toàn số liệu của doanh nghiệp khác, ẩn chỉ tiêu mật và số liệu thanh tra thuế",
      badgeClass: "badge-warning"
    },
    {
      roleName: "Cơ quan Cơ sở (UBND cấp xã, BV Đa khoa, Ban QLDA)",
      roleCode: "EXTERNAL_COMMUNE_HCSN",
      functions: ["Xem", "Kê khai dự thảo báo cáo", "Nộp hồ sơ tự chủ / giải ngân", "Tra cứu hướng dẫn"],
      dataScope: "Phạm vi địa bàn xã/phường hoặc đơn vị sự nghiệp trực thuộc",
      fieldSecurity: "Ẩn các trường điều hành vĩ mô cấp tỉnh và dữ liệu liên ngành ngoài thẩm quyền",
      badgeClass: "badge-success"
    }
  ],

  currentAuditTab: 'financial_numbers',


  // 1. Màn hình tìm kiếm toàn văn nâng cao
  renderAdvancedSearch(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="card-header">
        <div>
          <h3 class="card-title"><i data-lucide="search"></i> Công cụ tìm kiếm toàn văn dữ liệu kinh tế và kho tài liệu số hóa</h3>
          <p class="card-subtitle">Tra cứu đồng thời trên Cơ sở dữ liệu kinh tế và kho lưu trữ hơn 1 triệu trang tài liệu số hóa lịch sử</p>
        </div>
      </div>

      <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
        <input type="text" id="inputGlobalSearch" class="form-control" placeholder="Nhập từ khóa: Tên dự án, Mã số thuế, Số quyết định, Tên doanh nghiệp, Địa bàn..." style="flex: 3; min-width: 280px;" />
        <select id="selectSearchDept" class="form-control" style="flex: 1; min-width: 180px;">
          <option value="ALL">Tất cả các phòng chuyên môn</option>
          <option value="KTNS">Phòng Quản lý Ngân sách</option>
          <option value="DTC">Phòng Quản lý Đầu tư</option>
          <option value="DTNS">Phòng Đầu tư ngoài Ngân sách</option>
          <option value="DOANHNGHIEP">Phòng Quản lý Doanh nghiệp</option>
          <option value="GIACONGSAN">Phòng Quản lý Giá và Công sản</option>
          <option value="HCSN">Phòng Tài chính Hành chính Sự nghiệp</option>
          <option value="PHAPCHE">Phòng Pháp chế</option>
        </select>
        <button class="btn btn-primary" onclick="SystemAnalyticsManager.performGlobalSearch()">
          <i data-lucide="search"></i> Tìm kiếm ngay
        </button>
      </div>

      <div id="searchResultsContainer">
        <div style="text-align: center; padding: 30px; color: #94a3b8;">
          <i data-lucide="sparkles" style="font-size: 40px; color: #002B8C; margin-bottom: 10px; display: inline-block;"></i>
          <p>Nhập từ khóa để tra cứu dữ liệu thời gian thực. Hệ thống hỗ trợ tìm kiếm toàn văn tiếng Việt có dấu và không dấu.</p>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  performGlobalSearch() {
    const kw = (document.getElementById('inputGlobalSearch').value || '').trim().toLowerCase();
    const dept = document.getElementById('selectSearchDept').value;
    const resultsContainer = document.getElementById('searchResultsContainer');

    if (!kw) {
      App.showNotification("Vui lòng nhập từ khóa tìm kiếm!", "warning");
      return;
    }

    // Filter projects, taxpayers, archive docs
    const matchedDocs = APP_DATA.digitalArchive.filter(d => 
      d.title.toLowerCase().includes(kw) || 
      d.regNumber.toLowerCase().includes(kw) || 
      d.mappedRecord.toLowerCase().includes(kw)
    );

    const matchedTaxpayers = (APP_DATA.keyTaxPayers || []).filter(t => 
      t.name.toLowerCase().includes(kw) || t.mst.includes(kw)
    );

    resultsContainer.innerHTML = `
      <div style="margin-bottom: 16px; font-size: 13px; color: #0284c7; font-weight: 600;">
        Tìm thấy <span style="color: #0f172a;">${matchedDocs.length + matchedTaxpayers.length}</span> kết quả phù hợp với từ khóa "${kw}":
      </div>

      <div class="api-service-grid" style="grid-template-columns: 1fr;">
        ${matchedDocs.map(d => `
          <div class="card" style="padding: 14px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border: 1px solid #e2e8f0; margin-bottom: 10px;">
            <div style="flex: 1; min-width: 220px;">
              <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 4px;">
                <span class="badge badge-purple">${d.docId}</span>
                <span class="badge badge-info">${d.dept}</span>
                <span style="font-size: 11px; color: #475569;">${d.issueDate}</span>
              </div>
              <h4 style="color: #0f172a; font-size: 14px; font-weight: 700; margin: 4px 0 2px 0;">${d.title}</h4>
              <div style="font-size: 11.5px; color: #475569; margin-top: 2px;">
                Số văn bản: <strong style="color: #0f172a;">${d.regNumber}</strong> • Ban hành: <span style="color: #334155; font-weight: 600;">${d.issueDate}</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="ArchiveManager.viewHistoricalDoc('${d.docId}')">
              <i data-lucide="eye"></i> Xem hồ sơ
            </button>
          </div>
        `).join('')}

        ${matchedTaxpayers.map(t => `
          <div class="card" style="padding: 14px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border: 1px solid #e2e8f0; margin-bottom: 10px;">
            <div style="flex: 1; min-width: 220px;">
              <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 4px;">
                <span class="badge badge-success">Doanh Nghiệp Trọng Điểm</span>
                <span style="font-size: 11px; color: #475569;">MST: ${t.mst}</span>
              </div>
              <h4 style="color: #0f172a; font-size: 14px; font-weight: 700; margin: 4px 0 2px 0;">${t.name}</h4>
              <div style="font-size: 11.5px; color: #475569; margin-top: 2px;">
                Chỉ tiêu: ${t.target} • Thực thu: <strong style="color: #0284c7;">${t.actual}</strong> (${t.rate})
              </div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="App.showNotification('Đang mở hồ sơ tài chính của ${t.name}...', 'info')">
              <i data-lucide="bar-chart-2"></i> Xem BCTC
            </button>
          </div>
        `).join('')}

        ${matchedDocs.length === 0 && matchedTaxpayers.length === 0 ? `
          <div style="text-align: center; padding: 20px; color: #64748b;">
            Không tìm thấy bản ghi nào khớp hoàn toàn. Bạn có thể mở rộng phạm vi tìm kiếm hoặc kiểm tra lại chính tả.
          </div>
        ` : ''}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  // 2. Màn hình cảnh báo sớm (Early Warning Center)
  renderEarlyWarningCenter(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="card-header" style="flex-wrap: wrap; gap: 10px;">
        <div>
          <h3 class="card-title"><i data-lucide="alert-triangle"></i> Trung tâm giám sát và cảnh báo sớm kinh tế tỉnh Khánh Hòa</h3>
          <p class="card-subtitle">Hệ thống tự động quét và kích hoạt quy tắc cảnh báo dự án chậm giải ngân, doanh nghiệp rủi ro thuế và nhà đất quá hạn</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang chạy lại bộ quy tắc quét tự động...', 'info')">
          <i data-lucide="refresh-cw"></i> Quét quy tắc ngay
        </button>
      </div>

      <div class="api-service-grid" style="grid-template-columns: 1fr; gap: 12px;">
        ${this.warningRules.map(w => `
          <div class="card" style="padding: 16px; background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid ${w.level === 'HIGH' ? '#ef4444' : w.level === 'MEDIUM' ? '#f59e0b' : '#3b82f6'}; margin-bottom: 12px;">
            <!-- Hàng 1: Huy hiệu mức độ + Lĩnh vực + Ngày tháng -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; margin-bottom: 8px;">
              <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                <span class="badge ${w.level === 'HIGH' ? 'badge-danger' : w.level === 'MEDIUM' ? 'badge-warning' : 'badge-info'}">
                  ${w.level === 'HIGH' ? 'Mức nguy cơ cao' : w.level === 'MEDIUM' ? 'Mức cảnh báo' : 'Theo dõi'}
                </span>
                <span class="badge badge-purple">${w.category}</span>
              </div>
              <span style="font-size: 11.5px; color: #64748b; font-weight: 500; font-family: 'JetBrains Mono', monospace;">${w.date}</span>
            </div>

            <!-- Hàng 2: Tiêu đề cảnh báo (riêng biệt, rõ ràng, không bị ép ngang) -->
            <h4 style="color: #0f172a; font-size: 14.5px; font-weight: 700; margin: 0 0 6px 0; line-height: 1.35;">${w.title}</h4>

            <!-- Hàng 3: Đối tượng ảnh hưởng -->
            <div style="font-size: 12.5px; color: #334155; margin-bottom: 6px; line-height: 1.4;">
              <strong>Đối tượng ảnh hưởng:</strong> <span style="color: #002B8C; font-weight: 600;">${w.target}</span>
            </div>

            <!-- Hàng 4: Chi tiết mô tả -->
            <p style="font-size: 12px; color: #475569; line-height: 1.45; margin-bottom: 10px;">${w.detail}</p>
            
            <!-- Hàng 5: Hành động đề xuất + Nút xử lý -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; padding-top: 10px; border-top: 1px solid #f1f5f9;">
              <div style="font-size: 11.5px; color: #15803d; font-weight: 600; display: flex; align-items: center; gap: 5px; flex: 1; min-width: 180px;">
                <i data-lucide="check-circle-2" style="width: 14px; height: 14px; flex-shrink: 0;"></i> 
                <span>${w.action}</span>
              </div>
              <button class="btn btn-primary btn-sm" onclick="App.showNotification('Đang mở quy trình phối hợp xử lý cho [${w.id}]...', 'info')">
                <i data-lucide="external-link"></i> Xử lý cảnh báo
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  // 3. Màn hình Quản lý Dịch vụ Chia sẻ Dữ liệu (DaaS)
  renderDaasManager(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="card-header">
        <div>
          <h3 class="card-title"><i data-lucide="share-2"></i> Quản trị cổng chia sẻ dữ liệu (DaaS) và cấp phát API Key</h3>
          <p class="card-subtitle">Chia sẻ dữ liệu mở và dữ liệu chuyên ngành cho các sở, ban, ngành, cơ quan thuế và UBND các xã, phường</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="App.showNotification('Đang tạo API Key mới cho đối tác...', 'info')">
          <i data-lucide="key"></i> Cấp khóa API key mới
        </button>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã Đối Tác</th>
              <th>Cơ Quan / Đơn Vị Sử Dụng</th>
              <th>Phạm Vi Dữ Liệu (Scope)</th>
              <th>Khóa Bảo Mật (API Key)</th>
              <th>Giới Hạn</th>
              <th>Tổng Lượt Gọi</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            ${this.daasPartners.map(p => `
              <tr>
                <td><strong style="color: #002B8C;">${p.partnerId}</strong></td>
                <td><strong>${p.name}</strong></td>
                <td><span class="badge badge-purple">${p.apiScope}</span></td>
                <td><code style="background: #f1f5f9; padding: 4px 8px; border-radius: 4px; color: #002B8C; font-size: 11px; border: 1px solid #e2e8f0;">${p.apiKey}</code></td>
                <td>${p.rateLimit}</td>
                <td><strong style="color: #15803d;">${p.totalCalls}</strong></td>
                <td><span class="badge badge-success"><i class="status-dot"></i> Hoạt Động</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  // 4. Màn hình Nhật ký Thao tác & Kiểm soát Lịch sử Số liệu (Audit Trail & RBAC Matrix)
  renderAuditLogs(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="card-header" style="flex-wrap: wrap; gap: 10px;">
        <div>
          <h3 class="card-title"><i data-lucide="shield-alert"></i> Kiểm soát giải trình số liệu tài chính & Phân quyền RBAC 3 lớp</h3>
          <p class="card-subtitle">Lưu vết lịch sử điều chỉnh con số kế hoạch/phân bổ vốn kèm số hiệu văn bản pháp lý và ma trận phân quyền</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang kết xuất tệp nhật ký kiểm toán toàn diện...', 'info')">
            <i data-lucide="download"></i> Xuất file Audit (.csv)
          </button>
        </div>
      </div>

      <!-- TABS CHUYỂN ĐỔI SUB-VIEW AUDIT -->
      <div class="sub-tabs-bar" id="auditSubTabsBar" style="margin-bottom: 16px;">
        <button class="sub-tab-btn ${this.currentAuditTab === 'financial_numbers' ? 'active' : ''}" onclick="SystemAnalyticsManager.switchAuditTab('financial_numbers')">
          <i data-lucide="git-commit"></i> 1. Lưu vết lịch sử con số (Financial Number Audit Trail)
        </button>
        <button class="sub-tab-btn ${this.currentAuditTab === 'rbac_matrix' ? 'active' : ''}" onclick="SystemAnalyticsManager.switchAuditTab('rbac_matrix')">
          <i data-lucide="shield-check"></i> 2. Ma trận phân quyền 3 lớp (RBAC Matrix)
        </button>
        <button class="sub-tab-btn ${this.currentAuditTab === 'system_actions' ? 'active' : ''}" onclick="SystemAnalyticsManager.switchAuditTab('system_actions')">
          <i data-lucide="history"></i> 3. Nhật ký thao tác hệ thống (System Action Logs)
        </button>
      </div>

      <div id="auditSubViewContainer"></div>
    `;

    this.renderCurrentAuditSubView();
    if (window.lucide) window.lucide.createIcons();
  },

  switchAuditTab(tabName) {
    this.currentAuditTab = tabName;
    document.querySelectorAll('#auditSubTabsBar .sub-tab-btn').forEach(b => b.classList.remove('active'));
    this.renderCurrentAuditSubView();
    if (window.lucide) window.lucide.createIcons();
  },

  renderCurrentAuditSubView() {
    const container = document.getElementById('auditSubViewContainer');
    if (!container) return;

    if (this.currentAuditTab === 'financial_numbers') {
      container.innerHTML = this.renderFinancialAuditTrail();
    } else if (this.currentAuditTab === 'rbac_matrix') {
      container.innerHTML = this.renderRbacMatrixView();
    } else if (this.currentAuditTab === 'system_actions') {
      container.innerHTML = this.renderSystemActionLogs();
    }
    if (window.lucide) window.lucide.createIcons();
  },

  // -------------------------------------------------------------
  // 4.1. LƯU VẾT LỊCH SỬ ĐIỀU CHỈNH CON SỐ TÀI CHÍNH (FINANCIAL AUDIT TRAIL)
  // -------------------------------------------------------------
  renderFinancialAuditTrail() {
    return `
      <!-- BANNER GIẢI TRÌNH PHÁP LÝ -->
      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <i data-lucide="file-check" style="color: #002B8C; width: 22px; height: 22px; flex-shrink: 0;"></i>
          <div>
            <div style="font-weight: 750; color: #002B8C; font-size: 13.5px;">Kiểm soát tính giải trình tuyệt đối của dữ liệu kinh tế - ngân sách</div>
            <div style="font-size: 12px; color: #334155;">Mọi biến động con số dự toán, phân bổ vốn và quyết toán đều bắt buộc gắn liền với <strong>Số hiệu Văn bản / Quyết định phê duyệt chính thức</strong>.</div>
          </div>
        </div>
        <span class="badge badge-purple" style="font-size: 11px;">Chuẩn kiểm toán Nhà nước</span>
      </div>

      <!-- BẢNG LƯU VẾT LỊCH SỬ BIẾN ĐỘNG CON SỐ (BIG DATA TABLE UX) -->
      <div class="table-fullscreen-wrapper" id="wrapper_financial_audit">
        ${DeptWorkspaceManager.renderAdminTableToolbar('wrapper_financial_audit', 'table_financial_audit', 'Lưu vết lịch sử điều chỉnh con số kế hoạch & phân bổ vốn')}
        <div class="table-scroll-container">
          <table class="data-table freeze-first" id="table_financial_audit">
            <thead>
              <tr>
                <th>Mã Audit</th>
                <th>Chỉ Tiêu / Đối Tượng Điều Chỉnh</th>
                <th>Giá Trị Trước ➔ Sau Điều Chỉnh</th>
                <th>Mức Biến Động</th>
                <th>Cán Bộ Thực Hiện & Phê Duyệt</th>
                <th>Căn Cứ Pháp Lý (Số Hiệu Quyết Định / Nghị Quyết)</th>
                <th>Thời Gian Ghi Nhận</th>
                <th style="text-align: center;">Hồ Sơ Đính Kèm</th>
              </tr>
            </thead>
            <tbody>
              ${this.financialAuditTrail.map(a => `
                <tr>
                  <td><code style="color: #002B8C; font-weight: 750; font-size: 11px;">${a.id}</code></td>
                  <td>
                    <div style="font-weight: 750; color: #0f172a; font-size: 13px;">${a.target}</div>
                    <div style="font-size: 11.5px; color: #64748b;">${a.field}</div>
                  </td>
                  <td>
                    <div class="audit-diff-container">
                      <span class="audit-diff-old">${a.oldVal}</span>
                      <span class="audit-diff-arrow">➔</span>
                      <span class="audit-diff-new">${a.newVal}</span>
                    </div>
                  </td>
                  <td><strong style="color: ${a.delta.startsWith('+') ? '#15803d' : '#002B8C'}; font-family: 'JetBrains Mono', monospace;">${a.delta}</strong></td>
                  <td>
                    <div style="font-weight: 700; color: #0f172a; font-size: 12.5px;">${a.adjustedBy}</div>
                    <div style="font-size: 11px; color: #002B8C;">${a.dept}</div>
                    <div style="font-size: 10.5px; color: #15803d; margin-top: 2px;">Duyệt: ${a.approvedBy}</div>
                  </td>
                  <td>
                    <div style="font-weight: 750; color: #002B8C; font-size: 12.5px;">${a.legalDocNumber}</div>
                    <div style="font-size: 11.5px; color: #475569; line-height: 1.35; margin-top: 2px;">${a.docTitle}</div>
                    <div style="font-size: 11px; color: #64748b; font-style: italic; margin-top: 2px;">Lý do: "${a.reason}"</div>
                  </td>
                  <td><span style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; white-space: nowrap;">${a.timestamp}</span></td>
                  <td style="text-align: center;">
                    <button class="btn btn-sm btn-outline" onclick="ArchiveManager.viewHistoricalDoc('${a.docFileId}')" title="Xem toàn văn văn bản số hóa">
                      <i data-lucide="file-text"></i> Xem VB
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

  // -------------------------------------------------------------
  // 4.2. MA TRẬN PHÂN QUYỀN DỰA TRÊN VAI TRÒ 3 LỚP (RBAC MATRIX)
  // -------------------------------------------------------------
  renderRbacMatrixView() {
    return `
      <!-- TỔNG QUAN MA TRẬN 3 LỚP -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 16px;">
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px;">
          <div style="font-weight: 750; color: #002B8C; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="check-square" style="width: 16px; height: 16px;"></i> Lớp 1: Quyền Chức năng (Functional)
          </div>
          <div style="font-size: 12px; color: #334155; line-height: 1.45;">
            Kiểm soát 6 hành động cốt lõi: <strong>Xem (View), Nhập liệu (Create), Sửa (Edit), Duyệt (Approve), Khóa sổ (Lock), Xuất báo cáo (Export)</strong>.
          </div>
        </div>

        <div style="background: #f3e8ff; border: 1px solid #d8b4fe; border-radius: 8px; padding: 14px;">
          <div style="font-weight: 750; color: #6b21a8; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="compass" style="width: 16px; height: 16px;"></i> Lớp 2: Phạm vi Dữ liệu (Data Scope)
          </div>
          <div style="font-size: 12px; color: #334155; line-height: 1.45;">
            Phân vùng giới hạn dữ liệu theo cấp độ: <strong>Toàn tỉnh</strong> (Lãnh đạo Sở), <strong>Theo lĩnh vực phụ trách</strong> (8 phòng chuyên môn), và <strong>Theo đơn vị chủ quản</strong> (Cổng ngoài).
          </div>
        </div>

        <div style="background: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 14px;">
          <div style="font-weight: 750; color: #92400e; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="eye-off" style="width: 16px; height: 16px;"></i> Lớp 3: Trường Thông tin (Field Security)
          </div>
          <div style="font-size: 12px; color: #334155; line-height: 1.45;">
            Ẩn hoặc <strong>che mờ DDM (Dynamic Data Masking)</strong> các trường nhạy cảm như CCCD, STK ngân hàng, chi tiết nợ thuế, thông tin thanh tra chưa công bố với tài khoản ngoài.
          </div>
        </div>
      </div>

      <!-- BẢNG MA TRẬN PHÂN QUYỀN 3 LỚP TOÀN HỆ THỐNG -->
      <div class="table-fullscreen-wrapper" id="wrapper_rbac_matrix">
        ${DeptWorkspaceManager.renderAdminTableToolbar('wrapper_rbac_matrix', 'table_rbac_matrix', 'Ma trận phân quyền kiểm soát truy cập 3 lớp (RBAC Matrix)')}
        <div class="table-scroll-container">
          <table class="data-table freeze-first" id="table_rbac_matrix">
            <thead>
              <tr>
                <th>Nhóm Vai Trò Người Dùng</th>
                <th>Mã Vai Trò</th>
                <th>Lớp 1: Quyền Chức Năng (Function Layer)</th>
                <th>Lớp 2: Phạm Vi Dữ Liệu (Data Scope Layer)</th>
                <th>Lớp 3: Bảo Mật Trường Dữ Liệu (Field Security & DDM)</th>
              </tr>
            </thead>
            <tbody>
              ${this.rbacMatrixData.map(r => `
                <tr>
                  <td>
                    <strong style="color: #0f172a; font-size: 13px;">${r.roleName}</strong>
                  </td>
                  <td>
                    <span class="badge ${r.badgeClass}" style="font-family: 'JetBrains Mono', monospace;">${r.roleCode}</span>
                  </td>
                  <td>
                    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                      ${r.functions.map(fn => `<span class="rbac-layer-tag rbac-tag-function">${fn}</span>`).join('')}
                    </div>
                  </td>
                  <td>
                    <div style="font-size: 12px; color: #475569; line-height: 1.4;">
                      <span class="rbac-layer-tag rbac-tag-scope"><i data-lucide="map-pin" style="width: 11px; height: 11px; display: inline;"></i> ${r.dataScope}</span>
                    </div>
                  </td>
                  <td>
                    <div style="font-size: 12px; color: #475569; line-height: 1.4;">
                      <span class="rbac-layer-tag rbac-tag-field"><i data-lucide="shield" style="width: 11px; height: 11px; display: inline;"></i> ${r.fieldSecurity}</span>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // 4.3. NHẬT KÝ THAO TÁC HỆ THỐNG & AN TOÀN (ACTION LOGS)
  // -------------------------------------------------------------
  renderSystemActionLogs() {
    return `
      <div class="table-fullscreen-wrapper" id="wrapper_system_action_logs">
        ${DeptWorkspaceManager.renderAdminTableToolbar('wrapper_system_action_logs', 'table_system_action_logs', 'Nhật ký thao tác & giám sát an ninh hệ thống')}
        <div class="table-scroll-container">
          <table class="data-table freeze-first" id="table_system_action_logs">
            <thead>
              <tr>
                <th>Mã Log</th>
                <th>Người Dùng Thực Hiện</th>
                <th>Phòng Ban</th>
                <th>Hành Động Nghiệp Vụ</th>
                <th>Địa Chỉ IP</th>
                <th>Thời Gian Ghi Nhận</th>
                <th>Kết Quả</th>
              </tr>
            </thead>
            <tbody>
              ${this.auditLogs.map(l => `
                <tr>
                  <td><code style="color: #002B8C; font-weight: 750;">${l.id}</code></td>
                  <td><strong>${l.user}</strong></td>
                  <td><span class="badge badge-info">${l.dept}</span></td>
                  <td>${l.action}</td>
                  <td><code style="font-size: 11px;">${l.ip}</code></td>
                  <td><span style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px;">${l.time}</span></td>
                  <td><span class="badge badge-success">${l.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 5. Màn hình Kiểm Tra Toàn Vẹn Dữ Liệu & Ma Trận Liên Thông Phân Hệ
  renderDataIntegrityAndInteroperabilityView(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <!-- 1. Banner Tiêu Đề Phân Hệ Kiểm Soát Toàn Vẹn -->
      <div class="domain-header-banner">
        <div class="banner-left">
          <div class="banner-icon" style="background: rgba(16, 185, 129, 0.25); border-color: rgba(52, 211, 153, 0.4);">
            <i data-lucide="shield-check"></i>
          </div>
          <div>
            <div class="banner-title">
              <h2>GIÁM SÁT TOÀN VẸN DỮ LIỆU & MA TRẬN LIÊN THÔNG PHÂN HỆ</h2>
            </div>
            <p class="banner-subtitle">
              Kiểm tra tính nhất quán dòng tiền thu chi, liên kết mã định danh (MST, Mã DA ĐTC, Mã CS Nhà đất) và liên thông tự động giữa các phòng ban
            </p>
          </div>
        </div>
      </div>

      <!-- 2. Bảng Ma Trận Liên Thông Dữ Liệu Liên Phòng Ban -->
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="git-merge"></i> Ma trận liên thông dữ liệu liên phòng ban</h3>
            <p class="card-subtitle">Luồng dữ liệu tự động luân chuyển và kế thừa giữa các phòng ban chuyên môn</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang quét kiểm tra toàn bộ CSDL chủ MDM và Fact Marts...', 'info')">
            <i data-lucide="refresh-cw"></i> Quét kiểm tra CSDL
          </button>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Phòng ban nguồn</th>
                <th>Dữ liệu liên thông</th>
                <th>Phòng ban tiếp nhận</th>
                <th>Mục đích nghiệp vụ</th>
                <th>Tần suất</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style="color: #0284c7;">Phòng Kinh tế và Ngân sách</strong></td>
                <td><span class="badge badge-info">Dự toán NSNN & Trần vốn ĐTC</span></td>
                <td><strong>Phòng Quản lý Đầu tư công</strong></td>
                <td>Làm căn cứ thẩm tra phân bổ vốn và giải ngân các dự án</td>
                <td>Hằng năm / Điều chỉnh</td>
                <td><span class="badge badge-success"><i class="status-dot"></i> Đang liên thông</span></td>
              </tr>
              <tr>
                <td><strong style="color: #0284c7;">Phòng Kinh tế và Ngân sách</strong></td>
                <td><span class="badge badge-info">Kinh phí chi thường xuyên giao</span></td>
                <td><strong>Phòng Tài chính Hành chính sự nghiệp</strong></td>
                <td>Thẩm tra giao quyền tự chủ tài chính cho 542 ĐVSNCL</td>
                <td>Đầu năm ngân sách</td>
                <td><span class="badge badge-success"><i class="status-dot"></i> Đang liên thông</span></td>
              </tr>
              <tr>
                <td><strong style="color: #0284c7;">Phòng Quản lý Đầu tư công</strong></td>
                <td><span class="badge badge-purple">Quyết toán DA ĐTC hoàn thành</span></td>
                <td><strong>Phòng Quản lý Giá và Công sản</strong></td>
                <td>Tự động ghi tăng nguyên giá tài sản kết cấu hạ tầng công của tỉnh</td>
                <td>Theo từng QĐ phê duyệt</td>
                <td><span class="badge badge-success"><i class="status-dot"></i> Đang liên thông</span></td>
              </tr>
              <tr>
                <td><strong style="color: #0284c7;">Phòng Quản lý Đầu tư ngoài ngân sách</strong></td>
                <td><span class="badge badge-warning">Hồ sơ dự án FDI / Ngoài NS mới & IRC</span></td>
                <td><strong>Phòng Quản lý Doanh nghiệp</strong></td>
                <td>Theo dõi thành lập pháp nhân mới, nộp tiền thuê đất và thuế</td>
                <td>Khi cấp IRC mới</td>
                <td><span class="badge badge-success"><i class="status-dot"></i> Đang liên thông</span></td>
              </tr>
              <tr>
                <td><strong style="color: #0284c7;">Phòng Quản lý Doanh nghiệp</strong></td>
                <td><span class="badge badge-emerald">Cổ tức & Lợi nhuận sau thuế DNNN</span></td>
                <td><strong>Phòng Kinh tế và Ngân sách</strong></td>
                <td>Hạch toán vào nguồn thu ngân sách cấp tỉnh theo Luật NSNN</td>
                <td>Hằng quý & Năm</td>
                <td><span class="badge badge-success"><i class="status-dot"></i> Đang liên thông</span></td>
              </tr>
              <tr>
                <td><strong style="color: #0284c7;">Phòng Quản lý Giá và Công sản</strong></td>
                <td><span class="badge badge-cyan">Tiền thu bán đấu giá nhà đất dôi dư</span></td>
                <td><strong>Phòng Kinh tế và Ngân sách</strong></td>
                <td>Hạch toán nguồn thu tiền sử dụng đất vào cân đối NSNN</td>
                <td>Theo kết quả trúng ĐG</td>
                <td><span class="badge badge-success"><i class="status-dot"></i> Đang liên thông</span></td>
              </tr>
              <tr>
                <td><strong style="color: #0284c7;">Phòng Pháp chế</strong></td>
                <td><span class="badge badge-purple">CSDL 342 VBQPPL & QĐ Xử phạt VPHC</span></td>
                <td><strong>Tất cả 6 Phòng Chuyên Môn</strong></td>
                <td>Ánh xạ căn cứ pháp lý thu - chi và đối chiếu nộp phạt KBNN</td>
                <td>Real-time 24/7</td>
                <td><span class="badge badge-success"><i class="status-dot"></i> Đang liên thông</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 3. Bảng Kiểm Tra Logic Ràng Buộc Dữ Liệu Chi Tiết -->
      <div class="dashboard-row">
        <div class="col-6">
          <div class="card" style="height: 100%;">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="check-circle-2"></i> Ràng buộc toàn vẹn dữ liệu</h3>
              <span class="badge badge-success">8/8 Pass</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 6px;">
              <div style="background: #f8fafc; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px; font-size: 12px;">
                <div style="display: flex; justify-content: space-between; font-weight: 700; color: #15803d;">
                  <span>Cân Đối Thu - Chi Ngân Sách (Luật NSNN)</span>
                  <span class="badge badge-success">Pass</span>
                </div>
                <div style="color: #64748b; margin-top: 2px;">Tổng Chi NSĐP = Chi Đầu tư + Chi Thường xuyên + Dự phòng + Trả nợ (Sai số = 0 VND)</div>
              </div>

              <div style="background: #f8fafc; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px; font-size: 12px;">
                <div style="display: flex; justify-content: space-between; font-weight: 700; color: #15803d;">
                  <span>Thẩm Tra Quyết Toán Vốn ĐTC (TT 96/2021/TT-BTC)</span>
                  <span class="badge badge-success">Pass</span>
                </div>
                <div style="color: #64748b; margin-top: 2px;">Giá trị quyết toán phê duyệt <= Tổng mức đầu tư dự án đã được HĐND/UBND tỉnh phê duyệt</div>
              </div>

              <div style="background: #f8fafc; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px; font-size: 12px;">
                <div style="display: flex; justify-content: space-between; font-weight: 700; color: #15803d;">
                  <span>Bảo Toàn Vốn Nhà Nước Tại Doanh Nghiệp (NĐ 91/2015)</span>
                  <span class="badge badge-success">Pass</span>
                </div>
                <div style="color: #64748b; margin-top: 2px;">Vốn chủ sở hữu >= Vốn điều lệ nhà nước đã giao; Hệ số bảo toàn H >= 1.0</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-6">
          <div class="card" style="height: 100%;">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="database"></i> Khóa Định Danh Dùng Chung (Master Unique Keys)</h3>
              <span class="badge badge-info">Chuẩn Quốc Gia</span>
            </div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Loại Đối Tượng</th>
                    <th>Khóa Định Danh</th>
                    <th>Định Dạng Chuẩn</th>
                    <th>Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Doanh nghiệp & HTX</td>
                    <td><code>MST</code></td>
                    <td>10-13 chữ số (Cục Thuế)</td>
                    <td><span class="badge badge-success">14.890 DN Hợp Lệ</span></td>
                  </tr>
                  <tr>
                    <td>Đơn vị thụ hưởng NS</td>
                    <td><code>Mã QHNS</code></td>
                    <td>7 chữ số (Bộ Tài chính)</td>
                    <td><span class="badge badge-success">542 ĐV Hợp Lệ</span></td>
                  </tr>
                  <tr>
                    <td>Dự án Đầu tư công</td>
                    <td><code>Mã DA ĐTC</code></td>
                    <td>Mã định danh KBNN TABMIS</td>
                    <td><span class="badge badge-success">186 DA Hợp Lệ</span></td>
                  </tr>
                  <tr>
                    <td>Cơ sở nhà đất công</td>
                    <td><code>Mã TSC</code></td>
                    <td>CSDL Quốc gia Tài sản công</td>
                    <td><span class="badge badge-success">1.840 Cơ Sở Hợp Lệ</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  renderDataIntegrityCheck(containerId) {
    this.renderDataIntegrityAndInteroperabilityView(containerId);
  }
};

