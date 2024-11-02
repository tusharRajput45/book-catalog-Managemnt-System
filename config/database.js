const mongoose=require("mongoose")

mongoose
  // .connect('mongodb://127.0.0.1:27017/book-app')
  .connect("mongodb+srv://tusharrajput919:window@test-usm.p4ufnvq.mongodb.net/book-app?retryWrites=true&w=majority")
  .then(() => {
    console.log("Database successfully connect");
  })
  .catch(() => { 
    console.log("MongoDB Error");
  });

module.exports=mongoose 
 
