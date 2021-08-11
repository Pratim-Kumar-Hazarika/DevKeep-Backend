require('dotenv').config()
const express = require('express')
const app = express();
const port = process.env.PORT;

const { initializeDbConnection} = require("./dbconnection/db.connection.js");

initializeDbConnection()
app.get('/', (req, res) => {
  res.send('DevKeep server running..')
});

app.listen(port, () => {
  console.log(`Server started at port ${port}!`)
});