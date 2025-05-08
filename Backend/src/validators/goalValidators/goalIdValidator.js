const { checkSchema } = require('express-validator');

const goalIdValidator = checkSchema({
    goalId: {
        optional: false,
        trim: true,
        notEmpty: {
            options: {
                ignore_whitespace: false // whitespace is not allowed
            }
        },
        isUUID: true
    },
}, ["params"]);


module.exports = goalIdValidator;