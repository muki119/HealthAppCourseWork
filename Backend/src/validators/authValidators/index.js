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
            errorMessage:"Invalid Username/Password."
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
        },
        errorMessage:"Invalid Username/Password."
    },
    forename:{
        optional:false,
        isString:true,
        trim:true,
        isLength: {
            options: { min: 3, max: 64 },
        },
        notEmpty:{ 
            options:{
                ignore_whitespace:false // whitespace is not allowed
            }
        },
        isAlpha:{ // allow [a-zA-Z0-9] and  -
            options: ['en-GB',{ ignore: ['-', "'"] }], // include hyphen and apostrophe
        },
        errorMessage:"Invalid Forename."
    },
    surname:{
        optional:false,
        isString:true,
        trim:true,
        isLength: {
            options: { min: 3, max: 64 },
        },
        notEmpty:{ 
            options:{
                ignore_whitespace:false // whitespace is not allowed
            }
        },
        isAlpha:{ // allow [a-zA-Z0-9] and _ 
            options: ['en-GB',{ ignore: ['-', '_'] },] // include underscore 
        },
        errorMessage:"Invalid Surname."
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
        },
        errorMessage:"Invalid Email."
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
        },
        errorMessage:"Invalid Height."
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
                max:700
            }
        },
        errorMessage:"Invalid Weight."
    },
},["body"])


module.exports = {
    loginValidator,
    registerValidator
}