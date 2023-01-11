const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    pseudo: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    idTypeProduit: {
        type: Number,
        required: true
    },
    idEtatProduit: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const CommentModel = mongoose.model('Articles', ArticleSchema);
module.exports = CommentModel;