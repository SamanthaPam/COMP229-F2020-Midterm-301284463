// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
    res.render('books/details', {
      title: 'Add Books',
      books: {}
    });
  });

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    
  let newbook = book({
    "Title": req.body.Title,
    "Author":req.body.Author,
    "Price": req.body.Price,
    "Genre": req.body.Genre
});
book.create(newbook, (err, books) => {
    if (err) {
        console.log(err);
        res.end(err);
    }
    else {
        res.redirect('/books');
    }
});

});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;
    book.findById(id, (err, booksToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('books/details', { 
              title: "Edit Book",
              books: booksToEdit });
        }
    });});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id
    let updatedbook = book({
        "_id": id,
        "Title": req.body.Title,
        "Author": req.body.Author,
        "Price": req.body.Price,
        "Genre": req.body.Genre
    });
    book.updateOne({ _id: id }, updatedbook, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/books');
        }
    });
  });

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;
    book.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/books');
        }
    });
});


module.exports = router;
