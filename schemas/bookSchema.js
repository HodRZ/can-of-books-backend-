'use strict'
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    thumbnail: String
})

const bookModel = mongoose.model('Book', bookSchema)

exports.bookSchema = bookSchema
exports.bookModel = bookModel