const User=require('../model/Usermodal')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const JWT="hcdiudcdi"
const userlogin=async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        
        if(!user)return res.status(200).send({
            success:false,
            message:"user is not found"
        })
        if(req.body?.role==='admin'&&user?.email!=="admin@gmail.com")return res.status(200).send({
            success:false,
            message:"User is not admin"
        })
        if(req.body.role!=user.role)return res.status(200).send({
            success:false,
            message:"Role is not matched"
        })
        const pass=await bcrypt.compare(req.body.password,user.password)
        if(!pass){
            return res.status(200).send({
                success:false,
                message:"Please fill the correct password"
            })
        } 
      
        const token=jwt.sign({userId:user._id},JWT);
        return res.cookie("token",token,
            {
            
  secure: true,            // must be true in production with HTTPS
  sameSite: "None",        // required for cross-origin
  maxAge: 24 * 60 * 60 * 1000,
            } ).status(200).send({
            success:true,
            message:"Login Suceesfull",
            user
        })

    } catch (error) {
        console.log(error) 
        return res.status(404).send({
            success:false,
            error
        })
    }   
 
}
const register=async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        if(user)return res.status(200).send({
            success:false,
            message:"user is already found"
        })
        const salt=await bcrypt.genSalt(10);
        const pass=await bcrypt.hash(req.body.password,salt);
        req.body.password=pass;
        const users=new User(req.body);
        await users.save();
        return res.status(200).send({
            success:true,
            message:"new user is created",
            users
        }) 
        
        
    } catch (error) {
        console.log(error)
        return res.status(404).send({
            success:false,
            error,
            message:"error in api" 
        })
    }
}
const getuser=async(req,res)=>{
    try {
        
        const user=await User.findById(req.body.userId)
        return res.status(200).send({
            user,
            message:"fetchb succesfull",
            success:true
        })
    } catch (error) { 
        console.log(error)
        return res.status(404).send({
            success:false,
            error
        }) 
    }
}
const getorglist=async(req,res)=>{
    try {
        
        const user=await User.find({role:"organisation"})
        return res.status(200).send({
            user,
            message:"fetch succesfull",
            success:true
        })
    } catch (error) { 
        console.log(error)
        return res.status(404).send({
            success:false,
            error
        }) 
    }
}
module.exports={userlogin,register,getuser,getorglist}     