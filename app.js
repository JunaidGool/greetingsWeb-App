'strict'
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
// create modules for controller
var myGreetingsController = require('./controllers/greetingsController');
// create Express 4 App
var app = express ();
// static files
app.use(express.static('assets'));


//fire controller
myGreetingsController(app);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// set the view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//listen to port
app.listen('3000');
console.log('LISTENING ON PORT 3000');
