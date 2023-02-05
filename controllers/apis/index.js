const { Router } = require("express");

const usersRouter = require('./users');
const postsRouter = require('./posts');
const commentsRouter = require('./comments');

const apiRouter = new Router();

apiRouter.use('/user', usersRouter);
apiRouter.use('/post', postsRouter);
apiRouter.use('/comment', commentsRouter);

module.exports = apiRouter;

