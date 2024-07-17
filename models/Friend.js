// models/Friend.js
const pool = require('../database');

class Friend {
  static async getFriendsByUserId(userId) {
    return await pool.query('SELECT * FROM friends WHERE user_id = ?', [userId]);
  }

  static async createFriend(friendData) {
    return await pool.query('INSERT INTO friends SET ?', friendData);
  }

  static async deleteFriend(userId, friendId) {
    return await pool.query('DELETE FROM friends WHERE user_id = ? AND friend_id = ?', [userId, friendId]);
  }
}

module.exports = Friend;