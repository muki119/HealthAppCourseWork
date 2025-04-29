const { checkSchema } = require('express-validator');

const getGroupMessagesValidator = checkSchema({
    groupId: {
        trim: true,
        isEmpty: {
            options: {
                ignore_whitespace: false // whitespace is not allowed
            }
        },
        isUUID:true,
    },
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