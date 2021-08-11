function errorHandler(err,res,next){
    console.log(err.stack)
    res.status(400).json({sucess:false,message:err.message})
  }
  
  module.exports = { errorHandler}