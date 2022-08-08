require("dotenv").config();
const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const app = express();

// morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.json());
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());
app.use(express.static('build'));


app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>');
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    });
});

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).send('<h1>404 Not Found</h1>');
        }
    });
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }

    // if (persons.map(person => person.name).includes(body.name)) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     });
    // }

    const person = new Person({
        name: body.name, number: body.number,
    });

    person.save().then(savedPerson => {
        response.json(savedPerson);
    });
});

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(() => {
        response.status(204).end();
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
