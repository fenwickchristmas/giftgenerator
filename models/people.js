var mongoose = require('mongoose');

var PeopleSchema = new mongoose.Schema({
    name: String,
    familyId: Number
});

module.exports = mongoose.model('People', PeopleSchema);