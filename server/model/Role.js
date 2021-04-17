const mongoose= require('mongoose'); 

const Roles=['user','admin','moderator']

const RoleSchema=new mongoose.Schema(
    {
    name:String, 
    },
    {
    versionKey:false
    })

mongoose.model("Role", RoleSchema);
module.exports=Roles;  