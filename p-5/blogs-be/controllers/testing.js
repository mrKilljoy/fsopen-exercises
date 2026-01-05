const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');

const router = express.Router();

router.post('/reset', async (_, res) => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    console.log('database state has been reset!');
    res.status(204).end();
});

module.exports = router;