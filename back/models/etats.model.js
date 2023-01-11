const mongoose = require('mongoose');

const EtatsSchema = mongoose.Schema({
    id: {
      type: Number,
      required: true
    },
    nom: {
        type: String,
        required: true
    }
});

const CommentModel = mongoose.model('Etats', EtatsSchema);
module.exports = CommentModel;