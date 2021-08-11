const jwt = require("jsonwebtoken");
const mySecret = process.env.MY_SECRET

function userLogger(req,res,next){
    const token = req.headers.authorization;
    try{
      const decoded = jwt.verify(token,mySecret)
      req.user = {decodedValues :decoded}
      return next()
    }catch(error){
        return  res.status(401).json({message:"Unauthorized login please add token"})
    }
   }
   
   module.exports = { userLogger }
   