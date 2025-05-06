const Usermodal = require("../model/Usermodal")

const adminAuth=async(req,res,next)=>{
    try {
        const user=await Usermodal.findById(req.body.userId);
         
        if(user?.role!=='admin'){
        return res.status(200).send({
            success:false,
            message:"Failed in Admin Authenticate"
        })}
        else{
            next()
        }
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            error,
            message:"Error in Admin Authentication"
        })
    }
}
module.exports=adminAuth