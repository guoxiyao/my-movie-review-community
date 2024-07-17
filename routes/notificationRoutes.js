const express = require('express');
const router = express.Router();
const pool = require('../database'); // 确保路径正确

// 获取所有通知
router.get('/', (req, res) => {
  pool.query('SELECT * FROM notifications', (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving notifications');
    }
    res.status(200).json(results);
  });
});

// 根据ID获取单个通知
router.get('/:id', (req, res) => {
  const notificationId = req.params.id;
  pool.query('SELECT * FROM notifications WHERE notification_id = ?', [notificationId], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving notification');
    }
    if (results.length === 0) {
      return res.status(404).send('Notification not found');
    }
    res.status(200).json(results[0]);
  });
});

// 创建新通知
router.post('/', (req, res) => {
  const newNotification = req.body;
  pool.query('INSERT INTO notifications SET ?', newNotification, (err, results) => {
    if (err) {
      return res.status(500).send('Error creating notification');
    }
    res.status(201).json({ notification_id: results.insertId, ...newNotification });
  });
});

// 更新通知
router.put('/:id', (req, res) => {
  const notificationId = req.params.id;
  const updatedNotification = req.body;
  pool.query('UPDATE notifications SET message = ?, status = ?, read_at = ?, url = ? WHERE notification_id = ?', 
    [updatedNotification.message, updatedNotification.status, updatedNotification.read_at, updatedNotification.url, notificationId],
    (err, results) => {
      if (err) {
        return res.status(500).send('Error updating notification');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Notification not found');
      }
      res.send('Notification updated');
    }
  );
});

// 删除通知
router.delete('/:id', (req, res) => {
  const notificationId = req.params.id;
  pool.query('DELETE FROM notifications WHERE notification_id = ?', [notificationId], (err, results) => {
    if (err) {
      return res.status(500).send('Error deleting notification');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Notification not found');
    }
    res.send('Notification deleted');
  });
});

module.exports = router;