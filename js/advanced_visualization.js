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

    if (window.GisMapManager && typeof GisMapManager.renderChoropleth === 'function') {
      GisMapManager.renderChoropleth('advancedGisMapContainer', layerName);
    }

    const layerVN = layerName === 'investment' ? 'Đầu tư công' : layerName === 'enterprises' ? 'Doanh nghiệp & FDI' : layerName === 'land_price' ? 'Bảng giá đất' : 'Thu NSNN';
    App.showNotification(`Đã chuyển sang Lớp Bản Đồ: ${layerVN}`, 'info');
  },

  renderVizCockpit() {
    const container = document.getElementById('vizMainContent');
    if (!container) return;

    container.innerHTML = `
      <!-- Row 1: Interactive Multi-layer GIS Heatmap & Treemap -->
      <div class="dashboard-row">
        <!-- Multi-Layer GIS Map -->
        <div class="col-7">
          <div class="card" style="height: 100%;">
            <div class="card-header" style="flex-wrap: wrap; gap: 12px;">
              <div>
                <h3 class="card-title"><i data-lucide="map"></i> Bản đồ kinh tế không gian (GIS)</h3>
                <p class="card-subtitle">Chuyển đổi các lớp chuyên đề không gian kinh tế toàn tỉnh</p>
              </div>
              <div id="mapLayerButtons" style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="btn ${this.currentLayer === 'revenue' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AdvancedVizManager.switchMapLayer('revenue', this)">Thu NSNN</button>
                <button class="btn ${this.currentLayer === 'investment' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AdvancedVizManager.switchMapLayer('investment', this)">Đầu tư công</button>
                <button class="btn ${this.currentLayer === 'enterprises' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AdvancedVizManager.switchMapLayer('enterprises', this)">Doanh nghiệp</button>
                <button class="btn ${this.currentLayer === 'land_price' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AdvancedVizManager.switchMapLayer('land_price', this)">Bảng giá đất</button>
              </div>
            </div>

            <div id="advancedGisMapContainer" class="khanhhoa-map-container" style="min-height: 390px; position: relative; overflow: hidden; width: 100%;">
            </div>
          </div>
        </div>

        <!-- Treemap Chi Ngân Sách -->
        <div class="col-5">
          <div class="card" style="height: 100%;">
            <div class="card-header">
              <div>
                <h3 class="card-title"><i data-lucide="grid"></i> Cơ cấu phân bổ chi ngân sách</h3>
                <p class="card-subtitle">Cơ cấu chi thường xuyên & đầu tư phát triển theo ngành (Tỷ đồng)</p>
              </div>
              <span class="badge badge-purple">16.240 Tỷ Tổng Chi</span>
            </div>
            <div id="budgetTreemapContainer" style="padding: 10px 0; min-height: 380px;">
              <div class="budget-treemap-grid">
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
                <h3 class="card-title"><i data-lucide="trending-up"></i> Tiến độ giải ngân S-Curve</h3>
                <p class="card-subtitle">Đối chiếu kế hoạch vốn giao, cam kết chủ đầu tư và thực tế giải ngân</p>
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
                <h3 class="card-title"><i data-lucide="bubbles"></i> Ma trận rủi ro tài chính doanh nghiệp</h3>
                <p class="card-subtitle">Định vị ROA (trục Y) vs Nợ thuế (trục X) vs Doanh thu (kích thước Bubble)</p>
              </div>
              <span class="badge badge-danger">185 DN Cảnh báo</span>
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

  // 1. Render Bản Đồ GIS Đa Lớp (Leaflet GIS Real-world Map)
  renderLayerMap() {
    const container = document.getElementById('advancedGisMapContainer');
    if (!container) return;

    if (window.GisMapManager && typeof GisMapManager.initMap === 'function') {
      GisMapManager.initMap('advancedGisMapContainer', { zoom: 9, initialLayer: this.currentLayer });
    }
  },

  // 3. Render Đường Cong S-Curve Giải Ngân Vốn ĐTC
  renderSCurveChart() {
    const canvas = document.getElementById('chartSCurveCanvas');
    if (!canvas) return;

    if (this.chartInstances.scurve) this.chartInstances.scurve.destroy();

    const ctx = canvas.getContext('2d');
    const weeks = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

    this.chartInstances.scurve = new Chart(ctx, {
      type: 'line',
      data: {
        labels: weeks,
        datasets: [
          {
            label: 'Kế hoạch vốn giao đầu năm (Tỷ đ)',
            data: [1200, 2400, 3900, 5200, 6800, 8500, 10200, 11800, 13400, 14800, 15800, 16240],
            borderColor: '#94a3b8',
            borderDash: [5, 5],
            fill: false,
            tension: 0.35,
            pointRadius: 3
          },
          {
            label: 'Tiến độ cam kết chủ đầu tư',
            data: [800, 1900, 3300, 4700, 6200, 7800, 9400, 11000, null, null, null, null],
            borderColor: '#0F52BA',
            borderWidth: 2.5,
            fill: false,
            tension: 0.35,
            pointRadius: 4,
            pointBackgroundColor: '#0F52BA'
          },
          {
            label: 'Thực tế giải ngân qua KBNN',
            data: [750, 1720, 3050, 4420, 5890, 7450, 8920, 10450, null, null, null, null],
            borderColor: '#15803d',
            backgroundColor: 'rgba(21, 128, 61, 0.08)',
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointRadius: 5,
            pointBackgroundColor: '#15803d'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11, family: "'Be Vietnam Pro', sans-serif" } } },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw ? ctx.raw.toLocaleString('vi-VN') + ' Tỷ đ' : 'Chưa đến kỳ'}`
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { family: "'Be Vietnam Pro', sans-serif" } } },
          y: {
            grid: { color: '#f1f5f9' },
            ticks: {
              callback: (v) => `${v.toLocaleString('vi-VN')} Tỷ`,
              font: { family: "'JetBrains Mono', monospace", size: 10 }
            }
          }
        }
      }
    });
  },

  // 4. Render Bubble Chart Ma Trận Rủi Ro Doanh Nghiệp
  renderBubbleRiskChart() {
    const canvas = document.getElementById('chartBubbleRiskCanvas');
    if (!canvas) return;

    if (this.chartInstances.bubble) this.chartInstances.bubble.destroy();

    const ctx = canvas.getContext('2d');
    const bubbleData = [
      { x: 12.5, y: 14.2, r: 24, name: 'Tổng công ty Khánh Việt (Khatoco)', risk: 'Thấp' },
      { x: 8.2, y: 16.8, r: 22, name: 'Công ty Yến Sào Khánh Hòa', risk: 'Thấp' },
      { x: 45.0, y: 3.2, r: 16, name: 'Công ty CP Bất Động Sản Biển Nha Trang', risk: 'Cao' },
      { x: 38.5, y: 5.4, r: 14, name: 'Công ty TNHH Đầu tư Xây dựng Cam Ranh', risk: 'Trung bình' },
      { x: 62.0, y: -2.1, r: 18, name: 'Công ty Cổ phần Thủy sản Vân Phong', risk: 'Rất cao' },
      { x: 18.0, y: 8.5, r: 12, name: 'Công ty CP Cảng Cam Ranh', risk: 'Thấp' },
      { x: 28.5, y: 6.8, r: 11, name: 'Công ty CP Dệt May Nha Trang', risk: 'Trung bình' },
      { x: 52.0, y: 1.1, r: 15, name: 'Công ty TNHH Du lịch & Khách sạn Bãi Dài', risk: 'Cao' }
    ];

    this.chartInstances.bubble = new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Doanh nghiệp trọng điểm',
          data: bubbleData.map(d => ({ x: d.x, y: d.y, r: d.r, name: d.name, risk: d.risk })),
          backgroundColor: (ctx) => {
            const raw = ctx.raw;
            if (!raw) return '#0F52BA';
            if (raw.risk === 'Rất cao') return 'rgba(239, 68, 68, 0.75)';
            if (raw.risk === 'Cao') return 'rgba(249, 115, 22, 0.75)';
            if (raw.risk === 'Trung bình') return 'rgba(234, 179, 8, 0.75)';
            return 'rgba(21, 128, 61, 0.75)';
          },
          borderColor: '#ffffff',
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
              label: (ctx) => {
                const r = ctx.raw;
                return [
                  `🏢 ${r.name}`,
                  `  • Tỷ lệ Nợ thuế / Doanh thu: ${r.x}%`,
                  `  • Tỷ suất sinh lời ROA: ${r.y}%`,
                  `  • Mức độ rủi ro tài chính: ${r.risk}`
                ];
              }
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Tỷ lệ nợ đọng thuế & nghĩa vụ tài chính (%)', font: { family: "'Be Vietnam Pro', sans-serif", size: 11 } },
            grid: { color: '#f1f5f9' },
            ticks: { font: { family: "'JetBrains Mono', monospace" } }
          },
          y: {
            title: { display: true, text: 'Tỷ suất sinh lời trên tài sản ROA (%)', font: { family: "'Be Vietnam Pro', sans-serif", size: 11 } },
            grid: { color: '#f1f5f9' },
            ticks: { font: { family: "'JetBrains Mono', monospace" } }
          }
        }
      }
    });
  },

  // 5. Cập nhật dữ liệu thời gian thực cho biểu đồ BI
  onRealtimeEvent(evt) {
    if (!evt) return;
    if (evt.category === 'ĐẦU TƯ CÔNG' && this.chartInstances.scurve) {
      const scurve = this.chartInstances.scurve;
      const actualDs = scurve.data.datasets[2];
      if (actualDs) {
        const lastIdx = 7;
        actualDs.data[lastIdx] = Number((actualDs.data[lastIdx] + (Math.random() * 8 + 2)).toFixed(1));
        scurve.update('none');
      }
    }
  }
};
