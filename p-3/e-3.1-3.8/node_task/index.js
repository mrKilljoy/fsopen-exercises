const express = require('express');
const morgan = require('morgan');
const staticData = require('./test_data');

const app = express();
app.use(express.json());
morgan.token('body', (req, res) => {
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
let persons = staticData.default;

function generateId() {
    return Math.floor(Math.random() * 10000).toString();
}

app.get('/', (req, res) => {
    res.status(200).send('Phonebook app is running!');
});

app.get('/info', (req, res) => {
    const msg = `Phonebook has info for ${persons.length} people\r\n`;
    const date = new Date();
    res.status(200).send(msg + date);
});

app.get(baseUrl, (req, res) => {
    res.status(200).json(persons);
});

app.get(`${baseUrl}/:id`, (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);
    if (!person) {
        return res.status(404).send('not found');
    }
    res.status(200).json(person);
});

app.post(baseUrl, (req, res) => {
    const body = req.body;

    if (!body || !body.name)
        return res.status(400).json({ error: 'invalid payload' });

    if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({ error: 'person with this name already exists' });
    }

    persons = persons.concat({...body, id: generateId() });

    res.status(200).end();
});

app.delete(`${baseUrl}/:id`, (req, res) => {
    const id = req.params.id;
    const idx = persons.findIndex(p => p.id === id);
    if (idx && idx >= 0) {
        console.log(`deleting ${idx}`);
        persons = persons.filter(p => p.id !== id);
        return res.status(204).end();
    } else {
        return res.status(404).send('not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});