import React from "react"
import { Link, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDetail, cleanPage } from "../../redux/actions"
import style from "./detail.module.css"
import loading from "../../media/loadingCube.gif"


const Detail = () =>{
  const dispatch = useDispatch()
  const detail = useSelector(state => state.detail)
  const { id } = useParams();
    

    useEffect(()=>{
        dispatch(getDetail(id))
        return () =>{
            dispatch(cleanPage())
        }
    }, [dispatch, id])

    console.log("log de detail", detail)
    return(
    <div className={style.background}>
        <div className={style.card}>
        {!detail.image ? (
          <div>
            <img src={loading} alt="cargando" />
          </div>
        ) : (
          <img
            src={detail.image}
            alt=""
            width="350px"
            height="200px"
          />
        )}
        <h1>{detail.name}</h1>
        <p>Generos: {detail.genres}</p>
        <div>
          <h5>Descripcion: {detail.description}</h5>
        </div>
        <p>Fecha de Lanzamiento: {detail.released}</p>
        <p>Rating: {detail.rating}</p>
        <p>Plataformas: {detail.platforms}</p>
        </div>
      <Link to="/home">
        <button className={style.button}>Volver</button>
      </Link>
    </div>
    )
}

export default Detail;