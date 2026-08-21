/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * PHÂN HỆ QUẢN LÝ BÁO CÁO THEO YÊU CẦU CỦA BỘ TÀI CHÍNH VÀ UBND TỈNH KHÁNH HÒA
 * (Quyết định số 2071/QĐ-UBND, Kế hoạch 1489/KH-UBND, Thông tư BTC & Luật NSNN)
 */

const StateReportingManager = {
  currentTab: 'campaigns',

  // Danh mục các Kỳ Báo cáo Chính thức theo Quy định của Bộ Tài chính và UBND Tỉnh
  reportingPeriods: [
    {
      id: "REP-2071-Q3-2026",
      name: "Báo Cáo Bộ Chỉ Số Phục Vụ Chỉ Đạo Điều Hành Quý III/2026",
      authority: "UBND tỉnh Khánh Hòa",
      legalBasis: "Quyết định số 2071/QĐ-UBND của UBND tỉnh Khánh Hòa",
      frequency: "Định kỳ hằng quý",
      deadline: "2026-09-25",
      targetCount: 34, // UBND các xã, phường trọng điểm và các sở, ban, ngành
      submittedCount: 29,
      approvedCount: 26,
      pendingCount: 3,
      overdueCount: 5,
      status: "OPEN",
      indicators: [
        "1. Thu ngân sách nhà nước trên địa bàn theo từng sắc thuế",
        "2. Tỷ lệ giải ngân vốn đầu tư công các nguồn",
        "3. Tình hình phát triển doanh nghiệp, HTX thành lập mới",
        "4. Chỉ số chuyển đổi số và xây dựng chính quyền điện tử"
      ]
    },
    {
      id: "REP-BTC-NSNN-2026",
      name: "Báo Cáo Đánh Giá Tình Hình Thực Hiện Thu - Chi Ngân Sách Nhà Nước Năm 2026 & Dự Toán 2027",
      authority: "Bộ Tài Chính & UBND Tỉnh",
      legalBasis: "Luật Ngân sách nhà nước số 83/2015/QH13 & Thông tư hướng dẫn xây dựng dự toán",
      frequency: "Định Kỳ Hằng Năm",
      deadline: "2026-09-15",
      targetCount: 34,
      submittedCount: 31,
      approvedCount: 28,
      pendingCount: 3,
      overdueCount: 3,
      status: "OPEN",
      indicators: [
        "1. Dự toán thu NSNN trên địa bàn theo khu vực kinh tế",
        "2. Dự toán chi cân đối ngân sách địa phương (ĐTPT & Thường xuyên)",
        "3. Kế hoạch vay và trả nợ của chính quyền địa phương",
        "4. Tỷ lệ điều tiết các khoản thu phân chia giữa các cấp ngân sách"
      ]
    },
    {
      id: "REP-DTC-THANG8-2026",
      name: "Báo Cáo Tình Hình Thực Hiện & Giải Ngân Kế Hoạch Vốn Đầu Tư Công Tháng 8/2026",
      authority: "Bộ Tài Chính & UBND Tỉnh",
      legalBasis: "Kế hoạch số 1489/KH-UBND & Văn bản chỉ đạo của Bộ Tài chính",
      frequency: "Định Kỳ Hằng Tháng",
      deadline: "2026-08-30",
      targetCount: 18, // 18 Ban Quản lý dự án & Chủ đầu tư cấp tỉnh
      submittedCount: 16,
      approvedCount: 14,
      pendingCount: 2,
      overdueCount: 2,
      status: "OPEN",
      indicators: [
        "1. Số vốn thanh toán khối lượng hoàn thành qua KBNN",
        "2. Số vốn tạm ứng và tiến độ thu hồi tạm ứng theo quy định",
        "3. Chi tiết tiến độ 16 dự án trọng điểm cấp tỉnh",
        "4. Danh mục dự án giải ngân dưới 50% kế hoạch vốn đề xuất điều chuyển"
      ]
    },
    {
      id: "REP-TSC-N167-2026",
      name: "Báo Cáo Tổng Hợp Tình Hình Quản Lý, Sử Dụng & Sắp Xếp Cơ Sở Nhà Đất Công Năm 2026",
      authority: "Bộ Tài Chính & UBND Tỉnh",
      legalBasis: "Nghị định 167/2017/NĐ-CP, Nghị định 67/2021/NĐ-CP & Luật Quản lý sử dụng tài sản công",
      frequency: "Định Kỳ Hằng Năm",
      deadline: "2026-08-15",
      targetCount: 45, // Cơ quan, đơn vị dự toán cấp I
      submittedCount: 45,
      approvedCount: 45,
      pendingCount: 0,
      overdueCount: 0,
      status: "CLOSED",
      indicators: [
        "1. Tổng số 1.840 cơ sở nhà đất công thuộc phạm vi quản lý",
        "2. Số cơ sở giữ lại tiếp tục sử dụng làm trụ sở",
        "3. Số cơ sở dôi dư đã phê duyệt phương án bán đấu giá, chuyển nhượng",
        "4. Tình hình thu nộp tiền bán tài sản trên đất, chuyển nhượng QSDĐ"
      ]
    },
    {
      id: "REP-TU-CHU-N60",
      name: "Báo Cáo Tình Hình Thực Hiện Cơ Chế Tự Chủ Tài Chính Đơn Vị Sự Nghiệp Công Lập Theo Nghị Định 60",
      authority: "Bộ Tài Chính & UBND Tỉnh",
      legalBasis: "Nghị định số 60/2021/NĐ-CP ngày 21/6/2021 của Chính phủ",
      frequency: "Định Kỳ 3 Năm / Hằng Năm",
      deadline: "2026-09-10",
      targetCount: 120, // 120 ĐVSNCL lớn
      submittedCount: 98,
      approvedCount: 85,
      pendingCount: 13,
      overdueCount: 22,
      status: "OPEN",
      indicators: [
        "1. Phân loại mức độ tự chủ tài chính: Nhóm 1, Nhóm 2, Nhóm 3, Nhóm 4",
        "2. Tổng nguồn thu sự nghiệp và tỷ lệ tự bảo đảm chi thường xuyên",
        "3. Số lượng biên chế hưởng lương từ nguồn thu sự nghiệp",
        "4. Kinh phí NSNN giảm chi hỗ trợ trực tiếp cho đơn vị sự nghiệp"
      ]
    },
    {
      id: "REP-DN-FDI-2026",
      name: "Báo Cáo Giám Sát Tài Chính Doanh Nghiệp FDI & Doanh Nghiệp Có Vốn Nhà Nước",
      authority: "Bộ Tài Chính",
      legalBasis: "Khoản 6 Điều 2 Quyết định 15/2025/QĐ-UBND & Quy định của Bộ Tài chính",
      frequency: "Định Kỳ Hằng Năm",
      deadline: "2026-09-30",
      targetCount: 50, // 38 DN FDI + 12 DN có vốn nhà nước
      submittedCount: 42,
      approvedCount: 38,
      pendingCount: 4,
      overdueCount: 8,
      status: "OPEN",
      indicators: [
        "1. Vốn đầu tư thực hiện và tiến độ cam kết theo Giấy chứng nhận ĐKĐT (IRC)",
        "2. Doanh thu, lợi nhuận sau thuế và số nộp NSNN trong kỳ",
        "3. Tỷ suất sinh lời trên tài sản (ROA) và trên vốn chủ sở hữu (ROE)",
        "4. Đánh giá dấu hiệu an toàn tài chính và bảo toàn vốn nhà nước"
      ]
    }
  ],

  // Danh sách Chi tiết Đơn vị Nộp Báo cáo (Tracking Matrix)
  submissionDetails: [
    { orgId: "UBND-NTR", orgName: "UBND phường Lộc Thọ (Nha Trang)", campaignId: "REP-2071-Q3-2026", submitDate: "2026-08-18 09:15", status: "APPROVED", approver: "Lãnh đạo Sở Tài chính", score: 98 },
    { orgId: "UBND-CRH", orgName: "UBND phường Cam Nghĩa (Cam Ranh)", campaignId: "REP-2071-Q3-2026", submitDate: "2026-08-19 14:20", status: "APPROVED", approver: "Lãnh đạo Sở Tài chính", score: 95 },
    { orgId: "UBND-NHO", orgName: "UBND phường Ninh Hiệp (Ninh Hòa)", campaignId: "REP-2071-Q3-2026", submitDate: "2026-08-20 08:30", status: "PENDING", approver: "Chờ xét duyệt", score: null },
    { orgId: "UBND-CLM", orgName: "UBND thị trấn Cam Đức", campaignId: "REP-2071-Q3-2026", submitDate: "2026-08-20 10:15", status: "PENDING", approver: "Chờ xét duyệt", score: null },
    { orgId: "UBND-VNI", orgName: "UBND xã Vạn Thắng", campaignId: "REP-2071-Q3-2026", submitDate: null, status: "OVERDUE", approver: "Chưa nộp báo cáo", score: null },
    { orgId: "UBND-DKH", orgName: "UBND xã Diên Hòa", campaignId: "REP-2071-Q3-2026", submitDate: "2026-08-17 16:45", status: "APPROVED", approver: "Lãnh đạo Sở Tài chính", score: 92 },
    { orgId: "UBND-KVH", orgName: "UBND xã Khánh Phú", campaignId: "REP-2071-Q3-2026", submitDate: null, status: "OVERDUE", approver: "Chưa nộp báo cáo", score: null },
    { orgId: "UBND-KSO", orgName: "UBND xã Sơn Hiệp", campaignId: "REP-2071-Q3-2026", submitDate: "2026-08-19 11:00", status: "APPROVED", approver: "Lãnh đạo Sở Tài chính", score: 90 },
    { orgId: "UBND-TSA", orgName: "UBND xã đảo Song Tử Tây (Trường Sa)", campaignId: "REP-2071-Q3-2026", submitDate: "2026-08-16 15:30", status: "APPROVED", approver: "Lãnh đạo Sở Tài chính", score: 100 }
  ],

  init() {
    this.renderCampaignsView();
  },

  switchViewTab(tabName, tabBtn) {
    this.currentTab = tabName;
    document.querySelectorAll('#surveyTabNav .tab-btn').forEach(b => b.classList.remove('active'));
    if (tabBtn) tabBtn.classList.add('active');

    if (tabName === 'campaigns') {
      this.renderCampaignsView();
    } else if (tabName === 'tracking') {
      this.renderTrackingMatrixView();
    } else if (tabName === 'approval') {
      this.renderReportApprovalView();
    }
  },

  // 1. Giao diện danh sách kỳ báo cáo của Bộ Tài chính và UBND tỉnh
  renderCampaignsView() {
    const container = document.getElementById('surveyMainContent');
    if (!container) return;

    container.innerHTML = `
      <div class="card-header" style="margin-bottom: 20px;">
        <div>
          <h3 class="card-title"><i data-lucide="calendar-check-2"></i> Danh mục chế độ báo cáo theo yêu cầu của Bộ Tài chính và UBND tỉnh</h3>
          <p class="card-subtitle">Giám sát việc thực hiện chế độ báo cáo theo Quyết định số 2071/QĐ-UBND, Kế hoạch 1489/KH-UBND, Luật NSNN và Thông tư của Bộ Tài chính</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" onclick="StateReportingManager.remindAllOverdue()">
            <i data-lucide="bell-ring"></i> Đôn đốc đơn vị chậm nộp báo cáo
          </button>
          <button class="btn btn-primary btn-sm" onclick="App.showNotification('Đang mở biểu mẫu thêm kỳ báo cáo theo chỉ đạo mới của UBND tỉnh...', 'info')">
            <i data-lucide="plus"></i> Thêm kỳ báo cáo mới
          </button>
        </div>
      </div>

      <div class="api-service-grid" style="grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));">
        ${this.reportingPeriods.map(c => {
          const rate = Math.round((c.submittedCount / c.targetCount) * 100);
          return `
            <div class="card" style="display: flex; flex-direction: column; gap: 14px; background: #ffffff; border: 1px solid #e2e8f0; box-shadow: var(--shadow-xs);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="badge ${c.authority.includes('Bộ') ? 'badge-purple' : 'badge-info'}">${c.authority}</span>
                <span class="badge ${c.status === 'OPEN' ? 'badge-success' : 'badge-secondary'}">
                  <i class="status-dot"></i> ${c.status === 'OPEN' ? 'Đang thu thập báo cáo' : 'Đã đóng kỳ'}
                </span>
              </div>

              <div>
                <h4 style="font-size: 15px; font-weight: 700; color: #0f172a; line-height: 1.35; margin-bottom: 4px;">${c.name}</h4>
                <div style="font-size: 12px; color: #002B8C; font-weight: 600; display: flex; align-items: center; gap: 5px;">
                  <i data-lucide="book-open" style="width: 14px; height: 14px;"></i> ${c.legalBasis}
                </div>
                <div style="font-size: 11.5px; color: #64748b; margin-top: 6px;">
                  Tần suất: <strong style="color: #1e293b;">${c.frequency}</strong> • Hạn chót: <strong style="color: #b45309;">${c.deadline}</strong>
                </div>
              </div>

              <!-- Thanh tiến độ -->
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px;">
                  <span style="color: #475569; font-weight: 500;">Tiến độ nộp báo cáo:</span>
                  <strong style="color: #15803d; font-weight: 700;">${c.submittedCount} / ${c.targetCount} đơn vị (${rate}%)</strong>
                </div>
                <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                  <div style="width: ${rate}%; height: 100%; background: linear-gradient(90deg, #002B8C, #0F52BA); border-radius: 4px;"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-top: 8px; color: #64748b;">
                  <span>Đã duyệt: <strong style="color: #15803d;">${c.approvedCount}</strong></span>
                  <span>Chờ duyệt: <strong style="color: #b45309;">${c.pendingCount}</strong></span>
                  <span>Chưa nộp: <strong style="color: #dc2626;">${c.overdueCount}</strong></span>
                </div>
              </div>

              <div style="display: flex; gap: 10px; margin-top: 4px;">
                <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="StateReportingManager.viewCampaignDetails('${c.id}')">
                  <i data-lucide="eye"></i> Xem báo cáo tổng hợp
                </button>
                <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="StateReportingManager.switchViewTab('tracking', document.getElementById('tabBtnTracking'))">
                  <i data-lucide="list-checks"></i> Danh sách nộp
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  // 2. Ma trận theo dõi tiến độ và đôn đốc báo cáo
  renderTrackingMatrixView() {
    const container = document.getElementById('surveyMainContent');
    if (!container) return;

    container.innerHTML = `
      <div class="card-header">
        <div>
          <h3 class="card-title"><i data-lucide="list-checks"></i> Bảng theo dõi tiến độ nộp báo cáo các đơn vị (thời gian thực)</h3>
          <p class="card-subtitle">Giám sát trạng thái nộp báo cáo theo Quyết định số 2071/QĐ-UBND và quy định của Bộ Tài chính đối với các xã, phường trọng điểm và các sở, ban, ngành</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="StateReportingManager.remindAllOverdue()">
          <i data-lucide="mail"></i> Gửi thông báo đôn đốc đơn vị chậm nộp
        </button>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Đơn vị báo cáo</th>
              <th>Kỳ báo cáo</th>
              <th>Thời gian nộp</th>
              <th>Trạng thái</th>
              <th>Người kiểm tra / duyệt</th>
              <th>Điểm đánh giá</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            ${this.submissionDetails.map(sub => `
              <tr>
                <td><strong>${sub.orgName}</strong></td>
                <td><span class="badge badge-purple">${sub.campaignId}</span></td>
                <td>${sub.submitDate || '<span style="color: #ef4444; font-weight: 600;">Chưa nộp (quá hạn)</span>'}</td>
                <td>
                  <span class="badge ${sub.status === 'APPROVED' ? 'badge-success' : sub.status === 'PENDING' ? 'badge-warning' : 'badge-danger'}">
                    ${sub.status === 'APPROVED' ? 'Đã duyệt đạt chuẩn' : sub.status === 'PENDING' ? 'Chờ lãnh đạo duyệt' : 'Quá hạn báo cáo'}
                  </span>
                </td>
                <td>${sub.approver}</td>
                <td>${sub.score ? `<strong style="color: #15803d;">${sub.score} / 100</strong>` : '-'}</td>
                <td>
                  ${sub.status === 'PENDING' ? `
                    <button class="btn btn-primary btn-sm" onclick="StateReportingManager.approveReport('${sub.orgId}')">
                      <i data-lucide="check"></i> Duyệt số liệu
                    </button>
                  ` : sub.status === 'OVERDUE' ? `
                    <button class="btn btn-secondary btn-sm" style="color: #dc2626; border-color: #fca5a5;" onclick="App.showNotification('Đã gửi thông báo đôn đốc tới ${sub.orgName}!', 'warning')">
                      <i data-lucide="bell"></i> Đôn đốc ngay
                    </button>
                  ` : `
                    <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang mở biểu mẫu số liệu đã duyệt của ${sub.orgName}...', 'info')">
                      <i data-lucide="eye"></i> Xem chi tiết
                    </button>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  // 3. Màn hình phê duyệt và tổng hợp số liệu báo cáo
  renderReportApprovalView() {
    const container = document.getElementById('surveyMainContent');
    if (!container) return;

    container.innerHTML = `
      <div class="card-header">
        <div>
          <h3 class="card-title"><i data-lucide="check-circle-2"></i> Trung tâm thẩm tra và phê duyệt số liệu báo cáo định kỳ</h3>
          <p class="card-subtitle">Kiểm tra tính logic, đối chiếu số liệu báo cáo và phê duyệt nạp chính thức vào Kho CSDL Kinh tế tỉnh Khánh Hòa</p>
        </div>
      </div>
      <div style="text-align: center; padding: 30px; color: #64748b;">
        <i data-lucide="database-backup" style="font-size: 48px; color: #0284c7; margin-bottom: 12px; display: inline-block;"></i>
        <h4 style="color: #0f172a; font-size: 16px; margin-bottom: 6px; font-weight: 700;">Toàn bộ số liệu sau khi được duyệt sẽ tự động đồng bộ sang Phân hệ Trực quan hóa dữ liệu</h4>
        <p style="font-size: 12.5px; color: #475569;">Hệ thống đảm bảo nguyên tắc "Đúng, Đủ, Sạch, Sống" theo chuẩn quy định của Bộ Tài chính và UBND tỉnh.</p>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  remindAllOverdue() {
    App.showNotification("Đã tự động gửi thông báo đôn đốc (SMS / Email) tới 02 đơn vị đang chậm nộp báo cáo!", "warning");
  },

  approveReport(orgId) {
    const item = this.submissionDetails.find(s => s.orgId === orgId);
    if (item) {
      item.status = 'APPROVED';
      item.approver = 'Lãnh đạo Sở Tài chính';
      item.score = 95;
      this.renderTrackingMatrixView();
      App.showNotification(`Đã phê duyệt và nạp số liệu báo cáo của đơn vị [${item.orgName}] vào kho CSDL!`, "success");
    }
  },

  viewCampaignDetails(campaignId) {
    const camp = this.reportingPeriods.find(c => c.id === campaignId);
    if (!camp) return;

    const modalBody = document.getElementById('modalGenericBody');
    const modalTitle = document.getElementById('modalGenericTitle');
    
    modalTitle.innerHTML = `<i data-lucide="file-spreadsheet" style="color: #0284c7;"></i> Báo Cáo Tổng Hợp: ${camp.name}`;
    modalBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; font-size: 12.5px;">
          <div><span style="color: #64748b;">Cơ quan yêu cầu:</span> <strong style="color: #0f172a;">${camp.authority}</strong></div>
          <div><span style="color: #64748b;">Căn cứ pháp lý:</span> <strong style="color: #0284c7;">${camp.legalBasis}</strong></div>
          <div><span style="color: #64748b;">Thời hạn nộp:</span> <strong style="color: #b45309;">${camp.deadline}</strong></div>
          <div><span style="color: #64748b;">Tiến độ hoàn thành:</span> <span class="badge badge-success">${camp.submittedCount} / ${camp.targetCount} đơn vị</span></div>
        </div>
        <h4 style="font-size: 14px; font-weight: 700; color: #0f172a;">Bảng tổng hợp chỉ số chỉ đạo điều hành tỉnh Khánh Hòa</h4>
        <table class="data-table">
          <thead>
            <tr>
              <th>Nhóm Chỉ Số</th>
              <th>Chỉ Tiêu Đánh Giá</th>
              <th>Kế Hoạch Giao</th>
              <th>Số Thực Hiện</th>
              <th>Đánh Giá Đạt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Tài chính công</strong></td>
              <td>Tổng thu NSNN trên địa bàn</td>
              <td>18.100 Tỷ</td>
              <td><strong style="color: #15803d;">18.520,6 Tỷ</strong></td>
              <td><span class="badge badge-success">102.3%</span></td>
            </tr>
            <tr>
              <td><strong>Tài chính công</strong></td>
              <td>Tỷ lệ giải ngân vốn đầu tư công</td>
              <td>100% (11.480 Tỷ)</td>
              <td><strong style="color: #0284c7;">68.38% (7.850,4 Tỷ)</strong></td>
              <td><span class="badge badge-warning">Đúng tiến độ tuần 33</span></td>
            </tr>
            <tr>
              <td><strong>Phát triển Doanh nghiệp</strong></td>
              <td>Số doanh nghiệp thành lập mới</td>
              <td>1.800 DN</td>
              <td><strong style="color: #15803d;">1.420 DN</strong></td>
              <td><span class="badge badge-success">78.9% kế hoạch năm</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    App.openModal('modalGeneric');
  }
};
