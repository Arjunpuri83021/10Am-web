const RegModel=require('../models/reg.model')
const bcrypt=require('bcrypt')

exports.register = async (req, res) => {
     console.log(req.body)
     
    
    try {
        const { name, number, email, password } = req.body;
        const UserCheack= await RegModel.findOne({email:email})
         if(UserCheack==null){
            const profile =req.file.filename;
    const hashedPassword = await bcrypt.hash(password, 10);
        const record = new RegModel({
            profile:profile,
            name: name,
            number: number,
            email: email,
            password: hashedPassword
        });

        await record.save();

        res.json({
            message: "Successfully registered",
            statusCode: 202,
            data: record
        });
    }
    else{
        res.json(
            {
                message: "Email Is Allready Registerd",
                statusCode: 404,
            }
        )
    }
      
    
    
    } catch (error) {
        // Handle errors
        console.error(`Error in register API: ${error}`);
        res.status(500).json({
            message: "Internal server error",
            statusCode: 500,
            data: null
        });
    }
}




exports.login = async(req,res)=>{
  const {email,password}=req.body

 const loginRecord= await RegModel.findOne({email:email})
 
 if(loginRecord!==null){
    const mathcedPassword=await bcrypt.compare(password,loginRecord.password)
    if(mathcedPassword){
    res.json({
        message:"successfully login",
        statusCode:202,
        data:loginRecord
    })
}else{
    res.json({
        message:"password not matched",
        statusCode:404,
        data:loginRecord
    })
}
 }
 else{
    res.json({
        message:"Email Not Registerd",
        statusCode:404,
        data:loginRecord
    })
 }
//  console.log(loginRecord)
}


exports.getRegUser=async(req,res)=>{
    try{
    const findUser=await RegModel.find()
    res.json(
        {
            message:"Data Finded",
            StatusCode:202,
            data:findUser
        }
    )
}
catch(error){
    res.json(
        {
            message:"Data Not Finded",
            StatusCode:404,
            data:error
        }
    )
}
}



exports.deleteUser= async(req,res)=>{
   const id=req.params.id
   const deletedRecord= await RegModel.findByIdAndDelete(id)
   res.json(deletedRecord)
}


exports.userEdit= async(req,res)=>{
    try{
    const id =req.params.id
    const {name,number,email}=req.body
   const UpdatedRecord= await RegModel.findByIdAndUpdate(id,{
        name:name,number:number,email:email
    })

   
   console.log(UpdatedRecord)
    res.json(
        {
            message:"User Updated SucussFully",
            statusCode:202,
            data:UpdatedRecord
        }
    )

}catch(error){
    res.json(
        {
            message:"User Not Updated",
            statusCode:404,
            data:error
        }
    )

}
    
}