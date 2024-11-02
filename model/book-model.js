// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [50, 'Author name cannot exceed 50 characters']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true,
    maxlength: [30, 'Genre cannot exceed 30 characters']
  },
  publication_year: {
    type: Number,
    required: [true, 'Publication year is required'],
    validate: {
      validator: (year) => Number.isInteger(year) && year > 0,
      message: 'Publication year must be a valid positive integer'
    },
    min: [1000, 'Publication year must be at least 1000'],
    max: [new Date().getFullYear(), `Publication year cannot be in the future`]
  }
});

const BOOK = mongoose.model('Book', bookSchema);
module.exports = BOOK