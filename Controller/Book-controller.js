const BOOK = require("../model/book-model");
const nodemailer=require('nodemailer')
const fs = require("fs");
const path = require("path");


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
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noreply.quiz.minds@gmail.com", // Replace with your email
    pass: "zkrvhjlpczbfwsaq",        // Replace with your email password or app-specific password
  },
});
const sendPDF = async (req, res) => {
  try {
    // Ensure a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Construct the file path
    const filePath = path.join(__dirname, "../uploads", req.file.filename);

    // Set up email options
    const mailOptions = {
      from: "noreply.quiz.minds@gmail.com",      // Sender address
      to: "sanjay@docg.ai",         // Recipient address
      subject: "Your PDF Attachment",
      text: "Please find the attached PDF document.",
      attachments: [
        {
          filename: req.file.originalname,       // Original filename
          path: filePath,                        // Path to the PDF
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Delete the file from the server after sending the email
    fs.unlinkSync(filePath);

    // Respond with success
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = {
  addBook,
  allBooks,
  getBook,
  editBook,
  deleteBook,
  sendPDF
};
