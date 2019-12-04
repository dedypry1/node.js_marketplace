var express = require ('express');
var path = require ('path');
var mongoose = require('mongoose');
var config = require ('./config/database');
var bodyParser = require('body-parser');
var session = require('express-session');
var validation = require('express-validator');


mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('conected mongo DB')
});

var app = express ();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// express sesion
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
  // express message       
  app.use(require('connect-flash')());
  app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
  });

  // expres validation
  app.use(validation());

app.set('views',path.join(__dirname,'views'));
app.set ('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

// set global error variable
app.locals.errors = null;

var Page = require ('./models/pages');
var pages = require ('./routes/pages.js');
var pagesadmin = require ('./routes/admin_pages.js');
var catadmin = require ('./routes/admin_categories.js');

app.use ('/', pages);
app.use ('/admin', pagesadmin);
app.use ('/admin/categories', catadmin);

var port = 3000;
app.listen(port,function() {
    console.log('aplikasi sukse berjalan di port'+ port )
})