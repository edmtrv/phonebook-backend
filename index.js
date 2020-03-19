const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(cors())
morgan.token('data', (req, res) => JSON.stringify(req.body));

app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :data'
));

let persons = [
  {
    name: 'Emil Dimitrov',
    number: '123-164363636',
    id: 1
  },
  {
    name: 'Dan Abramov',
    number: '533-53523522',
    id: 2
  }
];

app.get('/info', (req, res) => {
  const html = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`

  res.send(html);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = +req.params.id;

  const person = persons.find(p => p.id === id);

  if (!person) {
    return res.status(404).end();
  }

  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = +req.params.id;

  persons = persons.filter(p => p.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: 'Person name missing'
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'Person number missing'
    });
  }

  if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({
      error: 'Name must be unique'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 50000)
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});