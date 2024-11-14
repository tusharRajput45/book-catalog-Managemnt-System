const express = require("express");
const multer = require("multer");
const {
  addBook,
  allBooks,
  getBook,
  editBook,
  deleteBook,
  sendPDF,
} = require("../Controller/Book-controller");

const router = express.Router();
const path=require('path')

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Initialize multer with storage and file filter options
const upload = multer({ storage: storage });

// Routes
router.get("/get-books", allBooks);
router.get("/get-book/:_id", getBook);
router.post("/add-book", addBook);
router.put("/edit-book/:_id", editBook);
router.delete("/delete-book/:_id", deleteBook);
router.post("/send-pdf", upload.single("file"), sendPDF);

module.exports = router;
