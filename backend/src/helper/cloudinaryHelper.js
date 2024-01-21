const {errorResponse} = require("./responseHelper");
const cloudinary = require("cloudinary").v2;

const publicIdWithOutExtensionFromUrl = async (imageUrl) => {
    const pathSegments = imageUrl.split('/');
    
    // get last segment
    const lastSegment = pathSegments[pathSegments.length - 1];

//     valueWithOutExtension
    const valueWithOutExtension = lastSegment.replace(/\.\w+$/, '');
    return valueWithOutExtension
}


const deleteImageFromCloudinary = async (res, publicId, folderName) => {
    try {
        const result = await cloudinary.uploader.destroy(`${folderName}/${publicId}`);
        if (result.result !== "ok") {
            return errorResponse(res, {statusCode: 400, message: "Image delete failed"})
        }
    } catch (e) {
        return errorResponse(res, {statusCode: 400, message: "Image delete failed"})
    }
};


const uploadSingleImage = async (res, image, folderName) => {
    const response = await cloudinary.uploader.upload(image.path, {folder: `${folderName}`});
    if (!response) {
        return errorResponse(res, {statusCode: 400, message: "Image upload failed"})
    }
    return response.secure_url;
};


module.exports = {
    publicIdWithOutExtensionFromUrl,
    deleteImageFromCloudinary,
    uploadSingleImage
}
