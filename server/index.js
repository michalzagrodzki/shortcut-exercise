const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const http = require("http");
const Twit = require('twit')

require('dotenv').config()

var T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000,
  strictSSL: true,
})

const wss = new WebSocket.Server({ port: 3333 });

wss.on('connection', function connection(ws) {
	console.log('connected')
  ws.on('message', function incoming(data) {
  	console.log('receiving messages')
  	console.log(data)
  	ws.send(data);
  });
  ws.send([{
  	"message": "message from server"
  }]);
});

/* 
const app = express();
app.use(bodyParser.json({ extended: false }));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

app.wss = wss

app.get('/api/feed', (req, res) => {
	console.log('server feed');
	req.app.wss.once('connection', (ws) => {
    console.info('connected:', req.app.wss.clients.size);
    ws.on('message', function incoming(data) {
	    req.app.wss.clients.forEach(function each(client) {
	      if (client.readyState === WebSocket.OPEN) {
	      	console.info(data)
	        client.send('word: ' + data);
	      }
	    });
	  });
  });
});

server.listen(3333, () =>
  console.log('Local server is running on localhost:3333')
);
*/
