require('dotenv').config();
const express = require('express');
// const morgan = require("morgan");
const cors = require('cors');
const Person = require('./models/person');
const app = express();

// morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.json());
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());
app.use(express.static('build'));


app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>');
});

app.get('/info', (request, response) => {
    Person
        .estimatedDocumentCount((error, count) => {
            if (error) {
                console.log(error);
            } else {
                response.send(`
                    <p>Phonebook has info for ${count} people</p>
                    <p>${new Date()}</p>
                `);
            }
        });

});

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons);
        });
});

app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person);
            } else {
                response.status(404).send('<h1>404 Not Found</h1>');
            }
        })
        .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    const person = new Person({
        name: body.name,
        number: body.number
    });

    person
        .save()
        .then(savedPerson => {
            response.json(savedPerson);
        })
        .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number
    };

    Person
        .findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end();
        })
        .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformed id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};
app.use(errorHandler);


const PORT = process.env.PORT || 3001;
app.listen(PORT);
