const express = require("express");
const bodyParser = require("body-parser");

const consign = require("consign");

const multiparty = require("connect-multiparty");

const expressValidator = require("express-validator")
const expressSession = require("express-session")

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator())
app.use(expressSession({
    secret:"bacKCRORJnh7777porUJ",
    resave: false,
    saveUninitialized: false
}))
app.use(multiparty());

consign()
    .include("app/routes")
    .then("config/dbConnection.js")
    .then("app/models")
    .then("app/controllers")
    .into(app);
    
module.exports = app;



