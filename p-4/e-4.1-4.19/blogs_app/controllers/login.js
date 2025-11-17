const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');
const { response } = require('express');

router.post('/', async (request, response) => {
    const { username, password } = request.body;

    const user = await User.findOne({ username });
    const isPasswordCorrect = user !== null && await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordCorrect) {
        return response.status(401).json({ error: 'invalid username or password' });
    }

    const tokenOwner = {
        username: user.username,
        id: user._id
    };

    const t = jwt.sign(tokenOwner, process.env.AUTH_SECRET);

    response.status(200).send({ token: t, username: user.username, name: user.name });
});

module.exports = router;