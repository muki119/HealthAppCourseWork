const { checkSchema } = require('express-validator');

const goalIdValidator = checkSchema({
    goalId: {
        trim: true,
        notEmpty: {
            options: {
                ignore_whitespace: false // whitespace is not allowed
            }
        },
        isUUID: {
            errorMessage: "Invalid Id",
        }
    }
}, ["params"]);


module.exports = goalIdValidator;