const pool = require('../db');

// models/Movie.js
const pool = require('../database');

class Movie {
  static async getAllMovies() {
    return await pool.query('SELECT * FROM movies');
  }

  static async getMovieById(movieId) {
    return await pool.query('SELECT * FROM movies WHERE id = ?', [movieId]);
  }

  static async createMovie(movieData) {
    return await pool.query('INSERT INTO movies SET ?', movieData);
  }

  static async updateMovie(movieId, movieData) {
    return await pool.query('UPDATE movies SET ? WHERE id = ?', [movieData, movieId]);
  }

  static async deleteMovie(movieId) {
    return await pool.query('DELETE FROM movies WHERE id = ?', [movieId]);
  }
}

module.exports = Movie;
