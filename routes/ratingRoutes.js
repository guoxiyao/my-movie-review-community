const express = require('express');
const router = express.Router();
const pool = require('../database'); // 确保路径正确

// 获取所有评分
router.get('/', (req, res) => {
  pool.query('SELECT * FROM ratings', (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving ratings');
    }
    res.status(200).json(results);
  });
});

// 根据ID获取单个评分
router.get('/:id', (req, res) => {
  const ratingId = req.params.id;
  pool.query('SELECT * FROM ratings WHERE rating_id = ?', [ratingId], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving rating');
    }
    if (results.length === 0) {
      return res.status(404).send('Rating not found');
    }
    res.status(200).json(results[0]);
  });
});

// 创建新评分
router.post('/', (req, res) => {
  const newRating = req.body;
  pool.query('INSERT INTO ratings SET ?', newRating, (err, results) => {
    if (err) {
      return res.status(500).send('Error creating rating');
    }
    res.status(201).json({ rating_id: results.insertId, ...newRating });
  });
});

// 更新评分
router.put('/:id', (req, res) => {
  const ratingId = req.params.id;
  const updatedRating = req.body;
  pool.query('UPDATE ratings SET user_id = ?, movie_id = ?, score = ?, review = ? WHERE rating_id = ?', 
    [updatedRating.user_id, updatedRating.movie_id, updatedRating.score, updatedRating.review, ratingId],
    (err, results) => {
      if (err) {
        return res.status(500).send('Error updating rating');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Rating not found');
      }
      res.send('Rating updated');
    }
  );
});

// 删除评分
router.delete('/:id', (req, res) => {
  const ratingId = req.params.id;
  pool.query('DELETE FROM ratings WHERE rating_id = ?', [ratingId], (err, results) => {
    if (err) {
      return res.status(500).send('Error deleting rating');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Rating not found');
    }
    res.send('Rating deleted');
  });
});

module.exports = router;