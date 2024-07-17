// models/Notification.js
const pool = require('../database');

class Notification {
  static async getAllNotifications() {
    return await pool.query('SELECT * FROM notifications');
  }

  static async getNotificationsByUserId(userId) {
    return await pool.query('SELECT * FROM notifications WHERE user_id = ?', [userId]);
  }

  static async createNotification(notificationData) {
    return await pool.query('INSERT INTO notifications SET ?', notificationData);
  }

  static async updateNotification(notificationId, notificationData) {
    return await pool.query('UPDATE notifications SET ? WHERE id = ?', [notificationData, notificationId]);
  }

  static async deleteNotification(notificationId) {
    return await pool.query('DELETE FROM notifications WHERE id = ?', [notificationId]);
  }
}

module.exports = Notification;