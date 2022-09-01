
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3-v2')

aws.config.update({
  accessKeyId : process.env.AWSAccessKeyId ,
  secretAccessKey : process.env.AWSSecretKey 
})

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'amazon-clone-ver-1',
    metadata: (req,file,cb)=>{
      cb(null,{fieldName:file.fieldname})  
    },
    key: (req,file,cb)=>{
      cb(null,Date.now().toString())  
    } 
  })  
})

module.exports = upload