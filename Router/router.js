const express=require("express")
const { addBook, allBooks, getBook, editBook, deleteBook } = require("../Controller/Book-controller")

const router=express()


router.get('/get-books',allBooks)
router.get('/get-book/:_id',getBook)
router.post('/add-book',addBook)
router.put('/edit-book/:_id',editBook)
router.delete('/delete-book/:_id',deleteBook)




module.exports=router