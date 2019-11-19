const ObjectId = require('mongoose').Types.ObjectId;
const { Users } = require('../models/userModel');

const getUsers = (req, res) => {
  Users.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error' + JSON.stringify(err, undefined, 2));
    }
  });

};

// router.get('/users/:id',(req,res)=>{
//   if(!ObjectId.isValid(req.params.id)){
//     return  res.status(400).send('No recort  given  to  Id:'+ `${req.params.id}`)
//   }
//   UserCTRL.findById(req.params.id,(err, doc)=>{
//     if (!err) {
//       res.send(doc);
//     } else {
//       console.log("Error " + JSON.stringify(err, undefined, 2))
//     }
//
//   });
// });

const addUser = (req, res) => {
  console.log(req.body);
  var users = new Users({
    name:    req.body.name,
    surname: req.body.surname,
    role:    req.body.role,
    email:   req.body.email,
    password:req.body.password
  });
  users.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error " + JSON.stringify(err, undefined, 2))
    }
  })
};
//
// router.put('/users/:id',(req,res)=>{
//
//   if(!ObjectId.isValid(req.params.id)){
//     return  res.status(400).send('No recort  given  to  Id:'+ `${req.params.id}`)
//   }
//
//   var  users ={
//     name:    req.body.name,
//     surname: req.body.surname,
//     role:    req.body.role,
//     email:   req.body.email,
//     password:req.body.password
//   };
//
//   UserCTRL.findByIdAndUpdate(req.params.id,{$set:users},{new:true},(err, doc)=>{
//     if (!err) {
//       res.send(doc);
//     } else {
//       console.log("Error " + JSON.stringify(err, undefined, 2))
//     }
//   });
// });
//
// router.delete('/users/:id',(req,res)=>{
//   if(!ObjectId.isValid(req.params.id)){
//     return  res.status(400).send('No recort  given  to  Id:'+ `${req.params.id}`)
//   }
//
//   UserCTRL.findByIdAndRemove(req.params.id,(err, doc)=>{
//     if (!err) {
//       res.send(doc);
//     } else {
//       console.log("Error " + JSON.stringify(err, undefined, 2))
//     }
//   });
// });



module.exports = {
  addUser,getUsers
}
