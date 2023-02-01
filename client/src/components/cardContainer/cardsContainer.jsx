import Card from "../card/card"
import style from "./cardsContainer.module.css"
import { useSelector } from "react-redux"

const CardsContainer = () =>{
    const games = useSelector(state => state.games)

    return(
        <div  className={style.container} >
            {games.map(game => {
                return <Card
                key= {game.id}
                id = {game.id}
                name = {game.name}
                genres = {" "+ game.genres.join(", ")}
                description = {game.description}
                released = {game.released}
                rating = {game.rating}
                platforms = {game.platforms}
                background_image = {game.image}
                />
            })}
        </div>
    )
}

export default CardsContainer; 