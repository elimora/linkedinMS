const mongoose=require('mongoose'); 
require('../model/Role'); 



const mongoUri="mongodb+srv://cnq:6vnkYRVn1Ag20WC8@cluster0.d7l3l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}); 
let i =1; 
mongoose.connection.on("connected",()=>{
    console.log("Conectado a mongo beibi", i++)
})

mongoose.connection.on("error",(err)=>{
    console.log("Error de connmexion =( ", err)
})

const Role=mongoose.model("Role");

 const createRoles= async()=>{
    try {
    const count= await Role.estimatedDocumentCount(); 
       
    if(count>0) return;  
    
    const values = await Promise.all([
        new Role({name:'user'}).save(), 
        new Role({name:'moderator'}).save(), 
        new Role({name:'admin'}).save(),
    ]); 

    console.log(values); 

    } catch (error) {
        console.error('este es el error loquillo', error)
    }
}

module.exports=createRoles(); 
