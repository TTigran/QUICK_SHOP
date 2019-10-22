const jwt = require('jsonwebtoken');

const authorizationLogin = (req, res) => {
  console.log(req.body)
  if (req.body.username == "test" && req.body.password == "123456") {
    let token = jwt.sign({
      id:1,
      username:req.body.username ,
      password:req.body.password,
    }, 'asdf');

    res.json([{
      status: "successful",
      token: {remember_me: true, data: token}
    }])
  }else{
    res.json([{
      status: "unsuccessful",
      token: {remember_me: false, data: ""}
    }])
  }

};
module.exports={
  authorizationLogin
}
