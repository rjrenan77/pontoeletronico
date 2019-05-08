const express = require("express");
const bodyParser = require("body-parser");

const consign = require("consign");

const multiparty = require("connect-multiparty");

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multiparty());

consign()
    .include("app/routes")
    .then("app/controllers")
    .into(app);
    
module.exports = app;



