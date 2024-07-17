const express = require('express');
const router = express.Router();
const pool = require('../database'); // 确保路径正确

// 获取所有好友关系
router.get('/', (req, res) => {
  pool.query('SELECT * FROM friends', (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving friends');
    }
    res.status(200).json(results);
  });
});

// 根据ID获取单个好友关系
router.get('/:id', (req, res) => {
  const friendId = req.params.id;
  pool.query('SELECT * FROM friends WHERE friend_id = ?', [friendId], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving friend');
    }
    if (results.length === 0) {
      return res.status(404).send('Friend not found');
    }
    res.status(200).json(results[0]);
  });
});

// 创建新好友关系
router.post('/', (req, res) => {
  const newFriend = req.body;
  pool.query('INSERT INTO friends SET ?', newFriend, (err, results) => {
    if (err) {
      return res.status(500).send('Error creating friend');
    }
    res.status(201).json({ friend_id: results.insertId, ...newFriend });
  });
});

// 更新好友关系
router.put('/:id', (req, res) => {
  const friendId = req.params.id;
  const updatedFriend = req.body;
  pool.query('UPDATE friends SET user_id1 = ?, user_id2 = ?, status = ?, created_at = ? WHERE friend_id = ?', 
    [updatedFriend.user_id1, updatedFriend.user_id2, updatedFriend.status, updatedFriend.created_at, friendId],
    (err, results) => {
      if (err) {
        return res.status(500).send('Error updating friend');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Friend not found');
      }
      res.send('Friend updated');
    }
  );
});

// 删除好友关系
router.delete('/:id', (req, res) => {
  const friendId = req.params.id;
  pool.query('DELETE FROM friends WHERE friend_id = ?', [friendId], (err, results) => {
    if (err) {
      return res.status(500).send('Error deleting friend');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Friend not found');
    }
    res.send('Friend deleted');
  });
});

module.exports = router;