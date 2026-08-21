/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * CHARTS, GIS MAP & INTERACTIVE VISUALIZATIONS
 */

const ChartsManager = {
  instances: {},

  initAll() {
    this.renderRevenueChart();
    this.renderInvestmentChart();
    this.renderSectorPieChart();
    this.renderRiskScatterPlot();
    this.renderSankeyFlow();
    this.renderKhanhHoaMap();
  },

  // 1. Biểu đồ Cơ cấu và Tiến độ Thu Ngân Sách theo Sắc Thuế
  renderRevenueChart() {
    const ctx = document.getElementById('chartRevenueStructure');
    if (!ctx) return;

    if (this.instances.revenue) this.instances.revenue.destroy();

    this.instances.revenue = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Thu từ DNNN', 'Thu từ DN FDI', 'Thu khối Ngoài QDoanh', 'Thuế TNCN', 'Tiền SD Đất & Thuê đất', 'Thu từ XNK (Hải quan)'],
        datasets: [
          {
            label: 'Dự toán Giao năm 2026 (Tỷ đồng)',
            data: [4200, 2100, 4800, 1600, 2500, 2900],
            backgroundColor: 'rgba(62, 93, 142, 0.35)',
            borderColor: '#3E5D8E',
            borderWidth: 1.5,
            borderRadius: 6
          },
          {
            label: 'Số Thực thu Lũy kế (Tỷ đồng)',
            data: [4380, 2150, 4920, 1640, 2330, 3100.6],
            backgroundColor: '#002B8C',
            borderColor: '#0F52BA',
            borderWidth: 1.5,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#3E5D8E', font: { family: 'Outfit', size: 12, weight: '600' } }
          },
          tooltip: {
            backgroundColor: '#002B8C',
            titleFont: { family: 'Outfit', size: 13, weight: 'bold' },
            bodyFont: { family: 'Outfit', size: 12 },
            padding: 12,
            borderColor: '#0F52BA',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            ticks: { color: '#3E5D8E', font: { family: 'Outfit', size: 11, weight: '600' } },
            grid: { color: 'rgba(62, 93, 142, 0.08)' }
          },
          y: {
            ticks: { 
              color: '#3E5D8E', 
              font: { family: 'Outfit', size: 11, weight: '600' },
              callback: (val) => val.toLocaleString() + ' Tỷ'
            },
            grid: { color: 'rgba(62, 93, 142, 0.08)' }
          }
        }
      }
    });
  },

  // 2. Biểu đồ Tiến độ Giải ngân Vốn Đầu tư công theo Tháng
  renderInvestmentChart() {
    const ctx = document.getElementById('chartInvestmentProgress');
    if (!ctx) return;

    if (this.instances.investment) this.instances.investment.destroy();

    this.instances.investment = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8 (HT)', 'T9 (DK)', 'T10', 'T11', 'T12'],
        datasets: [
          {
            label: 'Kế hoạch Vốn Phân bổ Lũy kế (%)',
            data: [8, 15, 25, 34, 45, 58, 68, 78, 85, 92, 98, 100],
            borderColor: '#3E5D8E',
            backgroundColor: 'rgba(62, 93, 142, 0.1)',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            tension: 0.3
          },
          {
            label: 'Giải ngân Thực tế Lũy kế (%)',
            data: [6.2, 12.8, 22.4, 31.0, 42.5, 53.2, 62.8, 68.38, null, null, null, null],
            borderColor: '#002B8C',
            backgroundColor: 'rgba(0, 43, 140, 0.08)',
            borderWidth: 3,
            fill: true,
            tension: 0.3,
            pointBackgroundColor: '#0F52BA',
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#3E5D8E', font: { family: 'Outfit', size: 12, weight: '600' } }
          }
        },
        scales: {
          x: {
            ticks: { color: '#3E5D8E', font: { family: 'Outfit', size: 11, weight: '600' } },
            grid: { color: 'rgba(62, 93, 142, 0.08)' }
          },
          y: {
            min: 0,
            max: 100,
            ticks: { 
              color: '#3E5D8E', 
              font: { family: 'Outfit', size: 11, weight: '600' },
              callback: (val) => val + '%'
            },
            grid: { color: 'rgba(62, 93, 142, 0.08)' }
          }
        }
      }
    });
  },

  // 3. Biểu đồ Tròn Cơ cấu Kinh tế & Đóng góp Ngân sách
  renderSectorPieChart() {
    const ctx = document.getElementById('chartSectorPie');
    if (!ctx) return;

    if (this.instances.sector) this.instances.sector.destroy();

    this.instances.sector = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Dịch vụ - Du lịch', 'Công nghiệp - Xây dựng', 'Nông - Lâm - Thủy sản', 'Thuế sản phẩm trừ trợ cấp'],
        datasets: [{
          data: [47.5, 31.2, 11.8, 9.5],
          backgroundColor: [
            '#002B8C',
            '#0F52BA',
            '#3E5D8E',
            '#282888'
          ],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#3E5D8E', font: { family: 'Outfit', size: 11, weight: '600' }, padding: 12 }
          }
        },
        cutout: '68%'
      }
    });
  },

  // 4. Biểu đồ Phân tán (Scatter Plot) Định vị Rủi ro Doanh nghiệp
  renderRiskScatterPlot() {
    const ctx = document.getElementById('chartRiskScatter');
    if (!ctx) return;

    if (this.instances.scatter) this.instances.scatter.destroy();

    const dataPoints = APP_DATA.enterpriseRiskMatrix.map(dn => ({
      x: dn.roa,
      y: dn.tax_compliance_score,
      name: dn.name,
      risk: dn.risk_level,
      roe: dn.roe,
      color: dn.color
    }));

    this.instances.scatter = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Doanh nghiệp trên Địa bàn Tỉnh',
          data: dataPoints,
          backgroundColor: dataPoints.map(p => p.color),
          pointRadius: 8,
          pointHoverRadius: 12
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
                const raw = item.raw;
                return `${raw.name}: ROA=${raw.x}%, Tuân thủ Thuế=${raw.y}/100 (Mức độ rủi ro: ${raw.risk})`;
              }
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Tỷ suất Sinh lời ROA (%)', color: '#475569', font: { weight: '700' } },
            ticks: { color: '#475569' },
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          },
          y: {
            title: { display: true, text: 'Điểm Tuân thủ Thuế & BCTC (0 - 100)', color: '#475569', font: { weight: '700' } },
            min: 0,
            max: 100,
            ticks: { color: '#475569' },
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          }
        }
      }
    });
  },

  // 5. Biểu đồ Dòng Chảy Ngân Sách (Sankey / Cashflow Stream)
  renderSankeyFlow() {
    const container = document.getElementById('sankeyFlowContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="sankey-container">
        <!-- Nguồn Thu -->
        <div class="sankey-column">
          <div class="sankey-node" style="border-left: 4px solid #06b6d4;">
            <span class="sankey-node-title">Thu Nội Địa (Thuế & Đất)</span>
            <span class="sankey-node-value">15.420,0 Tỷ VND</span>
          </div>
          <div class="sankey-node" style="border-left: 4px solid #3b82f6;">
            <span class="sankey-node-title">Thu Hải Quan (XNK)</span>
            <span class="sankey-node-value">3.100,6 Tỷ VND</span>
          </div>
          <div class="sankey-node" style="border-left: 4px solid #8b5cf6;">
            <span class="sankey-node-title">Bổ sung có mục tiêu từ NSTW</span>
            <span class="sankey-node-value">1.850,0 Tỷ VND</span>
          </div>
        </div>

        <!-- Mũi tên kết nối -->
        <div class="sankey-connector">
          <i class="lucide-arrow-right"></i>
        </div>

        <!-- Tầng Phân Bổ Tỉnh -->
        <div class="sankey-column">
          <div class="sankey-node" style="background: rgba(37, 117, 252, 0.2); border: 1px solid #3b82f6; text-align: center;">
            <span class="sankey-node-title">TỔNG NGÂN SÁCH ĐỊA PHƯƠNG HƯỞNG</span>
            <span class="sankey-node-value" style="font-size: 18px; color: #38bdf8;">17.250,8 Tỷ VND</span>
            <span style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Điều tiết nộp về NSTW: 3.119,8 Tỷ</span>
          </div>
        </div>

        <!-- Mũi tên kết nối -->
        <div class="sankey-connector">
          <i class="lucide-arrow-right"></i>
        </div>

        <!-- Chi Tiêu Đầu Ra -->
        <div class="sankey-column">
          <div class="sankey-node" style="border-left: 4px solid #10b981;">
            <span class="sankey-node-title">Chi Đầu Tư Phát Triển (ĐTC)</span>
            <span class="sankey-node-value">7.850,4 Tỷ VND</span>
          </div>
          <div class="sankey-node" style="border-left: 4px solid #f59e0b;">
            <span class="sankey-node-title">Chi Thường Xuyên (HCSN/Y tế/GD)</span>
            <span class="sankey-node-value">7.180,0 Tỷ VND</span>
          </div>
          <div class="sankey-node" style="border-left: 4px solid #ef4444;">
            <span class="sankey-node-title">Chi Trả Nợ Vay & Dự Phòng</span>
            <span class="sankey-node-value">1.209,8 Tỷ VND</span>
          </div>
        </div>
      </div>
    `;
  },

  // 6. Bản đồ Tương tác Không gian Kinh tế Khánh Hòa (GIS Map)
  renderKhanhHoaMap() {
    const container = document.getElementById('khanhHoaMapFrame');
    if (!container) return;

    // Build interactive SVG Map with real Districts
    container.innerHTML = `
      <svg viewBox="0 0 700 450" class="map-svg-frame">
        <!-- Background Grids & Sea -->
        <defs>
          <radialGradient id="oceanGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#0284c7" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#oceanGlow)" rx="12" />

        <!-- Vạn Ninh (Bắc Khánh Hòa) -->
        <path id="path-VNI" class="district-path" d="M 320 40 L 410 60 L 440 110 L 370 120 L 310 90 Z" onclick="ChartsManager.selectDistrict('7904')"></path>
        <text x="360" y="85" fill="#e2e8f0" font-size="11" font-weight="600" text-anchor="middle" pointer-events="none">Vạn Ninh</text>

        <!-- TX Ninh Hòa -->
        <path id="path-NHO" class="district-path" d="M 280 100 L 370 120 L 410 160 L 340 180 L 260 140 Z" onclick="ChartsManager.selectDistrict('7903')"></path>
        <text x="330" y="150" fill="#e2e8f0" font-size="11" font-weight="600" text-anchor="middle" pointer-events="none">Ninh Hòa</text>

        <!-- TP Nha Trang (Trung tâm) -->
        <path id="path-NTR" class="district-path active" d="M 340 185 L 430 200 L 450 250 L 370 260 L 330 215 Z" onclick="ChartsManager.selectDistrict('7901')"></path>
        <circle cx="400" cy="225" r="5" fill="#002B8C" class="map-pin"></circle>
        <text x="400" y="245" fill="#002B8C" font-size="12" font-weight="700" text-anchor="middle" pointer-events="none">Khu vực Nha Trang</text>

        <!-- Khu vực Diên Khánh -->
        <path id="path-DKH" class="district-path" d="M 260 190 L 330 210 L 350 260 L 270 255 Z" onclick="ChartsManager.selectDistrict('7906')"></path>
        <text x="300" y="235" fill="#334155" font-size="10" font-weight="500" text-anchor="middle" pointer-events="none">Diên Khánh</text>

        <!-- Khu vực Khánh Vĩnh (Phía Tây) -->
        <path id="path-KVH" class="district-path" d="M 160 180 L 260 190 L 265 270 L 150 250 Z" onclick="ChartsManager.selectDistrict('7907')"></path>
        <text x="210" y="230" fill="#334155" font-size="10" font-weight="500" text-anchor="middle" pointer-events="none">Khánh Vĩnh</text>

        <!-- Khu vực Cam Lâm -->
        <path id="path-CLM" class="district-path" d="M 320 265 L 410 270 L 430 330 L 310 320 Z" onclick="ChartsManager.selectDistrict('7905')"></path>
        <text x="370" y="298" fill="#1e293b" font-size="11" font-weight="600" text-anchor="middle" pointer-events="none">Cam Lâm</text>

        <!-- Khu vực Khánh Sơn (Tây Nam) -->
        <path id="path-KSO" class="district-path" d="M 190 275 L 300 280 L 290 350 L 180 340 Z" onclick="ChartsManager.selectDistrict('7908')"></path>
        <text x="240" y="315" fill="#334155" font-size="10" font-weight="500" text-anchor="middle" pointer-events="none">Khánh Sơn</text>

        <!-- Khu vực Cam Ranh (Phía Nam) -->
        <path id="path-CRH" class="district-path" d="M 310 330 L 430 340 L 440 400 L 300 410 Z" onclick="ChartsManager.selectDistrict('7902')"></path>
        <circle cx="370" cy="370" r="5" fill="#0F52BA" class="map-pin"></circle>
        <text x="370" y="390" fill="#0F52BA" font-size="11" font-weight="700" text-anchor="middle" pointer-events="none">Cam Ranh</text>

        <!-- Đặc khu Trường Sa (Hải đảo) -->
        <g onclick="ChartsManager.selectDistrict('7909')" style="cursor: pointer;">
          <rect x="520" y="320" width="150" height="100" rx="8" fill="rgba(37, 117, 252, 0.1)" stroke="rgba(56, 189, 248, 0.4)" stroke-dasharray="3,3" />
          <circle cx="560" cy="350" r="3" fill="#38bdf8" />
          <circle cx="610" cy="370" r="4" fill="#38bdf8" />
          <circle cx="580" cy="395" r="3" fill="#38bdf8" />
          <text x="595" y="340" fill="#002B8C" font-size="10.5" font-weight="700" text-anchor="middle">ĐẶC KHU TRƯỜNG SA</text>
          <text x="595" y="412" fill="#64748b" font-size="9" text-anchor="middle">(Vùng biển đảo chủ quyền)</text>
        </g>
      </svg>

      <div class="map-overlay-info" id="mapDistrictInfo">
        <h4 id="overlayDistrictName" style="color: #002B8C; font-weight: 700; margin-bottom: 4px;">Khu vực Nha Trang</h4>
        <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
          <span style="color: #64748b;">Thu ngân sách:</span>
          <span id="overlayDistrictRevenue" style="color: #0f172a; font-weight: 600;">8.450,2 Tỷ</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
          <span style="color: #64748b;">Giải ngân vốn ĐTC:</span>
          <span id="overlayDistrictDTC" style="color: #15803d; font-weight: 600;">74,2%</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #64748b;">Số dự án trọng điểm:</span>
          <span id="overlayDistrictProjects" style="color: #b45309; font-weight: 600;">42 dự án</span>
        </div>
      </div>
    `;
  },

  selectDistrict(districtId) {
    const d = APP_DATA.districts.find(item => item.id === districtId);
    if (!d) return;

    // Update active class on paths
    document.querySelectorAll('.district-path').forEach(p => p.classList.remove('active'));
    const activePath = document.getElementById(`path-${d.code}`);
    if (activePath) activePath.classList.add('active');

    // Update overlay
    document.getElementById('overlayDistrictName').innerText = d.name;
    document.getElementById('overlayDistrictRevenue').innerText = d.revenue.toLocaleString() + ' Tỷ';
    document.getElementById('overlayDistrictDTC').innerText = d.dtc_rate + '%';
    document.getElementById('overlayDistrictProjects').innerText = d.projects + ' dự án';
  }
};
