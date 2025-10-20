require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Record = require('./mongo');

const app = express();
app.use(express.json());
morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
});
app.use(morgan(function (tokens, req, res) {

    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens['body'](req, res) || ''
    ].join(' ')
}));
app.use(express.static('dist'))
const PORT = process.env.PORT || 3001;
const baseUrl = '/api/persons';

app.get('/info', (req, res, next) => {
    Record.find({}).then(results => {
        const msg = `Phonebook has info for ${results.length} people\r\n`;
        const date = new Date();
        res.status(200).send(msg + date);
    }).catch(err => next(err));
});

app.get(baseUrl, (req, res, next) => {
    Record.find({}).then(results => {
        res.json(results);
    }).catch(err => next(err));
});

app.get(`${baseUrl}/:id`, (req, res, next) => {
    Record.findById(req.params.id)
        .then(result => {
            if (result) {
                res.json(result)
            }
            else {
                res.status(404).send('not found');
            }
        })
        .catch(err => next(err));
});

app.post(baseUrl, (req, res, next) => {
    const body = req.body;

    if (!body || !body.name)
        return res.status(400).json({ error: 'invalid payload' });

    Record.findOne({ name: body.name })
        .then(x => {
            if (x) {
                const { phone, name } = body;
                x.phone = phone;
                return x.save().then((u) => {
                    console.log(`updated existing item: ${name}`);
                    res.json(u);
                });
            } else {
                const item = new Record({ name: body.name, phone: body.phone });

                return item.save().then((x) => {
                    console.log('added new item');
                    res.json(x);
                });
            }
        })
        .catch(err => next(err));
});

app.put(`${baseUrl}/:id`, (req, res, next) => {
    const { name, phone } = req.body;
    Record.findById(req.params.id)
        .then(r => {
            if (!r) {
                return res.status(404).end()
            }

            r.name = name;
            r.phone = phone;

            return r.save().then((u) => res.json(u))
        })
        .catch(error => next(error))
});

app.delete(`${baseUrl}/:id`, (req, res, next) => {
    const id = req.params.id;

    Record.findByIdAndDelete(id)
        .then(() => res.status(204).end())
        .catch(err => next(err));
});

app.get('/', (req, res) => {
    res.status(200).send('Phonebook app is running!');
});

const errorHandler = (error, req, res, next) => {
    if (error && error.name) {
        console.error('* ERROR *', error);
        return res.status(400).send({ error: error.message });
    }

    next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});