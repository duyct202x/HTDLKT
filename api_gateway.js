/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * PHÂN HỆ TÍCH HỢP & GIÁM SÁT API BỘ TÀI CHÍNH (CV 4760 / ĐẶC TẢ IOC V1.0)
 */

const ApiGatewayManager = {
  renderApiCards() {
    const container = document.getElementById('apiServiceCardsGrid');
    if (!container) return;

    container.innerHTML = APP_DATA.btcApis.map(api => `
      <div class="api-card">
        <div class="api-card-header">
          <span class="api-badge-method">${api.method}</span>
          <span class="badge ${api.status === 'HEALTHY' ? 'badge-success' : 'badge-danger'}">
            <i class="status-dot"></i> ${api.status}
          </span>
        </div>
        <div>
          <h4 class="api-card-title">[${api.code}] ${api.name}</h4>
          <span style="font-size: 11px; color: #38bdf8;">${api.category}</span>
        </div>
        <div class="api-card-endpoint">${api.endpoint}</div>
        <p style="font-size: 11.5px; color: #94a3b8; line-height: 1.4;">${api.description}</p>
        
        <div class="api-meta-row">
          <span><i class="lucide-activity"></i> Độ trễ: <strong style="color:#fff;">${api.latency}</strong></span>
          <span><i class="lucide-database"></i> Đã nạp: <strong style="color:#34d399;">${api.recordsSynced.toLocaleString()}</strong> bản ghi</span>
        </div>
        <div class="api-meta-row" style="font-size: 10.5px;">
          <span>Lần đồng bộ: ${api.lastSync}</span>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 6px;">
          <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="ApiGatewayManager.viewPayload('${api.code}')">
            <i class="lucide-code"></i> Xem payload
          </button>
          <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="ApiGatewayManager.triggerSync('${api.code}')">
            <i class="lucide-refresh-cw"></i> Đồng bộ ngay
          </button>
        </div>
      </div>
    `).join('');
  },

  triggerSync(apiCode) {
    const api = APP_DATA.btcApis.find(a => a.code === apiCode);
    if (!api) return;

    const btn = event.currentTarget;
    btn.innerHTML = `<i class="lucide-loader animate-spin"></i> Đang nạp...`;
    btn.disabled = true;

    setTimeout(() => {
      api.lastSync = new Date().toISOString().replace('T', ' ').substring(0, 19);
      api.recordsSynced += Math.floor(Math.random() * 25) + 5;
      api.status = 'HEALTHY';
      
      btn.innerHTML = `<i class="lucide-check"></i> Thành công`;
      setTimeout(() => {
        ApiGatewayManager.renderApiCards();
        App.showNotification(`Đồng bộ thành công dữ liệu API [${api.code}] từ Bộ Tài chính về CSDL Khánh Hòa!`, 'success');
      }, 600);
    }, 900);
  },

  syncAll() {
    const btn = document.getElementById('btnSyncAllApis');
    if (btn) btn.innerHTML = `<i class="lucide-loader animate-spin"></i> Đang đồng bộ toàn bộ 09 API...`;
    
    setTimeout(() => {
      APP_DATA.btcApis.forEach(api => {
        api.lastSync = new Date().toISOString().replace('T', ' ').substring(0, 19);
        api.recordsSynced += Math.floor(Math.random() * 50) + 10;
      });
      if (btn) btn.innerHTML = `<i class="lucide-check-circle"></i> Hoàn thành đồng bộ`;
      ApiGatewayManager.renderApiCards();
      App.showNotification("Đã hoàn tất đồng bộ toàn diện 09 API chuyên ngành từ CSDL Quốc gia về Tài chính!", "success");
      setTimeout(() => {
        if (btn) btn.innerHTML = `<i class="lucide-refresh-cw"></i> Đồng bộ tất cả API`;
      }, 2000);
    }, 1500);
  },

  viewPayload(apiCode) {
    const api = APP_DATA.btcApis.find(a => a.code === apiCode);
    if (!api) return;

    let samplePayload = {};
    if (apiCode === '00210101') {
      samplePayload = {
        "header": { "version": "1.0", "sender": "BTC_IOC_CORE", "receiver": "KHANHHOA_DATA_HUB" },
        "service_code": "00210101",
        "timestamp": "2026-08-20T04:30:15Z",
        "data": [
          { "DT": "2026-08-19", "MA_DB": "79", "TEN_DB": "Tỉnh Khánh Hòa", "MA_CNS": "1", "TEN_CNS": "Ngân sách cấp tỉnh", "ICODE": "1001", "INAME": "Thu từ DNNN địa phương", "VAL": 4380500000000 },
          { "DT": "2026-08-19", "MA_DB": "7901", "TEN_DB": "Phường Lộc Thọ (Nha Trang)", "MA_CNS": "2", "TEN_CNS": "Ngân sách cấp xã", "ICODE": "1002", "INAME": "Thu khối ngoài quốc doanh", "VAL": 2150200000000 }
        ]
      };
    } else if (apiCode === '0040201') {
      samplePayload = {
        "service_code": "0040201",
        "reporting_week": "Tuần 33/2026",
        "projects": [
          { "MA_DU_AN": "DA-79-001", "TEN_DU_AN": "Đường Vành đai 2 TP. Nha Trang", "KE_HOACH_VON_2026": 450000000000, "GIAI_NGAN_LUY_KE": 345000000000, "TY_LE_PCT": 76.67 },
          { "MA_DU_AN": "DA-79-008", "TEN_DU_AN": "Hạ tầng Kỹ thuật Khu Tái định cư Cam Lâm", "KE_HOACH_VON_2026": 280000000000, "GIAI_NGAN_LUY_KE": 196000000000, "TY_LE_PCT": 70.00 }
        ]
      };
    } else {
      samplePayload = {
        "service_code": api.code,
        "endpoint": api.endpoint,
        "status": "200 OK",
        "source": "CSDL Quốc gia về Tài chính (Bộ Tài chính)",
        "security": "mTLS / OAuth 2.0 / AES-256 GCM",
        "payload_snippet": {
          "total_records": api.recordsSynced,
          "sync_mode": "Incremental (Delta Sync)",
          "checksum_sha256": "8f4b23c91e0a8d42398ab76dfa514..."
        }
      };
    }

    const modalBody = document.getElementById('modalGenericBody');
    const modalTitle = document.getElementById('modalGenericTitle');
    
    modalTitle.innerHTML = `<i class="lucide-code" style="color: #0284c7;"></i> Cấu trúc Gói tin API [${api.code}] - ${api.name}`;
    modalBody.innerHTML = `
      <div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 16px; font-family: 'Courier New', Courier, monospace; font-size: 12px; color: #38bdf8; max-height: 400px; overflow-y: auto;">
        <pre>${JSON.stringify(samplePayload, null, 2)}</pre>
      </div>
    `;

    App.openModal('modalGeneric');
  }
};
