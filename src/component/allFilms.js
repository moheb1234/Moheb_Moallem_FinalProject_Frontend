import React, {useEffect, useState} from "react";
import ListViewFilm from "./listViewFilm";
import GridViewFilms from "./gridViewFilm";


export default function AllFilms({listView, gridView}) {
    function allFilms() {
        let films = []
        for (let i = 0; i < localStorage.length; i++) {
            let key = Object.keys(localStorage);
            if (key[i]==='update'){
                continue
            }
            films.push(JSON.parse(localStorage.getItem(key[i])))
        }
        return films
    }

    const [films, setFilms] = useState([])

    useEffect(function () {
        setTimeout(function () {
            setFilms(allFilms())
        }, 1000)
    })

    return (
        <div>
            <div className={gridView}>
                <div className='p-4 row'>
                    {films.map((film) => {
                        return <GridViewFilms name={film.name} explain={film.explain} year={film.year}
                                              picture={film.picture}/>
                    })}
                </div>
            </div>

            <div className={listView}>
                {films.map((film) => {
                    return <ListViewFilm name={film.name} explain={film.explain} year={film.year}
                                         picture={film.picture}/>
                })}
            </div>
        </div>
    )
}
