// const express = require("express");
// const upload = require("../config/cloudinaryStorage");

// const router = express.Router();

// // POST http://localhost:7000/api/uploads/upload
// router.post("/upload", upload.single("file"), (req, res) => {
//     try {
//         res.json({
//             message: "File uploaded successfully",
//             url: req.file.path, // Cloudinary file URL
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { uploadOnCloudinary } = require("../utils/cloudinary");

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const localFilePath = req.file?.path;

    const cloudFile = await uploadOnCloudinary(localFilePath);

    if (!cloudFile) {
      return res.status(500).json({ message: "File upload failed" });
    }

    res.json({
      success: true,
      url: cloudFile.secure_url,
      public_id: cloudFile.public_id,
      type: cloudFile.resource_type,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
  

// POST http://localhost:7000/api/uploads/upload
// form-data → file → yourfile.jpg/mp4/pdf
