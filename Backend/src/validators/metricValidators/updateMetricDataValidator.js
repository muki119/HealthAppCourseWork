const { checkSchema } = require('express-validator');

const updateMetricDataValidator = checkSchema({
    metric_type: {
        optional: true,
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
        optional: true, // added optional validation
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
        optional: true,
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

})

module.exports = updateMetricDataValidator;