#Mailgunner - A lightweight Node.js Mailgun Server

Written to act as a lightweight API companion alongside other applications.

**Example**: a perfect use-case would be when used in conjunction with a Ghost blog hosted on the same server instance. Ghost would post an ajax call to the server which acts as an API which then communicates directly with the mailgun API on your behalf.

This lightweight API could also be used as a middle-man to host your pre-configured email templates.

## Getting Started

To get up and running with the mailgunner server is really straightforward. First, make sure you have npm installed (you'll need that for working with node so I'll assume you already have node package manager installed).

You can then install mailgunner by just running the following command from the root:

```
npm install
```

Once done get pm2 (it's a process manager and it's handy for starting your app and viewing logs etc.) installed:
```
npm install -g pm2
```
You can also use forever or nodemon etc.

Before mailgunner can be started you need to setup the config. By default it's called `default.json` and is located in the `config/` directory.

Your `default.json` should contain:

```
{
  "Mailgun": {
    "apiKey": "YOUR_PRIVATE_API_KEY",
    "domain": "yourdomain.com",
    "sender": "your-email@gmail.com"
  }
}
```

Once you have that setup you should be good to start Mailgunner using pm2:

```
pm2 start bin/www.js --name mailgunner
```

You can see if it's started correctly by looking at the logs:

```
pm2 logs mailgunner
```

If it's started okay you should see something similar to this:
```
mailgunner-10 (out): Express server listening on port 3032
```

I found that the default port `3030` didn't work for me (because I already had an app running on 3030) so you can change the port by passing a `PORT` env variable when running it e.g.

```
PORT=3032 pm2 start bin/www.js --name mailgunner
```

##API

**POST** /api/submit/:mail

Parameters: _:mail_ - where you want to send the email to

Body:
```
{
	"name": "James Murphy",
	"email": "youremail@gmail.com",
	"subject": "Checking mailgunner works",
	"htmlBody": "<html><h1>Yup, looks like it works!</h1><p>This is a paragraph</p></html>"
}
```

Headers:
```
Content-Type: application/json
```

Response:
```
200 OK
```

You should be all set up now. All you need to do is copy this application and start it wherever you want a local server.

Let me know if you've got any feedback about it or feature requests!

##letsencrypt

To use with letsencrypt, run the following command from the directory where letsencrypt is installed:

    ./letsencrypt-auto certonly --webroot -w /var/www/mailgunner/ -d mailgun.example.com

Once the certificate has been generated, uncomment the relevant lines in the nginx conf for the mailgun server.

Don't forget to add a CNAME record for your domain.

To auto renew the letsencrypt certificate (they expire every three months), add the following command to your crontab:

    ./letsencrypt-auto certonly --renew --webroot -w /var/www/mailgunner/ -d mailgun.example.com

If the certificat fails to generate, you may need to manually create the `.well-known` folder in the mailgunner root directory:

    mkdir .well-known

and then add the `acme-challenge` directory:

  cd .well-known
  mkdir acme-challenge
