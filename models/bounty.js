const mongoose = require('../database');
const bcrypt = require('bcrypt');

const BountySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    restrictions:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required: true
    },
    dataInicial:{
        type: Date,
        required: true
    },
    dataFinal:{
        type: Date,
        required: true
    },
    creator:{
        type: String,
        required: true,
    },
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});

const Bounty = mongoose.model('Bounty', BountySchema);

module.exports = Bounty;