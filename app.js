var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mailgunner = require('./routes/mailgunner');

var app = express();

//configure body-parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.send("Please send a post request");
});

app.use('/api', mailgunner); //This is our route middleware

module.exports = app;
