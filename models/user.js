const mongoose = require('../database');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    cep:{
        type: Number,
        required: true
    },
    telefone:{
        type: Number,
        required: true
    },
    nacionalidade:{
        type: String,
        required: true
    },
    endereco:{
        type: String,
        required: true
    },
    genero:{
        type: String,
        required: true
    },
    dataNascimento:{
        type: Date,
        required: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    passwordResetToken:{
        type: String,
        select: false
    },
    passwordResetExpires:{
        type: Date,
        select: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    bio:{
        type: String,
        default: 'base bio'
    }
    
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;