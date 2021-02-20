var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var UserRouter = require('./api/user');
var AdminRouter = require('./api/admin/admin');
var CategoryRouter = require('./api/category');
var ProductRouter = require('./api/product');
var CartRouter = require('./api/cart');
var initialDataRouter = require('./api/admin/initialData');
var pageRouter = require('./api/admin/page');
var addressRouter = require('./api/address');
var orderRouter = require('./api/order');
var OrderAdminRouter = require('./api/admin/order.admin');
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, '/public/uploads')));

// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin","*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept,Authorization"
//   );
//   res.header('Access-Control-Allow-Methods','GET,PUT,PATCH,POST,DELETE,OPTIONS');
//   next();
// });
app.use(cors());

app.use('/api', UserRouter);
app.use('/api',AdminRouter);
app.use('/api',CategoryRouter);
app.use('/api',ProductRouter);
app.use('/api',CartRouter);
app.use('/api',initialDataRouter);
app.use('/api',pageRouter);
app.use('/api',addressRouter);
app.use('/api',orderRouter);
app.use('/api',OrderAdminRouter);



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
  // res.render('error');

  res.status(404).json({
    error:"Page Not  Found"
  })

  res.status(500).json({
    error: "Internal Server Error"
  })


});

module.exports = app;
