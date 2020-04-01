
const mongoose = require('mongoose');
require('dotenv').config();

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

// Connect the database
mongoose.connect(`${process.env.DB_URL}${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Check if the API successfully connected to the database
const db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log(process.env.DB_URL ,"> successfully opened the database");
});

// Export the database instance
module.exports = mongoose;



