/*

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

*/



const express = require('express');
const router = express.Router();
const pool = require('../database');
const cors = require('cors');

app.use(cors()); // 应用cors中间件于所有路由
//app.use('/api', apiRoutes);

// 获取所有设置，包括根据 user_id 获取特定用户的设置
router.get('/', async (req, res) => {
  try {
    const userId = req.query.user_id; // 从查询参数中获取 user_id
    const query = userId ? `SELECT * FROM settings WHERE user_id = ?` : 'SELECT * FROM settings';
    const results = await pool.query(query, userId ? [userId] : []);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving settings', message: err.message });
  }
});

// 根据ID获取单个设置
router.get('/:id', async (req, res) => {
  const settingId = req.params.id;
  try {
    const results = await pool.query('SELECT * FROM settings WHERE setting_id = ?', [settingId]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Setting not found' });
    }
    res.status(200).json(results[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving setting', message: err.message });
  }
});

// 创建新设置
router.post('/', async (req, res) => {
  const newSetting = req.body;
  try {
    const results = await pool.query('INSERT INTO settings SET ?', [newSetting]);
    res.status(201).json({ setting_id: results.insertId, ...newSetting });
  } catch (err) {
    res.status(500).json({ error: 'Error creating setting', message: err.message });
  }
});

// 更新设置
router.put('/:id', async (req, res) => {
  const settingId = req.params.id;
  const updatedFields = req.body; // 假设 req.body 包含所有需要更新的字段
  try {
    const results = await pool.query('UPDATE settings SET ? WHERE setting_id = ?', [updatedFields, settingId]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Setting not found' });
    }
    res.send('Setting updated');
  } catch (err) {
    res.status(500).json({ error: 'Error updating setting', message: err.message });
  }
});

// 删除设置
router.delete('/:id', async (req, res) => {
  const settingId = req.params.id;
  try {
    const results = await pool.query('DELETE FROM settings WHERE setting_id = ?', [settingId]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Setting not found' });
    }
    res.send('Setting deleted');
  } catch (err) {
    res.status(500).send('Error deleting setting');
  }
});

module.exports = router;