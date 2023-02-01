import React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { getGame } from "../../redux/actions"
import { Link } from "react-router-dom";

export default function SearchBar ({setCurrentPage}){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        // setCurrentPage(1)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getGame(name))
        // setName("")
    }

    return (
        <div>
            <input 
            type="text"
            placeholder="Buscar..."
            onChange={(e)=> handleInputChange(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
            <Link to ="/create"><button id= "navButton">Crear Videojuego</button></Link>
        </div>
    )
}
