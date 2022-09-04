const express=require('express')
const router=express.Router()
const product = require('../models/productSchema')
const { authMiddleware } = require('../middlewares/authMiddlewares');
const multer  = require('multer')
//multer middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'my-images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null,uniqueSuffix)
    }
  })
  const upload = multer({ storage: storage })
//@description:add a new Product
//@params:POST /api/v1/products/addProduct 
//@access PRIVATE
router.post('/addProduct',authMiddleware,upload.single('picture'),async(req,res)=>{
    try {
        const {title,desc,Qte}=req.body;
        console.log(req.file);
        const imagePath=`http://localhost:5000/${req.file.path}`;
        const newProduct=await product.create({
          title,desc,Qte,image:imagePath
        })
        res.json(newProduct)
    } catch (error) {
        res.status(500).json({msg:'somthing whent wrong'})
    }
})
//@description:get Products
//@params:GET /api/v1/products/
//@access PRIVATE
router.get('/',authMiddleware,async(req,res)=>{
  try {
      const productList=await product.find()
      res.json(productList)
  } catch (error) {
      res.status(500).json({msg:'somthing whent wrong'})
  }
})
//@description:update Products
//@params:PUT /api/v1/products/
//@access PRIVATE



module.exports = router