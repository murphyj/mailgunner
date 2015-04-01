var express = require('express'),
    config = require('config'),
    Mailgun = require('mailgun-js');


var router = express.Router(),
    api_key = config.get('Mailgun.apiKey'),
    domain  = config.get('Mailgun.domain'),
    sender  = config.get('Mailgun.sender');

router.route('/submit/:mail').post(function(req,res) {
    console.log('submitting');
    console.log('req.body', req);

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

    console.log('Sending data', data);

    mailgun.messages().send(data, function (err, body) {
        if (err) {
            res.send('error', { error : err});
            console.log("got an error: ", err);
        }
        else {
            console.log(body);
            res.send("OK");
        }
    });
});

module.exports = router;
