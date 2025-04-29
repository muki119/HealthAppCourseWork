const { checkSchema } = require('express-validator');

const metricIdValidator = checkSchema({
    metricId: {
        trim: true,
        notEmpty: {
            options: {
                ignore_whitespace: false // whitespace is not allowed
            }
        },
        isUUID: true
    }
}, ["params"]);

module.exports = metricIdValidator;