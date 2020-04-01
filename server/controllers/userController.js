const {checkRegistration, checkLogin} = require('../validation');
const {loginUser , registerUser , logoutUser , profileUser} = require('../db_services/user.service');

exports.profile = async (request, response) => {
    try {
        await profileUser(request, response);
    } catch (e) {
        response.status(400).json({
            message: "Something went wrong !",
        });
    }
};

exports.login = async (request, response) => {

    const {error} = await checkLogin(request.body);
    if (error) {
        return response.status(400).json({
            message: error.details[0].message,
            details: error.details
        });
    } else {
        try {
            await loginUser(request, response);
        } catch (e) {
            response.status(400).json({
                message: "Something went wrong !",
            });
        }
    }
};

exports.register = async (request, response) => {

    const {error} = await checkRegistration(request.body);
    if (error) {
        return response.status(400).json({
            message: error.details[0].message,
            details: error.details
        });
    }else {
        try {
            await registerUser(request, response);
        } catch (e) {
            response.status(400).json({
                message: "Something went wrong !",
            });
        }
    }
};

exports.logout = async (request, response) => {
    try {
        await logoutUser(request, response);
    } catch (e) {
        response.status(400).json({
            message: "Something went wrong !",
        });
    }
};




