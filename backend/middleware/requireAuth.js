import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv'
import users from "../models/userModel.js";

const JWT_SECRET = ""

dotenv.config()

const requireAuth = async (req,res,next)=>{
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error:"authorization token required!"})
    }
    const token  = authorization.split(' ')[1]
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    try {
        const {id} = jsonwebtoken.verify(token,JWT_SECRET)
        req.user = await users.findOne({username:id},{_id:true})
        next()
    } catch (error) {
            //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
    //verify authentication
        console.log(error)
        res.status(401).json({error:"request is not authorised!"})
    }

}
export {requireAuth}
