const express=require('express'); 
const router=express.Router(); 
const productCtrl=require( "../controllers/products.controller")
const vericator=require('../middleware/auth.awt'); 


router.post('/',[vericator.verifyToken,vericator.isModerator],productCtrl.createProducts); 

router.get('/',productCtrl.getProducts); 

router.get('/:productId',productCtrl.getProductById); 

router.put('/:productId',[vericator.verifyToken,vericator.isAdmin], productCtrl.updateProductById); 

router.delete('/:productId',[vericator.verifyToken,vericator.isAdmin], productCtrl.deleteProductById); 

module.exports= router; 