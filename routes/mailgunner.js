var express = require('express'),
    config = require('config'),
    Mailgun = require('mailgun-js');


var router = express.Router(),
    api_key = config.get('Mailgun.apiKey'),
    domain  = config.get('Mailgun.domain'),
    sender  = config.get('Mailgun.sender');

router.route('/').get(function(req,res) {
  res.send("Please send a post request");
});


router.route('/submit/:mail').post(function(req,res) {
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});
    var name = req.body.name,
        email = req.body.email,
        subject = req.body.subject,
        htmlBody = req.body.htmlBody;

    var sender;
    if (name !== undefined) {
      sender = name + '<' + email + '>';
    } else {
      sender = email;
    }

    var data = {
      from: sender,
      to: req.params.mail,
      subject: subject,
      html: htmlBody
    }

    mailgun.messages().send(data, function (err, body) {
        if (err) {
            res.send('error', { error : err});
            console.log("Error trying to send email: ", err);
        }
        else {
            res.send("OK");
        }
    });
});

module.exports = router;
