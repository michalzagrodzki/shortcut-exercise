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

const streamSample = T.stream('statuses/sample')
let streamTopic

const wss1 = new WebSocket.Server({ noServer: true });
const wss2 = new WebSocket.Server({ noServer: true });

// stream for twitter feed, sample of 10% of tweets
wss1.on('connection', function connection(ws) {
  console.log('web socket twitter feed connected')

	streamSample.on('tweet', function (tweet) {
		console.log(JSON.stringify(tweet))
	  ws.send(
	  	JSON.stringify(tweet)
	  );
	})
  ws.on('close', function close() {
    streamSample.stop();
    console.log('web socket twitter feed closed')
    wss1.close()
  })
});

// stream for twitter subject feed
wss2.on('connection', function connection(ws) {
  console.log('web socket subject feed connected')
  ws.on('message', function incoming(topic) {
    streamTopic = T.stream('statuses/filter', { track: topic })
  	streamTopic.on('tweet', function (tweet) {
			console.log(JSON.stringify(tweet))
		  ws.send(
		  	JSON.stringify(tweet)
		  );
		});
  })
  ws.on('close', function close() {
    streamTopic.stop();
    streamTopic = undefined;
    console.log('web socket twitter subject closed')
    wss2.close()
  })
});

server.on('upgrade', function upgrade(request, socket, head) {
  const pathname = request.url

  if (pathname === '/api/stream') {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request, socket);
    });
  } else if (pathname === '/api/topic') {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit('connection', ws, request, socket);
    });
  } else {
    socket.destroy();
  }
  
});

server.listen(3333, () =>
  console.log('Local server is running on localhost:3333')
);
