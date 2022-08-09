'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;
const { bookSchema, bookModel } = require('./schemas/bookSchema');
// const dummyData = require('./dummyData/booksData.json')

//connecting
app.listen(PORT, () => console.log(`${PORT} Radio!!`));

mongoose.connect('mongodb://localhost:27017/booksApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("CONNECTION OPEN!!!")
  })
  .catch(err => {
    console.log("OH NO ERROR!!!!")
    console.log(err)
  })



//Routes
app.get('/test', (request, response) => {
  response.send('test request received')
})

app.get('/books', getBooks)


//functions
function getBooks(req, res) {
  bookModel.find({}, (err, data) => {
    if (err) console.log(`error reading from the database: ${err}`);
    else res.send(data);
  })
}
//testing Schemas and models
// const bookSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   status: String,
// })

// const testBook = new bookModel({
//   name: "test book",
//   description: 'a book to test the model YAY!',
//   status: 'something something status'
// })

// testBook.save()

//filling dummyData (run once)
// dummyData.forEach((book) => {
//   const testBook = new bookModel({
//     title: book.title,
//     description: book.longDescription,
//     status: book.status,
//     thumbnail: book.thumbnailUrl
//   })
//   testBook.save()
// })
