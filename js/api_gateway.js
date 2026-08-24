/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * PHÂN HỆ QUẢN TRỊ DANH MỤC & KẾT NỐI API BỘ TÀI CHÍNH (CV 4760 / QĐ 1323 / ĐẶC TẢ IOC V1.0)
 */

const ApiGatewayManager = {
  currentView: 'directory', // 'directory' | 'cards' | 'tester' | 'logs'
  currentCategory: 'ALL',
  searchKeyword: '',

  init() {
    this.renderApiGateway('adminApiGatewayContainer') || this.renderApiGateway('apiGatewayCard');
  },

  renderApiGateway(containerId = 'apiGatewayCard') {
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.getElementById('adminApiGatewayContainer') || document.getElementById('apiGatewayCard');
    }
    container.innerHTML = `
      <!-- TOP NAVIGATION BAR FOR API GATEWAY -->
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header" style="padding-bottom: 12px; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 class="card-title"><i data-lucide="network"></i> Quản trị Tích hợp API Gateway & Đồng bộ CSDL Quốc gia</h3>
            <p class="card-subtitle">Giám sát kết nối TABMIS Kho bạc, Thuế điện tử, CSDL Đăng ký doanh nghiệp và Đầu tư công Quốc gia</p>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="ApiGatewayManager.pingAllHealthCheckSystems()">
              <i data-lucide="activity"></i> Kiểm tra kết nối (Health-Check)
            </button>
            <button class="btn btn-primary btn-sm" onclick="ApiGatewayManager.openAddApiModal()">
              <i data-lucide="plus-circle"></i> Khai báo API mới
            </button>
          </div>
        </div>

        <div class="tabs-nav" id="apiGatewayMainTabs">
          <button class="tab-btn ${this.currentView === 'healthcheck' ? 'active' : ''}" onclick="ApiGatewayManager.switchMainView('healthcheck', this)">
            <i data-lucide="shield-check"></i> 1. Giám sát kết nối (Health-Check 4 Hệ thống)
          </button>
          <button class="tab-btn ${this.currentView === 'queue_sync' ? 'active' : ''}" onclick="ApiGatewayManager.switchMainView('queue_sync', this)">
            <i data-lucide="layers"></i> 2. Hàng đợi (Queue) & Nhật ký đồng bộ
          </button>
          <button class="tab-btn ${this.currentView === 'directory' ? 'active' : ''}" onclick="ApiGatewayManager.switchMainView('directory', this)">
            <i data-lucide="list"></i> 3. Danh mục 15 API chuyên ngành
          </button>
          <button class="tab-btn ${this.currentView === 'cards' ? 'active' : ''}" onclick="ApiGatewayManager.switchMainView('cards', this)">
            <i data-lucide="layout-grid"></i> 4. Sơ đồ kiến trúc luồng
          </button>
          <button class="tab-btn ${this.currentView === 'tester' ? 'active' : ''}" onclick="ApiGatewayManager.switchMainView('tester', this)">
            <i data-lucide="terminal"></i> 5. Kiểm thử API & Payload
          </button>
        </div>
      </div>

      <!-- DYNAMIC SUB-VIEW CONTAINER -->
      <div id="apiGatewayDynamicContent"></div>
    `;

    this.renderCurrentSubView();
    if (window.lucide) window.lucide.createIcons();
  },

  switchMainView(viewName, btn) {
    this.currentView = viewName;
    document.querySelectorAll('#apiGatewayMainTabs .tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderCurrentSubView();
  },

  renderCurrentSubView() {
    const container = document.getElementById('apiGatewayDynamicContent');
    if (!container) return;

    if (this.currentView === 'healthcheck') {
      container.innerHTML = this.renderHealthCheckView();
    } else if (this.currentView === 'queue_sync') {
      container.innerHTML = this.renderQueueSyncView();
    } else if (this.currentView === 'directory') {
      container.innerHTML = this.renderDirectoryView();
    } else if (this.currentView === 'cards') {
      container.innerHTML = `
        <div id="apiArchitectureFlowContainer"></div>
        <div class="card" style="margin-bottom: 24px;">
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="layers"></i> Danh mục 15 Dịch vụ API Tích hợp Chuyên ngành</h3>
              <p class="card-subtitle">Giám sát trạng thái vận hành thời gian thực, độ trễ và kích hoạt nạp dữ liệu định kỳ</p>
            </div>
            <button class="btn btn-primary btn-sm" id="btnSyncAllApis" onclick="ApiGatewayManager.syncAll()">
              <i data-lucide="refresh-cw"></i> Đồng bộ tất cả API
            </button>
          </div>

          <div id="apiCategoryFilters" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px;">
            <button class="btn btn-sm ${this.currentCategory === 'ALL' ? 'btn-primary' : 'btn-secondary'}" onclick="ApiGatewayManager.filterCategory('ALL', this)">Tất cả (15 API)</button>
            <button class="btn btn-sm ${this.currentCategory === 'Quản lý NSNN' ? 'btn-primary' : 'btn-secondary'}" onclick="ApiGatewayManager.filterCategory('Quản lý NSNN', this)">NSNN & Thuế</button>
            <button class="btn btn-sm ${this.currentCategory === 'Kho bạc' ? 'btn-primary' : 'btn-secondary'}" onclick="ApiGatewayManager.filterCategory('Kho bạc', this)">Kho bạc (Mẫu 04)</button>
            <button class="btn btn-sm ${this.currentCategory === 'Đầu tư công' ? 'btn-primary' : 'btn-secondary'}" onclick="ApiGatewayManager.filterCategory('Đầu tư công', this)">Đầu tư công & đấu thầu</button>
            <button class="btn btn-sm ${this.currentCategory === 'Tài sản công' ? 'btn-primary' : 'btn-secondary'}" onclick="ApiGatewayManager.filterCategory('Tài sản công', this)">Công sản & giá</button>
            <button class="btn btn-sm ${this.currentCategory === 'Doanh nghiệp' ? 'btn-primary' : 'btn-secondary'}" onclick="ApiGatewayManager.filterCategory('Doanh nghiệp', this)">Đăng ký KD & DNNN</button>
            <button class="btn btn-sm ${this.currentCategory === 'Quy hoạch' ? 'btn-primary' : 'btn-secondary'}" onclick="ApiGatewayManager.filterCategory('Quy hoạch', this)">Quy hoạch & GIS</button>
          </div>

          <div class="api-service-grid" id="apiServiceCardsGrid"></div>
        </div>
      `;
      this.renderArchitectureFlow();
      this.renderApiCards();
    } else if (this.currentView === 'tester') {
      container.innerHTML = this.renderTesterView();
    }

    if (window.lucide) window.lucide.createIcons();
  },

  // -------------------------------------------------------------
  // 0. MÀN HÌNH GIÁM SÁT KẾT NỐI (HEALTH-CHECK 4 HỆ THỐNG CỐT LÕI)
  // -------------------------------------------------------------
  renderHealthCheckView() {
    const systems = [
      {
        id: "SYS-TABMIS",
        name: "Hệ thống TABMIS (Kho bạc Nhà nước)",
        provider: "Bộ Tài chính & KBNN Khu vực XIV (Khánh Hòa)",
        endpoint: "https://tabmis.mof.gov.vn/api/v2/khanhhoa/ledger",
        status: "HEALTHY",
        ping: "42 ms",
        uptime: "99.99%",
        authType: "Mutual TLS / LGSP 2.0 (RSA-4096)",
        sslCert: "Hợp lệ (Hết hạn: 15/12/2027)",
        lastSync: "Vừa xong (12:00:00)",
        syncedRecords: "48.250 chứng từ",
        scope: "Thu - chi NSNN, số dư tài khoản, cam kết chi"
      },
      {
        id: "SYS-TMS-TAX",
        name: "Hệ thống Thuế điện tử TMS (Tổng cục Thuế)",
        provider: "Cục Thuế tỉnh Khánh Hòa",
        endpoint: "https://etax.gdt.gov.vn/api/v1/khanhhoa/tax-revenue",
        status: "HEALTHY",
        ping: "56 ms",
        uptime: "99.95%",
        authType: "OAuth 2.0 + HMAC-SHA256",
        sslCert: "Hợp lệ (Hết hạn: 20/09/2027)",
        lastSync: "15 phút trước",
        syncedRecords: "14.890 DN & Hộ kinh doanh",
        scope: "Thuế GTGT, TNDN, nợ thuế, tiền thuê đất"
      },
      {
        id: "SYS-CSDL-DN",
        name: "CSDL Quốc gia về Đăng ký Doanh nghiệp",
        provider: "Bộ Kế hoạch và Đầu tư",
        endpoint: "https://dangkykinhdoanh.gov.vn/api/v3/sync-enterprise",
        status: "HEALTHY",
        ping: "68 ms",
        uptime: "99.98%",
        authType: "RESTful / Bearer Token / AES-256",
        sslCert: "Hợp lệ (Hết hạn: 10/05/2028)",
        lastSync: "10 phút trước",
        syncedRecords: "14.890 pháp nhân DN",
        scope: "Thành lập mới, vốn điều lệ, người đại diện PL"
      },
      {
        id: "SYS-DTC-QG",
        name: "Hệ thống Quản lý Đầu tư công Quốc gia",
        provider: "Bộ Kế hoạch và Đầu tư",
        endpoint: "https://dautucong.mpi.gov.vn/api/v1/projects/khanhhoa",
        status: "HEALTHY",
        ping: "75 ms",
        uptime: "99.92%",
        authType: "OAuth 2.0 / OpenID Connect",
        sslCert: "Hợp lệ (Hết hạn: 18/11/2027)",
        lastSync: "30 phút trước",
        syncedRecords: "186 dự án ĐTC",
        scope: "Quyết định chủ trương, kế hoạch vốn trung hạn"
      }
    ];

    return `
      <!-- BANNER TỔNG QUAN HEALTH-CHECK -->
      <div class="healthcheck-grid">
        ${systems.map(s => `
          <div class="healthcheck-card status-${s.status === 'HEALTHY' ? 'healthy' : 'warning'}">
            <div class="healthcheck-header">
              <div>
                <span class="badge ${s.status === 'HEALTHY' ? 'badge-success' : 'badge-warning'}">
                  <span class="pulse-dot"></span> ${s.status === 'HEALTHY' ? 'Đang kết nối (Online)' : 'Đang đối soát'}
                </span>
                <div class="healthcheck-title" style="margin-top: 6px;">${s.name}</div>
                <div class="healthcheck-provider">${s.provider}</div>
              </div>
              <button class="btn btn-sm btn-outline" style="padding: 4px 8px;" onclick="ApiGatewayManager.pingSingleSystem('${s.id}')" title="Kiểm tra ping ngay">
                <i data-lucide="activity" style="width: 14px; height: 14px;"></i>
              </button>
            </div>

            <div style="background: #f8fafc; border-radius: 6px; padding: 10px; margin-bottom: 10px; border: 1px solid #e2e8f0;">
              <code style="font-size: 11px; color: #002B8C; word-break: break-all;">${s.endpoint}</code>
            </div>

            <div class="healthcheck-metric-row">
              <span style="color: #64748b;">Độ trễ phản hồi (Latency):</span>
              <strong style="color: #15803d; font-family: 'JetBrains Mono', monospace;">${s.ping}</strong>
            </div>
            <div class="healthcheck-metric-row">
              <span style="color: #64748b;">Tỷ lệ khả dụng (Uptime):</span>
              <strong style="color: #002B8C; font-family: 'JetBrains Mono', monospace;">${s.uptime}</strong>
            </div>
            <div class="healthcheck-metric-row">
              <span style="color: #64748b;">Chứng chỉ SSL/TLS:</span>
              <span style="color: #334155; font-size: 11.5px;">${s.sslCert}</span>
            </div>
            <div class="healthcheck-metric-row">
              <span style="color: #64748b;">Giao thức xác thực:</span>
              <span class="badge badge-purple" style="font-size: 10.5px;">${s.authType}</span>
            </div>
            <div class="healthcheck-metric-row">
              <span style="color: #64748b;">Đồng bộ gần nhất:</span>
              <strong style="color: #0f172a; font-size: 11.5px;">${s.lastSync}</strong>
            </div>
            <div class="healthcheck-metric-row">
              <span style="color: #64748b;">Số bản ghi đã nạp:</span>
              <strong style="color: #002B8C; font-family: 'JetBrains Mono', monospace;">${s.syncedRecords}</strong>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- CÁC THÔNG SỐ AN TOÀN & BẢO MẬT TRỤC TÍCH HỢP -->
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="lock"></i> Tiêu chuẩn kỹ thuật Trục kết nối & An toàn dữ liệu</h3>
            <p class="card-subtitle">Tuân thủ Khung Kiến trúc Chính phủ điện tử 2.0 và Nghị định 356/2025/NĐ-CP của Chính phủ</p>
          </div>
          <span class="badge badge-success">Mã hóa AES-256 / SHA-256</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
          <div style="background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #cbd5e1;">
            <div style="font-weight: 750; color: #002B8C; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
              <i data-lucide="key" style="width: 16px; height: 16px;"></i> Mã hóa truyền dẫn (In-Transit Encryption)
            </div>
            <div style="font-size: 12px; color: #475569; line-height: 1.45;">
              100% các kết nối ra ngoài qua API Gateway bắt buộc chạy giao thức TLS 1.3 với cặp khóa RSA-4096 bit và mã hóa đường truyền IPSec VPN chuyên dụng.
            </div>
          </div>

          <div style="background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #cbd5e1;">
            <div style="font-weight: 750; color: #002B8C; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
              <i data-lucide="cpu" style="width: 16px; height: 16px;"></i> Cơ chế Giới hạn tần suất (Rate Limiting)
            </div>
            <div style="font-size: 12px; color: #475569; line-height: 1.45;">
              Tích hợp bộ đệm Token Bucket giới hạn tối đa 2.500 req/phút đối với các cơ quan ngoài để chống nghẽn đường truyền và ngăn chặn tấn công từ chối dịch vụ (DDoS).
            </div>
          </div>

          <div style="background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #cbd5e1;">
            <div style="font-weight: 750; color: #002B8C; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
              <i data-lucide="database" style="width: 16px; height: 16px;"></i> Dự phòng & Phục hồi thảm họa (Disaster Recovery)
            </div>
            <div style="font-size: 12px; color: #475569; line-height: 1.45;">
              Dữ liệu được sao lưu định kỳ mỗi 60 phút sang Trung tâm Dữ liệu dự phòng (DR Site) tại Công viên Phần mềm Quân đội Nha Trang, RPO = 5 phút, RTO = 15 phút.
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // 1. HÀNG ĐỢI XỬ LÝ (QUEUE) & NHẬT KÝ ĐỒNG BỘ (SYNC LOGS) & CẢNH BÁO LỖI
  // -------------------------------------------------------------
  renderQueueSyncView() {
    const queueJobs = [
      { id: "JOB-7821", name: "Đồng bộ giao dịch Thu NSNN tháng 8/2026 từ TABMIS", source: "KBNN Khánh Hòa", target: "FACT_THU_NGAN_SACH", status: "PROCESSING", progress: 85, records: "1.240 / 1.450 dòng", latency: "1.2s", retryCount: 0 },
      { id: "JOB-7822", name: "Quét thông tin Doanh nghiệp thành lập mới quý III", source: "CSDL Quốc gia ĐKKD", target: "MD.DOANH_NGHIEP", status: "PENDING", progress: 0, records: "Chờ hàng đợi", latency: "---", retryCount: 0 },
      { id: "JOB-7823", name: "Cập nhật giải ngân 16 dự án ĐTC trọng điểm", source: "KBNN & QL ĐTC", target: "FACT_GIAI_NGAN_DTC", status: "SUCCESS", progress: 100, records: "186 dự án", latency: "420ms", retryCount: 0 },
      { id: "JOB-7820", name: "Đồng bộ nợ thuế quá hạn từ Hệ thống TMS", source: "Cục Thuế tỉnh", target: "FACT_NO_THUE_DN", status: "ERROR_SCHEMA", progress: 40, records: "412 lỗi / 1.890 dòng", latency: "890ms", retryCount: 2 }
    ];

    const syncHistory = [
      { syncId: "SYNC-20260824-001", apiCode: "API-01", name: "Đồng bộ dự toán và quyết toán KBNN (TABMIS)", time: "2026-08-24 12:00:00", duration: "1.4s", records: "48.250", status: "SUCCESS", httpCode: "200 OK" },
      { syncId: "SYNC-20260824-002", apiCode: "API-02", name: "Đồng bộ chỉ tiêu nộp thuế doanh nghiệp", time: "2026-08-24 11:45:00", duration: "2.1s", records: "14.890", status: "SUCCESS", httpCode: "200 OK" },
      { syncId: "SYNC-20260824-003", apiCode: "API-04", name: "Đồng bộ tiến độ giải ngân vốn đầu tư công", time: "2026-08-24 11:30:00", duration: "0.8s", records: "186", status: "SUCCESS", httpCode: "200 OK" },
      { syncId: "SYNC-20260824-004", apiCode: "API-07", name: "Tra cứu pháp nhân mới & người đại diện", time: "2026-08-24 11:15:00", duration: "1.9s", records: "342", status: "SUCCESS", httpCode: "200 OK" },
      { syncId: "SYNC-20260824-005", apiCode: "API-09", name: "Đồng bộ dữ liệu bảng giá đất & tài sản công", time: "2026-08-24 10:00:00", duration: "3.2s", records: "1.840", status: "SUCCESS", httpCode: "200 OK" }
    ];

    return `
      <!-- TỔNG QUAN CHỈ SỐ HÀNG ĐỢI (QUEUE STATS) -->
      <div class="queue-stat-grid">
        <div class="queue-stat-card">
          <div class="queue-stat-label">Tổng tác vụ đồng bộ (Total Jobs)</div>
          <div class="queue-stat-value" style="color: #002B8C;">1.435</div>
        </div>
        <div class="queue-stat-card">
          <div class="queue-stat-label">Đang chờ xử lý (Pending Jobs)</div>
          <div class="queue-stat-value" style="color: #d97706;">12</div>
        </div>
        <div class="queue-stat-card">
          <div class="queue-stat-label">Đang nạp CSDL (Processing)</div>
          <div class="queue-stat-value" style="color: #0284c7;">2</div>
        </div>
        <div class="queue-stat-card">
          <div class="queue-stat-label">Lỗi sai lệch định dạng (Schema Error)</div>
          <div class="queue-stat-value" style="color: #dc2626;">1</div>
        </div>
      </div>

      <!-- CẢNH BÁO LỖI SAI LỆCH ĐỊNH DẠNG TỰ ĐỘNG (DATA SCHEMA VALIDATION ALERTS) -->
      <div class="card" style="margin-bottom: 20px; border-left: 5px solid #dc2626; background: #fff1f2;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="font-size: 14.5px; font-weight: 750; color: #991b1b; display: flex; align-items: center; gap: 6px;">
              <i data-lucide="alert-octagon" style="width: 18px; height: 18px; color: #dc2626;"></i>
              CẢNH BÁO LỖI SAI LỆCH ĐỊNH DẠNG DỮ LIỆU TỰ ĐỘNG (DEAD-LETTER QUEUE ALERT)
            </div>
            <div style="font-size: 12.5px; color: #7f1d1d; margin-top: 4px; line-height: 1.45;">
              Hệ thống phát hiện bản ghi nợ thuế từ Cục Thuế <code>JOB-7820</code> có trường <code>TIEN_THUE_NO</code> vượt quá giới hạn <code>DECIMAL(18,2)</code> (chứa ký tự không hợp lệ).
              Hệ thống đã <strong>tự động cách ly bản ghi lỗi vào hàng đợi DLQ</strong> để không làm gián đoạn luồng nạp chính và kích hoạt cơ chế Auto-Retry sau 5 phút.
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-danger btn-sm" onclick="App.showNotification('Đang kích hoạt Auto-Retry xử lý lại hàng đợi lỗi...', 'info')">
              <i data-lucide="rotate-cw"></i> Chạy lại hàng đợi (Retry)
            </button>
            <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đã lưu log lỗi và bỏ qua bản ghi sai lệch để tiếp tục tiến trình.', 'warning')">
              <i data-lucide="skip-forward"></i> Bỏ qua bản ghi lỗi
            </button>
          </div>
        </div>
      </div>

      <!-- BẢNG HÀNG ĐỢI XỬ LÝ THỜI GIAN THỰC -->
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="cpu"></i> Hàng đợi xử lý tác vụ đồng bộ thời gian thực (Job Processing Queue)</h3>
            <p class="card-subtitle">Luồng xử lý bất đồng bộ đa tiến trình (Asynchronous Multi-threading Pipeline)</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="App.showNotification('Đang quét và làm mới trạng thái hàng đợi...', 'info')">
            <i data-lucide="refresh-cw"></i> Làm mới hàng đợi
          </button>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Mã Job</th>
                <th>Tên Tác Vụ Đồng Bộ</th>
                <th>Nguồn ➔ Đích</th>
                <th>Tiến Độ Xử Lý</th>
                <th>Khối Lượng Dữ Liệu</th>
                <th>Độ Trễ</th>
                <th>Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              ${queueJobs.map(j => {
                let stBadge = '';
                if (j.status === 'PROCESSING') stBadge = '<span class="badge badge-info"><span class="pulse-dot"></span> Đang nạp</span>';
                else if (j.status === 'PENDING') stBadge = '<span class="badge badge-warning">Chờ xử lý</span>';
                else if (j.status === 'SUCCESS') stBadge = '<span class="badge badge-success">Thành công</span>';
                else if (j.status === 'ERROR_SCHEMA') stBadge = '<span class="badge badge-danger">Lỗi định dạng</span>';

                return `
                  <tr>
                    <td><code style="color: #002B8C; font-weight: 700;">${j.id}</code></td>
                    <td><strong>${j.name}</strong></td>
                    <td><span style="font-size: 11.5px; color: #475569;">${j.source} ➔ <code>${j.target}</code></span></td>
                    <td style="min-width: 140px;">
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="flex: 1; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
                          <div style="width: ${j.progress}%; height: 100%; background: ${j.status === 'ERROR_SCHEMA' ? '#dc2626' : '#10b981'};"></div>
                        </div>
                        <span style="font-size: 11px; font-weight: 700; font-family: 'JetBrains Mono', monospace;">${j.progress}%</span>
                      </div>
                    </td>
                    <td style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px;">${j.records}</td>
                    <td style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #15803d;">${j.latency}</td>
                    <td>${stBadge}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- BẢNG NHẬT KÝ ĐỒNG BỘ DỮ LIỆU (SYNC LOGS) CHUẨN BIG DATA TABLE UX -->
      <div class="table-fullscreen-wrapper" id="wrapper_api_sync_logs">
        ${DeptWorkspaceManager.renderAdminTableToolbar('wrapper_api_sync_logs', 'table_api_sync_logs', 'Nhật ký đồng bộ dữ liệu API Gateway & CSDL Quốc gia')}
        <div class="table-scroll-container">
          <table class="data-table freeze-first" id="table_api_sync_logs">
            <thead>
              <tr>
                <th>Mã Đợt Đồng Bộ</th>
                <th>Mã Dịch Vụ API</th>
                <th>Tên Giao Dịch Đồng Bộ</th>
                <th>Thời Gian Thực Hiện</th>
                <th>Thời Gian Xử Lý</th>
                <th>Số Bản Ghi Nạp</th>
                <th>Mã Trạng Thái</th>
                <th style="text-align: center;">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              ${syncHistory.map(h => `
                <tr>
                  <td><strong style="color: #002B8C;">${h.syncId}</strong></td>
                  <td><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #002B8C; font-weight: 700;">${h.apiCode}</code></td>
                  <td><strong>${h.name}</strong></td>
                  <td><span style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px;">${h.time}</span></td>
                  <td><span style="font-family: 'JetBrains Mono', monospace; color: #15803d; font-weight: 600;">${h.duration}</span></td>
                  <td><strong style="font-family: 'JetBrains Mono', monospace; color: #0f172a;">${h.records}</strong></td>
                  <td><span class="badge badge-success">${h.httpCode}</span></td>
                  <td style="text-align: center;">
                    <button class="btn btn-sm btn-outline" onclick="App.showNotification('Đang mở chi tiết gói tin JSON của đợt đồng bộ ${h.syncId}...', 'info')">
                      <i data-lucide="eye"></i> Chi tiết
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

  pingAllHealthCheckSystems() {
    App.showNotification('Đang kiểm tra kết nối (Ping Health-Check) 4 hệ thống Quốc gia...', 'info');
    setTimeout(() => {
      App.showNotification('Tất cả 4 hệ thống cốt lõi (TABMIS, Thuế TMS, CSDL ĐKKD, Đầu tư công) hoạt động hoàn hảo 100%!', 'success');
    }, 700);
  },

  pingSingleSystem(sysId) {
    App.showNotification(`Đang gửi tín hiệu kiểm tra tới [${sysId}]...`, 'info');
    setTimeout(() => {
      App.showNotification(`Hệ thống [${sysId}] phản hồi tức thì với độ trễ tối ưu (Latency < 75ms)!`, 'success');
    }, 500);
  },

  // -------------------------------------------------------------
  // 1. MÀN HÌNH DANH MỤC & QUẢN TRỊ KẾT NỐI API (DIRECTORY TABLE)
  // -------------------------------------------------------------
  renderDirectoryView() {
    let apis = APP_DATA.btcApis;
    if (this.currentCategory !== 'ALL') {
      apis = apis.filter(a => a.category.includes(this.currentCategory));
    }
    if (this.searchKeyword) {
      const kw = this.searchKeyword.toLowerCase();
      apis = apis.filter(a => a.code.toLowerCase().includes(kw) || a.name.toLowerCase().includes(kw) || a.targetTable.toLowerCase().includes(kw) || a.provider.toLowerCase().includes(kw));
    }

    return `
      <div class="card">
        <!-- FILTER & SEARCH BAR -->
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;">
          <div style="display: flex; gap: 8px; flex: 1; min-width: 280px;">
            <input type="text" class="form-control" id="inputApiSearch" placeholder="Tìm kiếm theo Mã API, Tên dịch vụ, Bảng CSDL đích, Đơn vị cung cấp..." value="${this.searchKeyword}" oninput="ApiGatewayManager.handleSearchInput(event)" />
            <select class="form-control" style="width: 200px;" onchange="ApiGatewayManager.handleCategorySelect(this.value)">
              <option value="ALL">Tất cả chuyên ngành</option>
              <option value="Quản lý NSNN">NSNN & Thuế</option>
              <option value="Kho bạc">Kho bạc Nhà nước</option>
              <option value="Đầu tư công">Đầu tư công & Đấu thầu</option>
              <option value="Tài sản công">Công sản & Giá</option>
              <option value="Doanh nghiệp">Doanh nghiệp</option>
              <option value="Quy hoạch">Quy hoạch & GIS</option>
            </select>
          </div>
          <div style="font-size: 12.5px; color: #64748b;">
            Hiển thị <strong>${apis.length} / ${APP_DATA.btcApis.length}</strong> kết nối API
          </div>
        </div>

        <!-- MASTER API TABLE -->
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 80px;">Mã API</th>
                <th style="min-width: 220px;">Tên Dịch vụ & Đơn vị Cung cấp</th>
                <th style="min-width: 220px;">Endpoint URL & Giao thức</th>
                <th>Bảo mật & Xác thực</th>
                <th>Bảng CSDL Đích</th>
                <th>Tần suất / Lịch Cron</th>
                <th>Trạng thái</th>
                <th style="width: 170px; text-align: center;">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${apis.map(api => `
                <tr>
                  <td><code style="font-weight: 700; color: #0284c7; font-size: 11px;">${api.code}</code></td>
                  <td>
                    <div style="font-weight: 700; color: var(--text-pure); font-size: 13px;">${api.name}</div>
                    <div style="font-size: 11px; color: #0284c7;">${api.provider}</div>
                  </td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                      <span class="api-badge-method">${api.method}</span>
                      <code style="font-size: 10.5px; color: #475569; word-break: break-all;">${api.endpoint}</code>
                    </div>
                  </td>
                  <td><span class="badge badge-purple" style="font-size: 10.5px;">${api.authType}</span></td>
                  <td><code style="font-size: 11px; color: #15803d; font-weight: 600;">${api.targetTable}</code></td>
                  <td style="font-size: 11.5px; color: #64748b;">${api.cronSchedule}</td>
                  <td>
                    <span class="badge ${api.status === 'HEALTHY' ? 'badge-success' : 'badge-warning'}">
                      <i class="status-dot"></i> ${api.status === 'HEALTHY' ? 'Đang kết nối' : 'Đang gửi CV'}
                    </span>
                  </td>
                  <td style="text-align: center; vertical-align: middle;">
                    <div style="display: inline-flex; align-items: center; justify-content: center; gap: 4px; white-space: nowrap; flex-wrap: nowrap;">
                      <button class="btn btn-outline btn-xs" title="Cấu hình tham số kết nối" onclick="ApiGatewayManager.openConfigModal('${api.code}')" style="padding: 4px 6px; width: 28px; height: 26px; display: inline-flex; align-items: center; justify-content: center;">
                        <i data-lucide="settings" style="width: 13px; height: 13px;"></i>
                      </button>
                      <button class="btn btn-outline btn-xs" title="Ánh xạ trường dữ liệu CSDL" onclick="ApiGatewayManager.openFieldMappingModal('${api.code}')" style="padding: 4px 6px; width: 28px; height: 26px; display: inline-flex; align-items: center; justify-content: center;">
                        <i data-lucide="git-merge" style="width: 13px; height: 13px;"></i>
                      </button>
                      <button class="btn btn-outline btn-xs" title="Kiểm tra kết nối (Test Ping)" onclick="ApiGatewayManager.testSingleConnection('${api.code}')" style="padding: 4px 6px; width: 28px; height: 26px; display: inline-flex; align-items: center; justify-content: center;">
                        <i data-lucide="activity" style="width: 13px; height: 13px;"></i>
                      </button>
                      <button class="btn btn-outline btn-xs" title="Đồng bộ ngay" onclick="ApiGatewayManager.triggerSync('${api.code}')" style="padding: 4px 6px; width: 28px; height: 26px; display: inline-flex; align-items: center; justify-content: center; color: #002B8C; border-color: #93c5fd;">
                        <i data-lucide="refresh-cw" style="width: 13px; height: 13px;"></i>
                      </button>
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

  handleSearchInput(e) {
    this.searchKeyword = e.target.value;
    const container = document.getElementById('apiGatewayDynamicContent');
    if (container && this.currentView === 'directory') {
      container.innerHTML = this.renderDirectoryView();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  handleCategorySelect(val) {
    this.currentCategory = val;
    const container = document.getElementById('apiGatewayDynamicContent');
    if (container && this.currentView === 'directory') {
      container.innerHTML = this.renderDirectoryView();
      if (window.lucide) window.lucide.createIcons();
    }
  },

  // -------------------------------------------------------------
  // 2. MODAL CẤU HÌNH THAM SỐ KẾT NỐI API
  // -------------------------------------------------------------
  openConfigModal(apiCode) {
    const api = APP_DATA.btcApis.find(a => a.code === apiCode);
    if (!api) return;

    const modalTitle = document.getElementById('modalGenericTitle');
    const modalBody = document.getElementById('modalGenericBody');

    modalTitle.innerHTML = `<i data-lucide="settings" style="color: #0284c7;"></i> Cấu hình Tham số Kết nối API [${api.code}]`;
    modalBody.innerHTML = `
      <form id="formApiConfig" onsubmit="ApiGatewayManager.saveApiConfig(event, '${api.code}')">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Mã dịch vụ API <span class="req">*</span></label>
            <input type="text" class="form-control" name="code" value="${api.code}" readonly />
          </div>
          <div class="form-group">
            <label class="form-label">Tên dịch vụ tích hợp <span class="req">*</span></label>
            <input type="text" class="form-control" name="name" value="${api.name}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Đơn vị chủ quản / Cung cấp dữ liệu <span class="req">*</span></label>
            <input type="text" class="form-control" name="provider" value="${api.provider}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Phương thức giao tiếp (HTTP Method) <span class="req">*</span></label>
            <select class="form-control" name="method">
              <option value="POST" ${api.method === 'POST' ? 'selected' : ''}>POST (JSON/REST)</option>
              <option value="GET" ${api.method === 'GET' ? 'selected' : ''}>GET (REST Endpoint)</option>
              <option value="REST/mTLS" ${api.method === 'REST/mTLS' ? 'selected' : ''}>REST / mTLS Bảo mật kép</option>
              <option value="SOAP/XML" ${api.method === 'SOAP/XML' ? 'selected' : ''}>SOAP / XML Web Service</option>
              <option value="WMS/REST" ${api.method === 'WMS/REST' ? 'selected' : ''}>WMS / Spatial REST GIS</option>
            </select>
          </div>
          <div class="form-group full-width">
            <label class="form-label">Endpoint URL (Chính thức - Production) <span class="req">*</span></label>
            <input type="text" class="form-control" name="endpoint" value="${api.endpoint}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Cơ chế Xác thực & Bảo mật <span class="req">*</span></label>
            <select class="form-control" name="authType">
              <option value="mTLS + OAuth 2.0 (Bearer)" ${api.authType.includes('mTLS') ? 'selected' : ''}>mTLS + OAuth 2.0 (Bearer Token)</option>
              <option value="OAuth 2.0 (Bearer Token)" ${api.authType.includes('OAuth 2.0') ? 'selected' : ''}>OAuth 2.0 Client Credentials</option>
              <option value="API Key + IP Whitelist" ${api.authType.includes('API Key') ? 'selected' : ''}>API Key + IP Whitelist</option>
              <option value="WS-Security / X.509 Certificate" ${api.authType.includes('X.509') ? 'selected' : ''}>WS-Security (X.509 Cert)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Bảng CSDL Đích tiếp nhận (Data Warehouse) <span class="req">*</span></label>
            <input type="text" class="form-control" name="targetTable" value="${api.targetTable}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Lịch trình Cron Schedule <span class="req">*</span></label>
            <input type="text" class="form-control" name="cronSchedule" value="${api.cronSchedule}" placeholder="Ví dụ: 0 4 * * *" required />
          </div>
          <div class="form-group">
            <label class="form-label">Thời gian chờ phản hồi tối đa (Timeout ms)</label>
            <input type="number" class="form-control" name="timeoutMs" value="${api.timeoutMs || 5000}" />
          </div>
          <div class="form-group full-width">
            <label class="form-label">Mô tả nghiệp vụ & Ghi chú quản trị</label>
            <textarea class="form-control" name="description">${api.description}</textarea>
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px;">
          <button type="button" class="btn btn-secondary" onclick="App.closeModal('modalGeneric')">Đóng</button>
          <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Lưu cấu hình kết nối</button>
        </div>
      </form>
    `;

    App.openModal('modalGeneric');
    if (window.lucide) window.lucide.createIcons();
  },

  saveApiConfig(e, apiCode) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const api = APP_DATA.btcApis.find(a => a.code === apiCode);
    if (api) {
      api.name = formData.get('name');
      api.provider = formData.get('provider');
      api.method = formData.get('method');
      api.endpoint = formData.get('endpoint');
      api.authType = formData.get('authType');
      api.targetTable = formData.get('targetTable');
      api.cronSchedule = formData.get('cronSchedule');
      api.timeoutMs = parseInt(formData.get('timeoutMs')) || 5000;
      api.description = formData.get('description');
    }

    App.closeModal('modalGeneric');
    this.renderCurrentSubView();
    App.showNotification(`Đã lưu cấu hình kết nối API [${apiCode}] thành công!`, 'success');
  },

  // -------------------------------------------------------------
  // 3. MODAL CẤU HÌNH ÁNH XẠ TRƯỜNG DỮ LIỆU (FIELD MAPPINGS)
  // -------------------------------------------------------------
  openFieldMappingModal(apiCode) {
    const api = APP_DATA.btcApis.find(a => a.code === apiCode);
    if (!api) return;

    const modalTitle = document.getElementById('modalGenericTitle');
    const modalBody = document.getElementById('modalGenericBody');

    const mappings = api.fieldMappings || [];

    modalTitle.innerHTML = `<i data-lucide="git-merge" style="color: #0284c7;"></i> Cấu hình Ánh xạ Trường Dữ liệu [${api.code}] ➔ ${api.targetTable}`;
    modalBody.innerHTML = `
      <div style="margin-bottom: 14px; font-size: 12.5px; color: #475569;">
        Định nghĩa quy tắc chuyển đổi giữa các thuộc tính trong gói tin JSON/XML của Bộ Tài chính với các cột trong bảng CSDL của Sở Tài chính:
      </div>

      <div class="table-responsive" style="max-height: 340px; overflow-y: auto;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Trường Nguồn (Source JSON)</th>
              <th>Kiểu Dữ liệu</th>
              <th>Cột Đích (DB Target Column)</th>
              <th>Mô tả Ý nghĩa</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            ${mappings.map(m => `
              <tr>
                <td><code style="color: #0284c7; font-weight: 700;">${m.source}</code></td>
                <td><span class="badge badge-purple">${m.type}</span></td>
                <td><code style="color: #15803d; font-weight: 700;">${m.target}</code></td>
                <td style="font-size: 11.5px; color: #64748b;">${m.desc}</td>
                <td><span class="badge badge-success"><i class="status-dot"></i> Đã ánh xạ</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 12px;">
        <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang thêm dòng ánh xạ trường mới...', 'info')">
          <i data-lucide="plus"></i> Thêm trường ánh xạ mới
        </button>
        <button class="btn btn-primary btn-sm" onclick="App.closeModal('modalGeneric'); App.showNotification('Đã lưu quy tắc ánh xạ trường dữ liệu thành công!', 'success');">
          <i data-lucide="check"></i> Xác nhận & Hoàn tất
        </button>
      </div>
    `;

    App.openModal('modalGeneric');
    if (window.lucide) window.lucide.createIcons();
  },

  // -------------------------------------------------------------
  // 4. TEST CONNECTION & PING
  // -------------------------------------------------------------
  testSingleConnection(apiCode) {
    const api = APP_DATA.btcApis.find(a => a.code === apiCode);
    if (!api) return;

    App.showNotification(`Đang gửi yêu cầu Ping kiểm tra kết nối tới [${api.endpoint}]...`, 'info');

    setTimeout(() => {
      const isConnected = api.status !== 'PENDING_CONN';
      const latencyVal = isConnected ? Math.floor(Math.random() * 30 + 20) + 'ms' : 'Timeout (Chờ cấp phép)';
      
      const modalTitle = document.getElementById('modalGenericTitle');
      const modalBody = document.getElementById('modalGenericBody');

      modalTitle.innerHTML = `<i data-lucide="activity" style="color: #0284c7;"></i> Kết quả Kiểm tra Kết nối [${api.code}]`;
      modalBody.innerHTML = `
        <div style="background: #0f172a; border-radius: 8px; padding: 16px; color: #fff; font-family: monospace; font-size: 12px; line-height: 1.6;">
          <div style="color: #38bdf8; font-weight: 700; margin-bottom: 8px;">=== HTTP/2 TEST CONNECTION REPORT ===</div>
          <div>Endpoint: <span style="color: #cbd5e1;">${api.endpoint}</span></div>
          <div>Method: <span style="color: #f59e0b;">${api.method}</span></div>
          <div>Auth Protocol: <span style="color: #a855f7;">${api.authType}</span></div>
          <div>SSL Certificate: <span style="color: #10b981;">Valid (DigiCert Global Root G2 - TLS 1.3)</span></div>
          <div>Handshake Latency: <strong style="color: #38bdf8;">${latencyVal}</strong></div>
          <div style="margin-top: 10px; padding: 8px; border-radius: 4px; background: ${isConnected ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}; border-left: 4px solid ${isConnected ? '#10b981' : '#f59e0b'};">
            ${isConnected 
              ? '<strong>STATUS 200 OK:</strong> Kết nối thông suốt, sẵn sàng trao đổi dữ liệu tự động.' 
              : '<strong>STATUS PENDING:</strong> Đang chờ văn bản hướng dẫn và khóa token API từ Bộ Tài chính.'}
          </div>
        </div>
      `;

      App.openModal('modalGeneric');
      if (window.lucide) window.lucide.createIcons();
    }, 600);
  },

  pingAllConnections() {
    App.showNotification("Đang chạy kiểm tra song song trạng thái toàn bộ 12 dịch vụ API...", "info");
    setTimeout(() => {
      APP_DATA.btcApis.forEach(a => {
        if (a.status === 'HEALTHY') {
          a.latency = Math.floor(Math.random() * 25 + 22) + 'ms';
        }
      });
      this.renderCurrentSubView();
      App.showNotification("Đã kiểm tra xong 12 API: 10 API trực tuyến (Online), 02 API đang chờ cấp phép!", "success");
    }, 1000);
  },

  // -------------------------------------------------------------
  // 5. MODAL THÊM MỚI KẾT NỐI API
  // -------------------------------------------------------------
  openAddApiModal() {
    const modalTitle = document.getElementById('modalGenericTitle');
    const modalBody = document.getElementById('modalGenericBody');

    modalTitle.innerHTML = `<i data-lucide="plus-circle" style="color: #0284c7;"></i> Khai báo Dịch vụ Kết nối API Mới`;
    modalBody.innerHTML = `
      <form id="formAddApi" onsubmit="ApiGatewayManager.handleAddApiSubmit(event)">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Mã API mới <span class="req">*</span></label>
            <input type="text" class="form-control" name="code" placeholder="Ví dụ: API-BTC-NEW-01" required />
          </div>
          <div class="form-group">
            <label class="form-label">Tên dịch vụ tích hợp <span class="req">*</span></label>
            <input type="text" class="form-control" name="name" placeholder="Ví dụ: Dữ liệu Quản lý Quỹ Hỗ trợ Nông dân..." required />
          </div>
          <div class="form-group">
            <label class="form-label">Nhóm chuyên ngành <span class="req">*</span></label>
            <select class="form-control" name="category">
              <option value="Quản lý NSNN & Thuế">Quản lý NSNN & Thuế</option>
              <option value="Kho bạc Nhà nước">Kho bạc Nhà nước</option>
              <option value="Đầu tư công">Đầu tư công & Đấu thầu</option>
              <option value="Tài sản công & Giá">Tài sản công & Giá</option>
              <option value="Doanh nghiệp & Đầu tư">Doanh nghiệp & Đầu tư</option>
              <option value="Quy hoạch & Bản đồ">Quy hoạch & Bản đồ</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Đơn vị cung cấp <span class="req">*</span></label>
            <input type="text" class="form-control" name="provider" placeholder="Ví dụ: Bộ Tài chính / Sở ngành..." required />
          </div>
          <div class="form-group full-width">
            <label class="form-label">Endpoint URL <span class="req">*</span></label>
            <input type="text" class="form-control" name="endpoint" placeholder="https://api.domain.gov.vn/api/v1/..." required />
          </div>
          <div class="form-group">
            <label class="form-label">Phương thức</label>
            <select class="form-control" name="method">
              <option value="POST">POST (JSON/REST)</option>
              <option value="GET">GET (REST)</option>
              <option value="REST/mTLS">REST / mTLS</option>
              <option value="SOAP/XML">SOAP / XML</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Bảng CSDL Đích <span class="req">*</span></label>
            <input type="text" class="form-control" name="targetTable" placeholder="Ví dụ: FT.FACT_DATA_MOI" required />
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px;">
          <button type="button" class="btn btn-secondary" onclick="App.closeModal('modalGeneric')">Hủy</button>
          <button type="submit" class="btn btn-primary"><i data-lucide="plus-circle"></i> Khai báo kết nối</button>
        </div>
      </form>
    `;

    App.openModal('modalGeneric');
    if (window.lucide) window.lucide.createIcons();
  },

  handleAddApiSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newApi = {
      code: formData.get('code'),
      name: formData.get('name'),
      category: formData.get('category'),
      provider: formData.get('provider'),
      endpoint: formData.get('endpoint'),
      method: formData.get('method'),
      authType: "OAuth 2.0 (Bearer)",
      targetTable: formData.get('targetTable'),
      cronSchedule: "0 4 * * * (04:00 Hằng ngày)",
      frequency: "Hằng ngày",
      timeoutMs: 5000,
      enabled: true,
      status: "HEALTHY",
      latency: "35ms",
      lastSync: new Date().toISOString().replace('T', ' ').substring(0, 19),
      recordsSynced: 0,
      description: "Dịch vụ tích hợp kết nối mới được khai báo.",
      fieldMappings: []
    };

    APP_DATA.btcApis.unshift(newApi);
    App.closeModal('modalGeneric');
    this.renderCurrentSubView();
    App.showNotification(`Đã thêm mới kết nối API [${newApi.code}] thành công!`, 'success');
  },

  // -------------------------------------------------------------
  // 6. TRÌNH KIỂM THỬ ENDPOINT & PAYLOAD (TESTER VIEW)
  // -------------------------------------------------------------
  renderTesterView() {
    return `
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="terminal"></i> Trình Giả lập & Kiểm thử API Endpoint (API Console Tester)</h3>
            <p class="card-subtitle">Thực hiện gửi request mẫu, kiểm tra phản hồi HTTP Header, Payload JSON và mã băm SHA-256</p>
          </div>
        </div>

        <div class="form-grid" style="margin-bottom: 16px;">
          <div class="form-group" style="grid-column: span 2;">
            <label class="form-label">Chọn Dịch vụ API cần kiểm thử</label>
            <select class="form-control" id="selectApiTester" onchange="ApiGatewayManager.loadTesterApi(this.value)">
              ${APP_DATA.btcApis.map(a => `
                <option value="${a.code}">[${a.code}] ${a.name} (${a.endpoint})</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="responsive-2col-grid">
          <!-- REQUEST CONSOLE -->
          <div>
            <div style="font-weight: 700; font-size: 12.5px; color: #0284c7; margin-bottom: 6px;">REQUEST HEADERS & BODY:</div>
            <div style="background: #0f172a; border-radius: 8px; padding: 14px; color: #38bdf8; font-family: monospace; font-size: 11.5px; min-height: 240px;" id="testerRequestBody">
              <pre>POST /ioc-data-exchange/api/v1/shared/nsnn_thu HTTP/2
Host: api-csdltc.mof.gov.vn
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6...
Content-Type: application/json
X-Client-Cert-SHA256: 8f4b23c91e0a8d42...

{
  "from_date": "2026-08-19",
  "to_date": "2026-08-20",
  "province_code": "79"
}</pre>
            </div>
            <button class="btn btn-primary btn-sm" style="margin-top: 10px; width: 100%;" onclick="ApiGatewayManager.runTesterRequest()">
              <i data-lucide="play"></i> Gửi Request kiểm thử ngay
            </button>
          </div>

          <!-- RESPONSE CONSOLE -->
          <div>
            <div style="font-weight: 700; font-size: 12.5px; color: #10b981; margin-bottom: 6px;">RESPONSE (HTTP 200 OK - 42ms):</div>
            <div style="background: #0f172a; border-radius: 8px; padding: 14px; color: #34d399; font-family: monospace; font-size: 11.5px; min-height: 240px; overflow-y: auto;" id="testerResponseBody">
              <pre>{
  "status": 200,
  "message": "SUCCESS",
  "timestamp": "2026-08-20T04:30:15Z",
  "records_count": 1240,
  "checksum_sha256": "8f4b23c91e0a8d42398ab76dfa514...",
  "data": [
    {
      "DT": "2026-08-19",
      "MA_DB": "79",
      "TEN_DB": "Tỉnh Khánh Hòa",
      "MA_CNS": "1",
      "VAL": 4380500000000
    }
  ]
}</pre>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  loadTesterApi(apiCode) {
    const api = APP_DATA.btcApis.find(a => a.code === apiCode);
    if (!api) return;

    const reqEl = document.getElementById('testerRequestBody');
    if (reqEl) {
      reqEl.innerHTML = `
        <pre>${api.method} ${api.endpoint} HTTP/2
Host: api-csdltc.mof.gov.vn
Authorization: ${api.authType}
Content-Type: application/json

{
  "service_code": "${api.code}",
  "target_table": "${api.targetTable}",
  "request_time": "${new Date().toISOString()}"
}</pre>
      `;
    }
  },

  runTesterRequest() {
    App.showNotification("Đang gửi yêu cầu kiểm thử tới CSDL Quốc gia...", "info");
    setTimeout(() => {
      App.showNotification("Nhận phản hồi HTTP 200 OK! Gói tin hợp lệ và toàn vẹn.", "success");
    }, 500);
  },

  // -------------------------------------------------------------
  // 7. SƠ ĐỒ KIẾN TRÚC & GIÁM SÁT CARDS
  // -------------------------------------------------------------
  filterCategory(cat, btn) {
    this.currentCategory = cat;
    document.querySelectorAll('#apiCategoryFilters .btn').forEach(b => b.classList.remove('btn-primary'));
    document.querySelectorAll('#apiCategoryFilters .btn').forEach(b => b.classList.add('btn-secondary'));
    if (btn) {
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');
    }
    this.renderApiCards();
  },

  renderArchitectureFlow() {
    const container = document.getElementById('apiArchitectureFlowContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="background: linear-gradient(135deg, #0b1528 0%, #172554 50%, #0f172a 100%); border: 1px solid #1e3a8a; border-radius: 14px; padding: 22px; margin-bottom: 24px; color: #fff; box-shadow: 0 10px 30px -5px rgba(2, 43, 140, 0.25);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 style="font-size: 15.5px; font-weight: 800; color: #38bdf8; display: flex; align-items: center; gap: 9px; letter-spacing: -0.01em;">
              <i data-lucide="network" style="color: #38bdf8;"></i> Sơ đồ Kiến trúc Tích hợp & Luồng Dữ liệu Liên thông CSDL Quốc gia
            </h3>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 4px;">
              Mô hình kết nối an toàn đa tầng qua Trục LGSP tỉnh Khánh Hòa theo Công văn số 4760/BTC-CNTT và Quyết định số 1323/QĐ-BTC
            </p>
          </div>
          <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); padding: 6px 14px; font-size: 12px;">
            <i class="status-dot"></i> Trực tuyến 15/15 Dịch vụ API
          </span>
        </div>

        <div class="pipeline-flow-grid">
          <!-- LAYER 1: EXTERNAL SOURCES -->
          <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 10px; padding: 14px; backdrop-filter: blur(8px);">
            <div style="font-size: 11.5px; font-weight: 800; color: #38bdf8; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
              <i data-lucide="cloud" style="width: 14px; height: 14px;"></i> 1. CSDL Quốc gia & Bộ/Ngành
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px;">
              <div style="background: rgba(15, 23, 42, 0.8); padding: 7px 10px; border-radius: 6px; border-left: 3px solid #38bdf8; color: #e2e8f0; font-weight: 500;">Tổng cục Thuế (eTax / TMS)</div>
              <div style="background: rgba(15, 23, 42, 0.8); padding: 7px 10px; border-radius: 6px; border-left: 3px solid #38bdf8; color: #e2e8f0; font-weight: 500;">Kho bạc Nhà nước (TABMIS & Mẫu 04)</div>
              <div style="background: rgba(15, 23, 42, 0.8); padding: 7px 10px; border-radius: 6px; border-left: 3px solid #38bdf8; color: #e2e8f0; font-weight: 500;">Bộ KH&ĐT (ĐKKD & Đấu thầu QG)</div>
              <div style="background: rgba(15, 23, 42, 0.8); padding: 7px 10px; border-radius: 6px; border-left: 3px solid #38bdf8; color: #e2e8f0; font-weight: 500;">Cục QL Công sản & Cục Giá (BTC)</div>
              <div style="background: rgba(15, 23, 42, 0.8); padding: 7px 10px; border-radius: 6px; border-left: 3px solid #38bdf8; color: #e2e8f0; font-weight: 500;">Cổng GIS Tỉnh & CSDL Quy hoạch QG</div>
            </div>
          </div>

          <!-- ARROW 1 -->
          <div style="text-align: center; color: #38bdf8; font-size: 22px; font-weight: bold; text-shadow: 0 0 10px rgba(56, 189, 248, 0.5);">➔</div>

          <!-- LAYER 2: SECURE API GATEWAY -->
          <div style="background: rgba(2, 43, 140, 0.35); border: 2px solid #38bdf8; border-radius: 10px; padding: 16px; text-align: center; box-shadow: 0 0 20px rgba(56, 189, 248, 0.15);">
            <div style="font-size: 12.5px; font-weight: 800; color: #67e8f9; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; justify-content: center; gap: 6px;">
              <i data-lucide="shield-check" style="width: 16px; height: 16px;"></i> 2. Trục LGSP & API Gateway Khánh Hòa
            </div>
            <div style="font-size: 11.5px; color: #cbd5e1; line-height: 1.7; text-align: left; background: rgba(15, 23, 42, 0.85); padding: 12px; border-radius: 8px; border: 1px solid rgba(56, 189, 248, 0.2);">
              <div>🔒 Bảo mật: <strong style="color: #67e8f9;">mTLS / OAuth 2.0 / AES-256</strong></div>
              <div>🛡️ Toàn vẹn dữ liệu: <strong style="color: #67e8f9;">Checksum SHA-256</strong></div>
              <div>⚡ Bộ đệm dữ liệu: <strong style="color: #67e8f9;">Kafka Message Queue</strong></div>
              <div>⏱️ Giám sát tải & Tần suất: <strong style="color: #67e8f9;">Rate Limiting Active</strong></div>
            </div>
          </div>

          <!-- ARROW 2 -->
          <div style="text-align: center; color: #34d399; font-size: 22px; font-weight: bold; text-shadow: 0 0 10px rgba(52, 211, 153, 0.5);">➔</div>

          <!-- LAYER 3: DATA WAREHOUSE & MARTS -->
          <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(52, 211, 153, 0.3); border-radius: 10px; padding: 14px; backdrop-filter: blur(8px);">
            <div style="font-size: 11.5px; font-weight: 800; color: #34d399; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
              <i data-lucide="database" style="width: 14px; height: 14px;"></i> 3. Kho Dữ liệu Kinh tế STC
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px;">
              <div style="background: rgba(15, 23, 42, 0.8); padding: 7px 10px; border-radius: 6px; border-left: 3px solid #34d399; color: #e2e8f0; font-weight: 500;">26 Bảng Master Data (Dữ liệu chủ)</div>
              <div style="background: rgba(15, 23, 42, 0.8); padding: 7px 10px; border-radius: 6px; border-left: 3px solid #34d399; color: #e2e8f0; font-weight: 500;">23 Bảng Fact Data (Số liệu vận hành)</div>
              <div style="background: rgba(15, 23, 42, 0.8); padding: 7px 10px; border-radius: 6px; border-left: 3px solid #34d399; color: #e2e8f0; font-weight: 500;">06 Data Marts Phục vụ Điều hành</div>
              <div style="background: rgba(15, 23, 42, 0.8); padding: 7px 10px; border-radius: 6px; border-left: 3px solid #34d399; color: #e2e8f0; font-weight: 500;">Kho 1,05 triệu trang PDF/A-2b Số hóa</div>
            </div>
          </div>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  },

  renderApiCards() {
    const container = document.getElementById('apiServiceCardsGrid');
    if (!container) return;

    const filteredApis = this.currentCategory === 'ALL' 
      ? APP_DATA.btcApis 
      : APP_DATA.btcApis.filter(a => a.category.includes(this.currentCategory));

    container.innerHTML = filteredApis.map(api => `
      <div class="api-card" style="border-left: 4px solid ${api.status === 'HEALTHY' ? '#16a34a' : '#d97706'};">
        <div class="api-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="api-badge-method">${api.method}</span>
            <span class="badge ${api.status === 'HEALTHY' ? 'badge-success' : 'badge-warning'}">
              <i class="status-dot"></i> ${api.status === 'HEALTHY' ? 'Sẵn sàng kết nối' : 'Đang chờ cấp phép'}
            </span>
          </div>
          <span style="font-size: 11px; color: #0284c7; font-weight: 700;">${api.category}</span>
        </div>

        <div>
          <h4 class="api-card-title">[${api.code}] ${api.name}</h4>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Cung cấp bởi: <strong style="color: #334155;">${api.provider}</strong></div>
        </div>

        <div class="api-card-endpoint">${api.endpoint}</div>
        
        <p style="font-size: 12px; color: #475569; line-height: 1.45; min-height: 36px; margin: 0;">${api.description}</p>
        
        <div class="api-meta-row" style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 12px; border-radius: 8px;">
          <span style="font-size: 11.5px; color: #334155; font-weight: 600;">
            <i data-lucide="zap" style="width: 13px; height: 13px; color: #0284c7; display: inline-block; vertical-align: -2px;"></i> Độ trễ: <strong style="color: #0284c7;">${api.latency}</strong>
          </span>
          <span style="font-size: 11.5px; color: #334155; font-weight: 600;">
            <i data-lucide="database" style="width: 13px; height: 13px; color: #16a34a; display: inline-block; vertical-align: -2px;"></i> Đã nạp: <strong style="color: #16a34a;">${api.recordsSynced.toLocaleString()}</strong> bản ghi
          </span>
        </div>

        <div class="api-meta-row" style="font-size: 11px; color: #64748b; margin-top: -2px;">
          <span>Tần suất: <strong>${api.frequency}</strong></span>
          <span>Đồng bộ gần nhất: <strong>${api.lastSync}</strong></span>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 4px; padding-top: 10px; border-top: 1px solid #f1f5f9;">
          <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="ApiGatewayManager.viewPayload('${api.code}')">
            <i data-lucide="code"></i> Xem payload
          </button>
          <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="ApiGatewayManager.triggerSync('${api.code}')">
            <i data-lucide="refresh-cw"></i> Đồng bộ ngay
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  triggerSync(apiCode) {
    const api = APP_DATA.btcApis.find(a => a.code === apiCode);
    if (!api) return;

    App.showNotification(`Đang khởi chạy luồng nạp dữ liệu Delta cho API [${api.code}]...`, 'info');

    setTimeout(() => {
      api.lastSync = new Date().toISOString().replace('T', ' ').substring(0, 19);
      api.recordsSynced += Math.floor(Math.random() * 25) + 5;
      api.status = 'HEALTHY';
      
      this.renderCurrentSubView();
      App.showNotification(`Đồng bộ thành công dữ liệu API [${api.code}] từ Bộ Tài chính về CSDL Khánh Hòa!`, 'success');
    }, 800);
  },

  syncAll() {
    const btn = document.getElementById('btnSyncAllApis');
    if (btn) btn.innerHTML = `<i data-lucide="loader" class="animate-spin"></i> Đang đồng bộ toàn bộ 12 API...`;
    
    setTimeout(() => {
      APP_DATA.btcApis.forEach(api => {
        api.lastSync = new Date().toISOString().replace('T', ' ').substring(0, 19);
        api.recordsSynced += Math.floor(Math.random() * 50) + 10;
        if (api.status === 'PENDING_CONN') {
          api.status = 'HEALTHY';
          api.latency = '45ms';
        }
      });
      if (btn) btn.innerHTML = `<i data-lucide="check-circle"></i> Hoàn thành đồng bộ`;
      this.renderCurrentSubView();
      App.showNotification("Đã hoàn tất đồng bộ toàn diện 12 API chuyên ngành từ CSDL Quốc gia về Tài chính & Bộ/Ngành!", "success");
      setTimeout(() => {
        if (btn) btn.innerHTML = `<i data-lucide="refresh-cw"></i> Đồng bộ tất cả API`;
      }, 2000);
    }, 1500);
  },

  viewPayload(apiCode) {
    const api = APP_DATA.btcApis.find(a => a.code === apiCode);
    if (!api) return;

    let samplePayload = {};
    if (apiCode === '00210101') {
      samplePayload = {
        "header": { "version": "1.0", "sender": "BTC_TCT_CORE", "receiver": "KHANHHOA_DATA_HUB", "security": "mTLS / AES-256" },
        "service_code": "00210101",
        "service_name": "Dữ liệu Thu Ngân sách Nhà nước phân rã theo Địa bàn",
        "timestamp": "2026-08-20T04:30:15Z",
        "data": [
          { "DT": "2026-08-19", "MA_DB": "79", "TEN_DB": "Tỉnh Khánh Hòa", "MA_CNS": "1", "TEN_CNS": "Ngân sách cấp tỉnh", "ICODE": "1001", "INAME": "Thu từ DNNN địa phương", "VAL": 4380500000000 },
          { "DT": "2026-08-19", "MA_DB": "7901", "TEN_DB": "Phường Lộc Thọ", "MA_CNS": "2", "TEN_CNS": "Ngân sách cấp xã", "ICODE": "1002", "INAME": "Thu ngoài quốc doanh", "VAL": 2150200000000 }
        ],
        "checksum_sha256": "8f4b23c91e0a8d42398ab76dfa514b8a2c1f9e8d7c6b5a4321fedcba09876543"
      };
    } else if (apiCode === 'KB-M04') {
      samplePayload = {
        "header": { "version": "2.0", "sender": "KBNN_KHU_VUC_XIV", "receiver": "SO_TAI_CHINH_KHANH_HOA" },
        "mau_bieu": "04/BKCTNNS",
        "ngay_hach_toan": "2026-08-20",
        "so_luong_chung_tu": 145,
        "tong_tien_nop": 34850000000,
        "chung_tu_chi_tiet": [
          { "SO_CT": "CT-2026-0988", "NGAY_CT": "2026-08-20", "MST": "4200429779", "TEN_NNT": "Công Ty TNHH MTV Yến Sào Khánh Hòa", "TK_THU": "7111", "MA_CHUONG": "154", "MA_TIEU_MUC": "1001", "SO_TIEN": 12500000000 },
          { "SO_CT": "CT-2026-0989", "NGAY_CT": "2026-08-20", "MST": "4200236450", "TEN_NNT": "Tổng Công Ty Khánh Việt (KHATOCO)", "TK_THU": "7111", "MA_CHUONG": "154", "MA_TIEU_MUC": "1052", "SO_TIEN": 18200000000 }
        ]
      };
    } else {
      samplePayload = {
        "service_code": api.code,
        "endpoint": api.endpoint,
        "status": "200 OK",
        "source": "CSDL Quốc gia về Tài chính (Bộ Tài chính)",
        "security": "mTLS / OAuth 2.0 / AES-256 GCM",
        "payload_snippet": {
          "total_records": api.recordsSynced,
          "sync_mode": "Incremental (Delta Sync)",
          "checksum_sha256": "8f4b23c91e0a8d42398ab76dfa514..."
        }
      };
    }

    const modalBody = document.getElementById('modalGenericBody');
    const modalTitle = document.getElementById('modalGenericTitle');
    
    modalTitle.innerHTML = `<i data-lucide="code" style="color: #0284c7;"></i> Cấu trúc Gói tin API [${api.code}] - ${api.name}`;
    modalBody.innerHTML = `
      <div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 16px; font-family: 'Courier New', Courier, monospace; font-size: 12px; color: #38bdf8; max-height: 400px; overflow-y: auto;">
        <pre>${JSON.stringify(samplePayload, null, 2)}</pre>
      </div>
    `;

    App.openModal('modalGeneric');
    if (window.lucide) window.lucide.createIcons();
  },

  // -------------------------------------------------------------
  // 8. NHẬT KÝ ĐỒNG BỘ ETL AUDIT LOGS
  // -------------------------------------------------------------
  renderAuditLogs() {
    const container = document.getElementById('apiAuditLogsContainer');
    if (!container) return;

    const logs = [
      { time: "2026-08-20 06:15:22", code: "KB-M04", service: "Bảng kê chứng từ nộp NSNN Mẫu 04", status: "200 OK", records: "+145", latency: "28ms", hash: "sha256:8f4b23c..." },
      { time: "2026-08-20 04:30:28", code: "00210201", service: "Tình hình thực hiện Chi NSNN", status: "200 OK", records: "+38", latency: "55ms", hash: "sha256:1a9c44e..." },
      { time: "2026-08-20 04:30:15", code: "00210101", service: "Dữ liệu Thu Ngân sách Nhà nước", status: "200 OK", records: "+84", latency: "42ms", hash: "sha256:7b22f01..." },
      { time: "2026-08-19 23:15:00", code: "007003", service: "Tổng trị giá hàng hóa Xuất Nhập Khẩu", status: "200 OK", records: "+12", latency: "61ms", hash: "sha256:4d88e1a..." },
      { time: "2026-08-19 14:20:00", code: "QHNS-01", service: "Mã số Đơn vị Quan hệ Ngân sách (ĐVQHNS)", status: "200 OK", records: "+5", latency: "44ms", hash: "sha256:9c01ab2..." }
    ];

    container.innerHTML = `
      <div class="card-header">
        <div>
          <h3 class="card-title"><i data-lucide="shield-check"></i> Nhật ký Đồng bộ Dữ liệu ETL & Kiểm định Toàn vẹn (Audit Logs)</h3>
          <p class="card-subtitle">Ghi nhận lịch sử giao dịch kết nối, mã trạng thái HTTP và mã băm SHA-256 chứng thực gói tin</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="ApiGatewayManager.renderAuditLogs()">
          <i data-lucide="refresh-cw"></i> Làm mới log
        </button>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Mã API</th>
              <th>Dịch vụ Tích hợp</th>
              <th>Trạng thái</th>
              <th>Bản ghi nạp</th>
              <th>Độ trễ</th>
              <th>Mã băm SHA-256</th>
            </tr>
          </thead>
          <tbody>
            ${logs.map(l => `
              <tr>
                <td style="font-family: monospace; font-size: 11px;">${l.time}</td>
                <td><span class="api-badge-method">${l.code}</span></td>
                <td style="font-weight: 600;">${l.service}</td>
                <td><span class="badge badge-success">${l.status}</span></td>
                <td style="color: #10b981; font-weight: 700;">${l.records}</td>
                <td>${l.latency}</td>
                <td style="font-family: monospace; font-size: 10.5px; color: #64748b;">${l.hash}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }
};
