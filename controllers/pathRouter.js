const { Router } = require("express");

const auth = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');
const Post = require('../models/Post');
const { post } = require("./apis/users");

const pathRouter = new Router();

pathRouter.get('/', auth, async (req, res) => {
    
    const plainUser = req.user.get({ plain: true});

    const posts = await Post.findAll({
        where: {
            creator_id: req.user.id,
        },
    });

    const plainPosts = posts.map((post) => post.get({plain: true}));

    res.render('home', {
        user: plainUser,
        posts: plainPosts
    });
    
    
});

pathRouter.get('/login', (req, res) => {
    res.render('login');
});

pathRouter.get('/post/:id', optionalAuth, async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if(!post){
        res.status(404).end('Post no longer exist.');
        return;
    }
    const plainPost = post.get({simple: true})

    res.render('post', {
        post: plainPost,
        isCreator: req.user?.id === post.creator_id,
        isLoggedIn: !!req.user,
    });

});

module.exports = pathRouter;