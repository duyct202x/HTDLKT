/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * ĐỘNG CƠ BẢN ĐỒ GIS THỰC TẾ (REAL-WORLD GIS LEAFLET ENGINE)
 * Quản lý 65 Đơn vị hành chính cấp Xã/Phường/Đặc khu theo chuẩn Sở Nội vụ tỉnh Khánh Hòa & NQ 1667/NQ-UBTVQH15
 * (Chính quyền địa phương 2 cấp: Tỉnh và Xã/Phường/Đặc khu - Sử dụng Đánh dấu Điểm & Chú thích trực quan)
 */

window.GisMapManager = {
  maps: {},
  markerLayers: {},
  currentLayers: {},
  selectedDistricts: {},
  activeFilter: 'all', // 'all' | 'phuong' | 'xa' | 'dackhu'

  // 1. Khởi tạo bản đồ Leaflet trên container
  initMap(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    // Hủy instance cũ nếu có
    if (this.maps[containerId]) {
      try {
        this.maps[containerId].remove();
      } catch (e) {
        console.warn(e);
      }
      delete this.maps[containerId];
    }

    const layerType = options.initialLayer || 'revenue';
    this.currentLayers[containerId] = layerType;
    this.selectedDistricts[containerId] = 'KH65_49'; // Mặc định: Phường Nha Trang

    // Tạo cấu trúc khung bản đồ Leaflet
    container.innerHTML = `
      <div id="${containerId}_leaflet" class="gis-map-canvas" style="width: 100%; height: 100%; min-height: 440px; position: relative; border-radius: var(--radius-md); overflow: hidden; background: #e2e8f0;"></div>
      
      <!-- Top Left Layer Badge -->
      <div id="${containerId}_badge" class="gis-map-info-badge">
        <div class="gis-badge-top-row">
          <span class="gis-badge-tag">65 Đơn Vị Cấp Xã (48 Xã, 16 Phường, 01 Đặc khu)</span>
        </div>
        <div id="${containerId}_layerTitle" class="gis-badge-title">Thu ngân sách nhà nước theo xã, phường, đặc khu</div>
        <div id="${containerId}_layerLead" class="gis-badge-lead">Điểm dẫn đầu: 3.850 Tỷ (Phường Nha Trang) & 1.650 Tỷ (Phường Phan Rang)</div>
        <div class="gis-badge-meta">Diện tích: <strong>8.555,86 km²</strong> • Dân số: <strong>2.243.554 người</strong> • Đánh dấu điểm & Chú thích</div>
      </div>

      <!-- Floating Controls & Category Filter -->
      <div class="gis-map-filter-bar">
        <button class="gis-filter-btn active" id="${containerId}_btnFilter_all" onclick="GisMapManager.resetView('${containerId}')">
          <i data-lucide="compass"></i> <span>Toàn tỉnh (65 Đơn vị)</span>
        </button>
        <button class="gis-filter-btn" id="${containerId}_btnFilter_phuong" onclick="GisMapManager.filterCategory('${containerId}', 'phuong')">
          <i data-lucide="building"></i> <span>16 Phường đô thị</span>
        </button>
        <button class="gis-filter-btn" id="${containerId}_btnFilter_xa" onclick="GisMapManager.filterCategory('${containerId}', 'xa')">
          <i data-lucide="trees"></i> <span>48 Xã cơ sở</span>
        </button>
        <button class="gis-filter-btn" id="${containerId}_btnFilter_dackhu" onclick="GisMapManager.flyToTruongSa('${containerId}')">
          <i data-lucide="anchor"></i> <span>Đặc khu Trường Sa</span>
        </button>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    if (typeof L === 'undefined') {
      console.error('Leaflet is not loaded');
      return false;
    }

    const mapElement = document.getElementById(`${containerId}_leaflet`);
    if (!mapElement) return false;

    // Tọa độ trung tâm tỉnh Khánh Hòa (bao trùm toàn bộ 65 xã/phường từ Bắc đến Nam)
    const defaultCenter = [11.95, 109.00];
    const defaultZoom = options.zoom || 8.5;

    const map = L.map(`${containerId}_leaflet`, {
      center: defaultCenter,
      zoom: defaultZoom,
      minZoom: 6,
      maxZoom: 16,
      zoomControl: false,
      attributionControl: false
    });

    // Tile Layer CartoDB Voyager
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(map);

    // Zoom Control góc trên bên phải
    L.control.zoom({ position: 'topright' }).addTo(map);

    this.maps[containerId] = map;

    // Render các điểm đánh dấu và chú thích
    this.renderChoropleth(containerId, layerType);

    setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return true;
  },

  // 2. Render Đánh dấu điểm (Point Markers) và Chú thích (Annotations) cho 65 xã/phường/đặc khu
  renderChoropleth(containerId, layerType = 'revenue') {
    const map = this.maps[containerId];
    if (!map) return;

    this.currentLayers[containerId] = layerType;

    // Cập nhật Badge tiêu đề
    const titleEl = document.getElementById(`${containerId}_layerTitle`);
    const leadEl = document.getElementById(`${containerId}_layerLead`);
    if (titleEl && leadEl) {
      if (layerType === 'investment') {
        titleEl.innerText = "Tỷ lệ giải ngân vốn đầu tư công (ĐTC) cấp xã/phường";
        leadEl.innerText = "Điểm dẫn đầu: Cà Ná (88%) / Thuận Nam (82%) / Trường Sa (82%) / Đại Lãnh (78%)";
      } else if (layerType === 'enterprises') {
        titleEl.innerText = "Mật độ doanh nghiệp & hộ kinh doanh theo xã, phường";
        leadEl.innerText = "Điểm dẫn đầu: Phường Nha Trang (4.200 DN) / Phường Phan Rang (1.950 DN)";
      } else if (layerType === 'land_price') {
        titleEl.innerText = "Khung bảng giá đất & hệ số điều chỉnh K cấp xã/phường";
        leadEl.innerText = "Điểm dẫn đầu: K = 1.50 (Phường Nha Trang) / K = 1.45 (Phường Phan Rang)";
      } else {
        titleEl.innerText = "Thu ngân sách nhà nước theo xã, phường, đặc khu";
        leadEl.innerText = "Điểm dẫn đầu: 3.850 Tỷ (Phường Nha Trang) / 1.650 Tỷ (Phường Phan Rang)";
      }
    }

    // Xóa marker layer cũ nếu có
    if (this.markerLayers[containerId]) {
      map.removeLayer(this.markerLayers[containerId]);
    }

    const geoData = window.khanhHoa65UnitsGeoJson || window.khanhHoaRealGeoJson;
    if (!geoData || !geoData.features) {
      console.warn('GeoJSON not found');
      return;
    }

    const self = this;
    const selectedId = this.selectedDistricts[containerId] || 'KH65_49';
    const markerGroup = L.featureGroup();

    geoData.features.forEach((feat) => {
      const p = feat.properties;
      if (!p || !p.center) return;

      // Áp dụng bộ lọc
      if (self.activeFilter === 'phuong' && p.type !== 'Phường') return;
      if (self.activeFilter === 'xa' && p.type !== 'Xã') return;
      if (self.activeFilter === 'dackhu' && p.type !== 'Đặc khu') return;

      const isSelected = p.id === selectedId;
      const metricColor = self.getDistrictColor(p, layerType);

      // Giá trị hiển thị trên nhãn chú thích
      let metricBadgeText = '';
      if (layerType === 'investment') {
        metricBadgeText = `${p.dtc_rate}%`;
      } else if (layerType === 'enterprises') {
        metricBadgeText = `${p.enterprises} DN`;
      } else if (layerType === 'land_price') {
        metricBadgeText = `K=${p.land_k}`;
      } else {
        metricBadgeText = `${p.revenue.toLocaleString('vi-VN')} Tỷ`;
      }

      // Icon loại hình
      const typeClass = p.type === 'Phường' ? 'phuong' : p.type === 'Đặc khu' ? 'dackhu' : 'xa';
      const iconSymbol = p.type === 'Phường' ? '🏛️' : p.type === 'Đặc khu' ? '⚓' : '📍';

      // 1. Concentric Data Heat Circle
      const bubbleRadius = self.getBubbleRadius(p, layerType);
      const circleMarker = L.circleMarker(p.center, {
        radius: bubbleRadius,
        fillColor: metricColor,
        color: isSelected ? '#f59e0b' : '#ffffff',
        weight: isSelected ? 3.5 : 2,
        opacity: 1,
        fillOpacity: isSelected ? 0.88 : 0.65
      });

      // 2. Custom Point Marker & Annotation Pill Badge
      const isImportantLabel = p.type === 'Phường' || p.type === 'Đặc khu' || isSelected || [7, 12, 18, 34].includes(p.stt);
      const markerHtml = `
        <div class="gis-marker-container">
          ${isSelected ? '<div class="gis-active-halo"></div>' : ''}
          <div class="gis-point-node ${typeClass}" title="${p.name}">
            <span>${iconSymbol}</span>
          </div>
          ${isImportantLabel ? `
            <div class="gis-annotation-pill ${typeClass}">
              <span class="pill-name">${p.name}</span>
              <span class="pill-val">${metricBadgeText}</span>
            </div>
          ` : ''}
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'gis-custom-div-icon',
        html: markerHtml,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const pointMarker = L.marker(p.center, { icon: customIcon });

      // Tooltip thông tin chi tiết địa bàn
      const tooltipHtml = `
        <div style="font-family: 'Be Vietnam Pro', sans-serif; min-width: 240px; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-size: 13.5px; font-weight: 800; color: #002B8C;">${p.name}</span>
            <span style="font-size: 9.5px; font-weight: 700; padding: 2px 7px; border-radius: 4px; background: ${p.type === 'Phường' ? '#eff6ff' : p.type === 'Đặc khu' ? '#f0fdf4' : '#f8fafc'}; color: ${p.type === 'Phường' ? '#1d4ed8' : p.type === 'Đặc khu' ? '#0F52BA' : '#15803d'}; border: 1px solid currentColor;">${p.type}</span>
          </div>
          <div style="font-size: 10.5px; color: #64748b; margin-bottom: 6px; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">
            Đơn vị hành chính cấp cơ sở (trực thuộc tỉnh)
          </div>
          <div style="font-size: 11.5px; display: flex; flex-direction: column; gap: 3.5px;">
            <div><span style="color: #64748b;">Thu NSNN:</span> <strong style="color: #002B8C;">${p.revenue.toLocaleString('vi-VN')} Tỷ (${p.revenue_rate})</strong></div>
            <div><span style="color: #64748b;">Chi ngân sách:</span> <strong style="color: #475569;">${p.exp.toLocaleString('vi-VN')} Tỷ</strong></div>
            <div><span style="color: #64748b;">Giải ngân ĐTC:</span> <strong style="color: #15803d;">${p.dtc_rate}% (${p.dtc_amount})</strong></div>
            <div><span style="color: #64748b;">DN & Hộ kinh doanh:</span> <strong style="color: #7e22ce;">${p.enterprises.toLocaleString('vi-VN')} đơn vị</strong></div>
            <div><span style="color: #64748b;">Hệ số điều chỉnh K:</span> <strong style="color: #b45309;">K = ${p.land_k}</strong></div>
          </div>
          <div style="font-size: 10px; color: #0284c7; margin-top: 6px; font-weight: 700; border-top: 1px solid #f1f5f9; padding-top: 4px;">
            👉 Bấm để chọn và ghim dữ liệu địa bàn
          </div>
        </div>
      `;

      pointMarker.bindTooltip(tooltipHtml, {
        sticky: true,
        direction: 'auto',
        className: 'executive-map-tooltip'
      });

      circleMarker.bindTooltip(tooltipHtml, {
        sticky: true,
        direction: 'auto',
        className: 'executive-map-tooltip'
      });

      // Sự kiện nhấp chuột chọn đơn vị
      const onSelect = () => {
        self.selectedDistricts[containerId] = p.id;
        self.renderChoropleth(containerId, layerType);

        if (p.code === 'DK_TS') {
          map.flyTo([10.5, 114.8], 7.5);
        } else {
          map.flyTo(p.center, Math.max(map.getZoom(), 11), { animate: true, duration: 0.8 });
        }

        self.selectDistrict(p.id);
      };

      pointMarker.on('click', onSelect);
      circleMarker.on('click', onSelect);

      markerGroup.addLayer(circleMarker);
      markerGroup.addLayer(pointMarker);
    });

    markerGroup.addTo(map);
    this.markerLayers[containerId] = markerGroup;
  },

  // 3. Tính toán bán kính Bubble theo chỉ tiêu
  getBubbleRadius(p, layerType) {
    if (layerType === 'revenue') {
      const rev = p.revenue;
      if (rev >= 2000) return 22;
      if (rev >= 1000) return 18;
      if (rev >= 500) return 14;
      if (rev >= 250) return 11;
      return 8;
    } else if (layerType === 'investment') {
      const rate = p.dtc_rate;
      if (rate >= 80) return 18;
      if (rate >= 75) return 15;
      if (rate >= 70) return 12;
      return 9;
    } else if (layerType === 'enterprises') {
      const dn = p.enterprises;
      if (dn >= 2000) return 22;
      if (dn >= 1000) return 18;
      if (dn >= 400) return 14;
      return 9;
    } else if (layerType === 'land_price') {
      const k = p.land_k;
      if (k >= 1.40) return 20;
      if (k >= 1.25) return 15;
      return 10;
    }
    return 12;
  },

  // 4. Tính toán màu sắc tương ứng chỉ tiêu
  getDistrictColor(p, layerType) {
    if (layerType === 'revenue') {
      const rev = p.revenue;
      if (rev >= 2000) return '#002B8C';
      if (rev >= 1000) return '#0F52BA';
      if (rev >= 500) return '#0284c7';
      if (rev >= 250) return '#38bdf8';
      return '#7dd3fc';
    } else if (layerType === 'investment') {
      const rate = p.dtc_rate;
      if (rate >= 80) return '#15803d';
      if (rate >= 75) return '#16a34a';
      if (rate >= 70) return '#22c55e';
      if (rate >= 65) return '#4ade80';
      return '#86efac';
    } else if (layerType === 'enterprises') {
      const dn = p.enterprises;
      if (dn >= 2000) return '#581c87';
      if (dn >= 1000) return '#7e22ce';
      if (dn >= 400) return '#a855f7';
      if (dn >= 150) return '#c084fc';
      return '#e9d5ff';
    } else if (layerType === 'land_price') {
      const k = p.land_k;
      if (k >= 1.40) return '#b45309';
      if (k >= 1.30) return '#d97706';
      if (k >= 1.20) return '#f59e0b';
      if (k >= 1.10) return '#fbbf24';
      return '#fde68a';
    }
    return '#0F52BA';
  },

  // 5. Cập nhật thông tin chi tiết địa bàn lên sidebar và đồng bộ bộ lọc
  selectDistrict(districtId) {
    const geoData = window.khanhHoa65UnitsGeoJson || window.khanhHoaRealGeoJson;
    if (!geoData) return;
    const feat = geoData.features.find(f => f.properties.id === districtId);
    if (!feat) return;

    const d = feat.properties;
    const nameEl = document.getElementById('overlayDistrictName');
    const revEl = document.getElementById('overlayDistrictRevenue');
    const dtcEl = document.getElementById('overlayDistrictDTC');
    const projEl = document.getElementById('overlayDistrictProjects');

    if (nameEl) nameEl.innerText = `${d.name}`;
    if (revEl) revEl.innerText = `${d.revenue.toLocaleString('vi-VN')} Tỷ VNĐ (${d.revenue_rate})`;
    if (dtcEl) dtcEl.innerText = `${d.dtc_rate}% (${d.dtc_amount})`;
    if (projEl) projEl.innerText = `${d.enterprises.toLocaleString('vi-VN')} DN/Hộ KD (K = ${d.land_k})`;

    // ĐỒNG BỘ 2 CHIỀU: Đẩy thông tin sang AppState & kích hoạt bộ lọc bảng dữ liệu
    if (window.AppState) {
      AppState.set('region', districtId);
      AppState.set('activeDistrict', d);
    }
    if (window.DeptWorkspaceManager && typeof DeptWorkspaceManager.applyRegionFilter === 'function') {
      DeptWorkspaceManager.applyRegionFilter(districtId);
    }

    App.showNotification(`Đã liên kết dữ liệu bản đồ: ${d.name} (${d.type} trực thuộc tỉnh)`, 'info');
  },

  // 6. Lọc hiển thị theo loại đơn vị hành chính
  filterCategory(containerId, cat) {
    this.activeFilter = cat;
    document.querySelectorAll('.gis-filter-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`${containerId}_btnFilter_${cat}`);
    if (btn) btn.classList.add('active');
    this.renderChoropleth(containerId, this.currentLayers[containerId] || 'revenue');
    const label = cat === 'phuong' ? '16 Phường đô thị' : cat === 'xa' ? '48 Xã cơ sở' : 'Tất cả 65 đơn vị';
    App.showNotification(`Đang lọc hiển thị: ${label}`, 'info');
  },

  // 7. Đặt lại góc nhìn toàn tỉnh & Xóa bộ lọc địa bàn
  resetView(containerId) {
    this.activeFilter = 'all';
    document.querySelectorAll('.gis-filter-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`${containerId}_btnFilter_all`);
    if (btn) btn.classList.add('active');
    this.renderChoropleth(containerId, this.currentLayers[containerId] || 'revenue');
    const map = this.maps[containerId];
    if (map) {
      map.flyTo([11.95, 109.00], 8.5);
      if (window.DeptWorkspaceManager && typeof DeptWorkspaceManager.applyRegionFilter === 'function') {
        DeptWorkspaceManager.applyRegionFilter('all');
      }
      App.showNotification("Đã đặt lại góc nhìn toàn bộ 65 đơn vị cấp xã tỉnh Khánh Hòa", "info");
    }
  },

  // 8. Điều hướng nhanh đến Đặc khu Trường Sa
  flyToTruongSa(containerId) {
    document.querySelectorAll('.gis-filter-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`${containerId}_btnFilter_dackhu`);
    if (btn) btn.classList.add('active');
    const map = this.maps[containerId];
    if (map) {
      map.flyTo([10.50, 114.80], 7.5);
      this.selectedDistricts[containerId] = 'KH65_65';
      this.renderChoropleth(containerId, this.currentLayers[containerId] || 'revenue');
      this.selectDistrict('KH65_65');
      App.showNotification("Đã chuyển đến Đặc khu Trường Sa", "info");
    }
  },

  // 9. TƯƠNG TÁC 2 CHIỀU BẢNG ➔ BẢN ĐỒ (Highlight & Zoom dự án)
  highlightProject(projectId) {
    const project = (APP_DATA && APP_DATA.investmentProjects) ? APP_DATA.investmentProjects.find(p => p.id === projectId) : null;
    if (!project) return;

    const activeMapId = Object.keys(this.maps)[0];
    const map = activeMapId ? this.maps[activeMapId] : null;
    if (!map) return;

    const projCoords = {
      'DA_DTC_01': [12.245, 109.185], // Nút giao Ngọc Hội - Nha Trang
      'DA_DTC_02': [12.235, 109.165], // Đường Vành đai 2 Nha Trang
      'DA_DTC_03': [12.250, 109.190], // Bệnh viện Ung bướu
      'DA_DTC_04': [11.890, 109.140], // Đường liên vùng Cam Ranh
      'DA_DTC_05': [12.690, 109.220], // Tuyến ven biển Vạn Ninh (Vân Phong)
      'DA_DTC_06': [11.330, 108.880], // Tuyến giao thông kết nối Cà Ná
      'DA_DTC_07': [10.500, 114.800]  // Cảng cá Đặc khu Trường Sa
    };

    const center = projCoords[projectId] || [12.245, 109.185];

    this.resetHighlight();

    const highlightIcon = L.divIcon({
      className: 'gis-project-highlight-marker',
      html: `
        <div class="gis-project-pin-animated">
          <div class="pin-icon"><i data-lucide="hard-hat"></i></div>
          <div class="pin-sonar-ring"></div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    this.currentProjectHighlight = L.marker(center, { icon: highlightIcon, zIndexOffset: 1000 }).addTo(map);
    if (window.lucide) window.lucide.createIcons();

    const popupHtml = `
      <div style="font-family: 'Be Vietnam Pro', sans-serif; min-width: 220px; padding: 2px;">
        <div style="font-size: 10px; font-weight: 700; color: #002B8C; text-transform: uppercase;">${project.code || projectId}</div>
        <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin: 2px 0 4px 0;">${project.name}</div>
        <div style="font-size: 11.5px; color: #64748b;">Chủ đầu tư: <strong>${project.owner}</strong></div>
        <div style="font-size: 11.5px; color: #15803d; margin-top: 4px;">
          Tổng mức vốn: <strong>${project.totalInvestment} Tỷ</strong> • Giải ngân: <strong>${project.disbursedRate}%</strong>
        </div>
      </div>
    `;
    this.currentProjectHighlight.bindPopup(popupHtml).openPopup();
  },

  resetHighlight() {
    const activeMapId = Object.keys(this.maps)[0];
    const map = activeMapId ? this.maps[activeMapId] : null;
    if (map && this.currentProjectHighlight) {
      try {
        map.removeLayer(this.currentProjectHighlight);
      } catch (e) {}
      this.currentProjectHighlight = null;
    }
  },

  focusProject(projectId) {
    this.highlightProject(projectId);
    const activeMapId = Object.keys(this.maps)[0];
    const map = activeMapId ? this.maps[activeMapId] : null;
    if (map && this.currentProjectHighlight) {
      map.flyTo(this.currentProjectHighlight.getLatLng(), 13, { animate: true, duration: 0.8 });
    }
  },

  // 10. Kích hoạt hiệu ứng Radar Pulse thời gian thực
  triggerRealtimeMarker(containerId, districtCode, eventData) {
    const map = this.maps[containerId];
    const geoData = window.khanhHoa65UnitsGeoJson || window.khanhHoaRealGeoJson;
    if (!map || !geoData) return;

    const feat = geoData.features.find(f => f.properties.code === districtCode);
    if (!feat || !feat.properties.center) return;

    const center = feat.properties.center;
    const radarIcon = L.divIcon({
      className: 'gis-radar-marker',
      html: `
        <div class="radar-pulse-core"></div>
        <div class="radar-ripple-wave"></div>
        <div class="radar-ripple-wave delay-1"></div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    const marker = L.marker(center, { icon: radarIcon }).addTo(map);

    setTimeout(() => {
      map.removeLayer(marker);
    }, 3500);
  }
};

var GisMapManager = window.GisMapManager;
