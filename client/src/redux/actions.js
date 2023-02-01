import axios from "axios"

import { GET_GAME, GET_GAMES, GET_DETAIL, GET_GENRES, CLEAN_PAGE, ORDER_BY_NAME, ORDER_BY_RATING, CREATED_BY_FILTER, FILTER_BY_GENRES, POST_GAME } from "./actionsTypes"

// -------- GET --------

export const getGames = () => {
    return async function(dispatch){
        const games = await axios.get('http://localhost:3001/videogames')
        // console.log(games.data)  
        // console.log(games.data.concat(games.data[games.data.length - 1]))  
            return dispatch({ type: GET_GAMES, payload: games.data})
    }
}

export const getDetail = (id) => {
    return async function(dispatch){
        try {
            const game = await axios.get(`http://localhost:3001/videogames/${id}`)
            // console.log(game.data[0])
            return dispatch({ type: GET_DETAIL, payload: game.data})
        } catch (error) {
            console.log(error)
        }
    }
}

export const getGame = (name) => {
    return async function(dispatch){
        try {
            const game = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            // console.log(game.data)
            return dispatch({ type: GET_GAME, payload: game.data})
        } catch (error) {
            return console.log("Game not found")
        }
    }
}

export const getGenres = ()=>{
    return async (dispatch)=>{
        const genres = await axios.get("http://localhost:3001/genres");
        // console.log(genres.data)
        return dispatch({type: GET_GENRES, payload: genres.data})
    }
};
    
// ------- POST ------

export const postGame = (payload) => {
    return async function(dispatch){
        try {
            await axios.post("http://localhost:3001/videogames", payload);
            return dispatch({type: POST_GAME});
        } catch (error) {
            console.log(error)
    }
}
}


//---------------------------FILTERS-------------------------------

export const createdByFilter = (payload)=>{
    return {type: CREATED_BY_FILTER, payload: payload}
};

export const filterByGenres = (payload)=>{
    // console.log(payload)
    return {type: FILTER_BY_GENRES, payload: payload }
};


//---------------------------ORDER-------------------------------
export const orderByName = (payload)=>{
    return{type: ORDER_BY_NAME, payload: payload}
};

export const orderByRating = (payload)=>{
    return{type: ORDER_BY_RATING , payload: payload}
};

export const cleanPage = ()=>{
    return {type: CLEAN_PAGE}
};