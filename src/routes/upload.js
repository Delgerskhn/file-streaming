const { Router } = require("express");
const multer = require("multer");
const router = Router();
const fs = require("fs");
const authorize = require("../middlewares/authorize");
const path = require("path");
const convertToFfmpeg = require("../ffmpeg");

let uploadedFileName;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "videos"));
  },
  filename: function (req, file, cb) {
    uploadedFileName = req.user.id + file.originalname;
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
      console.log("finished", uploadedFileName);
      convertToFfmpeg(
        path.join(__dirname, "../videos", uploadedFileName),
        path.join(__dirname, "../videos/hls", uploadedFileName + ".m3u8")
      );
    });
    next();
  },
  (req, res) => {
    console.log("uploaded file");
    res.send(uploadedFileName + ".m3u8");
  }
);

module.exports = router;
