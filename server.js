const express = require('express');
const app = express();
const logger = require('morgan');
const parser = require('body-parser');
const multer = require('multer')
const upload = multer({dest: 'upload/'});
const fs = require('fs');
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(parser.urlencoded( {extended: false} ));

app.use(express.static('client'));

app.listen(port, () => {
  console.log(`Listening at localhost ${port}`);
})

app.get('/test', (req, res) => {
  res.send('Server is serving!');
})

//Post for AJAX
app.post('/json_input', (req, res) => {
  let data = JSON.parse(req.body.data);

  let csvReport = '';
  let row = Object.keys(data);
  row.pop();
  csvReport += row.toString();
  csvReport += toCSVFormatter(data);
  console.log('back:', csvReport);
  res.send(csvReport);
})
/*
// Post for JSON file picker input
app.post('/json_file', upload.single('json-file'), (req, res) => {
  let csvReport = '';
  let filePath = req.file.path;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let parsedData = JSON.parse(data);
      
      let row = Object.keys(parsedData);
      row.pop();
      csvReport += row.toString();

      csvReport += toCSVFormatter(parsedData);
      res.send(filePickerFormatter(csvReport));
    }
  })
})

// Post for textarea json file input
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
*/
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

const filePickerFormatter = (csvReport) => {
  let form = 
    `<!DOCTYPE html>
    <html>
      <head>
        <title>JSON to CSV</title>
      </head>
      <body>
        <form method='POST' action='/json_file' enctype='multipart/form-data'>
            <label for='json-file'>Upload JSON File Here:</label>
            <br>
            <input type='file' id='file-picker' name='json-file'>
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