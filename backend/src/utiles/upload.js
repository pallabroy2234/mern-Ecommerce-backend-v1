const multer = require("multer");
const path = require("path");
const fs = require("fs");

const ALLOWED_FILE_TYPES = ["jpg", "jpeg", "png"];

const UPLOAD_FOLDER = "./public/uploads";

console.log("UPLOAD_FOLDER", UPLOAD_FOLDER);
const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2 MB

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_FOLDER);
    },
    filename: function (req, file, cb) {
        const extensionName = path.extname(file.originalname);
        cb(null, Date.now() + "-" + file.originalname.replace(extensionName, "") + extensionName);
    },
});

const fileFilter = (req, file, cb) => {
    const extensionName = path.extname(file.originalname);
    if (!ALLOWED_FILE_TYPES.includes(extensionName.substring(1))) {
        return cb(new Error("Only images are allowed"));
    }
    //
    // if (req.files && req.files.length <= 3) {
    //     return cb(new Error("Only 3 images are allowed"));
    // }
    cb(null, true);
};


const unlinkAllFilesMiddleware = () => {
    const files = fs.readdirSync(UPLOAD_FOLDER);
    files.forEach((file) => {
        const filePath = path.join(UPLOAD_FOLDER, file);
        try {
            fs.unlinkSync(filePath);
            console.log(`File ${filePath} deleted successfully`);
        } catch (unlinkError) {
            console.error(`Error unlinking file ${filePath}:`, unlinkError);
        }
    });
};


const upload = multer( {
    storage,
    fileFilter,
})

const uploadMultiple = multer({
    storage,
    fileFilter,
    
}).array("images" ,3);

module.exports = {
    upload, uploadMultiple,unlinkAllFilesMiddleware
};
