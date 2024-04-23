const mongoose = require('mongoose');
const bcrypt = require ('bcrypt')

const user = {
    firstname:'',

}




const UserSchema = new mongoose.Schema({
firstname:{
    type:String,
   
},
lastname:{
    type:String,
    required:true
},
state:{
    type:String,
    
},
city:{
    type:String,
    
},
address:{
    type:String, 
 
},
dob:{
    type:String,
   
},
email:{
    type:String,

 
},
number:{
    type:Number,
  
},
pin:{
    type:String,
  
},
gender:{
    type:String,

},
accountId:{
    type:String,
    default:'123'

},
})

UserSchema.pre('save', function(next){
if(this.isModified('pin')){
bcrypt.hash(this.pin, 8,(err, hash) => {
    if(err) return next(err);

    this.pin = hash;
next();
})
}
})



UserSchema.statics.isThisEmailInUse = async function(email) {
if (!email) throw new Error('Invalid Error');
try {
    const user= await this.findOne({email})
    if (user)
    {return false} else
{ return true;}
   
} catch (error) {
    console.log('error is email', error.message)
    return false
}


 
}


UserSchema.statics.isThisPhoneInUse = async function(number) {
    if (!number) throw new Error('Invalid Error');
    try {
        const user= await this.findOne({number})
        if (user)
        {return false} else
    { return true;}
       
    } catch (error) {
        console.log('error is Phone', error.message)
        return false
    }
    
    
     
    }
    
    
    UserSchema.methods.comparePassword = async function (pin) {
        if (!pin) throw new Error('Pin is Missing!');
      
        try {
          const result = await bcrypt.compare(pin, this.pin);
          return result;
        } catch (error) {
          console.log('Error while comparing password!', error.message);
        }
      };

module.exports = mongoose.model('AtariaUsers', UserSchema)