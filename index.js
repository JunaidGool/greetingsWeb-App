const express = require('express');
const exphbs  = require('express-handlebars');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');

//setup express app
const app = express();

//connect to MongoDB
// mongoose.connect('mongodb://localhost/greetingsdatabase');

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/test";
mongoose.connect(mongoURL);
// mongoose.connect('mongodb://JunaidGool:Jun11051979@ds121171.mlab.com:21171/greetings-app');
mongoose.Promise = global.Promise;


app.use(bodyParser.json());

// static files
app.use(express.static('assets'));

//initialise routes
app.use(routes);

//error handling
app.use(function(err, req, res, next){
  res.status(422).send({error: err.message});
});

// set the view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var port = process.env.PORT || 3000;

//listen to port
app.listen(port, function(){
  console.log('LISTENING ON PORT ' + port);

});
