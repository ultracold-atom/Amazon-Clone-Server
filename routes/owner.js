const router = require('express').Router()
const Owner = require('../models/owner')
const upload = require('../middlewares/upload-photo')

//POST Request
router.post("/owners",upload.single("photo"),async(req,res)=>{
  try {
    let owner = new Owner()
    owner.name = req.body.name
    owner.about = req.body.about
    owner.photo = req.file.location

    await owner.save()

    res.json({
      success:true,
      messgae: "New Owner Successfully Created"  
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      messgae:error.messgae  
    })
  }  
})


//GET Request
router.get("/owners",async(req,res)=>{
  try {
    let owners = await Owner.find()
    res.json({
      owners:owners
    }) 


  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
})


module.exports = router