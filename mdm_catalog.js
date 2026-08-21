/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * PHÂN HỆ QUẢN TRỊ DỮ LIỆU CHỦ (MDM), DATA CATALOG & DYNAMIC DATA MASKING (DDM)
 */

const MdmCatalogManager = {
  currentTable: 'MD.DOANH_NGHIEP_DKKD',

  // Master Data Samples
  sampleData: {
    'MD.DOANH_NGHIEP_DKKD': [
      { id: 'DN-001', name: 'Tổng Công ty Khánh Việt (KHATOCO)', mst: '4200238910', rep_name: 'Phan Quang Huy', cccd: '056082001928', capital: '2.500.000.000.000 VND', status: 'Đang hoạt động' },
      { id: 'DN-002', name: 'Công ty Cổ phần Nước Giải khát Yến Sào Khánh Hòa', mst: '4200429779', rep_name: 'Nguyễn Thị Hồng', cccd: '056185002341', capital: '330.000.000.000 VND', status: 'Đang hoạt động' },
      { id: 'DN-003', name: 'Công ty CP Đầu tư & Du lịch Biển Xanh Nha Trang', mst: '4201887766', rep_name: 'Vũ Đức Toàn', cccd: '056090008871', capital: '450.000.000.000 VND', status: 'Đang hoạt động' },
      { id: 'DN-004', name: 'Công ty TNHH Thủy sản Cam Ranh Export', mst: '4201776655', rep_name: 'Lê Văn Trọng', cccd: '056078004512', capital: '120.000.000.000 VND', status: 'Tạm ngừng có thời hạn' }
    ],
    'MD.DU_AN_DAU_TU_CONG': [
      { id: 'DTC-001', code: 'DA-79-001', name: 'Đường Vành đai 2 TP. Nha Trang', owner: 'Ban Quản lý dự án Giao thông Khánh Hòa', group: 'Nhóm A', total_fund: '1.450.000.000.000 VND', progress: '78.5%' },
      { id: 'DTC-002', code: 'DA-79-002', name: 'Kè và Nạo vét khơi thông luồng Sông Tắc - Sông Quán Trường', owner: 'Ban Quản lý dự án Nông nghiệp & PTNT', group: 'Nhóm B', total_fund: '820.000.000.000 VND', progress: '92.0%' },
      { id: 'DTC-003', code: 'DA-79-003', name: 'Hạ tầng Công nghệ Thông tin Đô thị Thông minh Khánh Hòa', owner: 'Sở Thông tin và Truyền thông', group: 'Nhóm B', total_fund: '280.000.000.000 VND', progress: '65.0%' }
    ],
    'MD.TAI_SAN_CONG_DIA_PHUONG': [
      { id: 'TSC-001', name: 'Trụ sở Sở Tài chính tỉnh Khánh Hòa', type: 'Đất & Trụ sở', manager: 'Sở Tài chính', land_area: '3.420 m²', floor_area: '6.850 m²', book_val: '185.000.000.000 VND' },
      { id: 'TSC-002', name: 'Xe ô tô 7 chỗ phục vụ công tác chung', type: 'Xe ô tô', manager: 'Văn phòng UBND tỉnh', license_plate: '79A-002.34', year: '2023', book_val: '1.150.000.000 VND' }
    ]
  },

  init() {
    this.renderMasterDataTable();
    this.renderDataCatalogGlossary();
  },

  switchTable(tableName, btn) {
    this.currentTable = tableName;
    document.querySelectorAll('#mdmTableTabs .tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderMasterDataTable();
  },

  renderMasterDataTable() {
    const container = document.getElementById('mdmTableContainer');
    if (!container) return;

    const data = this.sampleData[this.currentTable] || [];
    const isMasked = (App.currentUser.role !== 'LEAD'); // Leaders see unmasked data; Specialists see DDM masked

    if (this.currentTable === 'MD.DOANH_NGHIEP_DKKD') {
      container.innerHTML = `
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã ĐKKD</th>
              <th>Tên Doanh nghiệp</th>
              <th>Mã số thuế</th>
              <th>Người Đại diện PL ${isMasked ? '<span class="badge badge-warning" style="font-size:9px;">DDM Masked</span>' : ''}</th>
              <th>Số CCCD/Định danh ${isMasked ? '<span class="badge badge-warning" style="font-size:9px;">DDM Masked</span>' : ''}</th>
              <th>Vốn Điều lệ</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                <td><strong style="color: #0284c7;">${row.id}</strong></td>
                <td><strong>${row.name}</strong></td>
                <td>${row.mst}</td>
                <td>${isMasked ? this.maskName(row.rep_name) : row.rep_name}</td>
                <td><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0; color: #0f172a;">${isMasked ? this.maskCCCD(row.cccd) : row.cccd}</code></td>
                <td>${row.capital}</td>
                <td><span class="badge ${row.status === 'Đang hoạt động' ? 'badge-success' : 'badge-warning'}">${row.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else if (this.currentTable === 'MD.DU_AN_DAU_TU_CONG') {
      container.innerHTML = `
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã Dự án</th>
              <th>Tên Dự án Đầu tư công</th>
              <th>Chủ đầu tư / ĐVQHNS</th>
              <th>Nhóm DA</th>
              <th>Tổng mức đầu tư</th>
              <th>Tiến độ</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                <td><strong style="color: #0284c7;">${row.code}</strong></td>
                <td><strong>${row.name}</strong></td>
                <td>${row.owner}</td>
                <td><span class="badge badge-info">${row.group}</span></td>
                <td>${row.total_fund}</td>
                <td><span class="badge badge-success">${row.progress}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else {
      container.innerHTML = `
        <table class="data-table">
          <thead>
            <tr>
              <th>Mã Tài sản</th>
              <th>Tên Tài sản công</th>
              <th>Loại hình</th>
              <th>Đơn vị quản lý</th>
              <th>Quy mô / Diện tích</th>
              <th>Nguyên giá sổ sách</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                <td><strong style="color: #0284c7;">${row.id}</strong></td>
                <td><strong>${row.name}</strong></td>
                <td><span class="badge badge-purple">${row.type}</span></td>
                <td>${row.manager}</td>
                <td>${row.land_area ? `Đất: ${row.land_area} (Sàn: ${row.floor_area})` : `BKS: ${row.license_plate}`}</td>
                <td>${row.book_val}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
  },

  maskName(name) {
    const parts = name.split(' ');
    if (parts.length <= 1) return '***';
    return parts[0] + ' ' + parts.slice(1).map(p => p[0] + '**').join(' ');
  },

  maskCCCD(cccd) {
    if (!cccd || cccd.length < 6) return '******';
    return cccd.substring(0, 3) + '******' + cccd.substring(cccd.length - 3);
  },

  renderDataCatalogGlossary() {
    const container = document.getElementById('catalogGlossaryContainer');
    if (!container) return;

    const terms = [
      { code: 'TERM-NSNN-01', term: 'Dự toán Thu NSNN', standard: 'QĐ 1323/QĐ-BTC', privacy: 'Public', desc: 'Dự toán thu ngân sách nhà nước được cấp có thẩm quyền giao đầu năm hoặc điều chỉnh trong năm.' },
      { code: 'TERM-DTC-04', term: 'Tổng mức Đầu tư được duyệt', standard: 'Luật Đầu tư công', privacy: 'Public', desc: 'Toàn bộ chi phí đầu tư xây dựng của dự án được xác định trong Quyết định phê duyệt dự án.' },
      { code: 'TERM-DN-12', term: 'Số Định danh Cá nhân / CCCD Đại diện', standard: 'NĐ 356/2025/NĐ-CP', privacy: 'Sensitive (DDM Masked)', desc: 'Mã định danh cá nhân 12 số của người đại diện pháp luật, bắt buộc che mờ khi xuất ra bên ngoài.' },
      { code: 'TERM-TT-08', term: 'Số tiền Nợ Thuế & Sai phạm Thanh tra', standard: 'Luật Thanh tra & QL Thuế', privacy: 'Confidential (AES-256)', desc: 'Số tiền nợ thuế chi tiết và tiền sai phạm chưa thu hồi, mã hóa cột ở mức CSDL.' }
    ];

    container.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Mã Thuật ngữ</th>
            <th>Tên Thuật ngữ Nghiệp vụ</th>
            <th>Căn cứ Tiêu chuẩn</th>
            <th>Cấp độ Bảo vệ Dữ liệu</th>
            <th>Mô tả Ngữ nghĩa Chuẩn</th>
          </tr>
        </thead>
        <tbody>
          ${terms.map(t => `
            <tr>
              <td><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0; color: #0284c7;">${t.code}</code></td>
              <td><strong>${t.term}</strong></td>
              <td>${t.standard}</td>
              <td>
                <span class="badge ${t.privacy.includes('Sensitive') ? 'badge-warning' : t.privacy.includes('Confidential') ? 'badge-danger' : 'badge-success'}">
                  ${t.privacy}
                </span>
              </td>
              <td style="font-size: 11.5px; color: #475569;">${t.desc}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
};
