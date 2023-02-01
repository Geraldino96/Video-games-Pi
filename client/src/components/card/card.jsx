import style from "./card.module.css"
import { Link } from "react-router-dom";

const Card = ({image, name, id, genres}) =>{
    return(
        <div className={style.card}>
            <a>
            <Link to={`/videogames/${id}`}>
            <h4>Name: {name}</h4>
            <img className={style.img} src={image} alt="" />
            </Link>
            <p>Genres: {genres}</p>
            </a>
            {/* <p>genres: {genres}</p> */}
            {/* <p>description: {description}</p>
            <p>description: {description}</p>
            <p>Rating: {rating}</p>
            <p>platforms: {platforms}</p> */}
        </div>
    )
}

export default Card;