const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/api/test', (req, res) => {
  const name = req.query.name;
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ message: 'test message' }));
});

app.listen(3333, () =>
  console.log('Local server is running on localhost:3333')
);