# Phonebook Backend

The phonebook backend in the part 3 exercises of [Full Stack open 2022](https://fullstackopen.com/en/), it uses the Express library and the data are stored in a MongoDB database. You can find all the exercises in this repository: [fullstackopen](https://github.com/Ghjattu/fullstackopen).

## Start

1. install dependencies

```shell
npm install
```

2. create a `.env` file at the root of the project, then define the environment variables, it looks like this:

```
MONGODB_URI=mongodb+srv://<yourusername>:<yourpassword>@cluster0.bxljdds.mongodb.net/?retryWrites=true&w=majority
PORT=3001
```

3. start the app

```shell
npm run dev
```

You can open the app on [http://localhost:3001/](http://localhost:3001/).

If you want to change the frontend UI, you can replace the "build" folder with your own.