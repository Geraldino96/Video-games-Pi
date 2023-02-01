const {getGenres} = require("../controllers/genresController")

const getGenresHandler = async (req, res) => {
    try {
        const genres = await getGenres();
        // console.log(genres.datavalues)
        res.status(200).json(genres);
    } catch (error) {
        res.status(404).json({ error: error.message})
    }
}


module.exports={
    getGenresHandler
}