const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    pseudo: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

const CommentModel = mongoose.model('Comments', CommentSchema);
module.exports = CommentModel;