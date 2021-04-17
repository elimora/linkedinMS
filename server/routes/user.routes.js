//aca se puede especificar los endpoints relacionados con 
//un usuario en particular, es decir , crear un nuevo usuario,
//eliminarlo, etc, es decir para que el administrados pueda crear
//o eliminar uusarios
const express=require('express'); 

const router=express.Router(); 

const miUserCtrl=require( "../controllers/user.controller"); 
const miMiddleWare=require('../middleware/auth.awt'); 
const miVerifySignup=require('../middleware/verifySignup')


router.post('/',[
    miMiddleWare.verifyToken,
    miMiddleWare.isAdmin,
    miVerifySignup.checkRolesExisted
], miUserCtrl.createUser); 

module.exports= router; 