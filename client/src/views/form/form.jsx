import React , { useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { postGame, getGenres } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./form.module.css"

//---------------------------VALIDATOR-------------------------------
const validation = (input) =>{
    console.log("input log", input)

    const errors = {};
    if(!input.name){
        errors.name = "Nombre requerido";
    }
    if(!input.description){
        errors.description = "Descripcion requerida"
    }
    if(input.rating < 1 || input.rating > 5){
        errors.rating = "Rating valido requerido, numero entre 1 - 5"
    }
    // if(!input.genres.length){
    //     errors.genres = "Al menos 1 genero debe ser seleccionado"
    // }
    // if(!input.platforms.length){
    //     errors.platforms = "Al menos 1 plataforma debe ser seleccionada"
    // }
    return errors;
};


export default	function Form(){
    const dispatch = useDispatch()
    // const history = useHistory()
    const genres = useSelector((state) => state.genres)
    const [ errors, setErrors ] = useState({})
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        image: "",
        rating: "",
        genres: [],
        platforms: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validation({
            ...input,
            [e.target.name]: e.target.value
        }));
        // console.log(input)
    }

    function handleSelect(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        console.log(input.genres)
    }

    const platformSelectHandler = (event)=>{
        setInput({
            ...input,
            platforms: [...input.platforms, event.target.value]
        })
        console.log(input.platforms)
    }
    
    function handleSubmit(e){
        e.preventDefault()
        // console.log(input)
        dispatch(postGame(input))
        alert("Creado con éxito!")
        setInput({
            name: "",
            description: "",
            released: "",
            image: "",
            rating: "",
            genres: [],
            platforms: []
        })
        // history.push("/home")
    }

    function handleDeletePlat(el){
            setInput({
                ...input,
                platforms: input.platforms.filter( plat => plat !== el)
            })
    }
    function handleDeleteGenre(el){
            setInput({
                ...input,
                genres: input.genres.filter( genre => genre !== el)
            })
    }


    useEffect(()=>{
        dispatch(getGenres())
    }, [dispatch])

    return(
        <div className={styles.form}>
                <h1>Crear juego</h1>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <h1>Crear juego</h1>
                <div>
                    <label>Nombre: </label>
                    <input type="text" value={input.name} name="name" onChange={handleChange} />
                    {errors.name && (<h5>{errors.name}</h5>)}
                </div>
                <div>
                    <label>Descripción: </label>
                    <input type="text" value={input.description} name="description" onChange={handleChange}/>
                    {errors.description && (<h5>{errors.description}</h5>)}
                </div>
                <div>
                    <label>Fecha de lanzamiento: </label>
                    <input type="text" value={input.released} name="released" onChange={handleChange}/>
                </div>
                <div>
                    <label>Rating: </label>
                    <input type="text" value={input.rating} name="rating" onChange={handleChange}/>
                    {errors.rating && (<h5>{errors.rating}</h5>)}
                </div>
                <div>
                    <label>Imagen: </label>
                    <input type="text" value={input.image} name="image" onChange={handleChange}/>
                </div>
                <div>
                <label>Generos:</label>
                <select onChange={(e)=> handleSelect(e)}>
                <option></option>
                    {genres.map((genre)=>(
                        <option value={genre.name}>{genre.name}</option>
                    ))}
                </select>
                {errors.genres && (<h5>{errors.genres}</h5>)}
                <ul><li>{input.genres.map(el => el + ", ")}</li></ul>
                {input.genres.map(el =>
                <div>
                    <p>{el}</p>
                    <button onClick={()=>handleDeleteGenre(el)} type='button'>x</button>
                </div>
                    )}
                </div>
                <div>
                    <label>Plataformas:</label>
                    <select onChange={(event)=> platformSelectHandler(event)}>
                            <option></option>
                            <option value="Android">Android</option>
                            <option value="Atari7800">Atari 7800</option>
                            <option value="Genesis">Genesis</option>
                            <option value="Game Boy">Game Boy</option>
                            <option value="Nintendo 64">Nintendo 64</option>
                            <option value="Wii">Wii</option>
                            <option value="PlayStation">PlayStation</option>
                            <option value="Xbox">Xbox</option>
                            <option value="iOS">iOS</option>
                            <option value="PC">PC</option>
                    </select>
                    {errors.platforms && (<h5>{errors.platforms}</h5>)}
                    <ul>
                        <li>{input.platforms.map(element=> element+", ")}</li></ul>
                    {input.platforms.map(el =>
                <div>
                    <p>{el}</p>
                    <button onClick={()=>handleDeletePlat(el)} type='button'>x</button>
                </div>
                )}
                </div>
                {Object.keys(errors).length > 0? <button id="formCreateButton" type="submit" disabled={true}>Crear</button>:
                <button id={styles.formCreate} type="submit">Crear</button>}
            <Link to="/home">
                <button if={styles.return}>Volver</button>
            </Link>
            </form>
            
            
        </div>
    )
}