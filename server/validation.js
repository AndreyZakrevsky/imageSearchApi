const Joi = require('@hapi/joi');

const checkLogin = async (data)=>{

    const schema =  Joi.object({
        password: Joi.string()
            .pattern(/^[a-zA-Z0-9]{3,30}$/),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    });

    return schema.validate(data);
};

const checkRegistration = async (data)=>{
    const schema =  Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),

        password: Joi.string()
            .pattern(/^[a-zA-Z0-9]{3,30}$/)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
            .required(),

    });
    return schema.validate(data);
};


module.exports.checkRegistration = checkRegistration;
module.exports.checkLogin = checkLogin;
