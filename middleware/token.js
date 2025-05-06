const jwt=require('jsonwebtoken')
const JWT=process.env.SECRET

const verify=async(req,res,next)=>{
    try {
        const token =req.cookies.token;
        if(!token)return res.status(200).send({
            success:false
        })
        jwt.verify(token,JWT,async(err,decode)=>{
            if(err)return res.status(200).send({
                success:false,
                err
            })
            req.body.userId=decode.userId
        })
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            error,
            message:"Error in Cookies"
        })
    }
}
module.exports=verify