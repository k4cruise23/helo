require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env

const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} ducks marching in Rome`))
})