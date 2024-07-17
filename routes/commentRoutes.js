const express = require('express');
const router = express.Router();
const pool = require('../database'); // 确保路径正确

// 获取所有评论
router.get('/', (req, res) => {
  pool.query('SELECT * FROM comments', (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving comments');
    }
    res.status(200).json(results);
  });
});

// 根据ID获取单个评论
router.get('/:id', (req, res) => {
  const commentId = req.params.id;
  pool.query('SELECT * FROM comments WHERE comment_id = ?', [commentId], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving comment');
    }
    if (results.length === 0) {
      return res.status(404).send('Comment not found');
    }
    res.status(200).json(results[0]);
  });
});

// 创建新评论
router.post('/', (req, res) => {
  const newComment = req.body;
  pool.query('INSERT INTO comments SET ?', newComment, (err, results) => {
    if (err) {
      return res.status(500).send('Error creating comment');
    }
    res.status(201).json({ comment_id: results.insertId, ...newComment });
  });
});

// 更新评论
router.put('/:id', (req, res) => {
  const commentId = req.params.id;
  const updatedComment = req.body;
  pool.query('UPDATE comments SET review_id = ?, user_id = ?, parent_comment_id = ?, comment_text = ? WHERE comment_id = ?', 
    [updatedComment.review_id, updatedComment.user_id, updatedComment.parent_comment_id, updatedComment.comment_text, commentId],
    (err, results) => {
      if (err) {
        return res.status(500).send('Error updating comment');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Comment not found');
      }
      res.send('Comment updated');
    }
  );
});

// 删除评论
router.delete('/:id', (req, res) => {
  const commentId = req.params.id;
  pool.query('DELETE FROM comments WHERE comment_id = ?', [commentId], (err, results) => {
    if (err) {
      return res.status(500).send('Error deleting comment');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Comment not found');
    }
    res.send('Comment deleted');
  });
});

module.exports = router;