const express = require('express');
const app = express();
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const loginRouter = require('./login/login');
const customerRouter =require("./customer/customerCTRL")

router.post('/auth/login',loginRouter.authorizationLogin);

router.post("/add",customerRouter.addProfile);
router.get( "/get_json",customerRouter.getProfile);
router.post("/update", customerRouter.updateProfile);
router.post("/change/:id", customerRouter.changeRememberIsTrue);
router.post("/change/remember/:id", customerRouter.changeRememberIsfalse);

module.exports = router;
