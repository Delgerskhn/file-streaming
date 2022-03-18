const multer = require("multer");
const path = require("path");
const { fileValidator } = require("./validate");
const { v4: uuidv4 } = require("uuid");
const { RESOURCE_PATH } = require("../../const/paths");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(RESOURCE_PATH, "files"));
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
