const {checkSchema } = require('express-validator');

const loginValidator = checkSchema({
    username:{
        optional:false,
        isString:true,
        trim:true,
        notEmpty:{ 
            options:{
                ignore_whitespace:false // whitespace is not allowed
            }
        },
        isLength: {
            options: { min: 3, max: 20 },
        },

        isAlphanumeric:{ // allow [a-zA-Z0-9] and _ 
            options: ['en-GB',{ ignore: '_' }], // include underscore
        },
        errorMessage:"Invalid Username/Password."

    },
    password:{
        optional:false,
        isString:true,
        trim:true,
        notEmpty:{
            options:{
                ignore_whitespace:false // whitespace is not allowed
            }
        },
        isLength: {
            options: { min: 8, max: 64 },
        },
        isAlphanumeric:{ // allow [a-zA-Z0-9] and _ 
            options: ['en-GB',{ ignore: '_' }], // include underscore 
        },
        errorMessage:"Invalid Username/Password."
    },
},["body"])

const registerValidator = checkSchema({
    username:{
        optional:false,
        isString:true,
        trim:true,
        isLength: {
            options: { min: 3, max: 20 },
        },
        notEmpty:{ 
            options:{
                ignore_whitespace:false // whitespace is not allowed
            }
           
        },
        isAlphanumeric:{ // allow [a-zA-Z0-9] and _ 
            options: ['en-GB',{ ignore: '_' }], // include underscore 
        }

    },
    password:{
        optional:false,
        isString:true,
        trim:true,
        isLength: {
            options: { min: 8, max: 64 },
        },
        notEmpty:{
            options:{
                ignore_whitespace:false // whitespace is not allowed
            }
        },
        isAlphanumeric:{ // allow [a-zA-Z0-9] and _ 
            options: ['en-GB',{ ignore: '_' }], // include underscore 
        }
    },
    forename:{
        optional:false,
        isString:true,
        trim:true,
        isLength: {
            options: { min: 3, max: 20 },
        },
        notEmpty:{ 
            options:{
                ignore_whitespace:false // whitespace is not allowed
            }
        },
        isAlpha:{ // allow [a-zA-Z0-9] and  -
            options: ['en-GB',{ ignore: ['-', "'"] }], // include hyphen and apostrophe
        }
    },
    surname:{
        optional:false,
        isString:true,
        trim:true,
        isLength: {
            options: { min: 3, max: 20 },
        },
        notEmpty:{ 
            options:{
                ignore_whitespace:false // whitespace is not allowed
            }
        },
        isAlpha:{ // allow [a-zA-Z0-9] and _ 
            options: ['en-GB',{ ignore: ['-', '_'] },] // include underscore 
        }
    },
    email:{
        optional:false,
        isString:true,
        trim:true,
        notEmpty:{
            options:{
                ignore_whitespace:false // whitespace is not allowed
            }
        },
        isEmail:true,
        normalizeEmail:{
            options:{
                all_lowercase:true // convert to lowercase
            }
        }
    },
    height:{
        optional:false,
        notEmpty:{
            options:{
                ignore_whitespace:false // whitespace is not allowed
            }
        },
        isFloat:{
            options:{
                min:0,
                max:300
            }
        }
    },
    weight:{
        optional:false,
        notEmpty:{
            options:{
                ignore_whitespace:false // whitespace is not allowed
            }
        },
        isFloat:{
            options:{
                min:0,
                max:500
            }
        }
    },
},["body"])


module.exports = {
    loginValidator,
    registerValidator
}