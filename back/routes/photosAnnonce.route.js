const express = require('express');
const multer = require('multer');
const router = express.Router();

const PhotoAnnonceModel = require('../models/photosAnnonce.model');
const ArticleModel = require("../models/articles.model");
const path = require("path");

// File upload settings
const PATH = './uploads';
const date = Date.now();

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + date + '_' + file.originalname)
    }
});
let upload = multer({
    storage: storage
});

router.post('/upload', upload.single('image'), function (req, res){
    if (!req.file) {
        console.log("No file is available!");
        return res.send({
            success: false
        });
    } else {
        console.log('File is available!' + req.file.fieldname);
        const photoAnnonce = new PhotoAnnonceModel({
            idAnnonce: req.header('article'),
            path: req.file.path.substring(8,req.file.path.length)
        });
        photoAnnonce.save()
        return res.send({
            success: true
        })
    }
});

router.get('/photosAnnonce/:id', (req, res) => {
    const id = req.params.id;
    PhotoAnnonceModel.find({ 'idAnnonce': id }).exec((err, photosAnnonce) => {
        if (err) {
            console.error('Erreur GET /photosAnnonce/id : ', err);
            res.status(400).send({
                message: err.message
            });
            return;
        }
        res.send(photosAnnonce);
    });
});

module.exports = router;