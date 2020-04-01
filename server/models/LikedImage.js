const mongoose = require('./db');
const schema = mongoose.Schema;

const LikedImageSchema = new schema({
    user_id: String,
    url: String,
    _id: String,
    date: {
        type: Date,
        default: Date.now
    },
});

const LikedImageModel = mongoose.model('liked-image', LikedImageSchema);
module.exports = LikedImageModel;
