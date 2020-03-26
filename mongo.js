const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Provide a password');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://emil:${password}@cluster0-t347y.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(p => {
      console.log(p.name, p.number);
    });

    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  person.save().then(result => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log('Provide correct arguments');
  process.exit(1);
}

