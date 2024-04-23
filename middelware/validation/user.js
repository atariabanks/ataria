const {check, validationResult} = require ('express-validator')

exports.validateUserSingup = [

check('firstname').trim().not().isEmpty().withMessage("First name can't be left Empty").isLength({min:2, max:20})
.withMessage('First name must be withn 3 to 20 chracters'),

check('lastname').trim().not().isEmpty().withMessage("Last name can't be left Empty").isLength({min:2, max:20})
.withMessage('Last name must be withn 3 to 20 chracters'),

check('state').trim().not().isEmpty()
.withMessage('State Input is not filled'),

check('city').trim().not().isEmpty()
.withMessage('City Input is not filled'),

check('address').trim().not().isEmpty()
.withMessage('Address Input is not filled'),

check('dob').trim().not().isEmpty()
.withMessage('Date Of Birth Input is not filled'),

check('email').normalizeEmail().isEmail().withMessage('Invalid Email'),
check('number').isMobilePhone().withMessage('Invalid Phone Number'),

check('pin').trim().not().isEmpty().withMessage("PIN can't be left Empty").isNumeric().withMessage("PIN Should be a Numeric value").isLength({min:4, max:6}).withMessage('Pin must be 4 to 6 Characters'),
];

exports.userValidation =(req, res, next) =>{
  const result =  validationResult(req).array()
if(!result.length) return next();

const error = result[0].msg;
res.json({success: false, message: error})

};






exports.validateusersingin =[

check('accountId').trim().isLength({min:12, max:12})
.withMessage('Account ID Should be of 12 Chracters'),

check('pin').trim().not().isEmpty().withMessage("PIN can't be left Empty").isNumeric().withMessage("PIN Should be a Numeric value").isLength({min:4, max:6}).withMessage('Pin must be 4 to 6 Characters'),

]