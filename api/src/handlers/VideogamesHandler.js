const {createVideogame, allVideogames, getAllByName, getVideogameById } = require("../controllers/videogameControllers")

const getVideogamesHandler = async (req, res) => {
    const {name} = req.query;
    try {
        if(name){
            try {
                const findGames = name ? await getAllByName(name) : await getAllByName();
                // console.log(findGames)
                res.status(200).json(findGames);
            } catch (error) {
                res.status(404).json({ error: error.message})
            }
        } else {
            const findGames = await allVideogames();
                // console.log(findGames)
            res.status(200).json(findGames);
        }
    } catch (error) {
        res.status(404).json({ error: error.message})
}
}
const getVideogameHandler = async (req, res) => {
    const {id} = req.params
    const allGames = await getVideogameById(id);
    try {
        if(id){
            let gameId = allGames.find(game => game.id === parseInt(id) || game.id === id);
            gameId? res.status(200).send(gameId): res.status(404).send("Id not found")
        }
    } catch (error) {
        res.status(400).send ({error: error.message});
    }
}

const createVideogameHandler = async (req, res) => {
    try {
        const {
            name,
            genres,
            description, 
            released, 
            rating, 
            platforms, 
            image} = req.body;
        const newVideogame = await createVideogame(
            name,
            genres,
            description, 
            released, 
            rating, 
            platforms, 
            image);
        res.status(201).json(newVideogame);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getVideogamesHandler,
    getVideogameHandler,
    createVideogameHandler
}