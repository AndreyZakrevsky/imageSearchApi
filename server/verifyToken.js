const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async (request, response, next) => {

    let token = request.headers['x-access-token'] || request.headers['authorization'];

    if (token.indexOf('Bearer') === 0) {
        token = token.slice(7, token.length);
    }

    try {
        const verified = await jwt.verify(token, process.env.SECRET);
        request.user = verified;
        next();
    } catch (e) {
        response.status(401).send("Invalid token !  ");
    }
};
