/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * PHÂN HỆ ĐIỀU HÀNH & GIÁM SÁT KINH TẾ CHUYÊN BIỆT TỪNG LĨNH VỰC NGHIỆP VỤ
 * (Cụ thể hóa từ tổng thể nền kinh tế tỉnh đến từng lĩnh vực chuyên môn sâu)
 */

const DeptWorkspaceManager = {
  currentDeptId: 'lanhdao',
  currentTab: 'dashboard',

  init() {
    this.setupUserSwitcher();
    const config = DEPT_CONFIGS[this.currentDeptId];
    if (config) {
      App.currentUser = {
        name: config.name,
        deptId: this.currentDeptId,
        title: config.title || config.deptName,
        dept: config.deptName,
        role: config.role || this.currentDeptId
      };

      // 1. Cập nhật thông tin Người dùng trên Topbar
      const userNameEl = document.getElementById('appUserName') || document.getElementById('userNameDisplay');
      const userDeptEl = document.getElementById('appUserTitle') || document.getElementById('userDeptDisplay');
      const userAvatarEl = document.getElementById('appUserAvatar') || document.getElementById('userAvatarDisplay');
      if (userNameEl) userNameEl.innerText = config.name;
      if (userDeptEl) userDeptEl.innerText = config.title || config.deptName;
      if (userAvatarEl) userAvatarEl.innerText = config.name.split(' ').pop().charAt(0);

      // 2. Cập nhật ngữ cảnh Topbar động theo phân hệ
      this.updateTopbarContext(config);

      // 3. Render lại toàn bộ Sidebar ngay từ lần load đầu tiên
      this.renderDepartmentSidebar(config);
    }
    this.loadWorkspace(this.currentDeptId);
  },

  setupUserSwitcher() {
    const select = document.getElementById('selectAppUserAccount');
    if (!select) return;

    select.addEventListener('change', (e) => {
      this.switchUser(e.target.value);
    });
  },

  updateTopbarContext(config) {
    const sidebarBadgeEl = document.getElementById('sidebarDeptBadge');
    const sidebarDomainEl = document.getElementById('sidebarDomainDesc');
    if (!config) return;

    if (sidebarBadgeEl) {
      sidebarBadgeEl.innerText = config.deptName || config.name;
      sidebarBadgeEl.className = 'badge ' + (config.badgeClass || 'badge-primary');
    }
    if (sidebarDomainEl) {
      sidebarDomainEl.innerText = config.domainName || 'Quản lý và giám sát dữ liệu kinh tế';
    }
  },

  switchUser(deptId) {
    this.currentDeptId = deptId;
    this.currentTab = 'dashboard';
    const config = DEPT_CONFIGS[deptId];
    if (!config) return;

    // Cập nhật App.currentUser chuẩn xác theo đúng user được chọn
    App.currentUser = {
      name: config.name,
      deptId: deptId,
      title: config.title || config.deptName,
      dept: config.deptName,
      role: config.role || deptId
    };

    // 1. Cập nhật thông tin Người dùng & Bộ phận trên Topbar
    const userSelect = document.getElementById('selectAppUserAccount');
    if (userSelect && userSelect.value !== deptId) {
      userSelect.value = deptId;
    }

    const userNameEl = document.getElementById('appUserName') || document.getElementById('userNameDisplay');
    const userDeptEl = document.getElementById('appUserTitle') || document.getElementById('userDeptDisplay');
    const userAvatarEl = document.getElementById('appUserAvatar') || document.getElementById('userAvatarDisplay');
    if (userNameEl) userNameEl.innerText = config.name;
    if (userDeptEl) userDeptEl.innerText = config.title || config.deptName;
    if (userAvatarEl) userAvatarEl.innerText = config.name.split(' ').pop().charAt(0);
    
    // 2. Cập nhật ngữ cảnh Topbar động theo phân hệ
    this.updateTopbarContext(config);

    // 3. Render lại toàn bộ Sidebar theo nghiệp vụ chuyên biệt của phòng / Cổng
    this.renderDepartmentSidebar(config);

    // 4. Load nội dung màn hình làm việc của phòng / Cổng
    this.loadWorkspace(deptId);

    App.showNotification(`Đã chuyển sang: ${config.domainName}`, 'info');
  },

  renderDepartmentSidebar(config) {
    const navContainer = document.getElementById('dynamicSidebarNav');
    if (!navContainer) return;

    let navHtml = '';

    if (config.id === 'portal' || config.id.startsWith('portal_')) {
      const activeTab = (typeof ExternalPortalManager !== 'undefined') ? ExternalPortalManager.currentTab : 'tasks';
      navHtml = `
        <div class="nav-section-title">CỔNG BÁO CÁO TRỰC TUYẾN</div>
        <a class="nav-item ${activeTab === 'tasks' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('tasks', this)">
          <i data-lucide="clipboard-list"></i>
          <span>Nhiệm vụ báo cáo</span>
        </a>
        <a class="nav-item ${activeTab === 'fill_form' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('fill_form', this)">
          <i data-lucide="edit-3"></i>
          <span>Kê khai & nộp báo cáo</span>
        </a>
        <a class="nav-item ${activeTab === 'history' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('history', this)">
          <i data-lucide="history"></i>
          <span>Lịch sử nộp & Kết quả</span>
        </a>
        <a class="nav-item ${activeTab === 'guidance' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('guidance', this)">
          <i data-lucide="book-open"></i>
          <span>Quy định & biểu mẫu</span>
        </a>
      `;
    } else if (config.id === 'lanhdao') {
      navHtml = `
        <div class="nav-section-title">I. ĐIỀU HÀNH & CHỈ ĐẠO</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="layout-dashboard"></i>
          <span>Tổng quan kinh tế - tài chính</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('advanced_bi', this)">
          <i data-lucide="sparkles"></i>
          <span>Phân tích & Dự báo vĩ mô</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('early_warnings', this)">
          <i data-lucide="alert-triangle"></i>
          <span>Cảnh báo điều hành</span>
          <span class="badge badge-danger">4 cảnh báo</span>
        </a>

        <div class="nav-section-title">II. BÁO CÁO & PHÊ DUYỆT</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Báo cáo điều hành UBND tỉnh</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_entry', this)">
          <i data-lucide="check-square"></i>
          <span>Phê duyệt hồ sơ liên ngành</span>
          <span class="badge badge-warning">6 chờ duyệt</span>
        </a>

        <div class="nav-section-title">III. HỒ SƠ & TIỆN ÍCH</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('archive_viewer', this)">
          <i data-lucide="archive"></i>
          <span>Hồ sơ & Văn bản số hóa</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('executive_personalization', this)">
          <i data-lucide="sliders"></i>
          <span>Cá nhân hóa người dùng</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('executive_notifications', this)">
          <i data-lucide="bell"></i>
          <span>Cài đặt thông báo</span>
        </a>
      `;
    } else if (config.id === 'ktns') {
      navHtml = `
        <div class="nav-section-title">I. QUẢN LÝ NGÂN SÁCH</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="pie-chart"></i>
          <span>Tổng quan thu - chi ngân sách</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('tax_payers', this)">
          <i data-lucide="award"></i>
          <span>Doanh nghiệp trọng điểm</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('advanced_bi', this)">
          <i data-lucide="grid"></i>
          <span>Cân đối dòng tiền & Dự báo</span>
        </a>

        <div class="nav-section-title">II. BÁO CÁO & DỰ TOÁN</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Chế độ báo cáo định kỳ</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_entry', this)">
          <i data-lucide="clipboard-edit"></i>
          <span>Giao & điều chỉnh dự toán</span>
        </a>

        <div class="nav-section-title">III. HỒ SƠ SỐ HÓA</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('dept_archive', this)">
          <i data-lucide="archive"></i>
          <span>Hồ sơ số hóa ngân sách</span>
        </a>
      `;
    } else if (config.id === 'dtc') {
      navHtml = `
        <div class="nav-section-title">I. ĐẦU TƯ CÔNG</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="hard-hat"></i>
          <span>Tổng quan kế hoạch & giải ngân</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('advanced_bi', this)">
          <i data-lucide="trending-up"></i>
          <span>Bản đồ dự án đầu tư</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('early_warnings', this)">
          <i data-lucide="alert-triangle"></i>
          <span>Cảnh báo chậm giải ngân</span>
          <span class="badge badge-danger">5 dự án</span>
        </a>

        <div class="nav-section-title">II. BÁO CÁO & THẨM TRA</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Báo cáo giải ngân ĐTC</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_entry', this)">
          <i data-lucide="clipboard-edit"></i>
          <span>Thẩm tra quyết toán dự án</span>
        </a>

        <div class="nav-section-title">III. HỒ SƠ SỐ HÓA</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('dept_archive', this)">
          <i data-lucide="archive"></i>
          <span>Hồ sơ dự án đầu tư</span>
        </a>
      `;
    } else if (config.id === 'dtns') {
      navHtml = `
        <div class="nav-section-title">I. ĐẦU TƯ NGOÀI NGÂN SÁCH</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="building-2"></i>
          <span>Tổng quan dự án ngoài ngân sách</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('projects_list', this)">
          <i data-lucide="file-badge-2"></i>
          <span>Danh mục dự án & Giấy phép IRC</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('legal_docs', this)">
          <i data-lucide="shield-check"></i>
          <span>Chính sách & Cơ chế ưu đãi đầu tư</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('early_warnings', this)">
          <i data-lucide="alert-triangle"></i>
          <span>Cảnh báo chậm tiến độ cam kết</span>
        </a>

        <div class="nav-section-title">II. NHẬP LIỆU & BÁO CÁO</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Báo cáo giám sát đầu tư</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_entry', this)">
          <i data-lucide="clipboard-edit"></i>
          <span>Chủ trương & Ký quỹ đầu tư</span>
        </a>

        <div class="nav-section-title">III. HỒ SƠ SỐ HÓA</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('dept_archive', this)">
          <i data-lucide="archive"></i>
          <span>Hồ sơ số hóa</span>
        </a>
      `;
    } else if (config.id === 'doanhnghiep') {
      navHtml = `
        <div class="nav-section-title">I. DOANH NGHIỆP & HỢP TÁC XÃ</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="briefcase"></i>
          <span>Tổng quan tài chính doanh nghiệp</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('realtime_monitor', this)">
          <i data-lucide="activity"></i>
          <span>Đăng ký kinh doanh mới</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('advanced_bi', this)">
          <i data-lucide="bubbles"></i>
          <span>Ma trận rủi ro tài chính DN</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('tax_payers', this)">
          <i data-lucide="users"></i>
          <span>Hộ kinh doanh & Hợp tác xã</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('early_warnings', this)">
          <i data-lucide="alert-triangle"></i>
          <span>Cảnh báo nợ thuế & Rủi ro</span>
        </a>

        <div class="nav-section-title">II. NHẬP LIỆU & BÁO CÁO</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Báo cáo tài chính DN & HTX</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_entry', this)">
          <i data-lucide="clipboard-edit"></i>
          <span>Giám sát vốn nhà nước tại DN</span>
        </a>

        <div class="nav-section-title">III. HỒ SƠ SỐ HÓA</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('dept_archive', this)">
          <i data-lucide="archive"></i>
          <span>Hồ sơ số hóa</span>
        </a>
      `;
    } else if (config.id === 'giacongsan') {
      navHtml = `
        <div class="nav-section-title">I. GIÁ & TÀI SẢN CÔNG</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="home"></i>
          <span>Tổng quan tài sản công & Giá</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('public_properties', this)">
          <i data-lucide="building"></i>
          <span>Sắp xếp nhà đất công</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('early_warnings', this)">
          <i data-lucide="alert-triangle"></i>
          <span>Cảnh báo quá hạn công sản</span>
        </a>

        <div class="nav-section-title">II. NHẬP LIỆU & BÁO CÁO</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Báo cáo tài sản công</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_entry', this)">
          <i data-lucide="clipboard-edit"></i>
          <span>Kê khai giá & Sắp xếp nhà đất</span>
        </a>

        <div class="nav-section-title">III. HỒ SƠ SỐ HÓA</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('dept_archive', this)">
          <i data-lucide="archive"></i>
          <span>Hồ sơ số hóa</span>
        </a>
      `;
    } else if (config.id === 'hcsn') {
      navHtml = `
        <div class="nav-section-title">I. TÀI CHÍNH HCSN & ĐVSNCL</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="graduation-cap"></i>
          <span>Tổng quan tự chủ tài chính</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('units_autonomy', this)">
          <i data-lucide="users"></i>
          <span>Danh bạ đơn vị sự nghiệp</span>
        </a>

        <div class="nav-section-title">II. NHẬP LIỆU & BÁO CÁO</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Báo cáo tự chủ & Chi thường xuyên</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_entry', this)">
          <i data-lucide="clipboard-edit"></i>
          <span>Thẩm tra phương án tự chủ</span>
        </a>

        <div class="nav-section-title">III. HỒ SƠ SỐ HÓA</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('dept_archive', this)">
          <i data-lucide="archive"></i>
          <span>Hồ sơ số hóa</span>
        </a>
      `;
    } else if (config.id === 'phapche') {
      navHtml = `
        <div class="nav-section-title">I. PHÁP CHẾ & KỶ CƯƠNG</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="scale"></i>
          <span>Tổng quan pháp lý & Kỷ cương</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('vphc_compliance', this)">
          <i data-lucide="gavel"></i>
          <span>Theo dõi xử phạt VPHC</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('complaints', this)">
          <i data-lucide="clipboard-check"></i>
          <span>Đơn thư khiếu nại & Tố cáo</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('legal_docs', this)">
          <i data-lucide="file-text"></i>
          <span>Văn bản quy phạm pháp luật</span>
        </a>

        <div class="nav-section-title">II. NHẬP LIỆU & BÁO CÁO</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Báo cáo công tác pháp chế</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_entry', this)">
          <i data-lucide="clipboard-edit"></i>
          <span>Thẩm định văn bản & Xử lý đơn</span>
        </a>

        <div class="nav-section-title">III. HỒ SƠ SỐ HÓA</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('dept_archive', this)">
          <i data-lucide="archive"></i>
          <span>Hồ sơ số hóa</span>
        </a>
      `;
    } else if (config.id === 'vanphong') {
      navHtml = `
        <div class="nav-section-title">I. HÀNH CHÍNH & VĂN PHÒNG</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="folder-archive"></i>
          <span>Tổng quan công tác văn phòng</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('tasks', this)">
          <i data-lucide="clipboard-check"></i>
          <span>Sổ theo dõi nhiệm vụ UBND tỉnh</span>
          <span class="badge badge-success">182 hoàn thành</span>
        </a>

        <div class="nav-section-title">II. VĂN THƯ & LƯU TRỮ SỐ HÓA</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('archive_viewer', this)">
          <i data-lucide="archive"></i>
          <span>Kho lưu trữ tài liệu số hóa</span>
          <span class="badge badge-purple">88,5 mét giá</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Báo cáo hành chính tổng hợp</span>
        </a>
      `;
    } else if (config.id === 'admin') {
      navHtml = `
        <div class="nav-section-title">I. HẠ TẦNG & GIÁM SÁT</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="layout-dashboard"></i>
          <span>Tổng quan hạ tầng & API</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('realtime_monitor', this)">
          <i data-lucide="activity"></i>
          <span>Luồng dữ liệu thời gian thực</span>
          <span class="badge badge-success">Trực tuyến</span>
        </a>

        <div class="nav-section-title">II. TÍCH HỢP & DỮ LIỆU</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('api_gateway', this)">
          <i data-lucide="network"></i>
          <span>Quản lý kết nối & Tích hợp API</span>
          <span class="badge badge-info">15 API</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('master_data', this)">
          <i data-lucide="layers"></i>
          <span>Cơ sở dữ liệu chủ (MDM)</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('daas_portal', this)">
          <i data-lucide="share-2"></i>
          <span>Cổng chia sẻ dữ liệu (DaaS)</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('archive_viewer', this)">
          <i data-lucide="archive"></i>
          <span>Hồ sơ số hóa</span>
          <span class="badge badge-purple">Phân quyền</span>
        </a>

        <div class="nav-section-title">III. BẢO MẬT & KIỂM SOÁT</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_integrity', this)">
          <i data-lucide="git-merge"></i>
          <span>Kiểm tra toàn vẹn dữ liệu</span>
          <span class="badge badge-success">100%</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_catalog', this)">
          <i data-lucide="book-open"></i>
          <span>Từ điển dữ liệu & Bảo vệ DDM</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('audit_logs', this)">
          <i data-lucide="history"></i>
          <span>Nhật ký hệ thống & An toàn</span>
        </a>
      `;
    }

    navContainer.innerHTML = navHtml;
    this.renderSidebarFooter(config);
    if (window.lucide) window.lucide.createIcons();
  },

  switchTab(tabId, navItem) {
    this.currentTab = tabId;
    document.querySelectorAll('#dynamicSidebarNav .nav-item').forEach(item => item.classList.remove('active'));
    if (navItem) navItem.classList.add('active');
    this.loadWorkspace(this.currentDeptId);
  },

  loadWorkspace(deptId) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const container = document.getElementById('departmentWorkspaceContainer');
    if (!container) return;

    // 0. Cổng Báo Cáo Doanh Nghiệp & Cơ Quan Nhà Nước
    if (deptId === 'portal' || deptId.startsWith('portal_')) {
      const config = DEPT_CONFIGS[deptId];
      if (config && config.entityId) {
        ExternalPortalManager.currentEntityId = config.entityId;
      }
      ExternalPortalManager.init();
      return;
    }

    const config = DEPT_CONFIGS[deptId];
    if (!config) return;

    // 1. Phân Hệ Giám Sát Luồng Real-time
    if (this.currentTab === 'realtime_monitor') {
      container.innerHTML = `<div class="card" id="realtimeMainCard"></div>`;
      RealtimeEngine.renderRealtimeStreamView('realtimeMainCard');
      return;
    }

    // 2. Phân hệ Quản lý Báo cáo Định kỳ (Bộ Tài chính & UBND tỉnh)
    if (this.currentTab === 'reporting_system') {
      container.innerHTML = `
        <div class="sub-tabs-bar" id="surveyTabNav" style="margin-bottom: 16px;">
          <button class="sub-tab-btn active" id="tabBtnCampaigns" onclick="StateReportingManager.switchViewTab('campaigns', this)">
            <i data-lucide="calendar-check-2"></i> Danh mục kỳ báo cáo (Bộ Tài chính & UBND tỉnh)
          </button>
          <button class="sub-tab-btn" id="tabBtnTracking" onclick="StateReportingManager.switchViewTab('tracking', this)">
            <i data-lucide="list-checks"></i> Theo dõi tiến độ nộp & đôn đốc
          </button>
          <button class="sub-tab-btn" id="tabBtnApproval" onclick="StateReportingManager.switchViewTab('approval', this)">
            <i data-lucide="check-circle-2"></i> Thẩm tra & duyệt số liệu báo cáo
          </button>
        </div>
        <div id="surveyMainContent" class="card"></div>
      `;
      if (window.lucide) window.lucide.createIcons();
      StateReportingManager.init();
      return;
    }

    // 3. Phân Hệ Trực Quan Hóa Chuyên Sâu (BI Cockpit)
    if (this.currentTab === 'advanced_bi') {
      container.innerHTML = `<div id="vizMainContent"></div>`;
      AdvancedVizManager.init();
      return;
    }

    // 4. Phân Hệ Tìm Kiếm Toàn Văn Nâng Cao
    if (this.currentTab === 'global_search') {
      container.innerHTML = `<div class="card" id="searchMainCard"></div>`;
      SystemAnalyticsManager.renderAdvancedSearch('searchMainCard');
      return;
    }

    // 5. Phân Hệ Cảnh Báo Sớm
    if (this.currentTab === 'early_warnings') {
      container.innerHTML = `<div class="card" id="warningsMainCard"></div>`;
      SystemAnalyticsManager.renderEarlyWarningCenter('warningsMainCard');
      return;
    }

    // 6. Cổng Chia Sẻ Dữ Liệu (DaaS)
    if (this.currentTab === 'daas_portal') {
      container.innerHTML = `<div class="card" id="daasMainCard"></div>`;
      SystemAnalyticsManager.renderDaasManager('daasMainCard');
      return;
    }

    // 7. Nhật Ký Thao Tác (Audit Logs)
    if (this.currentTab === 'audit_logs') {
      container.innerHTML = `<div class="card" id="auditMainCard"></div>`;
      SystemAnalyticsManager.renderAuditLogs('auditMainCard');
      return;
    }

    // 8. Phân Hệ Nhập Liệu & Thẩm Tra Nghiệp Vụ Chuyên Môn
    if (this.currentTab === 'data_entry') {
      const deptMap = {
        'ktns': 'dept-ktns',
        'dtc': 'dept-dtc',
        'dtns': 'dept-dtns',
        'doanhnghiep': 'dept-doanhnghiep',
        'giacongsan': 'dept-giacongsan',
        'hcsn': 'dept-hcsn',
        'phapche': 'dept-phapche'
      };
      const activeDept = deptMap[deptId] || 'dept-ktns';

      if (deptId === 'lanhdao') {
        // Ban Giám đốc Sở: Phê duyệt hồ sơ liên ngành của tất cả các phòng ban
        container.innerHTML = `
          <div class="card" style="margin-bottom: 20px;">
            <div class="tabs-nav" id="entryDeptTabs" style="margin-bottom: 0; border-bottom: none; padding-bottom: 0;">
              <button class="tab-btn active" onclick="DataEntryManager.switchDeptTab('dept-ktns', this)">
                <i data-lucide="pie-chart"></i> Kinh tế và Ngân sách
              </button>
              <button class="tab-btn" onclick="DataEntryManager.switchDeptTab('dept-dtc', this)">
                <i data-lucide="hard-hat"></i> Quản lý Đầu tư công
              </button>
              <button class="tab-btn" onclick="DataEntryManager.switchDeptTab('dept-dtns', this)">
                <i data-lucide="building-2"></i> Quản lý Đầu tư ngoài ngân sách
              </button>
              <button class="tab-btn" onclick="DataEntryManager.switchDeptTab('dept-giacongsan', this)">
                <i data-lucide="home"></i> Quản lý Giá và Công sản
              </button>
              <button class="tab-btn" onclick="DataEntryManager.switchDeptTab('dept-doanhnghiep', this)">
                <i data-lucide="briefcase"></i> Quản lý Doanh nghiệp
              </button>
              <button class="tab-btn" onclick="DataEntryManager.switchDeptTab('dept-phapche', this)">
                <i data-lucide="gavel"></i> Pháp chế
              </button>
              <button class="tab-btn" onclick="DataEntryManager.switchDeptTab('dept-hcsn', this)">
                <i data-lucide="graduation-cap"></i> Tài chính Hành chính sự nghiệp
              </button>
            </div>
          </div>

          <div class="card" id="dynamicDeptFormContainer" style="margin-bottom: 20px;"></div>

          <!-- Pending Submissions Approval Table -->
          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title"><i data-lucide="check-square"></i> Hồ sơ trình Lãnh đạo Sở phê duyệt</h3>
                <p class="card-subtitle">Thẩm định và phê duyệt các hồ sơ nghiệp vụ do chuyên viên các phòng ban trình lên</p>
              </div>
              <span class="badge badge-warning">6 chờ duyệt</span>
            </div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Mã hồ sơ</th>
                    <th>Nội dung hồ sơ</th>
                    <th>Lĩnh vực nghiệp vụ</th>
                    <th>Người lập</th>
                    <th>Ngày trình</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody id="pendingSubmissionsTableBody">
                  <!-- Rendered via DataEntryManager -->
                </tbody>
              </table>
            </div>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        DataEntryManager.renderDeptForm('dept-ktns', 'tab1');
        DataEntryManager.renderPendingTable();
        return;
      }

      // Phòng ban chuyên môn: CHỈ hiển thị biểu mẫu nghiệp vụ thuộc đúng chức năng của phòng mình
      container.innerHTML = `
        <div class="card" id="dynamicDeptFormContainer" style="margin-bottom: 20px;"></div>

        <!-- Pending Submissions Approval Table of this department -->
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="inbox"></i> Danh sách hồ sơ đã lập & Tiến độ phê duyệt</h3>
              <p class="card-subtitle">Theo dõi trạng thái hồ sơ nghiệp vụ sau khi trình Lãnh đạo Sở phê duyệt nạp CSDL</p>
            </div>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Mã hồ sơ</th>
                  <th>Nội dung hồ sơ</th>
                  <th>Lĩnh vực nghiệp vụ</th>
                  <th>Người lập</th>
                  <th>Ngày trình</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody id="pendingSubmissionsTableBody">
                <!-- Rendered via DataEntryManager -->
              </tbody>
            </table>
          </div>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      DataEntryManager.renderDeptForm(activeDept, 'tab1');
      DataEntryManager.renderPendingTable();
      return;
    }

    // 9. Kho Lưu Trữ Số Hóa
    if (this.currentTab === 'dept_archive' || this.currentTab === 'archive_viewer') {
      container.innerHTML = `<div id="archiveMainContainer"></div>`;
      ArchiveManager.init('archiveMainContainer');
      return;
    }

    // 9b. Cá nhân hóa người dùng
    if (this.currentTab === 'executive_personalization') {
      container.innerHTML = `<div id="personalizationMainCard"></div>`;
      this.renderExecutivePersonalization('personalizationMainCard');
      return;
    }

    // 9c. Cài đặt thông báo & cảnh báo Lãnh đạo
    if (this.currentTab === 'executive_notifications') {
      container.innerHTML = `<div id="notificationsMainCard"></div>`;
      this.renderExecutiveNotifications('notificationsMainCard');
      return;
    }

    // 10. Trục API Bộ Tài chính
    if (this.currentTab === 'api_gateway') {
      container.innerHTML = `<div id="apiGatewayCard"></div>`;
      ApiGatewayManager.renderApiGateway('apiGatewayCard');
      return;
    }

    // 11. Quản Trị Dữ Liệu Chủ (Master Data)
    if (this.currentTab === 'master_data') {
      container.innerHTML = `<div id="mdmMainCard"></div>`;
      MdmCatalogManager.renderMasterDataManagement('mdmMainCard');
      return;
    }

    // 12. Từ Điển Dữ Liệu & DDM
    if (this.currentTab === 'data_catalog') {
      container.innerHTML = `<div id="catalogMainCard"></div>`;
      MdmCatalogManager.renderDataCatalog('catalogMainCard');
      return;
    }

    // 13. Màn hình phụ: Doanh Nghiệp Nguồn Thu Lớn (tax_payers)
    if (this.currentTab === 'tax_payers') {
      container.innerHTML = this.renderTaxPayersView();
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // 14. Màn hình phụ: Danh mục Dự án ngoài ngân sách & IRC (projects_list)
    if (this.currentTab === 'projects_list') {
      container.innerHTML = this.renderProjectsListView();
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // 15. Màn hình phụ: Sắp Xếp Nhà Đất Công Nghị định số 167/Nghị định số 67 (public_properties)
    if (this.currentTab === 'public_properties') {
      container.innerHTML = this.renderPublicPropertiesView();
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // 16. Màn hình phụ: 542 Đơn Vị Sự Nghiệp Công Lập Tự Chủ Nghị định số 60 (units_autonomy)
    if (this.currentTab === 'units_autonomy') {
      container.innerHTML = this.renderUnitsAutonomyView();
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // 17. Màn hình phụ: Giải Quyết Khiếu Nại, Tố Cáo & Kiến Nghị (complaints)
    if (this.currentTab === 'complaints') {
      container.innerHTML = this.renderComplaintsView();
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // 18. Màn hình phụ: Thi Hành Xử Phạt VPHC Tài Chính (vphc_compliance)
    if (this.currentTab === 'vphc_compliance') {
      container.innerHTML = this.renderVphcComplianceView();
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // 19. Màn hình phụ: CSDL Văn Bản QPPL & NQ55 (legal_docs)
    if (this.currentTab === 'legal_docs') {
      container.innerHTML = this.renderLegalDocsView();
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // 20. Màn hình phụ: Kiểm Tra Toàn Vẹn Dữ Liệu & Ma Trận Liên Thông (data_integrity)
    if (this.currentTab === 'data_integrity') {
      container.innerHTML = `<div id="integrityMainContainer"></div>`;
      SystemAnalyticsManager.renderDataIntegrityAndInteroperabilityView('integrityMainContainer');
      return;
    }

    // Render header banner of department
    let contentHtml = `
      <div class="domain-header-banner">
        <div class="banner-left">
          <div class="banner-icon">
            <i data-lucide="${config.icon}"></i>
          </div>
          <div class="banner-title" style="margin-bottom: 0;">
            <h2>${config.domainName}</h2>
          </div>
        </div>
      </div>
    `;

    // Render Stats Grid of this department
    contentHtml += `
      <div class="kpi-grid">
        ${config.stats.map(s => {
          const isAlert = s.trend && (s.trend.includes('-') || s.trend.includes('Cảnh báo') || s.trend.includes('chờ') || s.trend.includes('Ưu tiên') || s.trend.includes('chậm'));
          const isUp = s.trend && s.trend.includes('+');
          const trendIcon = isUp ? 'trending-up' : isAlert ? 'alert-triangle' : 'activity';
          const trendClass = isAlert ? 'trend-alert' : 'trend-positive';

          return `
            <div class="kpi-card">
              <div class="kpi-top-row">
                <span class="kpi-label">${s.label}</span>
                <div class="kpi-icon-pill ${s.color}">
                  <i data-lucide="${s.icon}"></i>
                </div>
              </div>
              
              <div class="kpi-main-metric">${s.value}</div>

              <div class="kpi-footer-row">
                <span class="kpi-context-text" title="${s.unit}">${s.unit}</span>
                ${s.trend ? `
                  <span class="kpi-trend-pill ${trendClass}">
                    <i data-lucide="${trendIcon}"></i> ${s.trend}
                  </span>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Render Specific Content based on Department and Current Tab
    if (deptId === 'lanhdao') {
      contentHtml += this.renderLanhDaoContent();
    } else if (deptId === 'vanphong') {
      contentHtml += this.renderVanPhongContent();
    } else if (deptId === 'ktns') {
      contentHtml += this.renderKTNSContent();
    } else if (deptId === 'dtc') {
      contentHtml += this.renderDTCContent();
    } else if (deptId === 'dtns') {
      contentHtml += this.renderDTNSContent();
    } else if (deptId === 'doanhnghiep') {
      contentHtml += this.renderDoanhNghiepContent();
    } else if (deptId === 'giacongsan') {
      contentHtml += this.renderGiaCongSanContent();
    } else if (deptId === 'hcsn') {
      contentHtml += this.renderHCSNContent();
    } else if (deptId === 'phapche') {
      contentHtml += this.renderPhapCheContent();
    } else if (deptId === 'admin') {
      contentHtml += this.renderAdminContent();
    }

    container.innerHTML = contentHtml;
    if (window.lucide) window.lucide.createIcons();

    // Trigger charts and managers if applicable
    setTimeout(() => {
      if (this.currentTab === 'dashboard') {
        if (deptId === 'lanhdao') ChartsManager.initAll();
        if (deptId === 'ktns') ChartsManager.renderRevenueChart();
        if (deptId === 'dtc') ChartsManager.renderInvestmentChart();
        if (deptId === 'doanhnghiep') ChartsManager.renderRiskScatterPlot();
      }
      if (deptId === 'admin') {
        if (window.ApiGatewayManager) {
          ApiGatewayManager.renderApiGateway('adminApiGatewayContainer');
        }
      }
      if (this.currentTab === 'entry' || this.currentTab === 'survey') {
        if (window.DataEntryManager) DataEntryManager.init();
      }
    }, 100);
  },

  // 1. Màn hình Điều hành Kinh tế Tổng thể (Ban Giám đốc Sở)
  renderLanhDaoContent() {
    if (this.currentTab === 'approvals') {
      return `
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="check-square"></i> Trung tâm phê duyệt báo cáo trình lãnh đạo Sở Tài chính</h3>
              <p class="card-subtitle">Hồ sơ báo cáo do các phòng chuyên môn và Đơn vị/Doanh nghiệp nộp qua Cổng báo cáo định kỳ</p>
            </div>
            <span class="badge badge-warning">Thẩm quyền Giám đốc Sở</span>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Mã hồ sơ</th>
                  <th>Tiêu đề báo cáo</th>
                  <th>Phòng chuyên môn / Đơn vị trình</th>
                  <th>Người lập</th>
                  <th>Thời gian gửi</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody id="pendingSubmissionsTableBody">
                ${APP_DATA.pendingSubmissions.map(sub => `
                  <tr>
                    <td><strong style="color: #38bdf8;">${sub.id}</strong></td>
                    <td>
                      <div style="font-weight: 600; color: #fff;">${sub.title}</div>
                      <div style="font-size: 11px; color: #94a3b8;">${sub.dept}</div>
                    </td>
                    <td><span class="badge badge-info">${sub.type}</span></td>
                    <td>${sub.submittedBy}</td>
                    <td>${sub.submittedDate}</td>
                    <td>
                      <span class="badge ${sub.status === 'APPROVED' ? 'badge-success' : sub.status === 'REJECTED' ? 'badge-danger' : 'badge-warning'}">
                        ${sub.status === 'APPROVED' ? 'Đã Phê Duyệt' : sub.status === 'REJECTED' ? 'Từ Chối' : 'Chờ Phê Duyệt'}
                      </span>
                    </td>
                    <td>
                      ${sub.status === 'PENDING' ? `
                        <div style="display: flex; gap: 6px;">
                          <button class="btn btn-success btn-sm" onclick="DataEntryManager.approveSubmission('${sub.id}')">
                            <i data-lucide="check"></i> Phê duyệt
                          </button>
                          <button class="btn btn-danger btn-sm" onclick="DataEntryManager.rejectSubmission('${sub.id}')">
                            <i data-lucide="x"></i> Trả lại
                          </button>
                        </div>
                      ` : `<span style="font-size: 11px; color: #64748b;">Đã xử lý</span>`}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    return `
      <div class="dashboard-row">
        <div class="col-6">
          <div class="card" style="height: 100%;">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="map-pin"></i> Bản đồ kinh tế không gian tỉnh Khánh Hòa (GIS)</h3>
              <span class="badge badge-info">Địa giới hành chính OpenStreetMap thực tế</span>
            </div>
            <div id="khanhHoaMapFrame">
              <div class="khanhhoa-map-wrapper">
                <!-- Khu vực hiển thị Bản đồ GIS Thực tế (Leaflet Map) -->
                <div class="map-svg-area" id="khanhHoaGisMapContainer" style="position: relative; min-height: 380px; width: 100%;">
                </div>

                <!-- Sidebar Thông Tin Chi Tiết Địa Bàn Chọn -->
                <div class="map-district-sidebar" id="mapDistrictInfo">
                  <div class="district-info-header">
                    <div class="district-badge">
                      <i data-lucide="map-pin" style="width: 13px; height: 13px;"></i> Đơn vị cấp xã/phường
                    </div>
                    <h4 id="overlayDistrictName" class="district-name">[STT 49] Phường Nha Trang</h4>
                  </div>

                  <div class="district-metrics-list">
                    <div class="district-metric-item">
                      <div class="metric-label">Thu ngân sách trên địa bàn:</div>
                      <div id="overlayDistrictRevenue" class="metric-val highlight-blue">3.850,0 Tỷ VNĐ (104,2%)</div>
                      <div class="metric-sub">Đạt 104.2% dự toán năm 2026</div>
                    </div>

                    <div class="district-metric-item">
                      <div class="metric-label">Tỷ lệ giải ngân vốn ĐTC:</div>
                      <div id="overlayDistrictDTC" class="metric-val highlight-green">78,5% (3.022 Tỷ)</div>
                      <div class="metric-sub">Đúng tiến độ chỉ đạo điều hành</div>
                    </div>

                    <div class="district-metric-item">
                      <div class="metric-label">Số DN & Hộ kinh doanh:</div>
                      <div id="overlayDistrictProjects" class="metric-val highlight-amber">4.200 DN (Hệ số K = 1.50)</div>
                      <div class="metric-sub">Đơn vị hành chính cấp cơ sở trực thuộc tỉnh</div>
                    </div>
                  </div>

                  <button class="btn btn-soft-primary btn-sm" style="width: 100%; margin-top: 10px;" onclick="App.showNotification('Đang trích xuất báo cáo kinh tế chi tiết địa bàn...', 'info')">
                    <i data-lucide="file-bar-chart-2"></i> Xem báo cáo địa bàn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card" style="height: 100%;">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="bar-chart-3"></i> Cơ cấu thu ngân sách theo sắc thuế</h3>
              <div style="display: flex; gap: 8px; align-items: center;">
                <span class="chart-live-badge"><span class="pulse-dot"></span> Real-time Live</span>
                <span class="badge badge-success">Đạt 102.3% dự toán</span>
              </div>
            </div>
            <div class="chart-wrapper"><canvas id="chartRevenueStructure"></canvas></div>
          </div>
        </div>
      </div>
      <div class="dashboard-row">
        <div class="col-7">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="git-merge"></i> Luồng điều tiết ngân sách</h3>
              <span class="badge badge-purple">Tự cân đối 102,4%</span>
            </div>
            <div id="sankeyFlowContainer"></div>
          </div>
        </div>
        <div class="col-5">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="line-chart"></i> Giải ngân vốn đầu tư công toàn tỉnh</h3>
              <span class="chart-live-badge"><span class="pulse-dot"></span> Cập nhật KBNN</span>
            </div>
            <div class="chart-wrapper"><canvas id="chartInvestmentProgress"></canvas></div>
          </div>
        </div>
      </div>
    `;
  },

  // 1b. Màn hình Điều Hành Văn Phòng Sở
  renderVanPhongContent() {
    const config = DEPT_CONFIGS['vanphong'];
    if (this.currentTab === 'archive_viewer' || this.currentTab === 'dept_archive') {
      return this.renderDeptArchiveFiltered('Văn phòng Sở', 'Văn phòng Sở (42.600 trang A4 / 88,5 mét giá)');
    }
    if (this.currentTab === 'tasks') {
      return `
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="check-circle-2"></i> Sổ theo dõi nhiệm vụ chỉ đạo điều hành UBND tỉnh giao</h3>
              <p class="card-subtitle">Theo dõi đôn đốc các phòng chuyên môn thực hiện nhiệm vụ trọng tâm được giao</p>
            </div>
            <span class="badge badge-success">182/186 Hoàn thành (97,8%)</span>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Mã nhiệm vụ</th>
                  <th>Nội dung nhiệm vụ giao</th>
                  <th>Phòng chuyên môn chủ trì</th>
                  <th>Hạn hoàn thành</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style="color: #0284c7;">NV-2026-081</strong></td>
                  <td>Xây dựng kịch bản thu ngân sách quý IV/2026</td>
                  <td>Phòng Kinh tế và Ngân sách</td>
                  <td>15/09/2026</td>
                  <td><span class="badge badge-success">Đang thực hiện</span></td>
                </tr>
                <tr>
                  <td><strong style="color: #0284c7;">NV-2026-082</strong></td>
                  <td>Đôn đốc giải ngân 10 dự án đầu tư công trọng điểm</td>
                  <td>Phòng Quản lý Đầu tư công</td>
                  <td>30/08/2026</td>
                  <td><span class="badge badge-warning">Ưu tiên cao</span></td>
                </tr>
                <tr>
                  <td><strong style="color: #0284c7;">NV-2026-083</strong></td>
                  <td>Rà soát bảng giá đất định kỳ 2026</td>
                  <td>Phòng Quản lý Giá và Công sản</td>
                  <td>10/09/2026</td>
                  <td><span class="badge badge-info">Đúng hạn</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
    return `
      <div class="dashboard-row">
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="file-text"></i> Văn bản chỉ đạo & điều hành phát hành gần nhất</h3>
            </div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Số / Ký hiệu</th>
                    <th>Trích yếu nội dung</th>
                    <th>Ngày ban hành</th>
                    <th>Người ký</th>
                  </tr>
                </thead>
                <tbody>
                  ${config.documents.map(doc => `
                    <tr>
                      <td><strong style="color: #002B8C;">${doc.code}</strong></td>
                      <td>
                        <div style="font-weight: 600; color: #0f172a;">${doc.title}</div>
                        <span class="badge badge-info">${doc.type}</span>
                      </td>
                      <td>${doc.date}</td>
                      <td><span class="badge badge-purple">${doc.signer}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="archive"></i> Tiến độ số hóa hồ sơ tài liệu lưu trữ các phòng ban</h3>
            </div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Phòng chuyên môn</th>
                    <th>Khối lượng mét giá</th>
                    <th>Trang A4 số hóa</th>
                    <th>Tiến độ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Phòng Quản lý Đầu tư công</strong></td>
                    <td>55,8 mét</td>
                    <td>139.500 trang</td>
                    <td><span class="badge badge-success">100% hoàn thành</span></td>
                  </tr>
                  <tr>
                    <td><strong>Phòng Kinh tế và Ngân sách</strong></td>
                    <td>2,0 mét</td>
                    <td>15.400 trang</td>
                    <td><span class="badge badge-success">100% hoàn thành</span></td>
                  </tr>
                  <tr>
                    <td><strong>Phòng Quản lý Giá và Công sản</strong></td>
                    <td>12,5 mét</td>
                    <td>31.250 trang</td>
                    <td><span class="badge badge-success">100% hoàn thành</span></td>
                  </tr>
                  <tr>
                    <td><strong>Phòng Quản lý Doanh nghiệp</strong></td>
                    <td>8,4 mét</td>
                    <td>21.000 trang</td>
                    <td><span class="badge badge-success">100% hoàn thành</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 2. Màn hình Điều Hành Lĩnh Vực Kinh Tế & Ngân Sách
  renderKTNSContent() {
    const config = DEPT_CONFIGS['ktns'];
    if (this.currentTab === 'data_entry') {
      return `<div class="card" id="dynamicDeptFormContainer"></div>`;
    }
    if (this.currentTab === 'dept_archive') {
      return this.renderDeptArchiveFiltered('Kinh tế và Ngân sách', 'Phòng Kinh tế và Ngân sách (15.400 trang A4 / 2,0m)');
    }
    return `
      <div class="dashboard-row">
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="award"></i> Doanh nghiệp có số nộp ngân sách lớn</h3>
            </div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Doanh nghiệp trọng điểm</th>
                    <th>Chỉ tiêu giao</th>
                    <th>Thực thu</th>
                    <th>Tiến độ</th>
                    <th>Đánh giá</th>
                  </tr>
                </thead>
                <tbody>
                  ${config.keyTaxPayers.map(k => `
                    <tr>
                      <td><strong>${k.name}</strong><br><small>MST: ${k.mst}</small></td>
                      <td>${k.target}</td>
                      <td><strong style="color: #0284c7;">${k.actual}</strong></td>
                      <td><span class="badge badge-success">${k.rate}</span></td>
                      <td><span class="badge badge-success">${k.status}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="bar-chart-3"></i> Tiến độ thu ngân sách theo sắc thuế</h3>
            </div>
            <div class="chart-wrapper"><canvas id="chartRevenueStructure"></canvas></div>
          </div>
        </div>
      </div>
    `;
  },

  // 3. Màn hình Điều hành Lĩnh vực Đầu tư công
  renderDTCContent() {
    const config = DEPT_CONFIGS['dtc'];
    if (this.currentTab === 'data_entry') {
      return `<div class="card" id="dynamicDeptFormContainer"></div>`;
    }
    if (this.currentTab === 'dept_archive') {
      return this.renderDeptArchiveFiltered('Đầu tư công', 'Phòng Quản lý Đầu tư công (55,8 mét chỉnh lý & số hóa)');
    }
    return `
      <div class="dashboard-row">
        <div class="col-7">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="hard-hat"></i> Tiến độ dự án đầu tư công trọng điểm</h3>
              <span class="badge badge-warning">Kế hoạch 2026</span>
            </div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Mã dự án</th>
                    <th>Tên dự án</th>
                    <th>Chủ đầu tư</th>
                    <th>Kế hoạch vốn</th>
                    <th>Đã giải ngân</th>
                    <th>Tỷ lệ</th>
                  </tr>
                </thead>
                <tbody>
                  ${config.projects.map(p => `
                    <tr>
                      <td><strong style="color: #0284c7;">${p.id}</strong></td>
                      <td><strong>${p.name}</strong></td>
                      <td>${p.owner}</td>
                      <td>${p.budget}</td>
                      <td><strong style="color: #15803d;">${p.disbursed}</strong></td>
                      <td><span class="badge badge-success">${p.rate}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-5">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="trending-up"></i> Tiến độ giải ngân vốn đầu tư công lũy kế</h3>
            </div>
            <div class="chart-wrapper"><canvas id="chartInvestmentProgress"></canvas></div>
          </div>
        </div>
      </div>
    `;
  },

  // 4. Màn hình Điều hành Lĩnh vực Đầu tư ngoài ngân sách & FDI
  renderDTNSContent() {
    const config = DEPT_CONFIGS['dtns'];
    if (this.currentTab === 'data_entry') {
      return `<div class="card" id="dynamicDeptFormContainer"></div>`;
    }
    if (this.currentTab === 'dept_archive') {
      return this.renderDeptArchiveFiltered('Đầu tư ngoài ngân sách', 'Phòng Quản lý Đầu tư ngoài ngân sách (117m / 900.900 trang A4)');
    }
    return `
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="building-2"></i> Danh mục dự án đầu tư ngoài ngân sách và dự án FDI</h3>
            <p class="card-subtitle">Theo dõi sát tiến độ cam kết, vốn đăng ký, diện tích đất sử dụng và Giấy chứng nhận ĐKĐT (IRC)</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="DeptWorkspaceManager.switchTab('data_entry')"><i data-lucide="plus"></i> Thêm dự án mới</button>
            <button class="btn btn-primary btn-sm" onclick="App.showNotification('Đang xuất báo cáo Excel dự án ngoài ngân sách...', 'success')"><i data-lucide="download"></i> Xuất Excel</button>
          </div>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Mã dự án</th>
                <th>Tên dự án đầu tư</th>
                <th>Nhà đầu tư / Doanh nghiệp</th>
                <th>Tổng vốn đăng ký</th>
                <th>Diện tích</th>
                <th>Tiến độ</th>
                <th>Trạng thái thực tế</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${config.projects.map(p => `
                <tr>
                  <td><strong style="color: #0284c7;">${p.id}</strong></td>
                  <td><strong>${p.name}</strong></td>
                  <td>${p.investor}</td>
                  <td><strong style="color: #15803d;">${p.capital}</strong></td>
                  <td>${p.land}</td>
                  <td><span class="badge badge-info">${p.progress}</span></td>
                  <td><span class="badge ${p.status.includes('chậm') ? 'badge-danger' : 'badge-warning'}">${p.status}</span></td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="ArchiveManager.viewHistoricalDoc('DOC-DTNS-00184')">
                      <i data-lucide="file-text"></i> Xem hồ sơ gốc
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

  // 5. Màn hình Điều Hành Lĩnh Vực Doanh Nghiệp & HTX
  renderDoanhNghiepContent() {
    const config = DEPT_CONFIGS['doanhnghiep'];
    return `
      <div class="dashboard-row">
        <div class="col-7">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="briefcase"></i> Theo dõi báo cáo tài chính và hiệu quả hoạt động doanh nghiệp</h3>
            </div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Doanh nghiệp</th>
                    <th>Vốn đăng ký</th>
                    <th>Doanh thu</th>
                    <th>ROA</th>
                    <th>ROE</th>
                    <th>Đánh giá rủi ro</th>
                  </tr>
                </thead>
                <tbody>
                  ${config.companies.map(c => `
                    <tr>
                      <td><strong>${c.name}</strong><br><small>MST: ${c.mst}</small></td>
                      <td>${c.capital}</td>
                      <td>${c.revenue}</td>
                      <td><strong style="color: ${c.roa.includes('-') ? '#dc2626' : '#0284c7'};">${c.roa}</strong></td>
                      <td><strong style="color: ${c.roe.includes('-') ? '#dc2626' : '#0284c7'};">${c.roe}</strong></td>
                      <td><span class="badge ${c.risk === 'An toàn' ? 'badge-success' : c.risk === 'Trung bình' ? 'badge-warning' : 'badge-danger'}">${c.risk}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-5">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="radar"></i> Ma trận định vị rủi ro tài chính doanh nghiệp</h3>
            </div>
            <div class="chart-wrapper"><canvas id="chartRiskScatter"></canvas></div>
          </div>
        </div>
      </div>
    `;
  },

  // 6. Màn hình Điều Hành Lĩnh Vực Giá & Tài Sản Công
  renderGiaCongSanContent() {
    const config = DEPT_CONFIGS['giacongsan'];
    return `
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="home"></i> Phương án sắp xếp lại, xử lý cơ sở nhà đất công</h3>
            <p class="card-subtitle">Danh mục các cơ sở nhà đất công được giữ lại, bán đấu giá, chuyển nhượng hoặc thu hồi</p>
          </div>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Mã cơ sở</th>
                <th>Tên cơ sở nhà đất công</th>
                <th>Diện tích khuôn viên</th>
                <th>Phương án xử lý đã phê duyệt</th>
                <th>Tiến độ thực hiện</th>
              </tr>
            </thead>
            <tbody>
              ${config.properties.map(prop => `
                <tr>
                  <td><strong style="color: #0284c7;">${prop.id}</strong></td>
                  <td><strong>${prop.name}</strong></td>
                  <td>${prop.area}</td>
                  <td><span class="badge badge-info">${prop.plan}</span></td>
                  <td><span class="badge ${prop.status.includes('Đã') || prop.status.includes('Hoàn tất') ? 'badge-success' : 'badge-warning'}">${prop.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 7. Màn hình Điều Hành Lĩnh Vực Tài Chính HCSN
  renderHCSNContent() {
    const config = DEPT_CONFIGS['hcsn'];
    return `
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="graduation-cap"></i> Danh sách đơn vị sự nghiệp công lập tự chủ tài chính</h3>
            <p class="card-subtitle">Phân loại mức độ tự chủ (Nhóm 1, 2, 3, 4), nguồn thu sự nghiệp và số biên chế giao</p>
          </div>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Mã đơn vị</th>
                <th>Tên đơn vị sự nghiệp công lập</th>
                <th>Mức độ tự chủ tài chính</th>
                <th>Số biên chế</th>
                <th>Nguồn thu sự nghiệp</th>
                <th>Kinh phí NSNN cấp</th>
              </tr>
            </thead>
            <tbody>
              ${config.units.map(u => `
                <tr>
                  <td><strong style="color: #0284c7;">${u.id}</strong></td>
                  <td><strong>${u.name}</strong></td>
                  <td><span class="badge badge-purple">${u.group}</span></td>
                  <td>${u.staff}</td>
                  <td><strong style="color: #15803d;">${u.revenue}</strong></td>
                  <td>${u.budget_support}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 8. Màn hình Điều Hành Lĩnh Vực Pháp Chế & Theo Dõi Thi Hành Xử Phạt VPHC Tài Chính
  renderPhapCheContent() {
    const config = DEPT_CONFIGS['phapche'];
    return `
      <!-- Row 1: Xử Phạt VPHC & Đôn Đốc Nộp Phạt KBNN -->
      <div class="dashboard-row">
        <!-- Quyết định xử phạt VPHC -->
        <div class="col-7">
          <div class="card" style="height: 100%;">
            <div class="card-header">
              <div>
                <h3 class="card-title"><i data-lucide="gavel"></i> Theo dõi thi hành quyết định xử phạt vi phạm hành chính</h3>
                <p class="card-subtitle">Theo dõi đôn đốc thi hành các quyết định xử phạt VPHC trong lĩnh vực tài chính, giá, kế toán</p>
              </div>
              <span class="badge badge-purple">42 Quyết định</span>
            </div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Mã hồ sơ</th>
                    <th>Nội dung quyết định xử phạt / Vụ việc</th>
                    <th>Cơ quan ban hành</th>
                    <th>Số tiền phạt</th>
                    <th>Tiến độ nộp phạt</th>
                  </tr>
                </thead>
                <tbody>
                  ${config.legalCases.map(c => `
                    <tr>
                      <td><strong style="color: #0284c7;">${c.id}</strong></td>
                      <td>
                        <strong>${c.caseName}</strong>
                        <div style="font-size: 11px; color: #475569; margin-top: 2px;">Cán bộ đôn đốc: ${c.expert} | Hạn: ${c.deadline}</div>
                      </td>
                      <td>${c.agency}</td>
                      <td><strong style="color: #ef4444;">${c.amount}</strong></td>
                      <td>
                        <span class="badge ${c.status.includes('Đã') || c.status.includes('Còn') ? 'badge-success' : 'badge-warning'}">${c.status}</span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Thi hành xử phạt VPHC -->
        <div class="col-5">
          <div class="card" style="height: 100%;">
            <div class="card-header">
              <div>
                <h3 class="card-title"><i data-lucide="shield-check"></i> Đôn đốc nộp tiền phạt vào Kho bạc</h3>
                <p class="card-subtitle">Theo dõi chấp hành nộp tiền phạt vi phạm hành chính vào Kho bạc Nhà nước</p>
              </div>
              <span class="badge badge-emerald">2.180 / 2.450 Triệu (89%)</span>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 10px; padding: 16px;">
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 2px;">
                <span>Tiến độ thu nộp tiền phạt vào KBNN:</span>
                <strong style="color: #34d399;">89,0%</strong>
              </div>
              <div style="background: #1e293b; border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 8px;">
                <div style="background: linear-gradient(90deg, #10b981, #06b6d4); width: 89%; height: 100%;"></div>
              </div>

              <div class="realtime-event-card border-emerald">
                <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: #475569; margin-bottom: 4px; font-weight: 600;">
                  <span>QĐ 142/QĐ-XPHC (Vi phạm niêm yết giá)</span>
                  <span class="badge badge-success">Đã nộp KBNN</span>
                </div>
                <div style="font-weight: 700; color: #0f172a; font-size: 13.5px;">Công ty TNHH Vật liệu Xây dựng Miền Cát</div>
                <div style="font-size: 12px; color: #15803d; margin-top: 3px; font-weight: 600;">Số tiền nộp phạt: 420.000.000 VND (KBNN Cam Ranh)</div>
              </div>

              <div class="realtime-event-card border-gold">
                <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: #475569; margin-bottom: 4px; font-weight: 600;">
                  <span>QĐ 88/QĐ-XPHC (Chậm nộp BCTC kiểm toán)</span>
                  <span class="badge badge-warning">Đang đôn đốc</span>
                </div>
                <div style="font-weight: 700; color: #0f172a; font-size: 13.5px;">Công ty CP Thương Mại Dịch Vụ Biển Nha Trang</div>
                <div style="font-size: 12px; color: #b45309; margin-top: 3px; font-weight: 600;">Số tiền nộp phạt: 150.000.000 VND (Quá hạn 5 ngày)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 2: CSDL VBQPPL Chuyên Ngành & Thẩm Định Chính Sách NQ 55 -->
      <div class="dashboard-row">
        <div class="col-7">
          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title"><i data-lucide="file-text"></i> Văn bản quy phạm pháp luật tài chính</h3>
                <p class="card-subtitle">342 Văn bản QPPL do HĐND & UBND tỉnh ban hành, liên kết trực tiếp với các chỉ tiêu CSDL kinh tế</p>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang mở bộ lọc tra cứu VBQPPL theo lĩnh vực ngân sách...', 'info')">
                <i data-lucide="filter"></i> Lọc theo lĩnh vực
              </button>
            </div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Số ký hiệu</th>
                    <th>Trích yếu nội dung văn bản</th>
                    <th>Lĩnh vực kinh tế liên kết</th>
                    <th>Hiệu lực</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong style="color: #0284c7;">08/2026/NQ-HĐND</strong></td>
                    <td>Quy định phân cấp nguồn thu, nhiệm vụ chi và tỷ lệ phân chia các khoản thu giữa các cấp ngân sách tỉnh Khánh Hòa</td>
                    <td><span class="badge badge-info">Thu - Chi NSNN</span></td>
                    <td><span class="badge badge-success">Còn hiệu lực</span></td>
                  </tr>
                  <tr>
                    <td><strong style="color: #0284c7;">15/2025/QĐ-UBND</strong></td>
                    <td>Quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Sở Tài chính tỉnh Khánh Hòa</td>
                    <td><span class="badge badge-purple">Tổ chức bộ máy</span></td>
                    <td><span class="badge badge-success">Còn hiệu lực</span></td>
                  </tr>
                  <tr>
                    <td><strong style="color: #0284c7;">22/2024/NQ-HĐND</strong></td>
                    <td>Chính sách ưu đãi tài chính và hỗ trợ đầu tư vào Khu kinh tế Vân Phong theo Nghị quyết 55/2022/QH15</td>
                    <td><span class="badge badge-warning">Đầu tư & KKT</span></td>
                    <td><span class="badge badge-success">Còn hiệu lực</span></td>
                  </tr>
                  <tr>
                    <td><strong style="color: #0284c7;">04/2023/QĐ-UBND</strong></td>
                    <td>Bảng giá các loại đất định kỳ 5 năm trên địa bàn tỉnh Khánh Hòa (Sửa đổi, bổ sung)</td>
                    <td><span class="badge badge-emerald">Giá & Đất đai</span></td>
                    <td><span class="badge badge-success">Còn hiệu lực</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-5">
          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title"><i data-lucide="shield-check"></i> Ý kiến pháp lý hợp đồng và phòng ngừa tranh chấp</h3>
                <p class="card-subtitle">Thẩm định điều khoản tài chính trong các hợp đồng dự án PPP, thỏa thuận FDI lớn</p>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px; color: #0284c7; font-weight: 700;">
                  <span>HỢP ĐỒNG DỰ ÁN PPP</span>
                  <span class="badge badge-success">Đã thẩm định</span>
                </div>
                <div style="font-weight: 700; color: #0f172a; font-size: 13px; margin: 4px 0;">Dự án Nhà máy Xử lý Rác thải & Phát điện Nha Trang (BOT)</div>
                <p style="font-size: 11.5px; color: #64748b;">Đã rà soát điều khoản bảo lãnh doanh thu, rủi ro biến động tỷ giá và phương án thanh toán từ nguồn chi sự nghiệp môi trường.</p>
              </div>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px; color: #7c3aed; font-weight: 700;">
                  <span>THỎA THUẬN ĐẦU TƯ FDI LỚN</span>
                  <span class="badge badge-info">Đang thẩm định</span>
                </div>
                <div style="font-weight: 700; color: #0f172a; font-size: 13px; margin: 4px 0;">Dự án Cảng Trung Chuyển Quốc Tế Bắc Vân Phong (2.5 Tỷ USD)</div>
                <p style="font-size: 11.5px; color: #64748b;">Thẩm định cơ chế ưu đãi thuế TNDN, tiền thuê mặt nước và cam kết bảo đảm quyền lợi nhà đầu tư theo luật pháp Việt Nam và hiệp định quốc tế.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 9. Màn hình Điều Hành Trung Tâm Dữ Liệu Data Hub & Tích hợp API Bộ Tài chính
  renderAdminContent() {
    return `
      <div id="adminApiGatewayContainer"></div>
    `;
  },

  renderDeptArchiveFiltered(deptKeyword, deptTitle) {
    const list = APP_DATA.digitalArchive.filter(d => d.dept.includes(deptKeyword));
    return `
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="archive"></i> Kho tài liệu số hóa: ${deptTitle}</h3>
            <p class="card-subtitle">Tài liệu số hóa nguyên bản gắn nhãn Metadata và mã định danh CSDL phục vụ tra cứu đối chiếu</p>
          </div>
          <span class="badge badge-purple">${list.length} Tệp Hồ Sơ Tiêu Biểu</span>
        </div>
        <div class="api-service-grid">
          ${list.map(doc => `
            <div class="card" style="padding: 18px; display: flex; flex-direction: column; gap: 10px; background: #ffffff; border: 1px solid #e2e8f0; box-shadow: var(--shadow-xs);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <span class="badge badge-purple">${doc.docId}</span>
                <span class="badge badge-info"><i data-lucide="file-text"></i> ${doc.totalPages} trang A4</span>
              </div>
              <h4 style="font-size: 14px; font-weight: 700; color: #0f172a; line-height: 1.35;">${doc.title}</h4>
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;">
                <div><span style="color: #64748b;">Số văn bản:</span> <strong style="color: #0f172a;">${doc.regNumber}</strong></div>
                <div><span style="color: #64748b;">Ban hành:</span> <span style="color: #334155; font-weight: 600;">${doc.issueDate}</span></div>
              </div>
              <div style="display: flex; gap: 8px; margin-top: 4px;">
                <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="ArchiveManager.viewHistoricalDoc('${doc.docId}')">
                  <i data-lucide="file-text"></i> Xem văn bản
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 13. Màn hình phụ: Doanh Nghiệp Nguồn Thu Lớn (tax_payers)
  renderTaxPayersView() {
    const config = DEPT_CONFIGS['ktns'];
    return `
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="award"></i> Giám sát doanh nghiệp có số nộp ngân sách lớn</h3>
            <p class="card-subtitle">Theo dõi số phát sinh, số đã thực nộp KBNN và tỷ lệ hoàn thành dự toán của các tập đoàn, doanh nghiệp trọng điểm</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang trích xuất danh sách 100 Doanh nghiệp nộp thuế lớn nhất tỉnh Khánh Hòa (.xlsx)...', 'info')">
              <i data-lucide="download"></i> Xuất Excel top 100
            </button>
            <button class="btn btn-primary btn-sm" onclick="App.showNotification('Dữ liệu thu thuế đã đồng bộ Real-time từ Cục Thuế & TABMIS KBNN!', 'success')">
              <i data-lucide="refresh-cw"></i> Đồng bộ thuế real-time
            </button>
          </div>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Mã số thuế</th>
                <th>Tên doanh nghiệp trọng điểm</th>
                <th>Chỉ tiêu dự toán giao</th>
                <th>Số thực nộp Kho bạc Nhà nước</th>
                <th>Tỷ lệ đạt (%)</th>
                <th>Trạng thái đóng góp</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${config.keyTaxPayers.map(tp => `
                <tr>
                  <td><strong style="color: #0284c7;">${tp.mst}</strong></td>
                  <td><strong>${tp.name}</strong></td>
                  <td>${tp.target}</td>
                  <td><strong style="color: #15803d;">${tp.actual}</strong></td>
                  <td><span class="badge ${parseFloat(tp.rate) >= 100 ? 'badge-success' : 'badge-warning'}">${tp.rate}</span></td>
                  <td><span class="badge ${tp.status.includes('Vượt') ? 'badge-success' : 'badge-info'}">${tp.status}</span></td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Chi tiết thu thuế của [${tp.name}]: Thuế TNDN: 45%, Thuế GTGT: 35%, Thuế TTĐB: 20%', 'info')">
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

  // 14. Màn hình phụ: Danh mục Dự án ngoài ngân sách & IRC (projects_list)
  renderProjectsListView() {
    const config = DEPT_CONFIGS['dtns'];
    return `
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="file-badge-2"></i> Danh mục dự án đầu tư ngoài ngân sách và dự án FDI</h3>
            <p class="card-subtitle">Quản lý Giấy chứng nhận ĐKĐT (IRC), tiến độ cam kết, diện tích đất sử dụng và vốn thực hiện</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang lọc các dự án FDI có vốn trên 50 Triệu USD...', 'info')">
              <i data-lucide="filter"></i> Lọc dự án FDI
            </button>
            <button class="btn btn-primary btn-sm" onclick="DeptWorkspaceManager.switchTab('data_entry', document.getElementById('tabBtnDataEntry'))">
              <i data-lucide="plus"></i> Thêm dự án mới
            </button>
          </div>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Mã dự án</th>
                <th>Tên dự án đầu tư</th>
                <th>Nhà đầu tư / Doanh nghiệp</th>
                <th>Tổng vốn đăng ký</th>
                <th>Diện tích đất</th>
                <th>Tiến độ triển khai</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              ${config.projects.map(p => `
                <tr>
                  <td><strong style="color: #0284c7;">${p.id}</strong></td>
                  <td><strong>${p.name}</strong></td>
                  <td>${p.investor}</td>
                  <td><strong style="color: #15803d;">${p.capital}</strong></td>
                  <td>${p.land}</td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <div style="flex: 1; height: 6px; background: #e2e8f0; border-radius: 3px; min-width: 60px;">
                        <div style="width: ${p.progress}; height: 100%; background: #0284c7; border-radius: 3px;"></div>
                      </div>
                      <span style="font-size: 11.5px; font-weight: 600; color: #0f172a;">${p.progress}</span>
                    </div>
                  </td>
                  <td><span class="badge ${p.status.includes('vận hành') || p.status.includes('xây dựng') ? 'badge-success' : 'badge-warning'}">${p.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 15. Màn hình phụ: Sắp Xếp Nhà Đất Công Nghị định số 167/Nghị định số 67 (public_properties)
  renderPublicPropertiesView() {
    const config = DEPT_CONFIGS['giacongsan'];
    return `
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="building"></i> Phương án sắp xếp lại, xử lý cơ sở nhà đất công</h3>
            <p class="card-subtitle">Theo dõi hiện trạng sử dụng, phương án bán đấu giá, chuyển giao, giữ lại làm trụ sở</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang lọc cơ sở nhà đất công dôi dư phương án bán đấu giá tài sản trên đất...', 'info')">
              <i data-lucide="filter"></i> Lọc cơ sở bán đấu giá
            </button>
            <button class="btn btn-primary btn-sm" onclick="DeptWorkspaceManager.switchTab('data_entry', document.getElementById('tabBtnDataEntry'))">
              <i data-lucide="plus"></i> Thêm phương án
            </button>
          </div>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Mã cơ sở</th>
                <th>Tên cơ sở nhà đất công</th>
                <th>Diện tích khuôn viên</th>
                <th>Phương án xử lý đã phê duyệt</th>
                <th>Tiến độ thực hiện</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${config.properties.map(prop => `
                <tr>
                  <td><strong style="color: #0284c7;">${prop.id}</strong></td>
                  <td><strong>${prop.name}</strong></td>
                  <td>${prop.area}</td>
                  <td><span class="badge badge-info">${prop.plan}</span></td>
                  <td><span class="badge ${prop.status.includes('Đã') || prop.status.includes('Hoàn tất') ? 'badge-success' : 'badge-warning'}">${prop.status}</span></td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Hồ sơ [${prop.id}]: Đã có bản vẽ trích lục địa chính và QĐ phê duyệt phương án.', 'info')">
                      <i data-lucide="file-text"></i> Hồ sơ
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

  // 16. Màn hình phụ: 542 Đơn Vị Sự Nghiệp Công Lập Tự Chủ Nghị định số 60 (units_autonomy)
  renderUnitsAutonomyView() {
    const config = DEPT_CONFIGS['hcsn'];
    return `
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="users"></i> Danh sách đơn vị sự nghiệp công lập tự chủ tài chính</h3>
            <p class="card-subtitle">Phân loại tự chủ Nhóm 1, Nhóm 2, Nhóm 3, Nhóm 4, nguồn thu sự nghiệp và giảm chi trực tiếp từ NSNN</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang lọc 68 đơn vị tự chủ chi thường xuyên (Nhóm 1 & 2)...', 'info')">
              <i data-lucide="filter"></i> Lọc đơn vị Nhóm 1 & 2
            </button>
            <button class="btn btn-primary btn-sm" onclick="DeptWorkspaceManager.switchTab('data_entry', document.getElementById('tabBtnDataEntry'))">
              <i data-lucide="plus"></i> Thẩm tra phương án mới
            </button>
          </div>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Mã đơn vị</th>
                <th>Tên đơn vị sự nghiệp công lập</th>
                <th>Mức độ tự chủ tài chính</th>
                <th>Số biên chế</th>
                <th>Nguồn thu sự nghiệp năm</th>
                <th>Kinh phí NSNN cấp</th>
              </tr>
            </thead>
            <tbody>
              ${config.units.map(u => `
                <tr>
                  <td><strong style="color: #0284c7;">${u.id}</strong></td>
                  <td><strong>${u.name}</strong></td>
                  <td><span class="badge badge-purple">${u.group}</span></td>
                  <td>${u.staff}</td>
                  <td><strong style="color: #15803d;">${u.revenue}</strong></td>
                  <td>${u.budget_support}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 17. Màn hình phụ: Giải Quyết Đơn Thư Khiếu Nại, Tố Cáo & Kiến Nghị (complaints)
  renderComplaintsView() {
    const complaints = [
      { id: 'KNTC-2026-01', sender: 'Công dân Nguyễn Văn Hùng (Nha Trang)', content: 'Kiến nghị rà soát phương án bồi thường, hỗ trợ tái định cư dự án đường vành đai', receiveDate: '2026-08-10', deadline: '2026-09-10', status: 'Đang xử lý', handler: 'Tổ Pháp chế - Phòng Quản lý Giá và Công sản' },
      { id: 'KNTC-2026-02', sender: 'Công ty TNHH Xây dựng Thành Đạt', content: 'Phản ánh kết quả đánh giá hồ sơ đề xuất tài chính gói thầu xây lắp trường học', receiveDate: '2026-08-05', deadline: '2026-08-25', status: 'Đã trả lời bằng văn bản', handler: 'Phòng Pháp chế phối hợp Phòng Đầu tư' },
      { id: 'KNTC-2026-03', sender: 'Tập thể hộ dân xã Cam Hải Đông', content: 'Đề nghị giải thích căn cứ áp dụng bảng giá đất tính tiền bồi thường đất nông nghiệp', receiveDate: '2026-08-15', deadline: '2026-09-15', status: 'Đang xử lý', handler: 'Tổ Pháp chế' },
      { id: 'KNTC-2026-04', sender: 'Công dân Trần Thị Mai (Cam Ranh)', content: 'Tố cáo hành vi thu phụ phí không đúng quy định tại đơn vị sự nghiệp y tế', receiveDate: '2026-07-20', deadline: '2026-08-20', status: 'Đã giải quyết xong', handler: 'Phòng Pháp chế phối hợp HCSN' }
    ];

    return `
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="clipboard-check"></i> Quản lý & Giải quyết đơn thư khiếu nại, tố cáo, kiến nghị</h3>
            <p class="card-subtitle">Theo dõi tiếp nhận, phân loại và tiến độ giải quyết đơn thư khiếu nại, tố cáo thuộc thẩm quyền Sở Tài chính</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang mở Sổ theo dõi tiếp công dân định kỳ...', 'info')">
              <i data-lucide="book-open"></i> Sổ tiếp công dân
            </button>
            <button class="btn btn-primary btn-sm" onclick="DeptWorkspaceManager.switchTab('data_entry', document.getElementById('tabBtnDataEntry'))">
              <i data-lucide="plus"></i> Tiếp nhận đơn thư mới
            </button>
          </div>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Mã đơn thư</th>
                <th>Người gửi / Tổ chức</th>
                <th>Nội dung kiến nghị / khiếu nại</th>
                <th>Ngày tiếp nhận</th>
                <th>Thời hạn giải quyết</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${complaints.map(c => `
                <tr>
                  <td><strong style="color: #0284c7;">${c.id}</strong></td>
                  <td><strong>${c.sender}</strong></td>
                  <td>
                    <div>${c.content}</div>
                    <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Cán bộ thụ lý: ${c.handler}</div>
                  </td>
                  <td>${c.receiveDate}</td>
                  <td>${c.deadline}</td>
                  <td><span class="badge ${c.status.includes('Đã') ? 'badge-success' : 'badge-warning'}">${c.status}</span></td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đơn thư [${c.id}]: Đang mở chi tiết hồ sơ giải quyết và văn bản trả lời công dân.', 'info')">
                      <i data-lucide="eye"></i> Xem hồ sơ
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

  // 18. Màn hình phụ: Thi Hành Xử Phạt VPHC Tài Chính (vphc_compliance)
  renderVphcComplianceView() {
    return `
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="gavel"></i> Theo dõi thi hành quyết định xử phạt vi phạm hành chính</h3>
            <p class="card-subtitle">Giám sát việc chấp hành nộp tiền phạt vào Kho bạc Nhà nước theo thẩm quyền của Chủ tịch UBND tỉnh & Giám đốc Sở TC</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="App.showNotification('Đã gửi thông báo đôn đốc 03 đơn vị chưa nộp phạt đúng hạn!', 'warning')">
            <i data-lucide="bell-ring"></i> Đôn đốc nộp phạt quá hạn
          </button>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Số quyết định</th>
                <th>Đối tượng vi phạm</th>
                <th>Hành vi vi phạm</th>
                <th>Số tiền phạt (đồng)</th>
                <th>Kho bạc nộp phạt</th>
                <th>Trạng thái thi hành</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style="color: #0284c7;">142/QĐ-XPHC</strong></td>
                <td><strong>Công ty TNHH Vật liệu Xây dựng Miền Cát</strong></td>
                <td>Vi phạm không niêm yết giá hàng hóa bình ổn thị trường</td>
                <td><strong style="color: #15803d;">420.000.000</strong></td>
                <td>KBNN Cam Ranh</td>
                <td><span class="badge badge-success">Đã nộp KBNN</span></td>
              </tr>
              <tr>
                <td><strong style="color: #0284c7;">88/QĐ-XPHC</strong></td>
                <td><strong>Công ty CP Thương Mại Dịch Vụ Biển Nha Trang</strong></td>
                <td>Chậm nộp Báo cáo tài chính kiểm toán năm theo quy định</td>
                <td><strong style="color: #b45309;">150.000.000</strong></td>
                <td>KBNN Khánh Hòa</td>
                <td><span class="badge badge-warning">Đang đôn đốc (Quá 5 ngày)</span></td>
              </tr>
              <tr>
                <td><strong style="color: #0284c7;">65/QĐ-XPHC</strong></td>
                <td><strong>Trung Tâm Dịch Vụ Môi Trường Đô Thị</strong></td>
                <td>Sử dụng xe ô tô công vượt định mức tiêu chuẩn được duyệt</td>
                <td><strong style="color: #15803d;">80.000.000</strong></td>
                <td>KBNN Nha Trang</td>
                <td><span class="badge badge-success">Đã nộp KBNN</span></td>
              </tr>
              <tr>
                <td><strong style="color: #0284c7;">52/QĐ-XPHC</strong></td>
                <td><strong>Công ty TNHH Chế Biến Thủy Sản Hải Long</strong></td>
                <td>Kê khai sai căn cứ tính tiền thuê đất và mặt nước biển</td>
                <td><strong style="color: #15803d;">210.000.000</strong></td>
                <td>KBNN Vạn Ninh</td>
                <td><span class="badge badge-success">Đã nộp KBNN</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 19. Màn hình phụ: CSDL Văn Bản QPPL & NQ55 (legal_docs)
  renderLegalDocsView() {
    return `
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="file-text"></i> Văn bản quy phạm pháp luật và cơ chế chính sách đặc thù</h3>
            <p class="card-subtitle">Hệ thống hóa Nghị quyết HĐND tỉnh, Quyết định UBND tỉnh gắn liền với CSDL kinh tế</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <input type="text" class="form-control" placeholder="Tìm kiếm theo từ khóa / số ký hiệu..." style="width: 260px;" onkeyup="App.showNotification('Đang tra cứu toàn văn trong kho CSDL 342 văn bản...', 'info')" />
            <button class="btn btn-primary btn-sm">
              <i data-lucide="search"></i> Tìm kiếm
            </button>
          </div>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Số ký hiệu</th>
                <th>Ngày ban hành</th>
                <th>Trích yếu nội dung</th>
                <th>Cơ quan ban hành</th>
                <th>Lĩnh vực</th>
                <th>Tình trạng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style="color: #0284c7;">08/2026/NQ-HĐND</strong></td>
                <td>15/01/2026</td>
                <td>Quy định phân cấp nguồn thu, nhiệm vụ chi và tỷ lệ phân chia các khoản thu giữa các cấp ngân sách tỉnh Khánh Hòa</td>
                <td>HĐND tỉnh</td>
                <td><span class="badge badge-info">Thu - Chi NSNN</span></td>
                <td><span class="badge badge-success">Còn hiệu lực</span></td>
                <td>
                  <button class="btn btn-primary btn-sm" onclick="App.showNotification('Đang mở toàn văn Nghị quyết 08/2026/NQ-HĐND...', 'info')"><i data-lucide="eye"></i> Xem</button>
                </td>
              </tr>
              <tr>
                <td><strong style="color: #0284c7;">15/2025/QĐ-UBND</strong></td>
                <td>20/06/2025</td>
                <td>Quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Sở Tài chính tỉnh Khánh Hòa</td>
                <td>UBND tỉnh</td>
                <td><span class="badge badge-purple">Tổ chức bộ máy</span></td>
                <td><span class="badge badge-success">Còn hiệu lực</span></td>
                <td>
                  <button class="btn btn-primary btn-sm" onclick="App.showNotification('Đang mở toàn văn Quyết định 15/2025/QĐ-UBND...', 'info')"><i data-lucide="eye"></i> Xem</button>
                </td>
              </tr>
              <tr>
                <td><strong style="color: #0284c7;">22/2024/NQ-HĐND</strong></td>
                <td>10/12/2024</td>
                <td>Chính sách ưu đãi tài chính và hỗ trợ đầu tư vào Khu kinh tế Vân Phong theo Nghị quyết 55/2022/QH15</td>
                <td>HĐND tỉnh</td>
                <td><span class="badge badge-warning">Đầu tư & KKT</span></td>
                <td><span class="badge badge-success">Còn hiệu lực</span></td>
                <td>
                  <button class="btn btn-primary btn-sm" onclick="App.showNotification('Đang mở toàn văn Nghị quyết 22/2024/NQ-HĐND...', 'info')"><i data-lucide="eye"></i> Xem</button>
                </td>
              </tr>
              <tr>
                <td><strong style="color: #0284c7;">04/2023/QĐ-UBND</strong></td>
                <td>25/08/2023</td>
                <td>Bảng giá các loại đất định kỳ 5 năm trên địa bàn tỉnh Khánh Hòa (Sửa đổi, bổ sung)</td>
                <td>UBND tỉnh</td>
                <td><span class="badge badge-emerald">Giá & Đất đai</span></td>
                <td><span class="badge badge-success">Còn hiệu lực</span></td>
                <td>
                  <button class="btn btn-primary btn-sm" onclick="App.showNotification('Đang mở toàn văn Quyết định 04/2023/QĐ-UBND...', 'info')"><i data-lucide="eye"></i> Xem</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // 21. CÁ NHÂN HÓA NGƯỜI DÙNG
  // -------------------------------------------------------------
  renderExecutivePersonalization(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header" style="flex-wrap: wrap; gap: 12px;">
          <div>
            <h3 class="card-title"><i data-lucide="sliders" style="color: #0284c7;"></i> Cá nhân hóa người dùng</h3>
            <p class="card-subtitle">Tùy biến bố cục bảng điều khiển, ghim các chỉ tiêu kinh tế trọng điểm và thiết lập bộ lọc theo dõi cá nhân</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="App.showNotification('Đã lưu thành công cấu hình cá nhân hóa người dùng!', 'success')">
            <i data-lucide="save"></i> Lưu cấu hình cá nhân
          </button>
        </div>

        <div class="responsive-split-grid">
          <!-- 1. BỐ CỤC WIDGET DASHBOARD -->
          <div>
            <h4 style="font-size: 13.5px; font-weight: 700; color: var(--c-oceanic-azure); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="layout"></i> 1. Bố cục Widget Điều hành (Dashboard Widgets)
            </h4>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-weight: 700; font-size: 13px; color: #0f172a;">📊 Cân đối Thu - Chi Ngân sách & Tiến độ Dự toán HĐND</div>
                  <div style="font-size: 11.5px; color: #64748b;">Số liệu thu nội địa, thu XNK, chi thường xuyên và chi đầu tư</div>
                </div>
                <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: #002B8C; cursor: pointer;" />
              </div>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-weight: 700; font-size: 13px; color: #0f172a;">🏗️ Tiến độ Giải ngân Vốn Đầu tư công & 10 Dự án Trọng điểm</div>
                  <div style="font-size: 11.5px; color: #64748b;">Tỷ lệ giải ngân Kho bạc, các dự án nghẽn dòng tiền trên 60 ngày</div>
                </div>
                <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: #002B8C; cursor: pointer;" />
              </div>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-weight: 700; font-size: 13px; color: #0f172a;">🏢 Sức khỏe Tài chính & Đóng góp NS của Khatoco và Yến Sào</div>
                  <div style="font-size: 11.5px; color: #64748b;">Doanh thu, lợi nhuận và số nộp NSNN của các doanh nghiệp chủ lực</div>
                </div>
                <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: #002B8C; cursor: pointer;" />
              </div>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-weight: 700; font-size: 13px; color: #0f172a;">🗺️ Bản đồ Kinh tế Số 8 Địa bàn Hành chính Tỉnh</div>
                  <div style="font-size: 11.5px; color: #64748b;">Phân bổ thu chi ngân sách theo Nha Trang, Cam Ranh, Ninh Hòa, Cam Lâm...</div>
                </div>
                <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: #002B8C; cursor: pointer;" />
              </div>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-weight: 700; font-size: 13px; color: #0f172a;">⚠️ Trung tâm Cảnh báo sớm Rủi ro Tài chính & Chậm giải ngân</div>
                  <div style="font-size: 11.5px; color: #64748b;">Tự động phát hiện bất thường thu ngân sách, nợ thuế lớn và công sản quá hạn</div>
                </div>
                <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: #002B8C; cursor: pointer;" />
              </div>
            </div>
          </div>

          <!-- 2. GHIM CHỈ TIÊU & BỘ LỌC MẶC ĐỊNH -->
          <div>
            <h4 style="font-size: 13.5px; font-weight: 700; color: var(--c-oceanic-azure); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="pin"></i> 2. Ghim Chỉ tiêu Vĩ mô Ưu tiên Theo dõi Nhanh
            </h4>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 16px;">
              <p style="font-size: 11.5px; color: #64748b; margin-bottom: 10px;">Chọn các chỉ tiêu ghim nổi bật trên thanh điều hành đầu trang:</p>
              <div class="checkbox-2col-grid">
                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;"><input type="checkbox" checked style="accent-color: #002B8C;" /> <strong>Thu NSNN toàn tỉnh</strong></label>
                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;"><input type="checkbox" checked style="accent-color: #002B8C;" /> <strong>Tỷ lệ giải ngân ĐTC</strong></label>
                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;"><input type="checkbox" checked style="accent-color: #002B8C;" /> <strong>Tăng trưởng GRDP</strong></label>
                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;"><input type="checkbox" checked style="accent-color: #002B8C;" /> <strong>Dòng tiền Kho bạc</strong></label>
                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;"><input type="checkbox" style="accent-color: #002B8C;" /> Nợ đọng thuế nội địa</label>
                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;"><input type="checkbox" style="accent-color: #002B8C;" /> Dự án FDI thu hút mới</label>
              </div>
            </div>

            <h4 style="font-size: 13.5px; font-weight: 700; color: var(--c-oceanic-azure); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="filter"></i> 3. Thiết lập Bộ lọc Mặc định khi Mở Ứng dụng
            </h4>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
              <div>
                <label style="font-size: 11.5px; font-weight: 600; color: #475569; display: block; margin-bottom: 4px;">Địa bàn trọng điểm ưu tiên:</label>
                <select class="form-control" style="width: 100%;">
                  <option selected>Toàn tỉnh Khánh Hòa (Tổng hợp 65 xã, phường, đặc khu)</option>
                  <option>Khu vực Đô thị Trung tâm (16 Phường Đô thị)</option>
                  <option>Khu kinh tế Vân Phong (Xã Vạn Ninh, Vạn Hưng, Đại Lãnh)</option>
                  <option>Khu vực Động lực Phía Nam (Phường Cam Ranh, Cam Linh, Ba Ngòi & Xã Cam Lâm)</option>
                  <option>Đặc khu Biển đảo (Đặc khu Trường Sa)</option>
                </select>
              </div>

              <div>
                <label style="font-size: 11.5px; font-weight: 600; color: #475569; display: block; margin-bottom: 4px;">Tần suất cập nhật luồng dữ liệu tự động:</label>
                <select class="form-control" style="width: 100%;">
                  <option selected>15 giây (Khuyến nghị cho Giám đốc Sở)</option>
                  <option>30 giây</option>
                  <option>60 giây</option>
                  <option>Cập nhật thủ công (Tiết kiệm băng thông)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  // -------------------------------------------------------------
  // 22. CÀI ĐẶT THÔNG BÁO & CẢNH BÁO ĐIỀU HÀNH
  // -------------------------------------------------------------
  renderExecutiveNotifications(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header" style="flex-wrap: wrap; gap: 12px;">
          <div>
            <h3 class="card-title"><i data-lucide="bell" style="color: #0284c7;"></i> Cài Đặt Thông Báo & Ngưỡng Cảnh Báo Điều Hành</h3>
            <p class="card-subtitle">Thiết lập quy tắc nhận cảnh báo khẩn cấp, ngưỡng rủi ro tài chính và kênh nhận thông báo tới Lãnh đạo Sở</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="App.showNotification('Đã lưu thành công quy tắc thông báo điều hành!', 'success')">
            <i data-lucide="save"></i> Lưu thiết lập thông báo
          </button>
        </div>

        <div class="responsive-split-grid">
          <!-- 1. CẤU HÌNH NGƯỠNG CẢNH BÁO -->
          <div>
            <h4 style="font-size: 13.5px; font-weight: 700; color: var(--c-oceanic-azure); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="alert-octagon"></i> 1. Cấu hình Ngưỡng Kích hoạt Cảnh báo Tự động
            </h4>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3.5px solid #dc2626; border-radius: 8px; padding: 12px 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span style="font-weight: 700; font-size: 12.5px; color: #0f172a;">🔴 Cảnh báo Hụt thu Ngân sách Nhà nước</span>
                  <input type="checkbox" checked style="width: 16px; height: 16px; accent-color: #002B8C; cursor: pointer;" />
                </div>
                <div style="font-size: 11.5px; color: #475569;">Kích hoạt khi một địa bàn hoặc sắc thuế hụt thu trên <strong>10%</strong> so với tiến độ tháng.</div>
              </div>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3.5px solid #dc2626; border-radius: 8px; padding: 12px 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span style="font-weight: 700; font-size: 12.5px; color: #0f172a;">🔴 Cảnh báo Dự án Đầu tư công Nghẽn Dòng tiền</span>
                  <input type="checkbox" checked style="width: 16px; height: 16px; accent-color: #002B8C; cursor: pointer;" />
                </div>
                <div style="font-size: 11.5px; color: #475569;">Kích hoạt khi dự án trọng điểm không giải ngân quá <strong>30 ngày</strong> hoặc chậm tiến độ hợp đồng <strong>60 ngày</strong>.</div>
              </div>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3.5px solid #d97706; border-radius: 8px; padding: 12px 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span style="font-weight: 700; font-size: 12.5px; color: #0f172a;">🟡 Cảnh báo Doanh nghiệp Lớn Nợ Thuế & Rủi ro Tài chính</span>
                  <input type="checkbox" checked style="width: 16px; height: 16px; accent-color: #002B8C; cursor: pointer;" />
                </div>
                <div style="font-size: 11.5px; color: #475569;">Kích hoạt khi doanh nghiệp Top 50 nợ thuế quá hạn <strong>45 ngày</strong> với số tiền phát sinh trên <strong>5 tỷ VNĐ</strong>.</div>
              </div>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3.5px solid #d97706; border-radius: 8px; padding: 12px 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span style="font-weight: 700; font-size: 12.5px; color: #0f172a;">🟡 Nhắc nhở Phê duyệt Phương án Nhà đất công (Nghị định 167)</span>
                  <input type="checkbox" checked style="width: 16px; height: 16px; accent-color: #002B8C; cursor: pointer;" />
                </div>
                <div style="font-size: 11.5px; color: #475569;">Nhắc nhở trước <strong>15 ngày</strong> đối với các cơ sở nhà đất công dôi dư cần trình UBND tỉnh phương án xử lý.</div>
              </div>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3.5px solid #16a34a; border-radius: 8px; padding: 12px 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span style="font-weight: 700; font-size: 12.5px; color: #0f172a;">🟢 Văn bản chỉ đạo & công văn hỏa tốc từ Bộ Tài chính / UBND tỉnh</span>
                  <input type="checkbox" checked style="width: 16px; height: 16px; accent-color: #002B8C; cursor: pointer;" />
                </div>
                <div style="font-size: 11.5px; color: #475569;">Thông báo tức thời khi có văn bản giao nhiệm vụ khẩn hoặc điều chỉnh chính sách vĩ mô.</div>
              </div>
            </div>
          </div>

          <!-- 2. KÊNH TIẾP NHẬN & THỜI GIAN GỬI -->
          <div>
            <h4 style="font-size: 13.5px; font-weight: 700; color: var(--c-oceanic-azure); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="send"></i> 2. Kênh Tiếp Nhận Thông Báo
            </h4>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
              <label style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; cursor: pointer;">
                <span><i data-lucide="monitor" style="width: 14px; height: 14px; display: inline-block; vertical-align: -2px; color: #0284c7;"></i> <strong>Thông báo đẩy trên Web Application</strong></span>
                <input type="checkbox" checked style="accent-color: #002B8C;" />
              </label>
              <label style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; cursor: pointer;">
                <span><i data-lucide="smartphone" style="width: 14px; height: 14px; display: inline-block; vertical-align: -2px; color: #16a34a;"></i> <strong>Tin nhắn SMS Khẩn cấp (0913.xxx.xxx)</strong></span>
                <input type="checkbox" checked style="accent-color: #002B8C;" />
              </label>
              <label style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; cursor: pointer;">
                <span><i data-lucide="mail" style="width: 14px; height: 14px; display: inline-block; vertical-align: -2px; color: #7c3aed;"></i> <strong>Email công vụ (gds@sotaichinh.khanhhoa.gov.vn)</strong></span>
                <input type="checkbox" checked style="accent-color: #002B8C;" />
              </label>
              <label style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; cursor: pointer;">
                <span><i data-lucide="message-square" style="width: 14px; height: 14px; display: inline-block; vertical-align: -2px; color: #0284c7;"></i> <strong>Zalo OA Điều hành Sở Tài chính</strong></span>
                <input type="checkbox" checked style="accent-color: #002B8C;" />
              </label>
            </div>

            <h4 style="font-size: 13.5px; font-weight: 700; color: var(--c-oceanic-azure); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="clock"></i> 3. Khung Giờ Tiếp Nhận
            </h4>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="radio" name="timingOpt" checked style="accent-color: #002B8C;" />
                <span><strong>Chế độ Điều hành 24/7</strong> (Khẩn cấp nhận ngay bất kể thời gian, định kỳ gửi 07:30 sáng)</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="radio" name="timingOpt" style="accent-color: #002B8C;" />
                <span><strong>Chỉ trong giờ hành chính</strong> (07:30 - 11:30 và 13:30 - 17:30)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  // -------------------------------------------------------------
  // 22. SIDEBAR FOOTER - SESSION & SECURITY WIDGET
  // -------------------------------------------------------------
  renderSidebarFooter(config) {
    const footerContainer = document.getElementById('sidebarFooterContainer') || document.querySelector('.sidebar-footer');
    if (!footerContainer) return;

    const isExternal = config.id === 'portal' || config.id.startsWith('portal_');
    const firstLetter = (config.name && config.name.length > 0) ? config.name.split(' ').pop().charAt(0) : 'U';

    footerContainer.innerHTML = `
      <div class="session-footer-card">
        <div class="session-security-row">
          <span class="session-security-badge">
            <span class="pulse-dot"></span> Phiên an toàn
          </span>
          <span style="font-size: 10.5px; color: #64748b; font-family: monospace;">SSL 256-bit</span>
        </div>
        <div class="session-account-row">
          <div class="session-avatar">${firstLetter}</div>
          <div class="session-account-info">
            <div class="session-account-name" title="${config.name}">${config.name}</div>
            <div class="session-account-dept" title="${config.title || config.deptName}">${config.title || config.deptName}</div>
          </div>
        </div>
        <button class="session-action-btn" onclick="DeptWorkspaceManager.showSessionInfoModal('${config.id}')">
          <i data-lucide="shield" style="width: 12px; height: 12px;"></i>
          <span>Chi tiết phiên & Phân quyền</span>
        </button>
      </div>
    `;

    if (window.lucide) {
      lucide.createIcons();
    }
  },

  showSessionInfoModal(deptId) {
    const config = DEPT_CONFIGS[deptId] || DEPT_CONFIGS[this.currentDeptId];
    if (!config) return;

    const isExternal = config.id === 'portal' || config.id.startsWith('portal_');
    const modalTitle = document.getElementById('modalGenericTitle');
    const modalBody = document.getElementById('modalGenericBody');

    if (modalTitle) {
      modalTitle.innerHTML = `<i data-lucide="shield-check" style="color: #002B8C; vertical-align: -3px;"></i> Thông tin Phiên làm việc & Phân quyền`;
    }

    if (modalBody) {
      modalBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="display: flex; align-items: center; gap: 14px; padding: 14px; background: #f0f7ff; border: 1px solid #bfdbfe; border-radius: 8px;">
            <div class="session-avatar" style="width: 44px; height: 44px; font-size: 18px;">
              ${config.name.split(' ').pop().charAt(0)}
            </div>
            <div>
              <div style="font-size: 15px; font-weight: 700; color: #002B8C;">${config.name}</div>
              <div style="font-size: 13px; color: #475569;">${config.title || config.deptName}</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Cơ quan / Đơn vị: <strong>${config.deptName}</strong></div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
            <div style="padding: 10px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">
              <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Mã tài khoản</div>
              <div style="font-size: 13px; font-weight: 700; color: #0f172a; font-family: monospace; margin-top: 3px;">${config.id}</div>
            </div>
            <div style="padding: 10px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">
              <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Vai trò hệ thống (RBAC)</div>
              <div style="font-size: 13px; font-weight: 700; color: #002B8C; margin-top: 3px;">${isExternal ? 'CỔNG KÊ KHAI NGOÀI' : (config.role === 'DIRECTOR' ? 'LÃNH ĐẠO PHÊ DUYỆT' : 'CHUYÊN VIÊN NGHIỆP VỤ')}</div>
            </div>
            <div style="padding: 10px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">
              <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Giao thức xác thực</div>
              <div style="font-size: 13px; font-weight: 600; color: #16a34a; margin-top: 3px;">${isExternal ? 'OAuth 2.0 / SSO Doanh nghiệp' : 'LGSP 2.0 / PKI Token'}</div>
            </div>
            <div style="padding: 10px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">
              <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Trạng thái phiên</div>
              <div style="font-size: 13px; font-weight: 600; color: #16a34a; margin-top: 3px; display: flex; align-items: center; gap: 6px;">
                <span class="pulse-dot"></span> Đang hoạt động (Trực tuyến)
              </div>
            </div>
          </div>

          <div style="padding: 12px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">
            <div style="font-size: 12px; font-weight: 600; color: #0f172a; margin-bottom: 6px;">Phạm vi quyền hạn dữ liệu:</div>
            <ul style="padding-left: 18px; font-size: 12.5px; color: #334155; line-height: 1.6;">
              ${isExternal ? `
                <li>Kê khai số liệu báo cáo định kỳ theo mẫu biểu của Sở Tài chính.</li>
                <li>Tra cứu lịch sử nộp hồ sơ và kết quả thẩm tra.</li>
                <li>Gửi văn bản kiến nghị, đề xuất hỗ trợ.</li>
              ` : (config.role === 'DIRECTOR' ? `
                <li>Toàn quyền xem dữ liệu kinh tế - tài chính tổng thể tỉnh Khánh Hòa.</li>
                <li>Phê duyệt hồ sơ báo cáo, chủ trương đầu tư, phương án tự chủ HCSN.</li>
                <li>Chỉ đạo điều hành trực tiếp đến từng phòng ban nghiệp vụ.</li>
              ` : `
                <li>Thẩm tra hồ sơ báo cáo thuộc lĩnh vực: <strong>${config.domainName}</strong>.</li>
                <li>Lập hồ sơ nghiệp vụ và trình Lãnh đạo Sở phê duyệt.</li>
                <li>Khai thác và cập nhật cơ sở dữ liệu chuyên ngành.</li>
              `)}
            </ul>
          </div>
        </div>
      `;
    }

    App.openModal('modalGeneric');
  }
};
