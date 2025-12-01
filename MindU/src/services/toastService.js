class ToastService {
  show(title, message, type = 'info', duration = 5000) {
    const event = new CustomEvent('mindu-toast', {
      detail: { title, message, type, duration }
    });
    window.dispatchEvent(event);
  }

  success(title, message, duration = 4000) {
    this.show(title, message, 'success', duration);
  }

  error(title, message, duration = 6000) {
    this.show(title, message, 'error', duration);
  }

  warning(title, message, duration = 5000) {
    this.show(title, message, 'warning', duration);
  }

  info(title, message, duration = 4000) {
    this.show(title, message, 'info', duration);
  }
}

export default new ToastService();