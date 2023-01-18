import {useState} from 'react'
import './App.css'
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Books from "./components/Books.jsx";
import Add from "./components/Add.jsx";
import Update from "./components/Update.jsx";


function App() {
    const api = 'http://localhost:8880/books'

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Books api={api}/>}/>
                    <Route path={'add'} element={<Add api={api}/>}/>
                    <Route path={'update/:id'} element={<Update api={api}/>}/>
                    <Route path={'*'} element={<div><h1>wrong</h1></div>}/>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default App
