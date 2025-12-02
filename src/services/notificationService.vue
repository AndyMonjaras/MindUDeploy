class NotificationService {
  constructor() {
    this.notifications = new Map();
  }

  show(title, message, type = 'info', duration = 10000) {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const notification = {
      id,
      title,
      message,
      type,
      duration,
      timestamp: Date.now()
    };

    this.notifications.set(id, notification);
    
    const event = new CustomEvent('mindu-notification-add', {
      detail: notification
    });
    window.dispatchEvent(event);

    return id;
  }

  close(id) {
    if (this.notifications.has(id)) {
      this.notifications.delete(id);
      
      const event = new CustomEvent('mindu-notification-remove', {
        detail: { id }
      });
      window.dispatchEvent(event);
    }
  }

  closeAll() {
    this.notifications.clear();
    const event = new CustomEvent('mindu-notification-clear');
    window.dispatchEvent(event);
  }

  success(title, message, duration = 5000) {
    return this.show(title, message, 'success', duration);
  }

  error(title, message, duration = 7000) {
    return this.show(title, message, 'error', duration);
  }

  warning(title, message, duration = 6000) {
    return this.show(title, message, 'warning', duration);
  }

  info(title, message, duration = 5000) {
    return this.show(title, message, 'info', duration);
  }
}

export default new NotificationService();