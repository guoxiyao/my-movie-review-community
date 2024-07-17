const express = require('express');
const router = express.Router();
const pool = require('../database'); // 确保路径正确

// 获取所有用户
router.get('/', (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving users');
    }
    res.status(200).json(results);
  });
});

// 根据ID获取单个用户
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  pool.query('SELECT * FROM users WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving user');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(results[0]);
  });
});

// 创建新用户
router.post('/', (req, res) => {
  const newUser = req.body;
  pool.query('INSERT INTO users SET ?', newUser, (err, results) => {
    if (err) {
      return res.status(500).send('Error creating user');
    }
    res.status(201).json({ user_id: results.insertId, ...newUser });
  });
});

// 更新用户
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  pool.query('UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?', 
    [updatedUser.username, updatedUser.email, updatedUser.password, userId],
    (err, results) => {
      if (err) {
        return res.status(500).send('Error updating user');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('User not found');
      }
      res.send('User updated');
    }
  );
});

// 删除用户
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  pool.query('DELETE FROM users WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Error deleting user');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    res.send('User deleted');
  });
});

module.exports = router;