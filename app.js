var express = require('express');
var path = require('path');
var app = express();
var http = require('http')
var https = require('https')
var fs = require('fs')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./routes/index.js')(app);

app.use(express.static('public'))





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});






http.createServer(app).listen(process.env.PORT||3000);
/*const options = {
  key: fs.readFileSync('keys/key.pem'),
  cert: fs.readFileSync('keys/cert.pem')
};

https.createServer(options, app).listen(443);*/