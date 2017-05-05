const express = require('express');
const router = express.Router();
const Greeting = require('../models/greetings');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const assert = require('assert');



router.get('/', function(req,res){

  res.redirect('/home');
});

router.get('/home', function(req,res){

  res.render('home');
});


router.get('/greet', function(req,res){
  Greeting.distinct('name', function(err, usersGreeted){
    console.log(usersGreeted)
  if (err){
    return next(err);
  }
  console.log(usersGreeted.length);
    res.render('greet', {greetCountOutput: usersGreeted.length});

    });
});

var manageGreeting = function(userName, cb){
  Greeting.findOne({name: userName}, function(err, user){
    if (err){
      console.log("manageGreeting Error")
      return cb(err);
    }
    if (user){
      Greeting.update({name: userName}, {counter : user.counter + 1}, cb);
    }
    else{
      Greeting.create({name: userName, counter : 1},  cb);
    }
  });
};



var getMessage = function(language, name){

  if (language === 'Eng'){
    return "Hello, " + name;
  }
  else if (language === 'Afr'){
    return "Hallo, " + name;
  }
  else if (language === 'Xho'){
    return "Molo, " + name;
  }
  else if (language === 'Zul'){
    return "Sawubona, " + name;
  }
};

//greet a new user in requested language and add to database
router.post('/greet', urlencodedParser, function(req, res, next){
  var inputName = req.body.inputName ;
  var languageInput = req.body.language ;
  var message = getMessage(languageInput, inputName);

    manageGreeting(inputName, function(err, result){
      console.log(err);

      if (err){
        console.log("ERROR");
        return next(err);
      }
      Greeting.find({}, function(err, usersGreeted){
      if (err){
        return next(err);
      }
      console.log(usersGreeted.length);

        res.render('greet', {languageOutput: message, greetCountOutput: usersGreeted.length});
  });

  });
});

router.get('/usersGreeted', function(req, res, next){
  // find and display list of all users greeted
  Greeting.find({}, function(err, usersGreeted){

    if (err){
      return next(err);
    }

    console.log(usersGreeted.length);
    res.render('usersGreeted', {usersGreeted, greetCountOutput: usersGreeted.length});

  });

});

module.exports = router
