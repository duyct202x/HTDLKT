/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * ĐỘNG CƠ DUY TRÌ & ĐỒNG BỘ DỮ LIỆU THỜI GIAN THỰC (REAL-TIME DATA ENGINE)
 * (Event Bus, Streaming Ingestion, Change Data Capture - CDC, Live Ticker, Auto Sync)
 */

const RealtimeEngine = {
  isRunning: true,
  syncIntervalMs: 4000,
  timerId: null,

  // Luồng sự kiện giao dịch phát sinh thời gian thực (Live Transaction Stream)
  liveEvents: [
    {
      id: "EVT-2026-08201",
      timestamp: "13:25:40",
      source: "KHO BẠC NHÀ NƯỚC (TABMIS)",
      category: "GIẢI NGÂN ĐTC",
      content: "Kho bạc thanh toán giải ngân 14.85 Tỷ VND cho Dự án Đường Vành Đai 2 TP. Nha Trang (Ban Quản lý dự án Giao thông).",
      amount: "+14.85 Tỷ",
      impact: "Tỷ lệ giải ngân ĐTC tỉnh tăng lên 68.51%",
      color: "emerald"
    },
    {
      id: "EVT-2026-08202",
      timestamp: "13:24:12",
      source: "CỔNG THUẾ ĐIỆN TỬ (ETAX)",
      category: "THU NGÂN SÁCH",
      content: "Tổng Công ty Khánh Việt (KHATOCO) nộp 45.2 Tỷ VND thuế Tiêu thụ đặc biệt vào KBNN.",
      amount: "+45.2 Tỷ",
      impact: "Tổng thu NSNN lũy kế đạt 18.565,8 Tỷ (102.57% dự toán)",
      color: "cyan"
    },
    {
      id: "EVT-2026-08203",
      timestamp: "13:22:05",
      source: "CSDL QUỐC GIA ĐKKD (BỘ KH&ĐT)",
      category: "DOANH NGHIỆP MỚI",
      content: "Cấp mới GCN ĐKKD cho Công ty CP Năng lượng Biển Nha Trang (Vốn ĐL: 120 Tỷ VND) tại KKT Vân Phong.",
      amount: "+120 Tỷ Vốn",
      impact: "Tổng số DN đang hoạt động tăng lên 14.891 DN",
      color: "purple"
    },
    {
      id: "EVT-2026-08204",
      timestamp: "13:20:18",
      source: "CỔNG BÁO CÁO Quyết định số 2071 (PORTAL)",
      category: "BÁO CÁO ĐỊNH KỲ",
      content: "UBND Thị xã Ninh Hòa vừa nộp Báo cáo Bộ chỉ số chỉ đạo điều hành Quý III/2026 kèm chữ ký số.",
      amount: "Chờ Duyệt",
      impact: "Tiến độ nộp báo cáo toàn tỉnh đạt 30/34 đơn vị (88.2%)",
      color: "gold"
    },
    {
      id: "EVT-2026-08205",
      timestamp: "13:18:50",
      source: "CSDL QUỐC GIA VỀ GIÁ (BỘ TÀI CHÍNH)",
      category: "GIÁ THỊ TRƯỜNG",
      content: "Cập nhật biến động giá xi măng Vicem và sắt thép xây dựng tại địa bàn Cam Ranh & Nha Trang.",
      amount: "Biến động +0.8%",
      impact: "Chỉ số CPI nhóm vật liệu xây dựng ổn định",
      color: "rose"
    }
  ],

  init() {
    this.startStreaming();
    this.renderLiveTickerBar();
  },

  startStreaming() {
    if (this.timerId) clearInterval(this.timerId);
    this.isRunning = true;

    this.timerId = setInterval(() => {
      if (!this.isRunning) return;
      this.generateLiveTransaction();
    }, this.syncIntervalMs);
  },

  stopStreaming() {
    this.isRunning = false;
    if (this.timerId) clearInterval(this.timerId);
    this.updateStatusBadge();
  },

  toggleStreaming() {
    if (this.isRunning) {
      this.stopStreaming();
      App.showNotification("Đã tạm dừng luồng dữ liệu thời gian thực (Real-time Stream Paused)", "warning");
    } else {
      this.startStreaming();
      this.updateStatusBadge();
      App.showNotification("Đã kích hoạt luồng dữ liệu thời gian thực (Real-time Stream Active)", "success");
    }
  },

  generateLiveTransaction() {
    const categories = [
      {
        source: "KHO BẠC NHÀ NƯỚC (TABMIS)",
        category: "GIẢI NGÂN ĐTC",
        template: (amt) => `Kho bạc thanh toán giải ngân ${amt} Tỷ VND cho Dự án Hạ tầng Trung tâm IOC Tỉnh.`,
        amountPrefix: "+",
        unit: " Tỷ",
        color: "emerald",
        impact: "Cập nhật tự động vào Fact Marts FT_GIAI_NGAN_DTC"
      },
      {
        source: "CỔNG THUẾ ĐIỆN TỬ (ETAX)",
        category: "THU NGÂN SÁCH",
        template: (amt) => `Công ty Yến Sào Khánh Hòa nộp ${amt} Tỷ VND thuế TNDN vào Ngân sách Nhà nước.`,
        amountPrefix: "+",
        unit: " Tỷ",
        color: "cyan",
        impact: "Cập nhật tự động vào FT_THU_NSNN & Dashboard IOC"
      },
      {
        source: "CSDL QUỐC GIA ĐKKD",
        category: "DOANH NGHIỆP MỚI",
        template: (amt) => `Đăng ký thành lập mới Công ty TNHH Logistics Nam Vân Phong (Vốn: ${amt} Tỷ VND).`,
        amountPrefix: "+",
        unit: " Tỷ Vốn",
        color: "purple",
        impact: "Đồng bộ API-07 ĐKKD từ Bộ Kế hoạch và Đầu tư"
      },
      {
        source: "CỔNG BÁO CÁO ĐỊNH KỲ (PORTAL)",
        category: "BÁO CÁO ĐỊNH KỲ",
        template: (amt) => `Ban Quản lý dự án Giao thông vừa cập nhật tiến độ giải ngân tuần 33 (Đạt ${amt}% kế hoạch).`,
        amountPrefix: "",
        unit: "%",
        color: "gold",
        impact: "Số liệu báo cáo tự động cập nhật vào MT_CHI_SO_2071"
      }
    ];

    const pick = categories[Math.floor(Math.random() * categories.length)];
    const randomAmt = (Math.random() * 15 + 2).toFixed(2);
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newEvt = {
      id: "EVT-2026-" + Math.floor(10000 + Math.random() * 90000),
      timestamp: timeStr,
      source: pick.source,
      category: pick.category,
      content: pick.template(randomAmt),
      amount: `${pick.amountPrefix}${randomAmt}${pick.unit}`,
      impact: pick.impact,
      color: pick.color
    };

    this.liveEvents.unshift(newEvt);
    if (this.liveEvents.length > 25) this.liveEvents.pop();

    this.updateLiveTickerContent(newEvt);
    this.refreshRealtimeViews();
  },

  renderLiveTickerBar() {
    let tickerContainer = document.getElementById('realtimeTickerContainer');
    if (!tickerContainer) {
      tickerContainer = document.createElement('div');
      tickerContainer.id = 'realtimeTickerContainer';
      tickerContainer.className = 'realtime-ticker-bar';

      const mainContent = document.querySelector('.app-main');
      if (mainContent) {
        const topbar = document.querySelector('.app-topbar');
        if (topbar && topbar.nextSibling) {
          mainContent.insertBefore(tickerContainer, topbar.nextSibling);
        } else {
          mainContent.appendChild(tickerContainer);
        }
      }
    }

    const latest = this.liveEvents[0];
    tickerContainer.innerHTML = `
      <div class="ticker-label">
        <span class="pulse-dot"></span>
        <strong>DỮ LIỆU THỜI GIAN THỰC (REAL-TIME LIVE FEED):</strong>
      </div>
      <div class="ticker-content" id="liveTickerText">
        <span class="badge badge-info" style="font-size: 10.5px;">${latest.source}</span>
        <strong style="color: #0f172a;">[${latest.category}]</strong> ${latest.content}
        <span style="color: #15803d; font-weight: 700;">(${latest.amount})</span>
        <span style="color: #64748b; font-size: 11px;">- lúc ${latest.timestamp}</span>
      </div>
      <div class="ticker-actions">
        <button class="btn-ticker-toggle" onclick="RealtimeEngine.toggleStreaming()" id="btnToggleRealtime">
          <i data-lucide="${this.isRunning ? 'pause' : 'play'}"></i> ${this.isRunning ? 'Tạm dừng stream' : 'Bật stream'}
        </button>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  updateLiveTickerContent(evt) {
    const textElem = document.getElementById('liveTickerText');
    if (!textElem) return;

    textElem.style.opacity = '0';
    textElem.style.transform = 'translateY(8px)';
    textElem.style.transition = 'all 0.3s ease';

    setTimeout(() => {
      textElem.innerHTML = `
        <span class="badge badge-info" style="font-size: 10.5px;">${evt.source}</span>
        <strong style="color: #0f172a;">[${evt.category}]</strong> ${evt.content}
        <span style="color: #15803d; font-weight: 700;">(${evt.amount})</span>
        <span style="color: #64748b; font-size: 11px;">- lúc ${evt.timestamp}</span>
      `;
      textElem.style.opacity = '1';
      textElem.style.transform = 'translateY(0)';
    }, 300);
  },

  updateStatusBadge() {
    const btn = document.getElementById('btnToggleRealtime');
    if (btn) {
      btn.innerHTML = `<i data-lucide="${this.isRunning ? 'pause' : 'play'}"></i> ${this.isRunning ? 'Tạm dừng stream' : 'Bật stream'}`;
      if (window.lucide) window.lucide.createIcons();
    }
  },

  refreshRealtimeViews() {
    // Nếu người dùng đang xem màn hình Stream sự kiện hoặc Dashboard
    const feedContainer = document.getElementById('realtimeEventFeedList');
    if (feedContainer) {
      feedContainer.innerHTML = this.liveEvents.map(e => `
        <div class="realtime-event-card border-${e.color}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="badge badge-${e.color}">${e.category}</span>
              <span style="font-size: 11px; color: #475569;">${e.source}</span>
            </div>
            <span style="font-size: 11px; color: #0284c7; font-weight: 600;">${e.timestamp}</span>
          </div>
          <p style="font-size: 12.5px; color: #0f172a; line-height: 1.35; margin: 4px 0; font-weight: 600;">${e.content}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 11px;">
            <span style="color: #64748b;"><i data-lucide="activity" style="width:12px;height:12px;display:inline;"></i> Tác động: ${e.impact}</span>
            <strong style="color: #15803d; font-size: 12px;">${e.amount}</strong>
          </div>
        </div>
      `).join('');
      if (window.lucide) window.lucide.createIcons();
    }
  },

  // Màn hình Trung Tâm Giám Sát Luồng Dữ Liệu Thời Gian Thực
  renderRealtimeStreamView(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="card-header">
        <div>
          <h3 class="card-title"><i data-lucide="activity"></i> Trung tâm giám sát luồng dữ liệu thời gian thực</h3>
          <p class="card-subtitle">Thu nhận tự động qua Webhook, Change Data Capture (CDC) từ Kho bạc, Cục Thuế, CSDL ĐKKD và Cổng Báo cáo Quyết định số 2071</p>
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          <span class="badge badge-success"><span class="pulse-dot"></span> Đang kết nối 09 kênh stream</span>
          <button class="btn btn-secondary btn-sm" onclick="RealtimeEngine.toggleStreaming()">
            <i data-lucide="${this.isRunning ? 'pause' : 'play'}"></i> ${this.isRunning ? 'Tạm dừng stream' : 'Bật stream'}
          </button>
        </div>
      </div>

      <div class="dashboard-row">
        <!-- Live Stream Feeds -->
        <div class="col-7">
          <div class="card" style="background: #ffffff; border: 1px solid #e2e8f0; height: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h4 style="font-size: 14px; font-weight: 700; color: #0f172a;"><i data-lucide="radio"></i> Nhật ký giao dịch dữ liệu phát sinh trực tiếp</h4>
              <span style="font-size: 11.5px; color: #64748b; font-weight: 500;">Tự động cập nhật mỗi 4 giây</span>
            </div>
            <div id="realtimeEventFeedList" style="display: flex; flex-direction: column; gap: 8px; max-height: 480px; overflow-y: auto; padding-right: 4px;">
              <!-- Rendered dynamically via refreshRealtimeViews -->
            </div>
          </div>
        </div>

        <!-- Realtime Pipeline Architecture & Stats -->
        <div class="col-5">
          <div class="card" style="background: #ffffff; border: 1px solid #e2e8f0; height: 100%;">
            <h4 style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 12px;"><i data-lucide="git-commit"></i> Kiến trúc luồng xử lý dữ liệu thời gian thực</h4>
            
            <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12px;">
                <p style="color: #475569; margin-top: 4px;">Kê khai trực tiếp từ 34 cơ quan nhà nước và 14.890 doanh nghiệp theo Quyết định số 2071/QĐ-UBND & Luật NSNN.</p>
              </div>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; border-left: 3px solid #7c3aed;">
                <strong style="color: #6d28d9;">3. Khung Xử Lý & Chuẩn Hóa Tự Động:</strong>
                <p style="color: #475569; margin-top: 4px;">Kiểm tra tính logic, làm sạch dữ liệu, che giấu DDM bảo vệ thông tin cá nhân và nạp tự động vào 23 bảng Fact & 6 Fact Marts.</p>
              </div>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; border-left: 3px solid #d97706;">
                <strong style="color: #b45309;">4. Phục Vụ Ra Quyết Định Tức Thì (Instant BI):</strong>
                <p style="color: #475569; margin-top: 4px;">Đẩy số liệu theo thời gian thực tới Bản đồ GIS không gian, Dashboard Lãnh đạo tỉnh và Kích hoạt cảnh báo sớm khi có rủi ro.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.refreshRealtimeViews();
  }
};
