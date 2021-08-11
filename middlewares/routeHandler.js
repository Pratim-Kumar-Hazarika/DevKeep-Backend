function routeHandler(req,res){
    res.status(404).json({success:false,message:"The route you are requesting doesn't exist"})
  }
  
  module.exports = { routeHandler }