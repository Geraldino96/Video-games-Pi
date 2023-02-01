import React from "react";
import styles from "../paginado/paginado.module.css"

export default function Paginado ({gamesPerPage, allGames, paginado, currentPage}){
    const pageNumbers = []

    for(let i=0; i<=Math.ceil(allGames/gamesPerPage); i++){
        pageNumbers.push(i + 1)
    }

    return(
        <nav className={styles.containerpaginado}>
            <ul className={styles.listapaginado}>
                { pageNumbers &&
                pageNumbers.map(number =>(
                    <li key={number}>
                        {currentPage===number?
                        <button id={styles.selected} onClick={()=> paginado(number)}>{number}</button>:
                        <button id={styles.notSelected} onClick={()=> paginado(number)}>{number}</button>}
                    </li>
                ))}
            </ul>
        </nav>
    )
}