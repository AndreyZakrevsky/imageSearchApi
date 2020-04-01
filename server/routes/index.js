const route = require("express").Router();
const user = require('./user');
const image = require('./image');

route.use("/api", [user , image]);

module.exports = route;
