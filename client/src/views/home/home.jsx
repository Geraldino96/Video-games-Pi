import { useEffect, useState } from "react"; // Effect to update component
import { useDispatch, useSelector } from "react-redux"; //Dispatch actions
import { getGames, filterByGenres, createdByFilter, orderByName, getGenres, orderByRating } from "../../redux/actions";
import Paginado from "../../components/paginado/paginado";
import Card from "../../components/card/card";
import SearchBar from "../../components/searchBar/searchBar";
import loading from "../../media/loadingCube.gif"
import styles from "./home.module.css"

const Home = () =>{
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.games);
    const genres = useSelector((state) => state.genres);
    // console.log(genres)
    const [order, setOrder] = useState('')

  //---------------------------PAGINADO-------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    if(currentGames < 1){
        dispatch(getGames())
    }

    useEffect(()=>{
        dispatch(getGenres());
        dispatch(getGames())
    }, [dispatch])

    //---------------------------HANDLERS-------------------------------
    const filterByGenresHandler = (event) => {
            dispatch(filterByGenres(event.target.value));
        };

    const createdByFilterHandler = (event) => {
            dispatch(createdByFilter(event.target.value));
        };

    const orderHandler = (event) => {
        event.preventDefault();
        dispatch(orderByName(event.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${event.target.value}`);
        };

    const ratingHandler = (event) => {
        event.preventDefault();
        dispatch(orderByRating(event.target.value));
        setCurrentPage(1);
        setOrder(event.target.value);
        };

    const handleClick = (e) => {
        e.preventDefault();
            dispatch(getGames());
        };


    return(
        <div className={styles.backgroundHome}>
            <SearchBar setCurrentPage={setCurrentPage}></SearchBar>
                <div className="filtrosHome">
                <button id={styles.buttonHome} onClick={e=> {handleClick(e)}}>
                    Cargar todos los personajes
                </button>
                <div className={styles.filtrosHome}>
                <h3>Ordenar/filtrar los videojuegos:</h3>
                <label>Alfabetico: </label>
                    <select onChange={(event) => orderHandler(event)}>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                    <label>Puntuación: </label>
                    <select onChange={(event) => ratingHandler(event)}>
                        <option value="RatingASC">Mejor puntuado</option>
                        <option value="RatingDESC">Peor Puntuado</option>
                    </select>
                    <label>Lista: </label>
                    <select onChange={(event) => createdByFilterHandler(event)}>
                        <option value="All">All</option>
                        <option value="InfoAPI">Games existentes</option>
                        <option value="created">Games propios</option>
                    </select>
                    <label>Genero: </label>
                    
                    <select onChange={(event) => filterByGenresHandler(event)}>
                    <option value="All">All</option>
                        {genres.map((genre) => (
                            <option value={genre.name}>{genre.name}</option>
                        ))}
                    </select>



                    <div className={styles.paginado}>
                        <Paginado
                            gamesPerPage={gamesPerPage}
                            allGames={allGames.length}
                            paginado={paginado}
                            currentPage={currentPage}
                            div
                        />
                        
                    </div>
                    <div className={styles.cardContainerHome}>
                        {!currentGames.length ? (
                            <div className="loading">
                                <img src={loading} alt="cargando" className={styles.loading}/>
                            </div>
                        ) : (
                        currentGames?.map((game) => {
                        return (
                                <>
                                    <Card
                                        image={game.image}
                                        name={game.name}
                                        id={game.id}
                                        genres={game.genres.join(", ")}
                                        description={game.description}
                                        rating={game.rating}
                                        patforms={game.patforms}
                                        key={game.id}
                                    />
                                </>
                            );
                        })
                    )}
                    </div>
                </div>
                <div className={styles.paginado}>
                <Paginado
                    gamesPerPage={gamesPerPage}
                    allGames={allGames.length}
                    paginado={paginado}
                    currentPage={currentPage}
                    div
                />
                </div>
            </div>
        </div>
    )
}

export default Home;