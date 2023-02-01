const {Router} = require('express');
const { getGenresHandler} = require("../handlers/GenresHandler")

const getGenres = Router();

getGenres.get("/", getGenresHandler);

module.exports = getGenres;