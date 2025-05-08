const { checkSchema } = require('express-validator');

const getGroupMessagesValidator = checkSchema({
    datebefore: {
        optional: true,
        toDate: true,
        isISO8601: true,
        notEmpty: {
            options: {
                ignore_whitespace: false // whitespace is not allowed
            }
        }
    }
});

module.exports = getGroupMessagesValidator;