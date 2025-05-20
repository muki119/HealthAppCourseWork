const { checkSchema } = require('express-validator');

const createGroupDataValidator = checkSchema({
    name: {
        isString: true,
        trim: true,
        isLength: {
            options: { min: 3, max: 20 },
        },
        notEmpty: {
            options: {
                ignore_whitespace: false // whitespace is not allowed
            }
        },

        isAlphanumeric: {
            options: ["en-GB",{ ignore: '_-' }], // include underscore 
            errorMessage: 'Group name can only contain letters, numbers, underscores, and hyphens'
        }
    },
});

module.exports = createGroupDataValidator;