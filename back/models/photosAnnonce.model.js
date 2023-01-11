const mongoose = require('mongoose');

const PhotoAnnonceSchema = mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    idAnnonce: {
        type: String,
        required: true
    }
});

const PhotoAnnonceModel = mongoose.model('PhotosAnnonce', PhotoAnnonceSchema);
module.exports = PhotoAnnonceModel;