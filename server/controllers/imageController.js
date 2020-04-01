const {getImagesByKeyword} = require('../services/unsplash.service');
const {addNewLikedImage, addSearchWord, getLikedImageList , getSearchWordHistory} = require('../db_services/image.service');


exports.getImages = async (request, response) => {
    let res = await getImagesByKeyword(request.query.keyword);

    if (res) {
        await addSearchWord(request.query.keyword, request.user._id)
        response.send(res);
    } else {
        response.status(204).send("No content !  ");
    }
};

exports.saveLikedImage = async (request, response) => {
    try {
        await addNewLikedImage(request);
        response.status(200).send("Saved");
    } catch (e) {
        console.log(e);
        response.status(400).send("Not saved");
    }
};

exports.likedImageList = async (request, response) => {
    try {
        let date = request.body.date;
        let user = request.user._id;
        let res = await getLikedImageList(date , user);
        response.status(200).send(res);
    } catch (e) {
        console.log(e);
        response.status(400).send("Not found");
    }
};

exports.searchWordHistory = async (request, response) => {
    try {
        let date = request.body.date;
        let user = request.user._id;
        let res = await getSearchWordHistory(date , user);
        response.status(200).send(res);
    } catch (e) {
        console.log(e);
        response.status(400).send("Not found");
    }
};

