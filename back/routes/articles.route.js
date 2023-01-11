const express = require('express');
const router = express.Router();

const AuthMiddleware = require('./../middlewares/auth.middleware');

const ArticleModel = require('../models/articles.model');

router.get('/articles', (req, res) => {
    ArticleModel.find().exec((err, articles) => {
        if (err) {
            console.error('Erreur GET /articles : ', err);
            res.status(400).send({
                message: err.message
            });
            return;
        }
        res.send(articles);
    });
});

router.get('/articles/:id', (req, res) => {
    const id = req.params.id;
    ArticleModel.findById(id).exec((err, article) => {
        if (err) {
            console.error('Erreur GET /comments/id : ', err);
            res.status(400).send({
                message: err.message
            });
            return;
        }
        res.send(article);
    });
});

router.post('/articles', AuthMiddleware.checkToken, (req, res) => {
    const article = new ArticleModel({
        _id: req.body._id,
        pseudo: req.body.pseudo,
        nom: req.body.nom,
        idTypeProduit: req.body.idTypeProduit,
        idEtatProduit: req.body.idEtatProduit,
        description: req.body.description,
        prix: req.body.prix,
        date: new Date(),
    });
    if (article?.pseudo !== req?.pseudo) {
        res.status(401).send();
        return;
    }
    article.save(err => {
        if (err) {
            console.error('Erreur POST /articles : ', err);
            res.status(400).send({
                message: err.message
            });
            return;
        }
        res.send(article);
    })

})

router.put('/comments/:id',  AuthMiddleware.checkToken, async (req, res) => {
    const id = req.params.id;
    try {
        const comment = await CommentModel.findById(id);
        if (req?.pseudo !== comment?.pseudo) {
            res.status(401).send();
            return;
        }
        if (req.body.pseudo) {
            comment.pseudo = req.body.pseudo;
        }
        if (req.body.comment) {
            comment.comment = req.body.comment;
        }
        const savedComment = await comment.save();
        res.send(savedComment);
    } catch (err) {
        console.error('Erreur PUT /comments/id : ', err);
        res.status(400).send({
            message: err.message
        });
    }
});

router.delete('/articles/:id', AuthMiddleware.checkToken, async (req, res) => {
    const id = req.params.id;
    try {
        const arti = await ArticleModel.findById(id);
        if (req?.pseudo !== arti?.pseudo) {
            res.status(401).send();
            return;
        }
        arti.remove();
        res.status(204).send();
    } catch (err) {
        console.error('Erreur DELETE /articles/id : ', err);
        res.status(400).send({
            message: err.message
        });
    }
});

module.exports = router;