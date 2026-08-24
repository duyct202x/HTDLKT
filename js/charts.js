/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * CHARTS, GIS MAP & INTERACTIVE VISUALIZATIONS
 */

const ChartsManager = {
  instances: {},

  initAll() {
    if (window.Chart) {
      Chart.defaults.font.family = "'Be Vietnam Pro', sans-serif";
      Chart.defaults.color = '#475569';
    }
    this.renderRevenueChart();
    this.renderInvestmentChart();
    this.renderSectorPieChart();
    this.renderRiskScatterPlot();
    this.renderSankeyFlow();
    this.renderKhanhHoaMap();
  },

  // 1. Biểu đồ Cơ cấu và Tiến độ Thu Ngân Sách theo Sắc Thuế
  renderRevenueChart() {
    const canvas = document.getElementById('chartRevenueStructure');
    if (!canvas) return;

    if (this.instances.revenue) this.instances.revenue.destroy();

    const ctx = canvas.getContext('2d');
    
    // Gradient sắc sảo cho Dự toán
    const gradPlan = ctx.createLinearGradient(0, 0, 0, 280);
    gradPlan.addColorStop(0, 'rgba(100, 116, 139, 0.5)');
    gradPlan.addColorStop(1, 'rgba(148, 163, 184, 0.15)');

    // Gradient đại dương cao cấp cho Thực thu
    const gradActual = ctx.createLinearGradient(0, 0, 0, 280);
    gradActual.addColorStop(0, '#002B8C');
    gradActual.addColorStop(0.5, '#0F52BA');
    gradActual.addColorStop(1, '#0284c7');

    this.instances.revenue = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Thu từ DNNN', 'Thu từ DN FDI', 'Thu Ngoài QDoanh', 'Thuế TNCN', 'Tiền SD Đất', 'Thu từ XNK (Hải quan)'],
        datasets: [
          {
            label: 'Dự toán Giao 2026 (Tỷ đồng)',
            data: [4200, 2100, 4800, 1600, 2500, 2900],
            backgroundColor: gradPlan,
            borderColor: '#64748b',
            borderWidth: 1.5,
            borderRadius: 8,
            borderSkipped: false
          },
          {
            label: 'Số Thực thu Lũy kế (Tỷ đồng)',
            data: [4380, 2150, 4920, 1640, 2330, 3100.6],
            backgroundColor: gradActual,
            borderColor: '#002B8C',
            borderWidth: 1.5,
            borderRadius: 8,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (event, elements) => {
          if (window.DeptWorkspaceManager) {
            DeptWorkspaceManager.openKpiDrilldownModal('Tổng thu ngân sách nhà nước', 'ktns');
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        layout: {
          padding: { left: 16, right: 14, top: 10, bottom: 6 }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: { 
              color: '#1e293b', 
              font: { family: 'Be Vietnam Pro', size: 12, weight: '700' },
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 16
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 43, 140, 0.95)',
            titleFont: { family: 'Be Vietnam Pro', size: 13, weight: 'bold' },
            bodyFont: { family: 'Be Vietnam Pro', size: 12 },
            padding: 12,
            cornerRadius: 8,
            borderColor: '#38bdf8',
            borderWidth: 1,
            displayColors: true,
            callbacks: {
              label: (context) => {
                const val = context.raw;
                return ` ${context.dataset.label}: ${val.toLocaleString('vi-VN')} Tỷ đồng`;
              }
            }
          }
        },
        scales: {
          x: {
            ticks: { color: '#475569', font: { family: 'Be Vietnam Pro', size: 11, weight: '600' } },
            grid: { display: false }
          },
          y: {
            ticks: { 
              color: '#475569', 
              font: { family: 'JetBrains Mono', size: 11, weight: '600' },
              padding: 8,
              callback: (val) => `${val.toLocaleString('vi-VN')} Tỷ`
            },
            grid: { color: 'rgba(0, 43, 140, 0.06)' }
          }
        }
      }
    });
  },

  // 2. Biểu đồ Tiến độ Giải ngân Vốn Đầu tư công theo Tháng
  renderInvestmentChart() {
    const canvas = document.getElementById('chartInvestmentProgress');
    if (!canvas) return;

    if (this.instances.investment) this.instances.investment.destroy();

    const ctx = canvas.getContext('2d');
    
    // Gradient vùng phủ giải ngân
    const gradArea = ctx.createLinearGradient(0, 0, 0, 260);
    gradArea.addColorStop(0, 'rgba(15, 82, 186, 0.35)');
    gradArea.addColorStop(0.7, 'rgba(2, 132, 199, 0.1)');
    gradArea.addColorStop(1, 'rgba(2, 132, 199, 0.0)');

    this.instances.investment = new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8 (HT)', 'T9 (DK)', 'T10', 'T11', 'T12'],
        datasets: [
          {
            label: 'Kế hoạch Phân bổ Lũy kế (%)',
            data: [8, 15, 25, 34, 45, 58, 68, 78, 85, 92, 98, 100],
            borderColor: '#94a3b8',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6
          },
          {
            label: 'Giải ngân Thực tế Lũy kế (%)',
            data: [6.2, 12.8, 22.4, 31.0, 42.5, 53.2, 62.8, 68.38, null, null, null, null],
            borderColor: '#002B8C',
            backgroundColor: gradArea,
            borderWidth: 3.5,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: ['#0F52BA', '#0F52BA', '#0F52BA', '#0F52BA', '#0F52BA', '#0F52BA', '#0F52BA', '#15803d', '#cbd5e1', '#cbd5e1', '#cbd5e1', '#cbd5e1'],
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: [4, 4, 4, 4, 4, 4, 4, 8, 0, 0, 0, 0],
            pointHoverRadius: 10
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (event, elements) => {
          if (window.DeptWorkspaceManager) {
            DeptWorkspaceManager.openKpiDrilldownModal('Giải ngân vốn đầu tư công', 'dtc');
          }
        },
        animation: {
          duration: 1200,
          easing: 'easeOutCubic'
        },
        layout: {
          padding: { left: 14, right: 14, top: 10, bottom: 6 }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: { 
              color: '#1e293b', 
              font: { family: 'Be Vietnam Pro', size: 12, weight: '700' },
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 16
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 43, 140, 0.95)',
            titleFont: { family: 'Be Vietnam Pro', size: 13, weight: 'bold' },
            bodyFont: { family: 'Be Vietnam Pro', size: 12 },
            padding: 12,
            cornerRadius: 8,
            borderColor: '#38bdf8',
            borderWidth: 1,
            callbacks: {
              label: (context) => ` ${context.dataset.label}: ${context.raw}%`
            }
          }
        },
        scales: {
          x: {
            ticks: { color: '#475569', font: { family: 'Be Vietnam Pro', size: 11, weight: '600' } },
            grid: { color: 'rgba(0, 43, 140, 0.04)' }
          },
          y: {
            min: 0,
            max: 100,
            ticks: { 
              color: '#475569', 
              font: { family: 'JetBrains Mono', size: 11, weight: '600' },
              callback: (val) => val + '%'
            },
            grid: { color: 'rgba(0, 43, 140, 0.06)' }
          }
        }
      }
    });
  },

  // 3. Biểu đồ Tròn Cơ cấu Kinh tế & Đóng góp Ngân sách
  renderSectorPieChart() {
    const canvas = document.getElementById('chartSectorPie');
    if (!canvas) return;

    if (this.instances.sector) this.instances.sector.destroy();

    this.instances.sector = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Dịch vụ - Du lịch', 'Công nghiệp - Xây dựng', 'Nông - Lâm - Thủy sản', 'Thuế sản phẩm'],
        datasets: [{
          data: [47.5, 31.2, 11.8, 9.5],
          backgroundColor: [
            '#002B8C',
            '#0F52BA',
            '#0284c7',
            '#10b981'
          ],
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { 
              color: '#334155', 
              font: { family: 'Be Vietnam Pro', size: 11, weight: '600' },
              padding: 12,
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 43, 140, 0.95)',
            callbacks: {
              label: (context) => ` ${context.label}: ${context.raw}% GRDP tỉnh`
            }
          }
        },
        cutout: '70%'
      }
    });
  },

  // 4. Biểu đồ Phân tán (Scatter Plot) Định vị Rủi ro Doanh nghiệp
  renderRiskScatterPlot() {
    const canvas = document.getElementById('chartRiskScatter');
    if (!canvas) return;

    if (this.instances.scatter) this.instances.scatter.destroy();

    const dataPoints = APP_DATA.enterpriseRiskMatrix.map(dn => ({
      x: dn.roa,
      y: dn.tax_compliance_score,
      name: dn.name,
      risk: dn.risk_level,
      roe: dn.roe,
      color: dn.color
    }));

    this.instances.scatter = new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Doanh nghiệp trên Địa bàn Tỉnh',
          data: dataPoints,
          backgroundColor: dataPoints.map(p => p.color),
          borderColor: '#ffffff',
          borderWidth: 2,
          pointRadius: 9,
          pointHoverRadius: 14
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 43, 140, 0.95)',
            callbacks: {
              label: (item) => {
                const raw = item.raw;
                return ` ${raw.name}: ROA=${raw.x}%, Tuân thủ=${raw.y}/100 [${raw.risk}]`;
              }
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Tỷ suất Sinh lời ROA (%)', color: '#334155', font: { weight: '700' } },
            ticks: { color: '#64748b' },
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          },
          y: {
            title: { display: true, text: 'Điểm Tuân thủ Thuế & BCTC (0 - 100)', color: '#334155', font: { weight: '700' } },
            min: 0,
            max: 100,
            ticks: { color: '#64748b' },
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
      <div class="sankey-flow-wrapper">
        <!-- Cột 1: Nguồn Thu Vào -->
        <div class="sankey-col">
          <div class="sankey-col-header" style="color: #0284c7;">
            <i data-lucide="arrow-down-left"></i> I. NGUỒN THU VÀO
          </div>
          <div class="sankey-card border-cyan">
            <div class="sankey-card-title">Thu Nội Địa (Thuế & Đất)</div>
            <div class="sankey-card-value">15.420,0 Tỷ</div>
            <div class="sankey-card-sub">Chiếm 89,3% tổng thu tỉnh</div>
          </div>
          <div class="sankey-card border-blue">
            <div class="sankey-card-title">Thu Hải Quan (XNK)</div>
            <div class="sankey-card-value">3.100,6 Tỷ</div>
            <div class="sankey-card-sub">Cảng biển & KKT Vân Phong</div>
          </div>
          <div class="sankey-card border-purple">
            <div class="sankey-card-title">Bổ sung có mục tiêu NSTW</div>
            <div class="sankey-card-value">1.850,0 Tỷ</div>
            <div class="sankey-card-sub">Chương trình MTQG & NQ 55</div>
          </div>
        </div>

        <!-- Mũi tên kết nối 1 -->
        <div class="sankey-flow-arrow">
          <div class="flow-line"></div>
          <div class="flow-icon-circle">
            <i data-lucide="arrow-right"></i>
          </div>
          <div class="flow-line"></div>
        </div>

        <!-- Cột 2: Cân Đối Trung Tâm -->
        <div class="sankey-col center-col">
          <div class="sankey-col-header" style="color: #002B8C;">
            <i data-lucide="scale"></i> II. ĐIỀU TIẾT CÂN ĐỐI TỈNH
          </div>
          <div class="sankey-center-card">
            <div class="center-card-badge">TỔNG NGÂN SÁCH ĐỊA PHƯƠNG HƯỞNG</div>
            <div class="center-card-value">17.250,8</div>
            <div class="center-card-unit">Tỷ đồng (VNĐ)</div>
            <div class="center-card-divider"></div>
            <div class="center-card-meta">
              <div class="meta-row">
                <span>Điều tiết nộp về NSTW:</span>
                <strong style="color: #002B8C;">3.119,8 Tỷ (18%)</strong>
              </div>
              <div class="meta-row">
                <span>Tỷ lệ tự cân đối NS:</span>
                <strong style="color: #15803d;">102,4% (Vượt 2.4%)</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Mũi tên kết nối 2 -->
        <div class="sankey-flow-arrow">
          <div class="flow-line"></div>
          <div class="flow-icon-circle" style="background: #15803d;">
            <i data-lucide="arrow-right"></i>
          </div>
          <div class="flow-line"></div>
        </div>

        <!-- Cột 3: Phân Bổ Nhiệm Vụ Chi -->
        <div class="sankey-col">
          <div class="sankey-col-header" style="color: #15803d;">
            <i data-lucide="arrow-up-right"></i> III. NHIỆM VỤ PHÂN BỔ CHI
          </div>
          <div class="sankey-card border-green">
            <div class="sankey-card-title">Chi Đầu Tư Phát Triển (ĐTC)</div>
            <div class="sankey-card-value">7.850,4 Tỷ</div>
            <div class="sankey-card-sub">45,5% - Hạ tầng trọng điểm</div>
          </div>
          <div class="sankey-card border-amber">
            <div class="sankey-card-title">Chi Thường Xuyên (HCSN/Y tế/GD)</div>
            <div class="sankey-card-value">7.180,0 Tỷ</div>
            <div class="sankey-card-sub">41,6% - Giáo dục, Y tế, An sinh</div>
          </div>
          <div class="sankey-card border-rose">
            <div class="sankey-card-title">Chi Trả Nợ Vay & Dự Phòng</div>
            <div class="sankey-card-value">1.209,8 Tỷ</div>
            <div class="sankey-card-sub">12,9% - Dự phòng bão lũ, ODA</div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  // 6. Bản đồ Tương tác Không gian Kinh tế Khánh Hòa (Leaflet GIS Real-world Map)
  renderKhanhHoaMap() {
    const mapArea = document.getElementById('khanhHoaGisMapContainer');
    if (!mapArea) return;

    if (window.GisMapManager && typeof GisMapManager.initMap === 'function') {
      GisMapManager.initMap('khanhHoaGisMapContainer', { zoom: 9, initialLayer: 'revenue' });
    }
  },

  selectDistrict(districtId) {
    if (window.GisMapManager && typeof GisMapManager.selectDistrict === 'function') {
      GisMapManager.selectDistrict(districtId);
    }
  },

  // 7. Nhận và cập nhật luồng sự kiện thời gian thực (Real-time Live Event Dispatcher)
  onRealtimeEvent(evt) {
    if (!evt) return;

    // 1. Cập nhật biểu đồ Thu Ngân Sách
    if (evt.category === 'THU NGÂN SÁCH' && this.instances.revenue) {
      const revChart = this.instances.revenue;
      const actualDataset = revChart.data.datasets[1];
      if (actualDataset) {
        const targetIdx = evt.content.includes('Khánh Việt') ? 0 : evt.content.includes('Yến Sào') ? 0 : 2;
        actualDataset.data[targetIdx] = Number((actualDataset.data[targetIdx] + (Math.random() * 6 + 1)).toFixed(1));
        revChart.update('active');
      }
    }

    // 2. Cập nhật biểu đồ Giải Ngân ĐTC
    if (evt.category === 'GIẢI NGÂN ĐTC' && this.instances.investment) {
      const invChart = this.instances.investment;
      const actualDataset = invChart.data.datasets[1];
      if (actualDataset && actualDataset.data[7] !== null) {
        actualDataset.data[7] = Number((Math.min(99.9, actualDataset.data[7] + 0.06)).toFixed(2));
        invChart.update('active');
      }
    }

    // 3. Kích hoạt Radar Marker thời gian thực trên bản đồ GIS Leaflet
    let code = 'NTR';
    if (evt.content.includes('Vân Phong') || evt.content.includes('Vạn Ninh')) {
      code = 'VNI';
    } else if (evt.content.includes('Cam Ranh')) {
      code = 'CRH';
    } else if (evt.content.includes('Ninh Hòa')) {
      code = 'NHO';
    }

    if (window.GisMapManager && typeof GisMapManager.triggerRealtimeMarker === 'function') {
      GisMapManager.triggerRealtimeMarker('khanhHoaLeafletMap', code, evt);
      GisMapManager.triggerRealtimeMarker('advancedGisLeafletMap', code, evt);
    }
  }
};
