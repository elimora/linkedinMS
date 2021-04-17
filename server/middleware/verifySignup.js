//sevira para verificar si me estan enviando un correo nuevo
// o si el correo ya existe, o si existe el susario, o si el roll
//que me esta enviando ya fue creado, por tanto:
//Este archivo sera un VERIFICADOR o VALIDATOR
const ROLES=require('../model/Role'); 
const mongoose=require('mongoose'); 

require('../model/User');  
const User=mongoose.model("User");


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
myVerifyRole={}; 

myVerifyRole.checkDuplicateOrUserName= async(req, res, next)=>{
   const user= await User.findOne({username: req.body.username}); 

   if(user) return res.status(400).json({message:'El usuario ya existe'}); 

   const email= await User.findOne({email: req.body.email}); 

   if(email) return res.status(400).json({message:'El email ya existe'}); 

   next()
}

myVerifyRole.checkRolesExisted=(req, res, next)=>{
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
           if (!ROLES.includes(req.body.roles[i])) {
              return res.status(400).json({
                  message:`Role ${req.body.roles[i]} no existe `
              }) 
           }
        }
    }
    next()
}



module.exports=myVerifyRole; 