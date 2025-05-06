const { default: mongoose } = require("mongoose");
const Request = require("../model/Request");
const User = require("../model/Usermodal");
const inventory = require("../model/inventory");

const createReq= async(req,res)=>{
    try {
       const user=await User.findOne({email:req.body.email})
       if(!user)return res.status(200).send({
        success:false,
        message:"User is not found"
       })
       const loginuser=await User.findById(req.body.userId)
       req.body.organisation=user?._id;
     
       if(loginuser.role==='hospital'){
         req.body.hospital=req.body.userId
       }else if(loginuser.role==='donor'){
        //    if(loginuser?.bloodGroup!=req.body?.bloodGroup)return res.status(200).send({
        //     succes:false,
        //     message:"You can't donate other group"
        //    })
        req.body.donor=req.body.userId;
       }
       const request=new Request(req.body)
        await request.save();
        return res.status(200).send({
            success:true,
            message:"successfully created",
            request
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            error,
            message:"error in request",
            success:true
        })
    }
}
//request of donor and organisation
const getreqdonor=async(req,res)=>{
    try {
        var reqs=()=>{};
        const user=await User.findById(req.body.userId);
        if(user?.role==="donor"){
              reqs=await Request.find({
                donor:req.body?.userId
             }).sort({createdAt:-1})
        }
        if(user?.role==="hospital"){
            reqs=await Request.find({
              hospital:req.body?.userId
           }).sort({createAt:-1})
      }
      if(user?.role==="organisation"){
        reqs=await Request.find({
          organisation:req.body?.userId
       }).sort({createAt:-1})
  }
       
        
       
        return res.status(200).send({
            success:true,
            message:"All  request status",
            reqs,
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            error,
            message:"error in request",
            success:true
        })
    }
}
// //hospital
const getreqhospital=async(req,res)=>{
    try {
        const reqs=await Request.find({
           hospital:req.body?.userId
        }).sort({createAt:-1})
        
       
        return res.status(200).send({
            success:true,
            message:"All  request of donor and hospital ",
            reqs
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            error,
            message:"error in request",
            success:true
        })
    }
}
//org
const getreq=async(req,res)=>{
    try {
            const reqs=await Request.find({
                organisation:req.body?.userId
            }).populate("donor").populate("hospital").sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            message:"All hospital request ",
            reqs
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            error,
            message:"error in request",
            success:true
        })
    }
}
//reject of request
const reject=async(req,res)=>{
    try {
        const data=await Request.findById(req.params.id);
        if(data?.requestreject||data?.requestaccept)return res.status(200).send({message:"This req is alreday processed",succes:false})
        const reject=await Request.findByIdAndUpdate(req.params.id,{$set:{msg:req.body.message||"your request is rejected",requestreject:true}},{new:true})
        return res.status(200).send({
            success:true,
            message:'Request is Rejected',
            reject
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            error,
            message:"error in request",
            success:true
        })
    }
} 
//organisation accepted
const accept=async(req,res)=>{
    try {
        const data=await Request.findById(req.params.id);
        if(data?.requestreject||data?.requestaccept)return res.status(200).send({message:"This req is alreday processed",succes:false})
       
        if(data?.donor){
            const user=await User.findById(data?.donor)
            req.body.email=user?.email
            req.body.donor=user?._id
        }
        if(data?.hospital){
            const user=await User.findById(data?.hospital) 
            req.body.email=user?.email
            req.body.hospital=user?._id
        }
       
            req.body.bloodGroup=data?.bloodGroup,
            req.body.inventoryType=data?.inventoryType,
            req.body.quantity=data?.quantity,
            req.body.organisation= req.body.userId
   //  condition
   if(req.body.inventoryType==="out"){
    const requestedBloodGroup = req.body.bloodGroup;
    const requestedQuantityOfBlood = req.body.quantity;
     
    //calculate Blood Quanitity
    
    const organisation = new mongoose.Types.ObjectId(req.body?.userId)
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
            msg:"new",
            message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
    }
       
} 
// await Request.findByIdAndUpdate(req.params.id,{$set:{msg:"your request is accepted", requestaccept:true}},{new:true})
         const new_record= new inventory(req.body)
         await Request.findByIdAndUpdate(req.params.id,{$set:{msg:"your request is accepted", requestaccept:true}},{new:true})
         await new_record.save();

        return res.status(200).send({
            success:true,
            new_record,
            message:"New Recorded Successfully"
            
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            error,
            message:"error in request",
            success:false
        })
    }
}
const upqty=async(req,res)=>{
    try {
        const id=await req.params.id
        if(req.body.editedBloodGroup){
            // console.log(req.body.donor)
            await Request.findByIdAndUpdate(id,{ $set: 
                { quantity:req.body.editedQuantity , bloodGroup:req.body.editedBloodGroup}},{new:true})
            await User.findByIdAndUpdate(req.body.donor._id,{ $set: 
                {  verify:true,bloodType:req.body.editedBloodGroup}},{new:true})
            
        }else{
            await Request.findByIdAndUpdate(id,{ $set: { quantity:req.body.editedQuantity } },{new:true})
        }
         
         const reqs=await Request.findById(id)
        // console.log(reqs)
        return res.status(200).send({
            success:true,
            reqs,
            message:"Update Successfully"
            
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            error,
            message:"error in Update",
            success:false
        })
    }
}
module.exports={createReq,getreqdonor,getreq,getreqhospital,reject,accept,upqty}