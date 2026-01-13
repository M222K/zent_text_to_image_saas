//find user_id for buy credit through json web token
import jwt from 'jsonwebtoken'

//whenever we hit the api execute before the controller function and then navigate to next function present in route flow
const userAuth =async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({
            success:false,
            message:"Not Authorized,Login Again!"
        })
    }

    try{
        //verify the token
        const tokenDecoded=jwt.verify(token,process.env.JWT_SECRET);

        if(tokenDecoded.id){
            // ensure body exists even if request was sent without JSON payload
            if (!req.body) req.body = {};
            //add the user id from token to body
            req.body.userId=tokenDecoded.id;
        }else{
            res.json({
                success:false,
                message:"Not Authorized,Login Again! Token Id not found."
            })
        }

        next(); //if everything is success then go to next

    }catch(error){
        res.json({
            success:false,
            message:error.message
        })

    }
}

export default userAuth;