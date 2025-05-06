const express=require('express');
const { createInventory, getinventory, getinventory3, getdonors,  getallhospital, orgprofile, orgprofilehospital, storeinv, lastdonor } = require('../controller/inventorycntroller');
const verify = require('../middleware/token');
const bloodgroupdata = require('../controller/Analytics');
 
const route=express();
route.post("/create",verify,createInventory)
route.post("/store",verify,storeinv)
// route.post("/create-in",verify,createINInventory)
// route.post("/create-out",verify,createoutInventory)
route.get("/getrecord",verify,getinventory)
route.get("/get-recent-record",verify,getinventory3)
route.get("/get-donors",verify,getdonors)
route.get("/last-record",verify,lastdonor)
route.get("/get-hospital",verify,getallhospital)
route.get("/get-org",verify,orgprofile)
route.get("/get-org-hospital",verify,orgprofilehospital)
//routes for anyliticsbl
route.get("/anlytics",bloodgroupdata)
route.get("/organlytics",verify,bloodgroupdata)

module.exports=route