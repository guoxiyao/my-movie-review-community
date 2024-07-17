const express = require('express');
const router = express.Router();
const pool = require('../database'); // 确保路径正确

// 获取所有评论
router.get('/', (req, res) => {
  pool.query('SELECT * FROM reviews', (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving reviews');
    }
    res.status(200).json(results);
  });
});

// 根据ID获取单个评论
router.get('/:id', (req, res) => {
  const reviewId = req.params.id;
  pool.query('SELECT * FROM reviews WHERE review_id = ?', [reviewId], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving review');
    }
    if (results.length === 0) {
      return res.status(404).send('Review not found');
    }
    res.status(200).json(results[0]);
  });
});

// 创建新评论
router.post('/', (req, res) => {
  const newReview = req.body;
  // 假设 reviews 表有 user_id, movie_id, rating, review_text 等字段
  pool.query('INSERT INTO reviews (user_id, movie_id, rating, review_text, created_at) VALUES (?, ?, ?, ?, NOW())', 
    [newReview.user_id, newReview.movie_id, newReview.rating, newReview.review_text],
    (err, results) => {
      if (err) {
        console.error('Error inserting review:', err);
        return res.status(500).send('Error creating review');
      }
      res.status(201).json({ review_id: results.insertId, ...newReview });
    }
  );
});

// 更新评论
router.put('/:id', (req, res) => {
  const reviewId = req.params.id;
  const updatedReview = req.body;
  const updates = [];
  const values = [];
  
  if (updatedReview.rating !== undefined) {
    updates.push('rating = ?');
    values.push(updatedReview.rating);
  }
  if (updatedReview.review_text !== undefined) {
    updates.push('review_text = ?');
    values.push(updatedReview.review_text);
  }

  const updateQuery = `UPDATE reviews SET ${updates.join(', ')} WHERE review_id = ?`;
  values.push(reviewId);

  pool.query(updateQuery, values, (err, results) => {
    if (err) {
      return res.status(500).send('Error updating review');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Review not found');
    }
    res.send('Review updated');
  });
});

// 删除评论
router.delete('/:id', (req, res) => {
  const reviewId = req.params.id;
  pool.query('DELETE FROM reviews WHERE review_id = ?', [reviewId], (err, results) => {
    if (err) {
      return res.status(500).send('Error deleting review');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Review not found');
    }
    res.send('Review deleted');
  });
});

module.exports = router;