const { Router } = require("express");
const router = Router();
const authorize = require("../middlewares/authorize");
const path = require("path");
const { videoUploader } = require("../lib/video/multer");
const { convertToFfmpeg } = require("../lib/video/ffmpeg");

router.post(
  "/",
  authorize,
  (req, res, next) => {
    videoUploader.single("file")(req, res, function (err) {
      if (err) return res.status(400).send(err.message);
      next();
    });
  },
  (req, res, next) => {
    res.on("finish", () => {
      const { uploadedFileName } = req.body;
      convertToFfmpeg(
        uploadedFileName,
        path.join(__dirname, "../../resource/videos", uploadedFileName),
        req.protocol + "://" + req.get("host")
      );
    });
    next();
  },
  (req, res) => {
    const { uploadedFileName } = req.body;
    res.json({
      fname: uploadedFileName + ".m3u8",
    });
  }
);

module.exports = router;
