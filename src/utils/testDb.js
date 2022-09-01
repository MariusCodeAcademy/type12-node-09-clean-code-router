const mysql = require('mysql2/promise');
const dbConfig = require('../config');

// testDbConnection
async function testDbConnection() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.query('SELECT 1');
    // console.log('rows ===', rows);
    console.log('Connected to MYSQL DB '.bgCyan.bold);
    conn.end();
  } catch (error) {
    console.log(`Error connecting to db ${error.message}`.bgRed.bold);
    // console.log('error ===', error);
    if (error.code === 'ECONNREFUSED') {
      console.log('is Xammp running?'.yellow);
    }
  }
}

module.exports = testDbConnection;
