const { Router } = require("express");
const router = Router();
const authorize = require("../middlewares/authorize");
const path = require("path");
const { videoUploader } = require("../../../video/multer");
const { convertToFfmpeg } = require("../../../video/ffmpeg");
const { saveFileLocation } = require("../middlewares/saveFileLocation");
const fs = require("fs");
const { RESOURCE_PATH } = require("../../../../const/paths");
const { getPublicVideo } = require("../../utils/getResource");

router.get("/:fname", async (req, res) => {
  const { fname } = req.params;
  if (!fname) res.status(400).send("Bad request");
  getPublicVideo(fname)
    .then((buff) => res.send(buff))
    .catch((e) => res.status(404).send("Video not found!"));
});
router.get("/:chunkPath/:chunkName", async (req, res) => {
  const { chunkPath, chunkName } = req.params;
  if (!(chunkPath && chunkName)) res.status(400).send("Bad request");
  getPublicVideo(chunkPath + "/" + chunkName)
    .then((buff) => res.send(buff))
    .catch((e) => res.status(404).send("Video not found!"));
});

router.post(
  "/",
  authorize,
  (req, res, next) => {
    videoUploader(path.join(RESOURCE_PATH, "publicVideos")).single("file")(
      req,
      res,
      function (err) {
        if (err) return res.status(400).send(err.message);
        next();
      }
    );
  },
  saveFileLocation,
  (req, res, next) => {
    res.on("finish", () => {
      const { uploadedFileName } = req.body;
      convertToFfmpeg(
        uploadedFileName,
        path.join(RESOURCE_PATH, "publicVideos"),
        process.env.SERVICE_HOSTNAME + "/public/video"
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
