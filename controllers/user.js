const User = require('../models/user')
const jwt =  require('jsonwebtoken')
exports.createUser =  async (req, res)=>{
    
   const {firstname,lastname,state,city,address,dob,email,number,pin,gender,accountId}= req.body
    const isNewUser1 = await User.isThisEmailInUse(email)
      const isNewUser2 = await User.isThisPhoneInUse(number)
    if(!isNewUser2 && !isNewUser1 ) return res.json({success:false, message:'Both Email & Phone Number in use'})
       if(!isNewUser1) return res.json({success:false, message:'This Email already in use'})
       if(!isNewUser2) return res.json({success:false, message:'This Phone Number already are in use'})
       const user=  
       await User({
           firstname,
           lastname,
           state,
           city,
           address,
           dob,
           email,
           number,
           pin,
           gender,
           accountId
    
    })
    
    await user.save()
    res.json({success:true, user})
     }



     exports.userSingIn = async (req,res) =>{
   const{accountId, pin}=req.body
   const user = await User.findOne({accountId})

   if(!user) return res.json({success:false, message:'Invalid Credentials'})


const isMatch= await user.comparePassword(pin)
if(!isMatch) return res.json({success:false, message:'Invalid Credentials'})


const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn:'1d'})


const userInfo = {

  firstname:user.firstname,
  lastname:user.lastname,
  email:user.email,
  number:user.number,
  accountId:user.accountId,


}

res.json({success:true, userInfo, token})
     }

      