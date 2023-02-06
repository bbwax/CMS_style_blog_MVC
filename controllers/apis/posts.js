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
        userId: req.user.id,
    });

    res.json({
        id: post.id,
    });

});

postsRouter.delete('/:id/delete', auth, async (req, res) => {
    try {
        const postData = await Post.destroy({
          where: { id: req.params.id }
        });
        if (!postData) {
          res.status(404).json({ message: 'No post with this id!' });
          return;
        }
        res.status(200).json(tripData);
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = postsRouter;