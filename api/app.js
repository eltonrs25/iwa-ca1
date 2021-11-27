var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)

var port = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

const CONNECTION_STRING = `mongodb://localhost:27017/books`;
mongoose.connect(CONNECTION_STRING);

var Book = require('./models/book');


//get all book data from db
app.get('/api/books', function (req, res) {
    // use mongoose to get all todos in the database
    Book.find(function (err, books) {
        // if there is an error retrieving, send the error otherwise send data
        if (err)
            res.send(err)
        res.json(books); // return all books in JSON format
    });
});

// get a book with ID of 1
app.get('/api/books/:book_id', function (req, res) {
    let id = req.params.book_id;
    Book.findById(id, function (err, book) {
        if (err)
            res.send(err)

        res.json(book);
    });

});


// create book and send back all books after creation
app.post('/api/books', function (req, res) {

    // create mongose method to create a new record into collection
    console.log(req.body);

    Book.create(req.body, function (err, book) {
        if (err)
            res.send(err);

        // get and return all the books after newly created employe record
        Book.find(function (err, books) {
            if (err)
                res.send(err)
            res.json(books);
        });
    });

});


// create book and send back all books after creation
app.put('/api/books/:book_id', function (req, res) {
    // create mongose method to update an existing record into collection
    console.log(req.body);

    let id = req.params.book_id;

    // save the user
    Book.findByIdAndUpdate(id, req.body, function (err, book) {
        if (err) throw err;

        res.send('Successfully! Book updated - ' + book.title);
    });
});

// delete a book by id
app.delete('/api/books/:book_id', function (req, res) {
    console.log(req.params.book_id);
    let id = req.params.book_id;
    Book.remove({
        _id: id
    }, function (err) {
        if (err)
            res.send(err);
        else
            res.send('Successfully! Book has been Deleted.');
    });
});

app.listen(port);
console.log("App listening on port : " + port);