const multer = require("multer");
const path = require("path");
const { fileValidator } = require("./validate");
const { v4: uuidv4 } = require("uuid");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../resource/files"));
  },
  filename: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    var uploadedFileName = uuidv4() + ext;
    console.log(uploadedFileName);
    req.body.uploadedFileName = uploadedFileName;
    cb(null, uploadedFileName);
  },
});

const fileUploader = multer({
  storage: storage,
  fileFilter: fileValidator,
});

module.exports = {
  fileUploader,
};
