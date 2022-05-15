const path= require('path')
const multer = require('multer')
var uuid = require('uuid').v4

const storage = multer.diskStorage(
    {
        destination:'Public/img',
        filename:(req,file,cb)=>{
            cb(null, uuid()+path.extname(file.originalname))
        }
    }
)

module.exports=multer({storage})