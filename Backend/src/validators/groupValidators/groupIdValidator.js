const { checkSchema } = require('express-validator');

const groupIdValidator = checkSchema({
    group_id: {
        trim: true,
        isEmpty: {
            options: {
                ignore_whitespace: false// whitespace is not allowed
            }
        },
        isUUID: true,
    }
});
module.exports = groupIdValidator;