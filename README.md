# CCP-Social-Credit-discord
A simple bot that mocks the CCP's Social credit system. - Now rewritten in Javascript!

DISCLAIMER: The terms in the "good" and "bad" field here are meant to mock the CCP and in no way reflect the views of the author
## Docker
```
mkdir ~/cpp (We need a path for .env and data.json so it's persistent)
docker pull 0xgingi/ccp-social-credit-discord:latest
docker run -d --name ccp --restart=always -v ~/ccp:/app/config 0xgingi/ccp-social-credit-discord:latest
```

## Installation (Ubuntu Server):
```
git clone https://github.com/0xGingi/CCP-Social-Credit-discord
```
```
cd CCP-Social-Credit-discord
npm i
```
Add Your Discord Bot Secret Token and your Discord ID:

(To get your Discord ID, enable developer mode in advanced settings then right click your name and copy ID)
```
cd config
mv .example.env .env
nano .env 
```
Now invite the discord bot to your server and give basic permissions needed to read/send messages
```
node index.js
```
## Systemd service to autostart bot
```
sudo nano /etc/systemd/system/china.service
```
```
[Unit]
Description=social credit score

[Service]
Type=simple
Restart=always
User=user
Group=user
WorkingDirectory=/home/user/CCP-Social-Credit-discord
ExecStart=/usr/bin/node /home/user/CCP-Social-Credit-discord/index.js

[Install]
WantedBy=multi-user.target
```
Replace user and group with your username and change the workingdirectory and execstart with your locations
```
sudo systemctl enable --now china
```
