const mongoose=require('mongoose')
const User=require('../model/Usermodal') 
const inventory = require('../model/inventory')

const storeinv=async(req,res)=>{
    try {

        // const user=await User.findOne({email:req.body.email})
        // if(!user)return res.status(200).send({
        //     success:false,
        //     message:"user not found"
        // })
        if(req.body.inventoryType==="out"){
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBlood = req.body.quantity;
             
            //calculate Blood Quanitity
            
            const organisation = new mongoose.Types.ObjectId(req.body?.userId);
            // console.log(Organisation)
            // console.log(organisation)
            const totalInOfRequestedBlood = await inventory.aggregate([
                {
                $match: {
                    bloodGroup: requestedBloodGroup,
                    inventoryType:"in",
                     organisation
                },
                },
                {
                $group: {
                    _id:`$bloodGroup`,
                    total: { $sum: "$quantity" },  
                }
                }
            ]);
            // console.log("Total In", totalInOfRequestedBlood);
            const totalIn = totalInOfRequestedBlood[0]?.total || 0;
            //calculate OUT Blood Quanitity

            const totalOutOfRequestedBloodGroup = await inventory.aggregate([
                {
                $match: {
                    organisation,
                    inventoryType: "out",
                    bloodGroup: requestedBloodGroup,
                },
                },
                {
                $group: {
                    _id: "$bloodGroup",
                    total: { $sum: "$quantity" },
                },
                }, 
            ]);
            const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

            //   in & Out Calc
            const availableQuanityOfBloodGroup = totalIn - totalOut;
            //   quantity validation
            if(availableQuanityOfBloodGroup < requestedQuantityOfBlood){
                return res.status(200).send({
                    success: false,
                    message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
                });
            }
            
        }
        // const organisation = new mongoose.Types.ObjectId(req.body?.userId);
        // console.log(req.body)
        const data={
            inventoryType: req.body.inventoryType,
            bloodGroup: req.body.bloodGroup,
            quantity: req.body.quantity,
            email: req.body.email,
            organisation:req.body.userId
          
        }
        const invent=await new inventory(data);
        await invent.save();
        return res.status(200).send({
            success:true,
            message:"New record created",
            invent
            
        }) 
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Error in inventory",
            success:false,
            error
        }) 
    }
}

const createInventory=async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        if(!user)return res.status(200).send({
            success:false,
            message:"user not found"
        })
      
        if(req.body.inventoryType==="out"){
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBlood = req.body.quantity;
             
            //calculate Blood Quanitity
            
            const organisation = new mongoose.Types.ObjectId(req.body?.userId);
            // console.log(Organisation)
            // console.log(organisation)
            const totalInOfRequestedBlood = await inventory.aggregate([
                {
                $match: {
                    bloodGroup: requestedBloodGroup,
                    inventoryType:"in",
                     organisation
                },
                },
                {
                $group: {
                    _id:`$bloodGroup`,
                    total: { $sum: "$quantity" },  
                }
                }
            ]);
            // console.log("Total In", totalInOfRequestedBlood);
            const totalIn = totalInOfRequestedBlood[0]?.total || 0;
            //calculate OUT Blood Quanitity

            const totalOutOfRequestedBloodGroup = await inventory.aggregate([
                {
                $match: {
                    organisation,
                    inventoryType: "out",
                    bloodGroup: requestedBloodGroup,
                },
                },
                {
                $group: {
                    _id: "$bloodGroup",
                    total: { $sum: "$quantity" },
                },
                }, 
            ]);
            const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

            //   in & Out Calc
            const availableQuanityOfBloodGroup = totalIn - totalOut;
            //   quantity validation
            if(availableQuanityOfBloodGroup < requestedQuantityOfBlood){
                return res.status(200).send({
                    success: false,
                    message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
                });
            }
            req.body.hospital=user?._id;
        }else{
            req.body.donor=user?._id;
          
        }
        
        const invent=await new inventory(req.body);
        await invent.save();
        return res.status(200).send({
            success:true,
            message:"New record created",
            invent
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Error in inventory",
            success:false,
            error
        }) 
    }
}
//

const getinventory=async(req,res)=>{
    try {
        const invent=await inventory.find({
            organisation:req.body.userId
        }).populate("donor").populate("hospital").sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            message:" Get All records succesfull",
            invent
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Get all API",  
            error
        }) 
    }
}
// find the last record of donor
const lastdonor=async(req,res)=>{
    try {
        const invent=await inventory.find({
            donor:req.body.userId,
            inventoryType:"in"
        }).sort({createdAt:-1}).limit(1)
        return res.status(200).send({
            success:true,
            message:"last record",
            invent
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in fetching API",  
            error
        }) 
    }
}
//all hospital record
const gethosiptal=async(req,res)=>{
    try {const inventory = await inventoryModel
        .find(req.body.filters)
        .populate("donor")
        .populate("hospital")
        .populate("organisation")
        .sort({ createdAt: -1 });
      return res.status(200).send({
        success: true,
        messaage: "get hospital comsumer records successfully",
        inventory,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Get consumer Inventory",
        error,
      });
    }
} 
//limit of 3
const getinventory3=async(req,res)=>{
    try {
        const invent=await inventory.find({
            organisation:req.body.userId
        }).limit(3).sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            message:" recent records succesfull",
            invent
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in recent API",  
            error
        })
    }
}
//donor records

const getdonors=async(req,res)=>{
    try {
        const donorId=await inventory.distinct("donar",{
            organisation:req.body.userId
        }) ;
        const donors=await User.find({_id:{$in:donorId}});
        return res.status(200).send({
            success:true,
            message:" All donor records succesfull",
            donors
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in recent API",  
            error
        })
    }
}
//hospitAL DETails
const getallhospital=async(req,res)=>{
    try {
        const hospitalId=await inventory.distinct("hospital",{
            organisation:req.body.userId
        }) ;
        const hospitals=await User.find({_id:{$in:hospitalId}});
        return res.status(200).send({
            success:true,
            message:" All hospital records succesfull",
            hospitals
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in hospital API",  
            error
        })
    }
}
//org profile for donor
const orgprofile=async(req,res)=>{
    try {
        
        const donor=req.body.userId;
        const orgId=await inventory.distinct("organisation",{donor})
        const orgprofile=await User.find({_id:{$in:orgId}})
        return res.status(200).send({
            success:true,
            message:"successfully fecth org profile",
            orgprofile
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in donor API",  
            error
        })
    }
}
//org prodile for hospital
const orgprofilehospital=async(req,res)=>{
    try {
        const hospital=req.body.userId;
        const orgId=await inventory.distinct("organisation",{hospital})
        const orgprofile=await User.find({_id:{$in:orgId}})
        return res.status(200).send({
            success:true,
            message:"successfully fecth org profile",
            orgprofile
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in hospital API",  
            error
        })
    }
}

 
module.exports={createInventory,getinventory,gethosiptal,getinventory3,getdonors,getallhospital,orgprofile,orgprofilehospital,storeinv,lastdonor}         