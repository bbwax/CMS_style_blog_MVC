const {Router} = require('express');

const auth = require('../../middleware/auth');

const Post = require('../../models/Post');

const postsRouter = new Router();

postsRouter.post('/', auth, async (req, res) => {
    const { title, content} = req.body;
    const date_created = new Date();

    const post = await Post.create({
        title,
        content,
        date_created,
        creator_id: req.user.id,
    });

    res.json({
        id: post.id,
    });

});



module.exports = postsRouter;