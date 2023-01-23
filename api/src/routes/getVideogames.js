const {Router} = require('express');
const {getVideogameHandler, getVideogamesHandler, createVideogameHandler} = require('../handlers/VideogamesHandler')
const { validate } = require('../middlewares/validate')

const getVideogames = Router();

getVideogames.get("/", getVideogamesHandler);
getVideogames.get("/:id", getVideogameHandler);
getVideogames.post("/", validate, createVideogameHandler)

module.exports = getVideogames;