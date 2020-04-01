const mongoose = require('./db');
const schema = mongoose.Schema;

const SearchWordHistorySchema = new schema({
    user_id: String,
    key_word: String,
    _id: String,
    date: {
        type: Date,
        default: Date.now
    },
});

const SearchWordHistoryModel = mongoose.model('search-words', SearchWordHistorySchema);
module.exports = SearchWordHistoryModel;
