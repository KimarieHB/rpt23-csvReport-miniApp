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
  let data = JSON.parse(req.body['json-input']);
  toCSVFormatter(data);
  console.log(Object.values(data));
  console.log(req.body['json-input']);
  
  
  
  // res.send back the newly formatted info
  // does this go to / or a new endpoint?
  res.send('Recieved data');
})

const toCSVFormatter = (object) => {
  let header = Object.keys(object).toString();
  console.log(header);
  
}