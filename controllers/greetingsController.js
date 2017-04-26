module.exports = function(app){
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var userNames = [{name: 'Pluto', language: 'english'}, {name: 'Mickey Mouse', language: 'xhosa'}, {name:'Donald Duck', language:'zulu'}];
var duplicates = [];
var count = 0;

  app.get('/', function(req,res){

    res.redirect('/home');
  });

  app.get('/home', function(req,res){

    res.render('home');
  });

  app.get('/greet', function(req,res){

    res.render('greet');

  });

  app.post('/greet', urlencodedParser , function(req,res){
    var inputName = req.body.inputName ;
    var languageInput = req.body.languages ;

    if (languageInput === 'Hello' && inputName.length > 0 ){

    console.log(userNames);
  }
  else if (languageInput === 'Sawubona' && inputName.length > 0 ){

    console.log(userNames);
  }
  else if (languageInput === 'Molo' && inputName.length > 0 ){

    console.log(userNames);
  } else if (languageInput === 'Hallo' && inputName.length > 0 ){


    console.log(userNames);
  } else {
    console.log("invalid");
  };

    userNames.push({name: inputName, language: languageInput});



    count++;

    console.log(count);

    res.render('greet' , {nameOutput: inputName, languageOutput: languageInput, greetCountOutput: count});

  });


  app.get('/usersGreeted', function(req,res){



    res.render('usersGreeted', {usersGreetedOutput: userNames});

  });


};
