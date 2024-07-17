// models/Genre.js
const pool = require('../database');

class Genre {
  static async getAllGenres() {
    return await pool.query('SELECT * FROM genres');
  }

  static async getGenreById(genreId) {
    return await pool.query('SELECT * FROM genres WHERE id = ?', [genreId]);
  }

  // 通常不需要创建、更新或删除电影类型，因为它们通常是静态的
}

module.exports = Genre;