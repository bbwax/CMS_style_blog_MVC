const { Router } = require('express');

const usersRouter = new Router();

usersRouter.post("/login", (req, res) => {
    console.log(req.body);

    res.end();
});

module.exports = usersRouter;
