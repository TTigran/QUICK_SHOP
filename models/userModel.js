const mongoose = require('mongoose');

var  Users  = mongoose.model('Users',{

  name:    {type:String},
  surname: {type:String},
  role:    {type:String},
  email:    {type:String},
  password : {type:String}

});

module.exports = { Users };

console.log('Model');
