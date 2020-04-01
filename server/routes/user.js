const routeUser = require("express").Router();
const user = require("../controllers/userController");
const verify = require('../verifyToken');


routeUser.use("/profile", verify , user.profile);
routeUser.use("/login", user.login);
routeUser.use("/registration", user.register);
routeUser.use("/logout", user.logout);

module.exports = routeUser;


