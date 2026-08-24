/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * CỔNG THÔNG TIN PHỤC VỤ KÊ KHAI & NỘP BÁO CÁO DÀNH CHO CƠ QUAN NHÀ NƯỚC VÀ DOANH NGHIỆP
 * (Theo yêu cầu quy định của Bộ Tài chính và UBND tỉnh Khánh Hòa - Quyết định số 2071/QĐ-UBND & Kế hoạch 1489/KH-UBND)
 */

const ExternalPortalManager = {
  currentEntityId: 'UBND-NTR',
  currentTab: 'tasks',

  // Định nghĩa chuẩn 5 Bước Quy Trình Trạng Thái (Workflow Status)
  WORKFLOW_STEPS: [
    { step: 1, key: 'UNSUBMITTED', label: '1. Chưa nộp', icon: 'file-text', color: 'blue' },
    { step: 2, key: 'SUBMITTED_DRAFT', label: '2. Đã nộp dự thảo', icon: 'send', color: 'warning' },
    { step: 3, key: 'UNDER_REVIEW', label: '3. Phòng CM tiếp nhận', icon: 'eye', color: 'purple' },
    { step: 4, key: 'EXPLANATION_REQUIRED', label: '4. Yêu cầu giải trình/Bổ sung', icon: 'alert-triangle', color: 'danger' },
    { step: 5, key: 'APPROVED_FINAL', label: '5. Đã duyệt chốt số liệu', icon: 'check-circle-2', color: 'success' }
  ],

  // Danh mục 6 đơn vị và doanh nghiệp kê khai ngoài trên Cổng báo cáo
  reportingEntities: {
    // 1. Khối cơ quan nhà nước và UBND các xã, phường
    'UBND-NTR': {
      id: 'UBND-NTR',
      type: 'GOV_COMMUNE',
      name: 'Ủy ban nhân dân Phường Nha Trang',
      code: 'CQNN-79-NTR',
      leader: 'Trần Minh Hải (Chủ tịch UBND phường)',
      contactEmail: 'ubnd.nhatrang@khanhhoa.gov.vn',
      phone: '0258.3822105',
      badge: 'UBND cấp xã',
      assignedTasks: [
        {
          campaignId: 'REP-2071-Q3-2026',
          title: 'Báo cáo bộ chỉ số phục vụ chỉ đạo điều hành quý III/2026 (Quyết định số 2071/QĐ-UBND)',
          authority: 'UBND tỉnh Khánh Hòa',
          assignedDept: 'Phòng Kinh tế và Ngân sách',
          specialist: 'Lê Thị Thu Hằng',
          deadline: '2026-09-25',
          workflowStep: 5,
          timeline: {
            step1: '2026-08-01 (Giao nhiệm vụ)',
            step2: '2026-08-14 09:30 (Đã nộp dự thảo)',
            step3: '2026-08-15 14:20 (Phòng KTNS tiếp nhận)',
            step4: '--- (Không có sai sót)',
            step5: '2026-08-18 16:45 (Đã duyệt chốt số liệu)'
          },
          score: 98,
          feedback: 'Số liệu thu chi ngân sách và giải ngân khớp đúng 100% với Kho bạc Nhà nước. Đã chốt nạp CSDL điều hành tỉnh.'
        },
        {
          campaignId: 'REP-TSC-N167-2026',
          title: 'Báo cáo tổng hợp tình hình quản lý, sử dụng & sắp xếp cơ sở nhà đất công năm 2026',
          authority: 'Bộ Tài chính & UBND tỉnh',
          assignedDept: 'Phòng Quản lý Giá và Công sản',
          specialist: 'Đặng Quốc Hưng',
          deadline: '2026-08-15',
          workflowStep: 5,
          timeline: {
            step1: '2026-07-20 (Giao nhiệm vụ)',
            step2: '2026-08-10 10:15 (Đã nộp dự thảo)',
            step3: '2026-08-11 08:30 (Phòng GCS tiếp nhận)',
            step4: '---',
            step5: '2026-08-14 16:30 (Đã duyệt chốt số liệu)'
          },
          score: 100,
          feedback: 'Đã tổng hợp đầy đủ 32 cơ sở nhà đất công dôi dư, phương án sắp xếp đạt chuẩn quy định.'
        }
      ]
    },

    // 2. Ban Quản lý Dự án Giao thông tỉnh
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
          assignedDept: 'Phòng Quản lý Đầu tư công',
          specialist: 'Phạm Minh Tuấn',
          deadline: '2026-08-30',
          workflowStep: 4,
          timeline: {
            step1: '2026-08-01 (Giao nhiệm vụ)',
            step2: '2026-08-16 15:40 (Đã nộp dự thảo)',
            step3: '2026-08-18 10:00 (Phòng QL ĐTC tiếp nhận)',
            step4: '2026-08-20 16:15 (Yêu cầu giải trình tiến độ GPMB)',
            step5: '--- (Đang chờ giải trình)'
          },
          score: null,
          feedback: 'CẢNH BÁO TIẾN ĐỘ: Dự án Tuyến đường Vành Đai 2 giải ngân dưới 40% kế hoạch vốn. Phòng QL Đầu tư công yêu cầu Ban QLDA bổ sung văn bản giải trình nguyên nhân vướng GPMB và cam kết tiến độ thi công trước ngày 28/08/2026.'
        }
      ]
    },

    // 3. Bệnh viện Đa khoa tỉnh Khánh Hòa
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
          assignedDept: 'Phòng Tài chính Hành chính sự nghiệp',
          specialist: 'Ngô Mỹ Linh',
          deadline: '2026-09-10',
          workflowStep: 3,
          timeline: {
            step1: '2026-08-05 (Giao nhiệm vụ)',
            step2: '2026-08-19 14:00 (Đã nộp dự thảo phương án)',
            step3: '2026-08-21 09:30 (Phòng HCSN đang tiếp nhận thẩm tra)',
            step4: '---',
            step5: '---'
          },
          score: null,
          feedback: 'Phòng Tài chính Hành chính sự nghiệp đang thụ lý hồ sơ, kiểm tra phương án phân loại tự chủ Nhóm 2 giai đoạn 2026-2028.'
        }
      ]
    },

    // 4. Tổng Công ty Khánh Việt (KHATOCO)
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
          assignedDept: 'Phòng Quản lý Doanh nghiệp',
          specialist: 'Vũ Thị Mai',
          deadline: '2026-09-15',
          workflowStep: 2,
          timeline: {
            step1: '2026-08-10 (Giao nhiệm vụ)',
            step2: '2026-08-22 11:20 (Đã nộp dự thảo BCTC & ước nộp NSNN)',
            step3: '--- (Chờ Phòng QLDN tiếp nhận)',
            step4: '---',
            step5: '---'
          },
          score: null,
          feedback: 'Đã nộp thành công dự thảo ước nộp NSNN năm 2026 (3.620,5 tỷ đồng). Đang chờ chuyên viên Phòng Quản lý Doanh nghiệp tiếp nhận đối soát.'
        },
        {
          campaignId: 'REP-BCTC-6THANG-2026',
          title: 'Báo cáo tài chính và hiệu quả sử dụng vốn nhà nước 6 tháng đầu năm 2026',
          authority: 'UBND tỉnh Khánh Hòa',
          assignedDept: 'Phòng Quản lý Doanh nghiệp',
          specialist: 'Vũ Thị Mai',
          deadline: '2026-07-31',
          workflowStep: 5,
          timeline: {
            step1: '2026-07-01',
            step2: '2026-07-20',
            step3: '2026-07-22',
            step4: '---',
            step5: '2026-07-28 (Đã phê duyệt chốt số liệu)'
          },
          score: 99,
          feedback: 'Báo cáo tài chính kiểm toán hoàn tất, chỉ tiêu bảo toàn vốn và nộp NSNN đạt xuất sắc.'
        }
      ]
    },

    // 5. Công ty Yến Sào Khánh Hòa
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
          assignedDept: 'Phòng Quản lý Doanh nghiệp',
          specialist: 'Vũ Thị Mai',
          deadline: '2026-09-15',
          workflowStep: 1,
          timeline: {
            step1: '2026-08-10 (Đã mở cổng tiếp nhận)',
            step2: '--- (Chưa nộp dự thảo)',
            step3: '---',
            step4: '---',
            step5: '---'
          },
          score: null,
          feedback: 'Chế độ báo cáo đang mở. Đơn vị cần tổng hợp số liệu doanh thu và số ước nộp NSNN quý III để gửi dự thảo trước ngày 15/09/2026.'
        },
        {
          campaignId: 'REP-BCTC-Q2-2026',
          title: 'Báo cáo giám sát tài chính định kỳ Quý II/2026',
          authority: 'UBND tỉnh Khánh Hòa',
          assignedDept: 'Phòng Quản lý Doanh nghiệp',
          specialist: 'Vũ Thị Mai',
          deadline: '2026-07-20',
          workflowStep: 5,
          timeline: {
            step1: '2026-06-25',
            step2: '2026-07-15',
            step3: '2026-07-16',
            step4: '---',
            step5: '2026-07-19 (Đã phê duyệt chốt số liệu)'
          },
          score: 97,
          feedback: 'Số liệu doanh thu 2.180 tỷ đồng đạt chuẩn, đã nạp Master Data.'
        }
      ]
    },

    // 6. Doanh nghiệp FDI Maruha Nichiro
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
          assignedDept: 'Phòng Quản lý Đầu tư ngoài ngân sách',
          specialist: 'Nguyễn Thị Bích Trâm',
          deadline: '2026-09-30',
          workflowStep: 1,
          timeline: {
            step1: '2026-08-15 (Mở nhiệm vụ báo cáo)',
            step2: '--- (Chưa nộp dự thảo)',
            step3: '---',
            step4: '---',
            step5: '---'
          },
          score: null,
          feedback: 'Kỳ báo cáo định kỳ giám sát vốn FDI (58 triệu USD) tại KCN Nam Cam Ranh. Hạn nộp còn 37 ngày.'
        },
        {
          campaignId: 'REP-FDI-VON-THUCHIEN',
          title: 'Báo cáo tiến độ giải ngân vốn đầu tư xây dựng nhà máy giai đoạn 1',
          authority: 'UBND tỉnh & Ban QL KKT Vân Phong',
          assignedDept: 'Phòng Quản lý Đầu tư ngoài ngân sách',
          specialist: 'Nguyễn Thị Bích Trâm',
          deadline: '2026-08-20',
          workflowStep: 3,
          timeline: {
            step1: '2026-08-01',
            step2: '2026-08-18 16:00 (Đã nộp dự thảo)',
            step3: '2026-08-21 10:30 (Phòng DTNS đang tiếp nhận thẩm tra)',
            step4: '---',
            step5: '---'
          },
          score: null,
          feedback: 'Phòng Quản lý Đầu tư ngoài ngân sách đang đối chiếu tiến độ thi công và hồ sơ hải quan nhập khẩu máy móc công nghệ.'
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
    const topTabs = document.querySelectorAll('#portalNavTabs .sub-tab-btn, #portalNavTabs .tab-btn');
    topTabs.forEach(b => b.classList.remove('active'));
    if (tabMap[tabName] !== undefined && topTabs[tabMap[tabName]]) {
      topTabs[tabMap[tabName]].classList.add('active');
    } else if (tabBtn) {
      tabBtn.classList.add('active');
    }

    this.renderPortalBody();
  },

  renderWorkflowStepper(task) {
    const currentStep = task.workflowStep || 1;
    const tl = task.timeline || {};

    const steps = [
      { num: 1, title: '1. Chưa nộp', icon: 'file-text', time: tl.step1 || 'Mở nhiệm vụ' },
      { num: 2, title: '2. Đã nộp dự thảo', icon: 'send', time: tl.step2 || 'Chờ nộp' },
      { num: 3, title: '3. Phòng CM tiếp nhận', icon: 'eye', time: tl.step3 || 'Chờ tiếp nhận' },
      { num: 4, title: '4. Yêu cầu giải trình', icon: 'alert-triangle', time: tl.step4 || 'Không có' },
      { num: 5, title: '5. Đã duyệt chốt số liệu', icon: 'check-circle-2', time: tl.step5 || 'Chưa duyệt' }
    ];

    let stepperHtml = '<div class="portal-workflow-stepper">';

    steps.forEach((s, idx) => {
      let nodeClass = '';
      if (s.num < currentStep) {
        nodeClass = 'completed';
      } else if (s.num === currentStep) {
        if (currentStep === 1) nodeClass = 'active';
        else if (currentStep === 2) nodeClass = 'warning-active';
        else if (currentStep === 3) nodeClass = 'active';
        else if (currentStep === 4) nodeClass = 'alert-active';
        else if (currentStep === 5) nodeClass = 'completed';
      }

      stepperHtml += `
        <div class="workflow-step-node ${nodeClass}">
          <div class="workflow-step-bubble">
            <i data-lucide="${s.num < currentStep || (s.num === 5 && currentStep === 5) ? 'check' : s.icon}"></i>
          </div>
          <div class="workflow-step-title">${s.title}</div>
          <div class="workflow-step-meta" title="${s.time}">${s.time.split('(')[0].trim()}</div>
        </div>
      `;

      if (idx < steps.length - 1) {
        let lineClass = '';
        if (s.num < currentStep) {
          lineClass = 'completed';
        } else if (s.num === currentStep - 1) {
          lineClass = 'in-progress';
        }
        stepperHtml += `<div class="workflow-step-line ${lineClass}"></div>`;
      }
    });

    stepperHtml += '</div>';
    return stepperHtml;
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
          <div class="banner-title-group">
            <h2>Cổng tiếp nhận và nộp báo cáo trực tuyến</h2>
            <p>Quy trình 5 bước kê khai số liệu: Chưa nộp ➔ Đã nộp dự thảo ➔ Phòng CM tiếp nhận ➔ Yêu cầu giải trình/Bổ sung ➔ Đã phê duyệt chốt số liệu</p>
          </div>
        </div>

        <div style="margin-top: 6px; width: 100%;">
          <span class="badge ${entity.type.includes('ENTERPRISE') ? 'badge-purple' : 'badge-info'}" style="font-size: 12px; padding: 6px 12px; font-weight: 600; white-space: normal; line-height: 1.4; max-width: 100%; word-break: break-word; display: inline-block;">
            <span class="pulse-dot"></span> ${entity.name} (${entity.badge})
          </span>
        </div>
      </div>

      <!-- PORTAL NAVIGATION TABS -->
      <div class="sub-tabs-bar" id="portalNavTabs" style="margin-bottom: 16px;">
        <button class="sub-tab-btn ${this.currentTab === 'tasks' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('tasks', this)">
          <i data-lucide="clipboard-list"></i> Nhiệm vụ báo cáo & Quy trình (${entity.assignedTasks.length})
        </button>
        <button class="sub-tab-btn ${this.currentTab === 'fill_form' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('fill_form', this)">
          <i data-lucide="edit-3"></i> Kê khai & nộp báo cáo
        </button>
        <button class="sub-tab-btn ${this.currentTab === 'history' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('history', this)">
          <i data-lucide="history"></i> Lịch sử & Kết quả thẩm tra
        </button>
        <button class="sub-tab-btn ${this.currentTab === 'guidance' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('guidance', this)">
          <i data-lucide="book-open"></i> Quy định & Biểu mẫu
        </button>
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
      // Tab 1: Task Inbox with 5-Step Workflow Status
      container.innerHTML = `
        <div class="card-header" style="flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 class="card-title"><i data-lucide="git-pull-request"></i> Theo dõi quy trình 5 bước nộp và thẩm tra số liệu báo cáo</h3>
            <p class="card-subtitle">Minh bạch toàn diện từng trạng thái từ khâu giao nhiệm vụ, thẩm tra chuyên môn tới phê duyệt chốt số liệu CSDL</p>
          </div>
          <span class="badge badge-info">Theo dõi thời gian thực</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px; padding: 4px;">
          ${entity.assignedTasks.map(t => {
            const step = t.workflowStep || 1;
            let stepBadge = '';
            let borderLeftColor = '#002B8C';

            if (step === 1) {
              stepBadge = `<span class="badge badge-info"><i data-lucide="file-text"></i> Bước 1: Chưa nộp</span>`;
              borderLeftColor = '#002B8C';
            } else if (step === 2) {
              stepBadge = `<span class="badge badge-warning"><i data-lucide="send"></i> Bước 2: Đã nộp dự thảo</span>`;
              borderLeftColor = '#d97706';
            } else if (step === 3) {
              stepBadge = `<span class="badge badge-purple"><i data-lucide="eye"></i> Bước 3: Phòng CM tiếp nhận</span>`;
              borderLeftColor = '#7e22ce';
            } else if (step === 4) {
              stepBadge = `<span class="badge badge-danger"><i data-lucide="alert-triangle"></i> Bước 4: Yêu cầu giải trình / Bổ sung</span>`;
              borderLeftColor = '#dc2626';
            } else if (step === 5) {
              stepBadge = `<span class="badge badge-success"><i data-lucide="check-circle-2"></i> Bước 5: Đã duyệt chốt số liệu</span>`;
              borderLeftColor = '#10b981';
            }

            return `
              <div class="card" style="padding: 18px; background: #ffffff; border: 1px solid #cbd5e1; border-left: 5px solid ${borderLeftColor}; box-shadow: var(--shadow-card);">
                <!-- Hàng 1: Badge quy trình + Phòng chuyên môn + Hạn chót -->
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">
                  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                    ${stepBadge}
                    <span class="badge badge-info"><i data-lucide="building"></i> Thụ lý: ${t.assignedDept || 'Sở Tài chính'} (${t.specialist || 'Chuyên viên'})</span>
                    <span class="badge badge-secondary">${t.authority || 'UBND tỉnh'}</span>
                  </div>
                  <span style="font-size: 12px; color: #b45309; font-weight: 700; font-family: 'JetBrains Mono', monospace; display: flex; align-items: center; gap: 4px;">
                    <i data-lucide="clock" style="width: 14px; height: 14px;"></i> Hạn nộp: <strong>${t.deadline}</strong>
                  </span>
                </div>

                <!-- Hàng 2: Tiêu đề báo cáo -->
                <h4 style="font-size: 15px; font-weight: 750; color: #0f172a; line-height: 1.4; margin: 0 0 6px 0;">${t.title}</h4>

                <!-- Hàng 3: SƠ ĐỒ TIẾN TRÌNH QUY TRÌNH 5 BƯỚC (5-STEP WORKFLOW STEPPER) -->
                ${this.renderWorkflowStepper(t)}

                <!-- Hàng 4: Ý kiến phản hồi / Hướng dẫn & Yêu cầu giải trình từ Sở Tài chính -->
                <div style="font-size: 12.5px; margin-bottom: 14px; line-height: 1.5; background: ${step === 4 ? '#fff1f2' : '#f8fafc'}; padding: 12px 14px; border-radius: 6px; border: 1px solid ${step === 4 ? '#fca5a5' : '#cbd5e1'};">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span style="color: ${step === 4 ? '#991b1b' : '#334155'}; font-weight: 700; display: flex; align-items: center; gap: 5px;">
                      <i data-lucide="${step === 4 ? 'alert-circle' : 'message-square'}" style="width: 14px; height: 14px;"></i>
                      ${step === 4 ? 'YÊU CẦU GIẢI TRÌNH & BỔ SUNG TỪ PHÒNG CHUYÊN MÔN:' : 'Ý kiến phản hồi từ Sở Tài chính:'}
                    </span>
                    ${t.score ? `<span class="badge badge-success" style="font-weight: 700;">Đánh giá: ${t.score}/100 Điểm</span>` : ''}
                  </div>
                  <div style="color: ${step === 4 ? '#7f1d1d' : '#0f172a'}; font-weight: 600;">
                    ${t.feedback}
                  </div>
                </div>

                <!-- Hàng 5: Cụm Tác vụ Thực tế & Chuyển đổi Trạng thái -->
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-top: 1px solid #f1f5f9; padding-top: 12px;">
                  <!-- Demo Step Controller -->
                  <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                    <span style="font-size: 11px; font-weight: 700; color: #475569;">Mô phỏng bước:</span>
                    <button class="btn btn-sm ${step === 1 ? 'btn-primary' : 'btn-outline'}" onclick="ExternalPortalManager.advanceWorkflow('${t.campaignId}', 1, 'Mở nhiệm vụ báo cáo')" title="Chuyển sang Bước 1: Chưa nộp">B1</button>
                    <button class="btn btn-sm ${step === 2 ? 'btn-primary' : 'btn-outline'}" onclick="ExternalPortalManager.advanceWorkflow('${t.campaignId}', 2, 'Đã nộp dự thảo báo cáo')" title="Chuyển sang Bước 2: Đã nộp dự thảo">B2</button>
                    <button class="btn btn-sm ${step === 3 ? 'btn-primary' : 'btn-outline'}" onclick="ExternalPortalManager.advanceWorkflow('${t.campaignId}', 3, 'Phòng chuyên môn tiếp nhận thẩm tra')" title="Chuyển sang Bước 3: Phòng CM tiếp nhận">B3</button>
                    <button class="btn btn-sm ${step === 4 ? 'btn-primary' : 'btn-outline'}" onclick="ExternalPortalManager.advanceWorkflow('${t.campaignId}', 4, 'Phát hiện chênh lệch số liệu, yêu cầu đơn vị nộp giải trình')" title="Chuyển sang Bước 4: Yêu cầu giải trình">B4</button>
                    <button class="btn btn-sm ${step === 5 ? 'btn-primary' : 'btn-outline'}" onclick="ExternalPortalManager.advanceWorkflow('${t.campaignId}', 5, 'Lãnh đạo Sở phê duyệt chốt số liệu vào CSDL')" title="Chuyển sang Bước 5: Đã duyệt chốt">B5</button>
                  </div>

                  <!-- Main Action Buttons -->
                  <div style="display: flex; gap: 8px;">
                    ${step === 1 ? `
                      <button class="btn btn-primary btn-sm" onclick="ExternalPortalManager.openFormToFill('${t.campaignId}')">
                        <i data-lucide="edit-3"></i> Kê khai & nộp dự thảo
                      </button>
                    ` : step === 2 ? `
                      <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang mở bản dự thảo báo cáo...', 'info')">
                        <i data-lucide="eye"></i> Xem bản dự thảo
                      </button>
                      <button class="btn btn-primary btn-sm" onclick="ExternalPortalManager.advanceWorkflow('${t.campaignId}', 3, 'Phòng chuyên môn tiếp nhận hồ sơ')">
                        <i data-lucide="check"></i> Tiếp nhận thẩm tra
                      </button>
                    ` : step === 3 ? `
                      <button class="btn btn-warning btn-sm" onclick="ExternalPortalManager.advanceWorkflow('${t.campaignId}', 4, 'Yêu cầu làm rõ số liệu giải ngân và đối chiếu hóa đơn chứng từ')">
                        <i data-lucide="alert-triangle"></i> Yêu cầu giải trình
                      </button>
                      <button class="btn btn-success btn-sm" onclick="ExternalPortalManager.advanceWorkflow('${t.campaignId}', 5, 'Số liệu hợp lệ 100%, phê duyệt chốt số liệu CSDL')">
                        <i data-lucide="check-circle-2"></i> Duyệt chốt số liệu
                      </button>
                    ` : step === 4 ? `
                      <button class="btn btn-danger btn-sm" onclick="ExternalPortalManager.openExplanationModal('${t.campaignId}')">
                        <i data-lucide="send"></i> Nộp giải trình & Bổ sung
                      </button>
                      <button class="btn btn-success btn-sm" onclick="ExternalPortalManager.advanceWorkflow('${t.campaignId}', 5, 'Đã tiếp nhận giải trình hợp lệ, phê duyệt chốt số liệu')">
                        <i data-lucide="check-circle-2"></i> Duyệt chốt số liệu
                      </button>
                    ` : `
                      <button class="btn btn-outline btn-sm" onclick="DeptWorkspaceManager.exportFilteredReport('pdf')">
                        <i data-lucide="printer"></i> Tải văn bản kết luận (PDF)
                      </button>
                      <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đã lưu trữ số liệu vào CSDL Master Data!', 'success')">
                        <i data-lucide="database"></i> Xem số liệu đã chốt
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
            <h3 class="card-title"><i data-lucide="edit"></i> Biểu mẫu kê khai và nộp dự thảo báo cáo trực tuyến (Bước 2)</h3>
            <p class="card-subtitle">Đơn vị có thể nhập số liệu trực tiếp hoặc tải tệp Excel mẫu để điền số liệu nạp nhanh</p>
          </div>
          <button class="btn btn-soft-primary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_BaoCao_DinhKy.xlsx')">
            <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
          </button>
        </div>

        <!-- Excel Drag and Drop Area -->
        <div style="margin-bottom: 20px; border: 2px dashed #93c5fd; border-radius: 12px; padding: 22px; text-align: center; background: #f0f7ff; cursor: pointer;" onclick="document.getElementById('portalExcelFileInput').click()">
          <input type="file" id="portalExcelFileInput" style="display: none;" accept=".xlsx, .xls" onchange="ExternalPortalManager.handleExcelUpload(event)" />
          <i data-lucide="file-spreadsheet" style="font-size: 36px; color: #002B8C; margin-bottom: 8px; display: inline-block;"></i>
          <h4 style="font-size: 14.5px; font-weight: 750; color: #0f172a;">Kéo thả tệp Excel báo cáo hoặc nhấp để tải lên</h4>
          <p style="font-size: 12px; color: #475569; margin-top: 4px;">Hỗ trợ tệp .xlsx, .xls theo đúng mẫu chuẩn của Bộ Tài chính và Sở Tài chính (Dung lượng tối đa: 20MB)</p>
        </div>

        <div style="text-align: center; margin: 15px 0; color: #64748b; font-size: 12px; font-weight: 700;">--- HOẶC KÊ KHAI TRỰC TUYẾN TỪNG CHỈ TIÊU BÁO CÁO ---</div>

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
            <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Nộp dự thảo lên Sở Tài chính</button>
          </div>
        </form>
      `;
    } else if (this.currentTab === 'history') {
      // Tab 3: History & Evaluation with Big Data Table UX
      container.innerHTML = `
        <div class="table-fullscreen-wrapper" id="wrapper_portal_history">
          ${DeptWorkspaceManager.renderAdminTableToolbar('wrapper_portal_history', 'table_portal_history', 'Lịch sử nộp báo cáo và tiến độ quy trình 5 bước')}
          <div class="table-scroll-container">
            <table class="data-table freeze-first" id="table_portal_history">
              <thead>
                <tr>
                  <th>Mã đợt nộp</th>
                  <th>Tên kỳ báo cáo</th>
                  <th>Quy trình hiện tại</th>
                  <th>Phòng CM thụ lý</th>
                  <th>Chuyên viên thẩm tra</th>
                  <th>Hạn nộp</th>
                  <th>Đánh giá / Kết luận</th>
                  <th style="text-align: center;">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                ${entity.assignedTasks.map(t => {
                  const step = t.workflowStep || 1;
                  const stepObj = this.WORKFLOW_STEPS.find(s => s.step === step) || this.WORKFLOW_STEPS[0];
                  return `
                    <tr>
                      <td><strong style="color: #002B8C;">${t.campaignId}</strong></td>
                      <td><strong>${t.title}</strong></td>
                      <td><span class="badge badge-${stepObj.color}">${stepObj.label}</span></td>
                      <td>${t.assignedDept || 'Sở Tài chính'}</td>
                      <td>${t.specialist || 'Chuyên viên'}</td>
                      <td><code>${t.deadline}</code></td>
                      <td>${t.score ? `<strong style="color: #14532d;">${t.score}/100 Điểm</strong>` : '<span style="color: #64748b;">Đang xử lý</span>'}</td>
                      <td style="text-align: center;">
                        <button class="btn btn-sm btn-outline" onclick="ExternalPortalManager.switchPortalTab('tasks')">
                          <i data-lucide="eye"></i> Chi tiết
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
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

  advanceWorkflow(campaignId, targetStep, comment) {
    const entity = this.reportingEntities[this.currentEntityId];
    if (!entity) return;

    const task = entity.assignedTasks.find(t => t.campaignId === campaignId);
    if (!task) return;

    task.workflowStep = targetStep;
    const nowStr = new Date().toLocaleString('vi-VN');

    if (!task.timeline) task.timeline = {};
    if (targetStep === 1) {
      task.timeline.step1 = `${nowStr} (Mở nhiệm vụ)`;
      task.feedback = 'Nhiệm vụ báo cáo đang mở. Đơn vị cần tổng hợp số liệu nộp dự thảo trước thời hạn.';
    } else if (targetStep === 2) {
      task.timeline.step2 = `${nowStr} (Đã nộp dự thảo)`;
      task.feedback = comment || 'Đã nộp dự thảo thành công. Chờ Phòng chuyên môn Sở Tài chính tiếp nhận.';
    } else if (targetStep === 3) {
      task.timeline.step3 = `${nowStr} (${task.assignedDept || 'Phòng CM'} tiếp nhận)`;
      task.feedback = comment || `${task.assignedDept || 'Phòng chuyên môn'} đang thụ lý kiểm tra tính hợp lệ và đối soát số liệu.`;
    } else if (targetStep === 4) {
      task.timeline.step4 = `${nowStr} (Yêu cầu giải trình/Bổ sung)`;
      task.feedback = comment || 'CẢNH BÁO: Phòng chuyên môn phát hiện chênh lệch số liệu. Yêu cầu đơn vị nộp giải trình và cập nhật lại dự thảo.';
    } else if (targetStep === 5) {
      task.timeline.step5 = `${nowStr} (Đã phê duyệt chốt số liệu)`;
      task.feedback = comment || 'Số liệu hoàn toàn chính xác, đã được Lãnh đạo Sở phê duyệt và nạp vào Master Data CSDL Kinh tế toàn tỉnh.';
      task.score = task.score || 98;
    }

    const stepObj = this.WORKFLOW_STEPS.find(s => s.step === targetStep);
    App.showNotification(`Quy trình báo cáo [${task.campaignId}] chuyển sang: ${stepObj.label}`, targetStep === 4 ? 'warning' : targetStep === 5 ? 'success' : 'info');

    if (window.RealtimeEngine) {
      RealtimeEngine.pushEvent({
        type: 'WORKFLOW_TRANSITION',
        title: `Cổng ngoài [${entity.name}] chuyển trạng thái ${stepObj.label}`,
        desc: task.title,
        time: 'Vừa xong'
      });
    }

    this.renderPortalBody();
  },

  openExplanationModal(campaignId) {
    const entity = this.reportingEntities[this.currentEntityId];
    if (!entity) return;
    const task = entity.assignedTasks.find(t => t.campaignId === campaignId);
    if (!task) return;

    const modalTitleEl = document.getElementById('modalGenericTitle');
    const modalBodyEl = document.getElementById('modalGenericBody');

    if (modalTitleEl) {
      modalTitleEl.innerHTML = `<i data-lucide="alert-triangle" style="color: #dc2626;"></i> Nộp Văn Bản Giải Trình & Bổ Sung Số Liệu (Bước 4)`;
    }

    if (modalBodyEl) {
      modalBodyEl.innerHTML = `
        <div style="background: #fff1f2; border: 1px solid #fca5a5; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px;">
          <div style="font-weight: 700; color: #991b1b; font-size: 13px;">Ý kiến yêu cầu từ ${task.assignedDept || 'Phòng chuyên môn Sở Tài chính'}:</div>
          <div style="font-size: 12.5px; color: #7f1d1d; margin-top: 4px;">"${task.feedback}"</div>
        </div>

        <form id="formExplanationSubmit" onsubmit="event.preventDefault(); ExternalPortalManager.submitExplanation('${campaignId}');">
          <div class="form-group" style="margin-bottom: 14px;">
            <label class="form-label" style="font-weight: 700;">Nội dung văn bản giải trình chi tiết <span class="req">*</span></label>
            <textarea class="form-control" id="explanationText" rows="4" placeholder="Giải trình rõ nguyên nhân chênh lệch số liệu, căn cứ pháp lý, cam kết tiến độ điều chỉnh..." required>Đơn vị xin giải trình nguyên nhân vướng mắc GPMB và đã bổ sung chứng từ giải ngân vốn đợt 2 theo đúng hướng dẫn của Phòng chuyên môn.</textarea>
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label" style="font-weight: 700;">Đính kèm tệp văn bản giải trình / Báo cáo bổ sung (PDF/Excel có ký số)</label>
            <input type="file" class="form-control" accept=".pdf, .docx, .xlsx" />
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <button type="button" class="btn btn-secondary" onclick="App.closeModal('modalGeneric')">Hủy bỏ</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Gửi văn bản giải trình lên Sở Tài chính</button>
          </div>
        </form>
      `;
    }

    App.openModal('modalGeneric');
    if (window.lucide) window.lucide.createIcons();
  },

  submitExplanation(campaignId) {
    App.closeModal('modalGeneric');
    this.advanceWorkflow(campaignId, 3, 'Đơn vị đã nộp văn bản giải trình và hồ sơ bổ sung. Phòng chuyên môn đang thụ lý thẩm tra lại.');
    App.showNotification('Đã gửi văn bản giải trình thành công! Trạng thái chuyển về Bước 3 (Phòng CM tiếp nhận thẩm tra lại).', 'success');
  },

  openFormToFill(campaignId) {
    this.switchPortalTab('fill_form', document.querySelectorAll('#portalNavTabs .sub-tab-btn')[1]);
  },

  handleExcelUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    App.showNotification(`Đã tải lên tệp [${file.name}]. Hệ thống kiểm tra cấu trúc hợp lệ và điền tự động vào biểu mẫu báo cáo!`, 'success');
  },

  handleOnlineSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const campaignId = formData.get('campaign_id');

    App.showNotification(`Đã gửi thành công dự thảo báo cáo [${campaignId}] của ${this.reportingEntities[this.currentEntityId].name} tới Sở Tài chính!`, 'success');

    this.advanceWorkflow(campaignId, 2, 'Đã nộp dự thảo báo cáo trực tuyến thành công. Chờ Phòng chuyên môn Sở Tài chính tiếp nhận.');

    this.switchPortalTab('tasks', document.querySelectorAll('#portalNavTabs .sub-tab-btn')[0]);
  }
};
