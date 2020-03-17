const express = require('express');

const app = express();

const persons = [
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

app.get('/api/persons', (req, res) => {
  res.json(persons);
})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});