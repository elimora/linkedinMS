const mongoose=require('mongoose'); 
require('../model/Company'); 

const Company=mongoose.model("company");
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


productsCrtl={}
productsCrtl.createProducts= async(req,res)=>{
   
   try {
    const{name,email,service,picture,coutry,imgUrl} =req.body
    const newCompany= new Company({
        name,email,service,picture,coutry,imgUrl
    }) 
    const savedCompany= await newCompany.save(); 
    console.log(savedCompany); 
    res.status(201).json(savedCompany); 
} catch (error) {
    console.log('Se prtesento el siguiente error al agragar',error)
}
    
}; 
productsCrtl.getProducts= async(req,res)=>{
    try {
        const allCompanies= await Company.find({});
        res.send(allCompanies); 
    } catch (error) {
        console.log('Se pretesento un error al traer a todos las companies',error)
    }
}; 

productsCrtl.getProductById= async(req,res)=>{
   
    try {
        const company= await Company.findById(req.params.productId); 
        res.status(200).json(company)
    } catch (error) {
        console.log('Se pretesento un error al traer a todos las companies',error)
    }
   
}; 
productsCrtl.updateProductById= async(req,res)=>{
    try {
       const updateCompany= await Company.findByIdAndUpdate(req.params.productId, req.body,{
           new:true
       }); 
       res.status(200).json(updateCompany)
    } catch (error) {
        console.log('Se pretesento un error al actualizar',error)
    }
}; 

productsCrtl.deleteProductById= async(req,res)=>{
    try { 
        const deletedCompany= await Company.findByIdAndDelete(req.params.productId); 
        res.status(204).json()
    } catch (error) {
        console.log('Se pretesento un error al borrar',error)
    }
   
}; 


module.exports=productsCrtl; 
