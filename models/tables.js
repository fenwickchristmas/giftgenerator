var mongoose = require('mongoose');

var TableSchema = new mongoose.Schema({
    giving: String,
    receiving: String,
    year: String
});

module.exports = mongoose.model('Table', TableSchema);