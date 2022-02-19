import {BrowserRouter as ReactRouter, Routes, Route,} from 'react-router-dom'
import React from "react";
import View from "../component/view";
import InsertUpdate from "../component/insert_update";

export default function Router() {
    return (
        <ReactRouter>
            <Routes>
                <Route path='/' element={<View/>}/>>
                <Route path='/insert_update' element={ <InsertUpdate/>}/>
            </Routes>
        </ReactRouter>
    )
}