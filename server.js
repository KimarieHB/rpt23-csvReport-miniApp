const express = require('express');
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

app.get('/json_input', (req, res) => {
  res.send('Server is serving!');
})

app.post('/json_input', (req, res) => {
  let data = JSON.parse(req.body['json-input']);

  let csvReport = '';
  let row = Object.keys(data);
  row.pop();
  csvReport += row.toString();
  
  csvReport += toCSVFormatter(data);
  console.log(csvReport);
  
  res.send(csvReport);
})

const toCSVFormatter = (object) => {
  let row = Object.values(object);
  row.pop();
  let csvReport = '\n' + row.toString();

  if (object.children.length > 0) {
    for (let person of object.children) {
      csvReport += toCSVFormatter(person);
    }
  }
  return csvReport;
}