const express = require('express');
// sukuriam routeri
const articlesRouter = express.Router();

const tableName = 'posts';

// routes
// GET /api/articles - grazina visus postus articlesRouter.js

module.exports = articlesRouter;
