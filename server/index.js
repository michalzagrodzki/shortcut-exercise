const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const http = require("http");
const Twit = require('twit')

require('dotenv').config()

const app = express();
const server = http.createServer(app)

app.use(bodyParser.json({ extended: false }));

var T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000,
  strictSSL: true,
})

const stream = T.stream('statuses/sample')

const wss1 = new WebSocket.Server({ noServer: true });
const wss2 = new WebSocket.Server({ noServer: true });

// stream for twitter feed, sample of 10% of tweets
wss1.on('connection', function connection(ws) {
  console.log('web socket twitter feed connected')
	console.log(ws)

	stream.on('tweet', function (tweet) {
		console.log('printing tweet: ')
		console.log(JSON.stringify(tweet))
	  ws.send(
	  	JSON.stringify(tweet)
	  );
	})
});

// stream for twitter subject feed
wss2.on('connection', function connection(ws) {
  console.log('web socket subject feed connected')
});

server.on('upgrade', function upgrade(request, socket, head) {
  const pathname = request.url

  if (pathname === '/api/feed') {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request);
    });
  } else if (pathname === '/') {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
  
});

server.listen(3333, () =>
  console.log('Local server is running on localhost:3333')
);
