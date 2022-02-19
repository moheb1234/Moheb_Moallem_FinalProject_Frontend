import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Link} from "react-router-dom";
import {getForUpdate, setForUpdate} from "../update/updateFilm";

export default function MyDialog({show}) {

    function onClose() {
        show = false
    }


    return (
        <div className='w-50'>
            <Dialog open={show} onClose={onClose}>
                <DialogTitle>
                    action
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        select the action that you want
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className='btn btn-danger' onClick={onClose}> Delete</button>
                    <Link to={'/insert'} className='btn btn-primary px-3'> Edit</Link>
                </DialogActions>
            </Dialog>
        </div>
    )
}