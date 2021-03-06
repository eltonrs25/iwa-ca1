
// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let schema = new Schema({
    title: String,
    author: String,
    price: Number,
    rating: Number,
    genre: String,
    year: String
});

module.exports = mongoose.model('Book', schema);