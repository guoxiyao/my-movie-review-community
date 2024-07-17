const express = require('express');
const router = express.Router();
const pool = require('../database'); // 确保路径正确

// 获取所有设置
router.get('/', (req, res) => {
  pool.query('SELECT * FROM settings', (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving settings');
    }
    res.status(200).json(results);
  });
});

// 根据ID获取单个设置
router.get('/:id', (req, res) => {
  const settingId = req.params.id;
  pool.query('SELECT * FROM settings WHERE setting_id = ?', [settingId], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving setting');
    }
    if (results.length === 0) {
      return res.status(404).send('Setting not found');
    }
    res.status(200).json(results[0]);
  });
});

// 创建新设置
router.post('/', (req, res) => {
  const newSetting = req.body;
  pool.query('INSERT INTO settings SET ?', newSetting, (err, results) => {
    if (err) {
      return res.status(500).send('Error creating setting');
    }
    res.status(201).json({ setting_id: results.insertId, ...newSetting });
  });
});

// 更新设置
router.put('/:id', (req, res) => {
  const settingId = req.params.id;
  const updatedSetting = req.body;
  pool.query('UPDATE settings SET user_id = ?, theme = ?, language = ?, notification = ?, privacy_settings = ?, last_updated = NOW() WHERE setting_id = ?', 
    [updatedSetting.user_id, updatedSetting.theme, updatedSetting.language, updatedSetting.notification, updatedSetting.privacy_settings, settingId],
    (err, results) => {
      if (err) {
        return res.status(500).send('Error updating setting');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Setting not found');
      }
      res.send('Setting updated');
    }
  );
});

// 删除设置
router.delete('/:id', (req, res) => {
  const settingId = req.params.id;
  pool.query('DELETE FROM settings WHERE setting_id = ?', [settingId], (err, results) => {
    if (err) {
      return res.status(500).send('Error deleting setting');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Setting not found');
    }
    res.send('Setting deleted');
  });
});

module.exports = router;