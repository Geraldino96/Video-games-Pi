const {YOUR_API_KEY} = process.env;
const axios = require("axios");
const { Genre } = require("../db");

const getGenres = async () => {
    const url = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);

    const genresApi = await url.data.results.map((genre) => genre.name)
    genresApi.forEach((genre) => {
        Genre.findOrCreate({where: {name: genre}}
                )
    })
    let genresDB = await Genre.findAll();
    // console.log(genresDB)
    return genresDB;
}

module.exports = {
    getGenres
}