/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * ĐỘNG CƠ BẢN ĐỒ GIS THỰC TẾ (REAL-WORLD GIS LEAFLET ENGINE)
 * Quản lý 65 Đơn vị hành chính cấp Xã/Phường/Đặc khu theo chuẩn Sở Nội vụ tỉnh Khánh Hòa
 * (Chính quyền địa phương 2 cấp: Tỉnh và Xã/Phường/Đặc khu - Không còn cấp Thành phố/Thị xã/Huyện)
 */

window.GisMapManager = {
  maps: {},
  geoLayers: {},
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
    this.selectedDistricts[containerId] = 'KH65_49'; // Default: Phường Nha Trang

    // Tạo cấu trúc khung bản đồ Leaflet
    container.innerHTML = `
      <div id="${containerId}_leaflet" style="width: 100%; height: 100%; min-height: 390px; position: relative; border-radius: var(--radius-md); overflow: hidden; background: #e2e8f0;"></div>
      
      <!-- Top Left Layer Badge -->
      <div id="${containerId}_badge" style="position: absolute; top: 12px; left: 12px; z-index: 1000; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(8px); padding: 8px 14px; border-radius: 8px; border: 1px solid #bfdbfe; box-shadow: 0 4px 12px rgba(0, 43, 140, 0.12); pointer-events: none;">
        <div style="font-size: 10px; color: #64748b; font-weight: 700; text-transform: uppercase;">Bản đồ GIS 65 Đơn Vị Cấp Xã/Phường:</div>
        <div id="${containerId}_layerTitle" style="font-size: 12.5px; font-weight: 800; color: #002B8C;">Thu ngân sách nhà nước theo xã, phường, đặc khu</div>
        <div id="${containerId}_layerLead" style="font-size: 11px; color: #15803d; font-weight: 700; margin-top: 2px;">Điểm dẫn đầu: 3.850 Tỷ (Phường Nha Trang) & 1.650 Tỷ (Phường Phan Rang)</div>
      </div>

      <!-- Floating Controls & Category Filter -->
      <div style="position: absolute; bottom: 14px; left: 14px; z-index: 1000; display: flex; gap: 5px; flex-wrap: wrap; background: rgba(255,255,255,0.95); backdrop-filter: blur(6px); padding: 5px 8px; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 4px 12px rgba(0,0,0,0.12);">
        <button class="btn btn-sm btn-soft-primary" onclick="GisMapManager.resetView('${containerId}')" style="font-size: 11px; font-weight: 700; padding: 4px 8px;">
          <i data-lucide="compass" style="width: 13px; height: 13px;"></i> Toàn tỉnh (65 Đơn vị)
        </button>
        <button class="btn btn-sm btn-soft-primary" onclick="GisMapManager.filterCategory('${containerId}', 'phuong')" style="font-size: 11px; font-weight: 700; padding: 4px 8px;">
          <i data-lucide="building" style="width: 13px; height: 13px;"></i> 16 Phường đô thị
        </button>
        <button class="btn btn-sm btn-soft-primary" onclick="GisMapManager.filterCategory('${containerId}', 'xa')" style="font-size: 11px; font-weight: 700; padding: 4px 8px;">
          <i data-lucide="trees" style="width: 13px; height: 13px;"></i> 48 Xã cơ sở
        </button>
        <button class="btn btn-sm btn-soft-primary" onclick="GisMapManager.flyToTruongSa('${containerId}')" style="font-size: 11px; font-weight: 700; padding: 4px 8px; color: #002B8C;">
          <i data-lucide="anchor" style="width: 13px; height: 13px;"></i> Đặc khu Trường Sa
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

    // Tọa độ trung tâm tỉnh Khánh Hòa mới (bao trùm toàn bộ 65 xã/phường từ Bắc đến Nam)
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

    // Render ranh giới thực tế từ GeoJSON
    this.renderChoropleth(containerId, layerType);

    // Resize invalidate
    setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return true;
  },

  // 2. Render các lớp chuyên đề địa lý thực tế (Choropleth GeoJSON) cho 65 xã/phường/đặc khu
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

    // Xóa layer cũ nếu có
    if (this.geoLayers[containerId]) {
      map.removeLayer(this.geoLayers[containerId]);
    }

    const geoData = window.khanhHoa65UnitsGeoJson || window.khanhHoaRealGeoJson;
    if (!geoData || !geoData.features) {
      console.warn('GeoJSON not found');
      return;
    }

    const self = this;
    const selectedId = this.selectedDistricts[containerId] || 'KH65_49';

    const geoLayer = L.geoJSON(geoData, {
      filter: (feature) => {
        if (self.activeFilter === 'all') return true;
        if (self.activeFilter === 'phuong') return feature.properties.type === 'Phường';
        if (self.activeFilter === 'xa') return feature.properties.type === 'Xã';
        if (self.activeFilter === 'dackhu') return feature.properties.type === 'Đặc khu';
        return true;
      },
      style: (feature) => {
        const props = feature.properties;
        const isSelected = props.id === selectedId;
        const color = self.getDistrictColor(props, layerType);

        return {
          fillColor: color,
          weight: isSelected ? 3.5 : (props.type === 'Phường' ? 2.0 : 1.2),
          opacity: 1,
          color: isSelected ? '#002B8C' : '#ffffff',
          dashArray: isSelected ? '' : (props.type === 'Phường' ? '' : '2'),
          fillOpacity: isSelected ? 0.90 : 0.68
        };
      },
      onEachFeature: (feature, layer) => {
        const p = feature.properties;

        // Tooltip hiển thị chỉ tiêu kinh tế chi tiết
        const tooltipHtml = `
          <div style="font-family: 'Be Vietnam Pro', sans-serif; min-width: 220px; padding: 4px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-size: 13px; font-weight: 800; color: #002B8C;">${p.name}</span>
              <span style="font-size: 9.5px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: ${p.type === 'Phường' ? '#eff6ff' : '#f0fdf4'}; color: ${p.type === 'Phường' ? '#1d4ed8' : '#15803d'}; border: 1px solid currentColor;">STT ${p.stt}: ${p.type}</span>
            </div>
            <div style="font-size: 10.5px; color: #64748b; margin-bottom: 6px;">Đơn vị hành chính cấp cơ sở trực thuộc tỉnh Khánh Hòa</div>
            <div style="font-size: 11.5px; border-top: 1px solid #f1f5f9; padding-top: 5px; display: flex; flex-direction: column; gap: 3px;">
              <div><span style="color: #64748b;">Thu NSNN:</span> <strong style="color: #002B8C;">${p.revenue.toLocaleString('vi-VN')} Tỷ (${p.revenue_rate})</strong></div>
              <div><span style="color: #64748b;">Chi ngân sách:</span> <strong style="color: #475569;">${p.exp.toLocaleString('vi-VN')} Tỷ</strong></div>
              <div><span style="color: #64748b;">Giải ngân ĐTC:</span> <strong style="color: #15803d;">${p.dtc_rate}% (${p.dtc_amount})</strong></div>
              <div><span style="color: #64748b;">DN & Hộ kinh doanh:</span> <strong style="color: #7e22ce;">${p.enterprises.toLocaleString('vi-VN')} đơn vị</strong></div>
              <div><span style="color: #64748b;">Hệ số điều chỉnh K:</span> <strong style="color: #b45309;">K = ${p.land_k}</strong></div>
            </div>
            <div style="font-size: 10px; color: #0284c7; margin-top: 6px; font-weight: 700;">👉 Nhấp chuột để ghim số liệu chi tiết</div>
          </div>
        `;

        layer.bindTooltip(tooltipHtml, {
          sticky: true,
          direction: 'auto',
          className: 'executive-map-tooltip'
        });

        // Nhãn Marker cho các Phường trọng điểm & Đặc khu
        if (p.center && (p.type === 'Phường' || p.code === 'DK_TS' || ['X_CNA', 'X_DL', 'X_CL', 'X_DK'].includes(p.code))) {
          const pillIcon = L.divIcon({
            className: 'district-pill-icon',
            html: `<div style="background: rgba(255,255,255,0.92); border: 1px solid ${p.type === 'Phường' ? '#002B8C' : '#15803d'}; padding: 1px 6px; border-radius: 10px; font-size: 9.5px; font-weight: 800; color: ${p.type === 'Phường' ? '#002B8C' : '#15803d'}; white-space: nowrap; box-shadow: 0 2px 5px rgba(0,0,0,0.12); pointer-events: none;">${p.name}</div>`,
            iconSize: [80, 18],
            iconAnchor: [40, 9]
          });
          L.marker(p.center, { icon: pillIcon, interactive: false }).addTo(map);
        }

        // Sự kiện chuột
        layer.on({
          mouseover: (e) => {
            const l = e.target;
            l.setStyle({
              weight: 3.5,
              color: '#002B8C',
              fillOpacity: 0.95
            });
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              l.bringToFront();
            }
          },
          mouseout: (e) => {
            geoLayer.resetStyle(e.target);
          },
          click: (e) => {
            self.selectedDistricts[containerId] = p.id;
            geoLayer.eachLayer(l => geoLayer.resetStyle(l));
            e.target.setStyle({
              weight: 4,
              color: '#002B8C',
              fillOpacity: 0.98
            });

            // Zoom mượt vào ranh giới đơn vị
            if (p.code === 'DK_TS') {
              map.flyTo([10.5, 114.8], 7.5);
            } else {
              map.flyToBounds(e.target.getBounds(), { padding: [35, 35], maxZoom: 13 });
            }

            self.selectDistrict(p.id);
          }
        });
      }
    }).addTo(map);

    this.geoLayers[containerId] = geoLayer;
  },

  // 3. Tính toán màu sắc tương ứng chỉ tiêu
  getDistrictColor(p, layerType) {
    if (layerType === 'revenue') {
      const rev = p.revenue;
      if (rev >= 2000) return '#002B8C';
      if (rev >= 1000) return '#0F52BA';
      if (rev >= 500) return '#0284c7';
      if (rev >= 250) return '#38bdf8';
      return '#bae6fd';
    } else if (layerType === 'investment') {
      const rate = p.dtc_rate;
      if (rate >= 80) return '#15803d';
      if (rate >= 75) return '#16a34a';
      if (rate >= 70) return '#22c55e';
      if (rate >= 65) return '#4ade80';
      return '#bbf7d0';
    } else if (layerType === 'enterprises') {
      const dn = p.enterprises;
      if (dn >= 2000) return '#581c87';
      if (dn >= 1000) return '#7e22ce';
      if (dn >= 400) return '#a855f7';
      if (dn >= 150) return '#c084fc';
      return '#f3e8ff';
    } else if (layerType === 'land_price') {
      const k = p.land_k;
      if (k >= 1.40) return '#b45309';
      if (k >= 1.30) return '#d97706';
      if (k >= 1.20) return '#f59e0b';
      if (k >= 1.10) return '#fbbf24';
      return '#fef3c7';
    }
    return '#0F52BA';
  },

  // 4. Cập nhật thông tin chi tiết địa bàn lên sidebar
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

    if (nameEl) nameEl.innerText = `[STT ${d.stt}] ${d.name}`;
    if (revEl) revEl.innerText = `${d.revenue.toLocaleString('vi-VN')} Tỷ VNĐ (${d.revenue_rate})`;
    if (dtcEl) dtcEl.innerText = `${d.dtc_rate}% (${d.dtc_amount})`;
    if (projEl) projEl.innerText = `${d.enterprises.toLocaleString('vi-VN')} DN/Hộ KD (K = ${d.land_k})`;

    App.showNotification(`Đã chọn: [STT ${d.stt}] ${d.name} (${d.type} trực thuộc tỉnh)`, 'info');
  },

  // 5. Lọc hiển thị theo loại đơn vị hành chính
  filterCategory(containerId, cat) {
    this.activeFilter = cat;
    this.renderChoropleth(containerId, this.currentLayers[containerId] || 'revenue');
    const label = cat === 'phuong' ? '16 Phường đô thị' : cat === 'xa' ? '48 Xã cơ sở' : 'Tất cả 65 đơn vị';
    App.showNotification(`Đang lọc hiển thị: ${label}`, 'info');
  },

  // 6. Đặt lại góc nhìn toàn tỉnh
  resetView(containerId) {
    this.activeFilter = 'all';
    this.renderChoropleth(containerId, this.currentLayers[containerId] || 'revenue');
    const map = this.maps[containerId];
    if (map) {
      map.flyTo([11.95, 109.00], 8.5);
      App.showNotification("Đã đặt lại góc nhìn toàn bộ 65 đơn vị cấp xã tỉnh Khánh Hòa", "info");
    }
  },

  // 7. Điều hướng nhanh đến Đặc khu Trường Sa
  flyToTruongSa(containerId) {
    const map = this.maps[containerId];
    if (map) {
      map.flyTo([10.50, 114.80], 7.5);
      this.selectDistrict('KH65_65');
      App.showNotification("Đã chuyển đến [STT 65] Đặc khu Trường Sa", "info");
    }
  },

  // 8. Kích hoạt hiệu ứng Radar Pulse thời gian thực
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
