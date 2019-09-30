require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env
const authCtrl = require('./controllers/authController')
const postCtrl = require('./controllers/postController')

const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))


//Auth endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)

//post endpoints
app.get('/api/post/getAll', postCtrl.getPosts)
app.get('/api/post/:id', postCtrl.getPost)
app.post('/api/post/add', postCtrl.addPost)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} ducks marching in Rome`))
})