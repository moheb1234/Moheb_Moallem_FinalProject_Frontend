import React, {useState} from "react";
import AllFilms from "./allFilms";
import {filterByConstructionYear, findByName, getAll} from "../api/api";
import {Link} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';

export default function View() {
    const [view, setView] = useState("list view")
    const [listView, setListView] = useState("")
    const [gridView, setGridView] = useState("visually-hidden")
    const [input, setInputValue] = useState("")

    function onChangeInput(event) {
        setInputValue(event.target.value)
    }

    function changeView() {
        if (view === "grid view") {
            setView("list view")
            setGridView("visually-hidden")
            setListView("")
        } else {
            setView("grid view")
            setListView("visually-hidden")
            setGridView("")
        }
    }

    function onclick() {
        if (isNaN(input)) {
            findByName(input)
        }
        if (!isNaN(input)) {
            filterByConstructionYear(input)

        }
        console.log(input)
    }

    function allFilms() {
        getAll()
    }

    return (
        <div className='customDark p-4'>
            <div className='row'>
                <div className='col-2 img ' >
                <img className='w-100 h1 bg-primary'
                     src='https://www.newscaststudio.com/wp-content/uploads/2019/09/peacock-logo.jpg'/>
                </div>
                <div className='col-6 py-4'>
                    <button className='pointer btn-light rounded-2 py-2 px-3 border border-dark '
                            onClick={allFilms}> All
                    </button>
                    <input type='text' placeholder='search by name or filter by construction year'
                           className='col-9 py-2 px-3 rounded-2 ' value={input} onChange={onChangeInput}/>
                    <button className='btn-primary col-auto py-2 px-4 rounded-2'
                            onClick={onclick}><i className='fa fa-search'/></button>
                </div>
                <div className='col-2 py-4'>
                    <Link to='/insert_update' className='btn btn-danger e pointer text-light py-2 px-5'>
                        Add Film</Link>
                </div>
                <div className='col-2 my-1 py-xl-4'>
                    <button className='btn-secondary py-2' onClick={changeView}>{view}</button>
                </div>
            </div>
            <br/><br/>
            <h2 className='text-warning text-center font-monospace '> Films</h2>
            <br/>
            <div className='customDark'>
                <AllFilms gridView={gridView} listView={listView}/>
            </div>
            <br/><br/>
        </div>
    )

}