const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res){
        const db = req.app.get('db')
        const {username, password} = req.body
        const user = await db.find_username(username)
        if (user[0]) return res.status(200).send({message: 'Username already in use.'})
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await db.add_user([username, `https://robohash.org/${username}.png`], hash)
        delete newUser[0].password
        req.session.user = newUser[0]
        const allPosts = await db.get_posts()
        res.status(200).send({allPosts, user: user[0]})
    },
    async login(req, res){
        const {username, password} = req.body
        const db = req.app.get('db')
        const user = await db.find_username([username])
        if (!user[0]) return res.status(200).send({message: 'Username not found.'})
        const result = bcrypt.compareSync(password, user[0].hash)
        if (!result) return res.status(200).send({message: 'Incorrect passowrd.'})
        req.session.user = {username, password}
        res.status(200).send({message: 'Logged in', user: req.session.user, loggedIn: true})
    },
    logout(req, res){
        req.session.destroy()
        res.status(200).send({message: 'Logged out', loggedIn: false})
    },
    getUser(req, res){
        res.status(200).send(req.session.user)
    }
}