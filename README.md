#Mailgunner - A lightweight Node.js Mailgun Server

Written to act as a lightweight API companion alongside other applications.

**Example**: a perfect use-case would be when used in conjunction with a Ghost blog hosted on the same server instance. Ghost would post an ajax call to the server which acts as an API which then communicates directly with the mailgun API on your behalf.

This lightweight API could also be used as a middle-man to host your pre-configured email templates.

##API

**POST** /api/submit/:mail

Parameters: _:mail_ - where you want to send the email to

Body:
```
{
	"name": "James Murphy",
	"email": "developerangst@gmail.com",
	"subject": "This is a cool test",
	"htmlBody": "<html><h1>BOOM!</h1><p>This is a paragraph</p></html>"
}
```

Headers:
```
Content-Type: application/json
```
