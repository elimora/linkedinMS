const mongoose= require('mongoose'); 

const CompanySchema=new mongoose.Schema({
    name:String,
    email:String,
    service:String,
    coutry:String,
    imgUrl:String
},{
    timestamps:true,
    versionKey:false
})

mongoose.model("company", CompanySchema)