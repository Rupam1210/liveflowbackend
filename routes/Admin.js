const express=require("express");
const verify = require("../middleware/token");
const adminAuth = require("../middleware/Adminauth");
const { getdonorlist, gethospitallist, getorglist, iddelete } = require("../controller/Admincontroller");
const route=express.Router();

route.get("/donor-list",verify,adminAuth,getdonorlist)
route.get("/hospital-list",verify,adminAuth,gethospitallist)
route.get("/org-list",verify,adminAuth,getorglist)
route.delete("/getdelete/:id",verify,adminAuth,iddelete)

module.exports=route;  