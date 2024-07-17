// models/Settings.js
const pool = require('../database');

class Settings {
  static async getSettings() {
    return await pool.query('SELECT * FROM settings');
  }

  static async updateSettings(settingsData) {
    return await pool.query('UPDATE settings SET ? WHERE id = ?', [settingsData, 1]); // 假设只有一个设置记录
  }
}

module.exports = Settings;