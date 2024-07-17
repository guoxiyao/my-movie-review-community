// test-db-connection.js
console.log('开始测试数据库连接...');

// 引入 database.js 中的数据库连接池
const pool = require('./database');

// 使用数据库连接池执行一个查询
pool.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) {
    console.error('数据库连接失败:', err);
    return;
  }
  console.log('数据库连接成功，查询结果:', results);
});

// 注意：不需要模拟数据库连接的 setTimeout 调用