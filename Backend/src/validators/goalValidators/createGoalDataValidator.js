const { checkSchema } = require('express-validator');

const createGoalDataValidator = checkSchema({
    goal_name: {
        isString: true,
        trim: true,
        isLength: {
            options: { min: 3, max: 255 },
        },
        notEmpty: {
            options: {
                ignore_whitespace: false // whitespace is not allowed
            }
        },
        isAlphanumeric: {
            options: ["en-GB",{ ignore: "-_ " }], // include underscore 
        }
    },
    goal_type: {
        isString: true,
        trim: true,
        isLength: {
            options: { min: 3, max: 255 },
        },
        notEmpty: {
            options: {
                ignore_whitespace: false // whitespace is not allowed
            }
        },
        isAlphanumeric: {
            options: ["en-GB",{ ignore: '_' }], // include underscore 
        }
    },
    goal_value: {
        notEmpty: true,
        isNumeric: true,
        isFloat: {
            options: {
                min: 0
            }
        }
    },
    start_date: {
        notEmpty: true,
        toDate: true,
        isISO8601: true,

    },
    end_date: {
        notEmpty: true,
        toDate: true,
        isISO8601: true,

    }
}, ["body"]);


module.exports = createGoalDataValidator;