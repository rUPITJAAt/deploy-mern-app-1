const UserModel = require("../models/user");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            return res.status(409)
                        .json({message:'User already exist,you can login',success:false});
        }
        const userModel=new UserModel({name,email,password});
        userModel.password=await bcrypt.hash(password,8);
        await userModel.save();
        res.status(201).json({
            message:"signup succesfully",
            success:true,
        })

    }catch(err){
        res.status(500).json({
            message:"internal server error",
            success:false,
        })
    }
}
const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email});
        const errmsg='Enter Correct Email And Password';
        if(!user){
            return res.status(403)
                        .json({message:errmsg,success:false});
        }
        const isPassEqual=await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403)
                .json({message:errmsg,success:false});
        }
        const jwttoken=jwt.sign({email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'})
        res.status(200).json({
            message:"login succesfully",
            success:true,
            jwttoken,
            email,
            name:user.name, 
        }) 

    }catch(err){
        res.status(500).json({
            message:"internal server error",
            success:false,
        })
    }
}
module.exports={
    signup,
    login
}