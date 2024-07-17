const express = require('express');
const router = express.Router();
const pool = require('../database'); // 确保路径正确

// 获取所有类型
router.get('/', (req, res) => {
  pool.query('SELECT * FROM genres', (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving genres');
    }
    res.status(200).json(results);
  });
});

// 根据ID获取单个类型
router.get('/:id', (req, res) => {
  const genreId = req.params.id;
  pool.query('SELECT * FROM genres WHERE genre_id = ?', [genreId], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving genre');
    }
    if (results.length === 0) {
      return res.status(404).send('Genre not found');
    }
    res.status(200).json(results[0]);
  });
});

// 创建新类型
router.post('/', (req, res) => {
  const newGenre = req.body;
  pool.query('INSERT INTO genres SET ?', newGenre, (err, results) => {
    if (err) {
      return res.status(500).send('Error creating genre');
    }
    res.status(201).json({ genre_id: results.insertId, ...newGenre });
  });
});

// 更新类型
router.put('/:id', (req, res) => {
  const genreId = req.params.id;
  const updatedGenre = req.body;
  pool.query('UPDATE genres SET name = ?, description = ? WHERE genre_id = ?', 
    [updatedGenre.name, updatedGenre.description, genreId],
    (err, results) => {
      if (err) {
        return res.status(500).send('Error updating genre');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Genre not found');
      }
      res.send('Genre updated');
    }
  );
});

// 删除类型
router.delete('/:id', (req, res) => {
  const genreId = req.params.id;
  pool.query('DELETE FROM genres WHERE genre_id = ?', [genreId], (err, results) => {
    if (err) {
      return res.status(500).send('Error deleting genre');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Genre not found');
    }
    res.send('Genre deleted');
  });
});

module.exports = router;