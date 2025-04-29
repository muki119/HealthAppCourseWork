const { checkSchema } = require('express-validator');

const getGoalsValidator = checkSchema({
    datebefore: {
        optional: true,
        isDate: true,
    },
}, ["query"]);


module.exports = getGoalsValidator;