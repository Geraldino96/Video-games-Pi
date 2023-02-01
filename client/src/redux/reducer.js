import { GET_GAMES, CLEAN_PAGE, FILTER_BY_GENRES, CREATED_BY_FILTER, ORDER_BY_NAME, GET_GENRES, GET_GAME, POST_GAME, GET_DETAIL, ORDER_BY_RATING } from "./actionsTypes";

const initialState = {
    games: [],
    allGames: [],
    detail: [],
    genres: []
}

const rootReducer = (state = initialState, action) =>{
    switch (action.type) {
        case FILTER_BY_GENRES:
            const allGames = state.allGames
            const filteredByGenre = action.payload === 'All' ? allGames : allGames.filter(game => game.genres.includes(action.payload))
            return {
                ...state,
                games: filteredByGenre
            }
        case CREATED_BY_FILTER:
            const createdByFilter = action.payload === "created"?
                state.allGames.filter(game => game.created):
                state.allGames.filter(game => !game.created)
            return{
                ...state,
                games: action.payload === 'All' ? state.allGames : createdByFilter
            }

        case ORDER_BY_NAME:
            let sortedArray = action.payload === "asc"?
            state.games.sort(function(a,b){
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0;
            }) :
            state.games.sort(function(a,b){
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                return 0;
            })
            return{
                ...state,
                games: sortedArray
            }

        case GET_GAMES:
            return { ...state, games: action.payload, allGames: action.payload}

        case GET_GAME:
            return { ...state, games: action.payload}

        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            }

        case POST_GAME:
            return{
                ...state,
        }

        case ORDER_BY_RATING:
            let ratingArray = action.payload === "RatingDESC"? 
            state.games.sort(function(a,b){
                if(a.rating > b.rating) return 1;
                if(a.rating < b.rating) return -1;
                return 0;
            }) :
            state.games.sort(function(a,b){
                if(a.rating > b.rating) return -1;
                if(a.rating < b.rating) return 1;
                return 0;
            })
            return{
                ...state,
                games: ratingArray
            }
            
        case CLEAN_PAGE:
            return{
                ...state,
                detail:[]
            }
    
        default:
            return {...state}
    }
}

export default rootReducer;