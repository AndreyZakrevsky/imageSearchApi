const LikedImageModel = require('../models/LikedImage');
const SearchWordHistoryModel = require('../models/SearchHistory');

//  Saves liked image in DB
exports.addNewLikedImage = async (request) => {
    let image = {
        "url":request.body.url,
        "user_id": request.user._id,
        "_id": Date.now() + "" + Math.floor(Math.random() * (250000 - 100)) + 100,
    };

    const newImage = new LikedImageModel(image);
    const saved = await newImage.save();
    return saved;
};

//  Saves keyword in db for history of searching
exports.addSearchWord = async (keyword , user_id) => {
    let start = new Date().setHours(0, 0, 0, 0);
    let end = new Date().setHours(23, 59, 59, 999);
    const wordExists = await SearchWordHistoryModel.find({
        user_id: user_id,
        key_word:keyword,
        date: {
            $gte: start,
            $lt: end
        }
    });

    if(wordExists && wordExists.length > 0){
        return true;
    }else{
        let searchHistory = {
            "key_word": keyword,
            "user_id": user_id,
            "_id": Date.now() + "" + Math.floor(Math.random() * (250000 - 100)) + 100,
        };
        const newSearchHistory = new SearchWordHistoryModel(searchHistory);
        const saved = await newSearchHistory.save();
        return saved;
    }
};

// Get liked images
exports.getLikedImageList = async ( date , user_id) => {
    let start;
    let end;
    if (!date) {
        start = new Date().setHours(0, 0, 0, 0);
        end = new Date().setHours(23, 59, 59, 999);
    } else {
        start = new Date(new Date(date));
        end = new Date(new Date(date).setHours(23, 59, 59));
    }

    const result = await LikedImageModel.find({
        user_id: user_id,
        date: {
            $gte: start,
            $lt: end
        }
    });

    return result;
};


// Get search words list
exports.getSearchWordHistory = async ( date , user_id) => {
    let start;
    let end;
    if (!date) {
        start = new Date().setHours(0, 0, 0, 0);
        end = new Date().setHours(23, 59, 59, 999);
    } else {
        start = new Date(new Date(date));
        end = new Date(new Date(date).setHours(23, 59, 59));
    }

    const result = await SearchWordHistoryModel.find({
        user_id: user_id,
        date: {
            $gte: start,
            $lt: end
        }
    });

    return result;
};

