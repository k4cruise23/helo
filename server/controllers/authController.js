const bcrypt = require('bcryptjs')


module.exports = {
async register(req, res){
    const {username, password} = req.body
    const db = req.app.get('db')
    const foundUser = await db.find_user([username])
    //does found user exist?
    if(foundUser[0]) return res.status(409).send('Sorry, username is already taken') 
    //create a salt and hash for the password
    const passwordSalt = bcrypt.genSaltSync(15)
    const passwordHash = bcrypt.hashSync(password, passwordSalt)
    //register the user
    const newUser = await db.register_user([username, `https://robohash.org/${username}.png`, passwordHash])
    console.log(newUser)
    //delete new user password
    delete newUser[0].password
    //store user info on the session
    req.session.user = newUser[0]
     //create user obj
    //  const allPosts = await db.get_all_posts()
     res.status(200).send(newUser)
},

async login(req, res) {
    const {username, password} = req.body
    // console.log('hit', username, password)
    const db = req.app.get('db')
    const foundUser = await db.find_user([username])
    //see if username exists
    // console.log(foundUser)
    if(!foundUser[0]) return res.status(409).send('Username does not exist')
    //see if user is auth
    const authPass = bcrypt.compareSync(password, foundUser[0].password)

    if(authPass) {
        //remove the password
        delete foundUser[0].password
        //store user onto the session
        req.session.user = foundUser[0]
        //create user obj
        const allPosts = await db.get_all_posts()
        res.status(200).send({allPosts, user:foundUser[0]})
        
    } else return res.status(401).send('Incorrect password')
},

 logout (req, res) {
    //destory the session
    req.session.destroy()
    res.status(200).send('user has been logged out')
},

getUser (req, res) {
    res.status(200).send(req.session.user)
}
}


