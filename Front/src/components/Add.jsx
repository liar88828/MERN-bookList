import React, {useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function Add(props) {
    const [newBuku, setNewBuku] = useState({})
    const navigate = useNavigate()
    const handleChange = (e) => {
        // setNewBuku({...newBuku,[e.target.name]: e.target.value}) // cara lain
        setNewBuku(prev => ({...prev, [e.target.name]: e.target.value}))

    }

    // console.log(props.api)
    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post(props.api, newBuku)
            .then(() => {
                console.log(newBuku)
                navigate('/')
            })
    }
    return (
        <div>
            <h1>Add</h1>
            <div>
                <form                       style={{
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: 10,
                          border: '1px solid white',
                          padding: 10,
                          marginTop: 10
                      }}

                >
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
                        onClick={handleSubmit}
                        className={'addBook'}
                    >Add
                    </button>

                    <button onClick={() => navigate('/')}
                            className={'back'}
                            style={{marginTop: 10}}
                    >
                        <Link
                            className={'link'}
                            to={'/'}>back</Link>
                    </button>
                </form>
            </div>

        </div>
    );
}

export default Add;