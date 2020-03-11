const ObjectId = require('mongoose').Types.ObjectId;
const {Users} = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const tokenSecret = "asdf1234";


const getUsers = (req, res) => {
  Users.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error' + JSON.stringify(err, undefined, 2));
    }
  });
};

const getById = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send('No recort  given  to  Id:' + `${req.params.id}`)
  }
  Users.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error " + JSON.stringify(err, undefined, 2))
    }
  });
};

const addUser = (req, res) => {
  let users = new Users({
    name: req.body.name,
    surname: req.body.surname,
    role: req.body.role,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt)
  });
  users.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error " + JSON.stringify(err, undefined, 2))
    }
  })
};

const updateById = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send('No recort  given  to  Id:' + `${req.params.id}`)
  }
  let users = {
    name: req.body.name,
    surname: req.body.surname,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password
  };

  Users.findByIdAndUpdate(req.params.id, {$set: users}, {new: true}, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error " + JSON.stringify(err, undefined, 2))
    }
  });
};

const deleteById = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send('No recort  given  to  Id:' + `${req.params.id}`)
  }
  Users.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error " + JSON.stringify(err, undefined, 2))
    }
  });
};

const authorizationLogin = (req, res) => {
  Users.findOne({email: req.body.username}, (err, doc) => {
    if (!err) {
      if (doc) {
        let token = jwt.sign({
          _id: doc._id,
          name: doc.name,
          surname: doc.surname,
          email: doc.email,
          role: doc.role
        }, tokenSecret);

        if (bcrypt.compareSync(req.body.password, doc['password'])) {
          res.json([{
            status: "successful",
            token: {remember_me: true, data: token}
          }])
        } else {
          res.json([{
            status: "successful",
            message: "invalid  password ",
            token: {remember_me: false,data:''}
          }]);
        }
      } else {
        res.json([{
          status: "successful",
          message: "Not exists user",
          token: {remember_me: false,data:''}
        }]);
      }
    }
  });
};


const veryficationUser = (req,res) => {
  let decoded = jwt.verify(req.body.token, tokenSecret);
  res.send(decoded);
};

module.exports = {
  addUser, getUsers, getById, deleteById, updateById, authorizationLogin, veryficationUser
}
