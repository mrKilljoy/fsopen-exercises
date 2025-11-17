const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const { title } = require('node:process');

describe('listHelper tests', () => {
    test('returns one', () => {
        const blogs = [];
        const result = listHelper.dummy(blogs);

        assert.strictEqual(result, 1);
    });

    test('counts likes in all blogs', () => {
        const blogs = [
            {
                title: "blog 1",
                likes: 1
            },
            {
                title: "blog 2",
                likes: 3
            },
            {
                title: "blog 3",
                likes: 6
            },
        ];

        const result = listHelper.totalLikes(blogs);
        assert.strictEqual(result, 10);
    });
});