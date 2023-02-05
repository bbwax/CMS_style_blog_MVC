const { Router } = require('express');

const auth = require('../../middleware/auth');

const { Comment } = require('../../models');
const postsRouter = require('./posts');

const commentRouter = new Router();

commentRouter.post('/', auth, async (req, res) => {
    const { comment_text, postId } = req.body;
    //console.log("req body", req.body);

    const comment = await Comment.findAll({
        where: {
            postId: postId,
            userId: req.user.id,
        },
    });

    // if (comment) {
    //     res.status(409).end('You have already responded to this Post');
    //     return;
    // };

    const newComment = await Comment.create({
        comment_text,
        postId: postId,
        userId: req.user.id,
    });

    res.json({
        id: newComment.id,
    });

});

// postsRouter.put('/', auth, async (req, res) => {

// })

module.exports = commentRouter;
