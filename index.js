const express = require('express')
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('DevKeep server running..')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});