const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

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
  response.json(blogs);
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

  if (!id) {
    return response.status(400).end();
  }

  await Blog.findByIdAndUpdate(id, request.body);
  response.status(200).end();
});

router.delete('/:id', async (request, response) => {
  const id = request.params.id;

  if (!id) {
    return response.status(400).end();
  }

  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

module.exports = router;