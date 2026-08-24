/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * Bộ cấu hình phân hệ điều hành và giám sát chuyên sâu từng lĩnh vực nghiệp vụ
 * Tuân thủ quy chuẩn viết hoa tên riêng cơ quan, đơn vị, phòng ban và hệ thống theo Nghị định 30/2020/NĐ-CP
 * Cơ cấu chính quyền địa phương 2 cấp: Cấp tỉnh và Cấp xã (xã/phường/đặc khu)
 */

const DEPT_CONFIGS = {
  'lanhdao': {
    id: 'lanhdao',
    name: 'Châu Ngô Anh Nhân',
    title: 'Giám đốc Sở Tài chính',
    deptName: 'Lãnh đạo Sở',
    domainName: 'Điều hành kinh tế tổng thể tỉnh Khánh Hòa',
    badgeClass: 'badge-purple',
    icon: 'layout-dashboard',
    role: 'DIRECTOR',
    stats: [
      { label: 'Tổng thu ngân sách nhà nước', value: '18.520,6 tỷ đồng', unit: 'Đạt 102,3% dự toán năm', trend: '+8,2% cùng kỳ', icon: 'receipt', color: 'emerald' },
      { label: 'Giải ngân vốn đầu tư công', value: '7.850,4 tỷ đồng', unit: 'Đạt 68,38% kế hoạch vốn', trend: '+12,4%', icon: 'hard-hat', color: 'gold' },
      { label: 'Vốn FDI thu hút lũy kế', value: '485,6 triệu USD', unit: '18 dự án cấp mới & tăng vốn', trend: '+15,1%', icon: 'globe', color: 'purple' },
      { label: 'Hồ sơ chờ phê duyệt', value: '6 hồ sơ', unit: 'Thẩm tra liên phòng ban', trend: 'Cần duyệt', icon: 'check-square', color: 'rose' }
    ]
  },

  'ktns': {
    id: 'ktns',
    name: 'Lê Thị Thu Hằng',
    title: 'Trưởng phòng Kinh tế và Ngân sách',
    deptName: 'Phòng Kinh tế và Ngân sách',
    domainName: 'Quản lý và giám sát ngân sách nhà nước',
    badgeClass: 'badge-success',
    icon: 'pie-chart',
    role: 'SPECIALIST',
    archiveVolume: '15.400 trang A4 / 2,0 mét',
    stats: [
      { label: 'Dự toán thu NSNN 2026', value: '18.100 tỷ đồng', unit: 'Chỉ tiêu HĐND giao', trend: 'Kế hoạch', icon: 'target', color: 'cyan' },
      { label: 'Thực thu lũy kế', value: '18.520,6 tỷ đồng', unit: 'Vượt 420,6 tỷ đồng (102,3%)', trend: '+8,45%', icon: 'receipt', color: 'emerald' },
      { label: 'Thu từ DN trọng điểm', value: '8.340,5 tỷ đồng', unit: 'Khatoco, Yến Sào, Bia Sài Gòn', trend: '45,0% tổng thu', icon: 'award', color: 'gold' },
      { label: 'Tiến độ nộp báo cáo', value: '30 / 34 đơn vị', unit: '88,2% hoàn thành', trend: '4 đơn vị chờ', icon: 'list-checks', color: 'purple' }
    ],
    keyTaxPayers: [
      { mst: '4200238910', name: 'Tổng Công ty Khánh Việt (KHATOCO)', target: '3.500 tỷ đồng', actual: '3.620,5 tỷ đồng', rate: '103,4%', status: 'Vượt chỉ tiêu' },
      { mst: '4200429779', name: 'Công ty Yến Sào Khánh Hòa', target: '2.100 tỷ đồng', actual: '2.180,0 tỷ đồng', rate: '103,8%', status: 'Vượt chỉ tiêu' },
      { mst: '4200789012', name: 'Công ty Bia Sài Gòn - Nam Trung Bộ', target: '1.500 tỷ đồng', actual: '1.450,0 tỷ đồng', rate: '96,7%', status: 'Đang theo dõi' },
      { mst: '4201123456', name: 'Công ty CP Điện lực Khánh Hòa', target: '700 tỷ đồng', actual: '720,0 tỷ đồng', rate: '102,8%', status: 'Đạt kế hoạch' }
    ]
  },

  'dtc': {
    id: 'dtc',
    name: 'Phạm Minh Tuấn',
    title: 'Chuyên viên Phòng Quản lý Đầu tư công',
    deptName: 'Phòng Quản lý Đầu tư công',
    domainName: 'Quản lý kế hoạch và giải ngân vốn đầu tư công',
    badgeClass: 'badge-warning',
    icon: 'hard-hat',
    role: 'SPECIALIST',
    archiveVolume: '55,8 mét (chỉnh lý và số hóa)',
    stats: [
      { label: 'Dự án trong kế hoạch', value: '186 dự án', unit: 'Tổng vốn: 11.480 tỷ đồng', trend: 'Đang theo dõi', icon: 'hard-hat', color: 'gold' },
      { label: 'Đã giải ngân lũy kế', value: '7.850,4 tỷ đồng', unit: '68,38% kế hoạch vốn', trend: '+6,2% tuần', icon: 'trending-up', color: 'emerald' },
      { label: 'Dự án trọng điểm tỉnh', value: '16 dự án', unit: 'Đường ven biển, cảng, kè', trend: 'Real-time', icon: 'star', color: 'cyan' },
      { label: 'Dự án chậm giải ngân', value: '5 dự án', unit: 'Giải ngân dưới 50%', trend: 'Cảnh báo', icon: 'shuffle', color: 'rose' }
    ],
    projects: [
      { id: 'DA-DTC-001', name: 'Đường Vành đai 2 Nha Trang (giai đoạn 2)', owner: 'Ban QLDA Giao thông Khánh Hòa', budget: '1.450 tỷ đồng', disbursed: '1.120 tỷ đồng', rate: '77,2%', status: 'Đúng tiến độ' },
      { id: 'DA-DTC-002', name: 'Kè chống sạt lở bờ sông Cái Nha Trang', owner: 'Ban QLDA Nông nghiệp và PTNT', budget: '620 tỷ đồng', disbursed: '480 tỷ đồng', rate: '77,4%', status: 'Đúng tiến độ' },
      { id: 'DA-DTC-003', name: 'Trung tâm Kiểm soát bệnh tật (CDC) tỉnh', owner: 'Ban QLDA Dân dụng và Công nghiệp', budget: '280 tỷ đồng', disbursed: '190 tỷ đồng', rate: '67,8%', status: 'Đang hoàn thiện' },
      { id: 'DA-DTC-004', name: 'Hạ tầng CNTT chuyển đổi số kinh tế tỉnh', owner: 'Sở Thông tin và Truyền thông', budget: '150 tỷ đồng', disbursed: '125 tỷ đồng', rate: '83,3%', status: 'Vận hành' }
    ]
  },

  'dtns': {
    id: 'dtns',
    name: 'Trần Thanh Bình',
    title: 'Chuyên viên Phòng Quản lý Đầu tư ngoài ngân sách',
    deptName: 'Phòng Quản lý Đầu tư ngoài ngân sách',
    domainName: 'Quản lý dự án đầu tư ngoài ngân sách và FDI',
    badgeClass: 'badge-info',
    icon: 'building-2',
    role: 'SPECIALIST',
    archiveVolume: '117,0 mét (900.900 trang A4)',
    stats: [
      { label: 'Dự án đang theo dõi', value: '142 dự án', unit: 'Bao gồm 38 dự án FDI', trend: '+12 mới', icon: 'building-2', color: 'cyan' },
      { label: 'Tổng vốn đăng ký', value: '86.450 tỷ đồng', unit: '3,45 tỷ USD quy đổi', trend: '+18,5%', icon: 'coins', color: 'emerald' },
      { label: 'Dự án đang xây dựng', value: '48 dự án', unit: 'Đúng cam kết tiến độ', trend: 'Ổn định', icon: 'activity', color: 'gold' },
      { label: 'Dự án chậm tiến độ', value: '9 dự án', unit: 'Cần đôn đốc xử lý', trend: 'Cảnh báo', icon: 'alert-triangle', color: 'rose' }
    ],
    projects: [
      { id: 'DA-NNS-001', name: 'Khu đô thị sinh thái Bắc Cam Ranh', investor: 'Tập đoàn Phát triển Đô thị Khánh Hòa', capital: '4.850 tỷ đồng', status: 'Đang GPMB', land: '125,4 ha', progress: '35%' },
      { id: 'DA-NNS-002', name: 'Tổ hợp nghỉ dưỡng và sân golf Vĩnh Hy', investor: 'Công ty CP Đầu tư Biển Xanh', capital: '3.200 tỷ đồng', status: 'Xây dựng hạ tầng', land: '88,0 ha', progress: '62%' },
      { id: 'DA-NNS-003', name: 'Nhà máy chế biến thủy sản FDI', investor: 'Maruha Nichiro Corporation (Nhật Bản)', capital: '1.450 tỷ đồng (58 triệu USD)', status: 'Chuẩn bị vận hành', land: '15,2 ha', progress: '94%' },
      { id: 'DA-NNS-004', name: 'Khu du lịch Hòn Tằm mở rộng', investor: 'Công ty CP Hòn Tằm Biển Nha Trang', capital: '980 tỷ đồng', status: 'Thủ tục đất đai', land: '22,5 ha', progress: '20%' }
    ]
  },

  'doanhnghiep': {
    id: 'doanhnghiep',
    name: 'Hoàng Trọng Nghĩa',
    title: 'Chuyên viên Phòng Quản lý Doanh nghiệp',
    deptName: 'Phòng Quản lý Doanh nghiệp',
    domainName: 'Quản lý và giám sát tài chính doanh nghiệp',
    badgeClass: 'badge-emerald',
    icon: 'briefcase',
    role: 'SPECIALIST',
    archiveVolume: 'CSDL đăng ký kinh doanh và báo cáo tài chính',
    stats: [
      { label: 'Doanh nghiệp hoạt động', value: '14.890 DN', unit: '+10,5% so với 2025', trend: '1.420 mới', icon: 'building', color: 'cyan' },
      { label: 'Hợp tác xã & KT tập thể', value: '420 HTX', unit: '28 HTX thành lập mới', trend: 'Hiệu quả', icon: 'users', color: 'emerald' },
      { label: 'Báo cáo tài chính đã nạp', value: '11.240 BCTC', unit: '75,5% tổng số DN', trend: 'Tự động ROA/ROE', icon: 'bar-chart-2', color: 'gold' },
      { label: 'Doanh nghiệp rủi ro', value: '185 DN', unit: 'ROA âm & nợ thuế đất', trend: 'Cảnh báo', icon: 'alert-triangle', color: 'rose' }
    ],
    companies: [
      { mst: '4201889922', name: 'Công ty CP Năng lượng Tái tạo Khánh Hòa', capital: '850 tỷ đồng', revenue: '340 tỷ đồng', roa: '8,5%', roe: '14,2%', risk: 'An toàn' },
      { mst: '4201993344', name: 'Công ty TNHH Logistics Nam Cam Ranh', capital: '220 tỷ đồng', revenue: '95 tỷ đồng', roa: '4,2%', roe: '7,8%', risk: 'Trung bình' },
      { mst: '4201662211', name: 'Công ty CP Xây dựng và Thương mại Hải Vân', capital: '150 tỷ đồng', revenue: '42 tỷ đồng', roa: '-3,1%', roe: '-6,5%', risk: 'Cảnh báo rủi ro' }
    ]
  },

  'giacongsan': {
    id: 'giacongsan',
    name: 'Đặng Quốc Hưng',
    title: 'Chuyên viên Phòng Quản lý Giá và Công sản',
    deptName: 'Phòng Quản lý Giá và Công sản',
    domainName: 'Quản lý giá và tài sản công',
    badgeClass: 'badge-purple',
    icon: 'coins',
    role: 'SPECIALIST',
    archiveVolume: 'CSDL quản lý nhà đất và hồ sơ giá',
    stats: [
      { label: 'Cơ sở nhà đất công', value: '1.840 cơ sở', unit: 'Trụ sở, trường học, y tế', trend: '100% định danh', icon: 'home', color: 'cyan' },
      { label: 'Đã phê duyệt sắp xếp', value: '1.420 cơ sở', unit: '77,17% tổng số cơ sở', trend: '+45 cơ sở', icon: 'check-square', color: 'emerald' },
      { label: 'Xe ô tô công toàn tỉnh', value: '312 chiếc', unit: 'Định mức: 320 xe', trend: 'Đúng định mức', icon: 'truck', color: 'gold' },
      { label: 'Hồ sơ kê khai giá', value: '85 hồ sơ', unit: 'Hàng hóa bình ổn, xi măng', trend: '100% đúng hạn', icon: 'tag', color: 'purple' }
    ],
    properties: [
      { id: 'TSC-79-01', name: 'Khu đất trụ sở cũ Cam Ranh', area: '1.450 m²', plan: 'Đấu giá tài sản trên đất và chuyển nhượng QSDĐ', status: 'Đang thẩm định giá' },
      { id: 'TSC-79-02', name: 'Cơ sở nhà đất số 04 Trần Phú, Nha Trang', area: '3.200 m²', plan: 'Giữ lại tiếp tục sử dụng làm cơ quan hành chính', status: 'Đã duyệt' },
      { id: 'TSC-79-03', name: 'Khu đất trạm y tế xã Diên Hòa', area: '680 m²', plan: 'Điều chuyển về UBND xã Diên Hòa quản lý', status: 'Đã điều chuyển' }
    ]
  },

  'hcsn': {
    id: 'hcsn',
    name: 'Ngô Mỹ Linh',
    title: 'Chuyên viên Phòng Tài chính Hành chính sự nghiệp',
    deptName: 'Phòng Tài chính Hành chính sự nghiệp',
    domainName: 'Quản lý tài chính hành chính sự nghiệp & ĐVSNCL',
    badgeClass: 'badge-cyan',
    icon: 'graduation-cap',
    role: 'SPECIALIST',
    archiveVolume: 'Hồ sơ tự chủ và quyết toán đơn vị',
    stats: [
      { label: 'Đơn vị sự nghiệp công lập', value: '542 đơn vị', unit: 'Giáo dục, y tế, văn hóa', trend: '100% giao tự chủ', icon: 'graduation-cap', color: 'cyan' },
      { label: 'Đơn vị tự chủ chi TX', value: '68 đơn vị', unit: 'Tiết kiệm ngân sách tỉnh', trend: '+12 đơn vị', icon: 'trending-up', color: 'emerald' },
      { label: 'Kinh phí chi thường xuyên', value: '7.180 tỷ đồng', unit: 'Dự toán năm 2026', trend: 'Đúng định mức', icon: 'wallet', color: 'gold' },
      { label: 'Đã duyệt quyết toán năm', value: '495 / 542 đơn vị', unit: '91,3% tiến độ', trend: '47 đang thẩm tra', icon: 'check-circle', color: 'purple' }
    ],
    units: [
      { id: 'HCSN-01', name: 'Bệnh viện Đa khoa tỉnh Khánh Hòa', group: 'Nhóm 2 (Tự chủ chi TX)', staff: '1.250 người', revenue: '480 tỷ đồng/năm', budget_support: '0 đồng' },
      { id: 'HCSN-02', name: 'Trường Đại học Khánh Hòa', group: 'Nhóm 2 (Tự chủ chi TX)', staff: '280 người', revenue: '95 tỷ đồng/năm', budget_support: '12 tỷ đồng' },
      { id: 'HCSN-03', name: 'Trung tâm Bảo trợ xã hội tỉnh', group: 'Nhóm 4 (Nhà nước bảo đảm)', staff: '45 người', revenue: '0 đồng', budget_support: '8,5 tỷ đồng' }
    ]
  },

  'phapche': {
    id: 'phapche',
    name: 'Võ Văn Hoàng',
    title: 'Trưởng phòng Pháp chế',
    deptName: 'Phòng Pháp chế',
    domainName: 'Giám sát pháp chế và kỷ cương tài chính',
    badgeClass: 'badge-purple',
    icon: 'scale',
    role: 'SPECIALIST',
    archiveVolume: 'CSDL theo dõi thi hành pháp luật, xử phạt VPHC, đơn thư khiếu nại tố cáo và VBQPPL tài chính',
    stats: [
      { label: 'Quyết định xử phạt VPHC', value: '42 QĐ', unit: 'Tổng tiền phạt: 2.450 triệu đồng', trend: 'Giá, hóa đơn, kế toán', icon: 'gavel', color: 'emerald' },
      { label: 'Số tiền đã nộp phạt KBNN', value: '2.180 triệu đồng', unit: 'Thu hồi nộp NS: 89%', trend: 'Đúng tiến độ', icon: 'check-circle-2', color: 'cyan' },
      { label: 'Đơn thư khiếu nại, tố cáo', value: '28 đơn', unit: 'Đã xử lý: 26 đơn (92,8%)', trend: '100% đúng hạn', icon: 'clipboard-check', color: 'gold' },
      { label: 'Văn bản QPPL hệ thống hóa', value: '342 VB', unit: '186 NQ HĐND & 156 QĐ UBND', trend: 'Đang hiệu lực', icon: 'file-text', color: 'purple' }
    ],
    legalCases: [
      { id: 'VPHC-2026-01', caseName: 'Xử phạt vi phạm niêm yết giá và đầu cơ VLXD', agency: 'Chủ tịch UBND tỉnh ban hành', deadline: '2026-08-30', status: 'Đã nộp phạt KBNN', expert: 'Phòng Pháp chế', amount: '420.000.000 đ' },
      { id: 'VPHC-2026-02', caseName: 'Xử phạt VPHC kế toán - BCTC doanh nghiệp', agency: 'Chủ tịch UBND tỉnh ban hành', deadline: '2026-09-20', status: 'Chờ nộp phạt', expert: 'Phòng Pháp chế', amount: '85.000.000 đ' },
      { id: 'KNTC-2026-03', caseName: 'Đơn kiến nghị bồi thường GPMB dự án liên vùng', agency: 'UBND tỉnh giao STC chủ trì', deadline: '2026-09-10', status: 'Đã trả lời', expert: 'Tổ Pháp chế', amount: '0 đ' },
      { id: 'VBPL-2026-04', caseName: 'Rà soát hiệu lực NQ HĐND về ưu đãi KKT Vân Phong', agency: 'Phòng Pháp chế chủ trì', deadline: '2026-09-15', status: 'Còn hiệu lực', expert: 'Phòng Pháp chế', amount: '0 đ' }
    ]
  },

  'vanphong': {
    id: 'vanphong',
    name: 'Lê Hoàng Nam',
    title: 'Chánh Văn phòng Sở',
    deptName: 'Văn phòng Sở',
    domainName: 'Quản lý hành chính, văn thư lưu trữ và điều hành tổng hợp',
    badgeClass: 'badge-purple',
    icon: 'folder-archive',
    role: 'SPECIALIST',
    archiveVolume: '88,5 mét (hồ sơ văn thư & lưu trữ hành chính tổng hợp)',
    stats: [
      { label: 'Hồ sơ lưu trữ hành chính', value: '88,5 mét giá', unit: '100% đã chỉnh lý & số hóa', trend: 'Lưu kho', icon: 'archive', color: 'purple' },
      { label: 'Văn bản xử lý trong năm', value: '4.820 văn bản', unit: '100% đúng hạn quy định', trend: '+14,2%', icon: 'file-text', color: 'emerald' },
      { label: 'Nhiệm vụ UBND tỉnh giao', value: '186 nhiệm vụ', unit: 'Đã hoàn thành 182 (97,8%)', trend: '4 đang xử lý', icon: 'check-circle-2', color: 'gold' },
      { label: 'Số hóa tài liệu chuyên ngành', value: '42.600 trang A4', unit: 'Bảo quản an toàn theo NĐ 30', trend: 'Tiêu chuẩn', icon: 'layers', color: 'cyan' }
    ],
    documents: [
      { id: 'VB-STC-2026-01', code: '1420/STC-VP', title: 'Thông báo kết luận chỉ đạo của Giám đốc Sở tại cuộc họp giao ban tháng 8/2026', type: 'Thông báo', date: '2026-08-20', status: 'Đã phát hành', signer: 'Chánh Văn phòng Sở' },
      { id: 'VB-STC-2026-02', code: '312/QĐ-STC', title: 'Quyết định ban hành Kế hoạch số hóa và bảo quản hồ sơ lưu trữ điện tử Sở Tài chính năm 2026', type: 'Quyết định', date: '2026-08-15', status: 'Đã ban hành', signer: 'Giám đốc Sở' },
      { id: 'VB-STC-2026-03', code: '2890/UBND-TH', title: 'Văn bản UBND tỉnh giao Sở Tài chính chủ trì rà soát các nguồn thu ngân sách quý III/2026', type: 'Công văn đến', date: '2026-08-18', status: 'Đang xử lý', signer: 'Chủ tịch UBND tỉnh' },
      { id: 'VB-STC-2026-04', code: '89/TB-STC', title: 'Lịch công tác tuần thứ 34 của Lãnh đạo Sở Tài chính tỉnh Khánh Hòa', type: 'Lịch công tác', date: '2026-08-22', status: 'Đã phát hành', signer: 'Văn phòng Sở' }
    ]
  },

  'admin': {
    id: 'admin',
    name: 'Trần Quốc Bảo',
    title: 'Quản trị viên hệ thống',
    deptName: 'Quản trị hệ thống',
    domainName: 'Phân hệ quản trị hệ thống, kết nối API Gateway và bảo mật dữ liệu',
    badgeClass: 'badge-cyan',
    icon: 'server',
    role: 'ADMIN',
    stats: [
      { label: 'Tích hợp API Quốc gia & Tỉnh', value: '15 / 15 API', unit: 'Độ trễ trung bình: 42ms', trend: 'Real-time', icon: 'network', color: 'emerald' },
      { label: 'Tổng dung lượng kho dữ liệu', value: '4,85 TB', unit: 'CSDL chủ MDM & Marts', trend: 'Sao lưu 04:00', icon: 'database', color: 'cyan' },
      { label: 'Tài khoản đang truy cập', value: '48 cán bộ', unit: '15 phân hệ phân quyền RBAC', trend: 'An toàn', icon: 'users', color: 'gold' },
      { label: 'Bảo vệ dữ liệu cá nhân DDM', value: '100% tuân thủ', unit: 'Mã hóa CCCD & Tên đại diện', trend: 'NĐ 356/2025', icon: 'shield-check', color: 'purple' }
    ]
  },

  'portal_khatoco': {
    id: 'portal_khatoco',
    entityId: '4200238910',
    name: 'Phan Hoài Phương',
    title: 'Tổng Giám đốc',
    deptName: 'Tổng Công ty Khánh Việt (KHATOCO)',
    domainName: 'Cổng tiếp nhận và nộp báo cáo trực tuyến',
    badgeClass: 'badge-purple',
    icon: 'building-2',
    role: 'ENTERPRISE',
    stats: [
      { label: 'Nhiệm vụ báo cáo được giao', value: '1 báo cáo', unit: 'Báo cáo nộp NS & BCTC', trend: 'Đang mở', icon: 'clipboard-list', color: 'cyan' },
      { label: 'Báo cáo đã hoàn thành', value: '3 báo cáo', unit: 'Các kỳ trước', trend: '100% đúng hạn', icon: 'check-circle-2', color: 'emerald' },
      { label: 'Thông báo từ Sở Tài chính', value: '0 thông báo', unit: 'Đã hoàn tất đối soát', trend: 'Bình thường', icon: 'message-square', color: 'gold' },
      { label: 'Hạn nộp kỳ tiếp theo', value: '15/09/2026', unit: 'Báo cáo dự toán 2027', trend: 'Còn 25 ngày', icon: 'clock', color: 'purple' }
    ]
  },

  'portal_yensao': {
    id: 'portal_yensao',
    entityId: '4200429779',
    name: 'Nguyễn Anh Hùng',
    title: 'Chủ tịch HĐTV',
    deptName: 'Công ty Yến Sào Khánh Hòa',
    domainName: 'Cổng tiếp nhận và nộp báo cáo trực tuyến',
    badgeClass: 'badge-gold',
    icon: 'award',
    role: 'ENTERPRISE',
    stats: [
      { label: 'Nhiệm vụ báo cáo được giao', value: '1 báo cáo', unit: 'Báo cáo nộp NS & BCTC', trend: 'Đang mở', icon: 'clipboard-list', color: 'cyan' },
      { label: 'Báo cáo đã hoàn thành', value: '3 báo cáo', unit: 'Các kỳ trước', trend: '100% đúng hạn', icon: 'check-circle-2', color: 'emerald' },
      { label: 'Thông báo từ Sở Tài chính', value: '0 thông báo', unit: 'Đã hoàn tất đối soát', trend: 'Bình thường', icon: 'message-square', color: 'gold' },
      { label: 'Hạn nộp kỳ tiếp theo', value: '15/09/2026', unit: 'Báo cáo dự toán 2027', trend: 'Còn 25 ngày', icon: 'clock', color: 'purple' }
    ]
  },

  'portal_maruha': {
    id: 'portal_maruha',
    entityId: 'FDI-MARUHA',
    name: 'Kenji Takahashi',
    title: 'Tổng Giám đốc',
    deptName: 'Maruha Nichiro Khánh Hòa (FDI)',
    domainName: 'Cổng tiếp nhận và nộp báo cáo trực tuyến',
    badgeClass: 'badge-cyan',
    icon: 'globe',
    role: 'ENTERPRISE_FDI',
    stats: [
      { label: 'Nhiệm vụ báo cáo được giao', value: '1 báo cáo', unit: 'Giám sát tài chính FDI', trend: 'Đang mở', icon: 'clipboard-list', color: 'cyan' },
      { label: 'Báo cáo đã hoàn thành', value: '2 báo cáo', unit: 'Các kỳ trước', trend: '100% đúng hạn', icon: 'check-circle-2', color: 'emerald' },
      { label: 'Thông báo từ Sở Tài chính', value: '0 thông báo', unit: 'Hồ sơ hợp lệ', trend: 'Bình thường', icon: 'message-square', color: 'gold' },
      { label: 'Hạn nộp kỳ tiếp theo', value: '30/09/2026', unit: 'Báo cáo năm 2026', trend: 'Còn 40 ngày', icon: 'clock', color: 'purple' }
    ]
  },

  'portal_loctho': {
    id: 'portal_loctho',
    entityId: 'UBND-NTR',
    name: 'Trần Minh Hải',
    title: 'Chủ tịch UBND phường',
    deptName: 'UBND Phường Nha Trang (UBND cấp xã)',
    domainName: 'Cổng tiếp nhận và nộp báo cáo trực tuyến',
    badgeClass: 'badge-info',
    icon: 'landmark',
    role: 'COMMUNE',
    stats: [
      { label: 'Nhiệm vụ báo cáo được giao', value: '2 kỳ báo cáo', unit: 'QĐ 2071 & Nhà đất công', trend: 'Đã hoàn thành', icon: 'clipboard-list', color: 'cyan' },
      { label: 'Báo cáo đã phê duyệt', value: '2 báo cáo', unit: 'Đạt chuẩn chất lượng', trend: '100% đúng hạn', icon: 'check-circle-2', color: 'emerald' },
      { label: 'Phản hồi từ Sở Tài chính', value: '1 thông báo', unit: 'Khớp đúng KBNN', trend: 'Đã xem', icon: 'message-square', color: 'gold' },
      { label: 'Hạn nộp kỳ tiếp theo', value: '25/09/2026', unit: 'Báo cáo quý III/2026', trend: 'Còn 35 ngày', icon: 'clock', color: 'purple' }
    ]
  },

  'portal_gts': {
    id: 'portal_gts',
    entityId: 'BAN-QLDA-GT',
    name: 'Nguyễn Văn Dũng',
    title: 'Giám đốc Ban QLDA',
    deptName: 'Ban QLDA Giao thông Khánh Hòa',
    domainName: 'Cổng tiếp nhận và nộp báo cáo trực tuyến',
    badgeClass: 'badge-warning',
    icon: 'hard-hat',
    role: 'PROJECT_OWNER',
    stats: [
      { label: 'Nhiệm vụ báo cáo được giao', value: '1 báo cáo', unit: 'Giải ngân vốn ĐTC tháng 8', trend: 'Cần bổ sung', icon: 'clipboard-list', color: 'cyan' },
      { label: 'Báo cáo đã hoàn thành', value: '7 báo cáo', unit: 'Các tháng trước', trend: 'Đúng hạn', icon: 'check-circle-2', color: 'emerald' },
      { label: 'Phản hồi từ Sở Tài chính', value: '1 yêu cầu', unit: 'Bổ sung tiến độ Vành đai 2', trend: 'Cần xử lý', icon: 'alert-circle', color: 'rose' },
      { label: 'Hạn nộp kỳ này', value: '30/08/2026', unit: 'Báo cáo tháng 8/2026', trend: 'Còn 8 ngày', icon: 'clock', color: 'purple' }
    ]
  },

  'portal_bvdakhoa': {
    id: 'portal_bvdakhoa',
    entityId: 'BV-DAKHOA-TINH',
    name: 'BS. Phan Hữu Chính',
    title: 'Giám đốc Bệnh viện',
    deptName: 'Bệnh viện Đa khoa tỉnh Khánh Hòa',
    domainName: 'Cổng tiếp nhận và nộp báo cáo trực tuyến',
    badgeClass: 'badge-success',
    icon: 'heart-pulse',
    role: 'HCSN_UNIT',
    stats: [
      { label: 'Nhiệm vụ báo cáo được giao', value: '1 báo cáo', unit: 'Tự chủ tài chính NĐ 60', trend: 'Chờ duyệt', icon: 'clipboard-list', color: 'cyan' },
      { label: 'Báo cáo đã hoàn thành', value: '4 báo cáo', unit: 'Quyết toán các quý', trend: 'Đúng hạn', icon: 'check-circle-2', color: 'emerald' },
      { label: 'Phản hồi từ Sở Tài chính', value: '1 thông báo', unit: 'Đang thẩm tra nhóm 2', trend: 'Đang xử lý', icon: 'message-square', color: 'gold' },
      { label: 'Hạn nộp kỳ tiếp theo', value: '10/09/2026', unit: 'Phương án 2026-2028', trend: 'Còn 20 ngày', icon: 'clock', color: 'purple' }
    ]
  },

  'portal': {
    id: 'portal',
    entityId: '4200238910',
    name: 'Phan Hoài Phương',
    title: 'Tổng Giám đốc',
    deptName: 'Tổng Công ty Khánh Việt (KHATOCO)',
    domainName: 'Cổng tiếp nhận và nộp báo cáo trực tuyến',
    badgeClass: 'badge-purple',
    icon: 'building-2',
    role: 'ENTERPRISE',
    stats: [
      { label: 'Kỳ báo cáo được giao', value: '1 kỳ báo cáo', unit: 'Đang thu thập', trend: 'Cần hoàn thành', icon: 'clipboard-list', color: 'cyan' },
      { label: 'Báo cáo đã duyệt', value: '3 báo cáo', unit: 'Đạt chuẩn chất lượng', trend: '100% đúng hạn', icon: 'check-circle-2', color: 'emerald' },
      { label: 'Phản hồi từ Sở Tài chính', value: '0 thông báo', unit: 'Hồ sơ đã duyệt', trend: 'Hoàn tất', icon: 'message-square', color: 'gold' },
      { label: 'Hạn nộp kỳ tiếp theo', value: '15/09/2026', unit: 'Báo cáo dự toán 2027', trend: 'Còn 25 ngày', icon: 'clock', color: 'purple' }
    ]
  }
};
