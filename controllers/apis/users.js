const router = require('express').Router();
const jwt = require("jsonwebtoken");

const { User } = require('../../models');



router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        where: {
            username,
        }
    });

    if (!user) {
        res.status(401).end('User not found');
        return;
    }

    if (user.password !== password) {
        res.status(401).end('Password did not match');
        return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);

    res.cookie('logintoken', token, { httpOnly: true });


    res.end();
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        where: {
            username,
        }
    });

    if (user) {
        res.status(409).end('User already exists');
        return;
    }

    const newUserObject = await User.create({
        username,
        password,
    });

    res.status(200).json({
        id: newUserObject.id,

    });
})

module.exports = router;
