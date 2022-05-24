import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const jwttoken = (users)=>{
    return jwt.sign({users}, process.env.JWT_TOKEN, { expiresIn: "1h" });
}



export const isAuth = (req,res,next)=>{
    const authorization = req.headers.authorization
    if(authorization){
        const token =  authorization.slice(7,authorization.length)
        jwt.verify(
            token,
            process.env.JWT_TOKEN,
            (err,decode)=>{
                if(err){
                      res.status(404).send({msg: "error authentication"})
                }else{
                    req.user = decode
                    next()
                }
          }
        )
       
    }
    else{
        res.status(404).send({msg: "users not found"})
    }
}