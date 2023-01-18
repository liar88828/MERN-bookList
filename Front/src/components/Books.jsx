import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function Books(props) {
    const [DBBOOKS, setDBBOOKS] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(props.api).then(res => {
            setDBBOOKS(res.data)
        })
    }, [])
    console.log(DBBOOKS)

    const handleDelete = async (id) => {
        await axios.delete(props.api + '/' + id)
            // window.location.reload() // browser meRefrest tidak efisien
            .then(() => setDBBOOKS(DBBOOKS.filter(prev => {
                return prev.id !== id
            }))) // lebih efisien  karena hanya memanipulai array
    }

    return (
        <div>
            <h1> books </h1>

            <div className={'books'}>
                {DBBOOKS.map(book => {
                    return (
                        <div className="book" key={book.id}
                             style={{
                                 border: '1px solid white',
                                 padding: 10,
                                 marginTop: 10
                             }}>
                            {book.cover && <img
                                src={book.cover}
                                alt={book.title}
                            />}
                            <h2>{book.title}</h2>
                            <p>{book.detail}</p>
                            <span>{book.price}</span>
                            <button
                                className={'delete'}
                                onClick={() => handleDelete(book.id)}
                            >Delete
                            </button>

                            <button className={'update'} onClick={() => navigate('/update/' + book.id)}>
                                <Link to={'/update/' + book.id} className={'link'}> Update</Link>
                            </button>
                        </div>
                    )
                })}
            </div>
            <button
                className={'add'}
                onClick={() => navigate('/add')}>
                <Link to={'/add'}
                      style={{color: 'white'}}
                >Add new Book</Link></button>
        </div>
    );
}

export default Books;