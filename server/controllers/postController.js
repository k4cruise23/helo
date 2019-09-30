// module.exports = {
//     getPosts: async (req,res) => {
//         const db = req.app.get('db')
//         let {user_id, search, userposts} = req.query
//         if(userposts === "false" && search === "") {
//             let posts = await db.get_posts()
//             res.status(200).send(posts)
//             return
//         }
//         else if (userposts === "true" && search === "") {
//             let posts = await db.get_other_posts([user_id])
//             res.status(200).send(posts)
//             return
//         }
//         else if (userposts === "false" && search !== "") {
//             search = search.toLowerCase()
//             let posts = await db.search_posts(["%" + search + "%"])

//             res.status(200).send(posts)
//             return
//         }
//         else if(userposts === "true" && search !== "") {
//             let posts = await db.search_others([user_id, "%" + search + "%"])
//             res.status(200).send(posts)
//             return
//         }
//     },
//     post: async (req,res) => {
//         const {author_id, author, title, img, content} = req.body
//         const db = req.app.get('db')
//         let newpost = await db.add_post({author_id, author, title, img, content})
//     }
//     }

const getPost = async (req, res) => {
    let {id} = req.params
    const db = req.app.get('db')
    const foundPost = await db.get_post([id])
    req.session.currentpost = id
    return res.status(200).send(foundPost[0])
}

const getPosts = async (req, res) => {
    const db = req.app.get('db')
    const foundPosts = await db.get_all_posts()
    console.log("here")
    console.log(req.session.user)
    return res.status(200).send({allPosts:foundPosts, user:req.session.user})
}

const addPost = async (req, res) => {
    let {id, title, imageURL, content} = req.body
    const db = req.app.get('db')
    const updatedPosts = await db.add_post([id, title, imageURL, content])
    return res.status(200).send(updatedPosts)
}

module.exports = {
    getPost,
    getPosts,
    addPost
}

