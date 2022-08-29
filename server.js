'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Books = require('./models/Books.js');
const app = express();
app.use(cors());

mongoose.connect(process.env.DB_URL);

// add validation to confirm we are wired up to our mongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received');

});

app.get('/books', getBooks);

async function getBooks(request, response, next) {
  try {
    let results = await Books.find();
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

console.log(getBooks);

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
