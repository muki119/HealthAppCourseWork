const { checkSchema } = require('express-validator');

const updateGoalDataValidator = checkSchema({
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
    goal_name: {
        optional: true,
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
            options: ["en-GB",{ ignore: "-_" }], // include underscore 
        }
    },
    goal_type: {
        optional: true,
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
        optional: true,
        isNumeric: true,
        notEmpty: true,
        isFloat: {
            options: {
                min: 0
            }
        }
    },
    start_date: {
        optional: true,
        toDate: true,
        isISO8601: true,
        notEmpty: true,
    },
    end_date: {
        optional: true,
        toDate: true,
        isISO8601: true,
        notEmpty: true,
    }
}, ["params", "body"]);

module.exports = updateGoalDataValidator;