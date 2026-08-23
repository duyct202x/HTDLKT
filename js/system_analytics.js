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
    { id: "LOG-98214", user: "Nguyễn Đình Hùng", dept: "Lãnh đạo Sở", action: "Phê duyệt Báo cáo chỉ đạo điều hành theo Quyết định số 2071 quý III/2026", ip: "10.79.1.10", time: "2026-08-20 12:10:45", status: "SUCCESS" },
    { id: "LOG-98213", user: "Hệ thống tự động", dept: "Văn phòng Sở", action: "Đồng bộ tự động 15 API từ CSDL quốc gia và Bộ, ngành", ip: "127.0.0.1", time: "2026-08-20 12:00:00", status: "SUCCESS" },
    { id: "LOG-98212", user: "Lê Thị Thu Hằng", dept: "Phòng Kinh tế và Ngân sách", action: "Xuất dữ liệu cân đối ngân sách nhà nước tháng 8/2026", ip: "10.79.1.24", time: "2026-08-20 11:45:22", status: "SUCCESS" },
    { id: "LOG-98211", user: "Phạm Minh Tuấn", dept: "Phòng Quản lý Đầu tư công", action: "Điều chỉnh tiến độ giải ngân dự án kè chống sạt lở sông Cái", ip: "10.79.1.35", time: "2026-08-20 11:30:10", status: "SUCCESS" },
    { id: "LOG-98210", user: "Trần Thanh Bình", dept: "Phòng Quản lý Đầu tư ngoài ngân sách", action: "Nạp Quyết định chấp thuận chủ trương đầu tư dự án DA-NNS-001", ip: "10.79.1.18", time: "2026-08-20 10:55:04", status: "SUCCESS" },
    { id: "LOG-98209", user: "Võ Văn Hoàng", dept: "Phòng Pháp chế", action: "Thẩm định dự thảo Nghị quyết phân cấp nguồn thu và nhiệm vụ chi", ip: "10.79.1.42", time: "2026-08-20 10:20:18", status: "SUCCESS" }
  ],

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
          <div class="card" style="padding: 14px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; border: 1px solid #e2e8f0;">
            <div>
              <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
                <span class="badge badge-purple">${d.docId}</span>
                <span class="badge badge-info">${d.dept}</span>
                <span style="font-size: 11px; color: #475569;">${d.issueDate}</span>
              </div>
              <h4 style="color: #0f172a; font-size: 14px; font-weight: 700;">${d.title}</h4>
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
          <div class="card" style="padding: 14px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; border: 1px solid #e2e8f0;">
            <div>
              <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
                <span class="badge badge-success">Doanh Nghiệp Trọng Điểm</span>
                <span style="font-size: 11px; color: #475569;">MST: ${t.mst}</span>
              </div>
              <h4 style="color: #0f172a; font-size: 14px; font-weight: 700;">${t.name}</h4>
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
      <div class="card-header">
        <div>
          <h3 class="card-title"><i data-lucide="alert-triangle"></i> Trung tâm giám sát và cảnh báo sớm kinh tế tỉnh Khánh Hòa</h3>
          <p class="card-subtitle">Hệ thống tự động quét và kích hoạt quy tắc cảnh báo dự án chậm giải ngân, doanh nghiệp rủi ro thuế và nhà đất quá hạn</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang chạy lại bộ quy tắc quét tự động...', 'info')">
          <i data-lucide="refresh-cw"></i> Quét quy tắc ngay
        </button>
      </div>

      <div class="api-service-grid" style="grid-template-columns: 1fr;">
        ${this.warningRules.map(w => `
          <div class="card" style="padding: 16px; background: #ffffff; border-left: 4px solid ${w.level === 'HIGH' ? '#ef4444' : w.level === 'MEDIUM' ? '#f59e0b' : '#3b82f6'}; margin-bottom: 10px; border: 1px solid #e2e8f0; border-left-width: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div style="display: flex; gap: 8px; align-items: center;">
                <span class="badge ${w.level === 'HIGH' ? 'badge-danger' : w.level === 'MEDIUM' ? 'badge-warning' : 'badge-info'}">
                  ${w.level === 'HIGH' ? 'Mức nguy cơ cao' : w.level === 'MEDIUM' ? 'Mức cảnh báo' : 'Theo dõi'}
                </span>
                <span class="badge badge-purple">${w.category}</span>
                <strong style="color: #0f172a; font-size: 14.5px;">${w.title}</strong>
              </div>
              <span style="font-size: 11.5px; color: #64748b; font-weight: 500;">${w.date}</span>
            </div>

            <div style="font-size: 12.5px; color: #334155; margin: 6px 0;">
              <strong>Đối tượng ảnh hưởng:</strong> <span style="color: #002B8C; font-weight: 600;">${w.target}</span>
            </div>
            <p style="font-size: 12px; color: #475569; line-height: 1.4;">${w.detail}</p>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding-top: 8px; border-top: 1px solid #f1f5f9;">
              <div style="font-size: 11.5px; color: #15803d; font-weight: 600;"><i data-lucide="check-circle-2"></i> ${w.action}</div>
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

  // 4. Màn hình Nhật ký Thao tác (Action Logs)
  renderAuditLogs(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="card-header">
        <div>
          <h3 class="card-title"><i data-lucide="history"></i> Nhật ký thao tác & giám sát an ninh hệ thống (Audit logs)</h3>
          <p class="card-subtitle">Ghi vết toàn bộ hành động đăng nhập, tra cứu, phê duyệt và đồng bộ dữ liệu theo Nghị định 356/2025/NĐ-CP</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang kết xuất tệp nhật ký Audit...', 'info')">
          <i data-lucide="download"></i> Xuất file log
        </button>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã Log</th>
              <th>Người Dùng Thực Hiện</th>
              <th>Phòng Ban</th>
              <th>Hành Động Nghiệp Vụ</th>
              <th>Địa Chỉ IP</th>
              <th>Thời Gian</th>
              <th>Kết Quả</th>
            </tr>
          </thead>
          <tbody>
            ${this.auditLogs.map(l => `
              <tr>
                <td><strong style="color: #0284c7;">${l.id}</strong></td>
                <td><strong>${l.user}</strong></td>
                <td><span class="badge badge-info">${l.dept}</span></td>
                <td>${l.action}</td>
                <td><code>${l.ip}</code></td>
                <td>${l.time}</td>
                <td><span class="badge badge-success">${l.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
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

