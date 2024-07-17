// models/User.js
const pool = require('../database');

class User {
  static async getAllUsers() {
    return await pool.query('SELECT * FROM users');
  }

  static async getUserById(userId) {
    return await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
  }

  static async createUser(userData) {
    return await pool.query('INSERT INTO users SET ?', userData);
  }

  static async updateUser(userId, userData) {
    return await pool.query('UPDATE users SET ? WHERE id = ?', [userData, userId]);
  }

  static async deleteUser(userId) {
    return await pool.query('DELETE FROM users WHERE id = ?', [userId]);
  }
}

module.exports = User;