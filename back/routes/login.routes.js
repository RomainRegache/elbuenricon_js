const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('./../models/user.model');

const secretKey = process.env.SECRET_KEY;
const saltRounds = 10;

router.post('/register', async(req, res) => {
    try {
        const user = new Users({
            pseudo: req.body.pseudo,
            password: bcrypt.hashSync(req.body.password, saltRounds),
            email: req.body.email,
            id: req.body.id,
            idTypeUser: req.body.idTypeUser,
            nom: req.body.nom,
            prenom: req.body.prenom,
            pathPhotoProfil: req.body.pathPhotoProfil,
            ville: req.body.ville,
            adresse1: req.body.adresse1,
            adresse2: req.body.adresse2,
            codePostal: req.body.codePostal
        });
        await user.save();
        res.status(201).send();
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});

router.post('/login', async(req, res) => {
    const credentials = {
        pseudo: req.body.pseudo,
        password: req.body.password
    };
    try {
        const user = await Users.findOne({ pseudo: credentials.pseudo });
        if(!user) {
            res.status(401).send();
            return;
        }
        const passwordIsValid = await bcrypt.compareSync(credentials.password, user.password);
        if (passwordIsValid) {
            const bearerToken = jwt.sign({ pseudo: user.pseudo }, secretKey, { expiresIn: '1h' });
            res.send({
                token: bearerToken
            });
        } else {
            res.status(401).send();
        }
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});

module.exports = router;