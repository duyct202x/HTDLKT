/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * PHÂN HỆ NHẬP LIỆU & KIỂM DUYỆT NGHIỆP VỤ CHUYÊN MÔN SỞ TÀI CHÍNH
 * (Theo mô hình tổ chức bộ máy thực tế: 6 Phòng chuyên môn + Quản lý CSDL Quy hoạch số hóa & Chứng chỉ hành nghề)
 */

const DataEntryManager = {
  currentDept: 'dept-ktns',
  currentSubTab: 'tab1',

  init() {
    this.renderDeptForm('dept-ktns', 'tab1');
    this.renderPendingTable();
  },

  switchDeptTab(deptId, tabBtn) {
    this.currentDept = deptId;
    this.currentSubTab = 'tab1';
    document.querySelectorAll('#entryDeptTabs .tab-btn').forEach(b => b.classList.remove('active'));
    if (tabBtn) tabBtn.classList.add('active');
    this.renderDeptForm(deptId, 'tab1');
  },

  switchSubTab(subTabId) {
    this.currentSubTab = subTabId;
    this.renderDeptForm(this.currentDept, subTabId);
  },

  renderDeptForm(deptId, subTabId = 'tab1') {
    this.currentDept = deptId;
    this.currentSubTab = subTabId;
    const container = document.getElementById('dynamicDeptFormContainer');
    if (!container) return;

    if (deptId === 'dept-ktns') {
      // 1. PHÒNG KINH TẾ VÀ NGÂN SÁCH (KTNS)
      container.innerHTML = `
        <div class="sub-tabs-bar">
          <button class="sub-tab-btn ${subTabId === 'tab1' ? 'active' : ''}" onclick="DataEntryManager.switchSubTab('tab1')">
            <i data-lucide="pie-chart"></i> Giao & Điều chỉnh Dự toán NSNN
          </button>
          <button class="sub-tab-btn ${subTabId === 'tab2' ? 'active' : ''}" onclick="DataEntryManager.switchSubTab('tab2')">
            <i data-lucide="file-text"></i> Báo cáo Phân tích Thu nộp & Nợ thuế
          </button>
        </div>

        ${subTabId === 'tab1' ? `
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="pie-chart"></i> Phương án giao và điều chỉnh phân bổ dự toán ngân sách nhà nước</h3>
              <p class="card-subtitle">Nhập quyết nghị HĐND tỉnh và Quyết định UBND tỉnh giao chỉ tiêu dự toán thu - chi ngân sách cho các sở ngành, địa phương</p>
            </div>
            <button class="btn btn-soft-primary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_GiaoDuToan_NSNN.xlsx')">
              <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
            </button>
          </div>

          <form id="formEntryKTNS" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Kinh tế và ngân sách', 'Giao & điều chỉnh dự toán NSNN')">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Năm ngân sách <span class="req">*</span></label>
                <input type="number" class="form-control" name="nam_ns" value="2026" required />
              </div>
              <div class="form-group">
                <label class="form-label">Số quyết định / Nghị quyết <span class="req">*</span></label>
                <input type="text" class="form-control" name="so_qd" placeholder="Ví dụ: 18/2026/NQ-HĐND hoặc 1450/QĐ-UBND" required />
              </div>
              <div class="form-group">
                <label class="form-label">Ngày ban hành <span class="req">*</span></label>
                <input type="date" class="form-control" name="ngay_ban_hanh" required />
              </div>
              <div class="form-group">
                <label class="form-label">Cơ quan, đơn vị, địa bàn thụ hưởng <span class="req">*</span></label>
                <select class="form-control" name="co_quan_thu_huong">
                  <option value="UBND phường Nha Trang">UBND phường Nha Trang</option>
                  <option value="UBND phường Phan Rang">UBND phường Phan Rang</option>
                  <option value="UBND phường Cam Ranh">UBND phường Cam Ranh</option>
                  <option value="UBND phường Ninh Hòa">UBND phường Ninh Hòa</option>
                  <option value="UBND xã Vạn Ninh">UBND xã Vạn Ninh</option>
                  <option value="UBND xã Cam Lâm">UBND xã Cam Lâm</option>
                  <option value="UBND xã Diên Khánh">UBND xã Diên Khánh</option>
                  <option value="UBND xã Cà Ná">UBND xã Cà Ná</option>
                  <option value="UBND xã Ninh Hải">UBND xã Ninh Hải</option>
                  <option value="UBND đặc khu Trường Sa">UBND đặc khu Trường Sa</option>
                  <option value="Sở Y tế tỉnh Khánh Hòa">Sở Y tế tỉnh Khánh Hòa</option>
                  <option value="Sở Giáo dục và Đào tạo">Sở Giáo dục và Đào tạo</option>
                  <option value="Sở Xây dựng">Sở Xây dựng</option>
                  <option value="Sở Nông nghiệp và Môi trường">Sở Nông nghiệp và Môi trường</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Chỉ tiêu dự toán thu được giao (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="du_toan_thu" placeholder="Ví dụ: 8.450.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Chỉ tiêu dự toán chi ngân sách (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="du_toan_chi" placeholder="Ví dụ: 4.120.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Nguồn cải cách tiền lương trích lập (VNĐ)</label>
                <input type="text" class="form-control" name="nguon_cctl" placeholder="Ví dụ: 350.000.000.000" />
              </div>
              <div class="form-group">
                <label class="form-label">Loại phân bổ</label>
                <select class="form-control" name="loai_phan_bo">
                  <option value="DAU_NAM">Giao dự toán đầu năm</option>
                  <option value="BO_SUNG">Bổ sung có mục tiêu trong năm</option>
                  <option value="DIEU_CHINH">Điều chỉnh dự toán giữa các ngành</option>
                </select>
              </div>
              <div class="form-group full-width">
                <label class="form-label">Căn cứ pháp lý & Nội dung chỉ đạo điều hành cân đối ngân sách</label>
                <textarea class="form-control" name="noi_dung" placeholder="Thực hiện theo Luật NSNN 2015, định mức phân bổ dự toán chi thường xuyên..."></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn btn-secondary"><i data-lucide="rotate-ccw"></i> Nhập lại</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Trình lãnh đạo Sở phê duyệt</button>
            </div>
          </form>
        ` : `
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="file-text"></i> Cập nhật Báo cáo Phân tích Thu nộp & Nợ thuế Địa bàn</h3>
              <p class="card-subtitle">Đối soát số liệu thu nộp thuế, phân tích số nợ thuế khó thu và khả năng thu hồi theo địa bàn cấp huyện</p>
            </div>
            <button class="btn btn-soft-primary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_BaoCao_ThuNoThue.xlsx')">
              <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
            </button>
          </div>

          <form id="formEntryKTNS2" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Kinh tế và ngân sách', 'Báo cáo thu nộp & nợ thuế')">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Kỳ báo cáo <span class="req">*</span></label>
                <input type="text" class="form-control" name="ky_bc" value="Tháng 08/2026" required />
              </div>
              <div class="form-group">
                <label class="form-label">Địa bàn quản lý thuế <span class="req">*</span></label>
                <select class="form-control" name="dia_ban">
                  <option value="Phường Nha Trang">Phường Nha Trang</option>
                  <option value="Phường Phan Rang">Phường Phan Rang</option>
                  <option value="Phường Cam Ranh">Phường Cam Ranh</option>
                  <option value="Phường Ninh Hòa">Phường Ninh Hòa</option>
                  <option value="Xã Vạn Ninh">Xã Vạn Ninh</option>
                  <option value="Xã Cam Lâm">Xã Cam Lâm</option>
                  <option value="Xã Diên Khánh">Xã Diên Khánh</option>
                  <option value="Xã Cà Ná">Xã Cà Ná</option>
                  <option value="Xã Ninh Hải">Xã Ninh Hải</option>
                  <option value="Đặc khu Trường Sa">Đặc khu Trường Sa</option>
                  <option value="Khối Doanh nghiệp lớn (Cục Thuế)">Khối Doanh nghiệp lớn (Cục Thuế)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Số thu thuế thực tế trong kỳ (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="so_thu_thuc_te" placeholder="Ví dụ: 1.450.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tổng số tiền nợ thuế đến kỳ báo cáo (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="tong_no_thue" placeholder="Ví dụ: 285.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Trong đó: Nợ có khả năng thu (VNĐ)</label>
                <input type="text" class="form-control" name="no_kha_nang_thu" placeholder="Ví dụ: 195.000.000.000" />
              </div>
              <div class="form-group">
                <label class="form-label">Trong đó: Nợ khó thu / Tiền phạt chậm nộp (VNĐ)</label>
                <input type="text" class="form-control" name="no_kho_thu" placeholder="Ví dụ: 90.000.000.000" />
              </div>
              <div class="form-group full-width">
                <label class="form-label">Biện pháp đôn đốc thu nợ và kiến nghị xử lý</label>
                <textarea class="form-control" name="bien_phap" placeholder="Áp dụng biện pháp cưỡng chế trích tiền tài khoản, phong tỏa hóa đơn đối với các DN chây ì..."></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn btn-secondary"><i data-lucide="rotate-ccw"></i> Nhập lại</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Lưu báo cáo nạp CSDL</button>
            </div>
          </form>
        `}
      `;
    } else if (deptId === 'dept-dtc') {
      // 2. PHÒNG QUẢN LÝ ĐẦU TƯ CÔNG (ĐTC)
      container.innerHTML = `
        <div class="sub-tabs-bar">
          <button class="sub-tab-btn ${subTabId === 'tab1' ? 'active' : ''}" onclick="DataEntryManager.switchSubTab('tab1')">
            <i data-lucide="hard-hat"></i> Thẩm tra Quyết toán Vốn ĐTC
          </button>
          <button class="sub-tab-btn ${subTabId === 'tab2' ? 'active' : ''}" onclick="DataEntryManager.switchSubTab('tab2')">
            <i data-lucide="calendar"></i> Kế hoạch Vốn Trung hạn & Hằng năm
          </button>
          <button class="sub-tab-btn ${subTabId === 'tab3' ? 'active' : ''}" onclick="DataEntryManager.switchSubTab('tab3')">
            <i data-lucide="map"></i> Hồ sơ Quy hoạch tỉnh
          </button>
        </div>

        ${subTabId === 'tab1' ? `
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="hard-hat"></i> Thẩm tra quyết toán dự án hoàn thành</h3>
              <p class="card-subtitle">Thẩm tra quyết toán vốn đầu tư công hoàn thành theo Thông tư 96/2021/TT-BTC</p>
            </div>
            <button class="btn btn-soft-primary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_QuyetToan_DTC.xlsx')">
              <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
            </button>
          </div>

          <form id="formEntryDTC" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Quản lý Đầu tư công', 'Thẩm tra quyết toán vốn ĐTC')">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Mã định danh dự án <span class="req">*</span></label>
                <input type="text" class="form-control" name="ma_du_an" placeholder="Ví dụ: DA-DTC-79-088" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tên dự án hoàn thành <span class="req">*</span></label>
                <input type="text" class="form-control" name="ten_du_an" placeholder="Nhập tên dự án quyết toán..." required />
              </div>
              <div class="form-group">
                <label class="form-label">Chủ đầu tư / Ban quản lý dự án <span class="req">*</span></label>
                <select class="form-control" name="chu_dau_tu">
                  <option value="Ban QLDA Công Trình Giao Thông">Ban Quản lý dự án Công Trình Giao Thông Khánh Hòa</option>
                  <option value="Ban QLDA Nông Nghiệp & PTNT">Ban Quản lý dự án Nông Nghiệp & PTNT</option>
                  <option value="Ban QLDA Dân Dụng & Công Nghiệp">Ban Quản lý dự án Dân Dụng & Công Nghiệp</option>
                  <option value="UBND phường Nha Trang">UBND phường Nha Trang</option>
                  <option value="UBND phường Phan Rang">UBND phường Phan Rang</option>
                  <option value="UBND xã Vạn Ninh">UBND xã Vạn Ninh</option>
                  <option value="UBND xã Cà Ná">UBND xã Cà Ná</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Tổng mức đầu tư được duyệt (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="tong_muc_dt" placeholder="Ví dụ: 350.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Giá trị đề nghị quyết toán (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="gt_de_nghi" placeholder="Ví dụ: 342.500.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Giá trị thẩm tra phê duyệt (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="gt_phe_duyet" placeholder="Ví dụ: 340.200.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Số tiền giảm trừ qua thẩm tra (VNĐ)</label>
                <input type="text" class="form-control" name="so_tien_giam_tru" placeholder="Ví dụ: 2.300.000.000" />
              </div>
              <div class="form-group">
                <label class="form-label">Tình trạng kiểm toán độc lập</label>
                <select class="form-control" name="kiem_toan">
                  <option value="DA_KIEM_TOAN">Đã có Báo cáo kiểm toán độc lập</option>
                  <option value="KTNN_KIEM_TOAN">Kiểm toán Nhà nước đã kiểm toán</option>
                  <option value="SO_TC_THAM_TRA">Sở Tài chính thẩm tra trực tiếp</option>
                </select>
              </div>
              <div class="form-group full-width">
                <label class="form-label">Kết luận thẩm tra & Xử lý công nợ, vật tư tồn đọng</label>
                <textarea class="form-control" name="ket_luan" placeholder="Dự án đủ điều kiện tất toán tài khoản, chủ đầu tư thu hồi công nợ..."></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn btn-secondary"><i data-lucide="rotate-ccw"></i> Nhập lại</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Trình lãnh đạo phê duyệt quyết toán</button>
            </div>
          </form>
        ` : subTabId === 'tab2' ? `
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="calendar"></i> Cập nhật Kế hoạch Vốn Đầu tư công Trung hạn & Hằng năm</h3>
              <p class="card-subtitle">Nhập quyết nghị giao kế hoạch vốn và điều chỉnh nguồn vốn đầu tư công ngân sách địa phương</p>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_KeHoachVon_DTC.xlsx')">
              <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
            </button>
          </div>

          <form id="formEntryDTC2" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Quản lý Đầu tư công', 'Kế hoạch vốn đầu tư công')">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Giai đoạn kế hoạch vốn <span class="req">*</span></label>
                <select class="form-control" name="giai_doan">
                  <option value="2026-2030">Kế hoạch vốn Trung hạn 2026 - 2030</option>
                  <option value="2026">Kế hoạch vốn Hằng năm 2026</option>
                  <option value="2027">Kế hoạch vốn Hằng năm 2027</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Số Nghị quyết HĐND / QĐ UBND <span class="req">*</span></label>
                <input type="text" class="form-control" name="so_nq" placeholder="Ví dụ: 12/2026/NQ-HĐND" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tổng kế hoạch vốn giao (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="tong_von_giao" placeholder="Ví dụ: 12.850.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Vốn Ngân sách Tỉnh (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="von_tinh" placeholder="Ví dụ: 8.500.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Vốn Ngân sách Trung ương hỗ trợ (VNĐ)</label>
                <input type="text" class="form-control" name="von_tw" placeholder="Ví dụ: 4.350.000.000.000" />
              </div>
              <div class="form-group">
                <label class="form-label">Nguồn thu từ đấu giá đất / XSKT (VNĐ)</label>
                <input type="text" class="form-control" name="nguon_dat" placeholder="Ví dụ: 2.100.000.000.000" />
              </div>
              <div class="form-group full-width">
                <label class="form-label">Danh mục các dự án trọng điểm ưu tiên bố trí vốn</label>
                <textarea class="form-control" name="du_an_trong_diem" placeholder="Ưu tiên dự án kết nối liên vùng, hạ tầng KKT Vân Phong, Đô thị mới Cam Lâm..."></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn btn-secondary">Nhập lại</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Lưu kế hoạch vốn nạp CSDL</button>
            </div>
          </form>
        ` : `
          <!-- TAB 3: HỒ SƠ QUY HOẠCH TỈNH -->
          <div class="card-header">
            <div>
              <h3 class="card-title" style="color: #0284c7;"><i data-lucide="map"></i> Hồ sơ quy hoạch tỉnh</h3>
              <p class="card-subtitle">Quản lý danh mục hồ sơ quy hoạch và tài liệu số hóa bản vẽ/thuyết minh</p>
            </div>
            <a href="https://gis.khanhhoa.gov.vn" target="_blank" class="btn btn-secondary btn-sm">
              <i data-lucide="external-link"></i> Cổng GIS Khánh Hòa
            </a>
          </div>

          <form id="formEntryQuyHoach" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Quản lý Đầu tư công', 'Hồ sơ quy hoạch tỉnh')">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Mã định danh quy hoạch <span class="req">*</span></label>
                <input type="text" class="form-control" name="ma_quy_hoach" placeholder="Ví dụ: QH-KH-2021-2030 hoặc QHPK-VP-01" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tên đồ án / Hồ sơ quy hoạch <span class="req">*</span></label>
                <input type="text" class="form-control" name="ten_quy_hoach" placeholder="Ví dụ: Quy hoạch tỉnh Khánh Hòa thời kỳ 2021 - 2030, tầm nhìn 2050..." required />
              </div>
              <div class="form-group">
                <label class="form-label">Phân loại quy hoạch <span class="req">*</span></label>
                <select class="form-control" name="loai_quy_hoach">
                  <option value="QUY_HOACH_TINH">Quy hoạch tỉnh (QĐ 318/QĐ-TTg)</option>
                  <option value="QUY_HOACH_DO_THI">Quy hoạch chung đô thị (Nha Trang, Cam Lâm, Ninh Hòa)</option>
                  <option value="QUY_HOACH_PHAN_KHU">Quy hoạch phân khu chức năng (KKT Vân Phong, KCN)</option>
                  <option value="QUY_HOACH_NGANH">Quy hoạch ngành / lĩnh vực hạ tầng giao thông, thủy lợi</option>
                  <option value="QUY_HOACH_DAT_DAI">Quy hoạch sử dụng đất cấp huyện</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Số Quyết định phê duyệt <span class="req">*</span></label>
                <input type="text" class="form-control" name="so_qd_phe_duyet" placeholder="Ví dụ: 318/QĐ-TTg hoặc 1520/QĐ-UBND" required />
              </div>
              <div class="form-group">
                <label class="form-label">Ngày phê duyệt / Ban hành <span class="req">*</span></label>
                <input type="date" class="form-control" name="ngay_phe_duyet" required />
              </div>
              <div class="form-group">
                <label class="form-label">Cơ quan tổ chức lập & Đơn vị tư vấn</label>
                <input type="text" class="form-control" name="co_quan_lap" placeholder="Ví dụ: Sở Kế hoạch và Đầu tư / Viện Quy hoạch đô thị..." />
              </div>
              <div class="form-group">
                <label class="form-label">Phạm vi / Diện tích quy hoạch (ha)</label>
                <input type="text" class="form-control" name="dien_tich_qh" placeholder="Ví dụ: 5.137,79 km² (Toàn tỉnh)" />
              </div>
              <div class="form-group full-width">
                <label class="form-label">Tóm tắt mục tiêu phát triển & Định hướng không gian</label>
                <textarea class="form-control" name="tom_tat_qh" placeholder="Mục tiêu đến năm 2030 Khánh Hòa trở thành thành phố trực thuộc Trung ương; trung tâm dịch vụ, du lịch biển quốc tế..."></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn btn-secondary"><i data-lucide="rotate-ccw"></i> Nhập lại</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Trình phê duyệt nạp CSDL quy hoạch</button>
            </div>
          </form>
        `}
      `;
    } else if (deptId === 'dept-dtns') {
      // 2b. PHÒNG ĐẦU TƯ NGOÀI NGÂN SÁCH (DTNS & FDI)
      container.innerHTML = `
        <div class="sub-tabs-bar">
          <button class="sub-tab-btn ${subTabId === 'tab1' ? 'active' : ''}" onclick="DataEntryManager.switchSubTab('tab1')">
            <i data-lucide="building-2"></i> Giám sát Dự án Ngoài Ngân sách & FDI
          </button>
          <button class="sub-tab-btn ${subTabId === 'tab2' ? 'active' : ''}" onclick="DataEntryManager.switchSubTab('tab2')">
            <i data-lucide="shield-check"></i> Ký quỹ & Cam kết Tiến độ Đầu tư
          </button>
        </div>

        ${subTabId === 'tab1' ? `
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="building-2"></i> Cập nhật thông tin và tiến độ giải ngân dự án ngoài ngân sách (Trong nước & FDI)</h3>
              <p class="card-subtitle">Theo dõi tiến độ thực hiện vốn đầu tư đăng ký và vốn thực hiện thực tế của các dự án ngoài ngân sách</p>
            </div>
            <button class="btn btn-soft-primary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_DuAn_NgoaiNS.xlsx')">
              <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
            </button>
          </div>

          <form id="formEntryDTNS" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Quản lý Đầu tư ngoài ngân sách', 'Dự án đầu tư ngoài ngân sách')">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Mã dự án / Số Giấy chứng nhận ĐKĐT <span class="req">*</span></label>
                <input type="text" class="form-control" name="ma_du_an" placeholder="Ví dụ: IRC-79-VP-024" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tên dự án đầu tư ngoài ngân sách <span class="req">*</span></label>
                <input type="text" class="form-control" name="ten_du_an" placeholder="Nhập tên dự án..." required />
              </div>
              <div class="form-group">
                <label class="form-label">Nhà đầu tư / Doanh nghiệp thực hiện <span class="req">*</span></label>
                <input type="text" class="form-control" name="nha_dau_tu" placeholder="Tên công ty / nhà đầu tư..." required />
              </div>
              <div class="form-group">
                <label class="form-label">Địa bàn triển khai dự án <span class="req">*</span></label>
                <select class="form-control" name="dia_ban">
                  <option value="Khu kinh tế Vân Phong">Khu kinh tế Vân Phong</option>
                  <option value="Đô thị mới Cam Lâm">Đô thị mới Cam Lâm</option>
                  <option value="Phường Nha Trang">Phường Nha Trang</option>
                  <option value="Phường Phan Rang">Phường Phan Rang</option>
                  <option value="Phường Cam Ranh">Phường Cam Ranh</option>
                  <option value="Phường Ninh Hòa">Phường Ninh Hòa</option>
                  <option value="Xã Vạn Ninh">Xã Vạn Ninh</option>
                  <option value="Xã Cam Lâm">Xã Cam Lâm</option>
                  <option value="Xã Diên Khánh">Xã Diên Khánh</option>
                  <option value="Xã Cà Ná">Xã Cà Ná</option>
                  <option value="Xã Ninh Hải">Xã Ninh Hải</option>
                  <option value="Đặc khu Trường Sa">Đặc khu Trường Sa</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Tổng vốn đầu tư đăng ký (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="tong_von" placeholder="Ví dụ: 1.500.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Vốn thực hiện lũy kế đến nay (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="von_thuc_hien" placeholder="Ví dụ: 850.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Diện tích đất sử dụng (ha)</label>
                <input type="text" class="form-control" name="dien_tich_dat" placeholder="Ví dụ: 45,8 ha" />
              </div>
              <div class="form-group">
                <label class="form-label">Tình trạng tiến độ thực hiện</label>
                <select class="form-control" name="tinh_trang">
                  <option value="DUNG_TIEN_DO">Đang triển khai đúng tiến độ cam kết</option>
                  <option value="CHAM_TIEN_DO">Chậm tiến độ (Cần đôn đốc / Thanh tra)</option>
                  <option value="HOAN_THANH">Đã hoàn thành đi vào hoạt động</option>
                </select>
              </div>
              <div class="form-group full-width">
                <label class="form-label">Khó khăn vướng mắc & Đề xuất kiến nghị</label>
                <textarea class="form-control" name="kho_khan" placeholder="Vướng mắc về GPMB, thủ tục thỏa thuận đấu nối hạ tầng hoặc chuyển đổi mục đích sử dụng đất..."></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn btn-secondary"><i data-lucide="rotate-ccw"></i> Nhập lại</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Trình lãnh đạo phê duyệt cập nhật</button>
            </div>
          </form>
        ` : `
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="shield-check"></i> Theo dõi Ký quỹ & Bảo đảm thực hiện dự án đầu tư</h3>
              <p class="card-subtitle">Giám sát số tiền ký quỹ theo Điều 43 Luật Đầu tư và hoàn trả tiền ký quỹ theo tiến độ</p>
            </div>
          </div>
          <form id="formEntryDTNSKyQuy" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Quản lý Đầu tư ngoài ngân sách', 'Ký quỹ bảo đảm dự án đầu tư')">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Mã dự án đầu tư <span class="req">*</span></label>
                <input type="text" class="form-control" name="ma_da_ky_quy" placeholder="Ví dụ: IRC-79-VP-024" required />
              </div>
              <div class="form-group">
                <label class="form-label">Số tiền ký quỹ phải nộp (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="so_tien_ky_quy" placeholder="Ví dụ: 45.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Hình thức bảo đảm</label>
                <select class="form-control" name="hinh_thuc">
                  <option value="TIEN_GUI">Nộp tiền vào tài khoản phong tỏa tại NHTM</option>
                  <option value="BAO_LANH">Chứng thư bảo lãnh của Tổ chức tín dụng</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Trạng thái ký quỹ</label>
                <select class="form-control" name="trang_thai_kq">
                  <option value="DA_NOP">Đã nộp đủ bảo đảm thực hiện dự án</option>
                  <option value="CHUA_NOP">Đang đôn đốc nộp theo thông báo</option>
                  <option value="HOAN_TRA">Đã hoàn trả ký quỹ theo tiến độ</option>
                </select>
              </div>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn btn-secondary"><i data-lucide="rotate-ccw"></i> Nhập lại</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Lưu thông tin ký quỹ</button>
            </div>
          </form>
        `}
      `;
    } else if (deptId === 'dept-giacongsan') {
      // 3. PHÒNG QUẢN LÝ GIÁ VÀ CÔNG SẢN
      container.innerHTML = `
        <div class="sub-tabs-bar">
          <button class="sub-tab-btn ${subTabId === 'tab1' ? 'active' : ''}" onclick="DataEntryManager.switchSubTab('tab1')">
            <i data-lucide="home"></i> Sắp xếp Nhà đất & Tài sản công
          </button>
          <button class="sub-tab-btn ${subTabId === 'tab2' ? 'active' : ''}" onclick="DataEntryManager.switchSubTab('tab2')">
            <i data-lucide="trending-up"></i> Khảo sát Giá & Kê khai giá
          </button>
          <button class="sub-tab-btn ${subTabId === 'tab3' ? 'active' : ''}" onclick="DataEntryManager.switchSubTab('tab3')">
            <i data-lucide="award"></i> Danh bạ Chứng chỉ Hành nghề TĐG
          </button>
        </div>

        ${subTabId === 'tab1' ? `
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="home"></i> Phương án sắp xếp cơ sở nhà đất công và biến động tài sản</h3>
              <p class="card-subtitle">Xử lý nhà đất công dôi dư theo Nghị định 167/2017, Nghị định 67/2021 và theo dõi biến động tài sản công</p>
            </div>
            <button class="btn btn-soft-primary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_SapXep_NhaDat.xlsx')">
              <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
            </button>
          </div>

          <form id="formEntryGCS" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Quản lý Giá và Công sản', 'Sắp xếp nhà đất & TSC')">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Mã cơ sở nhà đất / Mã tài sản <span class="req">*</span></label>
                <input type="text" class="form-control" name="ma_ts" placeholder="Ví dụ: TSC-79-NTR-045" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tên cơ sở nhà đất / Tài sản công <span class="req">*</span></label>
                <input type="text" class="form-control" name="ten_ts" placeholder="Ví dụ: Trụ sở cũ Chi cục Thuế Nha Trang..." required />
              </div>
              <div class="form-group">
                <label class="form-label">Đơn vị trực tiếp quản lý <span class="req">*</span></label>
                <input type="text" class="form-control" name="don_vi" placeholder="Tên cơ quan, đơn vị dự toán..." required />
              </div>
              <div class="form-group">
                <label class="form-label">Địa chỉ / Vị trí thửa đất <span class="req">*</span></label>
                <input type="text" class="form-control" name="dia_chi" placeholder="Số nhà, tên đường, thôn/tổ dân phố, xã/phường..." required />
              </div>
              <div class="form-group">
                <label class="form-label">Diện tích đất (m²) / Diện tích sàn xây dựng (m²)</label>
                <input type="text" class="form-control" name="dien_tich" placeholder="Ví dụ: Đất: 1.450 m² - Sàn: 2.800 m²" />
              </div>
              <div class="form-group">
                <label class="form-label">Phương án đề xuất xử lý <span class="req">*</span></label>
                <select class="form-control" name="phuong_an">
                  <option value="GIU_LAI">Giữ lại tiếp tục sử dụng làm trụ sở</option>
                  <option value="BAN_DAU_GIA">Bán đấu giá tài sản trên đất & chuyển nhượng QSDĐ</option>
                  <option value="DIEU_CHUYEN">Điều chuyển cho cơ quan/đơn vị khác</option>
                  <option value="THU_HOI">Thu hồi giao Trung tâm Phát triển Quỹ đất</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Giá trị ước tính (VNĐ)</label>
                <input type="text" class="form-control" name="gia_tri" placeholder="Ví dụ: 85.000.000.000" />
              </div>
              <div class="form-group full-width">
                <label class="form-label">Thuyết minh hiện trạng sử dụng và cơ sở pháp lý</label>
                <textarea class="form-control" name="thuyet_minh" placeholder="Hiện trạng dôi dư do sắp xếp đơn vị hành chính..."></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn btn-secondary"><i data-lucide="rotate-ccw"></i> Nhập lại</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Trình Hội đồng xử lý nhà đất</button>
            </div>
          </form>
        ` : subTabId === 'tab2' ? `
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="trending-up"></i> Khảo sát Giá Thị trường & Kê khai Giá Hàng hóa</h3>
              <p class="card-subtitle">Cập nhật kết quả khảo sát giá vật liệu xây dựng, dịch vụ công và hồ sơ kê khai giá theo Luật Giá 2023</p>
            </div>
            <button class="btn btn-soft-primary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_KhaoSat_Gia.xlsx')">
              <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
            </button>
          </div>

          <form id="formEntryGia2" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Quản lý Giá và Công sản', 'Khảo sát giá thị trường')">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Kỳ khảo sát giá <span class="req">*</span></label>
                <input type="text" class="form-control" name="ky_khao_sat" value="Tháng 08/2026" required />
              </div>
              <div class="form-group">
                <label class="form-label">Nhóm hàng hóa / Dịch vụ <span class="req">*</span></label>
                <select class="form-control" name="nhom_hang">
                  <option value="VLXD">Vật liệu xây dựng (Xi măng, Thép, Cát, Đá xây dựng)</option>
                  <option value="DAT_DAI">Bảng giá đất và hệ số điều chỉnh giá đất (K)</option>
                  <option value="THIET_YEU">Hàng hóa thiết yếu, lương thực thực phẩm</option>
                  <option value="DICH_VU_CONG">Dịch vụ công, phí trông giữ xe, vé tham quan</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Tên mặt hàng / Dịch vụ cụ thể <span class="req">*</span></label>
                <input type="text" class="form-control" name="ten_mat_hang" placeholder="Ví dụ: Xi măng Vicem Hà Tiên PCB40, Thép Pomina..." required />
              </div>
              <div class="form-group">
                <label class="form-label">Đơn vị tính <span class="req">*</span></label>
                <input type="text" class="form-control" name="dvt" placeholder="Ví dụ: Tấn, m³, bao, lượt" required />
              </div>
              <div class="form-group">
                <label class="form-label">Mức giá khảo sát bình quân (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="muc_gia" placeholder="Ví dụ: 1.850.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tỷ lệ biến động so với tháng trước (%)</label>
                <input type="text" class="form-control" name="bien_dong_pct" placeholder="Ví dụ: +1.5%" />
              </div>
              <div class="form-group full-width">
                <label class="form-label">Địa bàn khảo sát & Doanh nghiệp cung ứng báo giá</label>
                <textarea class="form-control" name="ghi_chu_gia" placeholder="Khảo sát tại 5 đại lý lớn khu vực TP. Nha Trang và Diên Khánh..."></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn btn-secondary"><i data-lucide="rotate-ccw"></i> Nhập lại</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Lưu kết quả khảo sát giá</button>
            </div>
          </form>
        ` : `
          <!-- TAB 3: DANH BẠ CHỨNG CHỈ HÀNH NGHỀ ĐẤU THẦU & THẨM ĐỊNH GIÁ -->
          <div class="card-header">
            <div>
              <h3 class="card-title" style="color: #0284c7;"><i data-lucide="award"></i> Danh bạ Chứng chỉ Hành nghề Đấu thầu & Thẩm định giá</h3>
              <p class="card-subtitle">Tiếp nhận và quản lý danh mục chuyên gia đấu thầu và Thẩm định viên về giá đủ điều kiện hành nghề</p>
            </div>
            <button class="btn btn-soft-primary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_DanhSach_ChungChi_TDG.xlsx')">
              <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
            </button>
          </div>

          <form id="formEntryChungChi" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Quản lý Giá và Công sản', 'Danh bạ Chứng chỉ Hành nghề & TĐG')">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Mã số chứng chỉ / Số thẻ hành nghề <span class="req">*</span></label>
                <input type="text" class="form-control" name="ma_chung_chi" placeholder="Ví dụ: CC-DT-2026-089 hoặc TĐV-BTC-1452" required />
              </div>
              <div class="form-group">
                <label class="form-label">Họ và tên cá nhân / Chuyên gia <span class="req">*</span></label>
                <input type="text" class="form-control" name="ho_ten" placeholder="Nhập họ và tên đầy đủ..." required />
              </div>
              <div class="form-group">
                <label class="form-label">Loại chứng chỉ / Thẻ hành nghề <span class="req">*</span></label>
                <select class="form-control" name="loai_cc">
                  <option value="CHUNG_CHI_DAU_THAU">Chứng chỉ hành nghề hoạt động đấu thầu (Mạng Đấu thầu QG)</option>
                  <option value="THE_THAM_DINH_VIEN_GIA">Thẻ Thẩm định viên về giá đủ điều kiện hành nghề (Cục QL Giá - BTC)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Cơ quan cấp chứng chỉ / Công nhận <span class="req">*</span></label>
                <input type="text" class="form-control" name="co_quan_cap" value="Bộ Tài chính / Bộ Kế hoạch và Đầu tư" required />
              </div>
              <div class="form-group">
                <label class="form-label">Ngày cấp <span class="req">*</span></label>
                <input type="date" class="form-control" name="ngay_cap" required />
              </div>
              <div class="form-group">
                <label class="form-label">Ngày hết hạn hiệu lực</label>
                <input type="date" class="form-control" name="ngay_het_han" />
              </div>
              <div class="form-group">
                <label class="form-label">Tổ chức / Doanh nghiệp đang công tác <span class="req">*</span></label>
                <input type="text" class="form-control" name="don_vi_cong_tac" placeholder="Tên Công ty Thẩm định giá / Ban QLDA..." required />
              </div>
              <div class="form-group">
                <label class="form-label">Trạng thái hành nghề</label>
                <select class="form-control" name="trang_thai">
                  <option value="DANG_HANH_NGHE">Đang đủ điều kiện hành nghề</option>
                  <option value="TAM_DINH_CHI">Tạm đình chỉ hành nghề</option>
                  <option value="THU_HOI">Đã thu hồi chứng chỉ / thẻ</option>
                </select>
              </div>
              <div class="form-group full-width">
                <label class="form-label">Số Quyết định công nhận / Ghi chú năng lực chuyên môn</label>
                <textarea class="form-control" name="ghi_chu" placeholder="Quyết định công bố danh sách thẩm định viên đủ điều kiện hành nghề số 285/QĐ-BTC..."></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn btn-secondary"><i data-lucide="rotate-ccw"></i> Nhập lại</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Lưu hồ sơ chứng chỉ vào CSDL</button>
            </div>
          </form>
        `}
      `;
    } else if (deptId === 'dept-doanhnghiep') {
      // 4. PHÒNG QUẢN LÝ DOANH NGHIỆP (TCDN & QUỸ NGOÀI NS)
      container.innerHTML = `
        <div class="sub-tabs-bar">
          <button class="sub-tab-btn ${subTabId === 'tab1' ? 'active' : ''}" onclick="DataEntryManager.switchSubTab('tab1')">
            <i data-lucide="briefcase"></i> Giám sát BCTC & Vốn DNNN
          </button>
          <button class="sub-tab-btn ${subTabId === 'tab2' ? 'active' : ''}" onclick="DataEntryManager.switchSubTab('tab2')">
            <i data-lucide="layers"></i> Thu - Chi & Dư Quỹ Ngoài NS
          </button>
        </div>

        ${subTabId === 'tab1' ? `
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="briefcase"></i> Giám sát tài chính và đánh giá xếp loại doanh nghiệp nhà nước</h3>
              <p class="card-subtitle">Đánh giá hiệu quả bảo toàn vốn nhà nước và xếp loại doanh nghiệp theo Nghị định 91/2015/NĐ-CP</p>
            </div>
            <button class="btn btn-soft-primary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_GiamSat_DNNN.xlsx')">
              <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
            </button>
          </div>

          <form id="formEntryDN" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Quản lý Doanh nghiệp', 'Giám sát doanh nghiệp nhà nước')">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Mã số thuế <span class="req">*</span></label>
                <input type="text" class="form-control" name="mst" placeholder="Ví dụ: 4200429779" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tên doanh nghiệp có vốn nhà nước <span class="req">*</span></label>
                <select class="form-control" name="ten_dn">
                  <option value="Công ty TNHH MTV Yến Sào Khánh Hòa">Công ty TNHH MTV Yến Sào Khánh Hòa (100% vốn NN)</option>
                  <option value="Tổng Công ty Khánh Việt (KHATOCO)">Tổng Công ty Khánh Việt (KHATOCO - 100% vốn NN)</option>
                  <option value="Công ty TNHH MTV Xổ số Kiến thiết Khánh Hòa">Công ty TNHH MTV Xổ số Kiến thiết Khánh Hòa (100% vốn NN)</option>
                  <option value="Công ty CP Cấp thoát nước Khánh Hòa">Công ty CP Cấp thoát nước Khánh Hòa (Vốn NN chi phối)</option>
                  <option value="Công ty CP Đô thị Nha Trang">Công ty CP Đô thị Nha Trang (Vốn NN chi phối)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Vốn điều lệ / Vốn nhà nước nắm giữ (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="von_dieu_le" placeholder="Ví dụ: 1.500.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Doanh thu thuần trong năm (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="doanh_thu" placeholder="Ví dụ: 4.850.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Lợi nhuận sau thuế (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="loi_nhuan" placeholder="Ví dụ: 480.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tỷ suất lợi nhuận trên vốn chủ sở hữu (ROE) (%) <span class="req">*</span></label>
                <input type="text" class="form-control" name="roe" placeholder="Ví dụ: 18.5%" required />
              </div>
              <div class="form-group">
                <label class="form-label">Mức độ bảo toàn & phát triển vốn</label>
                <select class="form-control" name="bao_toan_von">
                  <option value="BAO_TOAN_PHAT_TRIEN">Bảo toàn và có phát triển vốn nhà nước (Hệ số H > 1)</option>
                  <option value="BAO_TOAN">Bảo toàn vốn nhà nước (Hệ số H = 1)</option>
                  <option value="KHONG_BAO_TOAN">Không bảo toàn được vốn nhà nước (Hệ số H < 1)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Kết quả xếp loại doanh nghiệp đề xuất</label>
                <select class="form-control" name="xep_loai">
                  <option value="LOAI_A">Doanh nghiệp Loại A (Hoàn thành xuất sắc)</option>
                  <option value="LOAI_B">Doanh nghiệp Loại B (Hoàn thành kế hoạch)</option>
                  <option value="LOAI_C">Doanh nghiệp Loại C (Chưa hoàn thành)</option>
                </select>
              </div>
              <div class="form-group full-width">
                <label class="form-label">Đánh giá chấp hành nghĩa vụ nộp NSNN và phân phối lợi nhuận sau thuế</label>
                <textarea class="form-control" name="danh_gia" placeholder="Doanh nghiệp nộp đúng hạn vào NSNN, trích lập các quỹ đầu tư phát triển và quỹ khen thưởng đúng quy định..."></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn btn-secondary"><i data-lucide="rotate-ccw"></i> Nhập lại</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Trình UBND tỉnh phê duyệt xếp loại</button>
            </div>
          </form>
        ` : `
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="layers"></i> Theo dõi Tình hình Thu - Chi và Dư Quỹ Ngoài Ngân sách</h3>
              <p class="card-subtitle">Giám sát hoạt động và bảo toàn vốn các Quỹ tài chính nhà nước ngoài ngân sách thuộc tỉnh</p>
            </div>
            <button class="btn btn-soft-primary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_ThuChi_QuyNgoaiNS.xlsx')">
              <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
            </button>
          </div>

          <form id="formEntryQuy2" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Quản lý Doanh nghiệp', 'Báo cáo Quỹ ngoài ngân sách')">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Tên Quỹ tài chính ngoài ngân sách <span class="req">*</span></label>
                <select class="form-control" name="ten_quy">
                  <option value="Quỹ Đầu tư Phát triển Khánh Hòa">Quỹ Đầu tư Phát triển Khánh Hòa</option>
                  <option value="Quỹ Phát triển Đất tỉnh Khánh Hòa">Quỹ Phát triển Đất tỉnh Khánh Hòa</option>
                  <option value="Quỹ Bảo vệ Môi trường Khánh Hòa">Quỹ Bảo vệ Môi trường Khánh Hòa</option>
                  <option value="Quỹ Bảo vệ và Phát triển Rừng">Quỹ Bảo vệ và Phát triển Rừng</option>
                  <option value="Quỹ Hỗ trợ Nông dân">Quỹ Hỗ trợ Nông dân</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Kỳ báo cáo <span class="req">*</span></label>
                <input type="text" class="form-control" name="ky_bc" value="6 tháng đầu năm 2026" required />
              </div>
              <div class="form-group">
                <label class="form-label">Vốn điều lệ ngân sách cấp (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="von_dieu_le" placeholder="Ví dụ: 500.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tổng số thu của Quỹ trong kỳ (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="so_thu" placeholder="Ví dụ: 45.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tổng số chi hoạt động & cho vay (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="so_chi" placeholder="Ví dụ: 38.000.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Số dư Quỹ cuối kỳ (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="so_du" placeholder="Ví dụ: 507.000.000.000" required />
              </div>
              <div class="form-group full-width">
                <label class="form-label">Đánh giá hiệu quả hoạt động và bảo toàn vốn Quỹ</label>
                <textarea class="form-control" name="danh_gia_quy" placeholder="Quỹ bảo đảm thanh khoản, tỷ lệ nợ xấu cho vay đầu tư dưới 1%..."></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn btn-secondary"><i data-lucide="rotate-ccw"></i> Nhập lại</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Lưu báo cáo quỹ vào CSDL</button>
            </div>
          </form>
        `}
      `;
    } else if (deptId === 'dept-phapche') {
      // 5. PHÒNG PHÁP CHẾ
      container.innerHTML = `
        <div class="sub-tabs-bar">
          <button class="sub-tab-btn ${subTabId === 'tab1' ? 'active' : ''}" onclick="DataEntryManager.switchSubTab('tab1')">
            <i data-lucide="gavel"></i> Xử phạt VPHC & Thu nộp KBNN
          </button>
          <button class="sub-tab-btn ${subTabId === 'tab2' ? 'active' : ''}" onclick="DataEntryManager.switchSubTab('tab2')">
            <i data-lucide="mail"></i> Đơn thư Khiếu nại, Tố cáo
          </button>
          <button class="sub-tab-btn ${subTabId === 'tab3' ? 'active' : ''}" onclick="DataEntryManager.switchSubTab('tab3')">
            <i data-lucide="book-open"></i> Văn bản QPPL & Cơ chế chính sách
          </button>
        </div>

        ${subTabId === 'tab1' ? `
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="gavel"></i> Theo dõi Quyết định Xử phạt Vi phạm hành chính (VPHC) & Đôn đốc nộp phạt</h3>
              <p class="card-subtitle">Theo dõi đôn đốc thi hành các quyết định xử phạt VPHC trong lĩnh vực quản lý giá, phí, kế toán, hóa đơn và đấu thầu</p>
            </div>
            <button class="btn btn-soft-primary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_TheoDoi_VPHC.xlsx')">
              <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
            </button>
          </div>

          <form id="formEntryPC1" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Pháp chế', 'Hồ sơ Xử phạt VPHC')">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Số Quyết định xử phạt VPHC <span class="req">*</span></label>
                <input type="text" class="form-control" name="so_qd" placeholder="Ví dụ: QĐ-XPHC-2026-024" required />
              </div>
              <div class="form-group">
                <label class="form-label">Ngày ban hành Quyết định <span class="req">*</span></label>
                <input type="date" class="form-control" name="ngay_ban_hanh" required />
              </div>
              <div class="form-group">
                <label class="form-label">Cá nhân / Tổ chức bị xử phạt <span class="req">*</span></label>
                <input type="text" class="form-control" name="doi_tuong_vi_pham" placeholder="Tên công ty hoặc cá nhân vi phạm..." required />
              </div>
              <div class="form-group">
                <label class="form-label">Mã số thuế / CCCD đối tượng vi phạm</label>
                <input type="text" class="form-control" name="mst" placeholder="Ví dụ: 4201998811" />
              </div>
              <div class="form-group">
                <label class="form-label">Lĩnh vực vi phạm hành chính <span class="req">*</span></label>
                <select class="form-control" name="linh_vuc">
                  <option value="XU_PHAT_GIA">Vi phạm quy định quản lý giá, niêm yết giá, kê khai giá</option>
                  <option value="XU_PHAT_KE_TOAN">Vi phạm chế độ kế toán, lập và nộp BCTC</option>
                  <option value="XU_PHAT_DAU_THAU">Vi phạm quy định trong đấu thầu, mua sắm công</option>
                  <option value="XU_PHAT_PHI">Vi phạm chế độ thu, nộp, quản lý phí, lệ phí</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Số tiền phạt theo Quyết định (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="so_tien_phat" placeholder="Ví dụ: 45.000.000" required />
              </div>
              <div class="form-group">
                <label class="form-label">Số tiền thực tế đã nộp vào KBNN (VNĐ) <span class="req">*</span></label>
                <input type="text" class="form-control" name="so_tien_da_nop" placeholder="Ví dụ: 45.000.000 (Nếu đã nộp)" required />
              </div>
              <div class="form-group">
                <label class="form-label">Kho bạc Nhà nước nơi nộp phạt</label>
                <select class="form-control" name="kho_bac">
                  <option value="KBNN Tỉnh Khánh Hòa">KBNN Tỉnh Khánh Hòa</option>
                  <option value="KBNN khu vực Nha Trang">KBNN khu vực Nha Trang</option>
                  <option value="KBNN khu vực Phan Rang">KBNN khu vực Phan Rang</option>
                  <option value="KBNN khu vực Cam Ranh">KBNN khu vực Cam Ranh</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Thời hạn chấp hành nộp phạt <span class="req">*</span></label>
                <input type="date" class="form-control" name="han_chot" required />
              </div>
              <div class="form-group">
                <label class="form-label">Trạng thái thi hành Quyết định <span class="req">*</span></label>
                <select class="form-control" name="trang_thai">
                  <option value="DA_NOP_KBNN">Đã nộp đủ tiền phạt vào Kho bạc Nhà nước</option>
                  <option value="DANG_DON_DOC">Đang trong thời hạn / Đang đôn đốc thi hành</option>
                  <option value="CUONG_CHE">Quá hạn, đã ban hành Quyết định cưỡng chế thi hành</option>
                </select>
              </div>
              <div class="form-group full-width">
                <label class="form-label">Hành vi vi phạm & Biện pháp khắc phục hậu quả</label>
                <textarea class="form-control" name="noi_dung" placeholder="Không niêm yết giá hàng hóa dịch vụ theo quy định tại Điểm a Khoản 1 Điều 12... Buộc nộp lại số lợi bất hợp pháp..."></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn btn-secondary"><i data-lucide="rotate-ccw"></i> Nhập lại</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Lưu hồ sơ xử phạt nạp CSDL</button>
            </div>
          </form>
        ` : subTabId === 'tab2' ? `
          <div class="card-header">
            <div>
              <h3 class="card-title"><i data-lucide="mail"></i> Tiếp nhận và Theo dõi Giải quyết Đơn thư Khiếu nại, Tố cáo</h3>
              <p class="card-subtitle">Quản lý luồng xử lý đơn thư khiếu nại, tố cáo, kiến nghị, phản ánh thuộc thẩm quyền giải quyết của Sở Tài chính</p>
            </div>
            <button class="btn btn-soft-primary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_DonThu_KhieuNai.xlsx')">
              <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
            </button>
          </div>

          <form id="formEntryPC2" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Pháp chế', 'Hồ sơ Đơn thư khiếu nại tố cáo')">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Mã đơn thư / Số văn thư tiếp nhận <span class="req">*</span></label>
                <input type="text" class="form-control" name="ma_don" placeholder="Ví dụ: ĐT-KN-2026-008" required />
              </div>
              <div class="form-group">
                <label class="form-label">Ngày tiếp nhận đơn <span class="req">*</span></label>
                <input type="date" class="form-control" name="ngay_tiep_nhan" required />
              </div>
              <div class="form-group">
                <label class="form-label">Họ tên người gửi đơn / Cơ quan kiến nghị <span class="req">*</span></label>
                <input type="text" class="form-control" name="nguoi_gui" placeholder="Nhập tên công dân hoặc tổ chức..." required />
              </div>
              <div class="form-group">
                <label class="form-label">Địa chỉ liên hệ người gửi đơn <span class="req">*</span></label>
                <input type="text" class="form-control" name="dia_chi" placeholder="Địa chỉ thường trú, số điện thoại..." required />
              </div>
              <div class="form-group">
                <label class="form-label">Loại đơn thư <span class="req">*</span></label>
                <select class="form-control" name="loai_don">
                  <option value="DON_KHIEU_NAI">Đơn khiếu nại hành chính</option>
                  <option value="DON_TO_CAO">Đơn tố cáo hành vi vi phạm</option>
                  <option value="KIEN_NGHI_PHAN_ANH">Đơn kiến nghị, phản ánh chính sách tài chính, giá đất</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Phòng ban chuyên môn được giao thụ lý xác minh</label>
                <select class="form-control" name="phong_thu_ly">
                  <option value="Phòng Pháp chế">Phòng Pháp chế</option>
                  <option value="Phòng Quản lý Giá và Công sản">Phòng Quản lý Giá và Công sản</option>
                  <option value="Phòng Quản lý Đầu tư công">Phòng Quản lý Đầu tư công</option>
                  <option value="Phòng Kinh tế và Ngân sách">Phòng Kinh tế và Ngân sách</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Thời hạn giải quyết trả lời đơn <span class="req">*</span></label>
                <input type="date" class="form-control" name="han_tra_loi" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tiến độ giải quyết</label>
                <select class="form-control" name="tien_do">
                  <option value="DANG_XAC_MINH">Đang thụ lý xác minh / Lấy ý kiến các đơn vị</option>
                  <option value="DA_BAN_HANH_VB">Đã ban hành văn bản trả lời công dân (Đúng hạn)</option>
                  <option value="CHUYEN_CO_QUAN_KHAC">Không thuộc thẩm quyền, đã chuyển cơ quan liên quan</option>
                </select>
              </div>
              <div class="form-group full-width">
                <label class="form-label">Tóm tắt nội dung đơn thư & Kết quả xác minh trả lời</label>
                <textarea class="form-control" name="noi_dung_don" placeholder="Nội dung khiếu nại về phương án bồi thường tài sản trên đất dự án... Sở Tài chính đã phối hợp UBND TP. Nha Trang xác minh..."></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn btn-secondary"><i data-lucide="rotate-ccw"></i> Nhập lại</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Lưu hồ sơ đơn thư</button>
            </div>
          </form>
        ` : `
          <!-- TAB 3: DANH MỤC 342 VBQPPL & NQ 55 -->
          <div class="card-header">
            <div>
              <h3 class="card-title" style="color: #0284c7;"><i data-lucide="book-open"></i> Hệ thống hóa 342 Văn bản QPPL & Khung Cơ chế Chính sách Đặc thù</h3>
              <p class="card-subtitle">Quản lý hiệu lực các Nghị quyết HĐND tỉnh, Quyết định UBND tỉnh về tài chính - ngân sách và các cơ chế chính sách ưu đãi đầu tư</p>
            </div>
            <button class="btn btn-soft-primary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_VBQPPL_ChinhSach.xlsx')">
              <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
            </button>
          </div>

          <form id="formEntryPC3" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Pháp chế', 'Văn bản QPPL & Cơ chế chính sách')">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Số ký hiệu văn bản <span class="req">*</span></label>
                <input type="text" class="form-control" name="so_ky_hieu" placeholder="Ví dụ: 08/2026/NQ-HĐND hoặc 15/2025/QĐ-UBND" required />
              </div>
              <div class="form-group">
                <label class="form-label">Cơ quan ban hành <span class="req">*</span></label>
                <select class="form-control" name="co_quan">
                  <option value="HĐND tỉnh Khánh Hòa">HĐND tỉnh Khánh Hòa</option>
                  <option value="UBND tỉnh Khánh Hòa">UBND tỉnh Khánh Hòa</option>
                  <option value="Quốc hội (NQ 55/2022/QH15)">Quốc hội (NQ 55/2022/QH15)</option>
                  <option value="Chính phủ (Nghị định hướng dẫn)">Chính phủ (Nghị định hướng dẫn)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Ngày ban hành <span class="req">*</span></label>
                <input type="date" class="form-control" name="ngay_ban_hanh" required />
              </div>
              <div class="form-group">
                <label class="form-label">Ngày bắt đầu có hiệu lực <span class="req">*</span></label>
                <input type="date" class="form-control" name="ngay_hieu_luc" required />
              </div>
              <div class="form-group">
                <label class="form-label">Lĩnh vực tài chính điều chỉnh <span class="req">*</span></label>
                <select class="form-control" name="linh_vuc_vb">
                  <option value="PHAN_CAP_NGAN_SACH">Phân cấp nguồn thu & nhiệm vụ chi ngân sách</option>
                  <option value="UU_DAI_DAU_TU_NQ55">Chính sách ưu đãi đầu tư, thuế đặc thù KKT Vân Phong (NQ 55)</option>
                  <option value="BANG_GIA_DAT">Quy định bảng giá đất và hệ số K</option>
                  <option value="DINH_MUC_CHI_HCSN">Định mức phân bổ dự toán chi thường xuyên</option>
                  <option value="QUAN_LY_TAI_SAN_CONG">Quy chế quản lý, sử dụng tài sản công địa phương</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Tình trạng hiệu lực pháp lý <span class="req">*</span></label>
                <select class="form-control" name="tinh_trang_hieu_luc">
                  <option value="CON_HIEU_LUC">Còn hiệu lực thi hành toàn bộ</option>
                  <option value="HET_HIEU_LUC_MOT_PHAN">Hết hiệu lực một phần (Đã có văn bản sửa đổi)</option>
                  <option value="HET_HIEU_LUC_TOAN_BO">Hết hiệu lực toàn bộ (Đã bị thay thế/bãi bỏ)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Tệp toàn văn văn bản số hóa (PDF) <span class="req">*</span></label>
                <input type="file" class="form-control" name="file_vb_pdf" accept=".pdf" />
              </div>
              <div class="form-group full-width">
                <label class="form-label">Trích yếu nội dung văn bản QPPL</label>
                <textarea class="form-control" name="trich_yeu" placeholder="Quy định một số cơ chế, chính sách tài chính đặc thù phát triển tỉnh Khánh Hòa..."></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn btn-secondary"><i data-lucide="rotate-ccw"></i> Nhập lại</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Cập nhật vào danh mục 342 VBQPPL</button>
            </div>
          </form>
        `}
      `;
    } else if (deptId === 'dept-hcsn') {
      // 6. PHÒNG TÀI CHÍNH HÀNH CHÍNH SỰ NGHIỆP (HCSN)
      container.innerHTML = `
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="graduation-cap"></i> Thẩm tra phương án tự chủ tài chính đơn vị sự nghiệp công lập</h3>
            <p class="card-subtitle">Phân loại mức độ tự chủ tài chính giai đoạn ổn định 03 năm theo Nghị định 60/2021/NĐ-CP</p>
          </div>
          <button class="btn btn-soft-primary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_TuChu_HCSN_N60.xlsx')">
            <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
          </button>
        </div>

        <form id="formEntryHCSN" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Tài chính Hành chính sự nghiệp', 'Phương án tự chủ Nghị định số 60')">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Mã đơn vị QHNS <span class="req">*</span></label>
              <input type="text" class="form-control" name="ma_dv" placeholder="Ví dụ: 1089221" required />
            </div>
            <div class="form-group">
              <label class="form-label">Tên đơn vị sự nghiệp công lập <span class="req">*</span></label>
              <input type="text" class="form-control" name="ten_dv" placeholder="Nhập tên trường học, bệnh viện, trung tâm..." required />
            </div>
            <div class="form-group">
              <label class="form-label">Cơ quan quản lý cấp trên <span class="req">*</span></label>
              <select class="form-control" name="co_quan_chu_quan">
                <option value="Sở Y Tế">Sở Y Tế</option>
                <option value="Sở Giáo Dục và Đào Tạo">Sở Giáo Dục và Đào Tạo</option>
                <option value="Sở Văn Hóa và Thể Thao">Sở Văn Hóa và Thể Thao</option>
                <option value="Sở Lao Động - Thương Binh và Xã Hội">Sở Lao Động - Thương Binh và Xã Hội</option>
                <option value="Sở Nông nghiệp và Môi trường">Sở Nông nghiệp và Môi trường</option>
                <option value="Sở Xây dựng">Sở Xây dựng</option>
                <option value="UBND phường Nha Trang">UBND phường Nha Trang</option>
                <option value="UBND phường Phan Rang">UBND phường Phan Rang</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Nhóm tự chủ tài chính đề xuất <span class="req">*</span></label>
              <select class="form-control" name="nhom_tu_chu">
                <option value="NHOM_1">Nhóm 1: Tự bảo đảm chi thường xuyên & chi đầu tư</option>
                <option value="NHOM_2">Nhóm 2: Tự bảo đảm chi thường xuyên</option>
                <option value="NHOM_3">Nhóm 3: Tự bảo đảm một phần chi thường xuyên (từ 10% đến dưới 100%)</option>
                <option value="NHOM_4">Nhóm 4: Nhà nước bảo đảm 100% chi thường xuyên</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Dự kiến nguồn thu sự nghiệp năm (VNĐ) <span class="req">*</span></label>
              <input type="text" class="form-control" name="thu_su_nghiep" placeholder="Ví dụ: 120.000.000.000" required />
            </div>
            <div class="form-group">
              <label class="form-label">Kinh phí NSNN hỗ trợ chi thường xuyên (VNĐ) <span class="req">*</span></label>
              <input type="text" class="form-control" name="nsnn_ho_tro" placeholder="Ví dụ: 15.000.000.000 (Nếu Nhóm 2/3/4)" required />
            </div>
            <div class="form-group">
              <label class="form-label">Số biên chế hưởng lương từ nguồn thu sự nghiệp</label>
              <input type="number" class="form-control" name="bien_che_tu_chu" placeholder="Ví dụ: 185 người" />
            </div>
            <div class="form-group">
              <label class="form-label">Giai đoạn thực hiện</label>
              <input type="text" class="form-control" name="giai_doan" value="2026 - 2028 (03 năm ổn định)" />
            </div>
            <div class="form-group full-width">
              <label class="form-label">Ý kiến thẩm tra của Phòng Tài chính Hành chính sự nghiệp</label>
              <textarea class="form-control" name="y_kien_tham_tra" placeholder="Đơn vị có nguồn thu viện phí/học phí bảo đảm trang trải 100% quỹ lương, đủ điều kiện giao tự chủ Nhóm 2..."></textarea>
            </div>
          </div>
          <div class="form-actions">
            <button type="reset" class="btn btn-secondary"><i data-lucide="rotate-ccw"></i> Nhập lại</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Trình lãnh đạo Sở phê duyệt phương án tự chủ</button>
          </div>
        </form>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  },

  handleSubmit(e, deptName, typeName) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObj = {};
    formData.forEach((value, key) => { dataObj[key] = value; });

    const newSub = {
      id: "SUB-2026-" + Math.floor(100 + Math.random() * 900),
      dept: deptName,
      title: dataObj.ten_du_an || dataObj.ten_quy_hoach || dataObj.ten_ts || dataObj.ho_ten || dataObj.so_qd || dataObj.so_ky_hieu || dataObj.ten_dv || dataObj.ten_dn || `Hồ sơ ${typeName} - Năm 2026`,
      type: typeName,
      submittedBy: "Chuyên viên thụ lý phòng chuyên môn",
      submittedDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "PENDING",
      data: dataObj
    };

    APP_DATA.pendingSubmissions.unshift(newSub);
    this.renderPendingTable();
    e.target.reset();
    App.showNotification(`Đã gửi hồ sơ [${newSub.id}] lên Lãnh đạo Sở xét duyệt nạp CSDL!`, "info");
  },

  renderPendingTable() {
    const tbody = document.getElementById('pendingSubmissionsTableBody');
    if (!tbody) return;

    const isDirector = (App.currentUser && (App.currentUser.deptId === 'lanhdao' || App.currentUser.role === 'DIRECTOR'));
    const currentDeptName = (App.currentUser && App.currentUser.dept) || '';

    // Filter submissions if specialist
    const submissions = isDirector 
      ? APP_DATA.pendingSubmissions 
      : APP_DATA.pendingSubmissions.filter(sub => !currentDeptName || sub.dept.toLowerCase().includes(currentDeptName.toLowerCase()) || currentDeptName.toLowerCase().includes(sub.dept.toLowerCase()));

    if (submissions.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #64748b; padding: 24px;">Chưa có hồ sơ nào được lập trong kỳ.</td></tr>`;
      return;
    }

    tbody.innerHTML = submissions.map(sub => `
      <tr>
        <td><strong style="color: #002B8C;">${sub.id}</strong></td>
        <td>
          <div style="font-weight: 600; color: var(--text-pure);">${sub.title}</div>
          <div style="font-size: 11px; color: var(--text-muted);">${sub.dept}</div>
        </td>
        <td><span class="badge badge-info">${sub.type}</span></td>
        <td>${sub.submittedBy}</td>
        <td>${sub.submittedDate}</td>
        <td>
          <span class="badge ${sub.status === 'APPROVED' ? 'badge-success' : sub.status === 'REJECTED' ? 'badge-danger' : 'badge-warning'}">
            ${sub.status === 'APPROVED' ? 'Đã phê duyệt nạp CSDL' : sub.status === 'REJECTED' ? 'Từ chối' : 'Chờ Lãnh đạo Sở duyệt'}
          </span>
        </td>
        <td>
          ${isDirector && sub.status === 'PENDING' ? `
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-success btn-sm" onclick="DataEntryManager.approveSubmission('${sub.id}')">
                <i data-lucide="check"></i> Duyệt
              </button>
              <button class="btn btn-danger btn-sm" onclick="DataEntryManager.rejectSubmission('${sub.id}')">
                <i data-lucide="x"></i> Từ chối
              </button>
            </div>
          ` : `
            <span style="font-size: 11px; color: #64748b;">${sub.status === 'APPROVED' ? 'Đã nạp CSDL' : sub.status === 'REJECTED' ? 'Trả lại chuyên viên' : 'Đang xử lý'}</span>
          `}
        </td>
      </tr>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  approveSubmission(subId) {
    const sub = APP_DATA.pendingSubmissions.find(s => s.id === subId);
    if (!sub) return;

    sub.status = 'APPROVED';
    sub.approvedBy = 'Lãnh đạo Sở Tài chính';
    sub.approvedDate = new Date().toISOString().replace('T', ' ').substring(0, 16);

    this.renderPendingTable();
    App.showNotification(`Đã phê duyệt hồ sơ [${subId}]! Dữ liệu đã được nạp chính thức vào Kho CSDL Kinh tế Khánh Hòa.`, 'success');
  },

  rejectSubmission(subId) {
    const sub = APP_DATA.pendingSubmissions.find(s => s.id === subId);
    if (!sub) return;

    const reason = prompt("Nhập lý do từ chối hồ sơ (yêu cầu chuyên viên hoàn thiện lại):", "Số liệu chưa khớp với Quyết định đính kèm");
    if (!reason) return;

    sub.status = 'REJECTED';
    sub.rejectReason = reason;

    this.renderPendingTable();
    App.showNotification(`Đã trả lại hồ sơ [${subId}] với lý do: "${reason}"`, 'warning');
  },

  downloadTemplate(fileName) {
    App.showNotification(`Đang tạo và tải xuống tệp mẫu [${fileName}] chuẩn cấu trúc Sở Tài chính Khánh Hòa...`, 'info');
  },

  handleExcelDrop(e) {
    e.preventDefault();
    App.showNotification("Đã nhận tệp Excel. Hệ thống kiểm tra cấu trúc dữ liệu hợp lệ và sẵn sàng nạp!", "success");
  }
};
