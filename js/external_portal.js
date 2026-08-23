/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * CỔNG THÔNG TIN PHỤC VỤ KÊ KHAI & NỘP BÁO CÁO DÀNH CHO CƠ QUAN NHÀ NƯỚC VÀ DOANH NGHIỆP
 * (Theo yêu cầu quy định của Bộ Tài chính và UBND tỉnh Khánh Hòa - Quyết định số 2071/QĐ-UBND & Kế hoạch 1489/KH-UBND)
 */

const ExternalPortalManager = {
  currentEntityId: 'UBND-NTR',
  currentTab: 'tasks',

  // Danh mục đơn vị và doanh nghiệp mẫu trên Cổng báo cáo
  reportingEntities: {
    // 1. Khối cơ quan nhà nước và UBND các xã, phường
    'UBND-NTR': {
      id: 'UBND-NTR',
      type: 'GOV_COMMUNE',
      name: 'Ủy ban nhân dân phường Lộc Thọ (Nha Trang)',
      code: 'CQNN-79-NTR',
      leader: 'Trần Minh Hải (Chủ tịch UBND phường)',
      contactEmail: 'ubnd.loctho@khanhhoa.gov.vn',
      phone: '0258.3822105',
      badge: 'UBND cấp xã',
      assignedTasks: [
        {
          campaignId: 'REP-2071-Q3-2026',
          title: 'Báo cáo bộ chỉ số phục vụ chỉ đạo điều hành quý III/2026 (Quyết định số 2071/QĐ-UBND)',
          authority: 'UBND tỉnh Khánh Hòa',
          deadline: '2026-09-25',
          status: 'SUBMITTED_APPROVED',
          submitDate: '2026-08-18 09:15',
          score: 98,
          feedback: 'Số liệu đầy đủ, khớp đúng với Kho bạc Nhà nước KV XIV.'
        },
        {
          campaignId: 'REP-TSC-N167-2026',
          title: 'Báo cáo tổng hợp tình hình quản lý, sử dụng & sắp xếp cơ sở nhà đất công năm 2026',
          authority: 'Bộ Tài chính & UBND tỉnh',
          deadline: '2026-08-15',
          status: 'COMPLETED',
          submitDate: '2026-08-14 16:30',
          score: 100,
          feedback: 'Đã tổng hợp 32 cơ sở nhà đất trực thuộc TP. Nha Trang.'
        }
      ]
    },
    'BAN-QLDA-GT': {
      id: 'BAN-QLDA-GT',
      type: 'GOV_PROJECT_OWNER',
      name: 'Ban Quản lý Dự án Đầu tư Xây dựng các Công trình Giao thông',
      code: 'CQNN-QLDA-01',
      leader: 'Nguyễn Văn Dũng (Giám đốc Ban)',
      contactEmail: 'banqlda.giaothong@khanhhoa.gov.vn',
      phone: '0258.3811234',
      badge: 'Chủ đầu tư / Ban Quản lý dự án',
      assignedTasks: [
        {
          campaignId: 'REP-DTC-THANG8-2026',
          title: 'Báo cáo tình hình thực hiện & giải ngân kế hoạch vốn đầu tư công tháng 8/2026',
          authority: 'Bộ Tài chính & UBND tỉnh',
          deadline: '2026-08-30',
          status: 'DRAFT',
          submitDate: null,
          score: null,
          feedback: 'Cần cập nhật bổ sung nguyên nhân chậm GPMB Dự án Đường Vành Đai 2.'
        }
      ]
    },
    'BV-DAKHOA-TINH': {
      id: 'BV-DAKHOA-TINH',
      type: 'GOV_PUBLIC_UNIT',
      name: 'Bệnh viện Đa khoa tỉnh Khánh Hòa',
      code: 'HCSN-BV-01',
      leader: 'BS. Phan Hữu Chính (Giám đốc)',
      contactEmail: 'bvdakhoa@khanhhoa.gov.vn',
      phone: '0258.3822175',
      badge: 'Đơn vị sự nghiệp công lập',
      assignedTasks: [
        {
          campaignId: 'REP-TU-CHU-N60',
          title: 'Báo cáo tình hình thực hiện cơ chế tự chủ tài chính đơn vị sự nghiệp công lập (Nghị định số 60)',
          authority: 'Bộ Tài chính & UBND tỉnh',
          deadline: '2026-09-10',
          status: 'PENDING_APPROVAL',
          submitDate: '2026-08-19 14:00',
          score: null,
          feedback: 'Đang chờ Phòng Tài chính Hành chính sự nghiệp thẩm tra phương án nhóm 2.'
        }
      ]
    },

    // 2. Khối Doanh nghiệp & Nhà đầu tư
    '4200238910': {
      id: '4200238910',
      type: 'ENTERPRISE',
      name: 'Tổng Công ty Khánh Việt (KHATOCO)',
      code: 'MST: 4200238910',
      leader: 'Phan Hoài Phương (Tổng Giám đốc)',
      contactEmail: 'khatoco@khatoco.com',
      phone: '0258.3882266',
      badge: 'Doanh nghiệp nhà nước',
      assignedTasks: [
        {
          campaignId: 'REP-BTC-NSNN-2026',
          title: 'Báo cáo đánh giá tình hình sản xuất kinh doanh & ước nộp ngân sách năm 2026',
          authority: 'Bộ Tài chính & UBND tỉnh',
          deadline: '2026-09-15',
          status: 'OPEN_TODO',
          submitDate: null,
          score: null,
          feedback: 'Hạn nộp báo cáo dự toán còn 25 ngày.'
        }
      ]
    },
    '4200429779': {
      id: '4200429779',
      type: 'ENTERPRISE',
      name: 'Công ty TNHH Nhà nước MTV Yến Sào Khánh Hòa',
      code: 'MST: 4200429779',
      leader: 'Nguyễn Anh Hùng (Chủ tịch HĐTV)',
      contactEmail: 'yensao@yensaokhanhhoa.com.vn',
      phone: '0258.3812456',
      badge: 'Doanh nghiệp trọng điểm',
      assignedTasks: [
        {
          campaignId: 'REP-BTC-NSNN-2026',
          title: 'Báo cáo tình hình hoạt động doanh thu & nộp ngân sách năm 2026',
          authority: 'Bộ Tài chính & UBND tỉnh',
          deadline: '2026-09-15',
          status: 'OPEN_TODO',
          submitDate: null,
          score: null,
          feedback: 'Hạn nộp báo cáo dự toán còn 25 ngày.'
        }
      ]
    },
    'FDI-MARUHA': {
      id: 'FDI-MARUHA',
      type: 'ENTERPRISE_FDI',
      name: 'Công ty TNHH Chế biến Thủy sản Maruha Nichiro Khánh Hòa (FDI Nhật Bản)',
      code: 'MST: 4201988776',
      leader: 'Kenji Takahashi (Tổng Giám đốc)',
      contactEmail: 'contact@maruha-khanhhoa.vn',
      phone: '0258.3778899',
      badge: 'Doanh nghiệp FDI',
      assignedTasks: [
        {
          campaignId: 'REP-DN-FDI-2026',
          title: 'Báo cáo giám sát tài chính & vốn thực hiện doanh nghiệp FDI năm 2026',
          authority: 'Bộ Tài chính',
          deadline: '2026-09-30',
          status: 'OPEN_TODO',
          submitDate: null,
          score: null,
          feedback: 'Báo cáo định kỳ hằng năm theo quy định của Bộ Tài chính.'
        }
      ]
    }
  },

  init() {
    this.renderPortalLayout();
  },

  switchReportingEntity(entityId) {
    this.currentEntityId = entityId;
    this.renderPortalLayout();
    const entity = this.reportingEntities[entityId];
    App.showNotification(`Đã chuyển sang Cổng báo cáo của đơn vị: ${entity.name}`, 'info');
  },

  switchPortalTab(tabName, tabBtn) {
    this.currentTab = tabName;
    
    // 1. Sync sidebar nav-items
    const sidebarItems = document.querySelectorAll('#dynamicSidebarNav .nav-item');
    const tabMap = { 'tasks': 0, 'fill_form': 1, 'history': 2, 'guidance': 3 };
    
    sidebarItems.forEach(item => item.classList.remove('active'));
    if (tabMap[tabName] !== undefined && sidebarItems[tabMap[tabName]]) {
      sidebarItems[tabMap[tabName]].classList.add('active');
    }

    // 2. Sync top horizontal tabs
    const topTabs = document.querySelectorAll('#portalNavTabs .tab-btn');
    topTabs.forEach(b => b.classList.remove('active'));
    if (tabMap[tabName] !== undefined && topTabs[tabMap[tabName]]) {
      topTabs[tabMap[tabName]].classList.add('active');
    } else if (tabBtn) {
      tabBtn.classList.add('active');
    }

    this.renderPortalBody();
  },

  renderPortalLayout() {
    const container = document.getElementById('departmentWorkspaceContainer');
    if (!container) return;

    const entity = this.reportingEntities[this.currentEntityId] || this.reportingEntities['UBND-NTR'];

    container.innerHTML = `
      <!-- PORTAL HEADER BANNER -->
      <div class="domain-header-banner" style="margin-bottom: 16px;">
        <div class="banner-left">
          <div class="banner-icon">
            <i data-lucide="${entity.type.includes('ENTERPRISE') ? 'building-2' : 'landmark'}"></i>
          </div>
          <div class="banner-title" style="margin-bottom: 0;">
            <h2>Cổng tiếp nhận và nộp báo cáo trực tuyến</h2>
            <p style="font-size: 12px; color: #64748b; margin-top: 2px;">Tiếp nhận nhiệm vụ, kê khai biểu mẫu và theo dõi kết quả thẩm tra số liệu</p>
          </div>
        </div>

        <div>
          <span class="badge ${entity.type.includes('ENTERPRISE') ? 'badge-purple' : 'badge-info'}" style="font-size: 12.5px; padding: 7px 14px; font-weight: 600;">
            <span class="pulse-dot"></span> ${entity.name} (${entity.badge})
          </span>
        </div>
      </div>

      <!-- PORTAL NAVIGATION TABS -->
      <div class="card" style="margin-bottom: 16px; padding: 6px 12px;">
        <div class="tabs-nav" id="portalNavTabs" style="margin-bottom: 0; border-bottom: none; padding-bottom: 0;">
          <button class="tab-btn ${this.currentTab === 'tasks' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('tasks', this)">
            <i data-lucide="clipboard-list"></i> Nhiệm vụ báo cáo (${entity.assignedTasks.length})
          </button>
          <button class="tab-btn ${this.currentTab === 'fill_form' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('fill_form', this)">
            <i data-lucide="edit-3"></i> Kê khai & nộp báo cáo
          </button>
          <button class="tab-btn ${this.currentTab === 'history' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('history', this)">
            <i data-lucide="history"></i> Lịch sử nộp & Kết quả
          </button>
          <button class="tab-btn ${this.currentTab === 'guidance' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('guidance', this)">
            <i data-lucide="book-open"></i> Quy định & Biểu mẫu
          </button>
        </div>
      </div>

      <!-- PORTAL BODY CONTENT -->
      <div id="portalMainBodyContainer" class="card"></div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.renderPortalBody();
  },

  renderPortalBody() {
    const container = document.getElementById('portalMainBodyContainer');
    if (!container) return;

    const entity = this.reportingEntities[this.currentEntityId] || this.reportingEntities['UBND-NTR'];

    if (this.currentTab === 'tasks') {
      // Tab 1: Task Inbox
      container.innerHTML = `
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="clipboard-check"></i> Danh sách chế độ báo cáo định kỳ cần thực hiện</h3>
            <p class="card-subtitle">Báo cáo theo quy định của Bộ Tài chính và UBND tỉnh Khánh Hòa phục vụ công tác điều hành ngân sách và kinh tế</p>
          </div>
          <span class="badge badge-info">Theo quy định pháp luật</span>
        </div>

        <div class="api-service-grid" style="grid-template-columns: 1fr;">
          ${entity.assignedTasks.map(t => {
            const isDone = t.status === 'SUBMITTED_APPROVED' || t.status === 'COMPLETED';
            const isPending = t.status === 'PENDING_APPROVAL';
            const isDraft = t.status === 'DRAFT';
            const isTodo = t.status === 'OPEN_TODO';

            const badgeText = isDone ? 'Đã nộp & được Sở TC duyệt' : isPending ? 'Đang chờ Sở TC phê duyệt' : isDraft ? 'Đang lưu nháp (chưa nộp)' : 'Cần nộp trước hạn';
            const badgeClass = isDone ? 'badge-success' : isPending ? 'badge-info' : isDraft ? 'badge-warning' : 'badge-danger';

            return `
              <div class="card" style="padding: 18px; background: #ffffff; border-left: 4px solid ${isDone ? '#10b981' : isPending ? '#0284c7' : isDraft ? '#f59e0b' : '#ef4444'}; margin-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
                  <div>
                    <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
                      <span class="badge ${badgeClass}">${badgeText}</span>
                      <span class="badge badge-purple">${t.authority || 'UBND tỉnh'}</span>
                      <span style="font-size: 11.5px; color: #b45309; font-weight: 600;"><i data-lucide="clock"></i> Hạn chót nộp: <strong>${t.deadline}</strong></span>
                    </div>
                    <h4 style="font-size: 15px; font-weight: 700; color: #0f172a; line-height: 1.35;">${t.title}</h4>
                    <div style="font-size: 12px; color: #475569; margin-top: 6px;">
                      <span>Ý kiến phản hồi từ Sở Tài chính:</span> <em style="color: #0284c7; font-weight: 600;">"${t.feedback}"</em>
                    </div>
                  </div>

                  <div style="display: flex; gap: 8px;">
                    ${!isDone ? `
                      <button class="btn btn-primary btn-sm" onclick="ExternalPortalManager.openFormToFill('${t.campaignId}')">
                        <i data-lucide="edit-3"></i> Kê khai & nộp báo cáo
                      </button>
                    ` : `
                      <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang tải văn bản báo cáo đã nộp...', 'info')">
                        <i data-lucide="eye"></i> Xem lại bản đã nộp
                      </button>
                    `}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (this.currentTab === 'fill_form') {
      // Tab 2: Dynamic Form Filling & Excel Upload
      container.innerHTML = `
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="edit"></i> Biểu mẫu kê khai và nộp báo cáo trực tuyến</h3>
            <p class="card-subtitle">Đơn vị có thể nhập số liệu trực tiếp hoặc tải tệp Excel mẫu để điền số liệu nạp nhanh</p>
          </div>
          <button class="btn btn-soft-primary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_BaoCao_DinhKy.xlsx')">
            <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
          </button>
        </div>

        <!-- Excel Drag and Drop Area -->
        <div style="margin-bottom: 20px; border: 2px dashed #93c5fd; border-radius: 12px; padding: 22px; text-align: center; background: #f0f7ff; cursor: pointer;" onclick="document.getElementById('portalExcelFileInput').click()">
          <input type="file" id="portalExcelFileInput" style="display: none;" accept=".xlsx, .xls" onchange="ExternalPortalManager.handleExcelUpload(event)" />
          <i data-lucide="file-spreadsheet" style="font-size: 36px; color: #0284c7; margin-bottom: 8px; display: inline-block;"></i>
          <h4 style="font-size: 14.5px; font-weight: 700; color: #0f172a;">Kéo thả tệp Excel báo cáo hoặc nhấp để tải lên</h4>
          <p style="font-size: 12px; color: #475569; margin-top: 4px;">Hỗ trợ tệp .xlsx, .xls theo đúng mẫu chuẩn của Bộ Tài chính và Sở Tài chính (Dung lượng tối đa: 20MB)</p>
        </div>

        <div style="text-align: center; margin: 15px 0; color: #64748b; font-size: 12px; font-weight: 600;">--- HOẶC KÊ KHAI TRỰC TUYẾN TỪNG CHỈ TIÊU BÁO CÁO ---</div>

        <form id="formPortalSubmit" onsubmit="ExternalPortalManager.handleOnlineSubmit(event)">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Kỳ báo cáo theo quy định <span class="req">*</span></label>
              <select class="form-control" name="campaign_id" required>
                <option value="REP-2071-Q3-2026">Báo cáo bộ chỉ số Quyết định số 2071/QĐ-UBND Quý III/2026</option>
                <option value="REP-BTC-NSNN-2026">Báo cáo đánh giá thu - chi NSNN & Dự toán năm sau</option>
                <option value="REP-DTC-THANG8-2026">Báo cáo tình hình thực hiện & giải ngân vốn ĐTC</option>
                <option value="REP-TSC-N167-2026">Báo cáo sắp xếp lại cơ sở nhà đất công (Nghị định số 167)</option>
                <option value="REP-TU-CHU-N60">Báo cáo phương án tự chủ tài chính ĐVSNCL (Nghị định số 60)</option>
                <option value="REP-DN-FDI-2026">Báo cáo giám sát tài chính doanh nghiệp FDI & DNNN</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Người đại diện kê khai <span class="req">*</span></label>
              <input type="text" class="form-control" name="submitter" value="Nguyễn Văn A - Cán bộ Tổng hợp" required />
            </div>
            <div class="form-group">
              <label class="form-label">Số điện thoại liên hệ <span class="req">*</span></label>
              <input type="text" class="form-control" name="reporter_phone" placeholder="Ví dụ: 0912.345.678" required />
            </div>
            <div class="form-group">
              <label class="form-label">Chỉ tiêu 1: Tổng giá trị / Vốn thực hiện trong kỳ (Triệu VNĐ) <span class="req">*</span></label>
              <input type="number" class="form-control" name="indicator_val_1" placeholder="Ví dụ: 450000" required />
            </div>
            <div class="form-group">
              <label class="form-label">Chỉ tiêu 2: Tỷ lệ đạt được so với kế hoạch (%) <span class="req">*</span></label>
              <input type="number" class="form-control" name="indicator_val_2" min="0" max="100" placeholder="Ví dụ: 85" required />
            </div>
            <div class="form-group">
              <label class="form-label">Tệp báo cáo đính kèm (PDF có ký số / đóng dấu đơn vị)</label>
              <input type="file" class="form-control" name="attachment_doc" accept=".pdf, .docx, .xlsx" />
            </div>
            <div class="form-group full-width">
              <label class="form-label">Thuyết minh báo cáo & Khó khăn vướng mắc gửi Sở Tài chính</label>
              <textarea class="form-control" name="reporter_notes" placeholder="Mô tả cụ thể tình hình thực hiện dự toán, giải ngân vốn, các khó khăn vướng mắc và kiến nghị UBND tỉnh, Bộ Tài chính..."></textarea>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="App.showNotification('Đã lưu bản nháp thành công!', 'info')"><i data-lucide="bookmark"></i> Lưu bản nháp</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Nộp báo cáo lên Sở Tài chính</button>
          </div>
        </form>
      `;
    } else if (this.currentTab === 'history') {
      // Tab 3: History & Evaluation
      container.innerHTML = `
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="history"></i> Lịch sử nộp báo cáo và kết quả thẩm định</h3>
            <p class="card-subtitle">Chi tiết điểm đánh giá chất lượng số liệu, biên bản tiếp nhận và ý kiến thẩm tra từ các phòng chuyên môn</p>
          </div>
          <button class="btn btn-soft-primary btn-sm" onclick="App.showNotification('Đang trích xuất biên bản xác nhận số liệu đã nộp...', 'info')">
            <i data-lucide="download"></i> Tải biên bản tiếp nhận
          </button>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Mã đợt nộp</th>
                <th>Tên kỳ báo cáo</th>
                <th>Thời gian nộp</th>
                <th>Người nộp</th>
                <th>Trạng thái tiếp nhận</th>
                <th>Chuyên viên thẩm tra</th>
                <th>Chất lượng số liệu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style="color: #002B8C;">SUB-2071-7901</strong></td>
                <td><strong>Bộ chỉ số Quyết định số 2071 Quý III/2026</strong></td>
                <td>2026-08-18 09:15</td>
                <td>Nguyễn Văn A (UBND TP)</td>
                <td><span class="badge badge-success">Đã phê duyệt nạp CSDL</span></td>
                <td>Lê Thị Thu Hằng (Phòng Quản lý Ngân sách)</td>
                <td><strong style="color: #15803d;">98 / 100 Điểm</strong></td>
              </tr>
              <tr>
                <td><strong style="color: #002B8C;">SUB-TSC-8812</strong></td>
                <td><strong>Báo cáo nhà đất công dôi dư Nghị định số 167</strong></td>
                <td>2026-08-14 16:30</td>
                <td>Trần Thị B (UBND TP)</td>
                <td><span class="badge badge-success">Đã phê duyệt nạp CSDL</span></td>
                <td>Đặng Quốc Hưng (Phòng Giá & CS)</td>
                <td><strong style="color: #15803d;">100 / 100 Điểm</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    } else if (this.currentTab === 'guidance') {
      // Tab 4: Legal Guidance & Templates
      container.innerHTML = `
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="book-open"></i> Thư viện quy định chế độ báo cáo và biểu mẫu chuẩn</h3>
            <p class="card-subtitle">Văn bản quy phạm pháp luật của Bộ Tài chính, Quyết định của UBND tỉnh và tài liệu biểu mẫu báo cáo chính thức</p>
          </div>
        </div>

        <div class="api-service-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
          <div class="card" style="padding: 16px; background: #ffffff;">
            <span class="badge badge-purple">Quyết định UBND tỉnh</span>
            <h4 style="color: #0f172a; font-size: 14px; font-weight: 700; margin: 8px 0;">Quyết định số 2071/QĐ-UBND tỉnh Khánh Hòa</h4>
            <p style="font-size: 12px; color: #475569;">Quy định Bộ chỉ số phục vụ chỉ đạo, điều hành của UBND tỉnh Khánh Hòa.</p>
            <button class="btn btn-soft-primary btn-sm" style="margin-top: 10px;" onclick="App.showNotification('Đang tải văn bản Quyết định số 2071...', 'info')">
              <i data-lucide="download"></i> Tải văn bản PDF
            </button>
          </div>

          <div class="card" style="padding: 16px; background: #ffffff;">
            <span class="badge badge-info">Thông tư Bộ Tài chính</span>
            <h4 style="color: #0f172a; font-size: 14px; font-weight: 700; margin: 8px 0;">Thông tư số 57/2025/TT-BTC của Bộ Tài chính</h4>
            <p style="font-size: 12px; color: #475569;">Quy định chế độ báo cáo thống kê ngành Tài chính và quản lý ngân sách nhà nước.</p>
            <button class="btn btn-soft-primary btn-sm" style="margin-top: 10px;" onclick="App.showNotification('Đang tải Thông tư 57/2025/TT-BTC...', 'info')">
              <i data-lucide="download"></i> Tải văn bản PDF
            </button>
          </div>

          <div class="card" style="padding: 16px; background: #ffffff; border: 1px solid #e2e8f0;">
            <span class="badge badge-success">Mẫu biểu báo cáo</span>
            <h4 style="color: #0f172a; font-size: 14px; font-weight: 700; margin: 8px 0;">Bộ biểu mẫu Excel báo cáo chuẩn năm 2026</h4>
            <p style="font-size: 12px; color: #475569;">Tổng hợp các sheet biểu mẫu báo cáo ngân sách, đầu tư công, nhà đất công và tự chủ HCSN.</p>
            <button class="btn btn-primary btn-sm" style="margin-top: 10px;" onclick="DataEntryManager.downloadTemplate('Mau_BaoCao_Chuan_2026.xlsx')">
              <i data-lucide="download"></i> Tải file mẫu Excel
            </button>
          </div>
        </div>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  },

  openFormToFill(campaignId) {
    this.switchPortalTab('fill_form', document.querySelectorAll('#portalNavTabs .tab-btn')[1]);
  },

  handleExcelUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    App.showNotification(`Đã tải lên tệp [${file.name}]. Hệ thống kiểm tra cấu trúc hợp lệ và điền tự động vào biểu mẫu báo cáo!`, 'success');
  },

  handleOnlineSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reporter = formData.get('reporter_name');
    const campaignId = formData.get('campaign_id');

    App.showNotification(`Đã gửi thành công báo cáo [${campaignId}] của ${this.reportingEntities[this.currentEntityId].name} tới Sở Tài chính!`, 'success');

    // Add to pending submissions in Sở Tài chính Admin
    APP_DATA.pendingSubmissions.unshift({
      id: "SUB-PORTAL-" + Math.floor(1000 + Math.random() * 9000),
      dept: this.reportingEntities[this.currentEntityId].name,
      title: `Báo cáo định kỳ trực tuyến (${campaignId})`,
      type: "Báo Cáo Định Kỳ Cổng Ngoài",
      submittedBy: reporter,
      submittedDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "PENDING"
    });

    this.switchPortalTab('history', document.querySelectorAll('#portalNavTabs .tab-btn')[2]);
  }
};
