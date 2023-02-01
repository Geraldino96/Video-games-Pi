// require('dotenv').config();
const {Videogame, Genre} = require("../db")
const axios = require("axios")
const { YOUR_API_KEY } = process.env;
const { apiInfo, bdGames, byName} = require("../utils/tools");

const getAllApiGames = async () =>{
    // let url = `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
    let requests = [
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`,
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=2`,
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=3`,
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=4`,
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=5`
    ]
    const apiAll = await Promise.all(requests.map(async e=> (await axios.get(e)).data.results)) // P.all resuelve el array de promesas (request)
    const gamesList = apiAll.flat(1) // transformar varios arrays en uno solo
    // console.log(gamesList)
        let videogamesApi = byName(gamesList)
        // console.log(videogamesApi)
        return [ ...videogamesApi]
}

const dbVideogames = async ()=>{
    const dbGames = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: { attributes:[] }
        }
    })
    const datos = bdGames(dbGames)
    // console.log(datos)

    return datos;
};

const allVideogames = async()=>{
    const apiGames = await getAllApiGames();
    const dbGames = await dbVideogames();
    // console.log(dbGames)
    const response = [ ...dbGames, ...apiGames];
    return response;
};

const getAllByName = async (name) => {
    try {
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
    } catch (error) {
        throw new Error("No existe ese juego")
    }
}

const getVideogameById = async (id) => {
    console.log(id)
    let url = `https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`;
    try {
        if(isNaN(id)){
            const dbGame = await Videogame.findAll({
                where: {
                    id: id,
                }
            })
            return dbGame
        }
            const response = await axios.get(url)
            const gameList = response.data;
            let videogameApi = apiInfo(gameList);
            // console.log(response)
            //   console.log(dbGame)
            return videogameApi
    } catch (error) {
        throw new Error("No existe ese id")
    }
}

const createVideogame = async(
    name,
    genres,
    description, 
    released, 
    rating, 
    platforms, 
    image
    ) => {
            const newGame = await Videogame.create({
                name,
                genres,
                description,
                released,
                rating,
                platforms,
                image
            });
            let genre = await Genre.findAll({
                where: {name: genres}
            });
            // console.log(genre)
            await newGame.addGenre(genre)
            return newGame
    }

module.exports = {createVideogame, getAllByName, allVideogames, getVideogameById}