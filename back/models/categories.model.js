const mongoose = require('mongoose');

const CategorieSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    nom: {
        type: String,
        required: true
    }
});

const CommentModel = mongoose.model('Categories', CategorieSchema);
module.exports = CommentModel;