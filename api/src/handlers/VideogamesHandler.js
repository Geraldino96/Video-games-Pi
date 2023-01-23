const {createVideogame, getVideogameById, getAllGames, getAllByName} = require("../controllers/videogameControllers")

const getVideogamesHandler = async (req, res) => {
    const {name} = req.query;
    try {
        const findGames = name ? await getAllByName(name) : await getAllGames();
        // console.log(findGames)
        res.status(200).json(findGames);
    } catch (error) {
        res.status(404).json({ error: error.message})
}
}

const getVideogameHandler = async (req, res) => {
    const {id} = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const game = await getVideogameById(id, source);
        res.status(200).json(game);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
}

const createVideogameHandler = async (req, res) => {
    try {
        const {name,
            genres,
            description, 
            released, 
            rating, 
            platforms, 
            background_image} = req.body;
            if(name || description || platforms || background_image) throw new Error("Faltan datos")
        const newVideogame = await createVideogame(name,
            genres,
            description, 
            released, 
            rating, 
            platforms, 
            background_image);
        res.status(201).json(newVideogame);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getVideogameHandler,
    getVideogamesHandler,
    createVideogameHandler
}