/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * PHÂN HỆ ĐIỀU HÀNH & GIÁM SÁT KINH TẾ CHUYÊN BIỆT TỪNG LĨNH VỰC NGHIỆP VỤ
 * (Cụ thể hóa từ tổng thể nền kinh tế tỉnh đến từng lĩnh vực chuyên môn sâu)
 */

const DeptWorkspaceManager = {
  currentDeptId: 'lanhdao',
  currentTab: 'dashboard',
  currentFilters: {
    year: '2026',
    period: 'all',
    region: 'all',
    sector: 'all',
    query: ''
  },

  refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try {
        window.lucide.createIcons();
      } catch (err) {
        console.warn('Lucide icon rendering warning:', err);
      }
    }
  },

  renderGlobalFilterBar() {
    const f = this.currentFilters;
    return `
      <div class="global-filter-bar" id="appGlobalFilterBar">
        <!-- HÀNG 1: 4 BỘ CHỌN CHIỀU DỮ LIỆU ĐỒNG NHẤT 100% -->
        <div class="filter-row-selectors">
          <!-- 1. Năm ngân sách -->
          <div class="filter-item">
            <label class="filter-label"><i data-lucide="calendar"></i> Năm:</label>
            <select class="filter-select" id="filterYearSelect" onchange="DeptWorkspaceManager.handleFilterChange()">
              <option value="2026" ${f.year === '2026' ? 'selected' : ''}>2026</option>
              <option value="2025" ${f.year === '2025' ? 'selected' : ''}>2025</option>
              <option value="2024" ${f.year === '2024' ? 'selected' : ''}>2024</option>
              <option value="all" ${f.year === 'all' ? 'selected' : ''}>2021-2026</option>
            </select>
          </div>

          <!-- 2. Kỳ điều hành -->
          <div class="filter-item">
            <label class="filter-label"><i data-lucide="clock"></i> Kỳ:</label>
            <select class="filter-select" id="filterPeriodSelect" onchange="DeptWorkspaceManager.handleFilterChange()">
              <option value="all" ${f.period === 'all' ? 'selected' : ''}>Cả năm</option>
              <option value="6m" ${f.period === '6m' ? 'selected' : ''}>Lũy kế 6T</option>
              <option value="q1" ${f.period === 'q1' ? 'selected' : ''}>Quý I</option>
              <option value="q2" ${f.period === 'q2' ? 'selected' : ''}>Quý II</option>
              <option value="q3" ${f.period === 'q3' ? 'selected' : ''}>Quý III</option>
              <option value="q4" ${f.period === 'q4' ? 'selected' : ''}>Quý IV</option>
              <option value="m8" ${f.period === 'm8' ? 'selected' : ''}>Tháng 8</option>
            </select>
          </div>

          <!-- 3. Địa bàn 65 xã/phường -->
          <div class="filter-item filter-item-region">
            <label class="filter-label"><i data-lucide="map-pin"></i> Địa bàn:</label>
            <select class="filter-select" id="filterRegionSelect" onchange="DeptWorkspaceManager.handleFilterChange()">
              <option value="all" ${f.region === 'all' ? 'selected' : ''}>Toàn tỉnh (65 đơn vị cơ sở)</option>
              <optgroup label="16 Phường đô thị">
                <option value="KH65_49" ${f.region === 'KH65_49' ? 'selected' : ''}>Phường Nha Trang</option>
                <option value="KH65_50" ${f.region === 'KH65_50' ? 'selected' : ''}>Phường Bắc Nha Trang</option>
                <option value="KH65_51" ${f.region === 'KH65_51' ? 'selected' : ''}>Phường Tây Nha Trang</option>
                <option value="KH65_52" ${f.region === 'KH65_52' ? 'selected' : ''}>Phường Nam Nha Trang</option>
                <option value="KH65_53" ${f.region === 'KH65_53' ? 'selected' : ''}>Phường Bắc Cam Ranh</option>
                <option value="KH65_54" ${f.region === 'KH65_54' ? 'selected' : ''}>Phường Cam Ranh</option>
                <option value="KH65_55" ${f.region === 'KH65_55' ? 'selected' : ''}>Phường Cam Linh</option>
                <option value="KH65_56" ${f.region === 'KH65_56' ? 'selected' : ''}>Phường Ba Ngòi</option>
                <option value="KH65_57" ${f.region === 'KH65_57' ? 'selected' : ''}>Phường Ninh Hòa</option>
                <option value="KH65_58" ${f.region === 'KH65_58' ? 'selected' : ''}>Phường Đông Ninh Hòa</option>
                <option value="KH65_59" ${f.region === 'KH65_59' ? 'selected' : ''}>Phường Hòa Thắng</option>
                <option value="KH65_60" ${f.region === 'KH65_60' ? 'selected' : ''}>Phường Phan Rang</option>
                <option value="KH65_61" ${f.region === 'KH65_61' ? 'selected' : ''}>Phường Đông Hải</option>
                <option value="KH65_62" ${f.region === 'KH65_62' ? 'selected' : ''}>Phường Ninh Chữ</option>
                <option value="KH65_63" ${f.region === 'KH65_63' ? 'selected' : ''}>Phường Bảo An</option>
                <option value="KH65_64" ${f.region === 'KH65_64' ? 'selected' : ''}>Phường Tháp Chàm</option>
              </optgroup>
              <optgroup label="Xã & Đặc khu tiêu biểu">
                <option value="KH65_18" ${f.region === 'KH65_18' ? 'selected' : ''}>Xã Cam Lâm</option>
                <option value="KH65_12" ${f.region === 'KH65_12' ? 'selected' : ''}>Xã Diên Khánh</option>
                <option value="KH65_10" ${f.region === 'KH65_10' ? 'selected' : ''}>Xã Vạn Ninh (KKT Vân Phong)</option>
                <option value="KH65_34" ${f.region === 'KH65_34' ? 'selected' : ''}>Xã Cà Ná</option>
                <option value="KH65_37" ${f.region === 'KH65_37' ? 'selected' : ''}>Xã Ninh Hải</option>
                <option value="KH65_65" ${f.region === 'KH65_65' ? 'selected' : ''}>Đặc khu Trường Sa</option>
              </optgroup>
            </select>
          </div>

          <!-- 4. Lĩnh vực / Nguồn vốn -->
          <div class="filter-item filter-item-sector">
            <label class="filter-label"><i data-lucide="layers"></i> Lĩnh vực:</label>
            <select class="filter-select" id="filterSectorSelect" onchange="DeptWorkspaceManager.handleFilterChange()">
              <option value="all" ${f.sector === 'all' ? 'selected' : ''}>Tất cả nguồn & lĩnh vực</option>
              <option value="nsnn" ${f.sector === 'nsnn' ? 'selected' : ''}>Thu - Chi NSNN</option>
              <option value="dtc" ${f.sector === 'dtc' ? 'selected' : ''}>Đầu tư công (NSTW & NSĐP)</option>
              <option value="oda" ${f.sector === 'oda' ? 'selected' : ''}>Vốn ODA & Vay ưu đãi</option>
              <option value="dtns" ${f.sector === 'dtns' ? 'selected' : ''}>Đầu tư ngoài NS & FDI</option>
              <option value="land" ${f.sector === 'land' ? 'selected' : ''}>Tiền sử dụng đất & Thuê đất</option>
              <option value="tcdn" ${f.sector === 'tcdn' ? 'selected' : ''}>Tài chính Doanh nghiệp</option>
              <option value="hcsn" ${f.sector === 'hcsn' ? 'selected' : ''}>Đơn vị HCSN tự chủ</option>
              <option value="cs" ${f.sector === 'cs' ? 'selected' : ''}>Tài sản công & Xe công</option>
            </select>
          </div>
        </div>

        <!-- HÀNG 2: TÌM KIẾM NHANH & NÚT THAO TÁC XUẤT DỮ LIỆU -->
        <div class="filter-row-actions">
          <!-- Instant Search Input -->
          <div class="filter-search-box">
            <i data-lucide="search" class="search-icon"></i>
            <input type="text" id="globalSearchInput" class="filter-search-input" value="${f.query || ''}" placeholder="Tìm nhanh dự án, MST, doanh nghiệp, cơ quan..." oninput="DeptWorkspaceManager.handleSearchInput(this.value)">
            <button class="search-clear-btn" id="globalSearchClearBtn" onclick="DeptWorkspaceManager.clearSearch()" style="${f.query ? 'display: block;' : 'display: none;'}" title="Xóa tìm kiếm">✕</button>
          </div>

          <!-- Action Buttons -->
          <div class="filter-actions">
            <button class="btn btn-sm btn-outline" onclick="DeptWorkspaceManager.resetAllFilters()" title="Đặt lại bộ lọc về mặc định">
              <i data-lucide="rotate-ccw"></i> <span>Đặt lại</span>
            </button>
            <button class="btn btn-sm btn-primary" onclick="DeptWorkspaceManager.exportFilteredReport('excel')" title="Xuất dữ liệu đang lọc ra Excel">
              <i data-lucide="file-spreadsheet"></i> <span>Xuất Excel</span>
            </button>
            <button class="btn btn-sm btn-outline" onclick="DeptWorkspaceManager.exportFilteredReport('pdf')" title="Xuất / In báo cáo PDF">
              <i data-lucide="printer"></i> <span>In PDF</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  handleFilterChange() {
    const yearEl = document.getElementById('filterYearSelect');
    const periodEl = document.getElementById('filterPeriodSelect');
    const regionEl = document.getElementById('filterRegionSelect');
    const sectorEl = document.getElementById('filterSectorSelect');

    if (yearEl) this.currentFilters.year = yearEl.value;
    if (periodEl) this.currentFilters.period = periodEl.value;
    if (regionEl) this.currentFilters.region = regionEl.value;
    if (sectorEl) this.currentFilters.sector = sectorEl.value;

    if (window.AppState) {
      AppState.set('year', this.currentFilters.year);
      AppState.set('period', this.currentFilters.period);
      AppState.set('region', this.currentFilters.region);
      AppState.set('sector', this.currentFilters.sector);
    }

    this.filterTablesByRegion(this.currentFilters.region);

    App.showNotification(`Đã áp dụng bộ lọc: ${yearText} • ${periodText} • ${regionText}`, 'info');
  },

  applyRegionFilter(regionCode) {
    this.currentFilters.region = regionCode;
    const regionEl = document.getElementById('filterRegionSelect');
    if (regionEl) {
      regionEl.value = regionCode;
    }
    if (window.AppState) {
      AppState.set('region', regionCode, true);
    }
    this.filterTablesByRegion(regionCode);
  },

  filterTablesByRegion(regionCode) {
    let regionName = '';
    const geoData = window.khanhHoa65UnitsGeoJson || window.khanhHoaRealGeoJson;
    if (geoData && regionCode !== 'all') {
      const feat = geoData.features.find(f => f.properties.id === regionCode);
      if (feat) {
        regionName = feat.properties.name;
      }
    }

    const rows = document.querySelectorAll('.data-table tbody tr');
    rows.forEach(row => {
      if (!regionCode || regionCode === 'all') {
        row.style.display = '';
      } else {
        const text = row.innerText.toLowerCase();
        const cleanName = regionName.replace(/^(Phường|Xã|Đặc khu)\s+/i, '').toLowerCase();
        if (text.includes(regionName.toLowerCase()) || text.includes(cleanName)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      }
    });
  },

  handleSearchInput(val) {
    this.currentFilters.query = val;
    const clearBtn = document.getElementById('globalSearchClearBtn');
    if (clearBtn) clearBtn.style.display = val ? 'block' : 'none';

    const normalized = (val || '').trim().toLowerCase();
    const rows = document.querySelectorAll('.data-table tbody tr');

    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      if (!normalized || text.includes(normalized)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  },

  clearSearch() {
    this.currentFilters.query = '';
    const input = document.getElementById('globalSearchInput');
    if (input) input.value = '';
    const clearBtn = document.getElementById('globalSearchClearBtn');
    if (clearBtn) clearBtn.style.display = 'none';

    const rows = document.querySelectorAll('.data-table tbody tr');
    rows.forEach(row => {
      row.style.display = '';
    });
  },

  resetAllFilters() {
    this.currentFilters = {
      year: '2026',
      period: 'all',
      region: 'all',
      sector: 'all',
      query: ''
    };

    const yearEl = document.getElementById('filterYearSelect');
    const periodEl = document.getElementById('filterPeriodSelect');
    const regionEl = document.getElementById('filterRegionSelect');
    const sectorEl = document.getElementById('filterSectorSelect');
    const input = document.getElementById('globalSearchInput');
    const clearBtn = document.getElementById('globalSearchClearBtn');

    if (yearEl) yearEl.value = '2026';
    if (periodEl) periodEl.value = 'all';
    if (regionEl) regionEl.value = 'all';
    if (sectorEl) sectorEl.value = 'all';
    if (input) input.value = '';
    if (clearBtn) clearBtn.style.display = 'none';

    const rows = document.querySelectorAll('.data-table tbody tr');
    rows.forEach(row => {
      row.style.display = '';
    });

    App.showNotification('Đã đặt lại toàn bộ bộ lọc về trạng thái mặc định', 'success');
  },

  exportFilteredReport(type) {
    const f = this.currentFilters;
    if (type === 'excel') {
      const tables = document.querySelectorAll('.data-table');
      if (tables.length > 0) {
        let csvContent = '\uFEFF';
        csvContent += `BÁO CÁO DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA\r\n`;
        csvContent += `Phân hệ: ${DEPT_CONFIGS[this.currentDeptId]?.domainName || this.currentDeptId}\r\n`;
        csvContent += `Bộ lọc: Năm ${f.year} | Kỳ: ${f.period} | Địa bàn: ${f.region}\r\n`;
        csvContent += `Thời điểm xuất: ${new Date().toLocaleString('vi-VN')}\r\n\r\n`;

        tables.forEach((tbl) => {
          const rows = tbl.querySelectorAll('tr');
          rows.forEach(row => {
            if (row.style.display !== 'none') {
              const cells = Array.from(row.querySelectorAll('th, td')).map(c => `"${c.innerText.replace(/"/g, '""').trim()}"`);
              csvContent += cells.join(',') + '\r\n';
            }
          });
          csvContent += '\r\n';
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Bao_cao_Kinh_Te_${this.currentDeptId}_${f.year}_${f.period}.csv`;
        link.click();
        App.showNotification('Đã xuất thành công tệp dữ liệu báo cáo (.csv / Excel)!', 'success');
      } else {
        App.showNotification('Đã xuất cấu hình báo cáo theo bộ lọc hiện tại!', 'success');
      }
    } else if (type === 'pdf') {
      window.print();
    }
  },

  toggleTableFullscreen(wrapperId) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;

    wrapper.classList.toggle('is-fullscreen');
    const isFull = wrapper.classList.contains('is-fullscreen');
    const btn = wrapper.querySelector('.btn-fullscreen-toggle');
    if (btn) {
      btn.innerHTML = isFull 
        ? `<i data-lucide="minimize-2"></i> <span>Thu nhỏ</span>`
        : `<i data-lucide="maximize-2"></i> <span>Toàn màn hình</span>`;
    }

    if (isFull) {
      document.body.style.overflow = 'hidden';
      App.showNotification('Đã bật chế độ xem toàn màn hình (Bấm Esc hoặc nút Thu nhỏ để thoát)', 'info');
    } else {
      document.body.style.overflow = '';
    }

    if (window.lucide) window.lucide.createIcons();
  },

  exportTableToExcel(tableId, title = 'Báo cáo Dữ liệu') {
    const table = document.getElementById(tableId) || document.querySelector(`#${tableId} table`) || document.querySelector('.data-table');
    if (!table) {
      App.showNotification('Không tìm thấy bảng dữ liệu để xuất!', 'warning');
      return;
    }

    const f = this.currentFilters;
    let csvContent = '\uFEFF';
    csvContent += `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\r\nĐộc lập - Tự do - Hạnh phúc\r\n\r\n`;
    csvContent += `SỞ TÀI CHÍNH TỈNH KHÁNH HÒA\r\n`;
    csvContent += `HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA\r\n\r\n`;
    csvContent += `TIÊU ĐỀ BÁO CÁO: ${title.toUpperCase()}\r\n`;
    csvContent += `Phân hệ nghiệp vụ: ${DEPT_CONFIGS[this.currentDeptId]?.domainName || this.currentDeptId}\r\n`;
    csvContent += `Kỳ dữ liệu: Năm ${f.year} - Kỳ: ${f.period} | Địa bàn: ${f.region}\r\n`;
    csvContent += `Thời điểm kết xuất dữ liệu: ${new Date().toLocaleString('vi-VN')}\r\n\r\n`;

    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
      if (row.style.display !== 'none') {
        const cells = Array.from(row.querySelectorAll('th, td')).map(c => `"${c.innerText.replace(/"/g, '""').trim()}"`);
        csvContent += cells.join(',') + '\r\n';
      }
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const cleanFileName = title.toLowerCase().replace(/[^a-z0-9]/gi, '_').replace(/_+/g, '_');
    link.download = `${cleanFileName}_KhanhHoa_${f.year}.csv`;
    link.click();
    App.showNotification(`Đã xuất thành công bảng dữ liệu chuẩn hành chính (${title})!`, 'success');
  },

  printTableReport(tableId, title = 'Báo cáo Dữ liệu') {
    const table = document.getElementById(tableId) || document.querySelector(`#${tableId} table`) || document.querySelector('.data-table');
    if (!table) {
      window.print();
      return;
    }

    const printWin = window.open('', '_blank', 'width=1100,height=750');
    if (!printWin) {
      window.print();
      return;
    }

    const f = this.currentFilters;
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title} - Sở Tài chính tỉnh Khánh Hòa</title>
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Be Vietnam Pro', sans-serif; padding: 24px; color: #0f172a; }
          .header-table { width: 100%; margin-bottom: 20px; border: none; }
          .header-table td { border: none; padding: 4px; vertical-align: top; }
          h2 { text-align: center; color: #002B8C; margin: 16px 0 6px 0; text-transform: uppercase; font-size: 16px; }
          .sub-meta { text-align: center; font-size: 12px; color: #475569; margin-bottom: 20px; }
          table.data-table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
          table.data-table th, table.data-table td { border: 1px solid #cbd5e1; padding: 8px 10px; }
          table.data-table th { background: #f1f5f9; font-weight: 700; text-transform: uppercase; }
          .badge { padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 11px; }
          .badge-danger { color: #991b1b; }
          .badge-warning { color: #78350f; }
          .badge-success { color: #14532d; }
          .signature-section { margin-top: 40px; display: flex; justify-content: space-between; page-break-inside: avoid; }
          .signature-box { text-align: center; width: 220px; font-size: 12.5px; }
          .signature-box strong { display: block; margin-bottom: 60px; }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td style="text-align: left; width: 45%;">
              <strong>ỦY BAN NHÂN DÂN TỈNH KHÁNH HÒA</strong><br>
              <strong>SỞ TÀI CHÍNH</strong><br>
              <small>Số: ..../STC-BC</small>
            </td>
            <td style="text-align: center; width: 55%;">
              <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br>
              <strong>Độc lập - Tự do - Hạnh phúc</strong><br>
              <small><em>Khánh Hòa, ngày ${new Date().getDate()} tháng ${new Date().getMonth() + 1} năm ${new Date().getFullYear()}</em></small>
            </td>
          </tr>
        </table>

        <h2>${title}</h2>
        <div class="sub-meta">
          Bộ lọc: Năm ${f.year} | Kỳ điều hành: ${f.period} | Địa bàn: ${f.region}<br>
          Trích xuất từ: Hệ thống dữ liệu kinh tế tỉnh Khánh Hòa
        </div>

        <table class="data-table">
          ${table.innerHTML}
        </table>

        <div class="signature-section">
          <div class="signature-box">
            <strong>NGƯỜI LẬP BIỂU</strong>
            (Ký, ghi rõ họ tên)
          </div>
          <div class="signature-box">
            <strong>TRƯỞNG PHÒNG CHUYÊN MÔN</strong>
            (Ký, ghi rõ họ tên)
          </div>
          <div class="signature-box">
            <strong>GIÁM ĐỐC SỞ TÀI CHÍNH</strong>
            (Ký số, đóng dấu)
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 400);
          };
        </script>
      </body>
      </html>
    `);
    printWin.document.close();
  },

  renderAdminTableToolbar(wrapperId, tableId, title) {
    return `
      <div class="table-admin-toolbar">
        <div class="table-toolbar-title">
          <i data-lucide="table-2"></i> <span>${title}</span>
        </div>
        <div class="table-toolbar-actions">
          <button class="btn btn-sm btn-outline btn-fullscreen-toggle" onclick="DeptWorkspaceManager.toggleTableFullscreen('${wrapperId}')" title="Xem toàn màn hình không bị phân tâm">
            <i data-lucide="maximize-2"></i> <span>Toàn màn hình</span>
          </button>
          <button class="btn btn-sm btn-primary" onclick="DeptWorkspaceManager.exportTableToExcel('${tableId}', '${title}')" title="Xuất tệp Excel theo biểu mẫu quy định">
            <i data-lucide="file-spreadsheet"></i> <span>Xuất Excel</span>
          </button>
          <button class="btn btn-sm btn-outline" onclick="DeptWorkspaceManager.printTableReport('${tableId}', '${title}')" title="In báo cáo chuẩn phục vụ cuộc họp">
            <i data-lucide="printer"></i> <span>In PDF</span>
          </button>
        </div>
      </div>
    `;
  },

  openKpiDrilldownModal(encodedLabel, deptId) {
    const label = decodeURIComponent(encodedLabel || '');
    const modalTitleEl = document.getElementById('modalGenericTitle');
    const modalBodyEl = document.getElementById('modalGenericBody');
    const modalContainer = document.querySelector('#modalGeneric .modal-container');

    if (modalContainer) {
      modalContainer.classList.add('modal-xl');
    }

    let titleText = `Bảng Chi Tiết Chỉ Số Điều Hành: ${label}`;
    let bodyHtml = '';

    // 1. GIẢI NGÂN VỐN ĐẦU TƯ CÔNG / DỰ ÁN CHẬM GIẢI NGÂN
    if (label.includes('Giải ngân') || label.includes('Đầu tư công') || label.includes('chậm giải ngân') || label.includes('Dự án trong kế hoạch')) {
      titleText = `<i data-lucide="hard-hat" style="color: #002B8C;"></i> Chi Tiết Giải Ngân Vốn Đầu Tư Công & Các Dự Án Chậm Tiến Độ (Năm 2026)`;
      bodyHtml = `
        <div class="drilldown-stat-banner">
          <div class="drilldown-stat-item">
            <i data-lucide="layers" style="color: #002B8C;"></i>
            <span>Tổng số dự án: <strong>186 dự án</strong></span>
          </div>
          <div class="drilldown-stat-item">
            <i data-lucide="wallet" style="color: #002B8C;"></i>
            <span>Kế hoạch vốn 2026: <strong>11.480 tỷ đồng</strong></span>
          </div>
          <div class="drilldown-stat-item">
            <i data-lucide="trending-up" style="color: #14532d;"></i>
            <span>Đã giải ngân: <strong>7.850,4 tỷ đồng (68,38%)</strong></span>
          </div>
          <div class="drilldown-stat-item">
            <i data-lucide="alert-triangle" style="color: #991b1b;"></i>
            <span>Dự án chậm nghẽn (< 50%): <strong style="color: #991b1b;">5 dự án</strong></span>
          </div>
        </div>

        <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div style="font-size: 13px; font-weight: 700; color: #0f172a;">
            DANH SÁCH 5 DỰ ÁN GIẢI NGÂN CHẬM TIẾN ĐỘ & NGUY CƠ NGHẼN VỐN CẦN LÃNH ĐẠO SỞ CHỈ ĐẠO
          </div>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-sm btn-primary" onclick="App.showNotification('Đã phát lệnh đôn đốc khẩn cấp tới 5 Chủ đầu tư dự án chậm tiến độ!', 'warning')">
              <i data-lucide="send"></i> <span>Gửi văn bản đôn đốc khẩn</span>
            </button>
            <button class="btn btn-sm btn-outline" onclick="DeptWorkspaceManager.exportTableToExcel('modalTableDtc', 'Danh sách 5 dự án đầu tư công chậm tiến độ')">
              <i data-lucide="file-spreadsheet"></i> <span>Xuất Excel</span>
            </button>
            <button class="btn btn-sm btn-outline" onclick="DeptWorkspaceManager.printTableReport('modalTableDtc', 'Danh sách 5 dự án đầu tư công chậm tiến độ')">
              <i data-lucide="printer"></i> <span>In PDF</span>
            </button>
          </div>
        </div>

        <div class="table-scroll-container">
          <table class="data-table freeze-first" id="modalTableDtc">
            <thead>
              <tr>
                <th style="width: 100px;">Mã DA</th>
                <th>Tên Dự Án Đầu Tư Công & Địa Bàn</th>
                <th>Chủ Đầu Tư / Ban QLDA</th>
                <th style="text-align: right;">Kế Hoạch Vốn</th>
                <th style="text-align: right;">Đã Giải Ngân</th>
                <th style="text-align: center;">Tỷ Lệ</th>
                <th>Điểm Nghẽn Chính / Nguyên Nhân</th>
                <th style="text-align: center;">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: #fff1f2;">
                <td><code>DA-DTC-042</code></td>
                <td>
                  <strong>Đường trục chính KKT Vân Phong - Phân khu 3</strong><br>
                  <small style="color: #334155;">Địa bàn: Xã Vạn Ninh, tỉnh Khánh Hòa</small>
                </td>
                <td>Ban QLDA Khu Kinh tế Vân Phong</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700;">850 tỷ đồng</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #991b1b;">187,0 tỷ đồng</td>
                <td style="text-align: center;">
                  <span class="badge badge-danger" style="font-weight: 700;">22,0%</span>
                </td>
                <td style="color: #991b1b; font-size: 12px; font-weight: 600;">
                  <i data-lucide="alert-circle" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i>
                  Vướng bồi thường GPMB 42 hộ dân & xác định giá đất cụ thể
                </td>
                <td style="text-align: center;">
                  <button class="btn btn-sm btn-outline" onclick="App.showNotification('Đã mở hồ sơ kiểm tra chi tiết DA-DTC-042', 'info')">
                    <i data-lucide="eye"></i> Hồ sơ
                  </button>
                </td>
              </tr>

              <tr style="background: #fffbeb;">
                <td><code>DA-DTC-088</code></td>
                <td>
                  <strong>Hệ thống thoát nước & Xử lý nước thải Nam Cam Ranh</strong><br>
                  <small style="color: #334155;">Địa bàn: Phường Cam Linh & Phường Ba Ngòi</small>
                </td>
                <td>Ban QLDA Phát triển tỉnh Khánh Hòa</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700;">420 tỷ đồng</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #78350f;">147,0 tỷ đồng</td>
                <td style="text-align: center;">
                  <span class="badge badge-warning" style="font-weight: 700;">35,0%</span>
                </td>
                <td style="color: #78350f; font-size: 12px; font-weight: 600;">
                  <i data-lucide="alert-circle" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i>
                  Thủ tục điều chỉnh thiết kế cơ sở & đấu thầu thiết bị trạm bơm
                </td>
                <td style="text-align: center;">
                  <button class="btn btn-sm btn-outline" onclick="App.showNotification('Đã mở hồ sơ kiểm tra chi tiết DA-DTC-088', 'info')">
                    <i data-lucide="eye"></i> Hồ sơ
                  </button>
                </td>
              </tr>

              <tr style="background: #fffbeb;">
                <td><code>DA-DTC-115</code></td>
                <td>
                  <strong>Kè biển bảo vệ khu dân cư ven biển Cà Ná</strong><br>
                  <small style="color: #334155;">Địa bàn: Xã Cà Ná, tỉnh Khánh Hòa</small>
                </td>
                <td>Ban QLDA Nông nghiệp và PTNT</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700;">260 tỷ đồng</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #78350f;">104,0 tỷ đồng</td>
                <td style="text-align: center;">
                  <span class="badge badge-warning" style="font-weight: 700;">40,0%</span>
                </td>
                <td style="color: #78350f; font-size: 12px; font-weight: 600;">
                  <i data-lucide="alert-circle" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i>
                  Thời tiết sóng biển mùa gió chướng & thiếu nguồn vật liệu đá hộc
                </td>
                <td style="text-align: center;">
                  <button class="btn btn-sm btn-outline" onclick="App.showNotification('Đã mở hồ sơ kiểm tra chi tiết DA-DTC-115', 'info')">
                    <i data-lucide="eye"></i> Hồ sơ
                  </button>
                </td>
              </tr>

              <tr style="background: #fffbeb;">
                <td><code>DA-DTC-134</code></td>
                <td>
                  <strong>Nâng cấp mở rộng Bệnh viện Y học Cổ truyền tỉnh</strong><br>
                  <small style="color: #334155;">Địa bàn: Phường Nam Nha Trang</small>
                </td>
                <td>Ban QLDA Dân dụng và Công nghiệp</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700;">190 tỷ đồng</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #78350f;">81,7 tỷ đồng</td>
                <td style="text-align: center;">
                  <span class="badge badge-warning" style="font-weight: 700;">43,0%</span>
                </td>
                <td style="color: #78350f; font-size: 12px; font-weight: 600;">
                  <i data-lucide="alert-circle" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i>
                  Nhà thầu xây lắp thi công cầm chừng, đang thanh tra tiến độ
                </td>
                <td style="text-align: center;">
                  <button class="btn btn-sm btn-outline" onclick="App.showNotification('Đã mở hồ sơ kiểm tra chi tiết DA-DTC-134', 'info')">
                    <i data-lucide="eye"></i> Hồ sơ
                  </button>
                </td>
              </tr>

              <tr style="background: #fffbeb;">
                <td><code>DA-DTC-158</code></td>
                <td>
                  <strong>Trường THPT chuyên Lê Quý Đôn (Cơ sở mới)</strong><br>
                  <small style="color: #334155;">Địa bàn: Phường Tây Nha Trang</small>
                </td>
                <td>Ban QLDA Dân dụng và Công nghiệp</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700;">120 tỷ đồng</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #78350f;">54,0 tỷ đồng</td>
                <td style="text-align: center;">
                  <span class="badge badge-warning" style="font-weight: 700;">45,0%</span>
                </td>
                <td style="color: #78350f; font-size: 12px; font-weight: 600;">
                  <i data-lucide="alert-circle" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i>
                  Chờ phê duyệt thẩm định PCCC bổ sung & nghiệm thu giai đoạn 1
                </td>
                <td style="text-align: center;">
                  <button class="btn btn-sm btn-outline" onclick="App.showNotification('Đã mở hồ sơ kiểm tra chi tiết DA-DTC-158', 'info')">
                    <i data-lucide="eye"></i> Hồ sơ
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }
    // 2. TỔNG THU NGÂN SÁCH / DỰ TOÁN THU / THỰC THU / DOANH NGHIỆP TRỌNG ĐIỂM
    else if (label.includes('thu ngân sách') || label.includes('Thực thu') || label.includes('Dự toán thu') || label.includes('Thu từ DN')) {
      titleText = `<i data-lucide="receipt" style="color: #002B8C;"></i> Chi Tiết Thu Ngân Sách Nhà Nước Theo Sắc Thuế & Doanh Nghiệp Lớn`;
      bodyHtml = `
        <div class="drilldown-stat-banner">
          <div class="drilldown-stat-item">
            <i data-lucide="target" style="color: #002B8C;"></i>
            <span>Dự toán HĐND giao: <strong>18.100 tỷ đồng</strong></span>
          </div>
          <div class="drilldown-stat-item">
            <i data-lucide="trending-up" style="color: #14532d;"></i>
            <span>Thực thu lũy kế: <strong style="color: #14532d;">18.520,6 tỷ đồng (Đạt 102,3%)</strong></span>
          </div>
          <div class="drilldown-stat-item">
            <i data-lucide="award" style="color: #002B8C;"></i>
            <span>Thu từ DN trọng điểm: <strong>8.340,5 tỷ đồng (45%)</strong></span>
          </div>
          <div class="drilldown-stat-item">
            <i data-lucide="check-circle" style="color: #14532d;"></i>
            <span>Vượt chỉ tiêu: <strong>+420,6 tỷ đồng</strong></span>
          </div>
        </div>

        <div style="margin-bottom: 12px; display: flex; justify-content: flex-end; gap: 6px;">
          <button class="btn btn-sm btn-outline" onclick="DeptWorkspaceManager.exportTableToExcel('modalTableTaxpayers', 'Danh sách doanh nghiệp nộp thuế lớn')">
            <i data-lucide="file-spreadsheet"></i> <span>Xuất Excel</span>
          </button>
          <button class="btn btn-sm btn-outline" onclick="DeptWorkspaceManager.printTableReport('modalTableTaxpayers', 'Danh sách doanh nghiệp nộp thuế lớn')">
            <i data-lucide="printer"></i> <span>In PDF</span>
          </button>
        </div>

        <div class="table-scroll-container">
          <table class="data-table freeze-first" id="modalTableTaxpayers">
            <thead>
              <tr>
                <th>Mã Số Thuế</th>
                <th>Tên Đơn Vị / Doanh Nghiệp Đóng Góp Lớn</th>
                <th>Địa Bàn</th>
                <th style="text-align: right;">Dự Toán Giao</th>
                <th style="text-align: right;">Thực Nộp NSNN</th>
                <th style="text-align: center;">Tỷ Lệ Đạt</th>
                <th style="text-align: center;">Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>4200238910</code></td>
                <td><strong>Tổng Công ty Khánh Việt (KHATOCO)</strong></td>
                <td>Phường Nha Trang</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700;">3.500 tỷ đồng</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #14532d;">3.620,5 tỷ đồng</td>
                <td style="text-align: center;"><span class="badge badge-success">103,4%</span></td>
                <td style="text-align: center;"><span class="badge badge-success">Vượt chỉ tiêu</span></td>
              </tr>
              <tr>
                <td><code>4200429779</code></td>
                <td><strong>Công ty Yến Sào Khánh Hòa</strong></td>
                <td>Phường Nha Trang</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700;">2.100 tỷ đồng</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #14532d;">2.180,0 tỷ đồng</td>
                <td style="text-align: center;"><span class="badge badge-success">103,8%</span></td>
                <td style="text-align: center;"><span class="badge badge-success">Vượt chỉ tiêu</span></td>
              </tr>
              <tr>
                <td><code>4200789012</code></td>
                <td><strong>Công ty Bia Sài Gòn - Nam Trung Bộ</strong></td>
                <td>Xã Diên Khánh</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700;">1.500 tỷ đồng</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #78350f;">1.450,0 tỷ đồng</td>
                <td style="text-align: center;"><span class="badge badge-warning">96,7%</span></td>
                <td style="text-align: center;"><span class="badge badge-warning">Đang theo dõi</span></td>
              </tr>
              <tr>
                <td><code>4201123456</code></td>
                <td><strong>Công ty CP Điện lực Khánh Hòa</strong></td>
                <td>Phường Nha Trang</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700;">700 tỷ đồng</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #14532d;">720,0 tỷ đồng</td>
                <td style="text-align: center;"><span class="badge badge-success">102,8%</span></td>
                <td style="text-align: center;"><span class="badge badge-success">Đạt kế hoạch</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }
    // 3. VỐN FDI / DỰ ÁN NGOÀI NGÂN SÁCH
    else if (label.includes('FDI') || label.includes('ngoài ngân sách') || label.includes('Vốn đăng ký')) {
      titleText = `<i data-lucide="globe" style="color: #002B8C;"></i> Danh Mục Dự Án Đầu Tư Ngoài Ngân Sách & Doanh Nghiệp FDI`;
      bodyHtml = `
        <div class="drilldown-stat-banner">
          <div class="drilldown-stat-item">
            <i data-lucide="building-2" style="color: #002B8C;"></i>
            <span>Tổng số dự án theo dõi: <strong>142 dự án</strong></span>
          </div>
          <div class="drilldown-stat-item">
            <i data-lucide="globe" style="color: #002B8C;"></i>
            <span>Dự án FDI: <strong>38 dự án (485,6 triệu USD)</strong></span>
          </div>
          <div class="drilldown-stat-item">
            <i data-lucide="coins" style="color: #002B8C;"></i>
            <span>Tổng vốn đăng ký: <strong>86.450 tỷ đồng</strong></span>
          </div>
          <div class="drilldown-stat-item">
            <i data-lucide="alert-triangle" style="color: #991b1b;"></i>
            <span>Dự án chậm tiến độ: <strong style="color: #991b1b;">9 dự án</strong></span>
          </div>
        </div>

        <div style="margin-bottom: 12px; display: flex; justify-content: flex-end; gap: 6px;">
          <button class="btn btn-sm btn-outline" onclick="DeptWorkspaceManager.exportTableToExcel('modalTableFdi', 'Danh mục dự án ngoài ngân sách và FDI')">
            <i data-lucide="file-spreadsheet"></i> <span>Xuất Excel</span>
          </button>
          <button class="btn btn-sm btn-outline" onclick="DeptWorkspaceManager.printTableReport('modalTableFdi', 'Danh mục dự án ngoài ngân sách và FDI')">
            <i data-lucide="printer"></i> <span>In PDF</span>
          </button>
        </div>

        <div class="table-scroll-container">
          <table class="data-table freeze-first" id="modalTableFdi">
            <thead>
              <tr>
                <th>Mã Dự Án</th>
                <th>Tên Dự Án & Địa Bàn</th>
                <th>Nhà Đầu Tư</th>
                <th style="text-align: right;">Vốn Đăng Ký</th>
                <th>Quy Mô Đất</th>
                <th style="text-align: center;">Tiến Độ</th>
                <th style="text-align: center;">Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>DA-NNS-001</code></td>
                <td><strong>Khu đô thị sinh thái Bắc Cam Ranh</strong><br><small style="color: #334155;">Phường Bắc Cam Ranh</small></td>
                <td>Tập đoàn Phát triển Đô thị Khánh Hòa</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700;">4.850 tỷ đồng</td>
                <td>125,4 ha</td>
                <td style="text-align: center;"><span class="badge badge-warning">35%</span></td>
                <td style="text-align: center;"><span class="badge badge-warning">Đang GPMB</span></td>
              </tr>
              <tr>
                <td><code>DA-NNS-002</code></td>
                <td><strong>Tổ hợp nghỉ dưỡng & Sân golf Vĩnh Hy</strong><br><small style="color: #334155;">Xã Ninh Hải</small></td>
                <td>Công ty CP Đầu tư Biển Xanh</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700;">3.200 tỷ đồng</td>
                <td>88,0 ha</td>
                <td style="text-align: center;"><span class="badge badge-info">62%</span></td>
                <td style="text-align: center;"><span class="badge badge-info">Xây dựng hạ tầng</span></td>
              </tr>
              <tr>
                <td><code>DA-NNS-003</code></td>
                <td><strong>Nhà máy chế biến thủy sản công nghệ cao FDI</strong><br><small style="color: #334155;">KCN Nam Cam Ranh</small></td>
                <td>Maruha Nichiro Corporation (Nhật Bản)</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #14532d;">1.450 tỷ đồng (58 triệu USD)</td>
                <td>15,2 ha</td>
                <td style="text-align: center;"><span class="badge badge-success">94%</span></td>
                <td style="text-align: center;"><span class="badge badge-success">Chuẩn bị vận hành</span></td>
              </tr>
              <tr>
                <td><code>DA-NNS-004</code></td>
                <td><strong>Khu du lịch Hòn Tằm mở rộng</strong><br><small style="color: #334155;">Vịnh Nha Trang</small></td>
                <td>Công ty CP Hòn Tằm Biển Nha Trang</td>
                <td style="text-align: right; font-family: 'JetBrains Mono', monospace; font-weight: 700;">980 tỷ đồng</td>
                <td>22,5 ha</td>
                <td style="text-align: center;"><span class="badge badge-warning">20%</span></td>
                <td style="text-align: center;"><span class="badge badge-warning">Thủ tục đất đai</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }
    // 4. HỒ SƠ CHỜ PHÊ DUYỆT / HỒ SƠ KÊ KHAI
    else if (label.includes('phê duyệt') || label.includes('Hồ sơ') || label.includes('Văn bản')) {
      titleText = `<i data-lucide="check-square" style="color: #002B8C;"></i> Danh Sách Hồ Sơ & Tờ Trình Đang Chờ Lãnh Đạo Sở Phê Duyệt`;
      bodyHtml = `
        <div class="drilldown-stat-banner">
          <div class="drilldown-stat-item">
            <i data-lucide="inbox" style="color: #002B8C;"></i>
            <span>Hồ sơ chờ phê duyệt: <strong style="color: #991b1b;">6 hồ sơ</strong></span>
          </div>
          <div class="drilldown-stat-item">
            <i data-lucide="clock" style="color: #78350f;"></i>
            <span>Đúng hạn xử lý: <strong>100%</strong></span>
          </div>
          <div class="drilldown-stat-item">
            <i data-lucide="shield-check" style="color: #14532d;"></i>
            <span>Quy trình ký số: <strong>Nghị định 30/2020/NĐ-CP</strong></span>
          </div>
        </div>

        <div style="margin-bottom: 12px; display: flex; justify-content: flex-end; gap: 6px;">
          <button class="btn btn-sm btn-outline" onclick="DeptWorkspaceManager.exportTableToExcel('modalTableApprovals', 'Danh sách tờ trình và hồ sơ chờ duyệt')">
            <i data-lucide="file-spreadsheet"></i> <span>Xuất Excel</span>
          </button>
          <button class="btn btn-sm btn-outline" onclick="DeptWorkspaceManager.printTableReport('modalTableApprovals', 'Danh sách tờ trình và hồ sơ chờ duyệt')">
            <i data-lucide="printer"></i> <span>In PDF</span>
          </button>
        </div>

        <div class="table-scroll-container">
          <table class="data-table freeze-first" id="modalTableApprovals">
            <thead>
              <tr>
                <th>Mã Tờ Trình</th>
                <th>Nội Dung Tờ Trình Chuyên Môn</th>
                <th>Phòng Trình</th>
                <th>Người Ký Nháy</th>
                <th>Thời Hạn</th>
                <th style="text-align: center;">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>TT-DTC-2026-08</code></td>
                <td><strong>Tờ trình điều chỉnh kế hoạch vốn đầu tư công năm 2026 đợt 2</strong></td>
                <td>Phòng Quản lý Đầu tư công</td>
                <td>Phạm Minh Tuấn</td>
                <td style="color: #991b1b; font-weight: 700;">Hôm nay</td>
                <td style="text-align: center;">
                  <button class="btn btn-sm btn-primary" onclick="App.showNotification('Đã phê duyệt điện tử tờ trình TT-DTC-2026-08', 'success')">
                    <i data-lucide="check"></i> Duyệt
                  </button>
                </td>
              </tr>
              <tr>
                <td><code>TT-GCS-2026-14</code></td>
                <td><strong>Phương án thẩm định giá khởi điểm đấu giá cơ sở nhà đất cũ Cam Ranh</strong></td>
                <td>Phòng Quản lý Giá và Công sản</td>
                <td>Đặng Quốc Hưng</td>
                <td>25/08/2026</td>
                <td style="text-align: center;">
                  <button class="btn btn-sm btn-primary" onclick="App.showNotification('Đã phê duyệt điện tử tờ trình TT-GCS-2026-14', 'success')">
                    <i data-lucide="check"></i> Duyệt
                  </button>
                </td>
              </tr>
              <tr>
                <td><code>TT-HCSN-2026-22</code></td>
                <td><strong>Phương án tự chủ tài chính giai đoạn 2026-2028 Bệnh viện Đa khoa tỉnh</strong></td>
                <td>Phòng Tài chính Hành chính sự nghiệp</td>
                <td>Ngô Mỹ Linh</td>
                <td>28/08/2026</td>
                <td style="text-align: center;">
                  <button class="btn btn-sm btn-primary" onclick="App.showNotification('Đã phê duyệt điện tử tờ trình TT-HCSN-2026-22', 'success')">
                    <i data-lucide="check"></i> Duyệt
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }
    // 5. CÁC CHỈ SỐ MẶC ĐỊNH KHÁC
    else {
      titleText = `<i data-lucide="pie-chart" style="color: #002B8C;"></i> Chi Tiết Chỉ Số Nghiệp Vụ: ${label}`;
      bodyHtml = `
        <div class="drilldown-stat-banner">
          <div class="drilldown-stat-item">
            <i data-lucide="info" style="color: #002B8C;"></i>
            <span>Lĩnh vực chuyên môn: <strong>${DEPT_CONFIGS[deptId]?.deptName || deptId}</strong></span>
          </div>
          <div class="drilldown-stat-item">
            <i data-lucide="calendar" style="color: #002B8C;"></i>
            <span>Thời điểm tra cứu: <strong>${new Date().toLocaleDateString('vi-VN')}</strong></span>
          </div>
        </div>
        <p style="font-size: 13px; color: #1e293b; line-height: 1.6; margin-bottom: 14px;">
          Số liệu chi tiết được trích xuất trực tiếp từ CSDL Chuyên ngành Sở Tài chính tỉnh Khánh Hòa, kết nối liên thông qua hệ thống API Gateway thời gian thực.
        </p>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-sm btn-primary" onclick="DeptWorkspaceManager.exportFilteredReport('excel')">
            <i data-lucide="file-spreadsheet"></i> Xuất dữ liệu chi tiết (Excel)
          </button>
          <button class="btn btn-sm btn-secondary" onclick="App.closeModal('modalGeneric')">
            Đóng
          </button>
        </div>
      `;
    }

    if (modalTitleEl) modalTitleEl.innerHTML = titleText;
    if (modalBodyEl) modalBodyEl.innerHTML = bodyHtml;

    App.openModal('modalGeneric');
    if (window.lucide) window.lucide.createIcons();
  },

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
    this.refreshIcons();

    App.showNotification(`Đã chuyển sang: ${config.domainName}`, 'info');
  },

  renderDepartmentSidebar(config) {
    const navContainer = document.getElementById('dynamicSidebarNav');
    if (!navContainer) return;

    let navHtml = '';

    if (config.id === 'portal' || config.id.startsWith('portal_')) {
      const activeTab = (typeof ExternalPortalManager !== 'undefined') ? ExternalPortalManager.currentTab : 'tasks';
      navHtml = `
        <div class="nav-section-title">QUY TRÌNH 5 BƯỚC BÁO CÁO</div>
        <a class="nav-item ${activeTab === 'tasks' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('tasks', this)">
          <i data-lucide="git-pull-request"></i>
          <span>Nhiệm vụ & Quy trình 5 bước</span>
        </a>
        <a class="nav-item ${activeTab === 'fill_form' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('fill_form', this)">
          <i data-lucide="edit-3"></i>
          <span>Kê khai dự thảo báo cáo</span>
        </a>
        <a class="nav-item ${activeTab === 'history' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('history', this)">
          <i data-lucide="history"></i>
          <span>Lịch sử & Kết quả thẩm tra</span>
        </a>
        <a class="nav-item ${activeTab === 'guidance' ? 'active' : ''}" onclick="ExternalPortalManager.switchPortalTab('guidance', this)">
          <i data-lucide="book-open"></i>
          <span>Quy định & Biểu mẫu chuẩn</span>
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
    this.refreshIcons();
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
        // Ban Giám đốc Sở: Trung tâm Phê duyệt & Chỉ đạo Điều hành Liên phòng (Không hiển thị form nhập liệu của chuyên viên)
        container.innerHTML = `<div id="dynamicDeptFormContainer"></div>`;
        DataEntryManager.renderDirectorApprovalHub('dynamicDeptFormContainer');
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

    // Render Global Filter Bar directly without redundant header banner
    let contentHtml = this.renderGlobalFilterBar();

    // Render Stats Grid of this department
    contentHtml += `
      <div class="kpi-grid">
        ${config.stats.map(s => {
          const isAlert = s.trend && (s.trend.includes('-') || s.trend.includes('Cảnh báo') || s.trend.includes('chờ') || s.trend.includes('Ưu tiên') || s.trend.includes('chậm'));
          const isUp = s.trend && s.trend.includes('+');
          const trendIcon = isUp ? 'trending-up' : isAlert ? 'alert-triangle' : 'activity';
          const trendClass = isAlert ? 'trend-alert' : 'trend-positive';

          // Chuẩn hóa và định dạng đơn vị tiền tệ rõ ràng, sang trọng
          let valDisplay = String(s.value || '')
            .replace(/tỷ\s*(?:đồngồng|đồng|đ)/gi, 'tỷ đồng')
            .replace(/(?:triệu|tr)\s*(?:đồngồng|đồng|đ)/gi, 'triệu đồng')
            .replace(/(?:triệu|tr)\s*USD/gi, 'triệu USD')
            .replace(/tỷ\s*USD/gi, 'tỷ USD')
            .replace(/đồngồng+/gi, 'đồng');

          let unitDisplay = String(s.unit || '')
            .replace(/tỷ\s*(?:đồngồng|đồng|đ)/gi, 'tỷ đồng')
            .replace(/(?:triệu|tr)\s*(?:đồngồng|đồng|đ)/gi, 'triệu đồng')
            .replace(/(?:triệu|tr)\s*USD/gi, 'triệu USD')
            .replace(/tỷ\s*USD/gi, 'tỷ USD')
            .replace(/đồngồng+/gi, 'đồng');

          const valMatch = valDisplay.match(/^([\d.,\s/+\-%]+)\s+(.+)$/);
          const formattedMetricHtml = (valMatch && valMatch[2])
            ? `<span class="metric-val">${valMatch[1].trim()}</span> <span class="metric-unit">${valMatch[2].trim()}</span>`
            : `<span class="metric-val">${valDisplay}</span>`;

          return `
            <div class="kpi-card" onclick="DeptWorkspaceManager.openKpiDrilldownModal('${encodeURIComponent(s.label)}', '${deptId}')" title="Nhấp để mở rộng bảng chi tiết dữ liệu (Executive Drill-Down)">
              <div class="kpi-top-row">
                <span class="kpi-label">${s.label}</span>
                <div class="kpi-icon-pill ${s.color}">
                  <i data-lucide="${s.icon}"></i>
                </div>
              </div>
              
              <div class="kpi-main-metric">${formattedMetricHtml}</div>

              <div class="kpi-footer-row">
                <span class="kpi-context-text" title="${unitDisplay}">${unitDisplay}</span>
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
      if (document.getElementById('chartRevenueStructure')) ChartsManager.renderRevenueChart();
      if (document.getElementById('chartInvestmentProgress')) ChartsManager.renderInvestmentChart();
      if (document.getElementById('chartRiskScatter')) ChartsManager.renderRiskScatterPlot();
      if (document.getElementById('chartSectorDistribution')) ChartsManager.renderSectorPieChart();
      if (document.getElementById('sankeyFlowContainer')) ChartsManager.renderSankeyFlow();
      if (document.getElementById('khanhHoaGisMapContainer')) ChartsManager.renderKhanhHoaMap();

      if (deptId === 'admin' && window.ApiGatewayManager) {
        ApiGatewayManager.renderApiGateway('adminApiGatewayContainer');
      }
      if ((this.currentTab === 'entry' || this.currentTab === 'survey' || this.currentTab === 'data_entry') && window.DataEntryManager) {
        DataEntryManager.init();
      }
      this.refreshIcons();
    }, 50);
  },

  // 1. Màn hình Điều hành Kinh tế Tổng thể (Ban Giám đốc Sở)
  renderLanhDaoContent() {
    if (this.currentTab === 'approvals') {
      setTimeout(() => {
        DataEntryManager.renderDirectorApprovalHub('lanhDaoApprovalsContainer');
      }, 30);
      return `<div id="lanhDaoApprovalsContainer"></div>`;
    }

    return `
      <div class="dashboard-row">
        <div class="col-7">
          <div class="card" style="height: 100%; display: flex; flex-direction: column;">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="map-pin"></i> Bản đồ kinh tế không gian tỉnh Khánh Hòa (GIS)</h3>
              <div style="display: flex; gap: 6px; align-items: center;">
                <span class="badge badge-purple">65 Xã/Phường/Đặc khu</span>
                <span class="badge badge-info">OpenStreetMap</span>
              </div>
            </div>
            <div style="position: relative; width: 100%; flex: 1; min-height: 420px; border-radius: var(--radius-md); overflow: hidden; background: #e2e8f0;">
              <!-- Leaflet GIS Map Canvas (Full Area) -->
              <div id="khanhHoaGisMapContainer" style="width: 100%; height: 100%; min-height: 420px;"></div>

              <!-- Floating Glassmorphism District Inspector Panel -->
              <div class="map-district-floating-panel" id="mapDistrictInfo">
                <div class="district-info-header">
                  <div class="district-badge">
                    <i data-lucide="map-pin" style="width: 12px; height: 12px;"></i> Cấp xã/phường cơ sở
                  </div>
                  <h4 id="overlayDistrictName" class="district-name">Phường Nha Trang</h4>
                  <div class="district-meta-sub">Đơn vị hành chính trực thuộc tỉnh</div>
                </div>

                <div class="district-metrics-list">
                  <div class="district-metric-item">
                    <div class="metric-label">Thu NSNN trên địa bàn:</div>
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
                    <div id="overlayDistrictProjects" class="metric-val highlight-amber">4.200 DN (K = 1.50)</div>
                    <div class="metric-sub">Mật độ kinh doanh trọng điểm</div>
                  </div>
                </div>

                <button class="btn btn-soft-primary btn-sm" style="width: 100%; margin-top: 8px;" onclick="App.showNotification('Đang trích xuất báo cáo kinh tế chi tiết địa bàn...', 'info')">
                  <i data-lucide="file-bar-chart-2"></i> Xem báo cáo địa bàn
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-5">
          <div class="card" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div class="card-header" style="border-bottom: none; padding-bottom: 8px;">
                <div>
                  <h3 class="card-title"><i data-lucide="bar-chart-3"></i> Cơ cấu thu ngân sách theo sắc thuế</h3>
                  <p class="card-subtitle" style="margin: 0;">Đối chiếu Dự toán giao 2026 và Thực thu lũy kế</p>
                </div>
                <div style="display: flex; gap: 6px; align-items: center;">
                  <span class="chart-live-badge"><span class="pulse-dot"></span> Live</span>
                  <span class="badge badge-success">102,3% KH</span>
                </div>
              </div>

              <!-- Executive Metric Ribbon -->
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; padding: 8px 12px; background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; margin-bottom: 6px;">
                <div style="text-align: center;">
                  <div style="font-size: 10px; color: #64748b; font-weight: 700; text-transform: uppercase;">Thu nội địa</div>
                  <div style="font-size: 13px; font-weight: 800; color: #002B8C; margin-top: 2px;">15.420 Tỷ <small style="color: #16a34a; font-size: 10px;">(103%)</small></div>
                </div>
                <div style="text-align: center; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                  <div style="font-size: 10px; color: #64748b; font-weight: 700; text-transform: uppercase;">Thu XNK</div>
                  <div style="font-size: 13px; font-weight: 800; color: #0284c7; margin-top: 2px;">3.100,6 Tỷ <small style="color: #16a34a; font-size: 10px;">(99%)</small></div>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: 10px; color: #64748b; font-weight: 700; text-transform: uppercase;">Tổng thu NSNN</div>
                  <div style="font-size: 13px; font-weight: 800; color: #15803d; margin-top: 2px;">18.520,6 Tỷ <small style="color: #16a34a; font-size: 10px;">(102%)</small></div>
                </div>
              </div>

              <!-- Bar Chart Canvas -->
              <div class="chart-wrapper" style="height: 200px; padding: 0 4px;"><canvas id="chartRevenueStructure"></canvas></div>
            </div>

            <!-- Mini Progress Breakdown (Eliminates dead space) -->
            <div style="padding: 10px 14px; background: #f8fafc; border-top: 1px solid #e2e8f0; border-radius: 0 0 var(--radius-md) var(--radius-md); font-size: 11px;">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px 14px;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #475569;">Thu DNNN: <strong>4.380 Tỷ</strong></span>
                  <span style="color: #15803d; font-weight: 700;">104,3%</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #475569;">Thu FDI: <strong>2.150 Tỷ</strong></span>
                  <span style="color: #15803d; font-weight: 700;">102,4%</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #475569;">Ngoài QDoanh: <strong>4.920 Tỷ</strong></span>
                  <span style="color: #15803d; font-weight: 700;">102,5%</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #475569;">Thuế TNCN: <strong>1.640 Tỷ</strong></span>
                  <span style="color: #15803d; font-weight: 700;">102,5%</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #475569;">Tiền SD Đất: <strong>2.330 Tỷ</strong></span>
                  <span style="color: #b45309; font-weight: 700;">93,2%</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #475569;">Thuế XNK: <strong>3.100,6 Tỷ</strong></span>
                  <span style="color: #15803d; font-weight: 700;">106,9%</span>
                </div>
              </div>
            </div>
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
          <div class="table-fullscreen-wrapper" id="wrapper_vp_documents">
            ${this.renderAdminTableToolbar('wrapper_vp_documents', 'table_vp_documents', 'Văn bản chỉ đạo & điều hành phát hành gần nhất')}
            <div class="table-scroll-container">
              <table class="data-table freeze-first" id="table_vp_documents">
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
          <div class="table-fullscreen-wrapper" id="wrapper_vp_archives">
            ${this.renderAdminTableToolbar('wrapper_vp_archives', 'table_vp_archives', 'Tiến độ số hóa hồ sơ lưu trữ các phòng ban')}
            <div class="table-scroll-container">
              <table class="data-table freeze-first" id="table_vp_archives">
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
          <div class="table-fullscreen-wrapper" id="wrapper_ktns_taxpayers">
            ${this.renderAdminTableToolbar('wrapper_ktns_taxpayers', 'table_ktns_taxpayers', 'Doanh nghiệp có số nộp ngân sách lớn')}
            <div class="table-scroll-container">
              <table class="data-table freeze-first" id="table_ktns_taxpayers">
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
                      <td><strong style="color: #002B8C;">${k.actual}</strong></td>
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
          <div class="table-fullscreen-wrapper" id="wrapper_dtc_projects">
            ${this.renderAdminTableToolbar('wrapper_dtc_projects', 'table_dtc_projects', 'Tiến độ dự án đầu tư công trọng điểm')}
            <div class="table-scroll-container">
              <table class="data-table freeze-first" id="table_dtc_projects">
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
                    <tr data-project-id="${p.id}" onmouseenter="if(window.GisMapManager) GisMapManager.highlightProject('${p.id}')" onmouseleave="if(window.GisMapManager) GisMapManager.resetHighlight()" onclick="if(window.GisMapManager) GisMapManager.focusProject('${p.id}')" style="cursor: pointer;" title="Bấm hoặc rê chuột để định vị dự án trên bản đồ GIS">
                      <td><strong style="color: #002B8C;">${p.id}</strong></td>
                      <td><strong>${p.name}</strong></td>
                      <td>${p.owner}</td>
                      <td>${p.budget}</td>
                      <td><strong style="color: #14532d;">${p.disbursed}</strong></td>
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
      <div class="table-fullscreen-wrapper" id="wrapper_dtns_projects">
        ${this.renderAdminTableToolbar('wrapper_dtns_projects', 'table_dtns_projects', 'Danh mục dự án đầu tư ngoài ngân sách và dự án FDI')}
        <div class="table-scroll-container">
          <table class="data-table freeze-first" id="table_dtns_projects">
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
                  <td><strong style="color: #002B8C;">${p.id}</strong></td>
                  <td><strong>${p.name}</strong></td>
                  <td>${p.investor}</td>
                  <td><strong style="color: #14532d;">${p.capital}</strong></td>
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
          <div class="table-fullscreen-wrapper" id="wrapper_dn_companies">
            ${this.renderAdminTableToolbar('wrapper_dn_companies', 'table_dn_companies', 'Theo dõi BCTC và hiệu quả hoạt động doanh nghiệp')}
            <div class="table-scroll-container">
              <table class="data-table freeze-first" id="table_dn_companies">
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
                      <td><strong style="color: ${c.roa.includes('-') ? '#991b1b' : '#002B8C'};">${c.roa}</strong></td>
                      <td><strong style="color: ${c.roe.includes('-') ? '#991b1b' : '#002B8C'};">${c.roe}</strong></td>
                      <td><span class="badge ${c.risk === 'An toàn' ? 'badge-success' : c.risk === 'Trung bình' ? 'badge-warning' : 'badge-danger'}">${c.risk}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-5">
          <div class="card" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div class="card-header" style="border-bottom: none; padding-bottom: 6px;">
                <div>
                  <h3 class="card-title"><i data-lucide="radar"></i> Ma trận định vị rủi ro tài chính doanh nghiệp</h3>
                  <p class="card-subtitle" style="margin: 0;">Tương quan Tỷ suất ROA (%) vs Điểm tuân thủ Thuế & BCTC</p>
                </div>
                <span class="badge badge-warning">02 DN Cảnh báo</span>
              </div>

              <!-- Zone Legend Badges -->
              <div style="display: flex; gap: 6px; padding: 6px 12px; background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; font-size: 10.5px; flex-wrap: wrap;">
                <span style="color: #002B8C; font-weight: 700;">● An toàn (ROA > 5%)</span>
                <span style="color: #b45309; font-weight: 700; margin-left: 8px;">● Theo dõi (0-5%)</span>
                <span style="color: #dc2626; font-weight: 700; margin-left: 8px;">● Báo động Đỏ (&lt; 0%)</span>
              </div>

              <!-- Scatter Canvas Wrapper -->
              <div class="chart-wrapper" style="height: 230px; padding: 4px 6px;">
                <canvas id="chartRiskScatter"></canvas>
              </div>
            </div>

            <!-- Flagged High-Risk Alert Box -->
            <div style="padding: 10px 14px; background: #fef2f2; border-top: 1px solid #fecaca; border-radius: 0 0 var(--radius-md) var(--radius-md); font-size: 11px;">
              <div style="font-weight: 700; color: #991b1b; margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
                <i data-lucide="alert-triangle" style="width: 13px; height: 13px;"></i> Doanh nghiệp cảnh báo rủi ro tài chính:
              </div>
              <div style="color: #b91c1c; line-height: 1.4;">
                • <strong>Công ty TNHH Vận tải & Xây dựng ABC:</strong> ROA âm -4,2%, nợ BHXH 450 Triệu đ.<br>
                • <strong>Công ty TNHH Bất động sản Hoàng Gia:</strong> ROA âm -2,1%, điểm tuân thủ BCTC 41/100.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 6. Màn hình Điều Hành Lĩnh Vực Giá & Tài Sản Công
  renderGiaCongSanContent() {
    const config = DEPT_CONFIGS['giacongsan'];
    return `
      <div class="table-fullscreen-wrapper" id="wrapper_gcs_properties">
        ${this.renderAdminTableToolbar('wrapper_gcs_properties', 'table_gcs_properties', 'Phương án sắp xếp lại, xử lý cơ sở nhà đất công')}
        <div class="table-scroll-container">
          <table class="data-table freeze-first" id="table_gcs_properties">
            <thead>
              <tr>
                <th style="width: 120px;">Mã cơ sở</th>
                <th style="min-width: 260px;">Tên cơ sở nhà đất công</th>
                <th style="width: 160px;">Diện tích khuôn viên</th>
                <th style="min-width: 280px;">Phương án xử lý đã phê duyệt</th>
                <th style="width: 160px;">Tiến độ thực hiện</th>
                <th style="width: 100px; text-align: center;">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${config.properties.map(prop => `
                <tr>
                  <td><strong style="color: #002B8C; font-family: monospace;">${prop.id}</strong></td>
                  <td><strong>${prop.name}</strong></td>
                  <td><span style="font-family: monospace; font-weight: 600;">${prop.area}</span></td>
                  <td><span class="badge badge-info">${prop.plan}</span></td>
                  <td><span class="badge ${prop.status.includes('Đã') || prop.status.includes('Hoàn tất') ? 'badge-success' : 'badge-warning'}">${prop.status}</span></td>
                  <td style="text-align: center; vertical-align: middle;">
                    <button class="btn btn-outline btn-xs" onclick="App.showNotification('Đang tải hồ sơ quy hoạch cơ sở ${prop.id}...', 'info')" title="Xem chi tiết hồ sơ tài sản">
                      <i data-lucide="eye"></i> Xem
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

  // 7. Màn hình Điều Hành Lĩnh Vực Tài Chính HCSN
  renderHCSNContent() {
    const config = DEPT_CONFIGS['hcsn'];
    return `
      <div class="table-fullscreen-wrapper" id="wrapper_hcsn_units">
        ${this.renderAdminTableToolbar('wrapper_hcsn_units', 'table_hcsn_units', 'Danh sách đơn vị sự nghiệp công lập tự chủ tài chính')}
        <div class="table-scroll-container">
          <table class="data-table freeze-first" id="table_hcsn_units">
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
                  <td><strong style="color: #002B8C;">${u.id}</strong></td>
                  <td><strong>${u.name}</strong></td>
                  <td><span class="badge badge-purple">${u.group}</span></td>
                  <td>${u.staff}</td>
                  <td><strong style="color: #14532d;">${u.revenue}</strong></td>
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
          <div class="table-fullscreen-wrapper" id="wrapper_pc_legal_cases">
            ${this.renderAdminTableToolbar('wrapper_pc_legal_cases', 'table_pc_legal_cases', 'Theo dõi thi hành quyết định xử phạt VPHC')}
            <div class="table-scroll-container">
              <table class="data-table freeze-first" id="table_pc_legal_cases">
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
                      <td><strong style="color: #002B8C;">${c.id}</strong></td>
                      <td>
                        <strong>${c.caseName}</strong>
                        <div style="font-size: 11px; color: #475569; margin-top: 2px;">Cán bộ đôn đốc: ${c.expert} | Hạn: ${c.deadline}</div>
                      </td>
                      <td>${c.agency}</td>
                      <td><strong style="color: #991b1b;">${c.amount}</strong></td>
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
      { id: 'KNTC-2026-01', sender: 'Công dân Nguyễn Văn Hùng (Phường Lộc Thọ)', content: 'Kiến nghị rà soát phương án bồi thường, hỗ trợ tái định cư dự án đường vành đai', receiveDate: '2026-08-10', deadline: '2026-09-10', status: 'Đang xử lý', handler: 'Tổ Pháp chế - Phòng Quản lý Giá và Công sản' },
      { id: 'KNTC-2026-02', sender: 'Công ty TNHH Xây dựng Thành Đạt', content: 'Phản ánh kết quả đánh giá hồ sơ đề xuất tài chính gói thầu xây lắp trường học', receiveDate: '2026-08-05', deadline: '2026-08-25', status: 'Đã trả lời bằng văn bản', handler: 'Phòng Pháp chế phối hợp Phòng Đầu tư' },
      { id: 'KNTC-2026-03', sender: 'Tập thể hộ dân xã Cam Hải Đông', content: 'Đề nghị giải thích căn cứ áp dụng bảng giá đất tính tiền bồi thường đất nông nghiệp', receiveDate: '2026-08-15', deadline: '2026-09-15', status: 'Đang xử lý', handler: 'Tổ Pháp chế' },
      { id: 'KNTC-2026-04', sender: 'Công dân Trần Thị Mai (Phường Cam Nghĩa)', content: 'Tố cáo hành vi thu phụ phí không đúng quy định tại đơn vị sự nghiệp y tế', receiveDate: '2026-07-20', deadline: '2026-08-20', status: 'Đã giải quyết xong', handler: 'Phòng Pháp chế phối hợp HCSN' }
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
            <div style="font-size: 12.5px; font-weight: 750; color: #002B8C; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <i data-lucide="shield-check" style="width: 15px; height: 15px;"></i> Ma trận Phân quyền 3 Lớp của Tài khoản:
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
              <div>
                <strong style="color: #002B8C;">1. Lớp Chức năng:</strong>
                <span class="rbac-layer-tag rbac-tag-function">${isExternal ? 'Xem, Kê khai dự thảo, Nộp giải trình' : (config.role === 'DIRECTOR' ? 'Xem, Duyệt, Khóa sổ, Xuất báo cáo, Chỉ đạo' : 'Xem, Nhập liệu, Sửa dự thảo, Xuất báo cáo')}</span>
              </div>
              <div>
                <strong style="color: #6b21a8;">2. Lớp Phạm vi (Data Scope):</strong>
                <span class="rbac-layer-tag rbac-tag-scope">${isExternal ? 'Phạm vi Đơn vị (Entity Scope)' : (config.role === 'DIRECTOR' ? 'Toàn tỉnh (Province-Wide 65 xã/phường & 8 phòng)' : 'Phòng phụ trách: ' + (config.title || config.deptName))}</span>
              </div>
              <div>
                <strong style="color: #92400e;">3. Lớp Trường Dữ liệu (Field Security):</strong>
                <span class="rbac-layer-tag rbac-tag-field">${isExternal ? 'DDM Masking: Ẩn số liệu đơn vị khác, ẩn dữ liệu thanh tra & chỉ tiêu mật' : (config.role === 'DIRECTOR' ? 'Toàn quyền 100% các trường dữ liệu (Gồm Mật & Tối mật)' : 'Xem trường chuyên môn; DDM che mờ CCCD/STK')}</span>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px;">
            <button class="btn btn-primary btn-sm" onclick="App.closeModal('modalGeneric'); DeptWorkspaceManager.loadWorkspace('admin'); DeptWorkspaceManager.switchTab('audit_system', document.querySelector('.nav-item[data-tab=audit_system]'));">
              <i data-lucide="external-link"></i> Xem Ma trận RBAC toàn hệ thống
            </button>
          </div>
        </div>
      `;
    }

    App.openModal('modalGeneric');
    if (window.lucide) window.lucide.createIcons();
  },

  // -------------------------------------------------------------
  // 23. UNIVERSAL BIG DATA TABLE CONTROLS & EXPORT TOOLBAR
  // -------------------------------------------------------------
  renderAdminTableToolbar(wrapperId, tableId, title, exportTitle) {
    return `
      <div class="data-table-toolbar">
        <div class="toolbar-left">
          <div class="toolbar-title"><i data-lucide="table"></i> ${title || 'Bảng dữ liệu'}</div>
          <div class="table-search-inline">
            <i data-lucide="search" class="search-icon-sm"></i>
            <input type="text" class="table-search-input-sm" placeholder="Tìm nhanh trong bảng..." oninput="DeptWorkspaceManager.filterTableRows('${tableId}', this.value)" />
          </div>
        </div>
        <div class="toolbar-right">
          <button class="btn btn-xs btn-outline btn-sticky-toggle" onclick="DeptWorkspaceManager.toggleStickyColumn('${tableId}', this)" title="Cố định / Bỏ cố định cột đầu tiên khi cuộn ngang">
            <i data-lucide="pin"></i> <span>Cố định cột đầu</span>
          </button>
          <button class="btn btn-xs btn-primary" onclick="DeptWorkspaceManager.exportTableToExcel('${tableId}', '${exportTitle || title}')" title="Xuất dữ liệu bảng ra file Excel (.xlsx)">
            <i data-lucide="file-spreadsheet"></i> <span>Xuất Excel</span>
          </button>
          <button class="btn btn-xs btn-outline" onclick="DeptWorkspaceManager.exportTableToPdf('${tableId}', '${exportTitle || title}')" title="In / Xuất báo cáo PDF">
            <i data-lucide="printer"></i> <span>In PDF</span>
          </button>
          <button class="btn btn-xs btn-outline btn-fullscreen-toggle" onclick="DeptWorkspaceManager.toggleTableFullscreen('${wrapperId}', this)" title="Xem toàn màn hình (Phím tắt ESC để thoát)">
            <i data-lucide="maximize-2"></i> <span>Toàn màn hình</span>
          </button>
        </div>
      </div>
    `;
  },

  filterTableRows(tableId, query) {
    const table = document.getElementById(tableId);
    if (!table) return;
    const normalized = (query || '').trim().toLowerCase();
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      if (!normalized || text.includes(normalized)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  },

  toggleStickyColumn(tableId, btn) {
    const table = document.getElementById(tableId);
    if (!table) return;
    const isSticky = table.classList.toggle('freeze-first') || table.classList.toggle('table-sticky-col');
    if (btn) {
      btn.classList.toggle('active', isSticky);
      const span = btn.querySelector('span');
      if (span) span.innerText = isSticky ? 'Đã cố định cột' : 'Cố định cột đầu';
    }
    App.showNotification(isSticky ? 'Đã cố định cột đầu tiên khi cuộn ngang' : 'Đã bỏ cố định cột đầu', 'info');
  },

  toggleTableFullscreen(wrapperId, btn) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;
    const isFull = wrapper.classList.toggle('is-fullscreen');
    document.body.style.overflow = isFull ? 'hidden' : '';
    if (btn) {
      btn.innerHTML = isFull ? `<i data-lucide="minimize-2"></i> <span>Thu nhỏ</span>` : `<i data-lucide="maximize-2"></i> <span>Toàn màn hình</span>`;
      if (window.lucide) window.lucide.createIcons();
    }
    App.showNotification(isFull ? 'Đã chuyển sang chế độ Xem toàn màn hình (Nhấn ESC để thoát)' : 'Đã thoát chế độ toàn màn hình', 'info');
  },

  exportTableToExcel(tableId, reportTitle) {
    const table = document.getElementById(tableId);
    if (!table) {
      App.showNotification('Không tìm thấy dữ liệu bảng để xuất', 'warning');
      return;
    }
    let csvContent = '\uFEFF'; // UTF-8 BOM
    csvContent += `SỞ TÀI CHÍNH TỈNH KHÁNH HÒA\r\n`;
    csvContent += `${(reportTitle || 'BÁO CÁO DỮ LIỆU TÀI CHÍNH').toUpperCase()}\r\n`;
    csvContent += `Thời gian xuất: ${new Date().toLocaleString('vi-VN')}\r\n\r\n`;

    const headers = Array.from(table.querySelectorAll('thead th')).map(th => `"${th.innerText.replace(/"/g, '""').trim()}"`);
    csvContent += headers.join(',') + '\r\n';

    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(r => {
      if (r.style.display !== 'none') {
        const cols = Array.from(r.querySelectorAll('td')).map(td => `"${td.innerText.replace(/"/g, '""').trim()}"`);
        csvContent += cols.join(',') + '\r\n';
      }
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${(reportTitle || 'Bao_Cao').replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    App.showNotification(`Đã xuất bảng tính Excel: ${reportTitle}`, 'success');
  },

  exportTableToPdf(tableId, reportTitle) {
    window.print();
  }
};
