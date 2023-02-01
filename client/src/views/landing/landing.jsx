import React from "react";
import { Link } from "react-router-dom";
import styles from "./landing.module.css"
import titulo from "../../media/titulo.gif"

const Landing = () =>{
    return(
        <div className={styles.background}>   
            <div>
            <img src= {titulo} alt=""/>
            </div>
            <Link to="/home">
                <button className={styles.button}>Get Started</button>
            </Link>
        </div>
    )
}

export default Landing;