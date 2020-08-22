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
  
  res.send(HTMLFormatter(csvReport));
})

const toCSVFormatter = (object) => {
  let row = Object.values(object);
  row.pop();
  let csvReport = '\n <br>' + row.toString();

  if (object.children.length > 0) {
    for (let person of object.children) {
      csvReport += toCSVFormatter(person);
    }
  }
  return csvReport;
}

const HTMLFormatter = (csvReport) => {
  let form = 
    `<!DOCTYPE html>
      <html>
        <head>
          <title>JSON to CSV</title>
        </head>
        <body>
          <form method='POST' action='/json_input'>
              <label for='json-input'>Input JSON Text Here:</label>
              <br>
              <textarea type='text' rows='8' cols='50' id='json-input' name='json-input'></textarea>
              <br>
              <input type='submit' id='button' value='Submit'>
          </form>
          <br>
          <div id='csv-report'>
            <h2>CSV Report:</h2>
            <p>${csvReport}</p>
          </div>
        </body>
        <script src='app.js'></script>
      </html>`;

  return form;
}