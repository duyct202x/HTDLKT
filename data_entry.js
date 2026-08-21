/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * PHÂN HỆ NHẬP LIỆU & KIỂM DUYỆT NGHIỆP VỤ CHUYÊN MÔN SỞ TÀI CHÍNH
 * (Theo Quyết định 15/2025/QĐ-UBND - Loại bỏ nhập thu chuyên ngành do đã có API TABMIS/Thuế)
 */

const DataEntryManager = {
  currentDept: 'dept-ktns',

  init() {
    this.renderDeptForm('dept-ktns');
    this.renderPendingTable();
  },

  switchDeptTab(deptId, tabBtn) {
    this.currentDept = deptId;
    document.querySelectorAll('#entryDeptTabs .tab-btn').forEach(b => b.classList.remove('active'));
    if (tabBtn) tabBtn.classList.add('active');
    this.renderDeptForm(deptId);
  },

  renderDeptForm(deptId) {
    const container = document.getElementById('dynamicDeptFormContainer');
    if (!container) return;

    if (deptId === 'dept-ktns') {
      // 1. Phòng Kinh tế và Ngân sách: Giao & Điều Chỉnh Dự Toán NSNN Cấp Tỉnh (HĐND & UBND)
      container.innerHTML = `
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="pie-chart"></i> Phương án giao và điều chỉnh phân bổ dự toán ngân sách nhà nước</h3>
            <p class="card-subtitle">Nhập quyết nghị HĐND tỉnh và Quyết định UBND tỉnh giao chỉ tiêu dự toán thu - chi ngân sách cho các sở ngành, địa phương</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_GiaoDuToan_NSNN.xlsx')">
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
                <option value="UBND phường Lộc Thọ (Nha Trang)">UBND phường Lộc Thọ (Nha Trang)</option>
                <option value="UBND phường Cam Nghĩa (Cam Ranh)">UBND phường Cam Nghĩa (Cam Ranh)</option>
                <option value="UBND phường Ninh Hiệp (Ninh Hòa)">UBND phường Ninh Hiệp (Ninh Hòa)</option>
                <option value="UBND thị trấn Cam Đức">UBND thị trấn Cam Đức</option>
                <option value="UBND xã Vạn Thắng">UBND xã Vạn Thắng</option>
                <option value="UBND xã Diên Hòa">UBND xã Diên Hòa</option>
                <option value="UBND xã Khánh Phú">UBND xã Khánh Phú</option>
                <option value="UBND xã Sơn Hiệp">UBND xã Sơn Hiệp</option>
                <option value="Sở Y tế tỉnh Khánh Hòa">Sở Y tế tỉnh Khánh Hòa</option>
                <option value="Sở Giáo dục và Đào tạo">Sở Giáo dục và Đào tạo</option>
                <option value="Sở Giao thông Vận tải">Sở Giao thông Vận tải</option>
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
            <button type="reset" class="btn btn-secondary">Nhập lại</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Trình lãnh đạo Sở phê duyệt nạp CSDL</button>
          </div>
        </form>
      `;
    } else if (deptId === 'dept-dtc') {
      // 2. Phòng Quản lý Đầu tư công: Thẩm Tra Quyết Toán Vốn Đầu Tư Dự Án Hoàn Thành
      container.innerHTML = `
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="hard-hat"></i> Hồ sơ thẩm tra và phê duyệt quyết toán dự án đầu tư công hoàn thành</h3>
            <p class="card-subtitle">Thẩm tra quyết toán vốn đầu tư công hoàn thành theo Thông tư 96/2021/TT-BTC của Bộ Tài chính</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_QuyetToan_DTC.xlsx')">
            <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
          </button>
        </div>

        <form id="formEntryDTC" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Quản lý đầu tư công', 'Thẩm tra quyết toán vốn ĐTC')">
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
                <option value="Ban Quản lý dự án Đầu Tư Xây Dựng Các Công Trình Giao Thông">Ban Quản lý dự án Công Trình Giao Thông Khánh Hòa</option>
                <option value="Ban Quản lý dự án Đầu Tư Xây Dựng Các Công Trình Nông Nghiệp & PTNT">Ban Quản lý dự án Nông Nghiệp & PTNT</option>
                <option value="Ban Quản lý dự án Đầu Tư Xây Dựng Các Công Trình Dân Dụng & Công Nghiệp">Ban Quản lý dự án Dân Dụng & Công Nghiệp</option>
                <option value="Ban Quản lý dự án Phát Triển Tỉnh Khánh Hòa">Ban Quản lý dự án Phát Triển Tỉnh Khánh Hòa</option>
                <option value="UBND Thành Phố Nha Trang">UBND TP. Nha Trang</option>
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
            <button type="reset" class="btn btn-secondary">Nhập lại</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Trình lãnh đạo phê duyệt quyết toán</button>
          </div>
        </form>
      `;
    } else if (deptId === 'dept-dtns') {
      // 3. Phòng Quản lý Đầu tư ngoài ngân sách: Chủ trương & Ký quỹ dự án FDI / Ngoài NS
      container.innerHTML = `
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="building-2"></i> Hồ sơ giám sát tài chính và ký quỹ dự án ngoài ngân sách và FDI</h3>
            <p class="card-subtitle">Theo dõi tài chính dự án, Giấy chứng nhận ĐKĐT (IRC), tiền ký quỹ bảo đảm thực hiện dự án theo Luật Đầu tư</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_DuAn_NgoaiNS.xlsx')">
            <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
          </button>
        </div>

        <form id="formEntryDTNS" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Quản lý đầu tư ngoài ngân sách', 'Dự án ngoài ngân sách & FDI')">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Mã dự án / Mã IRC <span class="req">*</span></label>
              <input type="text" class="form-control" name="ma_du_an" placeholder="Ví dụ: DA-NNS-2026-088" required />
            </div>
            <div class="form-group">
              <label class="form-label">Tên dự án đầu tư <span class="req">*</span></label>
              <input type="text" class="form-control" name="ten_du_an" placeholder="Nhập tên đầy đủ của dự án..." required />
            </div>
            <div class="form-group">
              <label class="form-label">Nhà đầu tư / Doanh nghiệp <span class="req">*</span></label>
              <input type="text" class="form-control" name="nha_dau_tu" placeholder="Tên công ty / NĐT..." required />
            </div>
            <div class="form-group">
              <label class="form-label">Mã số thuế <span class="req">*</span></label>
              <input type="text" class="form-control" name="mst" placeholder="Ví dụ: 4201998822" required />
            </div>
            <div class="form-group">
              <label class="form-label">Địa bàn thực hiện <span class="req">*</span></label>
              <select class="form-control" name="dia_ban">
                <option value="Khu vực Nha Trang">Khu vực Nha Trang</option>
                <option value="Khu vực Cam Ranh">Khu vực Cam Ranh</option>
                <option value="Khu vực Ninh Hòa">Khu vực Ninh Hòa</option>
                <option value="Khu vực Cam Lâm">Khu vực Cam Lâm</option>
                <option value="Khu vực Vạn Ninh">Khu vực Vạn Ninh</option>
                <option value="Khu vực Diên Khánh">Khu vực Diên Khánh</option>
                <option value="Khu vực Khánh Vĩnh">Khu vực Khánh Vĩnh</option>
                <option value="Khu vực Khánh Sơn">Khu vực Khánh Sơn</option>
                <option value="Đặc khu Trường Sa">Đặc khu Trường Sa</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Tổng vốn đầu tư đăng ký (VNĐ) <span class="req">*</span></label>
              <input type="text" class="form-control" name="tong_von" placeholder="Ví dụ: 1.200.000.000.000" required />
            </div>
            <div class="form-group">
              <label class="form-label">Vốn FDI quy đổi (USD - nếu có)</label>
              <input type="text" class="form-control" name="von_usd" placeholder="Ví dụ: 48.000.000 USD" />
            </div>
            <div class="form-group">
              <label class="form-label">Số tiền ký quỹ bảo đảm thực hiện dự án (VNĐ) <span class="req">*</span></label>
              <input type="text" class="form-control" name="so_tien_ky_quy" placeholder="Ví dụ: 36.000.000.000 (1-3% tổng vốn)" required />
            </div>
            <div class="form-group full-width">
              <label class="form-label">Tiến độ giải ngân cam kết & Nghĩa vụ tài chính đất đai</label>
              <textarea class="form-control" name="tien_do_cam_ket" placeholder="Cam kết hoàn thành đưa vào hoạt động Quý IV/2027, tiền thuê đất nộp hằng năm..."></textarea>
            </div>
          </div>

          <div class="form-actions">
            <button type="reset" class="btn btn-secondary">Nhập lại</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Trình lãnh đạo phê duyệt</button>
          </div>
        </form>
      `;
    } else if (deptId === 'dept-giacongsan') {
      // 4. Phòng Quản lý Giá & Công sản: Sắp Xếp Nhà Đất Công (Nghị định số 167) & Kê Khai Giá Bình Ổn
      container.innerHTML = `
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="home"></i> Phương án sắp xếp cơ sở nhà đất công và kê khai giá bình ổn</h3>
            <p class="card-subtitle">Xử lý nhà đất công dôi dư theo Nghị định số 167/2017, Nghị định số 67/2021 và thẩm tra kê khai giá theo Luật Giá 2023</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_SapXep_NhaDat.xlsx')">
            <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
          </button>
        </div>

        <form id="formEntryGCS" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Quản lý giá và công sản', 'Sắp xếp nhà đất & kê khai giá')">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Mã cơ sở nhà đất / Mã hồ sơ giá <span class="req">*</span></label>
              <input type="text" class="form-control" name="ma_ts" placeholder="Ví dụ: TSC-79-NTR-045" required />
            </div>
            <div class="form-group">
              <label class="form-label">Tên cơ sở nhà đất / Mặt hàng kê khai <span class="req">*</span></label>
              <input type="text" class="form-control" name="ten_ts" placeholder="Ví dụ: Trụ sở cũ Chi cục Thuế Nha Trang..." required />
            </div>
            <div class="form-group">
              <label class="form-label">Đơn vị quản lý / Doanh nghiệp kê khai <span class="req">*</span></label>
              <input type="text" class="form-control" name="don_vi" placeholder="Tên cơ quan, doanh nghiệp..." required />
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
                <option value="KE_KHAI_GIA_BINH_ON">Kê khai giá hàng hóa bình ổn thị trường</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Giá trị ước tính / Mức giá đăng ký (VNĐ)</label>
              <input type="text" class="form-control" name="gia_tri" placeholder="Ví dụ: 85.000.000.000" />
            </div>
            <div class="form-group">
              <label class="form-label">Trạng thái hồ sơ</label>
              <select class="form-control" name="trang_thai">
                <option value="TRINH_UBND">Đủ điều kiện trình UBND tỉnh phê duyệt</option>
                <option value="DANG_XIN_Y_KIEN">Đang lấy ý kiến sở ngành, địa phương</option>
                <option value="DA_PHE_DUYET">Đã có Quyết định phê duyệt phương án</option>
              </select>
            </div>
            <div class="form-group full-width">
              <label class="form-label">Thuyết minh hiện trạng sử dụng và cơ sở pháp lý</label>
              <textarea class="form-control" name="thuyet_minh" placeholder="Hiện trạng dôi dư do sáp nhập đơn vị hành chính, phù hợp quy hoạch sử dụng đất..."></textarea>
            </div>
          </div>

          <div class="form-actions">
            <button type="reset" class="btn btn-secondary">Nhập lại</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Trình Hội đồng xử lý nhà đất tỉnh</button>
          </div>
        </form>
      `;
    } else if (deptId === 'dept-hcsn') {
      // 5. Phòng Tài chính HCSN: Thẩm Tra Phương Án Tự Chủ Tài Chính ĐVSNCL (Nghị định 60)
      container.innerHTML = `
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="graduation-cap"></i> Thẩm tra phương án tự chủ tài chính đơn vị sự nghiệp công lập</h3>
            <p class="card-subtitle">Phân loại mức độ tự chủ tài chính giai đoạn ổn định 03 năm theo Nghị định 60/2021/NĐ-CP</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_TuChu_HCSN_N60.xlsx')">
            <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
          </button>
        </div>

        <form id="formEntryHCSN" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Tài chính hành chính sự nghiệp', 'Phương án tự chủ Nghị định số 60')">
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
                <option value="Sở Nông Nghiệp và PTNT">Sở Nông Nghiệp và PTNT</option>
                <option value="UBND Thành Phố Nha Trang">UBND TP. Nha Trang</option>
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
              <label class="form-label">Ý kiến thẩm tra của Phòng Tài chính HCSN</label>
              <textarea class="form-control" name="y_kien_tham_tra" placeholder="Đơn vị có nguồn thu viện phí/học phí bảo đảm trang trải 100% quỹ lương, đủ điều kiện giao tự chủ Nhóm 2..."></textarea>
            </div>
          </div>

          <div class="form-actions">
            <button type="reset" class="btn btn-secondary">Nhập lại</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Trình lãnh đạo Sở phê duyệt phương án tự chủ</button>
          </div>
        </form>
      `;
    } else if (deptId === 'dept-doanhnghiep') {
      // 6. Phòng Quản lý Doanh nghiệp: Giám Sát Tài Chính & Đánh Giá Xếp Loại Doanh Nghiệp Có Vốn Nhà Nước
      container.innerHTML = `
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="briefcase"></i> Giám sát tài chính và đánh giá xếp loại doanh nghiệp nhà nước</h3>
            <p class="card-subtitle">Đánh giá hiệu quả bảo toàn vốn nhà nước và xếp loại doanh nghiệp theo Nghị định 91/2015/NĐ-CP</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_GiamSat_DNNN.xlsx')">
            <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
          </button>
        </div>

        <form id="formEntryDN" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Quản lý doanh nghiệp', 'Giám sát doanh nghiệp nhà nước')">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Mã số thuế <span class="req">*</span></label>
              <input type="text" class="form-control" name="mst" placeholder="Ví dụ: 4200429779" required />
            </div>
            <div class="form-group">
              <label class="form-label">Tên doanh nghiệp có vốn nhà nước <span class="req">*</span></label>
              <select class="form-control" name="ten_dn">
                <option value="Công Ty TNHH MTV Yến Sào Khánh Hòa">Công Ty TNHH MTV Yến Sào Khánh Hòa (100% vốn NN)</option>
                <option value="Tổng Công Ty Khánh Việt (KHATOCO)">Tổng Công Ty Khánh Việt (KHATOCO - 100% vốn NN)</option>
                <option value="Công Ty TNHH MTV Xổ Số Kiến Thiết Khánh Hòa">Công Ty TNHH MTV Xổ Số Kiến Thiết Khánh Hòa (100% vốn NN)</option>
                <option value="Công Ty CP Cấp Thoát Nước Khánh Hòa">Công Ty CP Cấp Thoát Nước Khánh Hòa (Vốn NN chi phối)</option>
                <option value="Công Ty CP Đô Thị Nha Trang">Công Ty CP Đô Thị Nha Trang (Vốn NN chi phối)</option>
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
            <button type="reset" class="btn btn-secondary">Nhập lại</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Trình UBND tỉnh phê duyệt xếp loại</button>
          </div>
        </form>
      `;
    } else if (deptId === 'dept-phapche') {
      // 7. Phòng Pháp Chế: Thẩm Định Dự Thảo VBQPPL & Giám Định Tư Pháp Tài Chính - Kế Toán
      container.innerHTML = `
        <div class="card-header">
          <div>
            <h3 class="card-title"><i data-lucide="scale"></i> Hồ sơ thẩm định dự thảo văn bản QPPL và trưng cầu giám định tư pháp tài chính</h3>
            <p class="card-subtitle">Thẩm định tính pháp lý của chính sách tài chính đặc thù, theo dõi vụ việc giám định tư pháp và thi hành xử phạt VPHC</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="DataEntryManager.downloadTemplate('Mau_PhapChe_GiamDinh.xlsx')">
            <i data-lucide="download"></i> Tải mẫu Excel (.xlsx)
          </button>
        </div>

        <form id="formEntryPC" onsubmit="DataEntryManager.handleSubmit(event, 'Phòng Pháp chế', 'Thẩm định pháp lý & giám định tư pháp')">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Mã hồ sơ / Mã vụ việc <span class="req">*</span></label>
              <input type="text" class="form-control" name="ma_pc" placeholder="Ví dụ: GDTP-2026-008 hoặc TDCS-2026-015" required />
            </div>
            <div class="form-group">
              <label class="form-label">Tên hồ sơ / Vụ việc / Dự thảo <span class="req">*</span></label>
              <input type="text" class="form-control" name="ten_van_ban" placeholder="Dự thảo Nghị quyết / Vụ án trưng cầu giám định / QĐ Xử phạt..." required />
            </div>
            <div class="form-group">
              <label class="form-label">Phân loại nghiệp vụ pháp chế <span class="req">*</span></label>
              <select class="form-control" name="loai_nghiep_vu">
                <option value="THAM_DINH_CHINH_SACH">Thẩm định dự thảo Nghị quyết HĐND / Quyết định UBND tỉnh</option>
                <option value="GIAM_DINH_TU_PHAP">Giám định tư pháp tài chính - kế toán (CSĐT/Tòa án)</option>
                <option value="XU_PHAT_VPHC">Theo dõi thi hành Quyết định xử phạt VPHC trong lĩnh vực tài chính, giá</option>
                <option value="Y_KIEN_HOP_DONG">Ý kiến pháp lý hợp đồng dự án PPP / thỏa thuận đầu tư FDI lớn</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Cơ quan yêu cầu / Cơ quan soạn thảo <span class="req">*</span></label>
              <input type="text" class="form-control" name="co_quan" placeholder="Cơ quan CSĐT / Tòa án tỉnh / Phòng chuyên môn..." required />
            </div>
            <div class="form-group">
              <label class="form-label">Giám định viên / Chuyên viên phụ trách</label>
              <input type="text" class="form-control" name="chuyen_vien" placeholder="Ví dụ: Võ Văn Hoàng, Nguyễn Thị Lan" />
            </div>
            <div class="form-group">
              <label class="form-label">Thời hạn kết luận / Hạn nộp phạt <span class="req">*</span></label>
              <input type="date" class="form-control" name="han_chot" required />
            </div>
            <div class="form-group">
              <label class="form-label">Số tiền nộp phạt / Giá trị thiệt hại ước tính (VNĐ)</label>
              <input type="text" class="form-control" name="gia_tri_tien" placeholder="Ví dụ: 420.000.000" />
            </div>
            <div class="form-group">
              <label class="form-label">Kết luận / Tiến độ xử lý</label>
              <select class="form-control" name="ket_luan">
                <option value="DANG_XU_LY">Đang tiến hành giám định / thẩm định</option>
                <option value="DU_DIEU_KIEN">Đủ điều kiện pháp lý trình ban hành</option>
                <option value="DA_KET_LUAN">Đã ban hành Kết luận giám định tư pháp</option>
                <option value="DA_NOP_PHAT_KBNN">Đã thi hành nộp phạt vào KBNN</option>
              </select>
            </div>
            <div class="form-group full-width">
              <label class="form-label">Nội dung tóm tắt & Ý kiến pháp lý / Căn cứ trưng cầu</label>
              <textarea class="form-control" name="noi_dung" placeholder="Tóm tắt yêu cầu giám định số liệu sổ sách kế toán, hóa đơn, hoặc rà soát tính hợp hiến, hợp pháp của dự thảo chính sách..."></textarea>
            </div>
          </div>

          <div class="form-actions">
            <button type="reset" class="btn btn-secondary">Nhập lại</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="send"></i> Trình lãnh đạo Sở phê duyệt</button>
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
      title: dataObj.ten_du_an || dataObj.ten_ts || dataObj.ten_dv || dataObj.ten_dn || `Hồ sơ ${typeName} - Năm 2026`,
      type: typeName,
      submittedBy: "Chuyên viên phòng chuyên môn",
      submittedDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "PENDING",
      data: dataObj
    };

    APP_DATA.pendingSubmissions.unshift(newSub);
    this.renderPendingTable();
    e.target.reset();
    App.showNotification(`Đã gửi hồ sơ [${newSub.id}] lên lãnh đạo Sở Tài chính xét duyệt nạp CSDL!`, "info");
  },

  renderPendingTable() {
    const tbody = document.getElementById('pendingSubmissionsTableBody');
    if (!tbody) return;

    tbody.innerHTML = APP_DATA.pendingSubmissions.map(sub => `
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
            ${sub.status === 'APPROVED' ? 'Đã phê duyệt nạp CSDL' : sub.status === 'REJECTED' ? 'Từ chối' : 'Chờ phê duyệt'}
          </span>
        </td>
        <td>
          ${sub.status === 'PENDING' ? `
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-success btn-sm" onclick="DataEntryManager.approveSubmission('${sub.id}')">
                <i data-lucide="check"></i> Duyệt
              </button>
              <button class="btn btn-danger btn-sm" onclick="DataEntryManager.rejectSubmission('${sub.id}')">
                <i data-lucide="x"></i> Từ chối
              </button>
            </div>
          ` : `
            <span style="font-size: 11px; color: #64748b;">Đã hoàn tất</span>
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
