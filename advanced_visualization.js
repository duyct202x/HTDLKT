/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * PHÂN HỆ TRỰC QUAN HÓA DỮ LIỆU CHUYÊN SÂU & BI STUDIO
 * (Advanced Data Visualization, GIS Layers, Treemaps, S-Curve, Bubble Risk Matrix)
 */

const AdvancedVizManager = {
  currentLayer: 'revenue', // 'revenue' | 'investment' | 'enterprises' | 'land_price'
  chartInstances: {},

  init() {
    this.renderVizCockpit();
    setTimeout(() => {
      this.renderLayerMap();
      this.renderBudgetTreemap();
      this.renderSCurveChart();
      this.renderBubbleRiskChart();
    }, 100);
  },

  switchMapLayer(layerName, btn) {
    this.currentLayer = layerName;
    document.querySelectorAll('#mapLayerButtons .btn').forEach(b => b.classList.remove('btn-primary'));
    document.querySelectorAll('#mapLayerButtons .btn').forEach(b => b.classList.add('btn-secondary'));
    if (btn) {
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');
    }
    this.renderLayerMap();
    App.showNotification(`Đã chuyển đổi sang Lớp Bản Đồ: ${btn ? btn.innerText : layerName}`, 'info');
  },

  renderVizCockpit() {
    const container = document.getElementById('vizMainContent');
    if (!container) return;

    container.innerHTML = `
      <!-- Toolbar & Export Controls -->
      <div class="domain-header-banner" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; width: 100%;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div class="banner-icon">
              <i data-lucide="sparkles"></i>
            </div>
            <div>
              <div class="banner-title">PHÂN HỆ TRỰC QUAN HÓA DỮ LIỆU CHUYÊN SÂU (ADVANCED BI COCKPIT)</div>
              <p class="banner-subtitle">Phân tích đa chiều kinh tế Khánh Hòa qua Bản đồ GIS đa lớp, Biểu đồ S-Curve, Treemap ngân sách và Ma trận Bubble rủi ro</p>
            </div>
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-secondary btn-sm" onclick="AdvancedVizManager.exportInfographicPDF()" style="background: rgba(255,255,255,0.2); color: #fff; border: 1px solid rgba(255,255,255,0.3);">
              <i data-lucide="printer"></i> Xuất báo cáo trực quan (PDF / In ấn)
            </button>
            <button class="btn btn-primary btn-sm" onclick="AdvancedVizManager.refreshAllViz()" style="background: #ffffff; color: #1d4ed8; font-weight: 700;">
              <i data-lucide="refresh-cw"></i> Làm mới dữ liệu BI
            </button>
          </div>
        </div>
      </div>

      <!-- Row 1: Interactive Multi-layer GIS Heatmap & Treemap -->
      <div class="dashboard-row">
        <!-- Multi-Layer GIS Map -->
        <div class="col-7">
          <div class="card" style="height: 100%;">
            <div class="card-header">
              <div>
                <h3 class="card-title"><i data-lucide="map"></i> Bản đồ số kinh tế đa lớp (GIS spatial heatmap)</h3>
                <p class="card-subtitle">Chuyển đổi các lớp chuyên đề không gian kinh tế toàn tỉnh</p>
              </div>
              <div id="mapLayerButtons" style="display: flex; gap: 6px;">
                <button class="btn btn-primary btn-sm" onclick="AdvancedVizManager.switchMapLayer('revenue', this)">Thu NSNN</button>
                <button class="btn btn-secondary btn-sm" onclick="AdvancedVizManager.switchMapLayer('investment', this)">Đầu tư công</button>
                <button class="btn btn-secondary btn-sm" onclick="AdvancedVizManager.switchMapLayer('enterprises', this)">Doanh nghiệp / FDI</button>
                <button class="btn btn-secondary btn-sm" onclick="AdvancedVizManager.switchMapLayer('land_price', this)">Bảng giá đất</button>
              </div>
            </div>

            <div id="advancedGisMapContainer" class="khanhhoa-map-container" style="min-height: 400px;">
              <!-- Rendered via renderLayerMap -->
            </div>
          </div>
        </div>

        <!-- Treemap Chi Ngân Sách -->
        <div class="col-5">
          <div class="card" style="height: 100%;">
            <div class="card-header">
              <div>
                <h3 class="card-title"><i data-lucide="grid"></i> Cây Phân Cấp Chi Ngân Sách (Budget Treemap)</h3>
                <p class="card-subtitle">Cơ cấu chi thường xuyên & đầu tư phát triển theo ngành (Tỷ đồng)</p>
              </div>
              <span class="badge badge-purple">16.240 Tỷ Tổng Chi</span>
            </div>
            <div id="budgetTreemapContainer" style="padding: 10px 0; min-height: 380px;">
              <!-- Rendered via renderBudgetTreemap -->
            </div>
          </div>
        </div>
      </div>

      <!-- Row 2: S-Curve Giải Ngân ĐTC & Bubble Chart Rủi Ro Doanh Nghiệp -->
      <div class="dashboard-row">
        <!-- S-Curve Giải Ngân ĐTC -->
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title"><i data-lucide="trending-up"></i> Đường Cong S-Curve Giải Ngân Vốn Đầu Tư Công</h3>
                <p class="card-subtitle">Đối chiếu 3 đường: Kế hoạch vốn giao vs Cam kết chủ đầu tư vs Thực tế giải ngân</p>
              </div>
              <span class="badge badge-warning">Tuần 33/2026</span>
            </div>
            <div class="chart-wrapper">
              <canvas id="chartSCurveCanvas"></canvas>
            </div>
          </div>
        </div>

        <!-- Bubble Chart Ma Trận Rủi Ro Doanh Nghiệp -->
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title"><i data-lucide="bubbles"></i> Ma Trận Bong Bóng Phân Tích Rủi Ro Doanh Nghiệp (Bubble Plot)</h3>
                <p class="card-subtitle">Trục X: ROA (%) • Trục Y: Điểm tuân thủ thuế • Độ lớn bóng: Vốn điều lệ</p>
              </div>
              <span class="badge badge-danger">Cảnh Báo Sớm</span>
            </div>
            <div class="chart-wrapper">
              <canvas id="chartBubbleRiskCanvas"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  // 1. Render Bản Đồ GIS Đa Lớp
  renderLayerMap() {
    const container = document.getElementById('advancedGisMapContainer');
    if (!container) return;

    let layerTitle = "Thu Ngân Sách Nhà Nước Theo Địa Bàn";
    let legendMax = "8.450 Tỷ (Nha Trang)";
    let colorScale = "rgba(6, 182, 212, 0.4)";

    if (this.currentLayer === 'investment') {
      layerTitle = "Tỷ Lệ Giải Ngân Vốn Đầu Tư Công";
      legendMax = "82.0% (Trường Sa) / 74.2% (Nha Trang)";
      colorScale = "rgba(245, 158, 11, 0.4)";
    } else if (this.currentLayer === 'enterprises') {
      layerTitle = "Mật Độ Doanh Nghiệp & Dự Án Thu Hút FDI";
      legendMax = "9.850 DN & 210 Tr. USD FDI (Nha Trang)";
      colorScale = "rgba(139, 92, 246, 0.4)";
    } else if (this.currentLayer === 'land_price') {
      layerTitle = "Khung Giá Đất & Hệ Số Điều Chỉnh K";
      legendMax = "Hệ số K = 1.45 (Trần Phú, Nha Trang)";
      colorScale = "rgba(16, 185, 129, 0.4)";
    }

    container.innerHTML = `
      <div style="position: absolute; top: 16px; left: 16px; background: #ffffff; padding: 8px 14px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 12px; z-index: 10; box-shadow: var(--shadow-sm);">
        <span style="color: #64748b;">Đang hiển thị Lớp:</span> <strong style="color: #002B8C;">${layerTitle}</strong>
        <div style="font-size: 11px; color: #15803d; margin-top: 2px; font-weight: 600;">Điểm cao nhất: ${legendMax}</div>
      </div>

      <svg viewBox="0 0 700 450" class="map-svg-frame">
        <!-- North: Vạn Ninh -->
        <path class="district-path" d="M 320 40 L 410 60 L 440 110 L 370 120 L 310 90 Z" style="fill: #e1ebf7;"></path>
        <text x="360" y="85" fill="#334155" font-size="11" font-weight="600" text-anchor="middle">Vạn Ninh</text>

        <!-- TX Ninh Hòa -->
        <path class="district-path" d="M 280 100 L 370 120 L 410 160 L 340 180 L 260 140 Z" style="fill: #e1ebf7;"></path>
        <text x="330" y="150" fill="#334155" font-size="11" font-weight="600" text-anchor="middle">Ninh Hòa</text>

        <!-- TP Nha Trang -->
        <path class="district-path active" d="M 340 185 L 430 200 L 450 250 L 370 260 L 330 215 Z" style="fill: #bfdbfe;"></path>
        <circle cx="400" cy="225" r="6" fill="#002B8C" class="map-pin"></circle>
        <text x="400" y="245" fill="#002B8C" font-size="12" font-weight="800" text-anchor="middle">TP. Nha Trang (Trung tâm)</text>

        <!-- Diên Khánh -->
        <path class="district-path" d="M 260 190 L 330 210 L 350 260 L 270 255 Z" style="fill: #e1ebf7;"></path>
        <text x="300" y="235" fill="#475569" font-size="10" font-weight="500" text-anchor="middle">Diên Khánh</text>

        <!-- Khánh Vĩnh -->
        <path class="district-path" d="M 160 180 L 260 190 L 265 270 L 150 250 Z" style="fill: #e1ebf7;"></path>
        <text x="210" y="230" fill="#475569" font-size="10" font-weight="500" text-anchor="middle">Khánh Vĩnh</text>

        <!-- Cam Lâm -->
        <path class="district-path" d="M 320 265 L 410 270 L 430 330 L 310 320 Z" style="fill: #e1ebf7;"></path>
        <text x="370" y="298" fill="#334155" font-size="11" font-weight="600" text-anchor="middle">Cam Lâm</text>

        <!-- Khánh Sơn -->
        <path class="district-path" d="M 190 275 L 300 280 L 290 350 L 180 340 Z" style="fill: #e1ebf7;"></path>
        <text x="240" y="315" fill="#475569" font-size="10" font-weight="500" text-anchor="middle">Khánh Sơn</text>

        <!-- TP Cam Ranh -->
        <path class="district-path" d="M 310 330 L 430 340 L 440 400 L 300 410 Z" style="fill: #e1ebf7;"></path>
        <circle cx="370" cy="370" r="5" fill="#0F52BA" class="map-pin"></circle>
        <text x="370" y="390" fill="#002B8C" font-size="11" font-weight="700" text-anchor="middle">TP. Cam Ranh</text>

        <!-- Quần đảo Trường Sa -->
        <g style="cursor: pointer;">
          <rect x="520" y="320" width="150" height="100" rx="8" fill="#f0f7ff" stroke="#93c5fd" stroke-dasharray="3,3" />
          <circle cx="560" cy="350" r="3" fill="#002B8C" />
          <circle cx="610" cy="370" r="4" fill="#002B8C" />
          <text x="595" y="340" fill="#002B8C" font-size="10.5" font-weight="700" text-anchor="middle">H. ĐẢO TRƯỜNG SA</text>
        </g>
      </svg>
    `;
  },

  // 2. Render Treemap Chi Ngân Sách
  renderBudgetTreemap() {
    const container = document.getElementById('budgetTreemapContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 1.2fr 1fr; grid-template-rows: 140px 110px 100px; gap: 8px; height: 350px;">
        <!-- Box 1: Chi Đầu tư Phát triển -->
        <div style="grid-column: 1; grid-row: 1 / span 2; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span class="badge badge-info">Đầu Tư Phát Triển (ĐTC)</span>
            <h4 style="font-size: 16px; font-weight: 800; color: #002B8C; margin-top: 6px;">7.850,4 Tỷ VND</h4>
            <div style="font-size: 11.5px; color: #475569; margin-top: 4px;">Chiếm 48.3% tổng chi ngân sách tỉnh</div>
          </div>
          <div style="font-size: 11px; color: #15803d; font-weight: 600;">Hạ tầng giao thông, thủy lợi, đô thị, chuyển đổi số</div>
        </div>

        <!-- Box 2: Sự nghiệp Giáo dục & Đào tạo -->
        <div style="grid-column: 2; grid-row: 1; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span class="badge badge-success">Giáo Dục & Đào Tạo</span>
            <h4 style="font-size: 15px; font-weight: 700; color: #166534; margin-top: 4px;">2.840,0 Tỷ VND</h4>
          </div>
          <div style="font-size: 10.5px; color: #475569;">Lương giáo viên & cơ sở vật chất trường học</div>
        </div>

        <!-- Box 3: Sự nghiệp Y tế & Dân số -->
        <div style="grid-column: 2; grid-row: 2; background: #fefce8; border: 1px solid #fef08a; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span class="badge badge-warning">Y Tế & Chăm Sóc Sức Khỏe</span>
            <h4 style="font-size: 14px; font-weight: 700; color: #854d0e; margin-top: 4px;">1.650,0 Tỷ VND</h4>
          </div>
          <div style="font-size: 10.5px; color: #475569;">Bệnh viện tuyến tỉnh & trạm y tế cơ sở</div>
        </div>

        <!-- Box 4: Quản lý Hành chính -->
        <div style="grid-column: 1; grid-row: 3; background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="font-size: 11.5px; color: #7e22ce; font-weight: 600;">Quản Lý Nhà Nước & Đảng, Đoàn Thể</span>
            <div style="font-size: 13.5px; font-weight: 700; color: #581c87;">1.820,0 Tỷ VND</div>
          </div>
        </div>

        <!-- Box 5: Chi Khác & Dự Phòng -->
        <div style="grid-column: 2; grid-row: 3; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="font-size: 11.5px; color: #b91c1c; font-weight: 600;">Trả Nợ Lãi & Dự Phòng</span>
            <div style="font-size: 13.5px; font-weight: 700; color: #991b1b;">1.209,8 Tỷ VND</div>
          </div>
        </div>
      </div>
    `;
  },

  // 3. Render Đường Cong S-Curve Giải Ngân Vốn ĐTC
  renderSCurveChart() {
    const ctx = document.getElementById('chartSCurveCanvas');
    if (!ctx) return;

    if (this.chartInstances.scurve) this.chartInstances.scurve.destroy();

    this.chartInstances.scurve = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8 (HT)', 'T9 (DK)', 'T10', 'T11', 'T12'],
        datasets: [
          {
            label: '1. Kế hoạch Vốn Giao Đầu Năm (%)',
            data: [8, 15, 25, 34, 45, 58, 68, 78, 85, 92, 98, 100],
            borderColor: '#94a3b8',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false
          },
          {
            label: '2. Tiến Độ Cam Kết của Chủ Đầu Tư (%)',
            data: [10, 18, 28, 38, 50, 64, 74, 82, 89, 95, 99, 100],
            borderColor: '#38bdf8',
            borderWidth: 2,
            fill: false
          },
          {
            label: '3. Giải Ngân Thực Tế Qua KBNN (%)',
            data: [6.2, 12.8, 22.4, 31.0, 42.5, 53.2, 62.8, 68.38, null, null, null, null],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            borderWidth: 3,
            fill: true,
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { color: '#94a3b8', font: { family: 'Outfit', size: 11 } } }
        },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { min: 0, max: 100, ticks: { color: '#94a3b8', callback: (v) => v + '%' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });
  },

  // 4. Render Ma Trận Bong Bóng (Bubble Plot)
  renderBubbleRiskChart() {
    const ctx = document.getElementById('chartBubbleRiskCanvas');
    if (!ctx) return;

    if (this.chartInstances.bubble) this.chartInstances.bubble.destroy();

    const bubbleData = [
      { x: 14.8, y: 98, r: 22, name: "KHATOCO (Vốn: 2.500 Tỷ)", risk: "An toàn", color: "rgba(16, 185, 129, 0.7)" },
      { x: 18.5, y: 99, r: 16, name: "Yến Sào Khánh Hòa (Vốn: 330 Tỷ)", risk: "An toàn", color: "rgba(16, 185, 129, 0.7)" },
      { x: 6.8, y: 85, r: 14, name: "Du lịch Nha Trang Bay (Vốn: 450 Tỷ)", risk: "An toàn", color: "rgba(16, 185, 129, 0.7)" },
      { x: 1.2, y: 65, r: 12, name: "Thủy sản Phương Nam (Vốn: 120 Tỷ)", risk: "Trung bình", color: "rgba(245, 158, 11, 0.7)" },
      { x: -4.2, y: 32, r: 15, name: "Vận tải & Xây dựng ABC (Vốn: 250 Tỷ)", risk: "Rủi ro Cao", color: "rgba(239, 68, 68, 0.8)" },
      { x: -2.1, y: 41, r: 13, name: "Bất động sản Hoàng Gia (Vốn: 180 Tỷ)", risk: "Rủi ro Cao", color: "rgba(239, 68, 68, 0.8)" }
    ];

    this.chartInstances.bubble = new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Doanh nghiệp',
          data: bubbleData,
          backgroundColor: bubbleData.map(b => b.color),
          borderColor: 'rgba(255,255,255,0.4)',
          borderWidth: 1.5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (item) => {
                const r = item.raw;
                return `${r.name}: ROA=${r.x}%, Tuân thủ=${r.y}/100, Mức rủi ro: ${r.risk}`;
              }
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Tỷ suất sinh lời ROA (%)', color: '#94a3b8' },
            ticks: { color: '#94a3b8' },
            grid: { color: 'rgba(255,255,255,0.05)' }
          },
          y: {
            title: { display: true, text: 'Điểm Tuân Thủ Nghĩa Vụ Thuế (0 - 100)', color: '#94a3b8' },
            min: 0,
            max: 100,
            ticks: { color: '#94a3b8' },
            grid: { color: 'rgba(255,255,255,0.05)' }
          }
        }
      }
    });
  },

  exportInfographicPDF() {
    App.showNotification("Đang kết xuất Báo cáo Infographic Đồ họa Chất lượng cao (Chuẩn phục vụ Ban Thường vụ Tỉnh ủy & UBND Tỉnh)...", "success");
    setTimeout(() => {
      window.print();
    }, 800);
  },

  refreshAllViz() {
    this.renderLayerMap();
    this.renderBudgetTreemap();
    this.renderSCurveChart();
    this.renderBubbleRiskChart();
    App.showNotification("Đã làm mới và đồng bộ dữ liệu toàn bộ trực quan hóa BI!", "success");
  }
};
