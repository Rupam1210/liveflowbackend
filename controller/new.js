// const createoutInventory=async(req,res)=>{
    //     try {
    //         const user=await User.findOne({email:req.body.email})
    //         if(!user)return res.status(200).send({
    //             success:false,
    //             message:"user not found"
    //         })
    //         req.body.hospital=req.body.userId;
    //         req.body.organisation=user?._id;
           
    //             const requestedBloodGroup = req.body.bloodGroup;
    //             const requestedQuantityOfBlood = req.body.quantity;
                 
    //             //calculate Blood Quanitity
                
    //             const organisation = new mongoose.Types.ObjectId(user?._id);
    //             // console.log(Organisation)
    //             // console.log(organisation)
    //             const totalInOfRequestedBlood = await inventory.aggregate([
    //                 {
    //                 $match: {
    //                     bloodGroup: requestedBloodGroup,
    //                     inventoryType:"in",
    //                      organisation
    //                 },
    //                 },
    //                 {
    //                 $group: {
    //                     _id:`$bloodGroup`,
    //                     total: { $sum: "$quantity" },  
    //                 }
    //                 }
    //             ]);
    //             // console.log("Total In", totalInOfRequestedBlood);
    //             const totalIn = totalInOfRequestedBlood[0]?.total || 0;
    //             //calculate OUT Blood Quanitity
    
    //             const totalOutOfRequestedBloodGroup = await inventory.aggregate([
    //                 {
    //                 $match: {
    //                     organisation,
    //                     inventoryType: "out",
    //                     bloodGroup: requestedBloodGroup,
    //                 },
    //                 },
    //                 {
    //                 $group: {
    //                     _id: "$bloodGroup",
    //                     total: { $sum: "$quantity" },
    //                 },
    //                 },
    //             ]);
    //             const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;
    
    //             //   in & Out Calc
    //             const availableQuanityOfBloodGroup = totalIn - totalOut;
    //             //   quantity validation
    //             if(availableQuanityOfBloodGroup < requestedQuantityOfBlood){
    //                 return res.status(200).send({
    //                     success: false,
    //                     message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
    //                 });
    //             }
                
               
    //         const invent=await new inventory(req.body);
    //         await invent.save();
    //         return res.status(200).send({
    //             success:true,
    //             message:"New record created",
    //             invent
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).send({
    //             message:"Error in inventory",
    //             success:false,
    //             error
    //         }) 
    //     }
    // }
    // const createINInventory=async(req,res)=>{
    //     try {
    //         const user=await User.findOne({email:req.body.email})
    //         if(!user)return res.status(200).send({
    //             success:false,
    //             message:"user not found"
    //         }) 
    //         req.body.organisation=user?._id ;
    //         req.body.donar=req.body.userId;
            
    //         const invent=await new inventory(req.body);
    //         await invent.save();
    //         return res.status(200).send({
    //             success:true,
    //             message:"New record created",
    //             invent
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).send({
    //             message:"Error in inventory",
    //             success:false,
    //             error
    //         }) 
    //     }
    // }