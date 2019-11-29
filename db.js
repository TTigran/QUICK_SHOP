const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/mydb';
mongoose.connect(url,(err)=>{
    if(!err){
        console.log("MongoDB connection succeseed");
    }else{
        console.log("Error"+JSON.stringify(err,undefined,2))
    }

});

module.exports = mongoose;
