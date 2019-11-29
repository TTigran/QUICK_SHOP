const express = require('express');
const app = express();
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

const customerRouter =require("../controllers/customerCTRL");
const usersRouter =require("../controllers/userCTRL");


router.post("/add",customerRouter.addProfile);
router.get( "/get_json",customerRouter.getProfile);
router.post("/update", customerRouter.updateProfile);
router.post("/change/:id", customerRouter.changeRememberIsTrue);
router.post("/change/remember/:id", customerRouter.changeRememberIsfalse);

router.get("/users",usersRouter.getUsers);
router.post("/users",usersRouter.addUser);
router.get("/users/:id",usersRouter.getById);
router.delete("/users/:id",usersRouter.deleteById);
router.put("/users/:id",usersRouter.updateById);
router.post('/auth/login',usersRouter.authorizationLogin);
router.post('/verify',usersRouter.veryficationUser);


module.exports = router;
