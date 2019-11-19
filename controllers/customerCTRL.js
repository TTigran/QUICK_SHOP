 const addProfile = (req, res) => {
  console.log(
      req.body.firstname+ ' '+
      req.body.lastname+ ' '+
      req.body.phone+ ' '+
      req.body.email+ ' '+
      req.body.product
  );
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = {
      firstname:req.body.firstname,
      lastname: req.body.lastname,
      phone:    req.body.phone,
      email:    req.body.email,
      product:  req.body.product,
      time :    req.body.time,
      isRemember : false
    };
    dbo.collection("my_model").insertOne(myobj, function(err, result) {
      if (err) throw err;
      console.log("1 document inserted");
      res.json(result);
      db.close();
    });

  });
}

 const getProfile =(req, res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");

    dbo.collection("my_model").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });

}
 const updateProfile = (req,res) => {
  console.log(
      req.body.firstname+ ' '+
      req.body.lastname+ ' '+
      req.body.phone+ ' '+
      req.body.email+ ' '+
      req.body.product

  );
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = {
      firstname:req.body.firstname,
      lastname: req.body.lastname,
      phone:    req.body.phone,
      email:    req.body.email,
      product:  req.body.product,
      time :    req.body.time,
      isRemember : false
    };
    var myquery = { firstname: "Tigra1111" };
    var newvalues = { $set: myobj };
    dbo.collection("my_model").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
}

const changeRememberIsTrue = (req, res) => {
  console.log(req.params)
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = {
      isRemember : true
    };
    var myquery = {_id:new ObjectID(String(req.params.id))};

    var newvalues = { $set: myobj };
    dbo.collection("my_model").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("Remember updated");
      db.close();
    });
  });
}
const  changeRememberIsfalse = (req, res) => {
  console.log(req.params);
  console.log("Success")
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = {
      isRemember : false
    };
    var myquery = {_id:new ObjectID(String(req.params.id))};

    var newvalues = { $set: myobj };
    dbo.collection("my_model").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("Remember updated");
      db.close();
    });
  });
}
module.exports = {
  getProfile,updateProfile,changeRememberIsfalse,changeRememberIsTrue,addProfile
}
