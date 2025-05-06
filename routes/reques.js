const express=require('express');
const verify = require('../middleware/token');
const { createReq, getreqdonor, getreq, getreqhospital, reject, accept, upqty } = require('../controller/requestController');
const Route=express();
 Route.post("/create",verify,createReq)
 Route.get("/get-req",verify,getreqdonor)
 //update
 Route.put("/upreq/:id",verify,upqty)
 //organisation
 Route.get("/get-orgreq",verify,getreq)
 //hospital
 Route.get("/get-hos-req",verify,getreqhospital)
 //reject
 Route.get("/req-reject/:id",verify,reject)
 Route.get("/req-accept/:id",verify,accept)
 
module.exports=Route