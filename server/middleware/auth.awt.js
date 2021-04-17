//este archivo me servira para verificar si el usuario me esta 
//enviuando su token(si es moderador , admin o user)
const jwt= require('jsonwebtoken'); 
const config= require('../config'); 
const mongoose=require('mongoose'); 
require('../model/User'); 
const User=mongoose.model("User");
require('../model/Role'); 
const Role=mongoose.model("Role");


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

myVerifyToken={}; 

 myVerifyToken.verifyToken=async(req, res, next)=>{

    try {
        //recibiendo un token
        const token= await req.headers["x-access-token"]; 

        //si no tiene token
        if(!token) return res.status(403).json({message:'No posee un token'});

        //si lo tiene extreigo lo que esta dentro(esto me retorna el id del usuario)
        const decoded= jwt.verify(token,config.SECRET); 
        req.userId=decoded.id; 

        //ahora debo verificar si el id existe el la base de datos
        const user= await User.findById(req.userId, {password:0});
        

        //si el usuario no existe en la busqueda
        if(!user) return res.status(404).json({message:'Usuario no existe'})
        console.log(user)
        next(); 
        
    } catch (error) {
        return res.status(401).json({message:'No autorizado'}) 
    }
    
}; 

myVerifyToken.isModerator=async(req, res, next)=>{
    const user= await User.findById(req.userId); 
    const roles= await Role.find({_id:{$in:user.roles}}); 

    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name==='moderator'){
            next();
            return; 
        }
    }
    return res.status(403).json({message:'requiere el rol de maderador'})
}
myVerifyToken.isAdmin=async(req, res, next)=>{
    const user= await User.findById(req.userId); 
    const roles= await Role.find({_id:{$in:user.roles}}); 

    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name==='admin'){
            next();
            return; 
        }
    }
    return res.status(403).json({message:'requiere el rol admin'})
}



module.exports=myVerifyToken; 