// commentsRoutes.js'
const express = require('express');
const mysql = require('mysql2/promise');
const dbConfig = require('../config');

// sukurti routeri
const commentsRouter = express.Router();
// importuoti ir panaudoti server.js

// aprasyti
// GET /api/comments - grazinti 'trying to get comments'
commentsRouter.get('/', (req, res) => {
  res.json('trying to get comments');
});

// GET /api/comments/:postId - grazinti konkretaus posto komentarus

// GET /api/comments/createTable - sukurti komentaru lentele
// id, author, body, postId, createdAt
commentsRouter.get('/create-table', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    CREATE TABLE comments (
      id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      author VARCHAR(255) NOT NULL,
      body TEXT NOT NULL,
      postId INT(11) UNSIGNED NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    const [rows] = await conn.query(sql);
    res.status(200).json(rows);
    await conn.end();
  } catch (error) {
    console.log('error in create-table route ===', error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
});

// phpMyAdmin ir prisideti keleta komentaru

// exportuoti routeri
module.exports = commentsRouter;
