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
  let csvObj = {
    tableHeaders: null,
    tableRows: []
  };
  // data is string, fool!
  let data = req.body['json-input'];
  let newData = JSON.stringify(data);
  newData = parser.json(newData);
  console.log(newData);
  
  console.log(req.body['json-input']);
  // res.send back the newly formatted info
  // page shows csv table and input form (ready for new input)
  // use res.write for this?

  // does this go to / or a new endpoint?
  res.send('Recieved data');
})