var createError = require('http-errors');
var express = require('express');
const path = require('path');

var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var orderRouter = require('./routes/order');
var app = express();

app.use(cors());
// view engine setup

app.use(logger('dev'));

const MONGODB_URL =
  'mongodb+srv://ArwaAhmed:taskprojectdb24685@projectdb.qzxes.mongodb.net/shopping_api_db?retryWrites=true&w=majority';
//deploy
//mongoose
mongoose.connect(
  process.env.MONGODB_URI ||
    MONGODB_URL ||
    'mongodb://localhost/shopping_api_db',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('connecting to DB');
  }
);

//bodyparser in express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//image
app.use(express.static(path.join(__dirname, 'productImage')));

// app.use('/', express.static(path.join(__dirname, 'client/build')));
app.use('/users', usersRouter);
app.use('/order', orderRouter);
// app.use('/products', productsRouter);
app.use('/', productsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

//deploy
// if (process.env.NODE_ENV === 'production') {
//   console.log(__dirname);
//   // app.use(express.static('client/build'));
//   app.use('/static', express.static(path.join(__dirname, 'client/build')));
//   app.get('*', (req, res) => {
//     // res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); //relative path
//     res.sendFile('index.html', { root: __dirname }, function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     });
//   });
// }
app.use('/static', express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); //relative path
  res.sendFile('index.html', { root: __dirname }, function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

//deploy
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server started successfully`);
});

module.exports = app;
