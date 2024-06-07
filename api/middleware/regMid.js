const RegModel=require('../models/reg.model')

exports.regMid= async(req,res,next)=>{
    const { name, number, email, password } = req.body;
    const UserCheack= await RegModel.findOne({email:email})
    
      if(UserCheack==null){
        
        next()
      }
      else{
        res.json(
            {
                message: "Email Is Allready Registerd",
                statusCode: 404,
            }
        )
      }

}