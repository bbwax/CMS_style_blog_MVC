const { Router } = require("express");
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const pathRouter = new Router();

pathRouter.get('/', async (req, res) => {
    const { logintoken } = req.cookies;

    try{
        const data = jwt.verify(logintoken, process.env.JWT_KEY);

        const {id} = data;
        const user = await User.findByPk(id);
        const plainUser = user.get({ plain: true});

        console.log(data);
        res.render('home', {
            user: plainUser,
        });
    } catch (error) {
        if (error.message === "invalid token"){
            res.redirect('/login');
        } else {
            res.status(500).end("Page Broken :(");
        }
    }
    
})

pathRouter.get('/login', (req, res) => {
    res.render('login');
})

module.exports = pathRouter;