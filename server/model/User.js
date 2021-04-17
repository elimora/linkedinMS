const mongoose= require('mongoose'); 
const bcrypt= require('bcryptjs');

const UserSchema=new mongoose.Schema({
    username:{
        type:String, 
        unique:true, 
    }, 
    email:{
        type:String, 
        unique:true
    },
    password:{
        type:String, 
        required:true
    }, 
    roles:[{
        ref:"Role", 
        type:mongoose.Schema.Types.ObjectId
    }]
},{
    timestamps:true,
    versionKey:false
}); 

UserSchema.statics.encryptPassword= async(password)=>{
    
   const salt= await bcrypt.genSalt(10); 
   return await bcrypt.hash(password,salt); 
}
UserSchema.statics.comparePassword=async(password, recivedPasword)=>{
    return await bcrypt.compare(password, recivedPasword)
}

mongoose.model("User", UserSchema)