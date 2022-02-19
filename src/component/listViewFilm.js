import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Link} from "react-router-dom";
import {deleteFilm} from "../api/api";


export default function ListViewFilm({name, year, explain, picture}) {
    localStorage.removeItem('update')
    const [open, setOpen] = useState(false)

    function onClose() {
        setOpen(false)
    }

    function onUpdate() {
        let film = {name: name, constructionYear: year, explains: explain, picture: picture}
        localStorage.setItem('update', JSON.stringify(film))
    }

    function showDialog() {
        setOpen(true)
        // let film = {name: name, constructionYear: year, explains: explain, picture: picture}
    }

    function onDelete() {
        setOpen(false)
        deleteFilm(name)
    }

    return (
        <div className='row '>
            <div className='col-1 '/>
            <div className='col-10 p-4 rounded-3  row m-2 lightDak pointer ' onClick={showDialog}>
                <img src={picture} className='col-2 '/>
                <div className='col-8'>
                    <h2 className='row text-light'> {name}: {year}</h2>
                    <p className='row text-light '> {explain}</p>
                </div>
            </div>
            <div className='col-1 '/>
            <br/>

            <div className='w-50'>
                <Dialog open={open} onClose={onClose}>
                    <DialogTitle>
                        action
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            select the action that you want
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button className='btn btn-danger' onClick={onDelete}> Delete</button>
                        <Link to={'/insert_update'} className='btn btn-primary px-3' onClick={onUpdate}> Edit</Link>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )

}