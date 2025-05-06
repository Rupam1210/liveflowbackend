const Camp = require("../model/bloodcamp");

const createcamp=async(req,res)=>{
    try {
         
        const data={
           
            location: req.body.location,
            date: req.body.date,
            Time: req.body.time,
            email: req.body.email,
            contact: req.body.contact,
            campname: req.body.name,
            organisation:req.body.userId,
            organiser: req.body.organiser,
        }
        const camp=await new Camp(data)
        await camp.save()
        return res.status(200).send({
            success:true,
            message:"New record created",
            camp
            
        }) 
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Error in camp",
            success:false,
            error
        }) 
    }
}
const getcamp=async(req,res)=>{
    try {
        const camp=await Camp.find({
                    organisation:req.body.userId
                }).sort({date:-1,Time:-1})
        return res.status(200).send({
            success:true,
            message:" Get All records succesfull",
            camp
                })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Error in camp",
            success:false,
            error
        }) 
    
    }
}
const allcamp=async(req,res)=>{
    try {
        const camp=await Camp.find().sort({date:-1,Time:-1})
        // console.log(camp)
        return res.status(200).send({
            success:true,
            message:" Get All records succesfull",
            camp
                })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Error in camp",
            success:false,
            error
        })  
    
    }
}
const delcamp=async(req,res)=>{
   
    try {
         
        const id=req.params.id;
        const camp=await Camp.findById(id);
        // console.log(camp)
        await Camp.findByIdAndDelete(id);
        return res.status(200).send({
            success:true,
            message:" Delete succesfull",
            
                })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Error in deletion",
            success:false,
            
        }) 
    
    }
}



module.exports={createcamp,getcamp,delcamp,allcamp}