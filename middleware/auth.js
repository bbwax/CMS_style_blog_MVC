const User = require('../models/User');
const jwt = require('jsonwebtoken');


module.exports = async (req, res, next) => {
    const { logintoken } = req.cookies;

    try{
        if (!logintoken){
            next();
            return;
        }
        const data = jwt.verify(logintoken, process.env.JWT_KEY);

        const {id} = data;
        const user = await User.findByPk(id);
        if (!user){
            res.redirect('/login');
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("error",error);
        if (error.message === "invalid token"){
            res.redirect('/login');
        } else {
            //res.status(500).end("Page Broken :(");
            
            res.redirect('/login');
            
        }
    }
}