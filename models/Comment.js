// models/Comment.js
const pool = require('../database');

class Comment {
  static async getAllComments() {
    return await pool.query('SELECT * FROM comments');
  }

  static async getCommentsByReviewId(reviewId) {
    return await pool.query('SELECT * FROM comments WHERE review_id = ?', [reviewId]);
  }

  static async createComment(commentData) {
    return await pool.query('INSERT INTO comments SET ?', commentData);
  }

  static async updateComment(commentId, commentData) {
    return await pool.query('UPDATE comments SET ? WHERE id = ?', [commentData, commentId]);
  }

  static async deleteComment(commentId) {
    return await pool.query('DELETE FROM comments WHERE id = ?', [commentId]);
  }
}

module.exports = Comment;