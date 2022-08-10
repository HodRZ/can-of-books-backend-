'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 3001;
const { bookSchema, bookModel } = require('./schemas/bookSchema');


//connecting
app.listen(PORT, () => console.log(`${PORT} Radio!!`));

mongoose.connect(process.env.DB_PORT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("CONNECTION OPEN!!!")
  })
  .catch(err => {
    console.log("OH NO ERROR!!!!")
    console.log(err)
  })



//Routes
app.get('/', (req, res) => res.send('welcome!'))
app.get('/book', getBooks)
app.post('/book', postBooks)
app.delete('/book/:id', deletBook)
app.put('/book/:id', updateBook);
app.get('/book/:id', findBookById);


//functions
function getBooks(req, res) {
  bookModel.find({}, (err, data) => {
    if (err) console.log(`error reading from the database: ${err}`);
    else res.send(data);
  })
}

function postBooks(req, res) {
  console.log(req.body)
  const { data } = req.body;
  const newBook = new bookModel(data)
  try {
    newBook.save().then(
      res.status(201).json(newBook)
    )
  } catch (error) {
    console.log('OH NOO!', error)
  }
}

function deletBook(req, res) {
  const id = req.params.id;
  bookModel.findByIdAndDelete(id).then(record => {
    res.send(record);
  }).catch(err => {
    console.log(err)
    res.status(500).send(err.message);
  })
}

function updateBook(req, res) {
  const id = req.params.id;
  const { data } = req.body;
  console.log(req.body)

  bookModel.findByIdAndUpdate(id, data, { new: true }).then(record => {
    res.send(record);
  }).catch(err => {
    console.log(err)
    res.status(500).send(err.message);
  })
}

function findBookById(req, res) {
  const id = req.params.id;
  bookModel.findById(id, (error, data) => {
    if (error) console.log(`Book not found ${error}`);
    else res.send(data);
  })
}