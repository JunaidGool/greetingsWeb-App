const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create greetings Schema and model
const GreetingSchema = new Schema({
  name:{
    type: String,
    required: [true, 'Name Field Is Required']
  },

  counter:{
    type: Number,
  }
});

//unique index
GreetingSchema.index({name : 1}, {unique : true});

const Greeting = mongoose.model('greeting', GreetingSchema);
module.exports = Greeting;
