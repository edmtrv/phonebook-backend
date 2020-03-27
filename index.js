require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));
morgan.token('data', (req, res) => JSON.stringify(req.body));

app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :data'
));

app.get('/info', (req, res) => {
  const html = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`

  res.send(html);
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(p => p.toJSON()));
  });
});

app.get('/api/persons/:id', (req, res) => {
  const id = +req.params.id;

  const person = persons.find(p => p.id === id);

  if (!person) {
    return res.status(404).end();
  }

  res.json(person);
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(err => next(err))
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

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(result => {
    res.json(result);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});