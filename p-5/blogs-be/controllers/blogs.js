const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');

const readToken = (request) => {
  const authHeader = request.get('authorization');
  console.log('we are here: ', authHeader);
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.replace('Bearer ', '');
  }

  return null;
};

router.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('user');

  logger.info('Fetched blogs: ', blogs.length);
  response.json(blogs);
});

router.get('/:id', async (request, response) => {
  const id = request.params.id;
  const item = await Blog.findById(id).populate('user');

  if (!item) {
    return response.status(404).end();
  }

  logger.info('Fetched blog: ', id);
  response.json(item);
});

router.post('/', async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(readToken(request), process.env.AUTH_SECRET);
  if (!decodedToken?.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(400).json({ error: 'user not found' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  });

  if (!body.title || !body.url) {
    return response.status(400).end();
  }

  const result = await blog.save();
  
  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

router.put('/:id', async (request, response) => {
  const id = request.params.id;

  const decodedToken = jwt.verify(readToken(request), process.env.AUTH_SECRET);
  if (!decodedToken?.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  if (!id) {
    return response.status(400).end();
  }

  const body = request.body;

  const updatedItem = await Blog.findByIdAndUpdate(id, {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }, { new: true })
  .populate('user');
  
  response.status(200).json(updatedItem);
});

router.delete('/:id', async (request, response) => {
  const id = request.params.id;

  const decodedToken = jwt.verify(readToken(request), process.env.AUTH_SECRET);
  if (!decodedToken?.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  if (!id) {
    return response.status(400).end();
  }

  const itemToDelete = await Blog.findById(id).populate('user');
  if (itemToDelete?.user?._id?.toString() !== decodedToken.id) {
    return response.status(403).json({ error: 'only creator can delete this blog' });
  }
  await itemToDelete.deleteOne();
  response.status(204).end();
});

module.exports = router;