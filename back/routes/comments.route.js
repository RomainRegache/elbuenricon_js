const express = require('express');
const router = express.Router();

const AuthMiddleware = require('./../middlewares/auth.middleware');

const CommentModel = require('../models/comments.model');

router.get('/comments', (req, res) => {
    CommentModel.find().exec((err, comments) => {
        if (err) {
            console.error('Erreur GET /comments : ', err);
            res.status(400).send({
                message: err.message
            });
            return;
        }
        res.send(comments);
    });
});

router.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    CommentModel.findById(id).exec((err, comment) => {
        if (err) {
            console.error('Erreur GET /comments/id : ', err);
            res.status(400).send({
                message: err.message
            });
            return;
        }
        res.send(comment);
    });
});

router.post('/comments', AuthMiddleware.checkToken, (req, res) => {
    const comment = new CommentModel({
        pseudo: req.body.pseudo,
        comment: req.body.comment
    });
    if (comment?.pseudo !== req?.pseudo) {
        res.status(401).send();
        return;
    }
    comment.save(err => {
        if (err) {
            console.error('Erreur POST /comments : ', err);
            res.status(400).send({
                message: err.message
            });
            return;
        }
        res.send(comment);
    });
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

router.delete('/comments/:id', AuthMiddleware.checkToken, async (req, res) => {
    const id = req.params.id;
    try {
        const comm = await CommentModel.findById(id);
        if (req?.pseudo !== comm?.pseudo) {
            res.status(401).send();
            return;
        }
        comm.remove();
        res.status(204).send();
    } catch (err) {
        console.error('Erreur DELETE /comments/id : ', err);
        res.status(400).send({
            message: err.message
        });
    }
});

module.exports = router;