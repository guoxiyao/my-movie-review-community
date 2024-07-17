
// apiRoutes.js
const express = require('express');
const router = express.Router();

/*
// 可以添加一个响应 /api/ 路径的路由，但通常情况下这不是必需的
router.get('/', (req, res) => {
  res.send('API root');
});
*/
// 引入每个表的路由模块
const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');
const reviewRoutes = require('./reviewRoutes');
const commentRoutes = require('./commentRoutes');
const genreRoutes = require('./genreRoutes');
const friendRoutes = require('./friendRoutes');
const ratingRoutes = require('./ratingRoutes');
const notificationRoutes = require('./notificationRoutes');
const settingRoutes = require('./settingRoutes');

// 使用路由模块
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/reviews', reviewRoutes);
router.use('/comments', commentRoutes);
router.use('/genres', genreRoutes);
router.use('/friends', friendRoutes);
router.use('/ratings', ratingRoutes);
router.use('/notifications', notificationRoutes);
router.use('/settings', settingRoutes);

// 导出 apiRoutes 模块
module.exports = router;
