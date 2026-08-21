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
    this.loadWorkspace(this.currentDeptId);
  },

  setupUserSwitcher() {
    const select = document.getElementById('selectAppUserAccount');
    if (!select) return;

    select.addEventListener('change', (e) => {
      this.switchUser(e.target.value);
    });
  },

  switchUser(deptId) {
    this.currentDeptId = deptId;
    this.currentTab = 'dashboard';
    const config = DEPT_CONFIGS[deptId];
    if (!config) return;

    // 1. Cập nhật thông tin Người dùng trên Topbar
    document.getElementById('userNameDisplay').innerText = config.name;
    document.getElementById('userDeptDisplay').innerText = config.title || config.deptName;
    document.getElementById('userAvatarDisplay').innerText = config.name.split(' ').pop().charAt(0);
    
    // 2. Render lại toàn bộ Sidebar theo nghiệp vụ chuyên biệt của phòng / Cổng
    this.renderDepartmentSidebar(config);

    // 3. Load nội dung màn hình làm việc của phòng / Cổng
    this.loadWorkspace(deptId);

    App.showNotification(`Đã chuyển sang: ${config.domainName}`, 'info');
  },

  renderDepartmentSidebar(config) {
    const navContainer = document.getElementById('dynamicSidebarNav');
    if (!navContainer) return;

    let navHtml = '';

    if (config.id === 'portal') {
      navHtml = `
        <div class="nav-section-title">Cổng kê khai báo cáo</div>
        <a class="nav-item active" onclick="ExternalPortalManager.switchPortalTab('tasks', this)">
          <i data-lucide="clipboard-list"></i>
          <span>Nhiệm vụ báo cáo được giao</span>
        </a>
        <a class="nav-item" onclick="ExternalPortalManager.switchPortalTab('fill_form', this)">
          <i data-lucide="edit-3"></i>
          <span>Kê khai và nộp báo cáo trực tuyến</span>
        </a>
        <a class="nav-item" onclick="ExternalPortalManager.switchPortalTab('history', this)">
          <i data-lucide="history"></i>
          <span>Lịch sử nộp và ý kiến đánh giá</span>
        </a>
        <a class="nav-item" onclick="ExternalPortalManager.switchPortalTab('guidance', this)">
          <i data-lucide="book-open"></i>
          <span>Văn bản quy định và biểu mẫu</span>
        </a>
        <div class="nav-section-title">Chuyển sang nội bộ Sở Tài chính</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchUser('lanhdao')">
          <i data-lucide="arrow-left-circle"></i>
          <span>Về phân hệ điều hành Sở Tài chính</span>
        </a>
      `;
    } else if (config.id === 'lanhdao') {
      navHtml = `
        <div class="nav-section-title">Điều hành kinh tế tổng thể</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="layout-dashboard"></i>
          <span>Tổng quan chỉ đạo điều hành tỉnh</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('realtime_monitor', this)">
          <i data-lucide="activity"></i>
          <span>Luồng dữ liệu thời gian thực toàn tỉnh</span>
          <span class="badge badge-success">Trực tuyến</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('advanced_bi', this)">
          <i data-lucide="sparkles"></i>
          <span>Trực quan hóa và phân tích đa chiều</span>
          <span class="badge badge-purple">Mới</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Báo cáo chỉ đạo điều hành và Bộ Tài chính</span>
          <span class="badge badge-info">34 đơn vị</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchUser('portal')">
          <i data-lucide="globe"></i>
          <span>Cổng báo cáo cơ quan, doanh nghiệp</span>
          <span class="badge badge-success">Cổng ngoài</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('early_warnings', this)">
          <i data-lucide="alert-triangle"></i>
          <span>Trung tâm cảnh báo sớm rủi ro</span>
          <span class="badge badge-danger">4 cảnh báo</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('approvals', this)">
          <i data-lucide="check-square"></i>
          <span>Phê duyệt báo cáo số liệu liên ngành</span>
          <span class="badge badge-warning">6 chờ duyệt</span>
        </a>
        <div class="nav-section-title">Tra cứu và dữ liệu</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('global_search', this)">
          <i data-lucide="search"></i>
          <span>Tìm kiếm toàn văn kho dữ liệu</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('api_monitor', this)">
          <i data-lucide="network"></i>
          <span>Trục tích hợp API Bộ Tài chính</span>
        </a>
      `;
    } else if (config.id === 'ktns') {
      navHtml = `
        <div class="nav-section-title">Lĩnh vực kinh tế và ngân sách</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="pie-chart"></i>
          <span>Tổng quan thu - chi ngân sách nhà nước</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('realtime_monitor', this)">
          <i data-lucide="activity"></i>
          <span>Dòng tiền thu ngân sách thời gian thực</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('tax_payers', this)">
          <i data-lucide="award"></i>
          <span>Doanh nghiệp nguồn thu lớn</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Điều phối báo cáo theo Quyết định số 2071</span>
          <span class="badge badge-info">34 đơn vị</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('advanced_bi', this)">
          <i data-lucide="grid"></i>
          <span>Cân đối dòng tiền ngân sách</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_entry', this)">
          <i data-lucide="clipboard-edit"></i>
          <span>Giao và điều chỉnh dự toán ngân sách</span>
        </a>
        <div class="nav-section-title">Hồ sơ lưu trữ lĩnh vực</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('dept_archive', this)">
          <i data-lucide="archive"></i>
          <span>Kho tài liệu số hóa Kinh tế và ngân sách</span>
        </a>
      `;
    } else if (config.id === 'dtc') {
      navHtml = `
        <div class="nav-section-title">Lĩnh vực quản lý đầu tư công</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="hard-hat"></i>
          <span>Tổng quan kế hoạch và giải ngân vốn đầu tư công</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('realtime_monitor', this)">
          <i data-lucide="activity"></i>
          <span>Tiến độ giải ngân Kho bạc Nhà nước thời gian thực</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('advanced_bi', this)">
          <i data-lucide="trending-up"></i>
          <span>Đồ thị tiến độ và bản đồ không gian dự án</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Báo cáo giải ngân vốn đầu tư công</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('early_warnings', this)">
          <i data-lucide="alert-triangle"></i>
          <span>Cảnh báo dự án nghẽn dòng vốn</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_entry', this)">
          <i data-lucide="clipboard-edit"></i>
          <span>Thẩm tra quyết toán vốn đầu tư công</span>
        </a>
        <div class="nav-section-title">Hồ sơ lưu trữ lĩnh vực</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('dept_archive', this)">
          <i data-lucide="archive"></i>
          <span>Kho tài liệu số hóa Quản lý đầu tư công</span>
        </a>
      `;
    } else if (config.id === 'dtns') {
      navHtml = `
        <div class="nav-section-title">Lĩnh vực quản lý đầu tư ngoài ngân sách</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="building-2"></i>
          <span>Tổng quan dự án đầu tư ngoài ngân sách và FDI</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('projects_list', this)">
          <i data-lucide="file-badge-2"></i>
          <span>Danh mục dự án và chứng nhận đầu tư</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Báo cáo tài chính doanh nghiệp FDI</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('early_warnings', this)">
          <i data-lucide="alert-triangle"></i>
          <span>Cảnh báo chậm tiến độ cam kết</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_entry', this)">
          <i data-lucide="clipboard-edit"></i>
          <span>Giám sát chủ trương và ký quỹ đầu tư</span>
        </a>
        <div class="nav-section-title">Hồ sơ lưu trữ lĩnh vực</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('dept_archive', this)">
          <i data-lucide="archive"></i>
          <span>Kho tài liệu số hóa Quản lý đầu tư ngoài ngân sách</span>
        </a>
      `;
    } else if (config.id === 'doanhnghiep') {
      navHtml = `
        <div class="nav-section-title">Lĩnh vực quản lý doanh nghiệp</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="briefcase"></i>
          <span>Tổng quan phát triển doanh nghiệp và hợp tác xã</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('realtime_monitor', this)">
          <i data-lucide="activity"></i>
          <span>Đăng ký kinh doanh mới thời gian thực</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('advanced_bi', this)">
          <i data-lucide="bubbles"></i>
          <span>Ma trận định vị rủi ro tài chính doanh nghiệp</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Báo cáo tình hình doanh nghiệp và hợp tác xã</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('early_warnings', this)">
          <i data-lucide="alert-triangle"></i>
          <span>Cảnh báo nợ thuế và tiền sử dụng đất</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_entry', this)">
          <i data-lucide="clipboard-edit"></i>
          <span>Giám sát doanh nghiệp có vốn nhà nước</span>
        </a>
        <div class="nav-section-title">Hồ sơ lưu trữ lĩnh vực</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('dept_archive', this)">
          <i data-lucide="archive"></i>
          <span>Kho tài liệu số hóa Quản lý doanh nghiệp</span>
        </a>
      `;
    } else if (config.id === 'giacongsan') {
      navHtml = `
        <div class="nav-section-title">Lĩnh vực quản lý giá và công sản</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="home"></i>
          <span>Tổng quan tài sản công và giá thị trường</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('public_properties', this)">
          <i data-lucide="building"></i>
          <span>Sắp xếp, xử lý cơ sở nhà đất công</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Báo cáo tài sản công gửi Bộ Tài chính</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('early_warnings', this)">
          <i data-lucide="alert-triangle"></i>
          <span>Cảnh báo quá hạn phê duyệt phương án</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_entry', this)">
          <i data-lucide="clipboard-edit"></i>
          <span>Kê khai giá và sắp xếp nhà đất công</span>
        </a>
        <div class="nav-section-title">Hồ sơ lưu trữ lĩnh vực</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('dept_archive', this)">
          <i data-lucide="archive"></i>
          <span>Kho tài liệu số hóa Quản lý giá và công sản</span>
        </a>
      `;
    } else if (config.id === 'hcsn') {
      navHtml = `
        <div class="nav-section-title">Lĩnh vực tài chính hành chính sự nghiệp</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="graduation-cap"></i>
          <span>Tổng quan tự chủ tài chính đơn vị sự nghiệp</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('units_autonomy', this)">
          <i data-lucide="users"></i>
          <span>Danh sách đơn vị sự nghiệp công lập</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('reporting_system', this)">
          <i data-lucide="calendar-check-2"></i>
          <span>Báo cáo tự chủ tài chính và chi thường xuyên</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_entry', this)">
          <i data-lucide="clipboard-edit"></i>
          <span>Thẩm tra phương án tự chủ tài chính</span>
        </a>
        <div class="nav-section-title">Hồ sơ lưu trữ lĩnh vực</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('dept_archive', this)">
          <i data-lucide="archive"></i>
          <span>Kho tài liệu số hóa Tài chính hành chính sự nghiệp</span>
        </a>
      `;
    } else if (config.id === 'phapche') {
      navHtml = `
        <div class="nav-section-title">Lĩnh vực pháp chế và giám định tư pháp</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="scale"></i>
          <span>Tổng quan pháp lý và giám định tư pháp</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('legal_cases', this)">
          <i data-lucide="folder-check"></i>
          <span>Giám định tư pháp tài chính - kế toán</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('vphc_compliance', this)">
          <i data-lucide="gavel"></i>
          <span>Thi hành xử phạt vi phạm hành chính tài chính</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('legal_docs', this)">
          <i data-lucide="file-text"></i>
          <span>Văn bản QPPL và chính sách đặc thù</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_entry', this)">
          <i data-lucide="clipboard-edit"></i>
          <span>Thẩm định dự thảo và hồ sơ pháp chế</span>
        </a>
        <div class="nav-section-title">Hồ sơ lưu trữ lĩnh vực</div>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('dept_archive', this)">
          <i data-lucide="archive"></i>
          <span>Kho tài liệu số hóa Pháp chế</span>
        </a>
      `;
    } else if (config.id === 'admin') {
      navHtml = `
        <div class="nav-section-title">Quản trị hệ thống và tích hợp dữ liệu</div>
        <a class="nav-item active" onclick="DeptWorkspaceManager.switchTab('dashboard', this)">
          <i data-lucide="layout-dashboard"></i>
          <span>Tổng quan trục tích hợp và hạ tầng dữ liệu</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('realtime_monitor', this)">
          <i data-lucide="activity"></i>
          <span>Giám sát luồng thời gian thực</span>
          <span class="badge badge-success">Trực tuyến</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('api_gateway', this)">
          <i data-lucide="network"></i>
          <span>Trục tích hợp API Bộ Tài chính</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('daas_portal', this)">
          <i data-lucide="share-2"></i>
          <span>Cổng chia sẻ dữ liệu (DaaS)</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('master_data', this)">
          <i data-lucide="layers"></i>
          <span>Quản trị 24 bảng dữ liệu chủ</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_integrity', this)">
          <i data-lucide="git-merge"></i>
          <span>Kiểm tra toàn vẹn và liên thông dữ liệu</span>
          <span class="badge badge-success">100%</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('data_catalog', this)">
          <i data-lucide="book-open"></i>
          <span>Từ điển siêu dữ liệu và bảo vệ dữ liệu cá nhân</span>
        </a>
        <a class="nav-item" onclick="DeptWorkspaceManager.switchTab('audit_logs', this)">
          <i data-lucide="history"></i>
          <span>Nhật ký thao tác và an toàn hệ thống</span>
        </a>
      `;
    }

    navContainer.innerHTML = navHtml;
    if (window.lucide) window.lucide.createIcons();
  },

  switchTab(tabId, navItem) {
    this.currentTab = tabId;
    document.querySelectorAll('#dynamicSidebarNav .nav-item').forEach(item => item.classList.remove('active'));
    if (navItem) navItem.classList.add('active');
    this.loadWorkspace(this.currentDeptId);
  },

  loadWorkspace(deptId) {
    const container = document.getElementById('departmentWorkspaceContainer');
    if (!container) return;

    // 0. Cổng Báo Cáo Doanh Nghiệp & Cơ Quan Nhà Nước
    if (deptId === 'portal') {
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

    // 2. Phân Hệ Quản Lý Báo Cáo Định Kỳ (Bộ Tài Chính & Tỉnh)
    if (this.currentTab === 'reporting_system') {
      container.innerHTML = `
        <div class="card" style="margin-bottom: 20px;">
          <div class="tabs-nav" id="surveyTabNav">
            <button class="tab-btn active" id="tabBtnCampaigns" onclick="StateReportingManager.switchViewTab('campaigns', this)">
              <i data-lucide="calendar-check-2"></i> Danh mục kỳ báo cáo (Bộ Tài chính & Tỉnh)
            </button>
            <button class="tab-btn" id="tabBtnTracking" onclick="StateReportingManager.switchViewTab('tracking', this)">
              <i data-lucide="list-checks"></i> Theo dõi tiến độ nộp & đôn đốc
            </button>
            <button class="tab-btn" id="tabBtnApproval" onclick="StateReportingManager.switchViewTab('approval', this)">
              <i data-lucide="check-circle-2"></i> Thẩm tra & duyệt số liệu báo cáo
            </button>
          </div>
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
      container.innerHTML = `
        <div class="card" style="margin-bottom: 20px;">
          <div class="tabs-nav" id="entryDeptTabs">
            <button class="tab-btn ${activeDept === 'dept-ktns' ? 'active' : ''}" onclick="DataEntryManager.switchDeptTab('dept-ktns', this)">
              <i data-lucide="pie-chart"></i> Dự toán ngân sách nhà nước
            </button>
            <button class="tab-btn ${activeDept === 'dept-dtc' ? 'active' : ''}" onclick="DataEntryManager.switchDeptTab('dept-dtc', this)">
              <i data-lucide="hard-hat"></i> Quyết toán vốn đầu tư công
            </button>
            <button class="tab-btn ${activeDept === 'dept-dtns' ? 'active' : ''}" onclick="DataEntryManager.switchDeptTab('dept-dtns', this)">
              <i data-lucide="building-2"></i> Ký quỹ dự án ngoài ngân sách
            </button>
            <button class="tab-btn ${activeDept === 'dept-giacongsan' ? 'active' : ''}" onclick="DataEntryManager.switchDeptTab('dept-giacongsan', this)">
              <i data-lucide="home"></i> Sắp xếp nhà đất và kê khai giá
            </button>
            <button class="tab-btn ${activeDept === 'dept-hcsn' ? 'active' : ''}" onclick="DataEntryManager.switchDeptTab('dept-hcsn', this)">
              <i data-lucide="graduation-cap"></i> Phương án tự chủ tài chính
            </button>
            <button class="tab-btn ${activeDept === 'dept-doanhnghiep' ? 'active' : ''}" onclick="DataEntryManager.switchDeptTab('dept-doanhnghiep', this)">
              <i data-lucide="briefcase"></i> Giám sát doanh nghiệp có vốn nhà nước
            </button>
            <button class="tab-btn ${activeDept === 'dept-phapche' ? 'active' : ''}" onclick="DataEntryManager.switchDeptTab('dept-phapche', this)">
              <i data-lucide="scale"></i> Thẩm định dự thảo và giám định tư pháp
            </button>
          </div>
        </div>

        <div class="card" id="dynamicDeptFormContainer" style="margin-bottom: 20px;"></div>

        <!-- Pending Submissions Approval Table -->
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="inbox"></i> Danh sách hồ sơ nghiệp vụ chờ lãnh đạo Sở Tài chính phê duyệt</h3>
              <p class="card-subtitle">Quy trình thẩm tra 2 bước: Chuyên viên lập hồ sơ -> Lãnh đạo Sở Tài chính phê duyệt nạp vào CSDL</p>
            </div>
            <span class="badge badge-warning">Quy trình 2 bước</span>
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
      DataEntryManager.renderDeptForm(activeDept);
      DataEntryManager.renderPendingTable();
      return;
    }

    // 9. Kho Lưu Trữ Số Hóa
    if (this.currentTab === 'dept_archive' || this.currentTab === 'archive_viewer') {
      container.innerHTML = `<div id="archiveMainContainer"></div>`;
      ArchiveViewerManager.init('archiveMainContainer');
      return;
    }

    // 10. Trục API Bộ Tài Chính
    if (this.currentTab === 'api_gateway') {
      container.innerHTML = `<div class="card" id="apiGatewayCard"></div>`;
      ApiGatewayManager.renderApiGateway('apiGatewayCard');
      return;
    }

    // 11. Quản Trị Dữ Liệu Chủ (Master Data)
    if (this.currentTab === 'master_data') {
      container.innerHTML = `<div class="card" id="mdmMainCard"></div>`;
      MdmManager.renderMasterDataManagement('mdmMainCard');
      return;
    }

    // 12. Từ Điển Dữ Liệu & DDM
    if (this.currentTab === 'data_catalog') {
      container.innerHTML = `<div class="card" id="catalogMainCard"></div>`;
      MdmManager.renderDataCatalog('catalogMainCard');
      return;
    }

    // 13. Màn hình phụ: Doanh Nghiệp Nguồn Thu Lớn (tax_payers)
    if (this.currentTab === 'tax_payers') {
      container.innerHTML = this.renderTaxPayersView();
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // 14. Màn hình phụ: Danh Mục Dự Án Ngoài Ngân Sách & IRC (projects_list)
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

    // 17. Màn hình phụ: Giám Định Tư Pháp Tài Chính (legal_cases)
    if (this.currentTab === 'legal_cases') {
      container.innerHTML = this.renderLegalCasesView();
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
          <div>
            <div class="banner-title">
              <h2>${config.domainName}</h2>
              <span class="badge ${config.badgeClass}">${config.title}</span>
            </div>
            <p class="banner-subtitle">
              Cơ sở Dữ liệu Kinh tế tỉnh Khánh Hòa • Phụ trách: <strong style="color: #0f172a;">${config.name}</strong> • Khối lượng số hóa: <span style="color: #1d4ed8; font-weight: 600;">${config.archiveVolume || 'Toàn tỉnh'}</span>
            </p>
          </div>
        </div>
        <div>
          <span class="badge badge-success">
            <span class="pulse-dot"></span> Đồng Bộ Trực Tuyến 24/7
          </span>
        </div>
      </div>
    `;

    // Render Stats Grid of this department
    contentHtml += `
      <div class="kpi-grid">
        ${config.stats.map(s => `
          <div class="kpi-card ${s.color}">
            <div class="kpi-header">
              <span class="kpi-title">${s.label}</span>
              <div class="kpi-icon"><i data-lucide="${s.icon}"></i></div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${s.value}</span>
              <span class="kpi-unit">${s.unit}</span>
            </div>
            <div class="kpi-trend trend-up">
              <i data-lucide="check-circle-2"></i> ${s.trend}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Render Specific Content based on Department and Current Tab
    if (deptId === 'lanhdao') {
      contentHtml += this.renderLanhDaoContent();
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

    // Trigger charts if applicable
    if (this.currentTab === 'dashboard') {
      setTimeout(() => {
        if (deptId === 'lanhdao') ChartsManager.initAll();
        if (deptId === 'ktns') ChartsManager.renderRevenueChart();
        if (deptId === 'dtc') ChartsManager.renderInvestmentChart();
        if (deptId === 'doanhnghiep') ChartsManager.renderRiskScatterPlot();
      }, 100);
    }
  },

  // 1. Màn hình Điều Hành Kinh Tế Tổng Thể (Ban Giám Đốc Sở)
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
              <h3 class="card-title"><i data-lucide="map-pin"></i> Bản đồ kinh tế không gian tỉnh Khánh Hòa</h3>
              <span class="badge badge-info">Địa bàn các xã, phường, đặc khu</span>
            </div>
            <div id="khanhHoaMapFrame" class="khanhhoa-map-container"></div>
          </div>
        </div>
        <div class="col-6">
          <div class="card" style="height: 100%;">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="bar-chart-3"></i> Cơ cấu thu ngân sách theo sắc thuế</h3>
              <span class="badge badge-success">Đạt 102.3% dự toán</span>
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
            </div>
            <div id="sankeyFlowContainer"></div>
          </div>
        </div>
        <div class="col-5">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="line-chart"></i> Giải ngân vốn đầu tư công toàn tỉnh</h3>
            </div>
            <div class="chart-wrapper"><canvas id="chartInvestmentProgress"></canvas></div>
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

  // 3. Màn hình Điều Hành Lĩnh Vực Đầu Tư Công
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

  // 4. Màn hình Điều Hành Lĩnh Vực ĐT Ngoài Ngân Sách & FDI
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

  // 8. Màn hình Điều Hành Lĩnh Vực Pháp Chế, Giám Định Tư Pháp & Thẩm Định Chính Sách
  renderPhapCheContent() {
    const config = DEPT_CONFIGS['phapche'];
    return `
      <!-- Row 1: Giám Định Tư Pháp & Thi Hành Xử Phạt VPHC -->
      <div class="dashboard-row">
        <!-- Vụ việc Giám định tư pháp -->
        <div class="col-7">
          <div class="card" style="height: 100%;">
            <div class="card-header">
              <div>
                <h3 class="card-title"><i data-lucide="scale"></i> Giám định tư pháp về tài chính - kế toán</h3>
                <p class="card-subtitle">Theo dõi tiến độ thực hiện giám định tư pháp các vụ án kinh tế, tài chính, đấu thầu</p>
              </div>
              <span class="badge badge-purple">18 Vụ Việc</span>
            </div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Mã vụ việc</th>
                    <th>Nội dung trưng cầu giám định</th>
                    <th>Cơ quan trưng cầu</th>
                    <th>Hạn hoàn thành</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  ${config.legalCases.map(c => `
                    <tr>
                      <td><strong style="color: #0284c7;">${c.id}</strong></td>
                      <td>
                        <strong>${c.caseName}</strong>
                        <div style="font-size: 11px; color: #475569; margin-top: 2px;">Giám định viên: ${c.expert}</div>
                      </td>
                      <td>${c.agency}</td>
                      <td>${c.deadline}</td>
                      <td>
                        <span class="badge ${c.status.includes('Đã') ? 'badge-success' : 'badge-warning'}">${c.status}</span>
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
                <h3 class="card-title"><i data-lucide="gavel"></i> Giám sát thi hành xử phạt vi phạm hành chính</h3>
                <p class="card-subtitle">Theo dõi việc chấp hành QĐ xử phạt VPHC nộp tiền vào Kho bạc</p>
              </div>
              <span class="badge badge-emerald">2.180 / 2.450 Triệu (89%)</span>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 6px;">
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

              <div class="realtime-event-card border-cyan">
                <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: #475569; margin-bottom: 4px; font-weight: 600;">
                  <span>QĐ 65/QĐ-XPHC (Vi phạm định mức tài sản công)</span>
                  <span class="badge badge-success">Đã nộp KBNN</span>
                </div>
                <div style="font-weight: 700; color: #0f172a; font-size: 13.5px;">Trung Tâm Dịch Vụ Môi Trường Đô Thị</div>
                <div style="font-size: 12px; color: #0284c7; margin-top: 3px; font-weight: 600;">Số tiền nộp phạt: 80.000.000 VND</div>
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

  // 9. Màn hình Điều Hành Trung Tâm Dữ Liệu Data Hub
  renderAdminContent() {
    return `
      <div class="dashboard-row">
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="network"></i> Trục tích hợp API Bộ Tài chính</h3>
              <button class="btn btn-primary btn-sm" onclick="ApiGatewayManager.syncAll()"><i data-lucide="refresh-cw"></i> Đồng bộ tất cả</button>
            </div>
            <div class="api-service-grid" id="apiServiceCardsGrid" style="grid-template-columns: 1fr;"></div>
          </div>
        </div>

        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="layers"></i> Quản trị 24 bảng dữ liệu chủ</h3>
              <span class="badge badge-info">DDM Masked Active</span>
            </div>
            <div class="table-container" id="mdmTableContainer"></div>
          </div>
        </div>
      </div>
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
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; font-size: 11.5px; display: flex; flex-direction: column; gap: 4px;">
                <div><span style="color: #64748b;">Số QĐ/VB:</span> <strong style="color: #0f172a;">${doc.regNumber}</strong> (${doc.issueDate})</div>
                <div><span style="color: #64748b;">Vị trí lưu kho:</span> ${doc.shelfLocation} - ${doc.boxNumber}</div>
                <div><span style="color: #64748b;">Liên kết CSDL:</span> <strong style="color: #15803d;">${doc.mappedRecord}</strong></div>
              </div>
              <div style="display: flex; gap: 8px; margin-top: 6px;">
                <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="ArchiveManager.viewHistoricalDoc('${doc.docId}')">
                  <i data-lucide="eye"></i> Xem PDF gốc (Watermark)
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

  // 14. Màn hình phụ: Danh Mục Dự Án Ngoài Ngân Sách & IRC (projects_list)
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

  // 17. Màn hình phụ: Giám Định Tư Pháp Tài Chính (legal_cases)
  renderLegalCasesView() {
    const config = DEPT_CONFIGS['phapche'];
    return `
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="folder-check"></i> Quản lý vụ việc giám định tư pháp về tài chính - kế toán</h3>
            <p class="card-subtitle">Theo dõi trưng cầu giám định tư pháp các vụ án kinh tế của Cơ quan CSĐT Công an tỉnh, Viện Kiểm sát & Tòa án</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang mở danh sách Giám định viên tư pháp tài chính được Bộ Tư pháp & UBND tỉnh công nhận...', 'info')">
              <i data-lucide="users"></i> Danh sách giám định viên
            </button>
            <button class="btn btn-primary btn-sm" onclick="DeptWorkspaceManager.switchTab('data_entry', document.getElementById('tabBtnDataEntry'))">
              <i data-lucide="plus"></i> Tiếp nhận trưng cầu mới
            </button>
          </div>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Mã vụ việc</th>
                <th>Nội dung vụ án trưng cầu giám định</th>
                <th>Cơ quan trưng cầu</th>
                <th>Giám định viên phụ trách</th>
                <th>Hạn kết luận</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${config.legalCases.map(c => `
                <tr>
                  <td><strong style="color: #0284c7;">${c.id}</strong></td>
                  <td><strong>${c.caseName}</strong></td>
                  <td>${c.agency}</td>
                  <td>${c.expert}</td>
                  <td>${c.deadline}</td>
                  <td><span class="badge ${c.status.includes('Đã') ? 'badge-success' : 'badge-warning'}">${c.status}</span></td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Hồ sơ [${c.id}]: Đã tiếp nhận đầy đủ tài liệu sổ sách chứng từ kế toán và đang lập dự thảo kết luận giám định.', 'info')">
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
                <th>Lĩnh vực liên kết CSDL</th>
                <th>Tình trạng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style="color: #0284c7;">08/2026/NQ-HĐND</strong></td>
                <td>15/01/2026</td>
                <td>Quy định phân cấp nguồn thu, nhiệm vụ chi và tỷ lệ phân chia các khoản thu giữa các cấp ngân sách tỉnh Khánh Hòa</td>
                <td>HĐND Tỉnh</td>
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
                <td>UBND Tỉnh</td>
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
                <td>HĐND Tỉnh</td>
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
                <td>UBND Tỉnh</td>
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
  }
};
