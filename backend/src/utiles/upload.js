const multer = require("multer");
const path = require("path");

const ALLOWED_FILE_TYPES = ["jpg", "jpeg", "png"];
const UPLOAD_FOLDER = "./public/uploads"

const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,UPLOAD_FOLDER)
    },
    filename:function (req,file,cb){
        const extentionName= path.extname(file.originalname);
        
        cb(null,Date.now() + "-" + file.originalname.replace(extentionName, "") +extentionName)
    }
});

const fileFilter = (req,file,cb)=> {
    const extentionName = path.extname(file.originalname);
    if (!ALLOWED_FILE_TYPES.includes(extentionName.substring(1))){
        return cb(new Error("Only images are allowed"))
    }
    cb(null,true);
}


const upload = multer({storage,fileFilter});
const uploadMultiple = multer({storage,fileFilter}).array("images");
module.exports = {
    upload,
    uploadMultiple
};