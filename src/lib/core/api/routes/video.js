const { Router } = require("express");
const router = Router();
const authorize = require("../middlewares/authorize");
const path = require("path");
const { videoUploader } = require("../../../video/multer");
const { convertToFfmpeg } = require("../../../video/ffmpeg");
const { saveFileLocation } = require("../middlewares/saveFileLocation");
const fs = require("fs");
const { RESOURCE_PATH } = require("../../../../const/paths");
//WARNING: MEDIA FILE NAME CANNOT CONTAIN .ts SUBSTRING!!!!!
router.use(authorize);

router.get("/*.m3u8$", (req, res) => {
  const filename = req.path.substring(1).replaceAll("%20", " ");
  const p = path.join(RESOURCE_PATH, "videos", filename);
  fs.readFile(p, (err, data) => {
    if (err) return res.status(400).send("file not found!");
    const tokenInsertedFile = data
      .toString()
      .replaceAll(".m3u8", ".m3u8?t=" + req.query.t)
      .replaceAll(".ts", ".ts?t=" + req.query.t)
      .replace(".key", ".key?t=" + req.query.t);
    res.send(tokenInsertedFile);
  });
});

router.get("/:chunkPath/*.ts$", (req, res) => {
  const filename = req.path.substring(1).replaceAll("%20", " ");
  fs.readFile(path.join(RESOURCE_PATH, "videos", filename), (err, data) => {
    if (err) res.status(400).send("file not found!");
    res.send(data);
  });
});

router.get("/*.key$", (req, res) => {
  const filename = req.path.substring(1).replaceAll("%20", " ");
  fs.readFile(path.join(RESOURCE_PATH, "videos", filename), (err, data) => {
    if (err) res.status(400).send("file not found!");
    res.send(data);
  });
});

router.post(
  "/",
  (req, res, next) => {
    videoUploader.single("file")(req, res, function (err) {
      if (err) return res.status(400).send(err.message);
      next();
    });
  },
  saveFileLocation,
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
