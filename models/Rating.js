// models/Rating.js
const pool = require('../database');

class Rating {
  static async getAllRatings() {
    return await pool.query('SELECT * FROM ratings');
  }

  static async getRatingsByMovieId(movieId) {
    return await pool.query('SELECT * FROM ratings WHERE movie_id = ?', [movieId]);
  }

  static async getRatingsByUserId(userId) {
    return await pool.query('SELECT * FROM ratings WHERE user_id = ?', [userId]);
  }

  static async createRating(ratingData) {
    return await pool.query('INSERT INTO ratings SET ?', ratingData);
  }

  static async updateRating(ratingId, ratingData) {
    return await pool.query('UPDATE ratings SET ? WHERE id = ?', [ratingData, ratingId]);
  }

  static async deleteRating(ratingId) {
    return await pool.query('DELETE FROM ratings WHERE id = ?', [ratingId]);
  }
}

module.exports = Rating;