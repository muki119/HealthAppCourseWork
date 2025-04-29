const { checkSchema } = require('express-validator');

const metricDataValidator = checkSchema({
    metric_type: {
        isString: true,
        trim: true,
        notEmpty: {
            options: {
                ignore_whitespace: false // whitespace is not allowed
            }
        },
        isLength: {
            options: { min: 3, max: 255 },
        },

        isAlphanumeric: {
            options: ["en-GB",{ ignore: '_' }], // include underscore 
        }
    },
    metric_value: {
        notEmpty: {
            options: {
                ignore_whitespace: false // whitespace is not allowed
            }
        },
        isNumeric: true,
        isFloat: {
            options: {
                min: 0
            }
        }
    },
    time_of_day: {
        notEmpty: {
            options: {
                ignore_whitespace: false // whitespace is not allowed
            }
        },
        isString: true,
        trim: true,
        isIn: {
            options: [['BREAKFAST', 'SECOND_BREAKFAST', 'BRUNCH', 'LUNCH', 'TEA', 'DINNER', 'SNACK']]
        }
    }
}, ["body"]);


module.exports = metricDataValidator;