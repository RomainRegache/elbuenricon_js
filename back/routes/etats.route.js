const express = require('express');
const router = express.Router();

const ArticleModel = require('../models/etats.model');

router.get('/etats', (req, res) => {
    ArticleModel.find().exec((err, etats) => {
        if (err) {
            console.error('Erreur GET /articles : ', err);
            res.status(400).send({
                message: err.message
            });
            return;
        }
        res.send(etats);
    });
});

module.exports = router;