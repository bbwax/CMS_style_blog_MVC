const { Router } = require("express");

const usersRouter = require('./users');
const postsRouter = require('./posts');

const apiRouter = new Router();

apiRouter.use('/user', usersRouter);
apiRouter.use('/post', postsRouter);

module.exports = apiRouter;

