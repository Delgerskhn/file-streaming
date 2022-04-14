const { validateVideoType } = require("./validate");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const videoUploader = (uploadPath) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      var ext = path.extname(file.originalname);
      var uploadedFileName = uuidv4() + ext;
      console.log(uploadedFileName);
      req.body.uploadedFileName = uploadedFileName;
      cb(null, uploadedFileName);
    },
  });

  return multer({
    storage: storage,
    fileFilter: validateVideoType,
    limits: {
      fileSize: process.env.MAX_VIDEO_SIZE_BYTES
        ? parseInt(process.env.MAX_VIDEO_SIZE_BYTES)
        : 3000000,
    },
  });
};

module.exports = { videoUploader };
