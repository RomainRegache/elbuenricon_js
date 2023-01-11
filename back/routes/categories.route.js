const express = require('express');
const router = express.Router();

const ArticleModel = require('../models/categories.model');

router.get('/categories', (req, res) => {
    ArticleModel.find().exec((err, categories) => {
        if (err) {
            console.error('Erreur GET /categories : ', err);
            res.status(400).send({
                message: err.message
            });
            return;
        }
        res.send(categories);
    });
});

module.exports = router;