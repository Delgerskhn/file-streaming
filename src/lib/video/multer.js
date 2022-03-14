const { validateVideoType } = require("./validate");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../resource/videos"));
  },
  filename: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    var uploadedFileName = uuidv4() + ext;
    console.log(uploadedFileName);
    req.body.uploadedFileName = uploadedFileName;
    cb(null, uploadedFileName);
  },
});

const videoUploader = multer({
  storage: storage,
  fileFilter: validateVideoType,
});

module.exports = { videoUploader };
