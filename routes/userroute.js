const express=require('express');
const { register, userlogin, getuser, getorglist } = require('../controller/auth');
const verify = require('../middleware/token');

const route=express.Router();

route.post("/register",register)
route.post("/login",userlogin)
route.get("/getuser",verify,getuser)
route.get("/getorg",getorglist)
route.get("/logout",async(req,res)=>{
    try {
        res.clearCookie("token",{ sameSite:"none",secure:true}).status(200).send("user loggout succesful!")
    } catch (error) {
        res.status(500).json(error)
    }
 })

module.exports=route