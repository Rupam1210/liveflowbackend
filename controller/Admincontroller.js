const Usermodal = require("../model/Usermodal")
const Request = require("../model/Request");
 
const inventory = require("../model/inventory");

const getdonorlist=async(req,res) => {
    try {
         
        const donordata=await Usermodal.find({role:"donor"}).sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            message:"donor list fetch successfull",
            donordata,
         
        })
    } catch (error) {
        console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In donor List API",
      error,
    });
    }
}
const gethospitallist=async(req,res) => {
    try {
         
        const hospitaldata=await Usermodal.find({role:"hospital"}).sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            message:"Hospital list fetch successfull",
            hospitaldata,
         
        })
    } catch (error) {
        console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In  List API",
      error,
    });
    }
   
}
const getorglist=async(req,res) => {
    try {
         
        const orgdata=await Usermodal.find({role:"organisation"}).sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            message:"donor list fetch successfull",
            orgdata,
         
        })
    } catch (error) {
        console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In  List API",
      error,
    });
    }
}
const iddelete=async(req,res) => {
    try {
         const id=req.params.id;
        
         const user=await Usermodal.findById(id);
         if(user?.role==='donor'){
            await Usermodal.findByIdAndDelete(id);
            await inventory.deleteMany({donor:id})
            await Request.deleteMany({donor:id})
         }
         if(user?.role==='organisation'){
            await Usermodal.findByIdAndDelete(id);
            await inventory.deleteMany({organisation:id})
            await Request.deleteMany({organisation:id})
         }
         if(user?.role==='hospital'){
            await Usermodal.findByIdAndDelete(id);
            await inventory.deleteMany({hospital:id})
            await Request.deleteMany({hospital:id})
         }
        
        return res.status(200).send({
            success:true,
            message:"Deleted Account successfull",
        })
    } catch (error) {
        console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In  List API",
      error,
    });
    }
}

module.exports={getdonorlist,getorglist,gethospitallist,iddelete}