/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * CORE APPLICATION CONTROLLER & ROUTER
 */

const App = {
  currentUser: {
    name: "Châu Ngô Anh Nhân",
    deptId: "lanhdao",
    title: "Giám đốc Sở Tài chính",
    dept: "Lãnh đạo Sở",
    role: "LEAD"
  },

  init() {
    DeptWorkspaceManager.init();
    this.initResponsiveSidebar();
    this.initIconObserver();
    this.refreshIcons();
  },

  refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try {
        window.lucide.createIcons();
      } catch (err) {
        console.warn('Lucide icon rendering warning:', err);
      }
    }
  },

  initIconObserver() {
    // Tự động quét và vẽ icon cho mọi phần tử DOM được thêm mới động
    let timeout = null;
    const observer = new MutationObserver((mutations) => {
      let hasNewIcons = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          for (const node of m.addedNodes) {
            if (node.nodeType === 1) { // ELEMENT_NODE
              if (node.hasAttribute('data-lucide') || node.querySelector('[data-lucide]')) {
                hasNewIcons = true;
                break;
              }
            }
          }
        }
        if (hasNewIcons) break;
      }
      if (hasNewIcons) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.refreshIcons();
        }, 30);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  },

  initResponsiveSidebar() {
    const toggleBtn = document.getElementById('btnToggleMobileSidebar');
    const sidebar = document.querySelector('.app-sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');

    const openSidebar = () => {
      if (sidebar) sidebar.classList.add('mobile-open');
      if (backdrop) backdrop.classList.add('active');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      this.refreshIcons();
    };

    const closeSidebar = () => {
      if (sidebar) sidebar.classList.remove('mobile-open');
      if (backdrop) backdrop.classList.remove('active');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      this.refreshIcons();
    };

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (sidebar && sidebar.classList.contains('mobile-open')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeSidebar);
    }

    // Auto close sidebar when clicking a nav link on mobile/tablet
    const navContainer = document.getElementById('dynamicSidebarNav');
    if (navContainer) {
      navContainer.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          const navItem = e.target.closest('.nav-item, button, a');
          if (navItem) {
            closeSidebar();
          }
        }
      });
    }

    // Reset on window resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) {
        closeSidebar();
      }
    });
  },

  showNotification(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.style.position = 'fixed';
      container.style.bottom = '24px';
      container.style.right = '24px';
      container.style.zIndex = '9999';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '10px';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `card`;
    toast.style.padding = '12px 18px';
    toast.style.minWidth = '280px';
    toast.style.border = type === 'success' ? '1px solid #bbf7d0' : type === 'warning' ? '1px solid #fef08a' : '1px solid #bfdbfe';
    toast.style.background = '#ffffff';
    toast.style.boxShadow = '0 10px 25px -5px rgba(15, 23, 42, 0.15)';
    toast.style.fontSize = '12.5px';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '10px';
    toast.style.animation = 'fadeIn 0.3s ease-out';

    const icon = type === 'success' ? 'check-circle' : type === 'warning' ? 'alert-triangle' : 'info';
    const color = type === 'success' ? '#15803d' : type === 'warning' ? '#b45309' : '#002B8C';

    toast.innerHTML = `
      <i data-lucide="${icon}" style="color: ${color}; width: 18px; height: 18px; flex-shrink: 0;"></i>
      <span style="color: #0f172a; font-weight: 500;">${message}</span>
    `;

    container.appendChild(toast);
    this.refreshIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      this.refreshIcons();
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
    this.refreshIcons();
  }
};

// Global Keyboard Shortcut: ESC to exit Fullscreen Table or close Modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const fullscreenTable = document.querySelector('.table-fullscreen-wrapper.is-fullscreen');
    if (fullscreenTable) {
      fullscreenTable.classList.remove('is-fullscreen');
      document.body.style.overflow = '';
      const btn = fullscreenTable.querySelector('.btn-fullscreen-toggle');
      if (btn) {
        btn.innerHTML = `<i data-lucide="maximize-2"></i> <span>Toàn màn hình</span>`;
        App.refreshIcons();
      }
      App.showNotification('Đã thoát chế độ toàn màn hình', 'info');
    } else {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) activeModal.classList.remove('active');
    }
  }
});

// Bootstrap application on page load
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
