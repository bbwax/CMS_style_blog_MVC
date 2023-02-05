const { Router } = require("express");

const auth = require('../middleware/auth');
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

module.exports = pathRouter;