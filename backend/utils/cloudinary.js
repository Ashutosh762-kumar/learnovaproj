// cloudinary setup
/*
Simple Cloudinary helper placeholder.
If you want to use Cloudinary, install 'cloudinary' package and replace this implementation.
*/
// const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
// const apiKey = process.env.CLOUDINARY_API_KEY;
// const apiSecret = process.env.CLOUDINARY_API_SECRET;

// module.exports = {
//   // Example interface; replace with actual cloudinary calls in production
//   async uploadBuffer(buffer, folder='learnova') {
//     // Placeholder - in production call cloudinary.uploader.upload_stream or upload
//     return { url: '', public_id: '' };
//   }
// };


const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

module.exports = { uploadOnCloudinary };
