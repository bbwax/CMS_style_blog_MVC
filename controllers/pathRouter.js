const { Router } = require("express");

const auth = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');
const {Post, Comment} = require('../models');
const { post } = require("./apis/users");

const pathRouter = new Router();

pathRouter.get('/', auth, async (req, res) => {
    
    const plainUser = req.user.get({ plain: true});

    const posts = await Post.findAll({
        where: {
            userId: req.user.id,
        },
    });

    const plainPosts = posts.map((post) => post.get({plain: true}));

    res.render('home', {
        user: plainUser,
        posts: plainPosts,
        isLoggedIn: !!req.user,
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
    const plainPost = post.get({simple: true});


    let userComments = [];
    //console.log("post ID", id);
    //console.log("user data", req.user);
    if (req.user) {
        userComments = await Comment.findAll({
            where: {
                postId: id,
                userId: req.user.id,
            },
        });
    }


    console.log("user comments", userComments);
    userComments = userComments.map((comment)=> comment.get({simple:true}))

    res.render('post', {
        post: plainPost,
        isCreator: req.user?.id === post.userId,
        isLoggedIn: !!req.user,
        userComments: userComments,
    });

});

module.exports = pathRouter;