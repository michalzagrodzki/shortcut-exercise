const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const http = require("http");
const Twit = require('twit');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json({ extended: false }));

var T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000,
  strictSSL: true,
});

let streamSample;
let streamTrack;

const twitterStreamSocketServer = new WebSocket.Server({ noServer: true });
const twitterTrackSocketServer = new WebSocket.Server({ noServer: true });

// stream for twitter feed, sample of 10% of tweets
twitterStreamSocketServer.on('connection', function connection(ws) {
  console.log('web socket twitter feed connected');
  streamSample = T.stream('statuses/sample')
	streamSample.on('tweet', function (tweet) {
		console.log(JSON.stringify(tweet));
	  ws.send(
	  	JSON.stringify(tweet)
	  );
	});
  ws.on('close', function close() {
    streamSample.stop();
    streamSample = undefined;
    twitterStreamSocketServer.close()
    console.log('web socket twitter feed closed')
  });
});

// stream for twitter track feed
twitterTrackSocketServer.on('connection', function connection(ws) {
  console.log('web socket subject feed connected');
  ws.on('message', function incoming(topic) {
    streamTrack = T.stream('statuses/filter', { track: topic })
  	streamTrack.on('tweet', function (tweet) {
			console.log(JSON.stringify(tweet));
		  ws.send(
		  	JSON.stringify(tweet)
		  );
		});
  })
  ws.on('close', function close() {
    streamTrack.stop();
    streamTrack = undefined;
    twitterTrackSocketServer.close();
    console.log('web socket twitter track closed');
  })
});

server.on('upgrade', function upgrade(request, socket, head) {
  const pathname = request.url;

  if (pathname === '/api/stream') {
    twitterStreamSocketServer.handleUpgrade(request, socket, head, function done(ws) {
      twitterStreamSocketServer.emit('connection', ws, request, socket);
    });
  } else if (pathname === '/api/topic') {
    twitterTrackSocketServer.handleUpgrade(request, socket, head, function done(ws) {
      twitterTrackSocketServer.emit('connection', ws, request, socket);
    });
  } else {
    socket.destroy();
  }
  
});

server.listen(3333, () =>
  console.log('Local server is running on localhost:3333')
);
