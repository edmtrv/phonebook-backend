const express = require('express');

const app = express();

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});