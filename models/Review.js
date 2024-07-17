// models/Review.js
const pool = require('../database');

class Review {
  static async getAllReviews() {
    return await pool.query('SELECT * FROM reviews');
  }

  static async getReviewsByMovieId(movieId) {
    return await pool.query('SELECT * FROM reviews WHERE movie_id = ?', [movieId]);
  }

  static async getReviewsByUserId(userId) {
    return await pool.query('SELECT * FROM reviews WHERE user_id = ?', [userId]);
  }

  static async createReview(reviewData) {
    return await pool.query('INSERT INTO reviews SET ?', reviewData);
  }

  static async updateReview(reviewId, reviewData) {
    return await pool.query('UPDATE reviews SET ? WHERE id = ?', [reviewData, reviewId]);
  }

  static async deleteReview(reviewId) {
    return await pool.query('DELETE FROM reviews WHERE id = ?', [reviewId]);
  }
}

module.exports = Review;