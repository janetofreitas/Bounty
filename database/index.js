const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/bounty');
mongoose.Promise = global.Promise;

module.exports = mongoose;