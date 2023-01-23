const {Router} = require('express');

const getGenres = Router();

getGenres.get("/", (req, res) => {
    res.send("Estoy en genres!")
})

module.exports = getGenres;