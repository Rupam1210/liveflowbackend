const express=require('express');
const verify = require('../middleware/token');
const { createcamp, getcamp, delcamp, allcamp } = require('../controller/camp');
const Route=express();

 Route.post("/create",verify,createcamp)
 Route.get("/getall",verify,getcamp)
 Route.get("/allcamp",allcamp)
 Route.delete("/del/:id",verify,delcamp) 

 module.exports=Route 