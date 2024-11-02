// src/components/EditBook.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    publication_year: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the book details by ID when the component mounts
  useEffect(() => {
    const fetchBook = async () => {
      console.log(`Fetching book with ID: ${id}`); // Debugging log
      try {
        const response = await fetch(`http://localhost:5000/api/get-book/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching book details: ' + response.statusText);
        }
        const data = await response.json();
        if (!data) {
           alert("data not found")
        }
        setBook(data); 
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false in both success and error cases
      }
    };

    fetchBook();
  }, [id]); // Dependency on 'id' to refetch if it changes

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value
    }));
  };

  // Handle form submission to update the book
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/edit-book/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      if (!response.ok) {
        throw new Error('Error updating book: ' + response.statusText);
      }
      alert('Book updated successfully');
      navigate('/'); // Redirect to the main page or list of books
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  // Render loading state or error message
  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='container'>
      <h2>Edit Book</h2>
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
          <label>Publication Year:</label>
          <input
            type="number"
            name="publication_year"
            value={book.publication_year}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
