const BOOK = require("../model/book-model");

const addBook = async (req, resp) => {
  console.log(req.body);
  try {
    const { title, author, genre, publication_year } = req.body;

    if (!title || !author || !genre || !publication_year) {
      return resp.status(400).json({ error: "All fields are required." });
    }

    try {
      const book = new BOOK({ title, author, genre, publication_year });
      await book.save();
      resp.status(201).json(book);
    } catch (error) {
      resp.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.log(error.message);
    resp.status(500).json({ error: "Failed to add book." });
  }
};
const allBooks = async (req, resp) => {
  try {
    const books = await BOOK.find();
    resp.json(books);
  } catch (error) {
    resp.status(500).json({ error: "Failed to retrieve books." });
  }
};
const getBook = async (req, resp) => {
  try {
    const getBook = await BOOK.findOne({ _id: req.params._id });
    if (getBook) {
      resp.json(getBook);
    }else{
      resp.send("book is not matched")
    }
  } catch (error) {
    resp.status(500).json({ error: "Failed data." });
  }
};
const deleteBook = async (req, resp) => {
  console.log(req.params); // Log the request parameters for debugging

  try {
    // Attempt to find and delete the book by its ID
    const deletedBook = await BOOK.deleteOne({ _id: req.params._id });
    
    // Check if a book was deleted
    if (deletedBook) {
      resp.json({ message: "Successfully deleted the book." });
    } else {
      resp.status(404).json({ message: "Book not found." });
    }
  } catch (error) {
    console.error(error);
    resp.status(500).json({ error: "Failed to delete the book." });
  }
};

const editBook=async(req,resp)=>{
  const { title, author, genre, publication_year } = req.body;

  try {
    const book = await BOOK.findByIdAndUpdate(
      req.params._id,
      { title, author, genre, publication_year },
      { new: true, runValidators: true }
    );

    if (!book) return resp.status(404).json({ error: 'Book not found.' });

    resp.json(book);
  } catch (error) {
    resp.status(400).json({ error: error.message });
  }
}
module.exports = {
  addBook,
  allBooks,
  getBook,
  editBook,
  deleteBook,
};
