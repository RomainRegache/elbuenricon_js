const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    idTypeUser: {
        type: Number,
        default: 0,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    pathPhotoProfil: {
        type: String,
        required: true
    },
    ville: {
        type: String,
        required: true
    },
    adresse1: {
        type: String,
        required: true
    },
    adresse2: {
        type: String,
        required: true
    },
    codePostal: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Users', UserSchema)