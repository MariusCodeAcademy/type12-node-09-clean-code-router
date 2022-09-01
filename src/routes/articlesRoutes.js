const express = require('express');
const mysql = require('mysql2/promise');
const dbConfig = require('../config');
// sukuriam routeri
const articlesRouter = express.Router();

const postColums = 'id, author, body, category, createdAt';
const tableName = 'posts';

// ROUTES
// GET /api/articles - grazina visus postus
articlesRouter.get('/', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `SELECT ${postColums} FROM ${tableName} WHERE archived = 0`;
    console.log('sql ===', sql);
    const [rows] = await conn.query(sql);
    res.status(200).json(rows);
    conn.end();
  } catch (error) {
    console.log('error ', error);
    res.status(500).json({
      msg: 'Something went wrong',
    });
  }
});

// GET /api/articles/2 - grazina straipsni kurio id lygus 2 (dinaminis routes)
articlesRouter.get('/:aId', async (req, res) => {
  const id = req.params.aId;

  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `SELECT ${postColums} FROM ${tableName} WHERE archived = 0 AND id = ?`;
    const [rows] = await conn.execute(sql, [id]);
    res.status(200).json(rows[0]);
    conn.end();
  } catch (error) {
    console.log('error ', error);
    res.status(500).json({
      msg: 'Something went wrong',
    });
  }
});

module.exports = articlesRouter;
