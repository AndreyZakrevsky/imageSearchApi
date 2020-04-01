const UserModal = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = async (request, response) => {
    const user = await UserModal.findOne({email: request.body.email});

    if (!user) {
        return response.status(400).json({
            message: "This email is not exists !!",
        });
    }

    const validPass = await bcrypt.compare(request.body.password, user.password);

    if (!validPass) {
        return response.status(400).json({
            message: "Not valid password !!! ",
            status: false
        });
    }

    const token = jwt.sign({_id: user._id, name: user.name}, process.env.SECRET, {expiresIn: '2h'});

    response.header("Authorization", token).json({
        is_login: true,
        message: "Success log in",
        status: true,
        token: token
    });
};

exports.registerUser = async (request, response) => {
    const emailExist = await UserModal.findOne({email: request.body.email});

    if (emailExist) {
        return response.status(400).json({
            message: "This email already exists !!",
        });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    const createUser = new UserModal({
        name: request.body.username,
        email: request.body.email,
        password: hashedPassword,
        _id: Date.now() + "" + Math.floor(Math.random() * (250000 - 100)) + 100
    });

    const savedUser = await createUser.save();
    response.send(savedUser);
};

exports.logoutUser = async (request, response) => {
    let res = {
        is_login: false,
        message: "Success log out",
        status: true,
        token: ''
    };

    response.json(res);
};

exports.profileUser = async (request, response) => {
    const user = await UserModal.findOne({_id: request.user._id});
    let res = {
        data: {
            profile: {
                lang: user.lang,
                email: user.email,
                phone: user.phone,
                username: user.name,
            },
        },
        is_login: true,
        status: true,
    };
    response.json(res);
};