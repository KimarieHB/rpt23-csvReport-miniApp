const express = require('express');
const app = express();
const port = 3031;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Listening at localhost ${port}`);
})

app.get('/test', (req, res) => {
  res.send('Server is serving!');
})