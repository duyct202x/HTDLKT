/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * Bộ cấu hình phân hệ điều hành và giám sát chuyên sâu từng lĩnh vực nghiệp vụ
 * Tuân thủ quy chuẩn viết hoa tên riêng cơ quan, đơn vị, phòng ban và hệ thống theo Nghị định 30/2020/NĐ-CP
 * Cơ cấu chính quyền địa phương 2 cấp: Cấp tỉnh và Cấp xã (xã/phường/đặc khu)
 */

const DEPT_CONFIGS = {
  'lanhdao': {
    id: 'lanhdao',
    name: 'Nguyễn Đình Hùng',
    title: 'Giám đốc Sở Tài chính',
    deptName: 'Ban Giám đốc Sở',
    domainName: 'Phân hệ điều hành và giám sát kinh tế tổng thể',
    badgeClass: 'badge-purple',
    icon: 'layout-dashboard',
    role: 'DIRECTOR',
    stats: [
      { label: 'Tổng thu ngân sách năm 2026', value: '18.520,6 tỷ đồng', unit: 'Đạt 102,3% dự toán (thời gian thực)', trend: '+8,2% so với cùng kỳ', icon: 'receipt', color: 'emerald' },
      { label: 'Giải ngân vốn đầu tư công', value: '7.850,4 tỷ đồng', unit: '/ 11.480 tỷ đồng (68,38% kế hoạch)', trend: '+12,4%', icon: 'hard-hat', color: 'gold' },
      { label: 'Vốn FDI thu hút lũy kế', value: '485,6 triệu USD', unit: '18 dự án cấp mới và tăng vốn', trend: '+15,1%', icon: 'globe', color: 'purple' },
      { label: 'Báo cáo chờ lãnh đạo duyệt', value: '6 báo cáo', unit: 'Từ các phòng chuyên môn và đơn vị', trend: 'Cần xử lý ngay', icon: 'check-square', color: 'rose' }
    ]
  },

  'ktns': {
    id: 'ktns',
    name: 'Lê Thị Thu Hằng',
    title: 'Trưởng phòng Kinh tế và ngân sách',
    deptName: 'Phòng Kinh tế và ngân sách',
    domainName: 'Phân hệ điều hành và giám sát thu - chi ngân sách nhà nước',
    badgeClass: 'badge-success',
    icon: 'pie-chart',
    role: 'SPECIALIST',
    archiveVolume: '15.400 trang A4 / 2,0 mét',
    stats: [
      { label: 'Dự toán thu NSNN năm 2026', value: '18.100 tỷ đồng', unit: 'HĐND tỉnh quyết nghị', trend: 'Mục tiêu giao', icon: 'target', color: 'cyan' },
      { label: 'Thực thu lũy kế (thời gian thực)', value: '18.520,6 tỷ đồng', unit: 'Vượt 420,6 tỷ đồng (102,3%)', trend: '+8,45% so với cùng kỳ', icon: 'receipt', color: 'emerald' },
      { label: 'Thu từ doanh nghiệp trọng điểm', value: '8.340,5 tỷ đồng', unit: 'Khatoco, Yến Sào, Bia Sài Gòn', trend: 'Chiếm 45,0% tổng thu', icon: 'award', color: 'gold' },
      { label: 'Tiến độ nộp báo cáo định kỳ', value: '30 / 34 đơn vị', unit: 'Đạt 88,2% toàn tỉnh', trend: '4 đơn vị đang đôn đốc', icon: 'list-checks', color: 'purple' }
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
    title: 'Chuyên viên Phòng Quản lý đầu tư công',
    deptName: 'Phòng Quản lý đầu tư công',
    domainName: 'Phân hệ điều hành và giám sát kế hoạch và giải ngân vốn đầu tư công',
    badgeClass: 'badge-warning',
    icon: 'hard-hat',
    role: 'SPECIALIST',
    archiveVolume: '55,8 mét (chỉnh lý và số hóa)',
    stats: [
      { label: 'Tổng dự án đầu tư công trong kế hoạch', value: '186 dự án', unit: 'Kế hoạch vốn: 11.480 tỷ đồng', trend: 'Theo dõi tiến độ', icon: 'hard-hat', color: 'gold' },
      { label: 'Vốn đã giải ngân lũy kế', value: '7.850,4 tỷ đồng', unit: 'Đạt 68,38% kế hoạch vốn', trend: '+6,2% tuần này', icon: 'trending-up', color: 'emerald' },
      { label: 'Dự án trọng điểm cấp tỉnh', value: '16 dự án', unit: 'Đường ven biển, cảng, kè', trend: 'Cập nhật thời gian thực', icon: 'star', color: 'cyan' },
      { label: 'Dự án đề xuất điều chuyển vốn', value: '5 dự án', unit: 'Giải ngân dưới 50%', trend: 'Đang trình UBND tỉnh', icon: 'shuffle', color: 'rose' }
    ],
    projects: [
      { id: 'DA-DTC-001', name: 'Đường Vành đai 2 thành phố Nha Trang (giai đoạn 2)', owner: 'Ban Quản lý dự án Giao thông Khánh Hòa', budget: '1.450 tỷ đồng', disbursed: '1.120 tỷ đồng', rate: '77,2%', status: 'Đúng tiến độ' },
      { id: 'DA-DTC-002', name: 'Kè chống sạt lở bờ sông Cái Nha Trang', owner: 'Ban Quản lý dự án Nông nghiệp và PTNT', budget: '620 tỷ đồng', disbursed: '480 tỷ đồng', rate: '77,4%', status: 'Đúng tiến độ' },
      { id: 'DA-DTC-003', name: 'Trung tâm Kiểm soát bệnh tật (CDC) tỉnh Khánh Hòa', owner: 'Ban Quản lý dự án Dân dụng và Công nghiệp', budget: '280 tỷ đồng', disbursed: '190 tỷ đồng', rate: '67,8%', status: 'Đang hoàn thiện' },
      { id: 'DA-DTC-004', name: 'Hạ tầng CNTT phục vụ chuyển đổi số và điều hành kinh tế tỉnh', owner: 'Sở Thông tin và Truyền thông', budget: '150 tỷ đồng', disbursed: '125 tỷ đồng', rate: '83,3%', status: 'Vận hành chính thức' }
    ]
  },

  'dtns': {
    id: 'dtns',
    name: 'Trần Thanh Bình',
    title: 'Chuyên viên Phòng Quản lý đầu tư ngoài ngân sách',
    deptName: 'Phòng Quản lý đầu tư ngoài ngân sách',
    domainName: 'Phân hệ điều hành và giám sát dự án đầu tư ngoài ngân sách và doanh nghiệp FDI',
    badgeClass: 'badge-info',
    icon: 'building-2',
    role: 'SPECIALIST',
    archiveVolume: '117,0 mét (900.900 trang A4)',
    stats: [
      { label: 'Tổng dự án đang theo dõi', value: '142 dự án', unit: 'Bao gồm 38 dự án FDI', trend: '+12 dự án mới', icon: 'building-2', color: 'cyan' },
      { label: 'Tổng vốn đăng ký ngoài ngân sách', value: '86.450 tỷ đồng', unit: '3,45 tỷ USD quy đổi', trend: '+18,5%', icon: 'coins', color: 'emerald' },
      { label: 'Dự án đang triển khai xây dựng', value: '48 dự án', unit: 'Đúng tiến độ cam kết', trend: 'Ổn định', icon: 'activity', color: 'gold' },
      { label: 'Dự án chậm tiến độ cần đôn đốc', value: '9 dự án', unit: 'Cần đôn đốc xử lý', trend: 'Cảnh báo tự động', icon: 'alert-triangle', color: 'rose' }
    ],
    projects: [
      { id: 'DA-NNS-001', name: 'Khu đô thị sinh thái Bắc Cam Ranh', investor: 'Tập đoàn Phát triển Đô thị Khánh Hòa', capital: '4.850 tỷ đồng', status: 'Đang giải phóng mặt bằng', land: '125,4 ha', progress: '35%' },
      { id: 'DA-NNS-002', name: 'Tổ hợp nghỉ dưỡng và sân golf Vĩnh Hy - Nha Trang', investor: 'Công ty CP Đầu tư Biển Xanh', capital: '3.200 tỷ đồng', status: 'Đang xây dựng hạ tầng', land: '88,0 ha', progress: '62%' },
      { id: 'DA-NNS-003', name: 'Nhà máy chế biến thủy sản công nghệ cao FDI', investor: 'Maruha Nichiro Corporation (Nhật Bản)', capital: '1.450 tỷ đồng (58 triệu USD)', status: 'Hoàn thiện chuẩn bị vận hành', land: '15,2 ha', progress: '94%' },
      { id: 'DA-NNS-004', name: 'Khu du lịch sinh thái đảo Hòn Tằm mở rộng', investor: 'Công ty CP Hòn Tằm Biển Nha Trang', capital: '980 tỷ đồng', status: 'Đang làm thủ tục đất đai', land: '22,5 ha', progress: '20%' }
    ]
  },

  'doanhnghiep': {
    id: 'doanhnghiep',
    name: 'Hoàng Trọng Nghĩa',
    title: 'Chuyên viên Phòng Quản lý doanh nghiệp',
    deptName: 'Phòng Quản lý doanh nghiệp',
    domainName: 'Phân hệ điều hành và giám sát phát triển doanh nghiệp, hợp tác xã và báo cáo tài chính',
    badgeClass: 'badge-emerald',
    icon: 'briefcase',
    role: 'SPECIALIST',
    archiveVolume: 'CSDL đăng ký kinh doanh và báo cáo tài chính',
    stats: [
      { label: 'Tổng doanh nghiệp đang hoạt động', value: '14.890 DN', unit: 'Tăng 10,5% so với năm trước', trend: '1.420 DN mới', icon: 'building', color: 'cyan' },
      { label: 'Hợp tác xã và kinh tế tập thể', value: '420 HTX', unit: '28 HTX thành lập mới', trend: 'Hoạt động hiệu quả', icon: 'users', color: 'emerald' },
      { label: 'Báo cáo tài chính đã nạp và phân tích', value: '11.240 BCTC', unit: 'Đạt 75,5% tổng số doanh nghiệp', trend: 'Hệ thống tự tính ROA/ROE', icon: 'bar-chart-2', color: 'gold' },
      { label: 'Doanh nghiệp có cảnh báo rủi ro', value: '185 DN', unit: 'ROA âm và nợ tiền sử dụng đất', trend: 'Cần phối hợp cơ quan thuế', icon: 'alert-triangle', color: 'rose' }
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
    title: 'Chuyên viên Phòng Quản lý giá và công sản',
    deptName: 'Phòng Quản lý giá và công sản',
    domainName: 'Phân hệ điều hành và giám sát tài sản công, nhà đất và giá thị trường',
    badgeClass: 'badge-purple',
    icon: 'coins',
    role: 'SPECIALIST',
    archiveVolume: 'CSDL quản lý nhà đất và hồ sơ giá',
    stats: [
      { label: 'Tổng cơ sở nhà đất công quản lý', value: '1.840 cơ sở', unit: 'Trụ sở, trường học, trạm y tế', trend: 'Đã định danh 100%', icon: 'home', color: 'cyan' },
      { label: 'Cơ sở đã xử lý theo quy định sắp xếp', value: '1.420 cơ sở', unit: 'Đạt 77,17% tổng số cơ sở', trend: '+45 cơ sở năm nay', icon: 'check-square', color: 'emerald' },
      { label: 'Xe ô tô công toàn tỉnh', value: '312 chiếc', unit: 'Định mức tiêu chuẩn: 320 xe', trend: 'Đúng định mức', icon: 'truck', color: 'gold' },
      { label: 'Hồ sơ kê khai giá đã thẩm tra', value: '85 hồ sơ', unit: 'Hàng hóa bình ổn, sữa, xi măng', trend: '100% đúng hạn', icon: 'tag', color: 'purple' }
    ],
    properties: [
      { id: 'TSC-79-01', name: 'Khu đất trụ sở cũ tại Cam Ranh', area: '1.450 m²', plan: 'Bán đấu giá tài sản trên đất và chuyển nhượng QSDĐ', status: 'Đang thẩm định giá' },
      { id: 'TSC-79-02', name: 'Cơ sở nhà đất số 04 Trần Phú, Nha Trang', area: '3.200 m²', plan: 'Giữ lại tiếp tục sử dụng làm cơ quan hành chính', status: 'Đã duyệt phương án' },
      { id: 'TSC-79-03', name: 'Khu đất trạm y tế cũ tại xã Diên Hòa', area: '680 m²', plan: 'Điều chuyển về UBND xã Diên Hòa quản lý', status: 'Hoàn tất điều chuyển' }
    ]
  },

  'hcsn': {
    id: 'hcsn',
    name: 'Ngô Mỹ Linh',
    title: 'Chuyên viên Phòng Tài chính hành chính sự nghiệp',
    deptName: 'Phòng Tài chính hành chính sự nghiệp',
    domainName: 'Phân hệ điều hành và giám sát tự chủ tài chính đơn vị sự nghiệp công lập và chi thường xuyên',
    badgeClass: 'badge-cyan',
    icon: 'graduation-cap',
    role: 'SPECIALIST',
    archiveVolume: 'Hồ sơ tự chủ và quyết toán đơn vị',
    stats: [
      { label: 'Tổng đơn vị sự nghiệp công lập', value: '542 đơn vị', unit: 'Giáo dục, y tế, văn hóa...', trend: '100% giao tự chủ', icon: 'graduation-cap', color: 'cyan' },
      { label: 'Đơn vị tự chủ chi thường xuyên', value: '68 đơn vị', unit: 'Tiết kiệm ngân sách tỉnh', trend: '+12 đơn vị năm nay', icon: 'trending-up', color: 'emerald' },
      { label: 'Kinh phí chi thường xuyên giao', value: '7.180 tỷ đồng', unit: 'Năm ngân sách 2026', trend: 'Đúng định mức', icon: 'wallet', color: 'gold' },
      { label: 'Đã xét duyệt quyết toán năm', value: '495 / 542 đơn vị', unit: 'Đạt 91,3% tiến độ', trend: '47 đơn vị đang thẩm tra', icon: 'check-circle', color: 'purple' }
    ],
    units: [
      { id: 'HCSN-01', name: 'Bệnh viện Đa khoa tỉnh Khánh Hòa', group: 'Nhóm 2 (Tự chủ chi thường xuyên)', staff: '1.250 người', revenue: '480 tỷ đồng/năm', budget_support: '0 đồng' },
      { id: 'HCSN-02', name: 'Trường Đại học Khánh Hòa', group: 'Nhóm 2 (Tự chủ chi thường xuyên)', staff: '280 người', revenue: '95 tỷ đồng/năm', budget_support: '12 tỷ đồng (Đào tạo cử tuyển)' },
      { id: 'HCSN-03', name: 'Trung tâm Bảo trợ xã hội tỉnh', group: 'Nhóm 4 (Nhà nước bảo đảm 100%)', staff: '45 người', revenue: '0 đồng', budget_support: '8,5 tỷ đồng' }
    ]
  },

  'phapche': {
    id: 'phapche',
    name: 'Võ Văn Hoàng',
    title: 'Trưởng phòng Pháp chế',
    deptName: 'Phòng Pháp chế',
    domainName: 'Phân hệ điều hành và giám sát pháp lý tài chính, giám định tư pháp và thẩm định chính sách',
    badgeClass: 'badge-purple',
    icon: 'scale',
    role: 'SPECIALIST',
    archiveVolume: 'CSDL văn bản quy phạm pháp luật và hồ sơ giám định',
    stats: [
      { label: 'Văn bản QPPL tài chính số hóa', value: '342 văn bản', unit: '186 NQ HĐND và 156 QĐ UBND', trend: 'Gắn liên kết CSDL kinh tế', icon: 'file-text', color: 'cyan' },
      { label: 'Giám định tư pháp tài chính', value: '18 vụ việc', unit: 'Đang giám định: 5 vụ việc', trend: 'CSĐT và Tòa án trưng cầu', icon: 'scale', color: 'purple' },
      { label: 'Thi hành xử phạt VPHC tài chính', value: '2.450 triệu đồng', unit: 'Đã nộp NSNN: 2.180 triệu đồng (89%)', trend: '+15,2% so với cùng kỳ', icon: 'gavel', color: 'emerald' },
      { label: 'Thẩm định chính sách đặc thù', value: '28 hồ sơ', unit: 'Chính sách theo Nghị quyết số 55', trend: '100% đúng hạn', icon: 'check-circle-2', color: 'gold' }
    ],
    legalCases: [
      { id: 'GDTP-2026-01', caseName: 'Giám định tài chính - kế toán dự án kè biển Nam Cam Ranh', agency: 'Cơ quan Cảnh sát điều tra Công an tỉnh Khánh Hòa', deadline: '2026-09-30', status: 'Đang thực hiện', expert: 'Võ Văn Hoàng, Nguyễn Thị Lan' },
      { id: 'GDTP-2026-02', caseName: 'Giám định thất thoát thuế và hóa đơn Công ty CP Khoáng sản Miền Trung', agency: 'Tòa án nhân dân tỉnh Khánh Hòa', deadline: '2026-09-15', status: 'Đã có kết luận', expert: 'Lê Minh Tâm' },
      { id: 'VPHC-2026-08', caseName: 'Quyết định xử phạt vi phạm niêm yết giá và đầu cơ vật liệu xây dựng (420 triệu đồng)', agency: 'Chủ tịch UBND tỉnh Khánh Hòa', deadline: '2026-08-30', status: 'Đã nộp phạt Kho bạc Nhà nước', expert: 'Phòng Pháp chế đôn đốc' },
      { id: 'TDCS-2026-03', caseName: 'Thẩm định dự thảo Nghị quyết ưu đãi tài chính thu hút nhà đầu tư chiến lược KKT Vân Phong', agency: 'Ban Quản lý Khu kinh tế Vân Phong', deadline: '2026-09-10', status: 'Đã có ý kiến pháp lý', expert: 'Hội đồng thẩm định Sở Tài chính' }
    ]
  },

  'admin': {
    id: 'admin',
    name: 'Lê Hoàng Nam',
    title: 'Quản trị viên hệ thống',
    deptName: 'Trung tâm Công nghệ thông tin và Dữ liệu kinh tế',
    domainName: 'Phân hệ điều hành và giám sát trục tích hợp dữ liệu và hạ tầng kỹ thuật',
    badgeClass: 'badge-purple',
    icon: 'settings',
    role: 'ADMIN',
    stats: [
      { label: 'Trục tích hợp API Bộ Tài chính', value: '9 / 9 API trực tuyến', unit: 'Độ trễ trung bình: 42ms', trend: 'Đồng bộ thời gian thực', icon: 'network', color: 'emerald' },
      { label: 'Tổng dung lượng kho dữ liệu', value: '4,85 TB', unit: '24 bảng MD và 23 bảng Fact', trend: 'Tự động sao lưu 04:00', icon: 'database', color: 'cyan' },
      { label: 'Tài khoản đang truy cập hệ thống', value: '48 cán bộ', unit: 'Từ các phòng chuyên môn', trend: 'Phiên làm việc an toàn', icon: 'users', color: 'gold' },
      { label: 'Bảo vệ dữ liệu cá nhân DDM', value: '100% tuân thủ', unit: 'Che giấu CCCD và tên đại diện', trend: 'Tuân thủ quy định', icon: 'shield-check', color: 'purple' }
    ]
  },

  'portal': {
    id: 'portal',
    name: 'Đại diện cơ quan, đơn vị và doanh nghiệp',
    title: 'Cổng kê khai và nộp báo cáo định kỳ',
    deptName: 'Cổng kê khai báo cáo định kỳ',
    domainName: 'Cổng kê khai và nộp báo cáo định kỳ',
    badgeClass: 'badge-info',
    icon: 'globe',
    role: 'PORTAL_USER',
    stats: [
      { label: 'Kỳ báo cáo được phân công', value: '2 kỳ báo cáo', unit: 'Đang trong thời gian thu thập', trend: 'Cần hoàn thành', icon: 'clipboard-list', color: 'cyan' },
      { label: 'Báo cáo đã nộp và được duyệt', value: '2 báo cáo', unit: 'Đạt chuẩn chất lượng số liệu', trend: '100% đúng hạn', icon: 'check-circle-2', color: 'emerald' },
      { label: 'Ý kiến phản hồi từ Sở Tài chính', value: '1 thông báo', unit: 'Về số liệu quyết toán', trend: 'Xem ngay', icon: 'message-square', color: 'gold' },
      { label: 'Hạn nộp kỳ tiếp theo', value: '25/09/2026', unit: 'Báo cáo định kỳ quý III', trend: 'Còn 35 ngày', icon: 'clock', color: 'purple' }
    ]
  }
};
