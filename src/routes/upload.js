const { Router } = require("express");
const multer = require("multer");
const router = Router();
const fs = require("fs");
const authorize = require("../middlewares/authorize");
const path = require("path");
const convertToFfmpeg = require("../ffmpeg");
const { v4: uuidv4 } = require("uuid");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "videos"));
  },
  filename: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    var uploadedFileName = uuidv4() + ext;
    console.log(uploadedFileName);
    req.body.uploadedFileName = uploadedFileName;
    cb(null, uploadedFileName);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/",
  authorize,
  upload.single("file"),
  (req, res, next) => {
    res.on("finish", () => {
      const { uploadedFileName } = req.body;
      var ext = path.extname(uploadedFileName);
      convertToFfmpeg(
        path.join(__dirname, "../videos", uploadedFileName),
        path.join(
          __dirname,
          "../videos/hls",
          uploadedFileName.replace(ext, ".m3u8")
        )
      );
    });
    next();
  },
  (req, res) => {
    const { uploadedFileName } = req.body;
    var ext = path.extname(uploadedFileName);
    res.json({
      fname: uploadedFileName.replace(ext, ".m3u8"),
    });
  }
);

module.exports = router;
