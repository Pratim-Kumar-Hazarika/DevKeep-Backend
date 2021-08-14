require('dotenv').config()
const express = require('express')
const app = express();
const port = 3000
const cors = require("cors")
const bodyParser = require('body-parser');
const { initializeDbConnection} = require("./dbconnection/db.connection.js");
const {errorHandler} = require("./middlewares/errorHandler")
const {routeHandler} = require("./middlewares/routeHandler")
const userRouter = require("./routes/user.router");

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));


app.use(cors())
initializeDbConnection()

app.get('/', (req, res) => {
  res.json('DevKeep server running..')
});

app.use("/user",userRouter)
app.use(errorHandler)
app.use(routeHandler)

app.listen(process.env.PORT || port, () => {
  console.log(`Server started at port ${port}!`)
});