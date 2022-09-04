const express=require('express')
const router=express.Router()
const User = require('../models/userSchema')
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');
const { authMiddleware } = require('../middlewares/authMiddlewares');
//@description:register a new user
//@params:POST /api/v1/users/register
//@access PUBLIC
router.post('/register',authMiddleware,body('email','please enter a valid email').isEmail(),body('password','password must be at least 8 characters').isLength({ min: 8 }),async(req,res)=>{
    try {
        const{username,email,password}=req.body
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
        const existUser = await User.findOne({email})
        if(existUser) return res.status(400).json({msg:'user is already exist'})
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        const newUser=await User.create({username,email,password:hash});
        token=jwt.sign({sub:newUser._id},process.env.JWT_SECRET)
        res.json({success:true,token})
    } catch (error) {
        res.status(500).json({msg:'somthing whent wrong'})

    }
});
//@description:login a user
//@params:POST /api/v1/users/login
//@access PUBLIC
router.post('/login',body('email','please enter a valid email').isEmail(),body('password','password must be at least 8 characters').isLength({ min: 8 }),async(req,res)=>{
    try {
        const{email,password}=req.body
        const existUser = await User.findOne({email})
        if(! existUser) return res.status(400).json({msg:'you should contact the administrator'})
        var validate = await bcrypt.compare(password,existUser.password);
        if(! validate) return res.status(400).json({msg:'invalid password'})
        token=jwt.sign({sub:existUser._id},process.env.JWT_SECRET)
        res.json({success:true,token})
    } catch (error) {
        res.status(500).json({msg:'somthing whent wrong'})

    }
});
module.exports = router