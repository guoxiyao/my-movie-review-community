// app.js
const express = require('express');
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const port = process.env.PORT || 3000;

app.use(express.json()); // 用于解析 JSON 格式的请求体

// 使用apiRoutes
app.use('/api', apiRoutes);

// 测试路由
app.get('/', (req, res) => {
  res.send('Welcome to the Movie Review Community!');
});

// 添加错误处理中间件
app.use((req, res, next) => {
  res.status(404).send('Sorry, the route you are looking for does not exist');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
