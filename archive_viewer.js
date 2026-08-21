/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * PHÂN HỆ KHO HỒ SƠ SỐ HÓA LỊCH SỬ (DIGITAL HISTORICAL ARCHIVE)
 * (1.057.980 trang A4 / 137,4m hồ sơ đính kèm tra cứu đối chiếu)
 */

const ArchiveManager = {
  currentFilterDept: 'all',

  init(containerId) {
    if (containerId) {
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = `
          <div class="card" style="margin-bottom: 20px;">
            <div class="card-header">
              <div>
                <h3 class="card-title"><i data-lucide="archive"></i> Kho Hồ Sơ Số Hóa Lịch Sử (1.057.980 Trang PDF)</h3>
                <p class="card-subtitle">Tra cứu toàn văn tài liệu scan gốc có đính kèm Metadata và xem trực tiếp với Watermark bảo mật</p>
              </div>
              <div style="display: flex; gap: 8px;">
                <input type="text" class="form-control" placeholder="Tìm theo tên hồ sơ, số hiệu, đơn vị..." style="width: 280px;" oninput="ArchiveManager.handleSearch(this)" />
              </div>
            </div>

            <div class="tabs-nav" id="archiveDeptFilter" style="margin-bottom: 16px;">
              <button class="tab-btn active" onclick="ArchiveManager.filterDept('all', this)"><i data-lucide="layers"></i> Tất cả lĩnh vực</button>
              <button class="tab-btn" onclick="ArchiveManager.filterDept('Ngân Sách', this)"><i data-lucide="pie-chart"></i> Kinh tế & ngân sách</button>
              <button class="tab-btn" onclick="ArchiveManager.filterDept('Đầu Tư Công', this)"><i data-lucide="hard-hat"></i> Đầu tư công</button>
              <button class="tab-btn" onclick="ArchiveManager.filterDept('Ngoài Ngân Sách', this)"><i data-lucide="building-2"></i> ĐT ngoài ngân sách</button>
              <button class="tab-btn" onclick="ArchiveManager.filterDept('Giá', this)"><i data-lucide="home"></i> Giá & công sản</button>
              <button class="tab-btn" onclick="ArchiveManager.filterDept('Sự Nghiệp', this)"><i data-lucide="graduation-cap"></i> Tài chính HCSN</button>
            </div>

            <div class="api-service-grid" id="digitalArchiveGrid"></div>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
      }
    }
    this.renderArchiveList();
  },

  renderArchiveList(searchTerm = '') {
    const container = document.getElementById('digitalArchiveGrid');
    if (!container) return;

    let list = APP_DATA.digitalArchive;
    if (this.currentFilterDept !== 'all') {
      list = list.filter(item => item.dept.includes(this.currentFilterDept));
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(item => 
        item.docId.toLowerCase().includes(q) || 
        item.title.toLowerCase().includes(q) || 
        item.regNumber.toLowerCase().includes(q) ||
        item.investor.toLowerCase().includes(q)
      );
    }

    container.innerHTML = list.map(doc => `
      <div class="card" style="padding: 18px; display: flex; flex-direction: column; gap: 10px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <span class="badge badge-purple">${doc.docId}</span>
          <span class="badge badge-info"><i class="lucide-file-text"></i> ${doc.totalPages} trang A4</span>
        </div>
        
        <div>
          <h4 style="font-size: 14px; font-weight: 700; color: #0f172a; line-height: 1.35; margin-bottom: 4px;">${doc.title}</h4>
          <span style="font-size: 11.5px; color: #0284c7; font-weight: 600;">${doc.dept}</span>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; font-size: 11.5px; display: flex; flex-direction: column; gap: 4px;">
          <div><span style="color: #64748b;">Số QĐ/VB:</span> <strong style="color: #0f172a;">${doc.regNumber}</strong> (${doc.issueDate})</div>
          <div><span style="color: #64748b;">Vị trí lưu kho:</span> ${doc.shelfLocation} - ${doc.boxNumber}</div>
          <div><span style="color: #64748b;">Thời hạn bảo quản:</span> <span class="badge badge-warning" style="font-size:10px;">${doc.retentionPeriod}</span></div>
          <div><span style="color: #64748b;">Liên kết CSDL:</span> <strong style="color: #15803d;">${doc.mappedRecord}</strong></div>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 6px;">
          <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="ArchiveManager.viewHistoricalDoc('${doc.docId}')">
            <i class="lucide-eye"></i> Xem văn bản số hóa
          </button>
          <button class="btn btn-secondary btn-sm" onclick="ArchiveManager.downloadDoc('${doc.docId}')">
            <i class="lucide-download"></i> Tải PDF
          </button>
        </div>
      </div>
    `).join('');
  },

  filterDept(deptKeyword, btn) {
    this.currentFilterDept = deptKeyword;
    document.querySelectorAll('#archiveDeptFilter .tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderArchiveList();
  },

  handleSearch(input) {
    this.renderArchiveList(input.value);
  },

  viewHistoricalDoc(docId) {
    const doc = APP_DATA.digitalArchive.find(d => d.docId === docId);
    if (!doc) return;

    const modalBody = document.getElementById('modalGenericBody');
    const modalTitle = document.getElementById('modalGenericTitle');
    
    modalTitle.innerHTML = `<i class="lucide-file-text" style="color: #38bdf8;"></i> Trình duyệt Hồ sơ Số hóa Lịch sử: [${doc.docId}]`;
    
    // Create Document Viewer with live watermark of current logged in user & timestamp
    const userName = App.currentUser.name;
    const nowStr = new Date().toLocaleString('vi-VN');

    modalBody.innerHTML = `
      <div class="document-viewer-container">
        <div class="document-viewer-toolbar">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span><i class="lucide-file"></i> ${doc.title.substring(0, 45)}...</span>
            <span class="badge badge-success">Chuẩn PDF/A-2b</span>
            <span class="badge badge-info">${doc.fileSize}</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang phóng to 125%', 'info')"><i class="lucide-zoom-in"></i></button>
            <button class="btn btn-secondary btn-sm" onclick="App.showNotification('Đang xoay trang 90 độ', 'info')"><i class="lucide-rotate-cw"></i></button>
            <button class="btn btn-primary btn-sm" onclick="ArchiveManager.downloadDoc('${doc.docId}')"><i class="lucide-download"></i> Tải bản gốc</button>
          </div>
        </div>

        <div style="overflow-y: auto; max-height: 480px; padding: 20px 0; background: #334155; position: relative;">
          <!-- Simulated Digitized Paper Sheet with Watermark -->
          <div class="document-page-sheet">
            <div class="watermark-overlay">
              KHÁNH HÒA FINANCE HUB<br>${userName} - ${nowStr}
            </div>

            <div style="text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 15px; margin-bottom: 20px;">
              <div style="font-weight: 700; font-size: 13px; text-transform: uppercase;">ỦY BAN NHÂN DÂN TỈNH KHÁNH HÒA</div>
              <div style="font-size: 11px; color: #475569;">SỞ TÀI CHÍNH TỈNH KHÁNH HÒA</div>
              <div style="font-weight: 700; margin-top: 10px; font-size: 14px; color: #b91c1c;">${doc.regNumber}</div>
            </div>

            <h3 style="text-align: center; font-size: 15px; font-weight: 800; text-transform: uppercase; margin-bottom: 16px; color: #0f172a;">
              ${doc.title}
            </h3>

            <p style="margin-bottom: 12px;"><strong>Căn cứ:</strong> Luật Quản lý Ngân sách Nhà nước, Luật Đầu tư và các Nghị định hướng dẫn thi hành hiện hành.</p>
            <p style="margin-bottom: 12px;"><strong>Chủ đầu tư / Đơn vị thực hiện:</strong> ${doc.investor}</p>
            <p style="margin-bottom: 12px;"><strong>Hồ sơ gốc số hóa:</strong> Thuộc ${doc.boxNumber}, lưu trữ tại ${doc.shelfLocation}, tổng cộng ${doc.totalPages} trang văn bản gốc có chữ ký và đóng dấu mộc đỏ pháp lý.</p>
            <p style="margin-bottom: 12px; color: #2563eb;"><strong>Liên kết CSDL Dữ liệu Kinh tế:</strong> Đã ánh xạ với bản ghi <code>${doc.mappedRecord}</code> để phục vụ tra cứu tức thời.</p>

            <div style="margin-top: 40px; display: flex; justify-content: space-between;">
              <div><em>Nơi nhận:</em><br>- Lưu: VT, ${doc.dept}</div>
              <div style="text-align: center;"><strong>GIÁM ĐỐC SỞ TÀI CHÍNH</strong><br><em>(Đã ký tên và đóng dấu số hóa)</em></div>
            </div>
          </div>
        </div>
      </div>
    `;

    App.openModal('modalGeneric');
  },

  downloadDoc(docId) {
    App.showNotification(`Đang xuất tệp PDF/A chuẩn có chữ ký số của hồ sơ [${docId}]...`, 'success');
  }
};

const ArchiveViewerManager = ArchiveManager;
