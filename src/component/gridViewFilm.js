import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Link} from "react-router-dom";
import {deleteFilm} from "../api/api";

export default function GridViewFilms({name, year, explain, picture}) {
    localStorage.removeItem('update')
    const [open, setOpen] = useState(false)


    function onClose() {
        setOpen(false)
    }

    function onUpdate() {
        let film = {name: name, constructionYear: year, explains: explain, picture: picture}
        localStorage.setItem('update',JSON.stringify(film))
    }

    function showDialog() {
        setOpen(true)
    }

    function onDelete() {
        setOpen(false)
        deleteFilm(name)
    }

    return (
        <>
            <div className='col-3 rounded-3 my-4 mx-5  p-4 lightDak pointer' onClick={showDialog}>
                <h3 className='text-light'> {name} </h3>
                <img className='container' src={picture}/>
                <br/><br/>
                <div className='row'>
                    <h4 className='col-auto text-light'>Construction year :</h4>
                    <h3 className='col-auto text-light'> {year}</h3>
                    <p className='text-light'>{explain}</p>
                </div>
                <br/>
            </div>
            <br/><br/>
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

        </>
    )
}