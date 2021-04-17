const mongoose=require('mongoose'); 
require('../model/User'); 
require('../model/Role'); 
const jwt=require('jsonwebtoken'); 
const config=require('../config')

const User=mongoose.model("User");
const Role=mongoose.model("Role")
const mongoUri="mongodb+srv://cnq:6vnkYRVn1Ag20WC8@cluster0.d7l3l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true, 
    useCreateIndex:true
}); 
let i =1; 
mongoose.connection.on("connected",()=>{
    console.log("Conectado a mongo beibi", i++)
})

mongoose.connection.on("error",(err)=>{
    console.log("Error de connmexion =( ", err)
})

authCtrl={}

authCtrl.signup=async(req, res)=>{

    const{username,email,password,roles}=req.body; 

    const newUser= new User({
       username,
       email, 
       password: await User.encryptPassword(password)
   })

   if(roles){
      const founRoles=  await Role.find({name:{$in:roles}})
      newUser.roles=founRoles.map(role=>role._id)
   }else{
       const role = await Role.findOne({name:"user"})
       newUser.roles=[role._id]
   }

   const savedUser= await newUser.save(); 
   console.log(savedUser)

   const token= jwt.sign({id:savedUser._id},config.SECRET, {
       expiresIn:86400//24 horas
   }); 

   res.status(200).json({token})
}


authCtrl.signin=async(req, res)=>{

   const userFound= await User.findOne({email:req.body.email}).populate("roles")
   
   if (!userFound) return res.status(400).json({message:"Ussuario no encontrado"})

   const matchPassword= await User.comparePassword(req.body.password, userFound.password)

   if(!matchPassword) return res.status(401).json({token: null, message:'password invalido'})

   const token= jwt.sign({id:userFound._id}, config.SECRET, {
       expiresIn:86400
   })

   res.json({token}); 
}

module.exports=authCtrl; 