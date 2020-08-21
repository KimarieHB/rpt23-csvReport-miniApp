const express = require('express');
const path = require('path');
const app = express();
const logger = require('morgan');
const parser = require('body-parser');
const port = process.env.PORT || 3000;;

app.use(logger('dev'));
app.use(parser.urlencoded( {extended: false} ));

app.use(express.static('client'));

app.listen(port, () => {
  console.log(`Listening at localhost ${port}`);
})

// Test
app.get('/test', (req, res) => {
  res.send('Server is serving!');
})

app.post('/json_input', (req, res) => {
  console.log(req.body);
  console.log(req.headers);
  res.send('Recieved data');
})