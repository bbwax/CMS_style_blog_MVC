const User = require('../models/User');
const jwt = require('jsonwebtoken');


module.exports = async (req, res, next) => {
    const { logintoken } = req.cookies;


    try{
        const data = jwt.verify(logintoken, process.env.JWT_KEY);

        const {id} = data;
        const user = await User.findByPk(id);
        if (!user){
            next();
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        console.log('optional auth', error)
        if (error.message === "invalid token"){
            next();
        } else {
            res.status(500).end("Page Broken :(");
        }
    }
}