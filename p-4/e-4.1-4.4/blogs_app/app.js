const express = require('express');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(express.static('dist'));
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;