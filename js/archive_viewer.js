/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * PHÂN HỆ HỒ SƠ SỐ HÓA & PHÂN QUYỀN TRUY CẬP (DIGITAL ARCHIVES)
 */

const ArchiveManager = {
  currentViewTab: 'scan_ocr', // 'scan_ocr', 'extracted_matrix', 'permissions_log'
  currentFilterDept: 'all',
  currentSearchTerm: '',

  init(containerId) {
    if (!containerId) return;
    const container = document.getElementById(containerId);
    if (!container) return;

    const currentDeptId = DeptWorkspaceManager.currentDeptId || 'lanhdao';
    const config = DEPT_CONFIGS[currentDeptId] || DEPT_CONFIGS['lanhdao'];

    container.innerHTML = `
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header" style="flex-wrap: wrap; gap: 12px;">
          <div>
            <h3 class="card-title"><i data-lucide="archive"></i> Hồ sơ số hóa</h3>
            <p class="card-subtitle">Tra cứu và khai thác tài liệu số hóa theo thẩm quyền chuyên môn</p>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="badge badge-info" style="font-size: 12px; padding: 6px 12px;">
              <i data-lucide="shield"></i> Quyền truy cập: <strong>${config.deptName}</strong>
            </div>
          </div>
        </div>

        <!-- 3 MAIN TABS -->
        <div class="tabs-nav" id="archiveMainTabNav" style="margin-bottom: 16px;">
          <button class="tab-btn ${this.currentViewTab === 'scan_ocr' ? 'active' : ''}" onclick="ArchiveManager.switchViewTab('scan_ocr', this)">
            <i data-lucide="file-text"></i> 1. Tra cứu & Xem hồ sơ
          </button>
          <button class="tab-btn ${this.currentViewTab === 'extracted_matrix' ? 'active' : ''}" onclick="ArchiveManager.switchViewTab('extracted_matrix', this)">
            <i data-lucide="table"></i> 2. Dữ liệu bóc tách
          </button>
          <button class="tab-btn ${this.currentViewTab === 'permissions_log' ? 'active' : ''}" onclick="ArchiveManager.switchViewTab('permissions_log', this)">
            <i data-lucide="shield-check"></i> 3. Phân quyền & Nhật ký khai thác
          </button>
        </div>

        <div id="archiveTabContentContainer"></div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.renderCurrentTabContent();
  },

  switchViewTab(tabKey, btn) {
    this.currentViewTab = tabKey;
    document.querySelectorAll('#archiveMainTabNav .tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderCurrentTabContent();
  },

  renderCurrentTabContent() {
    const container = document.getElementById('archiveTabContentContainer');
    if (!container) return;

    if (this.currentViewTab === 'scan_ocr') {
      this.renderScanOcrView(container);
    } else if (this.currentViewTab === 'extracted_matrix') {
      this.renderExtractedMatrixView(container);
    } else if (this.currentViewTab === 'permissions_log') {
      this.renderPermissionsLogView(container);
    }

    if (window.lucide) window.lucide.createIcons();
  },

  // Check if current user has permission to view doc
  checkPermission(doc) {
    const currentDeptId = DeptWorkspaceManager.currentDeptId || 'lanhdao';
    // Lãnh đạo Sở & Quản trị hệ thống xem toàn bộ
    if (currentDeptId === 'lanhdao' || currentDeptId === 'admin') return true;
    // Chuyên viên phòng nào được xem toàn bộ hồ sơ của phòng mình
    if (doc.deptCode === currentDeptId) return true;
    // Kiểm tra allowedRoles nếu có
    if (doc.allowedRoles && (doc.allowedRoles.includes(currentDeptId) || doc.allowedRoles.includes(currentDeptId.toUpperCase()))) return true;
    // Tài liệu công khai
    if (doc.securityLevel === 'PUBLIC') return true;
    return false;
  },

  // TAB 1: SCAN OCR & DOCUMENTS LIST
  renderScanOcrView(container) {
    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
        <div class="tabs-nav" id="archiveDeptFilter" style="margin-bottom: 0;">
          <button class="tab-btn ${this.currentFilterDept === 'all' ? 'active' : ''}" onclick="ArchiveManager.filterDept('all', this)"><i data-lucide="layers"></i> Tất cả lĩnh vực</button>
          <button class="tab-btn ${this.currentFilterDept === 'ktns' ? 'active' : ''}" onclick="ArchiveManager.filterDept('ktns', this)"><i data-lucide="pie-chart"></i> Kinh tế và Ngân sách</button>
          <button class="tab-btn ${this.currentFilterDept === 'dtc' ? 'active' : ''}" onclick="ArchiveManager.filterDept('dtc', this)"><i data-lucide="hard-hat"></i> Quản lý Đầu tư công</button>
          <button class="tab-btn ${this.currentFilterDept === 'dtns' ? 'active' : ''}" onclick="ArchiveManager.filterDept('dtns', this)"><i data-lucide="building-2"></i> Quản lý Đầu tư ngoài ngân sách</button>
          <button class="tab-btn ${this.currentFilterDept === 'giacongsan' ? 'active' : ''}" onclick="ArchiveManager.filterDept('giacongsan', this)"><i data-lucide="home"></i> Quản lý Giá và Công sản</button>
          <button class="tab-btn ${this.currentFilterDept === 'doanhnghiep' ? 'active' : ''}" onclick="ArchiveManager.filterDept('doanhnghiep', this)"><i data-lucide="briefcase"></i> Quản lý Doanh nghiệp</button>
          <button class="tab-btn ${this.currentFilterDept === 'hcsn' ? 'active' : ''}" onclick="ArchiveManager.filterDept('hcsn', this)"><i data-lucide="graduation-cap"></i> Tài chính Hành chính sự nghiệp</button>
          <button class="tab-btn ${this.currentFilterDept === 'phapche' ? 'active' : ''}" onclick="ArchiveManager.filterDept('phapche', this)"><i data-lucide="gavel"></i> Phòng Pháp chế</button>
        </div>
        <div style="display: flex; gap: 8px;">
          <input type="text" class="form-control" placeholder="Tìm theo tên hồ sơ, số QĐ, đối tượng..." style="width: 280px;" value="${this.currentSearchTerm}" oninput="ArchiveManager.handleSearch(this)" />
        </div>
      </div>

      <div class="api-service-grid" id="digitalArchiveGrid"></div>
    `;

    this.renderArchiveCards();
  },

  renderArchiveCards() {
    const grid = document.getElementById('digitalArchiveGrid');
    if (!grid) return;

    let list = APP_DATA.digitalArchive || [];
    if (this.currentFilterDept !== 'all') {
      list = list.filter(item => item.deptCode === this.currentFilterDept);
    }
    if (this.currentSearchTerm) {
      const q = this.currentSearchTerm.toLowerCase();
      list = list.filter(item => 
        item.docId.toLowerCase().includes(q) || 
        item.title.toLowerCase().includes(q) || 
        item.regNumber.toLowerCase().includes(q) ||
        (item.investor && item.investor.toLowerCase().includes(q))
      );
    }

    grid.innerHTML = list.map(doc => {
      const hasPerm = this.checkPermission(doc);
      
      let secBadge = '';
      if (doc.securityLevel === 'PUBLIC') secBadge = `<span class="badge badge-success">Công khai</span>`;
      else if (doc.securityLevel === 'INTERNAL') secBadge = `<span class="badge badge-info">Nội bộ</span>`;
      else if (doc.securityLevel === 'RESTRICTED') secBadge = `<span class="badge badge-warning">Hạn chế</span>`;
      else if (doc.securityLevel === 'CONFIDENTIAL') secBadge = `<span class="badge badge-danger">Mật</span>`;

      return `
        <div class="card" style="padding: 16px; display: flex; flex-direction: column; gap: 10px; background: #ffffff; border: 1px solid ${hasPerm ? '#e2e8f0' : '#fed7aa'}; border-radius: 10px; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="badge badge-secondary" style="font-family: monospace; font-size: 11px;">${doc.docId}</span>
            <div style="display: flex; gap: 6px; align-items: center;">
              ${secBadge}
              <span class="badge badge-secondary" style="font-size: 10.5px;">${doc.totalPages} trang</span>
            </div>
          </div>
          
          <div>
            <h4 style="font-size: 13.5px; font-weight: 700; color: #0f172a; line-height: 1.4; margin-bottom: 3px;">${doc.title}</h4>
            <span style="font-size: 11.5px; color: #0284c7; font-weight: 600;">${doc.dept}</span>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 7px 10px; font-size: 12px; display: flex; justify-content: space-between; align-items: center;">
            <div><span style="color: #64748b;">Số văn bản:</span> <strong style="color: #0f172a;">${doc.regNumber}</strong></div>
            <div><span style="color: #64748b;">Ban hành:</span> <span style="color: #334155; font-weight: 600;">${doc.issueDate}</span></div>
          </div>

          ${hasPerm ? `
            <div style="display: flex; gap: 8px; margin-top: 2px; padding-top: 8px; border-top: 1px solid #f1f5f9;">
              <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="ArchiveManager.viewHistoricalDoc('${doc.docId}')">
                <i data-lucide="file-text"></i> Xem văn bản
              </button>
              <button class="btn btn-secondary btn-sm" onclick="ArchiveManager.viewExtractedDataSingle('${doc.docId}')">
                <i data-lucide="table"></i> Bóc tách
              </button>
            </div>
          ` : `
            <div style="display: flex; gap: 8px; margin-top: 2px; padding-top: 8px; border-top: 1px solid #f1f5f9;">
              <button class="btn btn-secondary btn-sm" style="flex: 1; opacity: 0.7;" disabled>
                <i data-lucide="lock"></i> Ngoài phân quyền
              </button>
              <button class="btn btn-warning btn-sm" onclick="ArchiveManager.requestAccess('${doc.docId}', '${doc.title}')">
                <i data-lucide="key"></i> Xin cấp quyền
              </button>
            </div>
          `}
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  // TAB 2: EXTRACTED STRUCTURED DATA MATRIX
  renderExtractedMatrixView(container) {
    let list = APP_DATA.digitalArchive || [];
    if (this.currentFilterDept !== 'all') {
      list = list.filter(item => item.deptCode === this.currentFilterDept);
    }

    container.innerHTML = `
      <div style="margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <p style="font-size: 12.5px; color: #475569; margin: 0;">
          Dữ liệu trường thông tin được trích xuất tự động qua công nghệ OCR kết hợp đối soát thẩm tra nghiệp vụ:
        </p>
        <span class="badge badge-success"><i data-lucide="check-circle-2"></i> Đã chuẩn hóa 100% Metadata</span>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 110px;">Mã hồ sơ</th>
              <th style="width: 220px;">Tên hồ sơ / Quyết định</th>
              <th style="width: 140px;">Lĩnh vực</th>
              <th>Dữ liệu bóc tách trường thông tin trọng tâm</th>
              <th style="width: 110px; text-align: center;">Mức bảo mật</th>
              <th style="width: 100px; text-align: center;">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            ${list.map(doc => {
              const hasPerm = this.checkPermission(doc);
              const fields = doc.extractedData || {};

              return `
                <tr style="${!hasPerm ? 'background: #fff7ed;' : ''}">
                  <td><strong style="color: #0284c7;">${doc.docId}</strong><br><small style="color: #64748b;">${doc.regNumber}</small></td>
                  <td>
                    <strong style="color: #0f172a; font-size: 12px;">${doc.title}</strong>
                    <div style="color: #64748b; font-size: 11px; margin-top: 2px;">Chủ thể: ${doc.investor || '---'}</div>
                  </td>
                  <td><span class="badge badge-secondary">${doc.dept}</span></td>
                  <td>
                    ${hasPerm ? `
                      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 6px; font-size: 11px;">
                        ${Object.entries(fields).map(([k, v]) => `
                          <div style="background: #f8fafc; padding: 4px 8px; border-radius: 4px; border: 1px solid #e2e8f0;">
                            <span style="color: #64748b;">${k}:</span> <strong style="color: #0f172a;">${v}</strong>
                          </div>
                        `).join('')}
                      </div>
                    ` : `
                      <div style="color: #ea580c; font-size: 11.5px; font-weight: 600; padding: 6px 0;">
                        <i data-lucide="lock" style="width: 13px; height: 13px; display: inline-block; vertical-align: -2px;"></i> Nội dung bảo mật [${doc.securityLevel}] - Giới hạn theo phân quyền phòng chuyên môn.
                      </div>
                    `}
                  </td>
                  <td style="text-align: center;">
                    <span class="badge ${doc.securityLevel === 'PUBLIC' ? 'badge-success' : doc.securityLevel === 'INTERNAL' ? 'badge-info' : doc.securityLevel === 'RESTRICTED' ? 'badge-warning' : 'badge-danger'}">
                      ${doc.securityLevel}
                    </span>
                  </td>
                  <td style="text-align: center;">
                    ${hasPerm ? `
                      <button class="btn btn-primary btn-sm" onclick="ArchiveManager.viewHistoricalDoc('${doc.docId}')">
                        <i data-lucide="eye"></i> Xem
                      </button>
                    ` : `
                      <button class="btn btn-warning btn-sm" onclick="ArchiveManager.requestAccess('${doc.docId}', '${doc.title}')">
                        <i data-lucide="key"></i> Xin quyền
                      </button>
                    `}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  // TAB 3: PERMISSIONS & AUDIT LOGS
  renderPermissionsLogView(container) {
    container.innerHTML = `
      <div class="responsive-split-reverse-grid">
        <!-- RBAC MATRIX -->
        <div>
          <h4 style="font-size: 14px; font-weight: 700; color: var(--c-oceanic-azure); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="shield"></i> Ma trận phân quyền theo vai trò (RBAC)
          </h4>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Vai trò / Chức danh</th>
                  <th>Phạm vi hồ sơ</th>
                  <th>Quyền hạn</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Lãnh đạo Sở & Admin</strong></td>
                  <td>Toàn bộ 100% hồ sơ 7 phòng</td>
                  <td><span class="badge badge-success">Toàn quyền (Xem / Tải)</span></td>
                </tr>
                <tr>
                  <td><strong>Trưởng phòng chuyên môn</strong></td>
                  <td>Toàn bộ hồ sơ lĩnh vực phòng</td>
                  <td><span class="badge badge-info">Toàn quyền phòng</span></td>
                </tr>
                <tr>
                  <td><strong>Chuyên viên nghiệp vụ</strong></td>
                  <td>Hồ sơ phân công & Hồ sơ công khai</td>
                  <td><span class="badge badge-info">Xem & Khai thác</span></td>
                </tr>
                <tr>
                  <td><strong>Phòng ban chuyên môn khác</strong></td>
                  <td>Hồ sơ nội bộ / Mật của phòng khác</td>
                  <td><span class="badge badge-warning">Cần gửi yêu cầu phê duyệt</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- AUDIT TRAIL LOG -->
        <div>
          <h4 style="font-size: 14px; font-weight: 700; color: var(--c-oceanic-azure); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="history"></i> Nhật ký truy vết khai thác hồ sơ (Audit Trail)
          </h4>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Cán bộ tra cứu</th>
                  <th>Hồ sơ / Thao tác</th>
                  <th>Thời gian & IP</th>
                  <th>Watermark ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Phạm Minh Tuấn</strong><br><small style="color: #64748b;">Phòng QL Đầu tư công</small></td>
                  <td>Xem văn bản số hóa [DOC-DTC-00421]</td>
                  <td>2026-08-21 16:45<br><small>10.79.1.35</small></td>
                  <td><code>WM-DTC-9982</code></td>
                </tr>
                <tr>
                  <td><strong>Lê Thị Thu Hằng</strong><br><small style="color: #64748b;">Phòng Kinh tế và Ngân sách</small></td>
                  <td>Bóc tách dữ liệu [DOC-KTNS-00095]</td>
                  <td>2026-08-21 15:30<br><small>10.79.1.24</small></td>
                  <td><code>WM-KTNS-8812</code></td>
                </tr>
                <tr>
                  <td><strong>Châu Ngô Anh Nhân</strong><br><small style="color: #64748b;">Lãnh đạo Sở</small></td>
                  <td>Tải tệp PDF/A-2b [DOC-DN-00062]</td>
                  <td>2026-08-21 14:15<br><small>10.79.1.10</small></td>
                  <td><code>WM-DIR-7701</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  filterDept(deptKey, btn) {
    this.currentFilterDept = deptKey;
    document.querySelectorAll('#archiveDeptFilter .tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderArchiveCards();
  },

  handleSearch(input) {
    this.currentSearchTerm = input.value.trim();
    this.renderArchiveCards();
  },

  viewHistoricalDoc(docId) {
    const doc = APP_DATA.digitalArchive.find(d => d.docId === docId);
    if (!doc) return;

    const currentDeptId = DeptWorkspaceManager.currentDeptId || 'lanhdao';
    const config = DEPT_CONFIGS[currentDeptId] || DEPT_CONFIGS['lanhdao'];
    const currentUserName = config.name || "Cán bộ Sở Tài chính";
    const currentDeptName = config.title || config.deptName || "Sở Tài chính";
    const watermarkText = `BẢN SỐ HÓA - ${currentUserName.toUpperCase()} (${currentDeptName.toUpperCase()}) - ${new Date().toLocaleDateString('vi-VN')} - IP: 10.79.1.${Math.floor(Math.random()*50+10)}`;

    const modalTitle = document.getElementById('modalGenericTitle');
    const modalBody = document.getElementById('modalGenericBody');

    modalTitle.innerHTML = `<i data-lucide="file-text" style="color: #0284c7;"></i> Trình Xem Văn Bản Số Hóa: [${doc.docId}]`;
    modalBody.innerHTML = `
      <div class="document-viewer-container">
        <div class="document-viewer-toolbar">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-weight: 700; font-size: 13px; color: #38bdf8;">${doc.regNumber}</span>
            <span class="badge badge-info" style="font-size: 11px;">Trang 1 / ${doc.totalPages} (PDF/A-2b OCR Full-Text)</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang phóng to văn bản...', 'info')"><i data-lucide="zoom-in"></i> Phóng to</button>
            <button class="btn btn-secondary btn-sm" onclick="ArchiveManager.downloadDoc('${doc.docId}')"><i data-lucide="download"></i> Tải PDF</button>
          </div>
        </div>

        <div style="padding: 24px; max-height: 520px; overflow-y: auto; background: #334155;">
          <div class="document-page-sheet">
            <div class="watermark-overlay">${watermarkText}</div>
            
            <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #0f172a; padding-bottom: 14px; margin-bottom: 20px;">
              <div style="text-align: center;">
                <div style="font-size: 12px; font-weight: 700;">ỦY BAN NHÂN DÂN<br>TỈNH KHÁNH HÒA</div>
                <div style="font-size: 11px; font-weight: 600; margin-top: 4px;">Số: ${doc.regNumber}</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 12px; font-weight: 700;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br><span style="font-size: 11px; font-weight: 600;">Độc lập - Tự do - Hạnh phúc</span></div>
                <div style="font-size: 11px; font-style: italic; margin-top: 4px;">Khánh Hòa, ngày ${doc.issueDate.split('-').reverse().join(' tháng ')} năm ${doc.issueDate.split('-')[0]}</div>
              </div>
            </div>

            <div style="text-align: center; margin: 20px 0;">
              <h3 style="font-size: 15px; font-weight: 800; text-transform: uppercase; color: #0f172a;">${doc.title}</h3>
            </div>

            <div style="line-height: 1.8; text-align: justify; font-size: 12.5px; color: #1e293b;">
              <p><strong>Căn cứ:</strong> Luật Tổ chức chính quyền địa phương ngày 19 tháng 6 năm 2015;</p>
              <p><strong>Căn cứ:</strong> Luật Quản lý, sử dụng tài sản công và các văn bản quy phạm pháp luật hiện hành liên quan;</p>
              <p><strong>Xét đề nghị của:</strong> ${doc.dept} tại Tờ trình và biên bản thẩm định số ${doc.docId}/TTr-STC;</p>
              <p style="text-align: center; font-weight: 700; margin: 14px 0;">QUYẾT ĐỊNH:</p>
              <p><strong>Điều 1.</strong> Phê duyệt nội dung hồ sơ đối với: <strong>${doc.investor || doc.title}</strong>.</p>
              <p><strong>Điều 2.</strong> Giao Giám đốc Sở Tài chính, Chánh Văn phòng UBND tỉnh và Thủ trưởng các đơn vị có liên quan chịu trách nhiệm thi hành Quyết định này.</p>
            </div>

            <div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px;">
              <div style="font-size: 11px; color: #475569;">
                <strong>Nơi nhận:</strong><br>
                - Như Điều 2;<br>
                - Lưu: VT, ${doc.deptCode.toUpperCase()}.
              </div>
              <div style="text-align: center;">
                <div style="font-weight: 700; font-size: 12.5px;">TM. ỦY BAN NHÂN DÂN<br>CHỦ TỊCH</div>
                <div style="margin-top: 30px; font-weight: 700; color: #b91c1c;">(Đã ký và đóng dấu đỏ số hóa)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    App.openModal('modalGeneric');
    if (window.lucide) window.lucide.createIcons();
  },

  viewExtractedDataSingle(docId) {
    const doc = APP_DATA.digitalArchive.find(d => d.docId === docId);
    if (!doc) return;

    const modalTitle = document.getElementById('modalGenericTitle');
    const modalBody = document.getElementById('modalGenericBody');

    modalTitle.innerHTML = `<i data-lucide="table" style="color: #0284c7;"></i> Dữ Liệu Bóc Tách Chi Tiết: [${doc.docId}]`;
    modalBody.innerHTML = `
      <div style="margin-bottom: 16px;">
        <h4 style="font-size: 14px; font-weight: 700; color: #0f172a;">${doc.title}</h4>
        <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Số VB: <strong>${doc.regNumber}</strong> | Lĩnh vực: <strong>${doc.dept}</strong></div>
      </div>

      <div class="table-container" style="margin-bottom: 16px;">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 220px;">Tên trường thông tin</th>
              <th>Giá trị trích xuất chuẩn hóa</th>
              <th style="width: 140px;">Độ tin cậy OCR</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(doc.extractedData || {}).map(([k, v]) => `
              <tr>
                <td><strong style="color: #334155;">${k}</strong></td>
                <td><span style="color: #0f172a; font-weight: 600;">${v}</span></td>
                <td><span class="badge badge-success"><i data-lucide="check"></i> 99.8% Chính xác</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 14px; font-size: 12px; color: #166534; display: flex; align-items: center; justify-content: space-between;">
        <span><i data-lucide="check-circle-2" style="display: inline-block; vertical-align: -2px;"></i> Dữ liệu trích xuất đã được đối soát chuẩn hóa 100%</span>
        <button class="btn btn-primary btn-sm" onclick="App.showNotification('Dữ liệu đã được lưu trữ và đồng bộ thành công!', 'success')">Xác nhận dữ liệu</button>
      </div>
    `;

    App.openModal('modalGeneric');
    if (window.lucide) window.lucide.createIcons();
  },

  downloadDoc(docId) {
    App.showNotification(`Đang tạo tệp PDF/A-2b có watermark bảo mật danh tính cho hồ sơ [${docId}]...`, 'info');
    setTimeout(() => {
      App.showNotification(`Đã xuất bản tệp [${docId}.pdf] thành công!`, 'success');
    }, 1000);
  },

  requestAccess(docId, docTitle) {
    const currentDeptId = DeptWorkspaceManager.currentDeptId || 'lanhdao';
    const config = DEPT_CONFIGS[currentDeptId] || DEPT_CONFIGS['lanhdao'];
    App.showNotification(`Đã gửi phiếu yêu cầu cấp quyền truy cập [${docId}] tới Lãnh đạo Sở và Trưởng phòng phụ trách!`, 'success');
  }
};

window.ArchiveViewerManager = ArchiveManager;
