const { default: mongoose } = require('mongoose');
const inventory = require('../model/inventory');
const Usermodal = require('../model/Usermodal');
const bloodgroupdata=async(req,res)=>{
    try {
        const query=req.query;
        var user="";
        if(query.email){
            user=await Usermodal.findOne(req.query)
            if(!user ||user?.role!="organisation")return res.status(200).send({
                success:false,
                message:"No Organisation founded"
            })
        }
        
        const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
        const bloodGroupData = [];
        const organisation=new mongoose.Types.ObjectId(query.email?user?._id:req.body?.userId)
        
        await Promise.all(
            bloodGroups.map(async(blg)=>{
                //count total in
                const totalin=await inventory.aggregate([
                    {$match:{
                        bloodGroup:blg,
                        inventoryType:"in",
                        organisation
                    }},
                    {
                        $group:{
                            _id:null,
                            total:{$sum:"$quantity"}
                        }
                    }
                ])
                //count out
                const totalout=await inventory.aggregate([
                    {$match:{
                        bloodGroup:blg,
                        inventoryType:"out",
                        organisation
                    }},
                    {
                        $group:{
                            _id:null,
                            total:{$sum:"$quantity"}
                        }
                    }
                ])
                //available
                const avilableblood=(totalin[0]?.total || 0)-(totalout[0]?.total || 0)
               
                bloodGroupData.push({
                    bloodGroup:blg,
                    totalIn:totalin[0]?.total || 0,
                    totalOut:totalout[0]?.total || 0,
                    avilableblood
                })

            })
        )
        return res.status(200).send({
            success:true,
            bloodGroupData,
            message:"Blood group data Fetch Successfull"
        })
        
    } catch (error) {
        console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Bloodgroup Data Analytics API",
      error,
    });
    }
}
module.exports=bloodgroupdata