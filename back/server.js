const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const loginRoutes = require('./routes/login.routes');
const commentRoutes = require('./routes/comments.route');
const articleRoutes = require('./routes/articles.route');
const etatRoutes = require('./routes/etats.route');
const categorieRoutes = require('./routes/categories.route');
const photoAnnonceRoutes = require('./routes/photosAnnonce.route');

const baseApi = '/api';
const port = 8080;

mongoose.connect('mongodb://0.0.0.0:27017/elbuenricon')
.then(() => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(baseApi, loginRoutes);
    app.use(baseApi, commentRoutes);
    app.use(baseApi, articleRoutes);
    app.use(baseApi, etatRoutes);
    app.use(baseApi, categorieRoutes);
    app.use(baseApi, photoAnnonceRoutes)

    app.listen(port, () => {
        console.log('Server running on port : ' + port);
    })
}).catch(err => {
    console.error(err);
});