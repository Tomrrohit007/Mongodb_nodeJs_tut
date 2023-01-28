const {ObjectId } = require("mongodb");
const express = require("express");

const { connectToDB, getDB } = require("./db");


// app init
const app = express();

let db
//connection
connectToDB((err) => {
  if (!err) {
    app.listen(4000, () => {
      console.log("server started at port 4000");
    })
    db = getDB()
  }
})

// routes

app.get("/books", (req, res) => {
  let books = []

  db.collection("books")
  .find()
  .sort({author:1})
  .forEach(book=>books.push(book))
  .then(()=>{
    res.status(200).json(books)
  })
  .catch(()=>{
    res.status(500).json({error:"could not fetch books"})
  })
})


app.get("/books/:id", (req, res)=>{
  if(ObjectId.isValid(req.params.id)){

    db.collection("books")
    .findOne({_id:ObjectId(req.params.id)})
    
    .then((doc)=>{
      res.status(200).json(doc)
    })
    .catch(()=>{
      res.status(500).json({error:"could not fetch book"})
    })
  }
  else{
    res.status(500).json({error:"requested invalid book"})
  }

})

// Adding a book via Post Method

app.post("/books", (req, res) => {
  const book = req.body

  db.collection("books")
  .insertOne(book)
  .then(result=>{
    res.status(201).json(result)
  })
  .catch(()=>{
    res.status(500).json({error:"book could not added"})
  })
})