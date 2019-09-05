const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
     email:{type:String,
        required:true,
        unique:true,
       // match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{type:String,required:true},
    mobileNo:Number,
    state:String,
    city:String,
    pinCode:Number,
    address:String,
});



module.exports=mongoose.model('MedicalUser',userSchema);