// src/components/AllBooks.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllBook = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5); // Number of books per page

  useEffect(() => {
    fetch('http://localhost:5000/api/get-books')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching books');
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching books');
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredBooks(
      books.filter(book =>
        book.title.toLowerCase().includes(value.toLowerCase()) ||
        book.author.toLowerCase().includes(value.toLowerCase()) ||
        book.genre.toLowerCase().includes(value.toLowerCase()) ||
        book.publication_year.toString().includes(value)
      )
    );
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/delete-book/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Error deleting book');
        }
        setBooks(books.filter(book => book._id !== id));
        setFilteredBooks(filteredBooks.filter(book => book._id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // Get current books for the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='container'>
      <h2>All Books</h2>
      <Link to="/add-book">
        <button>Add Book</button>
      </Link>
      <input
        type="text"
        placeholder="Search for a book..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Publication Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.length > 0 ? (
                currentBooks.map((book) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.publication_year}</td>
                    <td>
                      <Link to={`/edit-book/${book._id}`}>Edit</Link>
                      <button onClick={() => handleDelete(book._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No books available</td>
                </tr>
              )}
            </tbody>
          </table>
          <div>
            {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllBook;
