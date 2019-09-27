require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env
const authCtrl = require('./controllers/authController')

const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))


app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/login', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} ducks marching in Rome`))
})