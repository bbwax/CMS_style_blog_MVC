require("dotenv").config();
const express = require("express");

const { engine } = require('express-handlebars');

const cookieParser = require('cookie-parser');

const sequelize = require('./config/connection');

const mainRouter = require("./controllers");

const helpers = require('./utils/helpers');

const app = express();

const PORT = process.env.PORT || 3001;

app.engine('handlebars', engine({helpers}));
app.set('view engine', 'handlebars');

app.use(express.json());

app.use(cookieParser());

app.use(mainRouter);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("Listening on http://localhost:" + PORT);
    
    });
});


