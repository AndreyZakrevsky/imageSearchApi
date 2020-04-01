const image = require("express").Router();
const imageController = require("../controllers/imageController");
const verify = require('../verifyToken');

image.use("/images", verify , imageController.getImages);
image.use("/liked-images/add", verify , imageController.saveLikedImage);
image.use("/liked-images", verify , imageController.likedImageList);
image.use("/search-word-history", verify , imageController.searchWordHistory);

module.exports = image;