// database.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'MovieReviewCommunity',
  password: 'Gxy2023211772',
  database: 'mymoviereviewdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;