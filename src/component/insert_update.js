import React, {useEffect, useState} from "react";
import {insertFilm, updateFilm} from "../api/api";
import {Link} from "react-router-dom";


let filmName
let image
export default function InsertUpdate() {
    const [isForUpdate, setIsForUpdate] = useState(false)
    const [selectedImage, setSelectedImage] = useState("");
    const [name, setName] = useState('')
    const [year, setYear] = useState("")
    const [explain, setExplain] = useState('')


    let film = localStorage.getItem('update')

    function update() {
        if (film !== null) {
            setIsForUpdate(true)
            localStorage.removeItem("update")
            film = JSON.parse(film);
            filmName = film.name
            image = film.picture
            setName(film.name)
            setYear(film.constructionYear)
            setExplain(film.explains)
        }
    }

    useEffect(function () {
        setTimeout(function () {
            update()
        }, 1000)
    })


    function onNameChange(event) {
        setName(event.target.value)
    }

    function onChangeYear(event) {
        setYear(event.target.value)
    }

    function onChangeExplain(event) {
        setExplain(event.target.value)
    }

    function changeFile(event) {
        setSelectedImage(event.target.files[0])
        image = null
    }

    function onclick() {
        const formData = new FormData();
        let url = "https://api.cloudinary.com/v1_1/db2b5f2bi/image/upload"
        let xmlHttpRequest = new XMLHttpRequest()
        formData.append("upload_preset", "ahtnna9v")
        if (selectedImage&& !isForUpdate) {
            formData.append("file", selectedImage)
            xmlHttpRequest.open("POST", url, true)
            if (!isForUpdate) {
                xmlHttpRequest.onload = function () {
                    if (xmlHttpRequest.status === 200) {
                        let u = JSON.parse(xmlHttpRequest.responseText)
                        insertFilm(name, year, explain, u.url)
                    } else {
                        console.log(xmlHttpRequest.status)
                    }
                }
                xmlHttpRequest.send(formData)
            }
        } else if (isForUpdate) {
            if (selectedImage)
                formData.append("file", selectedImage)
            else
                formData.append("file", image)
            xmlHttpRequest.open("POST", url, true)
            xmlHttpRequest.onload = function () {
                if (xmlHttpRequest.status === 200) {
                    let u = JSON.parse(xmlHttpRequest.responseText)
                    updateFilm(filmName, name, year, explain, u.url)
                } else {
                    console.log(xmlHttpRequest.status)
                }
            }
            xmlHttpRequest.send(formData)
        } else {
            alert("no image selected")
        }
    }

    return (
        <div className='col customDark'>
            <div className='row'>
                <div className='col-4'/>
                <div className='col-4 img  '>
                    <img className='w-100 h1 bg-primary'
                         src='https://www.newscaststudio.com/wp-content/uploads/2019/09/peacock-logo.jpg'/>
                </div>
            </div>
            <br/><br/>
            <h3 className='row text-warning p-4 h2  mx-4 my-4'>Add New Film</h3>
            <form className='row text-center p-4 h2 lightDak mx-5 my-4'>
                <div className='col col-6 px-4 border-end border-light '>
                    <label className='row text-light h5 '> Film Name</label>
                    <input className='row my-1  rounded-3' type='text'
                           required='required'
                           value={name} onChange={onNameChange}/>
                    <br/>
                    <label className='row text-light h5'> Constriction Year</label>
                    <input className='row my-1  rounded-3' type='number'
                           required='required' value={year} onChange={onChangeYear}/>
                    <br/>
                    <label className='row text-light h5'> Explains</label>
                    <textarea className='row w-100 my-1  rounded-3' required='required'
                              value={explain} onChange={onChangeExplain}/>
                </div>
                <br/>
                <div className='col-6 px-4 py-2 '>
                    <label className='customDark text-light rounded-3 px-5 h4 my-4 pointer p-2'
                           htmlFor="image_uploads">Choose images </label>
                    <input className='visually-hidden' type='file' onChange={changeFile}
                           accept="image/png, image/jpeg" id="image_uploads" multiple/>
                    <br/><br/><br/><br/>
                    {selectedImage && (
                        <img alt='not fount' src={window.URL.createObjectURL(selectedImage)}/>
                    )}
                    {isForUpdate && !selectedImage && (
                        <img alt='not fount' src={image}/>
                    )}
                    {!isForUpdate && !selectedImage && (
                        <h2 className='text-danger'> No Image Selected</h2>
                    )}
                </div>
                <div className='row py-5 mx-2  col-4'/>
                <div className='row py-5  col-4'>
                    <Link to='/' type='submit'
                          onClick={onclick} className='btn btn-warning rounded-3 p-3 h3 fw-bold'> Save</Link>
                </div>
            </form>
            <br/><br/><br/><br/> <br/><br/><br/><br/>
        </div>
    )
}