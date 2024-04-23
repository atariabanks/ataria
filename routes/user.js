const express =  require('express')

const {validateUserSingup, userValidation, validateusersingin} = require('../middelware/validation/user')
const router = express.Router();
const {createUser, userSingIn} = require('../controllers/user');
const { isAuth } = require('../middelware/auth');

router.post('/create-user',validateUserSingup,userValidation, createUser)
router.post('/sing-in',validateusersingin,userValidation,userSingIn)
router.post('/create-post', isAuth,(req,res)=>{
res.send('welcome secret agent')
})

     module.exports = router  