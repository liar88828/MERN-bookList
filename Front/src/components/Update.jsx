import React, {useState} from 'react';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function Update(props) {
    const [editBuku, setEditBuku] = useState({})
    const navigate = useNavigate()
    const location = useLocation()
    //--------------untuk mengampil params---------------------------------------------
    // bisa menggunakan ini tapi tidak efisien
    const bookid = location.pathname.split('/')[2]

    const id = useParams() // lebih efisien
    // console.log("book: " + bookid, id)
    //-------------------------------------------------------------------------

    const handleChange = (e) => {
        // setNewBuku({...newBuku,[e.target.name]: e.target.value}) // cara lain
        setEditBuku(prev => ({...prev, [e.target.name]: e.target.value}))

    }

    console.log(props.api)
    const handleUpdate = async e => {
        e.preventDefault()
        await axios.put(props.api + '/' + bookid, editBuku)
            .then(() => {
                console.log(editBuku)
                navigate('/')
            })
    }
    return (
        <div>
            <h1>Edit</h1>
            <div>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid white',
                        padding: 10,
                        marginTop: 10
                    }}>
                    <label>Title</label>
                    <input type="text"
                           name={'title'}
                           placeholder={"title..."}
                           onChange={handleChange}/>

                    <label>Detail</label>
                    <input type="text"
                           name={'detail'}
                           placeholder={"detail..."}
                           onChange={handleChange}/>

                    <label>Price</label>
                    <input type="text"
                           name={'price'}
                           placeholder={"price..."}
                           onChange={handleChange}/>

                    <label>Cover</label>
                    <input type="text"
                           name={'cover'}
                           placeholder={"cover..."}
                           onChange={handleChange}/>

                    <button
                        onClick={handleUpdate}
                        style={{marginTop: 10}}
                        className={'update'}
                    >Update
                    </button>
                    <button onClick={() => navigate('/')}
                            style={{marginTop: 10}}
                            className={'back'}
                    ><Link
                        className={'link'}
                        to={'/'}>back</Link>
                    </button>
                </form>
            </div>

        </div>
    );
}

export default Update;