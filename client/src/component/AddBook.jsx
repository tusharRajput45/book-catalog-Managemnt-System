// src/components/AddBook.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    publication_year: ''
  });
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Post the new book data using fetch
    fetch('http://localhost:5000/api/add-book', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add book');
        }
        return response.json();
      })
      .then(() => {
        alert('Book added successfully');
        navigate('/'); // Redirect to the main page or list of books
      })
      .catch((error) => {
        setError('Error adding book. Please check your input data.');
      });
  };

  return (
    <div className='container'>
      <h2>Add New Book</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Publication Year:</label><br />
          <input
            type="number"
            name="publication_year"
            value={book.publication_year}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
