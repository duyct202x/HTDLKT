/**
 * HỆ THỐNG DỮ LIỆU KINH TẾ TỈNH KHÁNH HÒA
 * CORE APPLICATION CONTROLLER & ROUTER
 */

const App = {
  currentUser: {
    name: "Nguyễn Đình Hùng",
    deptId: "lanhdao",
    title: "Giám đốc Sở Tài chính",
    dept: "Ban Giám đốc Sở",
    role: "LEAD"
  },

  init() {
    DeptWorkspaceManager.init();
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
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
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
    if (window.lucide) window.lucide.createIcons();

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
      if (window.lucide) window.lucide.createIcons();
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }
};

// Bootstrap application on page load
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
