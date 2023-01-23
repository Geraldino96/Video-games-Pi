// require('dotenv').config();
const {Videogame, Genre} = require("../db")
const axios = require("axios")
const { YOUR_API_KEY } = process.env;
const {apiInfo, byName} = require("../utils/tools")



const getAllGames = async () =>{
    let url = `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
    try {
        const bddGames = await Videogame.findAll();
        for (let i = 0; i < 5; i++){
            const response = await axios.get(url);
            let gamesList = response.data.results;
            let videogamesApi = byName(gamesList);
            url = response.data.next;
            return [...bddGames, videogamesApi]
        }
    } catch (error) {
        throw new Error("Ocurrió un arror al traer todos los juegos")
    }
}

const getAllByName = async (name) => {
        const dbGame = await Videogame.findAll({
            where: {
              name: name,
            }
          })
        let gamesList = (
            await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`)
            ).data.results;
            
            const apiInfo = byName(gamesList);
            
            if(apiInfo.length < 1) {
                return "No se encontró ningún juego con ese nombre 😓"
            }
        
        return [...dbGame, ...apiInfo].slice(0, 15)
}

const createVideogame = async(
    name,
    genres,
    description, 
    released, 
    rating, 
    platforms, 
    background_image
    ) => {
        const newGame = await Videogame.create({
            name,
            genres,
            description,
            released,
            rating,
            platforms,
            background_image
        });
        // await Videogame.addGenre(genres);
        return newGame;
    }

const getVideogameById = async (id, source) => {
    let url = `https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`;
    try {
        if(source === "api"){
            const response = await axios.get(url)
            const gameList = response.data;
            let videogameApi = apiInfo(gameList);
            console.log(videogameApi)
            return videogameApi;
            } else {
                const bddGames = await Videogame.findAll({
                    where: {
                        name: name,
                    },
                    include: {
                        model: Genre,
                        attributes: ['name'],
                        through:{
                            attributes:[] // No quiero datos de la tabla intermedia
                        }
                    }
                });
                return bddGames
        }
    } catch (error) {
        throw new Error("No existe ese id")
    }
        
}

module.exports = {createVideogame, getVideogameById, getAllByName, getAllGames}