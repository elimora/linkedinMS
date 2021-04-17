//aca es donde estaran los endpoints de login y register
const express=require('express');
const router=express.Router(); 
const authCrtl=require( "../controllers/auth.controller"); 
const miVerifySignup=require('../middleware/verifySignup')

router.post(
    '/signup',
    [miVerifySignup.checkDuplicateOrUserName,miVerifySignup.checkRolesExisted],
    authCtrl.signup); 

router.post('/signin',authCtrl.signin); 

module.exports= router; 