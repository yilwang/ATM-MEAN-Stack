const createError = require('http-errors');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const Customer = require('./models/user.model');
const angularDirectory = 'dist/atm';
const apiRoutes = require('./routes/api');



const app = express();
app.use(compression());
app.use(cors());

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;
const DB_URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
mongoose.connect(DB_URL);
mongoose.connection.on('connected', () =>{
  console.log("MongoDB conntected successfully.");
});
mongoose.connection.on('error', () =>{
  console.log("MongoDB is not conntected.")
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, angularDirectory)));

app.use('/api', apiRoutes);

app.use('/', function (req, res) {
  res.status(200).sendFile('/',{root: angularDirectory});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8080,() => console.log("Server listening on Port 8080!"));
module.exports = app;

