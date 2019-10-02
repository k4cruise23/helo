
const getPost = async (req, res) => {
    let {id} = req.params
    const db = req.app.get('db')
    const foundPost = await db.get_post([id])
    req.session.currentpost = id
    return res.status(200).send(foundPost[0])
}

const getPosts = async (req, res) => {
    console.log(req.session.user)
    const db = req.app.get('db')
    const foundPosts = await db.get_all_posts()
    // console.log(foundPosts)
    return res.status(200).send(foundPosts)
}

const addPost = async (req, res) => {
    let {id, title, imageURL, content} = req.body
    const db = req.app.get('db')
    const updatedPosts = await db.add_post([id, title, imageURL, content])
    return res.status(200).send(updatedPosts)
}

const searchPost = async (req, res) => {
    console.log(req.query)
    const {userposts, search, userId} = req.query
    const db = req.app.get('db')
    if (userposts === 'true' && search === '') {
        const getAllPosts = await db.get_all_posts()
        // console.log('1', getAllPosts)
        res.status(200).send(getAllPosts)
        return
    }
    else if (userposts === 'false' && search === '') {
        const noUserPosts = await db.no_user_posts([userId])
        // console.log('2', noUserPosts)
        res.status(200).send(noUserPosts)
        return
    }
    else if ( userposts === 'false' && search !== ''){
        const postsSearched = await db.posts_searched(["%" + search + "%", userId])
        // console.log('3', postsSearched)
        res.status(200).send(postsSearched)
        return
    }
    else if (userposts === 'true' && search !== '' ){
        const searchAll = await db.search_all(["%" + search + "%"])
        // console.log('4', searchAll)
        res.status(200).send(searchAll)
        return
    }
}

module.exports = {
    getPost,
    getPosts,
    addPost,
    searchPost
}

