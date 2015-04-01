var express = require('express'),
    bodyParser = require('body-parser'),
    mailgunner = require('./routes/mailgunner');

var app = express();

//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', mailgunner); //This is our route middleware

module.exports = app;
