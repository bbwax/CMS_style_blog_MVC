const { Router } = require("express");

const auth = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');
const {Post, Comment, User} = require('../models');
const { post } = require("./apis/users");

const pathRouter = new Router();

pathRouter.get('/', auth, async (req, res) => {
    if(!req.user){
        res.render('home', {
            user: null,
            posts: [],
            isLoggedIn: !!req.user,
            
        });
        return;
    }
    const plainUser = req.user.get({ plain: true});

    const posts = await Post.findAll({
        // where: {
        //     userId: req.user.id,
        // },
    });

    const plainPosts = posts.map((post) => post.get({plain: true}));
    //console.log("plain user", plainUser);
    const userPosts = await Promise.all(plainPosts.map(async (pp)=>{
        const user = await User.findByPk(pp.userId);
        const pUser = user.get({plain:true});
        return {user:pUser,post:pp};
    }));

    res.render('home', {
        user: plainUser,
        posts: userPosts,
        isLoggedIn: !!req.user,
    });
    
    
});

pathRouter.get('/profile', auth, async (req, res) => {
    if(!req.user){
        res.render('login', {
            user: null,
            posts: [],
            isLoggedIn: !!req.user,
            
        });
        return;
    }
    
    const plainUser = req.user.get({ plain: true});

    const posts = await Post.findAll({
        where: {
            userId: req.user.id,
        },
    });

    const plainPosts = posts.map((post) => post.get({plain: true}));
    const userPosts = [];
    for(let i = 0; i < plainPosts.length;i++){
      
            const user = await User.findByPk(plainPosts[i].userId);
            const pUser = user.get({plain:true});
            const up =  {user:pUser,post:plainPosts[i]};
      
        userPosts.push(up)
    }
   
    console.log("plain user", plainUser);

    res.render('profile', {
        user: plainUser,
        posts: userPosts,
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


    //console.log("user comments", userComments);
    userComments = userComments.map((comment)=> comment.get({simple:true}))

    res.render('post', {
        post: plainPost,
        isCreator: req.user?.id === post.userId,
        isLoggedIn: !!req.user,
        userComments: userComments,
    });

});

pathRouter.delete('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          res.send('Logout successful')
        }
      });
    } else {
      res.end()
    }
  })

module.exports = pathRouter;