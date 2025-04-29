const { checkSchema } = require('express-validator');

const getMetricValidator = checkSchema({
    datebefore: {
        optional: true,
        notEmpty: true,
        toDate: true,
        isISO8601:true,

    }
}, ["query"]);

module.exports = getMetricValidator;