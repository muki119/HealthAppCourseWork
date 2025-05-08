const { checkSchema } = require('express-validator');

const groupIdValidator = checkSchema({
    groupid: {
        trim: true,
        notEmpty: {
            options: {
                ignore_whitespace: false// whitespace is not allowed
            }
        },
        isUUID: true,
    }
},['params']);
module.exports = groupIdValidator;