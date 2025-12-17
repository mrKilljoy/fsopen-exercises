const { test, describe, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const app = require('../app');
const { title } = require('node:process');
const api = supertest(app);

describe('app tests', () => {
    beforeEach(async () => {
        const testNames = ['test1', 'test2', 'test3'];

        const first = await Blog.findOne({ title: /test/ });
        if (first) {
            await Blog.deleteMany({ title: /test/ });
        }

        await Blog.insertMany(testNames.map(x => new Blog({ title: x, author: 'author', url: 'http://example.com', likes: 3 })));
    });

    test('returns all existing blogs', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.length > 0, true);
    });

    test('has id property', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const item = response.body[0];
        assert.strictEqual(item.id !== undefined, true);
        assert.strictEqual(item._id === undefined, true);
    });

    test('adds new item successfully', async () => {
        const items = await api.get('/api/blogs');

        await api.post('/api/blogs')
            .send({ title: 'test0', author: 'author', url: 'http://example.com', likes: 5 })
            .expect(201);

        const updatedItems = await api.get('/api/blogs');
        assert.strictEqual(updatedItems.body.length, items.body.length + 1);
    });

    test('sets zero likes if new model didnt have it', async () => {
        await api.post('/api/blogs')
            .send({ title: 'test7', author: 'author', url: 'http://example.com' })
            .expect(201);

        const found = await Blog.findOne({ title: 'test7' });
        assert.strictEqual(found !== null, true);
        assert.strictEqual(found.likes, 0);
    });

    test('cannot accept models without title or url', async () => {
        await api.post('/api/blogs')
            .send({ title: null, author: 'author0', url: null })
            .expect(400);
    });

    test('updates blogs successfully', async () => {
        const likes = 77;
        const first = await Blog.findOne({ title: /test/ });
        first.likes = likes;

        await api.put(`/api/blogs/${first.id}`)
            .send(first)
            .expect(200);

        const updated = await Blog.findById(first.id);
        assert.strictEqual(updated.likes, likes);
    });

    test('deletes blogs successfully', async () => {
        const first = await Blog.findOne({ title: /test/ });
        await api.delete(`/api/blogs/${first.id}`)
            .expect(204);
    });

    after(async () => {
        await mongoose.connection.close();
    });
});