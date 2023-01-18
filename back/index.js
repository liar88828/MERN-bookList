import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book'
})

app.use(express.json()) //agar bisa method post
app.use(cors()) // untuk menampikan pada bagian frontEnd
app.use(bodyParser.urlencoded({extended: true})) // untuk melakukan method post pada bagian frontend

app.get('/', async (req, res) => {
    res.send('is back end')
})
//-----------------------------BUKU-------------------------
// get data buku
app.get('/books', async (req, res) => {
    const q = 'SELECT * FROM books;';
    await db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })
})


//Post data buku
app.post('/books', (req, res) => {
    const q = "INSERT INTO books (title,detail,cover,price) VALUES (?,?,?,?)";

    // const w = "INSERT INTO book.books (title, detail, cover) VALUES (?, ?, ?)";
    // const title = req.body.title
    // const detail = req.body.detail
    // const cover = req.body.cover

    // const d = req.body
    // const values = [
    //     d.title,
    //     d.detail,
    //     d.cover
    // ]

    const {title, detail, cover, price} = req.body
    db.query(q, [title, detail, cover, price], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


app.delete('/books/:id', async (req, res) => {
    const q = "DELETE FROM books WHERE id = ? "
    const id = req.params.id
    await db.query(q, [id], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


app.put('/books/:id', async (req, res) => {
    const q = "UPDATE books SET title=?, detail=?, price=?, cover=? WHERE id = ? "
    const id = req.params.id
    const d = req.body
    const values = [
        d.title,
        d.detail,
        d.cover,
        d.price
    ]


    await db.query(q, [...values, id], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


//---------------------------------------------------------------


const port = 8880
app.listen(port, () => {
    console.log('port in :' + port)
})