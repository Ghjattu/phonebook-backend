const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://Ghjattu:${password}@cluster0.bxljdds.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length > 3) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    });

    person.save().then(res => {
        console.log(`added ${res.name} number ${res.number} to phonebook`);
        mongoose.connection.close();
    });
} else {
    Person.find({}).then(res => {
        console.log('phonebook:');
        res.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
}
