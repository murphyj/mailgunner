server {

  listen 80;
  server_name mailgun.example.com;

  access_log /var/log/nginx/mailgun.example.com.log;

  location /.well-known {
    root /var/www/mailgunner;
  }

  location / {
    proxy_pass http://127.0.0.1:3030;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  # return 301 https://$server_name$request_uri;
}


# server {

#  listen 443 ssl;
#  server_name mailgun.example.com;

#  access_log /var/log/nginx/mailgun.example.com.log;

#  location / {
#    proxy_pass http://127.0.0.1:3030;
#    proxy_http_version 1.1;
#    proxy_set_header Upgrade $http_upgrade;
#    proxy_set_header Connection 'upgrade';
#    proxy_set_header Host $host;
#    proxy_cache_bypass $http_upgrade;
#  }

#  ssl on;

#  ssl_certificate /etc/letsencrypt/live/mailgun.example.com/cert.pem;
#  ssl_certificate_key /etc/letsencrypt/live/mailgun.example.com/privkey.pem;

#  ssl_stapling on;
#  ssl_stapling_verify on;
#  ssl_trusted_certificate /etc/letsencrypt/live/mailgun.example.com/fullchain.pem;

#  ssl_session_timeout 5m;

#}
