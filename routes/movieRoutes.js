 
 const express = require('express');
 const router = express.Router();
 const pool = require('../database'); // 确保路径正确
 
 // 获取所有电影
 router.get('/', (req, res) => {
   pool.query('SELECT * FROM movies', (err, results) => {
     if (err) {
       return res.status(500).send('Error retrieving movies');
     }
     res.status(200).json(results);
   });
 });
 
 // 根据ID获取单个电影
 router.get('/:id', (req, res) => {
   const movieId = req.params.id;
   pool.query('SELECT * FROM movies WHERE movie_id = ?', [movieId], (err, results) => {
     if (err) {
       return res.status(500).send('Error retrieving movie');
     }
     if (results.length === 0) {
       return res.status(404).send('Movie not found');
     }
     res.status(200).json(results[0]);
   });
 });
 
 // 创建新电影
 router.post('/', (req, res) => {
   const newMovie = req.body;
   pool.query('INSERT INTO movies SET ?', newMovie, (err, results) => {
     if (err) {
       return res.status(500).send('Error creating movie');
     }
     res.status(201).json({ movie_id: results.insertId, ...newMovie });
   });
 });
 
 // 更新电影
 router.put('/:id', (req, res) => {
   const movieId = req.params.id;
   const updatedMovie = req.body;
   pool.query('UPDATE movies SET title = ?, genre_id = ?, description = ? WHERE movie_id = ?', 
     [updatedMovie.title, updatedMovie.genre_id, updatedMovie.description, movieId],
     (err, results) => {
       if (err) {
         return res.status(500).send('Error updating movie');
       }
       if (results.affectedRows === 0) {
         return res.status(404).send('Movie not found');
       }
       res.send('Movie updated');
     }
   );
 });
 
 // 删除电影
 router.delete('/:id', (req, res) => {
   const movieId = req.params.id;
   pool.query('DELETE FROM movies WHERE movie_id = ?', [movieId], (err, results) => {
     if (err) {
       return res.status(500).send('Error deleting movie');
     }
     if (results.affectedRows === 0) {
       return res.status(404).send('Movie not found');
     }
     res.send('Movie deleted');
   });
 });
 
 module.exports = router;